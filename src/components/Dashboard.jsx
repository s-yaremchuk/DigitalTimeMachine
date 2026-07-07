import React, { useRef } from 'react';
import { Newspaper, Coins, Film, Music, Tv, Smile, ArrowLeft, Volume2 } from 'lucide-react';
import BrutalistCard from './BrutalistCard';
import { motion } from 'framer-motion';

// Container variants for stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 90, 
      damping: 14 
    } 
  }
};

export default function Dashboard({ date, data, onBack }) {
  const audioRefs = useRef({});

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toUpperCase();
  };

  const handlePlayPreview = (songId, previewUrl) => {
    if (!previewUrl) return;
    
    // Pause all other audio
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && audio !== audioRefs.current[songId]) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const audio = audioRefs.current[songId];
    if (audio) {
      if (audio.paused) {
        audio.play().catch(err => console.log("Audio play blocked", err));
      } else {
        audio.pause();
      }
    }
  };

  const { news, rates, movies, songs, memes, youtube } = data;

  return (
    <div className="dashboard-container">
      
      {/* Dashboard Top Navigation bar */}
      <div className="dashboard-nav">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-back" 
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>НАЗАД // GO BACK</span>
        </motion.button>
        <div className="nav-title">
          ВИПУСК: <span className="highlight-text">{formatDate(date)}</span>
        </div>
        <div className="nav-coordinates font-mono-data">
          АРХІВНА ХРОНІКА // ARCHIVE REPORT
        </div>
      </div>

      {/* Grid Content Layout with Stagger Animations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="dashboard-grid"
      >
        
        {/* WIDGET 1: NEWS */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="ГОЛОВНІ ПОДІЇ // HISTORICAL EVENTS" icon={<Newspaper size={18} />} accent="green">
            <div className="news-list">
              {news && news.length > 0 ? (
                news.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="news-item"
                  >
                    <div className="news-date font-mono-data">{item.date || "HISTORICAL"}</div>
                    <div className="news-headline">{item.title}</div>
                    <div className="news-desc">{item.desc}</div>
                  </a>
                ))
              ) : (
                <div className="empty-message font-mono-data">АРХІВНІ ЗАПИСИ ВІДСУТНІ.</div>
              )}
            </div>
          </BrutalistCard>
        </motion.div>

        {/* WIDGET 2: RATES */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="КУРС ВАЛЮТ // EXCHANGE RATES" icon={<Coins size={18} />} accent="yellow">
            <div className="rates-grid">
              <div className="rate-row">
                <span className="rate-pair">USD / EUR</span>
                <span className="rate-value font-mono-data">{rates.rates?.EUR?.toFixed(4) || 'N/A'} EUR</span>
              </div>
              <div className="rate-row">
                <span className="rate-pair">USD / GBP</span>
                <span className="rate-value font-mono-data">{rates.rates?.GBP?.toFixed(4) || 'N/A'} GBP</span>
              </div>
              <div className="rate-row">
                <span className="rate-pair">USD / JPY</span>
                <span className="rate-value font-mono-data">{rates.rates?.JPY?.toFixed(2) || 'N/A'} JPY</span>
              </div>
              <div className="rate-row">
                <span className="rate-pair">USD / CAD</span>
                <span className="rate-value font-mono-data">{rates.rates?.CAD?.toFixed(4) || 'N/A'} CAD</span>
              </div>
              <div className="rate-row">
                <span className="rate-pair">USD / CHF</span>
                <span className="rate-value font-mono-data">{rates.rates?.CHF?.toFixed(4) || 'N/A'} CHF</span>
              </div>
            </div>
          </BrutalistCard>
        </motion.div>

        {/* WIDGET 3: MOVIES */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="КІНОХІТИ РОКУ // POPULAR MOVIES" icon={<Film size={18} />} accent="orange">
            <div className="movies-list">
              {movies && movies.length > 0 ? (
                movies.slice(0, 4).map((movie, idx) => (
                  <div key={idx} className="movie-item">
                    <div className="movie-poster-wrap">
                      <img src={movie.poster} alt={movie.title} className="movie-poster" />
                      <div className="movie-header-info">
                        <span className="movie-title">{movie.title}</span>
                        <span className="movie-rating font-mono-data">★ {movie.rating}</span>
                      </div>
                    </div>
                    <div className="movie-details">
                      <p className="movie-overview">{movie.overview}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message font-mono-data">КІНОАРХІВИ ОНОВЛЮЮТЬСЯ.</div>
              )}
            </div>
          </BrutalistCard>
        </motion.div>

        {/* WIDGET 4: MUSIC (Songs) */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="ПОПУЛЯРНІ ПІСНІ // HIT SONGS" icon={<Music size={18} />} accent="pink">
            <div className="songs-list">
              {songs && songs.length > 0 ? (
                songs.map((song) => (
                  <div key={song.id} className="song-item">
                    <div className="song-left">
                      <img src={song.artwork} alt={song.title} className="song-artwork" />
                      <div className="song-meta">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist">{song.artist}</span>
                      </div>
                    </div>
                    
                    {song.previewUrl && (
                      <div className="song-right">
                        <button 
                          onClick={() => handlePlayPreview(song.id, song.previewUrl)}
                          className="btn-play-preview"
                          title="Послухати прев'ю"
                        >
                          <Volume2 size={14} />
                          <audio 
                            ref={el => audioRefs.current[song.id] = el}
                            src={song.previewUrl}
                            preload="none"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-message font-mono-data">АУДІОАРХІВ ТИМЧАСОВО ОФЛАЙН.</div>
              )}
            </div>
          </BrutalistCard>
        </motion.div>

        {/* WIDGET 5: MEMES */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="КУЛЬТОВІ МЕМИ // POPULAR MEMES" icon={<Smile size={18} />} accent="cyan">
            <div className="meme-text-list">
              {memes && memes.length > 0 ? (
                memes.map((meme, idx) => (
                  <div key={idx} className="meme-text-item brutalist-border">
                    <div className="meme-text-title">{meme.title}</div>
                    <p className="meme-text-desc">{meme.desc}</p>
                  </div>
                ))
              ) : (
                <div className="empty-message font-mono-data">АРХІВ МЕМІВ ПОРОЖНІЙ.</div>
              )}
            </div>
          </BrutalistCard>
        </motion.div>

        {/* WIDGET 6: YOUTUBE TRENDS */}
        <motion.div variants={itemVariants} className="grid-span-4">
          <BrutalistCard title="ВІДЕОЛЕГЕНДИ // YOUTUBE TRENDS" icon={<Tv size={18} />} accent="orange">
            <div className="youtube-display">
              {youtube && youtube.length > 0 ? (
                youtube.slice(0, 1).map((video, idx) => (
                  <div key={idx} className="yt-content">
                    <div className="yt-header-title">{video.title}</div>
                    <div className="yt-meta font-mono-data">
                      <span>КАНАЛ: {video.channel.toUpperCase()}</span>
                      <span>ПЕРЕГЛЯДИ: {video.views}</span>
                    </div>
                    {video.id ? (
                      <div className="yt-embed-wrap">
                        <iframe
                          title={video.title}
                          src={`https://www.youtube.com/embed/${video.id}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="yt-iframe"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="yt-no-video font-mono-data">ВІДЕО НЕ ЗНАЙДЕНО.</div>
                    )}
                    <p className="yt-desc mt-2">{video.desc}</p>
                  </div>
                ))
              ) : (
                <div className="empty-message font-mono-data">ВІДЕОАРХІВ НЕ ДОСТУПНИЙ.</div>
              )}
            </div>
          </BrutalistCard>
        </motion.div>

      </motion.div>
    </div>
  );
}
