import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

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
        <section className="loading-screen" aria-label="Loading your birthday world">
          <div className="forest-leaves forest-leaves-left" aria-hidden="true">🍃</div>
          <div className="forest-leaves forest-leaves-right" aria-hidden="true">🍃</div>
          <div className="forest-flowers forest-flowers-left" aria-hidden="true">✿ ❀ ✿</div>
          <div className="forest-flowers forest-flowers-right" aria-hidden="true">❀ ✿ ❀</div>

          <div className="forest-panel">
            <div className="panel-cake" aria-hidden="true">🎂</div>
            <header className="forest-header">
              <span>🎮 BIRTHDAY.EXE</span>
              <span>{progress === 100 ? 'READY!' : 'BOOTING...'}</span>
            </header>

            <div className="forest-body">
              <h1>HELLO, LOVEEE!</h1>
              <div className="forest-message">
                <span aria-hidden="true">♥</span>
                <p>Handa ka na bang ma-amaze sa gawa ng asawa mong malupet?</p>
                <span aria-hidden="true">♥</span>
              </div>

              <div className="forest-progress-wrap">
                <span className="progress-buddy buddy-left" aria-hidden="true">✿</span>
                <div
                  className="forest-progress-track"
                  role="progressbar"
                  aria-label="Loading birthday surprises"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div className="forest-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="progress-buddy buddy-right" aria-hidden="true">✦</span>
              </div>
              <div className="forest-progress-labels">
                <span>{progress === 100 ? 'ALL SYSTEMS READY!' : 'LOADING BUSSENG...'}</span>
                <span>{progress}%</span>
              </div>

              <div className="forest-checklist">
                {checks.map((label, index) => {
                  const complete = progress >= (index + 1) * 25;
                  return (
                    <div className={`forest-check ${complete ? 'complete' : ''}`} key={label}>
                      <span className="check-square" aria-hidden="true">{complete ? '✓' : ' '}</span>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>

              {progress === 100 && (
                <button className="enter-button" onClick={() => setScreen('room')}>
                  ▶ ENTER ROOM
                </button>
              )}
            </div>
            <footer className="forest-footer">♡ MADE WITH LOVE AND KAARTEHAN ♡</footer>
            <span className="panel-flower top-left" aria-hidden="true">✿</span>
            <span className="panel-flower top-right" aria-hidden="true">✿</span>
            <span className="panel-flower bottom-left" aria-hidden="true">✿</span>
            <span className="panel-flower bottom-right" aria-hidden="true">✿</span>
          </div>
        </section>
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
