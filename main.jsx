import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [screen, setScreen] = useState('start');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (screen !== 'loading') return;
    setProgress(0);
    const timer = setInterval(() => setProgress(p => Math.min(100, p + 5)), 600);
    return () => clearInterval(timer);
  }, [screen]);
  const checks = ['Tumatae...', 'Nangungulangot...', 'Namimiss ka...', 'ETO NA...'];
  return <main className="app">
    {screen === 'start' && <section className="opening-screen" aria-label="Birthday.exe opening artwork">
      <img className="opening-art" src="/opening-screen.png" alt="Pixel art birthday game opening with two people and Nailong the cat" />
      <button className="start-hotspot" onClick={() => setScreen('loading')} aria-label="Press start to begin" title="Press Start" />
    </section>}
    {screen === 'loading' && <section className="loading-screen">
      <div className="city-stars" aria-hidden="true">✦ · ✧ · ✦ · ✧ · ✦</div>
      <div className="arcade-panel">
        <header className="arcade-header"><span>🎮 BIRTHDAY.EXE</span><span>{progress === 100 ? 'READY!' : 'BOOTING...'}</span></header>
        <div className="arcade-body">
          <div className="arcade-controller">✦ 🎮 ✦</div>
          <h1 className="arcade-title">HELLO, LOVEEE!</h1>
          <div className="arcade-message">✦ <span>Handa ka na bang ma-amaze sa gawa ng asawa mong malupet?</span> ✦</div>
          <div className="arcade-progress-track"><div className="arcade-progress-fill" style={{width: `${progress}%`}} /></div>
          <div className="arcade-progress-labels"><span>{progress === 100 ? 'ALL SYSTEMS READY!' : 'LOADING BUSSENG...'}</span><span>{progress}%</span></div>
          <div className="arcade-checklist">{checks.map((label, i) => <div className={progress >= (i+1)*25 ? 'done' : ''} key={label}>{progress >= (i+1)*25 ? '☑' : '□'} {label}</div>)}</div>
          {progress === 100 && <button className="enter-button" onClick={() => setScreen('room')}>▶ ENTER ROOM</button>}
        </div>
        <footer className="arcade-footer">♡ MADE WITH LOVE AND KAARTEHAN ♡</footer>
      </div>
      <div className="skyline" aria-hidden="true" />
    </section>}
    {screen === 'room' && <section className="room-screen">
      <div className="room-wrap"><div className="room-heading"><h1>✦ BIRTHDAY ROOM ✦</h1><span>click objects to explore</span></div>
      <div className="room-image"><img src="/bedroom.png" alt="Birthday bedroom" onError={e => {e.currentTarget.style.display='none'; e.currentTarget.parentElement.classList.add('room-missing')}} /></div>
      <p>A little room made just for you. Explore anything you like. ♡</p></div>
    </section>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
