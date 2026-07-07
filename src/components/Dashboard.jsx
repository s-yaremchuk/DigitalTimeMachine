import React, { useRef } from 'react';
import { Newspaper, Coins, Film, Music, Tv, Smile, ArrowLeft, Volume2, Video } from 'lucide-react';
import BrutalistCard from './BrutalistCard';

export default function Dashboard({ date, data, onBack }) {
  const audioRefs = useRef({});
  const videoRefs = useRef({});

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
    
    // Pause all other audio/video
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && audio !== audioRefs.current[songId]) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    Object.values(videoRefs.current).forEach(video => {
      if (video) video.pause();
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
          CHRONOS CONNECTION: 100% SECURE
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="dashboard-grid">
        
        {/* WIDGET 1: NEWS */}
        <div className="grid-span-4">
          <BrutalistCard title="Архів Подій // Historical Events" icon={<Newspaper size={18} />} accent="green">
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
                    <div className="news-date font-mono-data">{item.date || "HISTORICAL"}</div>
                    <div className="news-headline">{item.title}</div>
                    <div className="news-desc">{item.desc}</div>
                  </a>
                ))
              ) : (
                <div className="empty-message font-mono-data">NO ARCHIVE RECORDS FOUND.</div>
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
                  <div className="empty-message font-mono-data">EXCHANGE SERVER OFFLINE.</div>
                )}
              </div>
              <div className="rates-footer font-mono-data">
                BASE: USD // SOURCE: FRANKFURTER API
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
                    <div className="movie-poster-wrap">
                      <img src={movie.poster} alt={movie.title} className="movie-poster" />
                      <div className="movie-header-info">
                        <span className="movie-title">{movie.title}</span>
                        <span className="movie-rating font-mono-data">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="movie-details">
                      <p className="movie-overview">{movie.overview}</p>
                      {movie.previewUrl && (
                        <div className="movie-video-wrap">
                          <video 
                            ref={el => videoRefs.current[idx] = el}
                            src={movie.previewUrl} 
                            controls 
                            className="movie-video brutalist-border"
                            preload="none"
                            poster={movie.poster}
                            onPlay={() => {
                              // Pause all audio previews when playing video
                              Object.values(audioRefs.current).forEach(audio => {
                                if (audio) audio.pause();
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message font-mono-data">NO FILM ARCHIVES AVAILABLE.</div>
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
                <div className="empty-message font-mono-data">AUDIO SERVER OFFLINE.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 5: MEMES */}
        <div className="grid-span-4">
          <BrutalistCard title="Вірусні Гіфки // Trending Memes" icon={<Smile size={18} />} accent="cyan">
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
                <div className="empty-message font-mono-data">MEME REPOSITORY UNREACHABLE.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

        {/* WIDGET 6: YOUTUBE TRENDS */}
        <div className="grid-span-4">
          <BrutalistCard title="Популярні Відео // YouTube Trends" icon={<Tv size={18} />} accent="orange">
            <div className="youtube-display">
              {youtube && youtube.length > 0 ? (
                youtube.slice(0, 2).map((video, idx) => (
                  <div key={idx} className="yt-content brutalist-border p-3 bg-[#161616] mb-3 last:mb-0">
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
                <div className="empty-message font-mono-data">STREAMING NODE OFFLINE.</div>
              )}
            </div>
          </BrutalistCard>
        </div>

      </div>
    </div>
  );
}
