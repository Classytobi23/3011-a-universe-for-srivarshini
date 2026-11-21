import React, { useState, useMemo, useEffect } from 'react';
import { Flower2, Sparkles, X, Heart, Crown, Wind, SunMedium } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getBirthdayGardenCycle, getKolkataDate } from '../utils/timezone';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function GardenOfWishes({ isBirthdayMode = false, simulatedDate = null }) {
  const { gardenOfWishes } = BIRTHDAY_CONFIG;
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [hasCelebratedBloom, setHasCelebratedBloom] = useState(false);

  // Accurate Birthday Garden Cycle Math
  const cycle = useMemo(() => getBirthdayGardenCycle(simulatedDate), [simulatedDate]);
  const { bloomedCount, totalFlowers, isComplete, isBirthday, isLeap, year } = cycle;

  // Trigger gentle floral confetti & starlight when full birthday bloom is detected
  useEffect(() => {
    if (isBirthday && !hasCelebratedBloom) {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#fbbf24', '#fef08a', '#f472b6', '#d8b4fe', '#ffffff'],
        disableForReducedMotion: true,
        shapes: ['circle'],
        scalar: 0.9,
      });
      setHasCelebratedBloom(true);
    }
  }, [isBirthday, hasCelebratedBloom]);

  // Generate realistic, organic floral garden nodes
  const flowers = useMemo(() => {
    const list = [];
    
    // Natural Tamil Nadu Twilight Palette:
    // Jasmine Cream, Sunset Rose, Twilight Violet, Deep Lilac, Starlight Amber, Celestial Blue
    const colorThemes = [
      {
        name: 'jasmine',
        petal: '#fdfbf7',
        center: '#fef08a',
        glow: 'rgba(254, 240, 138, 0.45)',
        border: 'border-amber-200/50',
        aura: 'from-amber-100/30 via-yellow-200/20 to-transparent'
      },
      {
        name: 'violet',
        petal: '#e9d5ff',
        center: '#c084fc',
        glow: 'rgba(192, 132, 252, 0.45)',
        border: 'border-purple-300/40',
        aura: 'from-purple-500/25 via-violet-400/15 to-transparent'
      },
      {
        name: 'rose',
        petal: '#fce7f3',
        center: '#f472b6',
        glow: 'rgba(244, 114, 182, 0.45)',
        border: 'border-pink-300/40',
        aura: 'from-pink-500/25 via-rose-400/15 to-transparent'
      },
      {
        name: 'amber',
        petal: '#fef3c7',
        center: '#f59e0b',
        glow: 'rgba(251, 191, 36, 0.5)',
        border: 'border-amber-300/50',
        aura: 'from-amber-500/30 via-yellow-400/20 to-transparent'
      },
      {
        name: 'celestial',
        petal: '#e0f2fe',
        center: '#38bdf8',
        glow: 'rgba(56, 189, 248, 0.4)',
        border: 'border-sky-300/40',
        aura: 'from-sky-500/20 via-blue-400/15 to-transparent'
      }
    ];

    const wishesPool = gardenOfWishes.wishesPool;

    for (let day = 1; day <= totalFlowers; day++) {
      // Deterministic layout seeds
      const seed1 = Math.sin(day * 9301 + 49297) * 233280;
      const pseudoRand1 = seed1 - Math.floor(seed1);
      const seed2 = Math.cos(day * 1337 + 7919) * 10000;
      const pseudoRand2 = seed2 - Math.floor(seed2);

      const isBloomed = day <= bloomedCount;
      const isRareGolden = day === totalFlowers || day === 30; // Final birthday flower and day 30

      const theme = colorThemes[day % colorThemes.length];

      // Bloom Stages:
      // - 'bud' for the newest emerging blooms
      // - 'half' for young blossoms
      // - 'full' for fully opened blossoms
      // - 'radiant' for the Golden Flower or during birthday mode
      let stage = 'full';
      if (isRareGolden || (isBirthday && day === totalFlowers)) {
        stage = 'radiant';
      } else if (day === bloomedCount && !isComplete) {
        stage = 'half';
      } else if (day > bloomedCount - 15 && day <= bloomedCount) {
        stage = pseudoRand1 > 0.5 ? 'full' : 'half';
      } else if (!isBloomed) {
        stage = 'bud';
      }

      // Organic size: 22px to 36px
      const baseSize = 22 + Math.floor(pseudoRand1 * 12);
      const size = (isRareGolden || stage === 'radiant') ? baseSize + 6 : baseSize;

      // Glow intensity: soft (0.4) to radiant (0.95)
      const glowIntensity = isRareGolden ? 1 : (0.4 + pseudoRand2 * 0.45);

      // Organic sway duration & delay (Tamil Nadu evening breeze)
      const swayDuration = (4.5 + pseudoRand1 * 3.5).toFixed(1); // 4.5s to 8.0s
      const swayDelay = (pseudoRand2 * 4).toFixed(1);

      const wishText = wishesPool[(day - 1) % wishesPool.length];

      list.push({
        dayNumber: day,
        isBloomed,
        isRareGolden,
        stage,
        theme,
        size,
        glowIntensity,
        swayDuration,
        swayDelay,
        wish: isRareGolden
          ? "A Rare Golden Flower! ✨ Srivarshini, your smile carries a warmth that can light up the deepest night sky. Never let anyone dim your starlight."
          : `Day ${day} Blessing: ${wishText}`
      });
    }

    return list;
  }, [totalFlowers, bloomedCount, isComplete, isBirthday, gardenOfWishes.wishesPool]);

  const handleFlowerClick = (flower) => {
    if (!flower.isBloomed) return;
    setSelectedFlower(flower);
  };

  return (
    <section id="garden-of-wishes" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* Tamil Nadu Twilight & Amber Streetlight Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-purple-700/10 to-indigo-600/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Section Header */}
      <div className="text-center mb-14">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 via-amber-950/40 to-purple-950/80 border border-amber-500/30 text-xs text-amber-200/90 font-medium mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {isComplete
              ? (isBirthday ? gardenOfWishes.birthdayRevealBadge : `Completed Birthday Garden • ${totalFlowers} Days (${year})`)
              : `${gardenOfWishes.badge} • ${year} (${totalFlowers} Days${isLeap ? ' — Leap Year' : ''})`}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gradient-cosmic font-cinzel mb-4">
          {gardenOfWishes.title}
        </h2>

        {/* Subtitle / Birthday Message */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300/85 font-light leading-relaxed mb-6">
          {isComplete
            ? (isLeap ? gardenOfWishes.leapYearBirthdayMessage : gardenOfWishes.birthdayMessage)
            : gardenOfWishes.subtitle}
        </p>

        {/* Bloom Counter & Status Indicator */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl glass-panel border border-amber-500/25 text-xs font-mono shadow-md">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>{bloomedCount} of {totalFlowers} Flowers Bloomed</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-purple-300" />
            {isBirthday
              ? 'Birthday Full Bloom Active ✨'
              : isComplete
              ? `Completed Garden Preserved (${year})`
              : bloomedCount === totalFlowers - 1
              ? 'Eve of Birthday: Final Bloom Awaits at Midnight'
              : `Day ${bloomedCount} of Birthday Orbit`}
          </span>
        </div>

        {/* Cinematic Birthday Reveal Banner (November 30) */}
        {isBirthday && (
          <div className="mt-8 max-w-2xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-amber-950/50 via-purple-950/70 to-pink-950/50 border-2 border-amber-400/50 shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-fade-in text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-mono font-bold">
                The Cosmic Full Bloom
              </span>
            </div>
            <p className="text-base sm:text-xl font-serif italic text-amber-100 font-medium leading-relaxed">
              “{isLeap ? gardenOfWishes.leapYearBirthdayMessage : gardenOfWishes.birthdayMessage}”
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-purple-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>All {totalFlowers} celestial flowers illuminate in honor of Srivarshini</span>
            </div>
          </div>
        )}

      </div>

      {/* ORGANIC MAGICAL FLORAL MEADOW CONTAINER */}
      <div className={`relative w-full rounded-3xl glass-panel-glow border-2 p-4 sm:p-8 transition-all duration-700 shadow-2xl ${
        isBirthday
          ? 'border-amber-400/50 shadow-[0_0_70px_rgba(251,191,36,0.25)] bg-[#0d091e]/90'
          : 'border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.18)]'
      }`}>
        
        {/* Helper Note & Tamil Nadu Ambiance Marker */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-500/15 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-purple-300">
            <Flower2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Tap any blooming flower to unveil its starlit wish</span>
          </span>
          <span className="hidden sm:inline text-amber-300/80 flex items-center gap-1">
            <SunMedium className="w-3.5 h-3.5 text-amber-400" />
            <span>Tamil Nadu Evening Breeze • {year} Orbit</span>
          </span>
        </div>

        {/* Realistic Meadow Floral Field */}
        <div className="relative min-h-[400px] max-h-[540px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 p-3">
            {flowers.map((fl) => {
              const isSelected = selectedFlower?.dayNumber === fl.dayNumber;

              return (
                <button
                  key={fl.dayNumber}
                  onClick={() => handleFlowerClick(fl)}
                  disabled={!fl.isBloomed}
                  title={`Day ${fl.dayNumber}${fl.isBloomed ? ' (Bloomed - Click to view wish)' : ' (Awaiting sunrise)'}`}
                  style={{
                    animationDuration: `${fl.swayDuration}s`,
                    animationDelay: `${fl.swayDelay}s`,
                    width: `${fl.size + 10}px`,
                    height: `${fl.size + 10}px`
                  }}
                  className={`group relative rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer animate-float ${
                    fl.isBloomed
                      ? isSelected
                        ? 'scale-130 ring-2 ring-white shadow-[0_0_25px_rgba(255,255,255,0.9)] z-20'
                        : fl.isRareGolden
                        ? 'bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 border-2 border-amber-200 shadow-[0_0_24px_rgba(251,191,36,0.9)] scale-110 hover:scale-135 z-10'
                        : fl.stage === 'radiant'
                        ? 'bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-300 border border-white/60 shadow-[0_0_20px_rgba(244,114,182,0.7)] hover:scale-125'
                        : `bg-gradient-to-tr ${fl.theme.aura} ${fl.theme.border} border hover:scale-120`
                      : 'bg-slate-900/60 border border-slate-800/80 opacity-25 cursor-not-allowed'
                  }`}
                >
                  {/* Realistic Multi-Petal SVG Floral Rendering */}
                  {fl.isBloomed ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* Ambient Bloom Glow Aura */}
                      <div
                        className="absolute inset-0 rounded-full blur-[3px] pointer-events-none transition-all group-hover:scale-125"
                        style={{
                          backgroundColor: fl.isRareGolden ? 'rgba(251, 191, 36, 0.6)' : fl.theme.glow,
                          opacity: fl.glowIntensity
                        }}
                      ></div>

                      {/* Floral Petals SVG */}
                      <svg
                        viewBox="0 0 32 32"
                        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:rotate-45"
                        fill="none"
                      >
                        {fl.isRareGolden ? (
                          // Golden Crown / Starburst
                          <path
                            d="M16 2L19 12L29 12L21 18L24 28L16 22L8 28L11 18L3 12L13 12Z"
                            fill="#fef08a"
                            stroke="#ca8a04"
                            strokeWidth="1.2"
                          />
                        ) : fl.stage === 'bud' ? (
                          // Tender Closed Bud
                          <circle cx="16" cy="16" r="5" fill={fl.theme.center} opacity="0.8" />
                        ) : (
                          // Organic 5-Petal Jasmine/Cosmic Blossom
                          <g>
                            <circle cx="16" cy="9" r="4.5" fill={fl.theme.petal} opacity="0.9" />
                            <circle cx="23" cy="14" r="4.5" fill={fl.theme.petal} opacity="0.9" />
                            <circle cx="20" cy="22" r="4.5" fill={fl.theme.petal} opacity="0.9" />
                            <circle cx="12" cy="22" r="4.5" fill={fl.theme.petal} opacity="0.9" />
                            <circle cx="9" cy="14" r="4.5" fill={fl.theme.petal} opacity="0.9" />
                            {/* Central Stamen */}
                            <circle cx="16" cy="16" r="3.2" fill={fl.theme.center} />
                          </g>
                        )}
                      </svg>
                    </div>
                  ) : (
                    // Unbloomed star seed
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="mt-6 pt-4 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Active Blooms: {bloomedCount} of {totalFlowers} Days</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Rare Golden Bloom Revealed</span>
            </span>
            <span>•</span>
            <span>Tamil Nadu Evening (IST)</span>
          </div>
        </div>

      </div>

      {/* POPUP MODAL FOR SELECTED FLOWER WISH */}
      {selectedFlower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-amber-500/40 shadow-[0_0_60px_rgba(251,191,36,0.3)] animate-scale-up text-center">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedFlower(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 border border-purple-500/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Emblem */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
              selectedFlower.isRareGolden
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
                : 'bg-gradient-to-tr from-purple-600 to-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.5)]'
            }`}>
              {selectedFlower.isRareGolden ? (
                <Crown className="w-8 h-8 text-amber-950 fill-amber-950 animate-bounce" />
              ) : (
                <Flower2 className="w-8 h-8 text-white drop-shadow-md animate-spin-slow" />
              )}
            </div>

            {/* Flower Day Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-100 mb-1">
              {selectedFlower.isRareGolden ? 'The Golden Bloom ✨' : `Bloom of Day ${selectedFlower.dayNumber}`}
            </h3>

            <p className="text-xs uppercase tracking-widest text-amber-300/90 font-mono mb-4">
              {selectedFlower.isRareGolden
                ? 'Secret Celestial Discovery'
                : `Birthday Orbit ${year} • Starlit Wish`}
            </p>

            {/* Wish Text */}
            <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed italic p-5 rounded-2xl bg-purple-950/40 border border-purple-500/20 my-4">
              “{selectedFlower.wish}”
            </p>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-purple-500/20">
              <span className="flex items-center gap-1 text-pink-300">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Dedicated to Srivarshini</span>
              </span>
              <button
                onClick={() => setSelectedFlower(null)}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors cursor-pointer"
              >
                Close Wish
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
