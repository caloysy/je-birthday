
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [progress, setProgress] = useState(0);

  // 12-second loading animation
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
    }, 600);

    return () => clearInterval(interval);
  }, [screen]);

  const loadingMessages = [
    "Tumatae...",
    "Nangungulangot...",
    "Namimiss ka...",
    "ETO NA..."
  ];

  const thresholds = [25, 50, 75, 100];

  return (
    <main className="app">

      {/* OPENING SCREEN */}
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

      {/* RETRO ARCADE LOADING SCREEN */}
      {screen === "loading" && (
        <section className="loading-screen">

          <div className="boot-city" aria-hidden="true">
            <span className="city-stars">
              ✦ · ✧ · ✦ · ✧
            </span>
            <div className="city-skyline" />
          </div>

          <div className="arcade-panel">

            {/* HEADER */}
            <header className="arcade-header">
              <span>🎮 BIRTHDAY.EXE</span>
              <span>
                {progress >= 100 ? "READY!" : "BOOTING..."}
              </span>
            </header>

            {/* MAIN CONTENT */}
            <div className="arcade-body">

              <div
                className="arcade-controller"
                aria-hidden="true"
              >
                <span>✦</span>
                <span className="controller-symbol">
                  🎮
                </span>
                <span>✦</span>
              </div>

              <h1 className="arcade-title">
                HELLO, LOVEEE!
              </h1>

              <div className="arcade-message">
                <span className="message-sparkle">
                  ✦
                </span>

                <p>
                  Handa ka na bang ma-amaze sa gawa
                  ng asawa mong malupet?
                </p>

                <span className="message-sparkle">
                  ✦
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="arcade-progress">

                <div className="arcade-progress-track">
                  <div
                    className="arcade-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="arcade-progress-labels">
                  <span>
                    {progress >= 100
                      ? "ALL SYSTEMS READY!"
                      : "LOADING BUSSENG..."}
                  </span>

                  <span>{progress}%</span>
                </div>

              </div>

              {/* ANIMATED CHECKLIST */}
              <div className="arcade-checklist">
                {loadingMessages.map((message, index) => {
                  const done =
                    progress >= thresholds[index];

                  const active =
                    !done &&
                    (index === 0 ||
                      progress >= thresholds[index - 1]);

                  return (
                    <div
                      key={message}
                      className={
                        "arcade-check-item" +
                        (done ? " done" : "") +
                        (active ? " active" : "")
                      }
                    >
                      <span className="arcade-check-arrow">
                        {active ? "▶" : ""}
                      </span>

                      <span className="arcade-check-box">
                        {done ? "✓" : ""}
                      </span>

                      <span>{message}</span>
                    </div>
                  );
                })}
              </div>

              {/* ENTER ROOM BUTTON */}
              {progress >= 100 && (
                <button
                  className="arcade-enter-button"
                  onClick={() => setScreen("room")}
                >
                  ▶ ENTER ROOM
                </button>
              )}

            </div>
            {/* END OF ARCADE BODY */}

            {/* FOOTER */}
            <footer className="arcade-footer">
              ♡ MADE WITH LOVE AND KAARTEHAN ♡
            </footer>

          </div>
          {/* END OF ARCADE PANEL */}

        </section>
      )}

   
{/* INTERACTIVE BEDROOM */}
{screen === "room" && (
  <section className="bedroom-screen">
    <div className="bedroom-artwork">
      <img
        src="/bedroom.png"
        alt="Cozy pixel-art birthday bedroom"
        className="bedroom-image"
      />
    </div>
  </section>
)}


    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);
