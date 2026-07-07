import React, { useState } from 'react';
import Portal from './components/Portal';
import Dashboard from './components/Dashboard';
import { fetchAllTimeMachineData } from './services/api';
import { RefreshCw, Radio, Zap } from 'lucide-react';

export default function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [timeMachineData, setTimeMachineData] = useState(null);
  const [error, setError] = useState('');

  const handleLaunch = async (dateString) => {
    setError('');
    setIsWarping(true);
    setLoading(true);

    // Run the warping animation for at least 1.5 seconds to build immersion
    const startWarp = Date.now();

    try {
      const data = await fetchAllTimeMachineData(dateString);
      
      const elapsed = Date.now() - startWarp;
      const minDuration = 1800; // 1.8 seconds of glitch animation

      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }

      setTimeMachineData(data);
      setSelectedDate(dateString);
    } catch (err) {
      console.error(err);
      setError('ХРОНО-ЗБІЙ: Не вдалося завантажити дані для обраної дати. Спробуйте ще раз.');
    } finally {
      setIsWarping(false);
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedDate('');
    setTimeMachineData(null);
  };

  return (
    <div className={`screen-effect ${isWarping ? 'time-warping' : ''}`}>
      {/* Texture grain filter */}
      <div className="noise-overlay" />

      {/* Main Header */}
      <header className="main-header brutalist-border brutalist-shadow-yellow">
        <div className="header-brand">
          <Zap size={24} className="accent-yellow-text animate-pulse" />
          <h1 className="main-title">DIGITAL TIME MACHINE</h1>
        </div>
        <div className="header-meta font-mono-data">
          <span className="blink-dot">●</span> 
          <span>SYSTEM TIME: {new Date().toLocaleTimeString()}</span>
          <span className="meta-divider">|</span>
          <span>LOCATION: KYIV, UA</span>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="main-content-area">
        {error && (
          <div className="error-alert brutalist-border brutalist-shadow-pink font-mono-data">
            <Radio size={20} className="inline mr-2 animate-bounce" /> {error}
            <button className="btn-error-close" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {isWarping ? (
          /* Time Travel Loading Interface */
          <div className="warp-loading-container brutalist-border brutalist-shadow-cyan">
            <RefreshCw size={64} className="loading-spinner text-cyan-accent" />
            <h2 className="loading-title">TEMPORAL WARP IN PROGRESS</h2>
            <div className="loading-console-lines font-mono-data">
              <div>&gt; RECONSTRUCTING TIMELINE ACCORDING TO MATRIX CALCULATIONS...</div>
              <div>&gt; CONNECTING TO FRANKFURTER FINANCIAL RATES DATABASE...</div>
              <div>&gt; DOWNLOADING CULTURAL METADATA AND ARCHIVED MEME STORAGE...</div>
              <div>&gt; ESTABLISHING STABLE TEMPORAL LINK TO PREVIOUS EPOCH...</div>
              <div className="loading-progress-bar">
                <div className="loading-progress-fill"></div>
              </div>
            </div>
          </div>
        ) : !selectedDate ? (
          /* Date selector screen */
          <Portal onLaunch={handleLaunch} />
        ) : (
          /* Time Travel Dashboard */
          <Dashboard 
            date={selectedDate} 
            data={timeMachineData} 
            onBack={handleBack} 
          />
        )}
      </main>

      {/* Main Footer */}
      <footer className="main-footer brutalist-border brutalist-shadow-green font-mono-data">
        <div className="footer-left">
          © {new Date().getFullYear()} DIGITAL TIME MACHINE // DESIGN: SWISS BRUTALISM
        </div>
        <div className="footer-right">
          CHRONOS ENGINE V4.20 // RUNNING ON REACT + VITE
        </div>
      </footer>
    </div>
  );
}
