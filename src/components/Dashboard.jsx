import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Radio } from 'lucide-react';
import NewspaperArticle from './NewspaperArticle';
import PageStains from './PageStains';
import { motion } from 'framer-motion';

// Container variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

// Ink Drying effect: starts blurred & hidden, transitions to sharp and fully visible
const inkFocusVariants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(8px)',
    y: 20
  },
  show: { 
    opacity: 1, 
    filter: 'blur(0px)',
    y: 0,
    transition: { 
      type: 'easeOut',
      duration: 0.65
    } 
  }
};

// Jitter/Vibration effect for big headlines (simulates mechanical press vibration)
const headlineJitterVariants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
    y: 25
  },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: [25, 0, -4, 3, -2, 1, -0.5, 0],
    transition: {
      y: {
        type: 'keyframes',
        duration: 0.7,
        times: [0, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        ease: 'easeInOut'
      },
      opacity: { duration: 0.5 },
      filter: { duration: 0.5 }
    }
  }
};

// Performant Typewriter component that updates text substring in DOM
function TypewriterText({ text, speed = 20, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    
    let timer;
    const startTimeout = setTimeout(() => {
      let i = 0;
      timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  if (!text) return null;
  return <>{displayedText}</>;
}

export default function Dashboard({ date, data, onBack }) {
  const audioRefs = useRef({});
  const [videoIndex, setVideoIndex] = useState(0);
  const playerRef = useRef(null);
  const ytPlaceholderRef = useRef(null);

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

  useEffect(() => {
    setVideoIndex(0);
  }, [date]);

  useEffect(() => {
    if (!youtube || youtube.length === 0) return;
    const currentVideo = youtube[videoIndex] || youtube[0];
    if (!currentVideo || !currentVideo.id) return;

    const initPlayer = () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn("Error destroying YT player:", e);
        }
      }

      playerRef.current = new window.YT.Player(ytPlaceholderRef.current, {
        videoId: currentVideo.id,
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1
        },
        events: {
          'onError': (event) => {
            console.warn(`YouTube player error ${event.data} for video: ${currentVideo.id}`);
            if ([2, 5, 100, 101, 150].includes(event.data)) {
              if (videoIndex + 1 < youtube.length) {
                console.log(`Auto-switching to fallback video index ${videoIndex + 1}`);
                setVideoIndex(prev => prev + 1);
              } else {
                console.warn("No more fallback videos available for this year.");
              }
            }
          }
        }
      });
    };

    if (!window.YT || !window.YT.Player) {
      let tag = document.getElementById('yt-iframe-api');
      if (!tag) {
        tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };

      const checker = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checker);
          initPlayer();
        }
      }, 300);

      return () => {
        clearInterval(checker);
        if (playerRef.current) {
          try { playerRef.current.destroy(); } catch (e) {}
          playerRef.current = null;
        }
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [youtube, videoIndex]);

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
                    <motion.h3 
                      variants={headlineJitterVariants} 
                      className="news-headline font-serif-title"
                    >
                      <a href={item.link || "#"} target="_blank" rel="noopener noreferrer">
                        <TypewriterText text={item.title} speed={25} delay={idx * 350} />
                      </a>
                    </motion.h3>
                    <div className="news-date font-sans-meta">— {item.date || "ІСТОРИЧНЕ ДЖЕРЕЛО"}</div>
                    <p className="news-desc font-serif-body">
                      <TypewriterText text={item.desc} speed={12} delay={idx * 350 + 150} />
                    </p>
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
                          <TypewriterText text={movie.title} speed={25} delay={idx * 300 + 100} />
                        </motion.h4>
                        <span className="movie-rating font-sans-meta">★ {movie.rating}</span>
                      </div>
                    </div>
                    <p className="movie-overview font-serif-body">
                      <TypewriterText text={movie.overview} speed={12} delay={idx * 300 + 200} />
                    </p>
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
                songs.map((song, idx) => (
                  <div key={song.id} className="song-item">
                    <div className="song-left">
                      <img src={song.artwork} alt={song.title} className="song-artwork" />
                      <div className="song-meta">
                        <motion.h4 
                          variants={headlineJitterVariants}
                          className="song-title font-serif-title"
                        >
                          <TypewriterText text={song.title} speed={25} delay={idx * 200 + 100} />
                        </motion.h4>
                        <span className="song-artist font-sans-meta">
                          <TypewriterText text={song.artist} speed={20} delay={idx * 200 + 200} />
                        </span>
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
                (() => {
                  const video = youtube[videoIndex] || youtube[0];
                  return (
                    <div className="yt-content">
                      <motion.h3 
                        variants={headlineJitterVariants}
                        className="yt-header-title font-serif-title"
                      >
                        <TypewriterText text={video.title} speed={25} delay={100} />
                      </motion.h3>
                      
                      {video.id ? (
                        <div className="yt-embed-wrap" key={video.id}>
                          <div ref={ytPlaceholderRef}></div>
                        </div>
                      ) : (
                        <div className="yt-no-video font-sans-meta">ВІДЕО НЕ ЗНАЙДЕНО.</div>
                      )}
                      <p className="yt-caption font-serif-caption">
                        Матеріал з каналу {video.channel.toUpperCase()} (Переглядів: {video.views}). <TypewriterText text={video.desc} speed={12} delay={300} />
                      </p>
                    </div>
                  );
                })()
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
                      <TypewriterText text={meme.title} speed={25} delay={idx * 250 + 100} />
                    </motion.h4>
                    <p className="meme-text-desc font-serif-body">
                      <TypewriterText text={meme.desc} speed={12} delay={idx * 250 + 200} />
                    </p>
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
                <p className="rates-lead font-serif-body mb-3">
                  <TypewriterText text="Офіційний фінансовий звіт за обрану дату. Курси вказані щодо долара США." speed={12} delay={100} />
                </p>
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
