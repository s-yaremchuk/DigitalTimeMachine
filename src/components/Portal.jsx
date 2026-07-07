import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

const MONTHS_UK = [
  { val: '01', name: 'СІЧНЯ // JAN' },
  { val: '02', name: 'ЛЮТОГО // FEB' },
  { val: '03', name: 'БЕРЕЗНЯ // MAR' },
  { val: '04', name: 'КВІТНЯ // APR' },
  { val: '05', name: 'ТРАВНЯ // MAY' },
  { val: '06', name: 'ЧЕРВНЯ // JUN' },
  { val: '07', name: 'ЛИПНЯ // JUL' },
  { val: '08', name: 'СЕРПНЯ // AUG' },
  { val: '09', name: 'ВЕРЕСНЯ // SEP' },
  { val: '10', name: 'ЖОВТНЯ // OCT' },
  { val: '11', name: 'ЛИСТОПАДА // NOV' },
  { val: '12', name: 'ГРУДНЯ // DEC' }
];

export default function Portal({ onLaunch }) {
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('05');
  const [year, setYear] = useState('2016');
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

    const formattedDay = day.padStart(2, '0');
    const dateString = `${year}-${month}-${formattedDay}`;
    onLaunch(dateString);
  };

  return (
    <div className="portal-container">
      <div className="console-panel brutalist-border brutalist-shadow-pink">
        
        {/* Header */}
        <div className="console-header">
          <span className="console-header-title">ОБЕРІТЬ ДАТУ ПЕРЕХОДУ // TIMELINE SELECTOR</span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLaunch} className="console-form">
          <div className="led-display-container">
            
            {/* MONTH CELL */}
            <div className="led-cell">
              <label className="led-label">МІСЯЦЬ // MONTH</label>
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
              <label className="led-label">ДЕНЬ // DAY</label>
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
              <label className="led-label">РІК // YEAR</label>
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
            ЗАПУСТИТИ МАШИНУ ЧАСУ // LAUNCH TIME MACHINE
          </button>
        </form>

      </div>
    </div>
  );
}
