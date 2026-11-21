import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc, AlertCircle, RefreshCw } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying }) {
  const { music } = BIRTHDAY_CONFIG;
  const [volume, setVolume] = useState(music.defaultVolume || 0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  // Synchronize audio element settings & listeners
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleCanPlay = () => {
      setIsReady(true);
      setHasError(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.warn('Audio player encountered an issue loading source:', e);
      // Try fallback to direct static path if API media returned error
      if (audio.src && !audio.src.endsWith('/birthday.mpeg')) {
        audio.src = music.fallbackSrc || '/birthday.mpeg';
        audio.load();
      } else {
        setHasError(true);
        setErrorMessage('Could not load audio. Tap to retry.');
        setIsPlaying(false);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef, isMuted, volume, setIsPlaying, music.fallbackSrc]);

  // Sync volume adjustments
  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  // Toggle Play / Pause deliberately
  const togglePlay = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      setErrorMessage('');

      // If audio is not ready or errored, reload
      if (!audio.src || audio.error) {
        audio.src = music.src;
        audio.load();
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((err) => {
            console.warn('Playback blocked or failed:', err);
            // If API media is blocked, try static fallback
            if (audio.src !== music.fallbackSrc) {
              audio.src = music.fallbackSrc;
              audio.play()
                .then(() => {
                  setIsPlaying(true);
                  setHasError(false);
                })
                .catch((fallbackErr) => {
                  setHasError(true);
                  setErrorMessage('Audio tap required or file unreachable');
                  setIsPlaying(false);
                });
            } else {
              setHasError(true);
              setErrorMessage('Audio tap required or file unreachable');
              setIsPlaying(false);
            }
          });
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      
      {/* Error / Status Tooltip if audio fails */}
      {hasError && (
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-xl bg-red-950/90 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 shadow-xl backdrop-blur-md animate-fade-in whitespace-nowrap">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
          <button
            onClick={togglePlay}
            className="p-1 rounded hover:bg-red-900/60 transition-colors"
            title="Retry Audio"
          >
            <RefreshCw className="w-3 h-3 text-red-300" />
          </button>
        </div>
      )}

      {/* Floating Glassmorphism Player Capsule */}
      <div className="relative flex items-center gap-2 p-2 sm:p-2.5 rounded-full glass-panel-glow border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300">
        
        {/* Disc / Visualizer icon button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative flex items-center justify-center w-9 h-9 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 cursor-pointer hover:scale-105 transition-transform"
          title="Toggle Music Controls"
          aria-label="Toggle Music Controls"
        >
          <Disc className={`w-5 h-5 ${isPlaying ? 'animate-[spin_4s_linear_infinite] text-pink-300' : 'text-purple-300'}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
          )}
        </button>

        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-white transition-all cursor-pointer shadow-md ${
            isPlaying
              ? 'bg-pink-600 hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
              : 'bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
          }`}
          title={isPlaying ? 'Pause Background Melody' : 'Play Background Melody'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Expandable Controls (Volume Slider + Visualizer Bars) */}
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-w-[240px] opacity-100 pr-2' : 'max-w-0 opacity-0 pointer-events-none'}`}>
          
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-purple-200 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-purple-300" />
            )}
          </button>

          {/* Volume Range Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-purple-900/80 rounded-lg appearance-none cursor-pointer accent-pink-400"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />

          {/* Mini Soundwave Visualizer Bars */}
          <div className="flex items-end gap-0.5 h-4 w-7 px-1">
            <span className={`w-1 rounded-full bg-pink-400 transition-all ${isPlaying ? 'h-full animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-1.5'}`}></span>
            <span className={`w-1 rounded-full bg-purple-400 transition-all ${isPlaying ? 'h-3/4 animate-[pulse_0.9s_ease-in-out_infinite]' : 'h-2'}`}></span>
            <span className={`w-1 rounded-full bg-sky-400 transition-all ${isPlaying ? 'h-full animate-[pulse_0.7s_ease-in-out_infinite]' : 'h-1'}`}></span>
            <span className={`w-1 rounded-full bg-amber-400 transition-all ${isPlaying ? 'h-2/3 animate-[pulse_0.8s_ease-in-out_infinite]' : 'h-1.5'}`}></span>
          </div>

        </div>

      </div>
    </div>
  );
}
