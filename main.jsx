
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

  return (
    <main className="app">

      {/* OPENING SCREEN */}
      {screen === 'start' && (
        <section
          className="opening-screen"
          aria-label="Birthday.exe opening artwork"
        >
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

      {/* LOADING SCREEN */}
      {screen === 'loading' && (
        <LoadingScreen
          progress={progress}
          onEnter={() => setScreen('room')}
        />
      )}

      {/* BEDROOM */}
      {screen === 'room' && (
        <section className="room-screen">
          <div className="room-wrap">

            <div className="room-heading">
              <h1>✦ BIRTHDAY ROOM ✦</h1>
              <span>click objects to explore</span>
            </div>

            <div className="room-image">
              <img
                src="/bedroom-v2.png"
                alt="Cozy pixel-art birthday bedroom"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  event.currentTarget.parentElement.classList.add('room-missing');
                }}
              />

              {/* CLICKABLE WINDOW */}
              <button
                className="window-hotspot"
                onClick={() => setScreen('window')}
                aria-label="Look outside the window"
                title="Look outside"
              />
            </div>

            <p>
              A little room made just for you.
              Explore anything you like. ♡
            </p>

          </div>
        </section>
      )}

      {/* INTERACTIVE WINDOW */}
      {screen === 'window' && (
        <section className="window-screen">

          <div className="window-scene">

            <div className="window-sky">
              <div className="window-moon" />
              <div className="window-stars">✦ ✧ ✦</div>

              <div className="birthday-sky-message">
                BIG HAPPY BIRTHDAY ♡
              </div>
            </div>

            <div className="window-mountains" />

            <div className="window-hills" />

            <div className="window-houses">
              <div className="little-house house-one">
                <div className="house-roof" />
                <div className="house-light" />
              </div>

              <div className="little-house house-two">
                <div className="house-roof" />
                <div className="house-light" />
              </div>
            </div>

            <div className="window-rain" />

            <div className="window-frame-middle" />

          </div>

          <button
            className="window-back"
            onClick={() => setScreen('room')}
          >
            ← BACK TO ROOM
          </button>

        </section>
      )}

    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
