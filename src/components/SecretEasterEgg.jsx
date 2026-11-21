import React, { useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function SecretEasterEgg() {
  const { easterEgg } = BIRTHDAY_CONFIG;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#f43f5e', '#f472b6', '#e879f9'],
      disableForReducedMotion: true,
      shapes: ['circle'],
      scalar: 0.8,
    });
    setIsOpen(true);
  };

  return (
    <>
      {/* Hidden Interactive Heart in a delicate celestial position */}
      <div className="relative py-12 flex items-center justify-center">
        <button
          onClick={handleClick}
          title={easterEgg.triggerTooltip}
          className="group relative p-3 rounded-full opacity-35 hover:opacity-100 hover:scale-125 transition-all duration-500 cursor-pointer focus:outline-none"
        >
          {/* Subtle pulse halo */}
          <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-md group-hover:bg-pink-500/50 transition-colors animate-pulse-slow"></div>
          
          <Heart className="relative z-10 w-4 h-4 text-pink-400/80 group-hover:text-pink-300 group-hover:fill-pink-400 transition-colors animate-heart-beat" />
        </button>
      </div>

      {/* Secret Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-pink-500/40 shadow-[0_0_60px_rgba(236,72,153,0.35)] animate-scale-up text-center">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 border border-purple-500/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.5)]">
              <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-gradient-cosmic mb-2">
              {easterEgg.title}
            </h3>

            <p className="text-xs uppercase tracking-widest text-pink-400 font-mono mb-4">
              {easterEgg.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed italic p-4 rounded-2xl bg-pink-950/30 border border-pink-500/20 mb-6">
              “{easterEgg.message}”
            </p>

            <p className="text-xs text-purple-300 font-mono">
              {easterEgg.closing}
            </p>

          </div>
        </div>
      )}
    </>
  );
}
