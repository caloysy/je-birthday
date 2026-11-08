
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import LoadingScreen from './LoadingScreen';

const playedGames = [
  { name: 'Minecraft', image: 'minecraft.png' },
  { name: 'Mobile Legends', image: 'mobile-legends.png' },
  { name: 'Valorant', image: 'valorant.png' },
  { name: 'Overcooked', image: 'overcooked.png' },
  { name: 'PEAK', image: 'peak.png' },
  { name: 'BoomBanana', image: 'boombanana.png' },
  { name: 'Supermarket Together', image: 'supermarket-together.png' },
  { name: 'Roblox', image: 'roblox.png' },
  { name: 'R.E.P.O.', image: 'repo.png' }
];

const wishlistGames = [
  { name: 'It Takes Two', image: 'it-takes-two.png' },
  { name: 'Carry The Glass', image: 'carry-the-glass.png' },
  { name: 'PICO PARK', image: 'pico-park.png' },
  { name: 'Lethal Company', image: 'lethal-company.png' },
  { name: 'Chained Together', image: 'chained-together.png' },
  { name: 'RV There Yet?', image: 'rv-there-yet.png' },
  { name: 'Content Warning', image: 'content-warning.png' }
];

function GameCollection({ games, status }) {
  return (
    <div className="games-grid">
      {games.map((game) => (
        <div className="games-card" key={game.name}>
          <div className="games-cover">
            <img
              src={`/${game.image}`}
              alt={`${game.name} cover`}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <span className="games-cover-placeholder">♫ GAME ♫</span>
          </div>
          <div className="games-card-info">
            <span className="games-card-name">{game.name}</span>
            <span className={`games-status ${status}`}>
              {status === 'played' ? '✓ PLAYED' : '♡ TO PLAY'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('start');
  const [progress, setProgress] = useState(0);
  const musicRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [giftOpen, setGiftOpen] = useState(false);
  const [cakeOpen, setCakeOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
const [petCount, setPetCount] = useState(0);
const [catMessage, setCatMessage] = useState(
  "Shhh... the little cat is sleeping. Give it a pet!"
);
const [catHeart, setCatHeart] = useState(0);

const catDialogues = [
  "Ay, ginising mo ako. May pagkain ka ba?",
  "Isa pa. Hindi pa sapat.",
  "Meow. Libre lang naman mang-pet, diba?",
  "Okay, favorite human na kita. Slightly.",
  "Grabe ka naman. Wala ka bang ibang gagawin?",
  "Sige lang. Ako naman ang boss dito.",
  "Pet mo lang ako. Wala kang choice.",
  "Uy, baka ma-fall ako sa'yo niyan.",
  "Konti na lang... may sikreto ako.",
  "MEOW! Tatay na kita ngayon. 🐱"
];

const petNailong = () => {
  const nextCount = petCount + 1;
  setPetCount(nextCount);
  setCatHeart((previous) => previous + 1);
  setCatMessage(catDialogues[(nextCount - 1) % catDialogues.length]);
};
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
  Math.max(
    0,
    new Date('2026-11-16T00:00:00+08:00').getTime() - Date.now()
  )
);

useEffect(() => {
  const birthday = new Date('2026-11-16T00:00:00+08:00');

  const updateCountdown = () => {
    setTimeLeft(Math.max(0, birthday.getTime() - Date.now()));
  };

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
}, []);

const birthdayUnlocked = timeLeft === 0;

const days = Math.floor(timeLeft / 86400000);
const hours = Math.floor((timeLeft / 3600000) % 24);
const minutes = Math.floor((timeLeft / 60000) % 60);
const seconds = Math.floor((timeLeft / 1000) % 60);
  
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


{/* CLICKABLE BIRTHDAY CAKE */}
<rect
  className="cake-svg-hotspot"
x="594"
y="375"
width="78"
height="74"
  rx="3"
  role="button"
  tabIndex={0}
  aria-label="Blow out birthday candles"
  onClick={() => setCakeOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setCakeOpen(true);
    }
  }}
/>

{/* CLICKABLE COMPUTER */}
<rect
  className="computer-svg-hotspot"
  x="458"
  y="218"
  width="126"
  height="80"
  rx="3"
  role="button"
  tabIndex={0}
  aria-label="Open our game collection"
  onClick={() => setGamesOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setGamesOpen(true);
    }
  }}
/>
{/* CLICKABLE SLEEPING CAT */}
<rect
  className="cat-svg-hotspot"
  x="300"
  y="375"
  width="115"
  height="95"
  rx="5"
  role="button"
  tabIndex={0}
  aria-label="Pet the sleeping cat"
  onClick={() => setCatOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setCatOpen(true);
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


{/* BIRTHDAY CAKE POPUP */}
{cakeOpen && (
  <div className="cake-overlay">
    <div className="cake-popup">

      <div className="cake-titlebar">
        <span>🎂 Birthday.exe</span>
        <button
          type="button"
          onClick={() => {
            setCakeOpen(false);
          }}
          aria-label="Close birthday cake"
        >
          ✕
        </button>
      </div>

      <div className="cake-content">
        <h2>
          {candlesBlown
            ? 'HAPPY BIRTHDAY, LOVE!'
            : 'MAKE A WISH! ♡'}
        </h2>

        <div className="cake-art">
          <div className="cake-candles">
            {[0, 1, 2].map((i) => (
              <div className="cake-candle" key={i}>
                {!candlesBlown && (
                  <span className="cake-flame">✦</span>
                )}
                <span className="cake-wick" />
                <span className="cake-stick" />
              </div>
            ))}
          </div>

          <div className="cake-frosting" />
          <div className="cake-layer">♡ ♡ ♡</div>
          <div className="cake-plate" />
        </div>

        {candlesBlown ? (
          <>
            <div className="cake-confetti" aria-hidden="true">
              {Array.from({ length: 35 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${(i * 37) % 100}%`,
                    animationDelay: `${(i % 10) * -0.2}s`,
                    background: [
                      '#f4a8bc',
                      '#ffdd89',
                      '#9acbd3',
                      '#b9d6a4'
                    ][i % 4]
                  }}
                />
              ))}
            </div>

            <p>
              Another year of you making the world
              a little brighter. ♡
            </p>

            <button
              className="cake-action"
              onClick={() => setCandlesBlown(false)}
            >
              ↻ MAKE ANOTHER WISH
            </button>
          </>
        ) : (
          <>
           {!birthdayUnlocked ? (
  <div className="cake-countdown">
    <p>♡ YOUR BIRTHDAY BEGINS IN ♡</p>

    <div className="cake-countdown-numbers">
      <span>{days}d</span>
      <span>{String(hours).padStart(2, '0')}h</span>
      <span>{String(minutes).padStart(2, '0')}m</span>
      <span>{String(seconds).padStart(2, '0')}s</span>
    </div>

    <p>Wait until midnight, bebe! ♡</p>
  </div>
) : (
  <p>MAKE A WISH! ♡</p>
)}

            <button
              className="cake-action"
              onClick={() => setCandlesBlown(true)}
              disabled={!birthdayUnlocked}
            >
              ✦ BLOW CANDLES ✦
            </button>
          </>
        )}
      </div>
    </div>
  </div>
)}

 
{/* OUR GAMES COMPUTER POPUP */}
{gamesOpen && (
  <div className="games-overlay">
    <div
      className="games-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Our game collection"
    >
      <div className="games-titlebar">
        <span>▣ OurGames.exe</span>
        <button
          type="button"
          onClick={() => setGamesOpen(false)}
          aria-label="Close game collection"
        >
          ✕
        </button>
      </div>

      <div className="games-content">
        <div className="games-intro">
          <span className="games-intro-icon">✦ ♡ ✦</span>
          <h2>GAME LIBRARY</h2>
          <p>A collection of adventures, past and future.</p>
        </div>

        <section className="games-section">
          <div className="games-section-heading">
            <h3>✓ GAMES WE'VE PLAYED</h3>
            <span>9 GAMES</span>
          </div>
          <GameCollection
            games={playedGames}
            status="played"
          />
        </section>

        <section className="games-section">
          <div className="games-section-heading">
            <h3>♡ GAMES WE SHOULD PLAY</h3>
            <span>7 GAMES</span>
          </div>
          <GameCollection
            games={wishlistGames}
            status="wishlist"
          />
        </section>

        <div className="games-footer">
          <span>✦ MORE ADVENTURES TO COME ✦</span>
          <p>
            Alam mo namang bulok ako maglaro kaya bawal ka magreklamo pag kalaro ako ha?. Labyu. 
          </p>
        </div>
      </div>

      <div className="games-bottom-bar">
        <span>♡ OURGAMES.EXE</span>
        <span>16 GAMES COLLECTED</span>
      </div>
    </div>
  </div>
)}
{/* NAILONG CAT POPUP */}
{catOpen && (
  <div className="cat-overlay">
    <div
      className="cat-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Nailong pet simulator"
    >
      <img
        className="cat-background"
        src="/cat-room.png"
        alt="Nailong resting in a cozy pixel-art room"
      />

      <button
        className="cat-close"
        onClick={() => setCatOpen(false)}
        aria-label="Close cat popup"
      />

      <div className="cat-interface">
        <div className="cat-progress">
          <span>🐟</span>
          <div className="cat-progress-track">
            <div
              className="cat-progress-fill"
              style={{
                width: `${Math.min(petCount, 10) * 10}%`
              }}
            />
          </div>
          <span>♡</span>
        </div>

        <div className="cat-dialogue">
          {catMessage}
        </div>

        <div className="cat-floating-heart" key={catHeart}>
          {catHeart > 0 ? '♡' : ''}
        </div>

        <div className="cat-controls">
          <p>🐾 PETS GIVEN: {petCount}</p>

          <button
            className="cat-pet-button"
            onClick={petNailong}
          >
            🐾 PET
          </button>
        </div>

        <div className="cat-achievements">
          <h3>✦ ACHIEVEMENTS ✦</h3>

          <div className="cat-achievement-grid">
            <div className={petCount >= 5 ? 'cat-achievement unlocked' : 'cat-achievement'}>
              <span>{petCount >= 5 ? '🏆' : '🔒'}</span>
              <strong>
                {petCount >= 5 ? 'Certified Cat Servant' : '???'}
              </strong>
              <small>
                {petCount >= 5 ? 'UNLOCKED!' : 'Unlock at 5 pets'}
              </small>
            </div>

            <div className={petCount >= 10 ? 'cat-achievement unlocked' : 'cat-achievement'}>
              <span>{petCount >= 10 ? '👑' : '🔒'}</span>
              <strong>
                {petCount >= 10 ? 'Tatay ni Nailong' : '???'}
              </strong>
              <small>
                {petCount >= 10 ? 'IDENTITY REVEALED!' : 'Unlock at 10 pets'}
              </small>
            </div>
          </div>
        </div>

        {petCount >= 10 && (
          <div className="cat-reveal">
            ✦ IDENTITY REVEALED: NAILONG ✦
          </div>
        )}
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
