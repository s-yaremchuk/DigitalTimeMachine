import React, { useRef } from 'react';
import { ArrowLeft, Volume2, Radio } from 'lucide-react';
import NewspaperArticle from './NewspaperArticle';
import PageStains from './PageStains';
import { motion } from 'framer-motion';

// Container variants for staggered entrance (slower stagger for a more obvious sequence)
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.1
    }
  }
};

// Ink Drying effect: starts very blurry and lower down, focuses slowly
const inkFocusVariants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
    y: 28
  },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)',
    y: 0,
    transition: { 
      type: 'easeOut',
      duration: 0.85
    } 
  }
};

// Jitter/Vibration effect for big headlines (more intense shake representing press stamping)
const headlineJitterVariants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(12px)',
    y: 35
  },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: [35, 0, -6, 5, -3, 2, -1, 0],
    transition: {
      y: {
        type: 'keyframes',
        duration: 0.8,
        times: [0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        ease: 'easeInOut'
      },
      opacity: { duration: 0.6 },
      filter: { duration: 0.6 }
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
    <div className="dashboard-container" style={{ position: 'relative' }}>
      {/* Unique Coffee/Ink stains based on the date */}
      <PageStains date={date} />

      {/* Dashboard Top Navigation bar (Sub-Masthead) */}
      <div className="dashboard-nav">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-back font-sans-meta" 
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>НАЗАД ДО АРХІВУ</span>
        </motion.button>
        
        <div className="nav-title font-serif">
          ВИПУСК: {formatDate(date)}
        </div>
        
        <div className="dashboard-nav-actions">
          <div className="nav-coordinates font-sans-meta">
            АРХІВНА ХРОНІКА
          </div>
        </div>
      </div>

      <div className="thick-rule"></div>

      {/* Grid Content Layout with Stagger Animations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="newspaper-grid"
      >
        
        {/* WIDGET 1: NEWS (Spans 2 columns, multi-column text flow) */}
        <motion.div variants={inkFocusVariants} className="grid-span-2 article-border-right">
          <NewspaperArticle rubric="ГОЛОВНІ ПОДІЇ">
            <div className="news-list multi-column-text drop-cap">
              {news && news.length > 0 ? (
                news.map((item, idx) => (
                  <div key={idx} className="news-item">
                    {/* Applying jitter to the news headlines on load */}
                    <motion.h3 
                      variants={headlineJitterVariants} 
                      className="news-headline font-serif-title"
                    >
                      <a href={item.link || "#"} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </motion.h3>
                    <div className="news-date font-sans-meta">— {item.date || "ІСТОРИЧНЕ ДЖЕРЕЛО"}</div>
                    <p className="news-desc font-serif-body">{item.desc}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message font-serif-body">Архіви за цей день не збереглися.</p>
              )}
            </div>
          </NewspaperArticle>
        </motion.div>

        {/* WIDGET 3: MOVIES (Spans 1 column) */}
        <motion.div variants={inkFocusVariants} className="grid-span-1 article-border-right">
          <NewspaperArticle rubric="КІНЕМАТОГРАФ">
            <div className="movies-list">
              {movies && movies.length > 0 ? (
                movies.slice(0, 3).map((movie, idx) => (
                  <div key={idx} className="movie-item">
                    <div className="movie-poster-wrap">
                      <img src={movie.poster} alt={movie.title} className="movie-poster" />
                      <div className="movie-header-info">
                        <motion.h4 
                          variants={headlineJitterVariants}
                          className="movie-title font-serif-title"
                        >
                          {movie.title}
                        </motion.h4>
                        <span className="movie-rating font-sans-meta">★ {movie.rating}</span>
                      </div>
                    </div>
                    <p className="movie-overview font-serif-body">{movie.overview}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message font-serif-body">Кіноархіви оновлюються.</p>
              )}
            </div>
          </NewspaperArticle>
        </motion.div>

        {/* WIDGET 4: MUSIC (Spans 1 column) */}
        <motion.div variants={inkFocusVariants} className="grid-span-1">
          <NewspaperArticle rubric="МУЗИКА">
            <div className="songs-list">
              {songs && songs.length > 0 ? (
                songs.map((song) => (
                  <div key={song.id} className="song-item">
                    <div className="song-left">
                      <img src={song.artwork} alt={song.title} className="song-artwork" />
                      <div className="song-meta">
                        <motion.h4 
                          variants={headlineJitterVariants}
                          className="song-title font-serif-title"
                        >
                          {song.title}
                        </motion.h4>
                        <span className="song-artist font-sans-meta">{song.artist}</span>
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
                <p className="empty-message font-serif-body">Аудіоархів тимчасово офлайн.</p>
              )}
            </div>
          </NewspaperArticle>
        </motion.div>

        {/* SECOND ROW LINE DIVIDER */}
        <div className="grid-rule-horizontal"></div>

        {/* WIDGET 6: YOUTUBE TRENDS (Spans 2 columns, photo layout) */}
        <motion.div variants={inkFocusVariants} className="grid-span-2 article-border-right">
          <NewspaperArticle rubric="ВІДЕОАРХІВ">
            <div className="youtube-display">
              {youtube && youtube.length > 0 ? (
                youtube.slice(0, 1).map((video, idx) => (
                  <div key={idx} className="yt-content">
                    <motion.h3 
                      variants={headlineJitterVariants}
                      className="yt-header-title font-serif-title"
                    >
                      {video.title}
                    </motion.h3>
                    
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
                      <div className="yt-no-video font-sans-meta">ВІДЕО НЕ ЗНАЙДЕНО.</div>
                    )}
                    <p className="yt-caption font-serif-caption">
                      Матеріал з каналу {video.channel.toUpperCase()} (Переглядів: {video.views}). {video.desc}
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-message font-serif-body">Відеоархів недоступний.</p>
              )}
            </div>
          </NewspaperArticle>
        </motion.div>

        {/* WIDGET 5: MEMES (Spans 1 column) */}
        <motion.div variants={inkFocusVariants} className="grid-span-1 article-border-right">
          <NewspaperArticle rubric="КУЛЬТУРА">
            <div className="meme-text-list">
              {memes && memes.length > 0 ? (
                memes.slice(0, 3).map((meme, idx) => (
                  <div key={idx} className="meme-text-item">
                    <motion.h4 
                      variants={headlineJitterVariants}
                      className="meme-text-title font-serif-title"
                    >
                      {meme.title}
                    </motion.h4>
                    <p className="meme-text-desc font-serif-body">{meme.desc}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message font-serif-body">Архів мемів порожній.</p>
              )}
            </div>
          </NewspaperArticle>
        </motion.div>

        {/* WIDGET 2: RATES (Spans 1 column) */}
        <motion.div variants={inkFocusVariants} className="grid-span-1">
          <NewspaperArticle rubric="ЕКОНОМІКА">
            <div className="rates-container flex-col-stretch">
              <div className="rates-grid">
                <p className="rates-lead font-serif-body mb-3">Офіційний фінансовий звіт за обрану дату. Курси вказані щодо долара США.</p>
                <div className="rate-row">
                  <span className="rate-pair font-sans-meta">USD / EUR</span>
                  <span className="rate-value font-serif-body">{rates.rates?.EUR?.toFixed(4) || 'N/A'}</span>
                </div>
                <div className="rate-row">
                  <span className="rate-pair font-sans-meta">USD / GBP</span>
                  <span className="rate-value font-serif-body">{rates.rates?.GBP?.toFixed(4) || 'N/A'}</span>
                </div>
                <div className="rate-row">
                  <span className="rate-pair font-sans-meta">USD / JPY</span>
                  <span className="rate-value font-serif-body">{rates.rates?.JPY?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="rate-row">
                  <span className="rate-pair font-sans-meta">USD / CAD</span>
                  <span className="rate-value font-serif-body">{rates.rates?.CAD?.toFixed(4) || 'N/A'}</span>
                </div>
                <div className="rate-row">
                  <span className="rate-pair font-sans-meta">USD / CHF</span>
                  <span className="rate-value font-serif-body">{rates.rates?.CHF?.toFixed(4) || 'N/A'}</span>
                </div>
              </div>
              
              {/* Decorative ending element to fill vertical space */}
              <div className="decorative-ending">
                <div className="ornamental-line"></div>
                <span className="font-sans-meta">КІНЕЦЬ ЗВІТУ // FIN</span>
                <div className="ornamental-line"></div>
              </div>
            </div>
          </NewspaperArticle>
        </motion.div>

      </motion.div>

      <div className="thick-rule"></div>
      
      {/* Folio Line */}
      <div className="folio-line font-sans-meta">
        <span>СТОР. 1</span>
        <span>DIGITAL TIME MACHINE // АРХІВ</span>
      </div>

    </div>
  );
}
