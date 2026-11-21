import React from 'react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function BirthdayHero({ onScrollToMemories }) {
  const { welcomeSection } = BIRTHDAY_CONFIG;

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      
      {/* Radiant ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs sm:text-sm text-purple-300 font-medium mb-6 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>{welcomeSection.eyebrow}</span>
        </div>

        {/* Cinematic Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gradient-cosmic font-cinzel mb-6 leading-tight">
          {welcomeSection.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-purple-200/90 font-serif italic mb-6 max-w-2xl leading-relaxed">
          {welcomeSection.subtitle}
        </p>

        {/* Heartfelt lead paragraph */}
        <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
          {welcomeSection.leadParagraph}
        </p>

        {/* Navigation Prompt */}
        <button
          onClick={onScrollToMemories}
          className="group flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-purple-300/80 hover:text-purple-200 transition-colors cursor-pointer"
        >
          <span>{welcomeSection.scrollPrompt}</span>
          <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400 group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <ChevronDown className="w-4 h-4 animate-bounce text-purple-300" />
          </div>
        </button>

      </div>
    </section>
  );
}
