import React, { useRef } from 'react';
import { Newspaper, Coins, Film, Music, Tv, Smile, ArrowLeft, Volume2 } from 'lucide-react';
import BrutalistCard from './BrutalistCard';

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
      <div className="dashboard-nav brutalist-border brutalist-shadow-yellow">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>ABORT / ПОВЕРНУТИСЬ</span>
        </button>
        <div className="nav-title font-mono-data">
          DESTINATION: <span className="highlight-text">{formatDate(date)}</span>
        </div>
        <div className="nav-coordinates font-mono-data">
          TIME-WARP SECURE // LOCK ON
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="dashboard-grid">
        
        {/* WIDGET 1: NEWS */}
        <div className="grid-span-4">
          <BrutalistCard title="Топ Новини // Headline News" icon={<Newspaper size={18} />} accent="green">
            <div className="news-list">
              {news && news.length > 0 ? (
                news.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="news-item brutalist-border"
                  >
                    <div className="news-date font-mono-data">{item.date || "EVENT"}</div>
                    <div className="news-headline">{item.title}</div>
                    <div className="news-desc">{item.desc}</div>
                  </a>
                ))
              ) : (
                <div className="empty-message">Немає новин на цей день.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 2: EXCHANGE RATES */}
        <div className="grid-span-4">
          <BrutalistCard title="Курс Валют // Currency Rates" icon={<Coins size={18} />} accent="yellow">
            <div className="rates-container">
              <div className="rates-header font-mono-data">
                <span>CURRENCY</span>
                <span>VALUE (USD BASE)</span>
              </div>
              <div className="rates-list">
                {rates && rates.rates ? (
                  Object.entries(rates.rates).map(([sym, val]) => (
                    <div key={sym} className="rate-row brutalist-border font-mono-data">
                      <span className="rate-symbol">{sym}</span>
                      <span className="rate-value">{val.toFixed(4)}</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-message">Немає курсів на цей день.</div>
                )}
              </div>
              <div className="rates-footer font-mono-data">
                BASE: USD / SOURCE: FRANKFURTER API
              </div>
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 3: MOVIES */}
        <div className="grid-span-4">
          <BrutalistCard title="Популярні Фільми // Popular Movies" icon={<Film size={18} />} accent="orange">
            <div className="movies-list">
              {movies && movies.length > 0 ? (
                movies.slice(0, 2).map((movie, idx) => (
                  <div key={idx} className="movie-item brutalist-border">
                    <img src={movie.poster} alt={movie.title} className="movie-poster brutalist-border" />
                    <div className="movie-details">
                      <div className="movie-header-info">
                        <span className="movie-title">{movie.title}</span>
                        <span className="movie-rating font-mono-data">★ {movie.rating}</span>
                      </div>
                      <p className="movie-overview">{movie.overview}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">Немає фільмів.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 4: POPULAR SONGS */}
        <div className="grid-span-4">
          <BrutalistCard title="Популярні Пісні // Popular Songs" icon={<Music size={18} />} accent="pink">
            <div className="songs-list">
              {songs && songs.length > 0 ? (
                songs.slice(0, 3).map((song) => (
                  <div key={song.id} className="song-item brutalist-border">
                    <img src={song.artwork} alt={song.title} className="song-artwork" />
                    <div className="song-details">
                      <span className="song-title">{song.title}</span>
                      <span className="song-artist">{song.artist}</span>
                      {song.previewUrl && (
                        <button 
                          className="btn-play-preview font-mono-data"
                          onClick={() => handlePlayPreview(song.id, song.previewUrl)}
                        >
                          <Volume2 size={12} className="inline mr-1" /> PLAY PREVIEW
                          <audio 
                            ref={el => audioRefs.current[song.id] = el} 
                            src={song.previewUrl} 
                            preload="none"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">Немає пісень.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 5: MEMES */}
        <div className="grid-span-4">
          <BrutalistCard title="Інтернет Меми // Viral Memes" icon={<Smile size={18} />} accent="cyan">
            <div className="meme-display">
              {memes && memes.length > 0 ? (
                memes.slice(0, 1).map((meme, idx) => (
                  <div key={idx} className="meme-content">
                    <div className="meme-image-wrap brutalist-border">
                      <img src={meme.image} alt={meme.title} className="meme-image" />
                    </div>
                    <div className="meme-info mt-2">
                      <div className="meme-title">{meme.title}</div>
                      <p className="meme-desc">{meme.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">Немає мемів для цього періоду.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 6: YOUTUBE TRENDS */}
        <div className="grid-span-4">
          <BrutalistCard title="YouTube Тренди // YouTube Trends" icon={<Tv size={18} />} accent="orange">
            <div className="youtube-display">
              {youtube && youtube.length > 0 ? (
                youtube.slice(0, 1).map((video, idx) => (
                  <div key={idx} className="yt-content">
                    <div className="yt-header-title">{video.title}</div>
                    <div className="yt-meta font-mono-data">
                      <span>CHANNEL: {video.channel}</span>
                      <span>VIEWS: {video.views}</span>
                    </div>
                    <p className="yt-desc mt-2">{video.desc}</p>
                    <a 
                      href={video.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-watch-yt brutalist-border font-heading text-center"
                    >
                      WATCH VIDEO ON YOUTUBE // ДИВИТИСЬ
                    </a>
                  </div>
                ))
              ) : (
                <div className="empty-message">Немає відео.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

      </div>
    </div>
  );
}
