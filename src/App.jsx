import React, { useState } from 'react';
import Portal from './components/Portal';
import Dashboard from './components/Dashboard';
import { fetchAllTimeMachineData } from './services/api';
import { Radio } from 'lucide-react';

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
      {/* Texture grain filter */}
      <div className="noise-overlay" />

      {/* Main Header */}
      <header className="main-header brutalist-border brutalist-shadow-yellow">
        <div className="header-brand">
          <h1 className="main-title">DIGITAL TIME MACHINE</h1>
        </div>
        <div className="header-tagline font-mono-data">
          SWISS BRUTALISM EDITION // ХРОНОЛОГІЧНИЙ АРХІВ
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

        {loading ? (
          /* Smooth, minimalist loading state without shaking */
          <div className="loader-container brutalist-border brutalist-shadow-cyan">
            <div className="loader-spinner"></div>
            <h2 className="loader-title">ЗАВАНТАЖЕННЯ ДАНИХ // RETRIEVING ARCHIVES</h2>
            <p className="loader-desc font-mono-data">Будь ласка, зачекайте. Формується медіа-карта обраного року...</p>
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
          CHRONO INDEX // STABLE VERSION
        </div>
      </footer>
    </div>
  );
}
