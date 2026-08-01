import React, { useState, useEffect } from 'react';
import { 
  Heart, Music, Volume2, Sparkles, BookOpen, Image as ImageIcon, 
  Mail, Stars, Flower2, PartyPopper, Brain, Moon, Award, RotateCcw, 
  Lock, Unlock, ArrowRight, Check, X, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

import ThreeHeart from './components/ThreeHeart';
import ParticleCanvas from './components/ParticleCanvas';
import LightboxModal from './components/LightboxModal';
import { 
  fetchJournalInfo, fetchTimeline, fetchGallery, 
  fetchReasons, fetchQuiz, submitQuizScore, unlockSurprise 
} from './services/api';

const iconMap = {
  mail: Mail,
  favorite: Heart,
  auto_awesome: Sparkles,
  auto_stories: BookOpen,
  stars: Stars,
  spa: Flower2,
  celebration: PartyPopper,
  psychology: Brain,
  nightlight: Moon,
  music_note: Music,
};

export default function App() {
  // State
  const [info, setInfo] = useState(null);
  const [timelineItems, setTimelineItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  
  // Interactive UI states
  const [showWelcomeGate, setShowWelcomeGate] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [flippedReasons, setFlippedReasons] = useState({});
  const [activeSection, setActiveSection] = useState('home');

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Surprise state
  const [passcode, setPasscode] = useState('');
  const [letterData, setLetterData] = useState(null);
  const [surpriseError, setSurpriseError] = useState('');
  const [isLetterUnlocked, setIsLetterUnlocked] = useState(false);

  // Load Data from Express API
  useEffect(() => {
    fetchJournalInfo().then(data => setInfo(data));
    fetchTimeline().then(data => setTimelineItems(data));
    fetchGallery().then(data => setGalleryItems(data));
    fetchReasons().then(data => setReasons(data));
    fetchQuiz().then(data => setQuizQuestions(data));
  }, []);

  // Relationship Counter
  useEffect(() => {
    const anniversaryDate = info?.anniversaryDate 
      ? new Date(info.anniversaryDate)
      : new Date('2025-11-19T00:00:00.000Z');

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, now - anniversaryDate);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [info]);

  // ScrollSpy for Active Section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'timeline', 'gallery', 'reasons', 'quiz', 'surprise'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reasons Flip Handler
  const toggleReasonFlip = (id) => {
    setFlippedReasons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz Option Handler
  const handleQuizAnswer = (idx) => {
    if (isQuizAnswered) return;
    setSelectedOpt(idx);
    setIsQuizAnswered(true);

    const currentQ = quizQuestions[quizIdx];
    const isCorrect = currentQ.correct === -1 || idx === currentQ.correct;
    if (isCorrect) setQuizScore(prev => prev + 1);

    setTimeout(() => {
      if (quizIdx < quizQuestions.length - 1) {
        setQuizIdx(prev => prev + 1);
        setSelectedOpt(null);
        setIsQuizAnswered(false);
      } else {
        const finalScore = isCorrect ? quizScore + 1 : quizScore;
        submitQuizScore(finalScore, quizQuestions.length);
        setShowQuizResult(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setIsQuizAnswered(false);
    setShowQuizResult(false);
  };

  // Dynamic Date Formatter for Secret Letter
  const getTodayFormattedDate = () => {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const day = now.getDate();
    const year = now.getFullYear();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';
    return `${month} ${day}${suffix}, ${year}`;
  };

  // Default Surprise Letter Fallback
  const DEFAULT_LETTER = {
    date: getTodayFormattedDate(),
    greeting: "My Dearest Prerna,",
    paragraphs: [
      "I've been keeping this here for the moment you found it. Every day with you feels like a new chapter of a story I never want to end. From the day we sat together enjoying dosa at Marine Drive, with the sea breeze, the sound of the waves, and the lights stretching across Girgaon Chowpatty, I knew those moments would stay with me forever.",
      "That simple date became one of my favorite memories—not because of the place or the food, but because I was there with you. Every laugh, every conversation, and every quiet moment beside the ocean made my heart feel completely at home.",
      "You are my greatest adventure, my favorite person to make memories with, and the most beautiful part of my life. No matter where we go next, that dosa date at Marine Drive will always be one of the sweetest chapters of our story."
    ],
    closing: "Forever yours,",
    signature: "— Suraj",
    polaroid: {
      caption: "Forever & Always ❤️",
      image: "/photo5.jpg"
    }
  };

  // Surprise Unlock Handler
  const handleUnlockSurprise = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setSurpriseError('Please enter a passcode!');
      return;
    }

    try {
      const res = await unlockSurprise(passcode);
      if (res && res.success && res.data) {
        setLetterData(res.data);
      } else {
        setLetterData(DEFAULT_LETTER);
      }
    } catch (err) {
      setLetterData(DEFAULT_LETTER);
    }
    setIsLetterUnlocked(true);
    setSurpriseError('');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="relative min-h-screen bg-[#fff8f7] text-[#3d0506] font-sans overflow-x-hidden">
      {/* Floating Sparkle Particles */}
      <ParticleCanvas />

      {/* Welcome Music Intro Gate */}
      {showWelcomeGate && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#fff8f7] border-4 border-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#b0004a] to-[#fd6c9c] text-white rounded-full flex items-center justify-center mb-5 shadow-lg animate-bounce">
              <Music className="w-10 h-10" />
            </div>

            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe9e7] border border-[#ffd9de] text-[#b0004a] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Happy Girlfriend Day!
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#b0004a] mb-3">
              Welcome, Prerna! 💕
            </h2>

            <p className="font-sans text-sm text-[#5a4044] mb-8 leading-relaxed">
              Suraj created this digital journal for you. Turn on our special background song for the best experience!
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  setIsPlayingMusic(true);
                  setShowWelcomeGate(false);
                  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                }}
                className="w-full py-4 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white rounded-full font-sans font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Music className="w-5 h-5 animate-pulse" /> Play Our Song & Begin 🎵
              </button>

              <button
                onClick={() => setShowWelcomeGate(false)}
                className="w-full py-3 bg-transparent text-[#8e6f74] hover:text-[#b0004a] text-xs font-semibold font-sans transition-colors"
              >
                Enter Quietly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden YouTube Background Audio Player */}
      {isPlayingMusic && (
        <iframe
          width="1"
          height="1"
          src="https://www.youtube.com/embed/Bu2JHWqO6Qc?autoplay=1&loop=1&playlist=Bu2JHWqO6Qc&enablejsapi=1"
          title="Background Music"
          allow="autoplay"
          className="absolute top-0 left-0 opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
        />
      )}

      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#fff8f7]/85 backdrop-blur-xl shadow-[0px_10px_30px_rgba(74,14,14,0.08)] flex items-center justify-between px-6 py-4 transition-all">
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 cursor-pointer text-[#b0004a] hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className="w-6 h-6 fill-current" />
        </div>
        
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#b0004a] tracking-tight">
          Our Story
        </h1>

        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="p-2 text-[#b0004a] hover:scale-110 active:scale-95 transition-transform relative group"
        >
          {isPlayingMusic ? <Volume2 className="w-6 h-6 animate-pulse text-[#d81b60]" /> : <Music className="w-6 h-6" />}
          <span className="absolute right-0 top-12 bg-white text-[#3d0506] px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            {isPlayingMusic ? "Playing 'Our Song' ♪" : "Play Our Song"}
          </span>
        </button>
      </header>

      {/* SECTION 1: HOME */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6">
        <div className="flex flex-col items-center text-center max-w-3xl w-full">
          <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffe9e7] border border-[#ffd9de] text-[#b0004a] text-xs font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Happy Girlfriend Day!
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-[#b0004a] mb-4 tracking-tight font-bold">
            To My Dearest <span className="italic underline decoration-[#fd6c9c] decoration-4">{info?.couple?.to || 'Prerna'}</span>
          </h2>

          <div className="relative w-full my-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#fd6c9c]/10 blur-3xl rounded-full scale-75 animate-pulse" />
            <ThreeHeart />
          </div>

          {/* Featured Couple Photo Polaroid */}
          <div className="polaroid-frame max-w-xs w-full my-4 rotate-[1.5deg] border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300">
            <img src="/photo8.jpg" alt="Suraj and Prerna" className="w-full aspect-[4/3] object-cover rounded-sm mb-3" />
            <p className="font-handwritten text-3xl text-[#5a4044] text-center">Suraj & Prerna ❤️</p>
          </div>

          {/* Relationship Counter */}
          <div className="mt-4 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white shadow-[0_10px_30px_rgba(74,14,14,0.08)] w-full max-w-xl">
            <p className="font-sans text-xs font-bold text-[#ab2c5d] uppercase tracking-[0.2em] mb-6">
              Our Journey Together
            </p>

            <div className="grid grid-cols-4 gap-2 md:gap-6">
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                  {String(elapsed.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                  {String(elapsed.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                  {String(elapsed.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Mins</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                  {String(elapsed.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Secs</span>
              </div>
            </div>
          </div>

          <div 
            onClick={() => scrollToSection('timeline')}
            className="mt-8 flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-xs text-[#8e6f74] font-bold uppercase tracking-wider">Scroll To Explore</span>
            <div className="bouncing-heart text-[#b0004a]">
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TIMELINE */}
      <section id="timeline" className="relative z-10 py-24 px-6 max-w-screen-md mx-auto space-y-16 border-t border-[#ffd9de]/40">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">Our Memories</h2>
          <p className="font-sans text-sm text-[#5a4044]">The story of how our paths crossed and grew into something beautiful.</p>
        </div>

        {timelineItems.map((item) => {
          if (item.type === 'polaroid' && item.subtitle === 'How We Met...') {
            return (
              <div key={item.id} className="flex flex-col items-center">
                <div className="polaroid-frame max-w-sm w-full rotate-[1.5deg]">
                  <img src={item.image} alt={item.title} className="w-full aspect-square object-cover mb-4 rounded-sm" />
                  <p className="font-handwritten text-3xl text-[#5a4044] text-center">{item.caption}</p>
                </div>
                <div className="mt-8 text-center max-w-md">
                  <h3 className="font-sans text-xl font-bold text-[#ab2c5d] mb-3">{item.title}</h3>
                  <p className="font-sans text-sm md:text-base text-[#5a4044] leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          }

          if (item.type === 'text' || item.type === 'chat') {
            return (
              <div key={item.id} className="flex flex-col items-center">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(74,14,14,0.08)] border border-white max-w-md w-full text-center">
                  <span className="text-[#ab2c5d] font-sans text-xs font-bold uppercase tracking-widest block mb-2">{item.subtitle}</span>
                  <h3 className="font-serif text-2xl font-bold text-[#b0004a] mb-4">{item.title}</h3>
                  <p className="font-sans text-sm md:text-base text-[#5a4044] leading-relaxed italic">{item.description}</p>
                </div>
              </div>
            );
          }

          if (item.type === 'polaroid' && item.subtitle === 'The Red Bistro') {
            return (
              <div key={item.id} className="flex flex-col items-center">
                <div className="polaroid-frame max-w-sm w-full -rotate-[2deg]">
                  <img src={item.image} alt={item.title} className="w-full aspect-square object-cover mb-4 rounded-sm" />
                  <div className="space-y-1 text-center">
                    <p className="font-handwritten text-3xl text-[#5a4044]">{item.caption}</p>
                    <p className="font-sans text-xs text-[#ab2c5d] uppercase tracking-widest font-bold">{item.date} • The Red Bistro</p>
                  </div>
                </div>
              </div>
            );
          }

          if (item.type === 'collage') {
            return (
              <div key={item.id} className="space-y-10">
                <h3 className="font-serif text-2xl md:text-3xl text-center text-[#b0004a] font-bold">{item.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {item.memories.map((mem) => (
                    <div key={mem.id} className="polaroid-frame" style={{ transform: `rotate(${mem.rotation})` }}>
                      <img src={mem.image} alt={mem.caption} className="w-full aspect-[4/5] object-cover mb-3 rounded-sm" />
                      <p className="font-handwritten text-2xl text-center text-[#5a4044]">{mem.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </section>

      {/* SECTION 3: GALLERY */}
      <section id="gallery" className="relative z-10 py-24 px-6 max-w-6xl mx-auto border-t border-[#ffd9de]/40">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">Our Gallery</h2>
          <p className="font-sans text-sm text-[#5a4044]">Polaroid snapshots of our most cherished moments. Tap any photo to enlarge.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="polaroid-frame bg-white cursor-pointer group"
              style={{ transform: `rotate(${item.rotation || '0deg'})` }}
            >
              <div className="aspect-square w-full overflow-hidden bg-[#ffe9e7] mb-4 rounded-sm">
                <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="font-handwritten text-2xl text-center text-[#5a4044]">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: REASONS */}
      <section id="reasons" className="relative z-10 py-24 px-6 max-w-6xl mx-auto border-t border-[#ffd9de]/40">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[#b0004a] font-sans text-xs uppercase tracking-widest font-bold">A Little Something Extra</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#3d0506] font-bold">Reasons I Love You</h2>
          <p className="text-[#5a4044] max-w-xl mx-auto font-sans text-sm">Tap on the envelopes to flip and reveal the reasons!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {reasons.map((card) => {
            const IconComp = iconMap[card.frontIcon] || Heart;
            const isFlipped = !!flippedReasons[card.id];

            return (
              <div
                key={card.id}
                onClick={() => toggleReasonFlip(card.id)}
                className={`flip-card perspective-1000 group h-48 cursor-pointer ${card.colSpan || ''} ${card.rotation || ''}`}
              >
                <div className={`flip-card-inner relative w-full h-full preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className={`absolute inset-0 ${card.bg} rounded-2xl flex flex-col items-center justify-center p-4 backface-hidden shadow-lg border border-white/30`}>
                    <IconComp className={`w-8 h-8 ${card.color} mb-2`} />
                    <span className={`font-sans text-xs uppercase tracking-wider ${card.color} opacity-70 font-bold`}>Reason {card.number}</span>
                  </div>

                  <div className="absolute inset-0 bg-[#ffe2df] rotate-y-180 backface-hidden rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-[#b0004a]/20 shadow-md">
                    {card.image ? (
                      <div className="w-full h-full flex flex-col justify-center items-center">
                        <img src={card.image} alt="Reason" className="w-full h-24 object-cover rounded-lg mb-2" />
                        <p className="font-sans text-xs font-bold text-[#ab2c5d]">{card.backText}</p>
                      </div>
                    ) : (
                      <p className="font-serif text-sm md:text-base text-[#b0004a] font-semibold italic leading-snug">"{card.backText}"</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white px-8 py-4 rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
            And a million more... ❤️
          </button>
        </div>
      </section>

      {/* SECTION 5: QUIZ */}
      <section id="quiz" className="relative z-10 py-24 px-6 max-w-xl mx-auto border-t border-[#ffd9de]/40 flex flex-col items-center">
        <div className="w-full text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[#b0004a] font-bold mb-1">The Love Quiz</h2>
          <p className="font-sans text-sm text-[#5a4044] mb-4">How well do we know our own story?</p>

          <div className="w-full h-2.5 bg-[#ffe9e7] rounded-full overflow-hidden mb-2 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#b0004a] to-[#fd6c9c] transition-all duration-500"
              style={{ width: `${((quizIdx + 1) / (quizQuestions.length || 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-bold text-[#ab2c5d]">
            <span>Question {quizIdx + 1} of {quizQuestions.length}</span>
            <span>Hearts: {quizScore} ❤️</span>
          </div>
        </div>

        {quizQuestions.length > 0 && (
          <div className="w-full bg-white p-6 shadow-[0px_10px_30px_rgba(74,14,14,0.08)] rounded-2xl border border-white">
            <div className="aspect-[4/3] w-full bg-[#fff0ef] rounded-xl overflow-hidden mb-6 relative">
              <img src={quizQuestions[quizIdx].image} alt="Quiz" className="w-full h-full object-cover" />
              {isQuizAnswered && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center animate-fadeIn">
                  {(quizQuestions[quizIdx].correct === -1 || selectedOpt === quizQuestions[quizIdx].correct) ? (
                    <div className="bg-[#b0004a] text-white p-4 rounded-full shadow-lg"><Check className="w-10 h-10" /></div>
                  ) : (
                    <div className="bg-[#ba1a1a] text-white p-4 rounded-full shadow-lg"><X className="w-10 h-10" /></div>
                  )}
                </div>
              )}
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-[#3d0506] font-bold mb-6 text-center leading-snug">
              {quizQuestions[quizIdx].q}
            </h3>

            <div className="grid gap-3">
              {quizQuestions[quizIdx].options.map((opt, idx) => {
                let style = "border-[#e3bdc3] text-[#5a4044] hover:bg-[#ffe9e7] hover:border-[#b0004a]";
                if (isQuizAnswered) {
                  const isThisCorrect = quizQuestions[quizIdx].correct === -1 ? idx === selectedOpt : idx === quizQuestions[quizIdx].correct;
                  if (isThisCorrect) style = "bg-[#d81b60] text-white border-[#b0004a]";
                  else if (idx === selectedOpt) style = "bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]";
                }

                return (
                  <button
                    key={idx}
                    disabled={isQuizAnswered}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`w-full py-3.5 px-5 text-left rounded-xl border-2 font-sans font-semibold transition-all duration-300 flex justify-between items-center ${style}`}
                  >
                    <span>{opt}</span>
                    <Heart className={`w-4 h-4 opacity-50 ${(isQuizAnswered && (quizQuestions[quizIdx].correct === -1 ? idx === selectedOpt : idx === quizQuestions[quizIdx].correct)) ? 'fill-current' : ''}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {showQuizResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#ffe2df] p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-white">
              <div className="w-20 h-20 bg-[#b0004a] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#b0004a] mb-2">Soulmate Found!</h3>
              <p className="font-sans text-sm text-[#5a4044] mb-6">
                You scored <span className="font-bold text-[#b0004a]">{quizScore}</span> out of {quizQuestions.length}! Your love story is truly magical.
              </p>
              <button
                onClick={restartQuiz}
                className="w-full py-4 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6: SURPRISE */}
      <section id="surprise" className="relative z-10 py-24 px-6 max-w-2xl mx-auto border-t border-[#ffd9de]/40 flex flex-col items-center">
        {!isLetterUnlocked ? (
          <div className="w-full max-w-md text-center flex flex-col items-center">
            <div className="mb-6">
              <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">For Your Eyes Only</h2>
              <p className="font-sans text-sm text-[#5a4044]">Enter the passcode to unlock a secret surprise memory.</p>
            </div>

            <div className="relative w-full bg-[#ffe9e7] rounded-2xl shadow-xl border border-white p-8 flex flex-col items-center">
              <div className="absolute -top-6 bg-[#b0004a] text-white p-3.5 rounded-full shadow-lg">
                <Lock className="w-6 h-6" />
              </div>

              <form onSubmit={handleUnlockSurprise} className="w-full space-y-5 mt-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter key (e.g. love)"
                  className="w-full bg-white border-b-2 border-[#b0004a]/30 focus:border-[#b0004a] text-center text-xl tracking-widest py-3 px-4 rounded-xl focus:outline-none transition-all placeholder:text-xs placeholder:tracking-normal placeholder:text-[#8e6f74]"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Reveal Surprise</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {surpriseError && <p className="mt-4 text-xs font-bold text-[#ba1a1a] animate-pulse">{surpriseError}</p>}
            </div>
          </div>
        ) : (
          <div className="w-full animate-fadeIn">
            <div className="relative bg-white p-8 md:p-14 shadow-2xl rounded-sm border-8 border-white transform rotate-1">
              <div className="flex justify-between items-start mb-6">
                <span className="font-handwritten text-2xl text-[#b0004a]">{letterData.date}</span>
                <Heart className="w-6 h-6 text-[#b0004a] fill-current" />
              </div>

              <div className="font-handwritten text-xl md:text-3xl text-[#3d0506] leading-relaxed space-y-4">
                <p className="font-bold text-2xl md:text-4xl text-[#b0004a]">{letterData.greeting}</p>
                {letterData.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
                <div className="pt-4 text-right">
                  <p className="text-lg md:text-2xl">{letterData.closing}</p>
                  <p className="font-bold text-3xl md:text-5xl text-[#b0004a] mt-1">{letterData.signature}</p>
                </div>
              </div>

              {letterData.polaroid && (
                <div className="pt-10 flex justify-center">
                  <div className="polaroid-frame max-w-xs transform -rotate-2">
                    <img src={letterData.polaroid.image} alt={letterData.polaroid.caption} className="w-full aspect-square object-cover mb-2 rounded-sm" />
                    <p className="font-handwritten text-2xl text-center text-[#5a4044]">{letterData.polaroid.caption}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLetterUnlocked(false)}
                className="text-xs font-bold text-[#ab2c5d] hover:text-[#b0004a] flex items-center justify-center gap-1.5 mx-auto transition-colors"
              >
                <Unlock className="w-3.5 h-3.5" /> Lock Message Again
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <LightboxModal item={selectedGalleryItem} onClose={() => setSelectedGalleryItem(null)} />

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-xs text-[#ab2c5d] mb-24 font-sans border-t border-[#ffd9de]/40">
        <p>Made with ❤️ by Suraj for Prerna</p>
      </footer>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#fd6c9c]/85 backdrop-blur-xl rounded-full px-4 py-2.5 z-50 border border-white/40 shadow-[0_15px_35px_rgba(176,0,74,0.2)] flex justify-around items-center transition-all">
        {[
          { id: 'home', label: 'Home', icon: Heart },
          { id: 'timeline', label: 'Timeline', icon: BookOpen },
          { id: 'gallery', label: 'Gallery', icon: ImageIcon },
          { id: 'reasons', label: 'Reasons', icon: Sparkles },
          { id: 'quiz', label: 'Quiz', icon: Award },
          { id: 'surprise', label: 'Surprise', icon: Lock },
        ].map((item) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive ? 'text-[#b0004a] font-bold scale-110' : 'text-[#6e0034]/70 hover:text-[#b0004a]'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 bg-[#cca730] rounded-full mb-0.5 animate-pulse" />}
              <IconComp className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-sans font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
