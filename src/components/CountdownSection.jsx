import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, Star, ArrowDown, RefreshCw, SunMedium } from 'lucide-react';
import { getCountdownToBirthday, getKolkataDate } from '../utils/timezone';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function CountdownSection({ onEnterUniverse, simulatedDate, onSetSimulatedDate }) {
  const [countdown, setCountdown] = useState(() => getCountdownToBirthday(simulatedDate));
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const prevIsBirthdayRef = useRef(countdown.isBirthday);

  // Development environment check to hide simulator in production
  const isDev = import.meta.env.DEV;

  // Trigger gentle celestial stardust confetti burst
  const triggerBirthdayConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f472b6', '#38bdf8', '#fbbf24', '#fef08a'],
      disableForReducedMotion: true,
      shapes: ['circle', 'square'],
      scalar: 0.95,
    });
  };

  // Recalculate countdown state accurately
  const updateCountdown = () => {
    const nextState = getCountdownToBirthday(simulatedDate);
    setCountdown(nextState);

    // Automatic transition into Birthday Mode without refreshing
    if (nextState.isBirthday && !prevIsBirthdayRef.current) {
      triggerBirthdayConfetti();
    }
    prevIsBirthdayRef.current = nextState.isBirthday;
  };

  // Live timer tick every 1000ms & drift prevention
  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Handle tab visibility change & window focus (recalculates instantly on return)
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        updateCountdown();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
  }, [simulatedDate]);

  // If already birthday mode upon initial mount, celebrate once
  useEffect(() => {
    if (countdown.isBirthday && !hasCelebrated) {
      triggerBirthdayConfetti();
      setHasCelebrated(true);
    }
  }, [countdown.isBirthday, hasCelebrated]);

  const units = [
    { label: BIRTHDAY_CONFIG.countdown.unitLabels.days, value: countdown.days },
    { label: BIRTHDAY_CONFIG.countdown.unitLabels.hours, value: countdown.hours },
    { label: BIRTHDAY_CONFIG.countdown.unitLabels.minutes, value: countdown.minutes },
    { label: BIRTHDAY_CONFIG.countdown.unitLabels.seconds, value: countdown.seconds },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

        {/* Status Pill Badge with Tamil Nadu Twilight Atmosphere */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 font-medium mb-8 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
          <SunMedium className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {countdown.isBirthday
              ? BIRTHDAY_CONFIG.birthdayReveal.badgeText
              : "Tamil Nadu Twilight • IST Countdown"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Conditional Rendering: Countdown vs Birthday Reveal */}
        {!countdown.isBirthday ? (
          /* COUNTDOWN DISPLAY */
          <div className="w-full flex flex-col items-center animate-fade-in transition-all duration-700">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-cosmic font-cinzel mb-4">
              {BIRTHDAY_CONFIG.countdown.preCountdownTitle}
            </h1>
            <p className="max-w-xl text-slate-400 text-sm sm:text-base font-light mb-12 leading-relaxed">
              {BIRTHDAY_CONFIG.countdown.preCountdownSubtitle}
            </p>

            {/* Glowing Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mb-12">
              {units.map((unit, idx) => (
                <div
                  key={idx}
                  className="relative group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl glass-panel-glow border border-purple-500/25 transition-all duration-300 hover:scale-105 hover:border-purple-400/50"
                >
                  <div className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-100 font-cinzel tracking-wider drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-purple-300/80 mt-2">
                    {unit.label}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Live Time Indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Tamil Nadu Evening Time (IST): {countdown.currentIST}</span>
            </div>
          </div>
        ) : (
          /* BIRTHDAY REVEAL MODE */
          <div className="w-full flex flex-col items-center animate-fade-in transition-all duration-1000">
            
            <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.3)] animate-float">
              <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
            </div>

            {/* Main Greeting */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gradient-cosmic font-cinzel mb-6 drop-shadow-[0_0_35px_rgba(192,132,252,0.6)]">
              {BIRTHDAY_CONFIG.birthdayReveal.mainGreeting}
            </h1>

            {/* Supporting Messages */}
            <div className="space-y-3 max-w-2xl mb-12">
              {BIRTHDAY_CONFIG.birthdayReveal.supportingMessages.map((msg, i) => (
                <p key={i} className="text-lg sm:text-2xl text-purple-200/90 font-serif italic tracking-wide">
                  “{msg}”
                </p>
              ))}
            </div>

            {/* Enter Button */}
            <button
              onClick={onEnterUniverse}
              className="relative group overflow-hidden px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-cinzel font-bold text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 active:scale-95 transition-all duration-300 shadow-[0_0_35px_rgba(236,72,153,0.5)] cursor-pointer"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span>{BIRTHDAY_CONFIG.birthdayReveal.enterButtonText}</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </button>

            <p className="mt-5 text-xs text-slate-400/80 font-light flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{BIRTHDAY_CONFIG.birthdayReveal.musicPrompt}</span>
            </p>
          </div>
        )}

        {/* TIME WARP / DEV TESTING CONTROLS (Only visible in development environment) */}
        {isDev && (
          <div className="mt-16 pt-6 border-t border-purple-500/10 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-wider text-amber-400/90 w-full mb-1 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" /> Test Time Simulator (Development Verification Only):
            </span>
            <button
              onClick={() => onSetSimulatedDate(null)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                !simulatedDate
                  ? 'bg-amber-900/60 border-amber-400 text-amber-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Live IST
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-29T06:30:00Z')} // Nov 29 12:00 PM IST (364 of 365)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-29T06:30:00Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Nov 29 (Day Before: 364 Bloomed)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-29T18:29:50Z')} // Nov 29 11:59:50 PM IST (10s to midnight)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-29T18:29:50Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Nov 29 11:59:50 PM (10s Countdown)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-29T18:30:05Z')} // Nov 30 12:00:05 AM IST (Full Bloom 365/365)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-29T18:30:05Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Nov 30 12:00 AM (Birthday Full Bloom: 365)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-30T06:30:00Z')} // Nov 30 12:00 PM IST
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-30T06:30:00Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Nov 30 Mid-Day (Birthday Active)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-30T18:29:55Z')} // Nov 30 11:59:55 PM IST (5s to Dec 1)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-30T18:29:55Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Nov 30 11:59:55 PM (End of Birthday)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2026-11-30T18:30:05Z')} // Dec 01 12:00:05 AM IST (Preserve Completed Garden)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2026-11-30T18:30:05Z'
                  ? 'bg-purple-900/60 border-purple-400 text-purple-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Dec 01 (Garden Preserved at 365, Countdown Next Year)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2028-11-29T06:30:00Z')} // Leap Year 2028: Nov 29 (365 of 366)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2028-11-29T06:30:00Z'
                  ? 'bg-amber-900/60 border-amber-400 text-amber-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Leap 2028 Nov 29 (365/366)
            </button>
            <button
              onClick={() => onSetSimulatedDate('2028-11-29T18:30:05Z')} // Leap Year 2028: Nov 30 (366 of 366)
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                simulatedDate === '2028-11-29T18:30:05Z'
                  ? 'bg-amber-900/60 border-amber-400 text-amber-200'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Leap 2028 Nov 30 (366/366 Full Bloom)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
