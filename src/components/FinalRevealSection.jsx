import React, { useState } from 'react';
import { Sparkles, Maximize2, Crown, Eye } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function FinalRevealSection({ onOpenLightbox }) {
  const { finalReveal, memories } = BIRTHDAY_CONFIG;
  // image5 is memory index 4 (5th photo)
  const finalPhoto = memories[4];

  const [hasRevealed, setHasRevealed] = useState(false);

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center transition-all duration-1000">
      
      {/* Deep Space Background Vignette */}
      <div className="absolute inset-0 bg-radial-universe pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-700/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs text-purple-300 font-medium mb-3">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Section E • {finalReveal.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-cosmic font-cinzel mb-4">
          {finalReveal.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto">
          {finalReveal.subtitle}
        </p>
      </div>

      {/* THE SPECIAL REVEAL FRAME */}
      <div className="relative w-full max-w-md mx-auto">
        {!hasRevealed ? (
          /* Mystical Fog / Curtain Before Reveal */
          <div
            onClick={() => setHasRevealed(true)}
            className="group relative cursor-pointer w-full aspect-[9/16] rounded-3xl glass-panel-glow border-2 border-purple-500/30 flex flex-col items-center justify-center p-8 transition-all duration-700 hover:border-pink-400 hover:shadow-[0_0_60px_rgba(244,114,182,0.3)]"
          >
            <div className="w-20 h-20 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              <Eye className="w-8 h-8 text-purple-200 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold font-cinzel text-slate-100 mb-2">
              A Moment Kept for Last
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs font-light">
              Tap here to unveil the final portrait dedicated to Srivarshini.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Tap to reveal</span>
            </div>
          </div>
        ) : (
          /* REVEALED PHOTO 5 */
          <div
            onClick={() => onOpenLightbox(4)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl glass-panel-glow border-2 border-pink-500/40 shadow-[0_0_60px_rgba(244,114,182,0.35)] animate-fade-in transition-all duration-1000"
          >
            {/* Aspect Ratio 9:16 Frame */}
            <div className="relative w-full aspect-[9/16] overflow-hidden bg-slate-950">
              
              {/* Blurred Ambient Backdrop using image5 */}
              <img
                src={finalPhoto.src}
                alt={finalPhoto.title}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-115 opacity-40 pointer-events-none transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent pointer-events-none"></div>

              {/* Sharp, uncropped foreground photo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-5">
                <img
                  src={finalPhoto.src}
                  alt={finalPhoto.title}
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Lightbox Badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-pink-400/40 text-xs text-pink-200">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full View</span>
              </div>
            </div>

            {/* Emotional Caption Bar */}
            <div className="p-6 sm:p-8 bg-[#070712]/95 border-t border-purple-500/20 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs uppercase tracking-widest text-pink-400 font-medium">
                  {finalPhoto.subtitle}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-cinzel mb-2">
                {finalPhoto.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-4">
                {finalPhoto.caption}
              </p>
              <p className="text-sm italic text-purple-300/90 font-serif border-t border-purple-500/15 pt-3">
                {finalReveal.quote}
              </p>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
