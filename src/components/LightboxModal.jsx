import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function LightboxModal({ activeItem, onClose, onPrev, onNext }) {
  if (activeItem === null || activeItem === undefined) return null;

  // Determine if activeItem is a number index or a custom object
  let currentPhoto;
  let isCustom = false;
  let activeIndex = null;

  if (typeof activeItem === 'number') {
    activeIndex = activeItem;
    currentPhoto = BIRTHDAY_CONFIG.memories[activeIndex];
  } else if (typeof activeItem === 'object') {
    currentPhoto = activeItem;
    isCustom = true;
  }

  if (!currentPhoto) return null;

  // Keyboard navigation listener (Left, Right, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (!isCustom && onPrev && e.key === 'ArrowLeft') onPrev();
      if (!isCustom && onNext && e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, isCustom]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in select-none">

      {/* Blurred Ambient Backdrop of this exact photo */}
      <img
        src={currentPhoto.src}
        alt={currentPhoto.title}
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-25 pointer-events-none transform-gpu"
        onError={(e) => {
          if (currentPhoto.fallbackSrc && e.target.src !== currentPhoto.fallbackSrc) {
            e.target.src = currentPhoto.fallbackSrc;
          }
        }}
      />
      <div className="absolute inset-0 bg-[#04040a]/80 pointer-events-none"></div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-slate-300 hover:text-white hover:border-purple-400 transition-all cursor-pointer"
        title="Close Lightbox (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Navigation Button (for memories list) */}
      {!isCustom && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-200 hover:text-white hover:scale-110 hover:border-purple-400 transition-all cursor-pointer"
          title="Previous Photo (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button (for memories list) */}
      {!isCustom && onNext && (
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-200 hover:text-white hover:scale-110 hover:border-purple-400 transition-all cursor-pointer"
          title="Next Photo (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Viewport */}
      <div className="relative z-40 max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">

        {/* Foreground sharp uncropped image */}
        <div className="relative max-h-[75vh] flex items-center justify-center p-2">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-purple-500/40"
            onError={(e) => {
              if (currentPhoto.fallbackSrc && e.target.src !== currentPhoto.fallbackSrc) {
                e.target.src = currentPhoto.fallbackSrc;
              }
            }}
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div className="mt-4 max-w-xl text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-mono">
              {!isCustom ? `Photo ${activeIndex + 1} of ${BIRTHDAY_CONFIG.memories.length}` : 'High-Resolution Portrait View'}
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-100 font-cinzel">
            {currentPhoto.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            {currentPhoto.caption}
          </p>
        </div>

      </div>

    </div>
  );
}
