
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
    }, 100);

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
          <h1>BIRTHDAY.EXE</h1>

          <p>Loading birthday world...</p>

          <div className="loading-track">
            <div
              className="loading-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>{progress}%</p>

          <p className="loading-message">
            {progress < 30
              ? "Initializing memories..."
              : progress < 60
              ? "Preparing surprises..."
              : progress < 90
              ? "Loading cozy bedroom..."
              : "Welcome to your birthday!"}
          </p>
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
