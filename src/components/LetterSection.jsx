import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, FastForward, Check, Heart, Feather } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function LetterSection() {
  const { letter } = BIRTHDAY_CONFIG;
  const [isOpen, setIsOpen] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Progressive reveal of paragraphs once opened
  useEffect(() => {
    if (!isOpen || isAnimationComplete) return;

    if (revealedParagraphs < letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedParagraphs((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsAnimationComplete(true);
    }
  }, [isOpen, revealedParagraphs, isAnimationComplete, letter.paragraphs.length]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      setRevealedParagraphs(1);
    }
  };

  const handleSkipAnimation = () => {
    setRevealedParagraphs(letter.paragraphs.length);
    setIsAnimationComplete(true);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/25 text-xs text-pink-300 font-medium mb-3">
          <Feather className="w-3.5 h-3.5 text-pink-400" />
          <span>Section C • Words Unspoken</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-cosmic font-cinzel mb-3">
          {letter.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-light">
          {letter.subheading}
        </p>
      </div>

      {/* ENVELOPE / LETTER CONTAINER */}
      <div className="relative w-full flex flex-col items-center">
        
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer w-full max-w-lg aspect-[16/10] rounded-3xl glass-panel-glow border-2 border-purple-500/30 flex flex-col items-center justify-center p-8 transition-all duration-500 hover:scale-[1.02] hover:border-pink-400/60 hover:shadow-[0_0_50px_rgba(244,114,182,0.3)]"
          >
            {/* Envelope flap aesthetic lines */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-purple-900/30 to-transparent rounded-t-3xl border-b border-purple-500/20"></div>

            {/* Glowing Wax Seal */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-pink-600 to-amber-500 shadow-[0_0_30px_rgba(244,114,182,0.5)] border-2 border-amber-300/60 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-300 animate-shimmer-glow">
              <span className="font-cinzel text-2xl font-black text-amber-100 drop-shadow-md">
                S
              </span>
            </div>

            <div className="relative z-10 mt-6 text-center">
              <p className="text-sm sm:text-base font-cinzel tracking-wider text-purple-200 font-bold">
                Tap to Break Seal & Read
              </p>
              <p className="text-xs text-slate-400 mt-1 font-light">
                A private letter crafted for Srivarshini
              </p>
            </div>

            <div className="absolute bottom-4 flex items-center gap-1.5 text-[11px] text-pink-300/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Written by your best friend</span>
            </div>
          </div>
        ) : (
          /* UNVEILED PARCHMENT LETTER */
          <div className="relative w-full rounded-3xl bg-[#090815]/95 border border-purple-500/30 p-6 sm:p-12 shadow-[0_0_60px_rgba(168,85,247,0.2)] animate-fade-in transition-all">
            
            {/* Action Bar (Skip Animation & Seal Emblem) */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-900/60 border border-pink-400/40 flex items-center justify-center text-xs font-cinzel text-pink-200">
                  S
                </div>
                <span className="text-xs uppercase tracking-widest text-purple-300 font-mono">
                  Sanctuary Archive
                </span>
              </div>

              {!isAnimationComplete && (
                <button
                  onClick={handleSkipAnimation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200 hover:bg-purple-800/50 transition-colors cursor-pointer"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Read Full Letter</span>
                </button>
              )}
            </div>

            {/* Letter Content */}
            <div className="space-y-6 text-slate-200 font-serif leading-relaxed text-base sm:text-xl">
              
              <p className="text-xl sm:text-2xl font-bold font-cinzel text-purple-200">
                {letter.salutation}
              </p>

              {letter.paragraphs.slice(0, revealedParagraphs).map((para, idx) => (
                <p
                  key={idx}
                  className="animate-fade-in transition-opacity duration-700 font-light text-slate-200/90 leading-relaxed tracking-wide"
                >
                  {para}
                </p>
              ))}

              {revealedParagraphs >= letter.paragraphs.length && (
                <div className="pt-8 mt-8 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in">
                  <div>
                    <p className="text-sm sm:text-base italic text-purple-300/80">
                      {letter.closing}
                    </p>
                    <p className="text-base sm:text-lg font-cinzel font-bold text-slate-100 mt-1">
                      {letter.signature}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs text-purple-300 font-sans">
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                    <span>Best Friends Forever</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
