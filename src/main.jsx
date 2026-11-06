
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (screen !== "loading") return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }

        return Math.min(current + 5, 100);
      });
    }, 250);

    return () => clearInterval(interval);
  }, [screen]);

  useEffect(() => {
    if (screen !== "loading" || progress < 100) return;

    const timeout = setTimeout(() => {
      setScreen("room");
    }, 650);

    return () => clearTimeout(timeout);
  }, [screen, progress]);

  return (
    <main className="app">
      {screen === "start" && (
        <section className="opening-screen">
          <div className="computer-hotspot">
            <button
              className="start-button"
              onClick={() => setScreen("loading")}
              aria-label="Press start"
            >
              PRESS START
            </button>
          </div>
        </section>
      )}

     
{screen === "loading" && (
  <section className="loading-screen">
    <div className="loading-stars" aria-hidden="true">
      ✦ · ✧ · ✦
    </div>

    <div className="boot-panel">
      <div className="boot-header">
        <span>♡ BIRTHDAY.EXE</span>
        <span>BOOTING...</span>
      </div>

      <div className="boot-content">
        <div className="boot-heart">♡</div>

        <h1>HELLO, BIRTHDAY BOY!</h1>

        <p className="birthday-question">
          Handa ka na bang ma-amaze sa gawa ng
          asawa mong malupet?
        </p>

        <div className="loading-track">
          <div
            className="loading-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-status">
          <span>LOADING SURPRISES...</span>
          <span>{progress}%</span>
        </div>

        <p className="loading-message">
          {progress < 30
            ? "Initializing birthday magic..."
            : progress < 60
            ? "Collecting all the cuteness..."
            : progress < 90
            ? "Preparing your special world..."
            : "READY NA, ASAWA KO! ♡"}
        </p>
      </div>

      <div className="boot-footer">
        ✦ MADE WITH LOVE AND KAARTEHAN ✦
      </div>
    </div>
  </section>
)}

      {screen === "room" && (
        <section className="bedroom-screen">
          <h1>WELCOME TO BIRTHDAY.EXE</h1>
          <p>Your birthday world is ready.</p>
          <p>The interactive bedroom is coming next!</p>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);
