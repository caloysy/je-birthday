import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const checks = ["Tumatae...", "Nangungulangot...", "Namimiss ka...", "ETO NA..."];
function App() {
  const [screen, setScreen] = useState("start");
  const [progress, setProgress] = useState(0);
  const [music, setMusic] = useState(false);
  const [volume, setVolume] = useState(60);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (screen !== "loading") return;
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + 5, 100)), 600);
    return () => clearInterval(interval);
  }, [screen]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume / 100;
    if (music) a.play().catch(() => setMusic(false));
    else a.pause();
  }, [music, volume]);

  return <main className="app">
    {screen === "start" && <section className="opening-screen">
      <button className="start-hotspot" onClick={() => setScreen("loading")} aria-label="Press start">
        <span className="sr-only">PRESS START</span>
      </button>
    </section>}
    {screen === "loading" && <section className="loading-screen">
      <div className="sky-stars" aria-hidden="true">✦　·　✧　·　✦　·　✧　·　✦</div>
      <div className="arcade-panel">
        <header className="arcade-header"><span>🎮 BIRTHDAY.EXE</span><span>{progress === 100 ? "READY!" : "BOOTING..."}</span></header>
        <div className="arcade-body">
          <div className="arcade-controller" aria-hidden="true">✦　🎮　✦</div>
          <h1 className="arcade-title">HELLO, LOVEEE!</h1>
          <div className="arcade-message">✦ <p>Handa ka na bang ma-amaze sa gawa ng asawa mong malupet?</p> ✦</div>
          <div className="arcade-progress-track"><div className="arcade-progress-fill" style={{width: `${progress}%`}} /></div>
          <div className="arcade-progress-labels"><span>{progress === 100 ? "ALL SYSTEMS READY!" : "LOADING BUSSENG..."}</span><span>{progress}%</span></div>
          <div className="arcade-checklist">{checks.map((item,i) => <div className={"arcade-check-item "+(progress >= (i+1)*25 ? "done" : "")} key={item}><span>{progress >= (i+1)*25 ? "☑" : "□"}</span> {item}</div>)}</div>
          {progress === 100 && <button className="arcade-enter-button" onClick={() => setScreen("room")}>▶ ENTER ROOM</button>}
        </div>
        <footer className="arcade-footer">♡ MADE WITH LOVE AND KAARTEHAN ♡</footer>
      </div>
      <div className="city-skyline" aria-hidden="true" />
    </section>}
    {screen === "room" && <section className="bedroom-screen">
      <div className="room-wrap">
        <div className="room-heading"><h1>✦ BIRTHDAY ROOM ✦</h1><span>click objects to explore</span></div>
        <div className="room-art" role="img" aria-label="Cozy pixel art birthday bedroom" />
        <p className="room-caption">A little room made just for you. Explore anything you like. ♡</p>
      </div>
      <div className="music-controls"><audio ref={audioRef} src="/birthday-song.mp3" loop preload="none" /><button onClick={() => setMusic(m => !m)}>♫ {music ? "PAUSE MUSIC" : "PLAY MUSIC"} ▶</button><label>🔊 <input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(Number(e.target.value))}/>{volume}%</label></div>
    </section>}
  </main>;
}
createRoot(document.getElementById("root")).render(<App />);
