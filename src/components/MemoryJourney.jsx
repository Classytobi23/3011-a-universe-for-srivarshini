import React from 'react';
import { Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function MemoryJourney({ onOpenLightbox }) {
  // Memories 1, 2, 3, 4 are for Section B (image 5 is reserved for Section E final reveal)
  const journeyMemories = BIRTHDAY_CONFIG.memories.slice(0, 4);

  return (
    <section id="memories-section" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/25 text-xs text-purple-300 font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Section B • Memories in Starlight</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-cosmic font-cinzel mb-4">
          Moments Frozen in the Heavens
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 font-light leading-relaxed">
          Every memory is a constellation of its own. Click any photograph to view the uncompressed portrait in full view.
        </p>
      </div>

      {/* 1. Opening Memory (image1 - 16:9 Landscape) */}
      <div className="mb-16 sm:mb-24">
        {journeyMemories[0] && (
          <div
            onClick={() => onOpenLightbox(0)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl glass-panel-glow border border-purple-500/30 transition-all duration-500 hover:border-purple-400/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          >
            {/* Aspect ratio frame 16:9 */}
            <div className="relative w-full aspect-[16/9] max-h-[520px] overflow-hidden bg-slate-950">
              
              {/* Blurred Ambient Backdrop (using the exact same photo) */}
              <img
                src={journeyMemories[0].src}
                alt={journeyMemories[0].title}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30 pointer-events-none transform-gpu"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent pointer-events-none"></div>

              {/* Sharp, uncropped foreground photo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-6">
                <img
                  src={journeyMemories[0].src}
                  alt={journeyMemories[0].title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Lightbox prompt badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-purple-500/30 text-xs text-purple-200 opacity-80 group-hover:opacity-100 group-hover:border-purple-400 transition-all">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Full</span>
              </div>
            </div>

            {/* Memory Caption Bar */}
            <div className="p-6 sm:p-8 bg-[#070712]/90 border-t border-purple-500/15">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-cinzel">
                  {journeyMemories[0].title}
                </h3>
                <span className="text-xs uppercase tracking-wider text-purple-400 font-medium">
                  {journeyMemories[0].subtitle}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {journeyMemories[0].caption}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Memory Journey (image2, image3, image4 with distinct responsive layouts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {journeyMemories.slice(1, 4).map((memory, index) => {
          const actualIndex = index + 1; // Index in the full 5-photo list
          const isPortrait = memory.orientation === 'portrait';

          return (
            <div
              key={memory.id}
              onClick={() => onOpenLightbox(actualIndex)}
              className="group relative flex flex-col cursor-pointer overflow-hidden rounded-3xl glass-panel-glow border border-purple-500/25 transition-all duration-500 hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] hover:-translate-y-1.5"
            >
              {/* Media Container tailored to orientation */}
              <div
                className={`relative w-full overflow-hidden bg-slate-950 ${
                  isPortrait ? 'aspect-[9/14] sm:aspect-[9/16]' : 'aspect-[4/3]'
                }`}
              >
                {/* Blurred Ambient Backdrop (using the exact same photo) */}
                <img
                  src={memory.src}
                  alt={memory.title}
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-115 opacity-30 pointer-events-none transform-gpu"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent pointer-events-none"></div>

                {/* Sharp, uncropped foreground photo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={memory.src}
                    alt={memory.title}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Lightbox prompt badge */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 p-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-purple-500/30 text-xs text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption & Title */}
              <div className="flex-1 p-5 sm:p-6 bg-[#070712]/90 border-t border-purple-500/15 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold mb-1">
                    {memory.subtitle}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-100 font-cinzel mb-2">
                    {memory.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {memory.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Photo 0{actualIndex + 1}</span>
                  <span className="text-purple-400/80 group-hover:translate-x-1 transition-transform">
                    Tap to expand →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
