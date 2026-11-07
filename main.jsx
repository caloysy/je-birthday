
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import LoadingScreen from './LoadingScreen';

function App() {
  const [screen, setScreen] = useState('start');
  const [progress, setProgress] = useState(0);
  const musicRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [giftOpen, setGiftOpen] = useState(false);
  
const toggleMusic = async () => {
  const audio = musicRef.current;
  if (!audio) return;

  if (!audio.paused) {
    audio.pause();
    setMusicPlaying(false);
  } else {
    try {
      if (audio.currentTime >= 137) audio.currentTime = 0;
      await audio.play();
      setMusicPlaying(true);
    } catch (error) {
      console.error('Music could not start:', error);
    }
  }
};

  useEffect(() => {
    if (screen !== 'loading') return;

    setProgress(0);

    const timer = window.setInterval(() => {
      setProgress((previous) => Math.min(100, previous + 5));
    }, 350);

    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
  if (musicRef.current) {
    musicRef.current.volume = volume;
  }
}, [volume]);
  return (
    <main className="app">


<audio
  ref={musicRef}
  src="/birthday-song.mp3"
  preload="metadata"
  onLoadedMetadata={(event) => {
    event.currentTarget.volume = volume;
  }}
  onTimeUpdate={(event) => {
    if (event.currentTarget.currentTime >= 137) {
      event.currentTarget.currentTime = 0;
      if (event.currentTarget.paused) {
        event.currentTarget.play().catch(console.error);
      }
    }
  }}
  onPlay={() => setMusicPlaying(true)}
  onPause={() => setMusicPlaying(false)}
  onEnded={() => setMusicPlaying(false)}
/>

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

{/* COMPACT MUSIC PLAYER */}
<div className="mini-music-player">
  <div className="mini-music-status">
    ♫ {musicPlaying ? 'NOW PLAYING' : 'PAUSED'}
  </div>

  <div className="mini-music-controls">
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={musicPlaying ? 'Pause music' : 'Play music'}
    >
      {musicPlaying ? 'Ⅱ' : '▶'}
    </button>

    <span>♫</span>

    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(event) =>
        setVolume(Number(event.target.value))
      }
      aria-label="Music volume"
    />
  </div>
</div>
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

             
{/* CUSTOM-SHAPED CLICKABLE WINDOW */}
<svg
  className="room-hotspots"
  viewBox="0 0 1000 562.5"
  preserveAspectRatio="none"
  aria-label="Interactive bedroom objects"
>
  <polygon
    className="window-svg-hotspot"
    points="42,148 232,170 232,310 42,327"
    role="button"
    tabIndex={0}
    aria-label="Look outside the window"
    onClick={() => setScreen('window')}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setScreen('window');
      }
    }}
  />
  

<rect
  className="speaker-svg-hotspot"
 x="591"
y="275"
width="27"
height="43"
  rx="3"
  role="button"
  tabIndex={0}
  aria-label={musicPlaying ? 'Pause music' : 'Play music'}
  onClick={toggleMusic}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMusic();
    }
  }}
/>

  <rect
  className="gift-svg-hotspot"
 x="694"
y="392"
width="51"
height="55"
  rx="3"
  role="button"
  tabIndex={0}
  aria-label="Open birthday present"
 onClick={() => setGiftOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setGiftOpen(true);
    }
  }}
/>

</svg>

            </div>

            <p>
              A little room made just for you.
              Explore anything you like. ♡
            </p>

          </div>
        </section>
      )}


{/* GIFT LETTER */}
{giftOpen && (
  <div className="gift-overlay">
    <div
      className="gift-letter"
      role="dialog"
      aria-modal="true"
      aria-label="Birthday letter"
    >

      {/* RETRO COMPUTER TITLE BAR */}
      <div className="gift-titlebar">
        <span className="gift-titlebar-name">
          ▤ Letter.txt
        </span>

        <button
          type="button"
          className="gift-close"
          onClick={() => setGiftOpen(false)}
          aria-label="Close letter"
        >
          ✕
        </button>
      </div>

      {/* LETTER CONTENT */}

    <div className="gift-letter">
      <button
        className="gift-close"
        onClick={() => setGiftOpen(false)}
        aria-label="Close letter"
      >
        ✕
      </button>

    

      <div className="gift-letter-message">

  <p>Hi Love,</p>

  <p>
    Ayos ba? HEHE. Happy Birthday!
  </p>

  <p>
    I love you so much. Thank you for bringing so much happiness
    into my life and for always supporting me in everything I do.
    I never thought I'd enjoy someone's presence as much as I
    enjoy yours. You make even the simplest moments something
    I look forward to.
  </p>

  <p>
    But more than anything, I hope you know how much you deserve
    all the good things life has to offer. Sana matupad mo lahat
    ng pangarap mo sa buhay, even the ones I don't know about yet.
    I hope you never lose the things that make you <em>you</em>,
    and that you continue doing what makes you happy. I hope this
    year brings you more reasons to smile, more games to enjoy,
    more achievements to unlock (HEHE), and more memories to
    look back on.
  </p>

  <p>
    I'm so excited for all the things waiting for you in the
    future, and I hope I get to be there to witness them.
    I want to experience life with you, so please celebrate
    many, many more birthdays and wait for me so I can finally
    celebrate them with you, too.
  </p>

  <p>
    I'm always rooting for you, bebe. I'm so proud of you,
    and I hope you're proud of yourself, too.
  </p>

  <p>
    Mahal na mahal kita
  </p>
 </div>

    </div>
  </div>
      
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
  {Array.from({ length: 250 }, (_, i) => (
    <span
      key={i}
      className="pixel-raindrop"
      style={{
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 23.3) % 100}%`,
        height: `${6 + (i % 5) * 3}px`,
        opacity: 0.18 + (i % 5) * 0.08,
        animationDuration: `${0.8 + (i % 7) * 0.16}s`,
        animationDelay: `${-((i * 0.37) % 2.5)}s`
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
