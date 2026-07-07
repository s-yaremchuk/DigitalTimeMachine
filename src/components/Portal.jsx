import React, { useState } from 'react';
import { Settings, ShieldAlert, Cpu } from 'lucide-react';
import { getApiKeys, saveApiKeys } from '../services/api';

const MONTHS_UK = [
  { val: '01', name: 'СІЧНЯ / JAN' },
  { val: '02', name: 'ЛУТОГО / FEB' },
  { val: '03', name: 'БЕРЕЗНЯ / MAR' },
  { val: '04', name: 'КВІТНЯ / APR' },
  { val: '05', name: 'ТРАВНЯ / MAY' },
  { val: '06', name: 'ЧЕРВНЯ / JUN' },
  { val: '07', name: 'ЛИПНЯ / JUL' },
  { val: '08', name: 'СЕРПНЯ / AUG' },
  { val: '09', name: 'ВЕРЕСНЯ / SEP' },
  { val: '10', name: 'ЖОВТНЯ / OCT' },
  { val: '11', name: 'ЛИСТОПАДА / NOV' },
  { val: '12', name: 'ГРУДНЯ / DEC' }
];

export default function Portal({ onLaunch }) {
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('05');
  const [year, setYear] = useState('2016');
  const [showSettings, setShowSettings] = useState(false);
  const [keys, setKeys] = useState(getApiKeys());
  const [errorMsg, setErrorMsg] = useState('');

  const handleLaunch = (e) => {
    e.preventDefault();
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

    // Format date string as YYYY-MM-DD
    const formattedDay = day.padStart(2, '0');
    const dateString = `${year}-${month}-${formattedDay}`;
    onLaunch(dateString);
  };

  const handleSaveKeys = () => {
    saveApiKeys(keys);
    setShowSettings(false);
  };

  return (
    <div className="portal-container">
      {/* Console Outer Wrap */}
      <div className="console-panel brutalist-border brutalist-shadow-pink">
        
        {/* LED Header */}
        <div className="console-header">
          <div className="console-dot red-dot"></div>
          <div className="console-dot green-dot"></div>
          <div className="console-dot yellow-dot"></div>
          <span className="console-header-title">TIME TRAVEL TERMINAL // VER. 4.0</span>
          
          <button 
            type="button" 
            className="settings-toggle"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Console Settings (Keys configuration) */}
        {showSettings && (
          <div className="settings-panel">
            <h3 className="settings-title">API KEYS CONFIGURATION</h3>
            <p className="settings-desc">
              Залиште порожніми, щоб використовувати якісні локальні макети даних (Mock Data).
            </p>
            
            <div className="form-group">
              <label>THE MOVIE DATABASE (TMDB) API KEY:</label>
              <input 
                type="text" 
                value={keys.tmdb} 
                onChange={(e) => setKeys({ ...keys, tmdb: e.target.value })} 
                placeholder="Введіть TMDB API key..."
              />
            </div>

            <div className="form-group">
              <label>THE GUARDIAN API KEY:</label>
              <input 
                type="text" 
                value={keys.guardian} 
                onChange={(e) => setKeys({ ...keys, guardian: e.target.value })} 
                placeholder="Введіть Guardian API key..."
              />
            </div>

            <button type="button" className="btn-save-keys" onClick={handleSaveKeys}>
              ЗБЕРЕГТИ НАЛАШТУВАННЯ // SAVE KEYS
            </button>
          </div>
        )}

        {/* Input Terminal Form */}
        <form onSubmit={handleLaunch} className="console-form">
          <div className="led-display-container">
            
            {/* MONTH CELL */}
            <div className="led-cell">
              <label className="led-label">MONTH</label>
              <div className="led-select-wrap">
                <select 
                  value={month} 
                  onChange={(e) => setMonth(e.target.value)}
                  className="led-select"
                >
                  {MONTHS_UK.map(m => (
                    <option key={m.val} value={m.val}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* DAY CELL */}
            <div className="led-cell">
              <label className="led-label">DAY</label>
              <input 
                type="number" 
                min="1" 
                max="31" 
                value={day} 
                onChange={(e) => setDay(e.target.value)}
                className="led-input"
                maxLength={2}
                required
              />
            </div>

            {/* YEAR CELL */}
            <div className="led-cell">
              <label className="led-label">YEAR</label>
              <input 
                type="number" 
                min="1900" 
                max="2026" 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="led-input led-year"
                maxLength={4}
                required
              />
            </div>

          </div>

          {errorMsg && (
            <div className="error-banner">
              <ShieldAlert size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Trigger Button */}
          <button type="submit" className="btn-time-warp">
            INITIATE TEMPORAL WARP // ЗАПУСТИТИ ПЕРЕХІД
          </button>
        </form>

        {/* Footer Terminal Specs */}
        <div className="console-footer-logs">
          <div className="log-line"><Cpu size={12} className="inline mr-1" /> SYSTEM STATUS: READY TO WARP.</div>
          <div className="log-line">&gt; CHRONO-PORT: PORT-8080 IS ACTIVE.</div>
          <div className="log-line">&gt; PRESS "INITIATE" TO RECONSTRUCT SELECTED TIME PERIOD.</div>
        </div>

      </div>
    </div>
  );
}
