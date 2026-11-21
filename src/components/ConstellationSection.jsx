import React, { useState } from 'react';
import { Star, Sparkles, X, Heart, Compass, CheckCircle } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function ConstellationSection() {
  const { constellation } = BIRTHDAY_CONFIG;
  const [selectedStar, setSelectedStar] = useState(null);
  const [unlockedStars, setUnlockedStars] = useState(new Set());

  const handleStarClick = (star) => {
    setSelectedStar(star);
    setUnlockedStars((prev) => new Set([...prev, star.id]));
  };

  const closeWishModal = () => {
    setSelectedStar(null);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/60 border border-sky-500/25 text-xs text-sky-300 font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Section D • A Constellation of Wishes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-cosmic font-cinzel mb-3">
          {constellation.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto">
          {constellation.subtitle}
        </p>

        {/* Progress Counter */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/20 text-xs text-purple-300 font-mono">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {unlockedStars.size} of {constellation.stars.length} celestial wishes illuminated
          </span>
        </div>
      </div>

      {/* CONSTELLATION MAP CONTAINER */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[580px] rounded-3xl glass-panel-glow border border-sky-500/25 overflow-hidden p-4 sm:p-8">
        
        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Subtle constellation lines connecting stars in a flowing loop/web */}
          <line x1="18%" y1="28%" x2="35%" y2="18%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="35%" y1="18%" x2="62%" y2="22%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="62%" y1="22%" x2="82%" y2="35%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="82%" y1="35%" x2="74%" y2="68%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="74%" y1="68%" x2="48%" y2="80%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="48%" y1="80%" x2="26%" y2="66%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="26%" y1="66%" x2="18%" y2="28%" stroke="rgba(186, 230, 253, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
          {/* Central cross ties to star 8 */}
          <line x1="35%" y1="18%" x2="44%" y2="44%" stroke="rgba(244, 114, 182, 0.3)" strokeWidth="1.2" />
          <line x1="62%" y1="22%" x2="44%" y2="44%" stroke="rgba(244, 114, 182, 0.3)" strokeWidth="1.2" />
          <line x1="48%" y1="80%" x2="44%" y2="44%" stroke="rgba(244, 114, 182, 0.3)" strokeWidth="1.2" />
        </svg>

        {/* Clickable Glowing Stars */}
        {constellation.stars.map((star) => {
          const isUnlocked = unlockedStars.has(star.id);
          const isSelected = selectedStar?.id === star.id;

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
              title={star.name}
            >
              {/* Star Glow Aura */}
              <div
                className={`absolute -inset-3 rounded-full blur-md transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-pink-500/40 scale-125'
                    : 'bg-sky-400/20 group-hover:bg-purple-500/40 group-hover:scale-125'
                }`}
              ></div>

              {/* Star Node Button */}
              <div
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-pink-600 to-purple-600 border-white shadow-[0_0_25px_rgba(244,114,182,0.8)] scale-110'
                    : isUnlocked
                    ? 'bg-purple-900/80 border-pink-400/80 shadow-[0_0_15px_rgba(244,114,182,0.5)]'
                    : 'bg-slate-900/80 border-sky-400/50 hover:border-sky-300 group-hover:scale-110'
                }`}
              >
                <Star
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                    isUnlocked
                      ? 'text-pink-200 fill-pink-300'
                      : 'text-sky-300 group-hover:rotate-45'
                  }`}
                />
              </div>

              {/* Star Name Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-purple-500/20 text-[10px] sm:text-xs font-mono text-purple-200 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                {star.name}
              </div>
            </button>
          );
        })}

        {/* Interactive Instruction Note */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 text-center sm:text-left text-[11px] text-slate-500 pointer-events-none">
          Click any star to illuminate the hidden birthday wish.
        </div>
      </div>

      {/* POPUP MODAL FOR SELECTED STAR WISH */}
      {selectedStar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={closeWishModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 border border-purple-500/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Star Icon Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.4)]">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-pink-400 font-mono">
                  Star: {selectedStar.name}
                </span>
                <h3 className="text-xl font-bold text-slate-100 font-cinzel">
                  {selectedStar.title}
                </h3>
              </div>
            </div>

            {/* Wish Text */}
            <p className="text-base sm:text-lg text-slate-200 font-serif italic leading-relaxed my-4 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
              “{selectedStar.wish}”
            </p>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-purple-500/20">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Written for Srivarshini</span>
              </span>
              <button
                onClick={closeWishModal}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
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
