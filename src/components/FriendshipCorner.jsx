import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Flame, Shield, Heart, Sunset } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function FriendshipCorner({ onOpenCustomLightbox }) {
  const { friendshipCorner } = BIRTHDAY_CONFIG;
  const { slides } = friendshipCorner;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const activeSlide = slides[currentSlideIndex];

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Slide
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Slide
      goToPrevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const handleOpenPhoto = () => {
    if (onOpenCustomLightbox) {
      onOpenCustomLightbox({
        src: activeSlide.photoSrc,
        fallbackSrc: activeSlide.fallbackPhotoSrc,
        title: `${activeSlide.name} — ${activeSlide.title}`,
        caption: activeSlide.subtitle,
        aspectRatio: activeSlide.originalAspectRatio,
        orientation: currentSlideIndex === 0 ? 'square' : 'portrait'
      });
    }
  };

  return (
    <section id="friendship-corner" className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* Tamil Nadu Dusk & Twilight Ambient Lighting */}
      {/* Warm amber streetlight glow blending into indigo and deep violet night */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/15 rounded-full blur-[180px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        
        {/* Subtle Tamil Nadu Dusk Atmosphere Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 via-amber-950/40 to-indigo-950/80 border border-amber-500/30 text-xs text-amber-200/90 font-medium mb-4 shadow-[0_0_25px_rgba(251,191,36,0.15)]">
          <Sunset className="w-3.5 h-3.5 text-amber-400" />
          <span>{friendshipCorner.atmosphere.locationNote}</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-gradient-cosmic font-cinzel mb-4 drop-shadow-[0_0_30px_rgba(192,132,252,0.35)]">
          {friendshipCorner.headline}
        </h2>

        {/* Dynamic Friendship Statement */}
        <div className="inline-block px-5 py-2 rounded-2xl bg-purple-950/50 border border-purple-500/20 backdrop-blur-md mb-4">
          <p className="text-xs sm:text-sm font-cinzel font-bold tracking-widest text-pink-300">
            {friendshipCorner.dynamicStatement}
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300/80 font-light leading-relaxed">
          {friendshipCorner.subheadline}
        </p>
      </div>

      {/* CINEMATIC SLIDER CONTAINER */}
      <div
        className="relative w-full max-w-4xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Main Slide Card */}
        <div className="relative rounded-3xl glass-panel-glow border-2 border-purple-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden transition-all duration-700">
          
          {/* Subtle Ambient Streetlight Bokeh Accent inside card */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
            style={{
              backgroundColor: currentSlideIndex === 0 ? '#a855f7' : '#ec4899'
            }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT / TOP: SMART PHOTO DISPLAY */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                onClick={handleOpenPhoto}
                className="group relative cursor-pointer w-full max-w-[340px] rounded-2xl overflow-hidden glass-panel border border-purple-400/40 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-pink-400/70"
                style={{
                  // Tailored frame ratio: 1:1 square for Tobi, 9:14 for Srivarshini
                  aspectRatio: currentSlideIndex === 0 ? '1 / 1' : '9 / 14',
                  maxHeight: currentSlideIndex === 0 ? '340px' : '460px'
                }}
              >
                {/* 1. Blurred Ambient Backdrop from the SAME photograph */}
                <img
                  src={activeSlide.photoSrc}
                  alt={activeSlide.name}
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-120 opacity-35 pointer-events-none transform-gpu"
                  onError={(e) => {
                    // Graceful fallback to static direct path if API is bypassed
                    if (e.target.src !== activeSlide.fallbackPhotoSrc) {
                      e.target.src = activeSlide.fallbackPhotoSrc;
                    }
                  }}
                />
                
                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040a]/80 via-transparent to-transparent pointer-events-none"></div>

                {/* 2. Sharp, uncropped, original aspect ratio foreground photo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={activeSlide.photoSrc}
                    alt={activeSlide.name}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ objectPosition: activeSlide.objectPosition || 'center' }}
                    onError={(e) => {
                      if (e.target.src !== activeSlide.fallbackPhotoSrc) {
                        e.target.src = activeSlide.fallbackPhotoSrc;
                      }
                    }}
                  />
                </div>

                {/* Full-Screen Zoom Button Badge */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-400/30 text-xs text-purple-200 opacity-90 group-hover:opacity-100 group-hover:border-pink-400 transition-all shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
                  <span className="text-[11px] font-mono">View Full</span>
                </div>

                {/* Bottom Photo Pill */}
                <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-[11px] font-cinzel text-purple-200">
                  {activeSlide.name}
                </div>
              </div>

              <span className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Click photo for full-screen view
              </span>
            </div>

            {/* RIGHT / BOTTOM: PERSONALITY & WITTY DESCRIPTION */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5 text-left">
              
              <div>
                {/* Role Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border shadow-sm backdrop-blur-md"
                  style={{
                    backgroundColor: currentSlideIndex === 0 ? 'rgba(88, 28, 135, 0.5)' : 'rgba(131, 24, 67, 0.5)',
                    borderColor: currentSlideIndex === 0 ? 'rgba(192, 132, 252, 0.4)' : 'rgba(244, 114, 182, 0.4)',
                    color: currentSlideIndex === 0 ? '#e9d5ff' : '#fce7f3'
                  }}
                >
                  {currentSlideIndex === 0 ? (
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  ) : (
                    <Shield className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  )}
                  <span>{activeSlide.tag}</span>
                </div>

                {/* Name */}
                <h3 className="text-3xl sm:text-4xl font-black font-cinzel text-slate-100 tracking-tight">
                  {activeSlide.name}
                </h3>

                {/* Title */}
                <h4 className="text-sm sm:text-base font-cinzel font-bold text-gradient-cosmic tracking-wide mt-1 mb-4">
                  “{activeSlide.title}”
                </h4>

                {/* Personality Traits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {activeSlide.traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-purple-950/30 border border-purple-500/15 text-xs text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0"></span>
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>

                {/* Witty / Affectionate Paragraphs */}
                <div className="space-y-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {activeSlide.description.map((p, i) => (
                    <p key={i} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Slide Navigation Footnote & Progress */}
              <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300/80">
                  Character {currentSlideIndex + 1} of {slides.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevSlide}
                    className="p-2 rounded-full glass-panel border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="p-2 rounded-full glass-panel border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlideIndex
                  ? 'w-10 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                  : 'w-2.5 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`View ${slide.name}`}
            />
          ))}
        </div>

      </div>

      {/* HEARTFELT TRANSITION BANNER */}
      <div className="mt-16 text-center max-w-2xl mx-auto px-4">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0e0c1f]/80 to-amber-950/30 border border-purple-500/25 shadow-lg backdrop-blur-md">
          <Heart className="w-6 h-6 text-pink-400 mx-auto mb-3 animate-pulse" />
          <p className="text-base sm:text-lg text-purple-200 font-serif italic leading-relaxed">
            “{friendshipCorner.heartfeltTransition}”
          </p>
        </div>
      </div>

      {/* FRIENDSHIP ENDING MESSAGE */}
      <div className="mt-14 max-w-3xl mx-auto text-center px-4">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)] space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-amber-300/80 font-mono mb-2">
            A Note on This Chaotic Bond
          </h4>
          {friendshipCorner.endingMessage.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx === friendshipCorner.endingMessage.length - 1
                  ? 'text-lg sm:text-2xl text-pink-200 font-bold pt-2'
                  : 'text-base sm:text-xl text-slate-200/90 italic'
              }`}
            >
              {line}
            </p>
          ))}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-purple-400/80 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Tobi & Srivarshini • 3011 Universe</span>
          </div>
        </div>
      </div>

    </section>
  );
}
