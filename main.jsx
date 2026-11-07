import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import LoadingScreen from './LoadingScreen';

function App() {
  const [screen, setScreen] = useState('start');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (screen !== 'loading') return;
    setProgress(0);
    const timer = window.setInterval(() => {
      setProgress((previous) => Math.min(100, previous + 5));
    }, 350);
    return () => window.clearInterval(timer);
  }, [screen]);

  const checks = ['Tumatae...', 'Nangungulangot...', 'Namimiss ka...', 'ETO NA...'];

  return (
    <main className="app">
      {screen === 'start' && (
        <section className="opening-screen" aria-label="Birthday.exe opening artwork">
          <img
            className="opening-art"
            src="/opening-screen-v2.png"
            alt="Pixel-art birthday game opening with two people and Nailong"
          />
          <button
            className="start-hotspot"
            onClick={() => setScreen('loading')}
            aria-label="Press start to begin"
            title="Press Start"
          />
        </section>
      )}

      {screen === 'loading' && (
  <LoadingScreen
    progress={progress}
    onEnter={() => setScreen('room')}
  />
)}

      {screen === 'room' && (
        <section className="room-screen">
          <div className="room-wrap">
            <div className="room-heading">
              <h1>✦ BIRTHDAY ROOM ✦</h1>
              <span>click objects to explore</span>
            </div>
            <div className="room-image">
              <img
                src="/bedroom.png"
                alt="Cozy pixel-art birthday bedroom"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  event.currentTarget.parentElement.classList.add('room-missing');
                }}
              />
            </div>
            <p>A little room made just for you. Explore anything you like. ♡</p>
          </div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
