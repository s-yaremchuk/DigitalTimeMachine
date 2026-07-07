import React, { useState } from 'react';
import Portal from './components/Portal';
import Dashboard from './components/Dashboard';
import { fetchAllTimeMachineData } from './services/api';
import { Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeMachineData, setTimeMachineData] = useState(null);
  const [error, setError] = useState('');

  const handleLaunch = async (dateString) => {
    setError('');
    setLoading(true);

    try {
      const data = await fetchAllTimeMachineData(dateString);
      setTimeMachineData(data);
      setSelectedDate(dateString);
    } catch (err) {
      console.error(err);
      setError('Не вдалося завантажити дані для обраної дати. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedDate('');
    setTimeMachineData(null);
  };

  return (
    <div className="screen-container">
      <CustomCursor />

      {/* Main Newspaper Header Banner */}
      <header className="main-header">
        <h1 className="main-title">CHRONO POST</h1>
        <div className="header-tagline font-mono-data">
          <span>№ {new Date().getDate() * 3 + 12} // ЧАСОПИС</span>
          <span>КИЇВ, {new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>АРХІВ ВАРП-ПЕРЕХОДІВ</span>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="main-content-area" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {error && (
          <div className="error-alert brutalist-border brutalist-shadow-pink font-mono-data">
            <Radio size={20} className="inline mr-2 animate-bounce" /> {error}
            <button className="btn-error-close" onClick={() => setError('')}>✕</button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            /* Smooth, minimalist loading state with fade */
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loader-container"
            >
              <div className="loader-spinner"></div>
              <h2 className="loader-title">ПІДГОТОВКА ВИПУСКУ</h2>
              <p className="loader-desc font-mono-data">Завантажуємо події, пісні, фільми та курси валют для вашої хроніки...</p>
            </motion.div>
          ) : !selectedDate ? (
            /* Date selector screen */
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
            >
              <Portal onLaunch={handleLaunch} />
            </motion.div>
          ) : (
            /* Time Travel Dashboard */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Dashboard 
                date={selectedDate} 
                data={timeMachineData} 
                onBack={handleBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Main Footer */}
      <footer className="main-footer font-mono-data">
        <div className="footer-left">
          © {new Date().getFullYear()} DIGITAL TIME MACHINE
        </div>
        <div className="footer-right">
          CHRONO INDEX // SWISS NEWSPRINT EDITION
        </div>
      </footer>
    </div>
  );
}
