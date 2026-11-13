
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

const moviesToWatch = [
  {
    title: 'Clayface',
    image: 'clayface.jpg',
    synopsis: 'An aspiring actor undergoes an experimental treatment after a terrible injury, with horrifying consequences.'
  },
  {
    title: 'Project Hail Mary',
    image: 'project-hail-mary.jpg',
    synopsis: 'An astronaut wakes up alone in space with no memory of his mission and must find a way to save Earth.'
  },
  {
    title: 'Deadstream',
    image: 'deadstream.jpg',
    synopsis: 'A disgraced livestreamer spends the night in a haunted house to win back his audience. Things go terribly wrong.'
  },
  {
    title: 'The Hunger Games: Sunrise on the Reaping',
    image: 'sunrise-on-the-reaping.jpg',
    synopsis: 'Young Haymitch Abernathy is chosen to compete in the deadly 50th Hunger Games.'
  },
  {
    title: 'Real Steel',
    image: 'real-steel.jpg',
    synopsis: 'A former boxer and his son team up to train an underdog robot for a chance at boxing glory.'
  },
  {
    title: 'The Lorax',
    image: 'the-lorax.jpg',
    synopsis: 'A young boy searches for a real tree and discovers the story of a creature who tried to protect the forest.'
  }
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
  const [moviesOpen, setMoviesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [lightMode, setLightMode] = useState('warm');

const toggleLight = () => {
  setLightMode((previous) =>
    previous === 'warm' ? 'cool' : 'warm'
  );
};
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

            <div className={`room-image ${lightMode === 'cool' ? 'room-cool' : 'room-warm'}`}>
              <img
                src="/bedroom-v2.png"
                alt="Cozy pixel-art birthday bedroom"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  event.currentTarget.parentElement.classList.add('room-missing');
                }}
              />
<div className="room-light-overlay" aria-hidden="true" />
             
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

{/* CLICKABLE GAMING CHAIR */}
<path
  className="chair-svg-hotspot"
  

d="
  M 421 293
  Q 427 290 440 292
  L 461 297
  Q 473 301 478 317
  L 483 378
  L 504 376
  Q 510 378 510 385
  L 504 392
  L 483 395
  L 483 408
  L 478 412
  L 478 431
  L 512 437
  Q 519 439 515 445
  L 477 441
  L 451 451
  L 445 446
  L 461 433
  L 432 437
  Q 427 436 430 430
  L 462 424
  L 462 411
  L 437 411
  Q 421 407 420 392
  Z
"


  role="button"
  tabIndex={0}
  aria-label="Open Je's character profile"
  onClick={() => setProfileOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setProfileOpen(true);
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

{/* CLICKABLE STAR LIGHT */}
<polygon
  className="star-light-hotspot"
 points="579,92 588,108 605,110 593,123 596,142 579,134 562,142 565,123 553,110 570,108"
  role="button"
  tabIndex={0}
  aria-label={`Switch to ${lightMode === 'warm' ? 'cool' : 'warm'} lighting`}
  onClick={toggleLight}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleLight();
    }
  }}
/>

{/* CLICKABLE WALL CALENDAR */}
<rect
  className="calendar-svg-hotspot"
  x="598"
  y="163"
  width="53"
  height="55"
  rx="2"
  role="button"
  tabIndex={0}
  aria-label="Open November birthday calendar"
  onClick={() => setCalendarOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setCalendarOpen(true);
    }
  }}
/>
 
{/* CLICKABLE BOOKSHELF */}
<polygon
  className="bookshelf-svg-hotspot"
  points="286,170 400,170 400,432 286,432"
  role="button"
  tabIndex={0}
  aria-label="Open movies to watch"
  onClick={() => setMoviesOpen(true)}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setMoviesOpen(true);
    }
  }}
/>

{/* CLICKABLE SLEEPING CAT */}

{/* CLICKABLE SLEEPING CAT */}
<path
  className="cat-svg-hotspot"
 
d="
  M 151 445
  Q 153 427 169 418
  Q 185 410 205 415
  Q 219 418 226 430
  Q 235 425 242 432
  L 248 444
  Q 255 443 259 452
  Q 260 460 250 465
  Q 239 469 220 467
  Q 198 470 181 466
  Q 163 463 155 455
  Q 149 450 151 445
  Z
"
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

