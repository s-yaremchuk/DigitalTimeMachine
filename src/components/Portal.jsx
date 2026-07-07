import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, ArrowLeft, CalendarDays, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MONTHS_UK = [
  { val: '01', name: 'Січень' },
  { val: '02', name: 'Лютий' },
  { val: '03', name: 'Березень' },
  { val: '04', name: 'Квітень' },
  { val: '05', name: 'Травень' },
  { val: '06', name: 'Червень' },
  { val: '07', name: 'Липень' },
  { val: '08', name: 'Серпень' },
  { val: '09', name: 'Вересень' },
  { val: '10', name: 'Жовтень' },
  { val: '11', name: 'Листопад' },
  { val: '12', name: 'Грудень' }
];

// Simple Typewriter component
function Typewriter({ text, delay = 30 }) {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, index, delay]);

  return <span>{currentText}</span>;
}

export default function Portal({ onLaunch }) {
  const [stage, setStage] = useState('year'); // 'year' | 'date'
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('05');
  const [year, setYear] = useState('1985'); // default to a classic nostalgic year
  const [errorMsg, setErrorMsg] = useState('');
  const [isPullingOut, setIsPullingOut] = useState(false);
  const [isSwipingDirection, setIsSwipingDirection] = useState(null); // 'left' | 'right' | null
  
  const ribbonRef = useRef(null);

  // Focus day card in horizontal ribbon
  useEffect(() => {
    if (stage === 'date' && ribbonRef.current) {
      const activeEl = ribbonRef.current.querySelector(`.day-card[data-day="${day}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [stage, day]);

  const handleYearChange = (delta) => {
    setYear(prev => {
      const next = parseInt(prev, 10) + delta;
      if (next >= 1900 && next <= 2026) {
        return String(next);
      }
      return prev;
    });
  };

  const handleDecadeJump = (delta) => {
    setYear(prev => {
      let next = parseInt(prev, 10) + delta;
      next = Math.max(1900, Math.min(2026, next));
      return String(next);
    });
  };

  const handleYearSubmit = (e) => {
    if (e) e.preventDefault();
    const yNum = parseInt(year, 10);
    if (isNaN(yNum) || yNum < 1900 || yNum > 2026) {
      setErrorMsg('ПОМИЛКА: ВВЕДІТЬ РІК ВІД 1900 ДО 2026');
      return;
    }
    setErrorMsg('');
    setIsPullingOut(true);
    
    // Animate "pulling out" newspaper from stack, then switch stage
    setTimeout(() => {
      setStage('date');
      setIsPullingOut(false);
    }, 450);
  };

  const handleLaunch = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const dNum = parseInt(day, 10);
    const yNum = parseInt(year, 10);

    if (isNaN(dNum) || dNum < 1 || dNum > 31) {
      setErrorMsg('ПОМИЛКА: ВВЕДІТЬ ДЕНЬ ВІД 1 ДО 31');
      return;
    }
    if (isNaN(yNum) || yNum < 1900 || yNum > 2026) {
      setErrorMsg('ПОМИЛКА: ВВЕДІТЬ РІК ВІД 1900 ДО 2026');
      return;
    }

    const formattedDay = day.padStart(2, '0');
    const dateString = `${year}-${month}-${formattedDay}`;
    onLaunch(dateString);
  };

  // Generate days based on month
  const getDaysInMonth = () => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    // Simple leap year check or date bound
    return new Date(y, m, 0).getDate();
  };

  const totalDays = getDaysInMonth();
  const daysArray = Array.from({ length: totalDays }, (_, i) => String(i + 1));

  return (
    <div className="portal-container" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="console-panel brutalist-border"
        style={{ width: '100%', maxWidth: '650px', padding: '30px' }}
      >
        <AnimatePresence mode="wait">
          {stage === 'year' ? (
            /* STAGE 1: YEAR SELECTION (NEWSPAPER KIOSK STACK) */
            <motion.div
              key="stage-year"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="kiosk-container"
            >
              <span className="console-header-title" style={{ fontSize: '1.6rem' }}>
                <Typewriter text="АРХІВНИЙ КІОСК // SELECT YEAR" delay={25} />
              </span>

              <p className="kiosk-instructions font-sans-meta">
                Свайпніть газету вбік для зміни року або натисніть для витягування
              </p>

              {/* 3D Stack of Newspaper Covers */}
              <div className="kiosk-stack-wrap">
                {/* Background Card 3 */}
                <div 
                  className="kiosk-newspaper-card" 
                  style={{ 
                    transform: 'translateY(-24px) scale(0.88) rotate(-4deg)', 
                    zIndex: 2, 
                    opacity: 0.4,
                    pointerEvents: 'none'
                  }}
                >
                  <div className="card-mini-header">
                    <span className="card-mini-title">CHRONO POST</span>
                  </div>
                  <div className="card-year-display">{(parseInt(year) + 2 <= 2026) ? parseInt(year) + 2 : 1900}</div>
                  <div className="card-mini-body">
                    <div className="card-mini-line"></div>
                    <div className="card-mini-line short"></div>
                  </div>
                </div>

                {/* Background Card 2 */}
                <div 
                  className="kiosk-newspaper-card" 
                  style={{ 
                    transform: 'translateY(-14px) scale(0.94) rotate(3deg)', 
                    zIndex: 4, 
                    opacity: 0.7,
                    pointerEvents: 'none'
                  }}
                >
                  <div className="card-mini-header">
                    <span className="card-mini-title">CHRONO POST</span>
                  </div>
                  <div className="card-year-display">{(parseInt(year) - 1 >= 1900) ? parseInt(year) - 1 : 2026}</div>
                  <div className="card-mini-body">
                    <div className="card-mini-line"></div>
                    <div className="card-mini-line short"></div>
                  </div>
                </div>

                {/* Front Active Card (Draggable and Clickable) */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  dragTransition={{ power: 0.15, timeConstant: 150 }}
                  onDragStart={() => setIsSwipingDirection(null)}
                  onDrag={(e, info) => {
                    if (info.offset.x > 40) setIsSwipingDirection('right');
                    else if (info.offset.x < -40) setIsSwipingDirection('left');
                  }}
                  onDragEnd={(e, info) => {
                    setIsSwipingDirection(null);
                    // Threshold to trigger swipe
                    if (info.offset.x > 80) {
                      handleYearChange(-1); // swipe right to go back in time
                    } else if (info.offset.x < -80) {
                      handleYearChange(1); // swipe left to go forward
                    }
                  }}
                  animate={isPullingOut ? {
                    y: -180,
                    scale: 1.05,
                    rotate: 0,
                    opacity: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  } : {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: isSwipingDirection === 'left' ? -4 : isSwipingDirection === 'right' ? 4 : 0,
                  }}
                  onClick={handleYearSubmit}
                  className="kiosk-newspaper-card"
                  style={{ zIndex: 10 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-mini-header">
                    <span className="card-mini-title" style={{ letterSpacing: '0.05em' }}>CHRONO POST</span>
                    <div className="card-mini-meta">
                      <span>ВИПУСК № {parseInt(year) % 99 + 1}</span>
                      <span>1900–2026</span>
                    </div>
                  </div>

                  <div className="card-year-display">{year}</div>

                  <div className="card-mini-body">
                    <div className="card-mini-line"></div>
                    <div className="card-mini-line"></div>
                    <div className="card-mini-line short"></div>
                  </div>
                </motion.div>
              </div>

              {/* Decades skipping & Manual input */}
              <div className="kiosk-controls">
                <div className="kiosk-decades-row">
                  <button type="button" onClick={() => handleDecadeJump(-50)} className="btn-decade">−50р</button>
                  <button type="button" onClick={() => handleDecadeJump(-10)} className="btn-decade">−10р</button>
                  <button type="button" onClick={() => handleYearChange(-1)} className="btn-decade">−1р</button>
                  <button type="button" onClick={() => handleYearChange(1)} className="btn-decade">+1р</button>
                  <button type="button" onClick={() => handleDecadeJump(10)} className="btn-decade">+10р</button>
                  <button type="button" onClick={() => handleDecadeJump(50)} className="btn-decade">+50р</button>
                </div>

                <div className="kiosk-manual-year">
                  <span className="font-sans-meta" style={{ fontSize: '0.7rem' }}>Або введіть рік:</span>
                  <input 
                    type="number" 
                    min="1900" 
                    max="2026" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="kiosk-year-input"
                    maxLength={4}
                  />
                  <button 
                    type="button" 
                    onClick={() => handleYearSubmit()} 
                    className="btn-decade"
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-color)' }}
                  >
                    Далі <ArrowRight size={12} style={{ display: 'inline', marginLeft: 4 }} />
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="error-banner">
                  <ShieldAlert size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </motion.div>
          ) : (
            /* STAGE 2: DATE SELECTOR (MONTH FAN & DAY RIBBON) */
            <motion.div
              key="stage-date"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="kiosk-container"
            >
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setStage('year')} 
                  className="btn-back font-sans-meta"
                  style={{ padding: 0 }}
                >
                  <ArrowLeft size={14} /> <span>ЗМІНИТИ РІК ({year})</span>
                </button>
                <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 900 }}>АРХІВ {year} РОКУ</span>
              </div>

              {/* Month Selection: Curved Fan Layout */}
              <div style={{ width: '100%' }}>
                <h4 className="font-sans-meta" style={{ fontSize: '0.75rem', textAlign: 'center', marginBottom: '8px' }}>
                  Оберіть місяць
                </h4>
                <div className="months-fan-container">
                  {MONTHS_UK.map((m, idx) => {
                    const isSelected = month === m.val;
                    // Calculate a deterministic slight fan angle based on index
                    const angle = (idx - 5.5) * 2.5; 
                    
                    return (
                      <div 
                        key={m.val} 
                        className="month-card-wrap"
                        style={{
                          transform: isSelected 
                            ? 'translateY(-4px) scale(1.03)' 
                            : `rotate(${angle}deg)`,
                          transition: 'transform 0.2s ease-out'
                        }}
                      >
                        <div 
                          onClick={() => {
                            setMonth(m.val);
                            // Adjust active day if it exceeds month bounds
                            const maxDays = new Date(parseInt(year), parseInt(m.val), 0).getDate();
                            if (parseInt(day) > maxDays) {
                              setDay(String(maxDays));
                            }
                          }}
                          className={`month-card ${isSelected ? 'selected' : ''}`}
                        >
                          {m.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day Selection: Scroll Snap Ribbon */}
              <div className="days-ribbon-container">
                <h4 className="font-sans-meta" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                  Оберіть день місяця
                </h4>
                
                <div className="days-ribbon-scroll" ref={ribbonRef}>
                  {daysArray.map((d) => {
                    const isSelected = day === d;
                    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(d));
                    const weekday = dateObj.toLocaleDateString('uk-UA', { weekday: 'short' });
                    
                    return (
                      <div
                        key={d}
                        data-day={d}
                        onClick={() => setDay(d)}
                        className={`day-card ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="day-card-num">{d}</span>
                        <span className="day-card-label">{weekday}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {errorMsg && (
                <div className="error-banner">
                  <ShieldAlert size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Trigger */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleLaunch}
                className="btn-time-warp"
                style={{ marginTop: '12px' }}
              >
                <CalendarDays size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                <span>ЗАПУСТИТИ ЧАСОПИС // WARP TRAVEL</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
