import React, { useState, useEffect, useRef } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import BokehFlowerEffect from './components/BokehFlowerEffect';
import PasswordGate from './components/PasswordGate';
import CountdownSection from './components/CountdownSection';
import BirthdayHero from './components/BirthdayHero';
import FriendshipCorner from './components/FriendshipCorner';
import MemoryJourney from './components/MemoryJourney';
import GardenOfWishes from './components/GardenOfWishes';
import ConstellationSection from './components/ConstellationSection';
import CatchTheStarsGame from './components/CatchTheStarsGame';
import LetterSection from './components/LetterSection';
import FinalRevealSection from './components/FinalRevealSection';
import SecretEasterEgg from './components/SecretEasterEgg';
import ClosingSection from './components/ClosingSection';
import MusicPlayer from './components/MusicPlayer';
import LightboxModal from './components/LightboxModal';
import SecurityInfoModal from './components/SecurityInfoModal';
import { isBirthdayActiveInIST } from './utils/timezone';
import BIRTHDAY_CONFIG from './config/birthday.config';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [simulatedDate, setSimulatedDate] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasEnteredExperience, setHasEnteredExperience] = useState(false);

  const audioRef = useRef(null);

  // Check auth session cookie or client session on mount
  useEffect(() => {
    // Check sessionStorage first for static hosting (GitHub Pages)
    try {
      if (sessionStorage.getItem('srivarshini_session_auth') === 'unlocked') {
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
        return;
      }
    } catch {}

    fetch('/api/auth/verify')
      .then((res) => {
        if (!res.ok) throw new Error('Not ok');
        return res.json();
      })
      .then((data) => {
        setIsAuthenticated(Boolean(data && data.authenticated));
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  const isBirthdayMode = isBirthdayActiveInIST(simulatedDate);

  // Enter Universe button action (Scroll down smoothly to welcome hero, NO autoplay)
  const handleEnterUniverse = () => {
    setHasEnteredExperience(true);
    setTimeout(() => {
      const el = document.getElementById('welcome-hero');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleScrollToFriendship = () => {
    const el = document.getElementById('friendship-corner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightbox handlers
  const openMemoryLightbox = (index) => setLightboxItem(index);
  const openCustomLightbox = (photoObj) => setLightboxItem(photoObj);
  const closeLightbox = () => setLightboxItem(null);

  const prevLightbox = () => {
    if (typeof lightboxItem === 'number') {
      setLightboxItem((prev) => (prev > 0 ? prev - 1 : BIRTHDAY_CONFIG.memories.length - 1));
    }
  };

  const nextLightbox = () => {
    if (typeof lightboxItem === 'number') {
      setLightboxItem((prev) => (prev < BIRTHDAY_CONFIG.memories.length - 1 ? prev + 1 : 0));
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#04040a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-purple-300">Awakening Srivarshini's Universe...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#04040a] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      
      {/* Background Starfield Canvas with subtle twinkle */}
      <StarfieldCanvas isBirthdayMode={isBirthdayMode} />

      {/* Global Ambient Bokeh Flower Atmosphere */}
      <BokehFlowerEffect isBirthdayMode={isBirthdayMode} />

      {/* Dedicated HTML5 Audio Player (preload="none" prevents unauthenticated 401 error) */}
      <audio
        ref={audioRef}
        src={BIRTHDAY_CONFIG.music.src}
        preload="none"
        loop
      />

      {/* Privacy & Security Architecture Information Modal */}
      <SecurityInfoModal />

      {/* Password Gate (Active until user logs in with authenticated session) */}
      {!isAuthenticated && (
        <PasswordGate
          onAuthenticated={() => {
            setIsAuthenticated(true);
            // Notice: Deliberately NO music autoplay on login!
          }}
        />
      )}

      {/* Authenticated Universe Experience */}
      {isAuthenticated && (
        <main className="relative z-10 flex flex-col">
          
          {/* 1 & 2. Top Countdown & Birthday Reveal Section */}
          <CountdownSection
            onEnterUniverse={handleEnterUniverse}
            simulatedDate={simulatedDate}
            onSetSimulatedDate={setSimulatedDate}
          />

          {/* Experiential Sections (Natural Story Progression) */}
          <div id="welcome-hero" className="transition-all duration-1000">
            
            {/* 3. Welcome / Enter Your Universe (Cinematic Intro) */}
            <BirthdayHero onScrollToMemories={handleScrollToFriendship} />

            {/* 4. Friendship Corner: Tobi & Srivarshini ("Two Souls. One Chaotic Friendship.") */}
            <FriendshipCorner onOpenCustomLightbox={openCustomLightbox} />

            {/* 5. Memory Journey: Photos 1, 2, 3, 4 */}
            <MemoryJourney onOpenLightbox={openMemoryLightbox} />

            {/* 6. The Garden of 365 Little Wishes (Leap-year aware daily blooms) */}
            <GardenOfWishes isBirthdayMode={isBirthdayMode} simulatedDate={simulatedDate} />

            {/* 7. Interactive Constellation of Wishes */}
            <ConstellationSection />

            {/* 8. Mini Game: Catch the Stars (30-second mobile-friendly challenge) */}
            <CatchTheStarsGame />

            {/* 9. A Letter From Your Best Friend */}
            <LetterSection />

            {/* 10. Final Climax Photograph Reveal (Photo 5) */}
            <FinalRevealSection onOpenLightbox={openMemoryLightbox} />

            {/* 11. Secret Easter Egg: Hidden Pulsing Heart */}
            <SecretEasterEgg />

            {/* 12. Final Closing Message & Dedication */}
            <ClosingSection onScrollToTop={handleScrollToTop} />
          </div>

          {/* Persistent Floating Music Player (Deliberate Play/Pause, no autoplay) */}
          <MusicPlayer
            audioRef={audioRef}
            isPlaying={isPlayingMusic}
            setIsPlaying={setIsPlayingMusic}
          />

          {/* Fullscreen Photo Lightbox Modal */}
          <LightboxModal
            activeItem={lightboxItem}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />

        </main>
      )}

    </div>
  );
}
