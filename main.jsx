
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
    <div className="window-scene-v3">

      {/* New pixel-art background */}
      <img
        className="window-background"
        src="/window-v3.png"
        alt="Cozy wooden window overlooking a nighttime countryside"
      />

      {/* Animated moon */}
      <div className="animated-moon" aria-hidden="true" />

     
{/* Individual animated raindrops */}
<div className="rain-area" aria-hidden="true">
  {Array.from({ length: 85 }, (_, i) => (
    <span
      key={i}
      className="pixel-raindrop"
      style={{
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 23.3) % 100}%`,
        animationDelay: `${-((i * 0.37) % 2.5)}s`,
        animationDuration: `${0.9 + (i % 5) * 0.18}s`,
        opacity: 0.18 + (i % 4) * 0.08
      }}
    />
  ))}
</div>


      {/* Clickable back button */}
      <button
        className="window-back-v3"
        onClick={() => setScreen('room')}
      >
        ← BACK TO ROOM
      </button>

    </div>
  </section>
)}


    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
