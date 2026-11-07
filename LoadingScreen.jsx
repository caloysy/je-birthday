import React from 'react';
import './loading-screen.css';

export default function LoadingScreen({ progress = 0, onEnter = () => {} }) {
  const percent = Math.max(0, Math.min(100, progress));
  return (
    <section className="birthday-loading" aria-label="Birthday game loading screen">
      <div className="birthday-loading-panel">
        <header className="birthday-loading-header"><span>BIRTHDAY.EXE</span><span>{percent === 100 ? 'READY!' : 'LOADING...'}</span></header>
        <div className="birthday-loading-content">
          <div className="birthday-loading-cake" aria-hidden="true">🎂</div>
          <h1>HELLO, LOVEEE!</h1>
          <p>Handa ka bang ma-amaze sa gawa ng asawa mong malupet?</p>
          <div className="birthday-loading-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Loading birthday world">
            <div className="birthday-loading-fill" style={{ width: `${percent}%` }} />
          </div>
          <div className="birthday-loading-status"><span>{percent === 100 ? 'ALL SYSTEMS READY!' : 'LOADING SURPRISES...'}</span><span>{percent}%</span></div>
          {percent === 100 && <button className="birthday-loading-enter" onClick={onEnter}>▶ ENTER ROOM</button>}
        </div>
      </div>
    </section>
  );
}
