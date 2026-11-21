import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function ClosingSection({ onScrollToTop }) {
  const { finalMessage } = BIRTHDAY_CONFIG;

  return (
    <footer className="relative py-28 px-4 text-center overflow-hidden border-t border-purple-500/15">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Floating emblem */}
        <div className="w-12 h-12 mb-6 rounded-2xl bg-purple-900/50 border border-purple-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-float">
          <Sparkles className="w-6 h-6 text-purple-300" />
        </div>

        {/* Section Heading Quote */}
        <h2 className="text-2xl sm:text-4xl font-serif italic text-purple-200 mb-4 leading-relaxed">
          {finalMessage.quote}
        </h2>

        <p className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-mono mb-8">
          {finalMessage.author}
        </p>

        <p className="text-base sm:text-lg text-slate-300 font-light mb-10 max-w-lg leading-relaxed">
          {finalMessage.celebrationText}
        </p>

        {/* Back to top button */}
        <button
          onClick={onScrollToTop}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-purple-500/30 text-xs sm:text-sm text-purple-200 hover:border-purple-400 hover:text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          <span>{finalMessage.replayPrompt}</span>
        </button>

        {/* Minimal Copyright / Trademark */}
        <div className="mt-16 pt-8 border-t border-purple-500/10 text-[11px] text-slate-500 font-mono">
          <span>Project 3011 • Designed & Built exclusively for Srivarshini</span>
        </div>

      </div>
    </footer>
  );
}