{/* BIRTHDAY CALENDAR POPUP */}
{calendarOpen && (
  <div
    className="calendar-overlay"
    onClick={() => setCalendarOpen(false)}
  >
    <div
      className="calendar-popup"
      role="dialog"
      aria-modal="true"
      aria-label="November 2026 birthday calendar"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="calendar-titlebar">
        <span>▣ CALENDAR.EXE</span>
        <button
          type="button"
          onClick={() => setCalendarOpen(false)}
          aria-label="Close calendar"
        >
          ✕
        </button>
      </div>

      <div className="calendar-content">
        <div className="calendar-decoration">✦ ♡ ✦</div>

        <h2>NOVEMBER</h2>
        <div className="calendar-year">2026</div>

        <div className="calendar-grid">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div className="calendar-weekday" key={day}>
              {day}
            </div>
          ))}

          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                className={`calendar-day ${day === 16 ? 'birthday-day' : ''}`}
              >
                <span>{day}</span>
                {day === 16 && <span className="calendar-heart">♡</span>}
              </div>
            );
          })}
        </div>

        <div className="calendar-birthday-note">
          <span>NOVEMBER 16</span>
          <h3>Je's Birthday!</h3>
          <p>Reminder: Ipaalala sa kanya na age doesnt matter</p>
        </div>

        <div className="calendar-footer">
          ✦ WAG KA SANA MAMATAY ✦
        </div>
      </div>
    </div>
  </div>
)}

{/* JE CHARACTER PROFILE */}
{profileOpen && (
  <div
    className="profile-overlay"
    onClick={() => setProfileOpen(false)}
  >
    <div
      className="profile-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Je's character profile"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="profile-titlebar">
        <span>▣ JE.EXE</span>
        <button
          type="button"
          onClick={() => setProfileOpen(false)}
          aria-label="Close character profile"
        >
          ✕
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">🎮</div>

          <div className="profile-identity">
            <span className="profile-tag">✦ CHARACTER UNLOCKED ✦</span>
            <h2>JE</h2>
            <p>CLASS: MAIN CHARACTER</p>
            <p>BIRTHDAY: NOVEMBER 16</p>
            <span className="profile-rarity">★ LEGENDARY ★</span>
          </div>
        </div>

        <div className="profile-section-title">
          ✦ CHARACTER STATS ✦
        </div>

        <div className="profile-stats">
          {[
            { name: 'Kindness', value: 95 },
            { name: 'Humor', value: 90 },
            { name: 'Patience with Jiks', value: 100 },
            { name: 'Gaming Skills', value: 85 },
            { name: 'Main Character Energy', value: 100 }
          ].map((stat) => (
            <div className="profile-stat" key={stat.name}>
              <div className="profile-stat-label">
                <span>{stat.name}</span>
                <span>{stat.value}/100</span>
              </div>
              <div className="profile-stat-track">
                <div
                  className="profile-stat-fill"
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="profile-section-title">
          ✦ SPECIAL ABILITY ✦
        </div>

        <div className="profile-ability">
          ♡ Making ordinary days feel like adventures.
        </div>

        <div className="profile-message">
          <span>✦ NEW CHAPTER UNLOCKED ✦</span>
          <h3>ANOTHER YEAR OF JE!</h3>
          <p>
            May this next chapter bring you everything
            you've been working and hoping for.
            I'll always be cheering you on. ♡
          </p>
        </div>

        <div className="profile-footer">
          ♡ ONE OF A KIND ♡
        </div>
      </div>
    </div>
  </div>
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

{/* BOOKSHELF MOVIE WATCHLIST */}
{moviesOpen && (
  <div className="movies-overlay">
    <div
      className="movies-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Movies to watch"
    >
      <div className="movies-titlebar">
        <span>▣ MOVIENIGHT.EXE</span>
        <button
          type="button"
          onClick={() => setMoviesOpen(false)}
          aria-label="Close movie watchlist"
        >
          ✕
        </button>
      </div>

      <div className="movies-content">
        <div className="movies-intro">
          <span>✦ 🎬 ✦</span>
          <h2>MOVIES TO WATCH</h2>
          <p>Our little movie night list ♡</p>
        </div>

        <div className="movies-grid">
          {moviesToWatch.map((movie) => (
            <article className="movies-card" key={movie.title}>
              <div className="movies-poster">
                <img
                  src={`/${movie.image}`}
                  alt={`${movie.title} poster`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="movies-card-info">
                <h3>{movie.title}</h3>
                <p>{movie.synopsis}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="movies-footer">
          ✦ SIX MOVIES, MANY MOVIE NIGHTS TO COME ✦
        </div>
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
  <div className="cat-fish-icons">
    {[0, 1, 2].map((i) => (
      <span key={i}>
        {i < Math.min(3, petCount % 5) ? '🐟' : '◇'}
      </span>
    ))}
  </div>

  <div className="cat-progress-track">
    <div
      className="cat-progress-fill"
      style={{ width: `${(petCount % 5) * 20}%` }}
    />
  </div>
</div>

        <div className="cat-dialogue">
          {catMessage}
        </div>

        <div className="cat-floating-heart" key={catHeart}>
          {catHeart > 0 ? '♡' : ''}
        </div>

        <div className="cat-counter">
  🐾 PETS GIVEN: {petCount}
</div>

<button
  className="cat-pet-button"
  onClick={petNailong}
>
  🐾 PET
</button>

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
