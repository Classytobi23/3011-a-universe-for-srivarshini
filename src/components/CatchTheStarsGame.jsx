import React, { useState, useEffect, useRef } from 'react';
import { Star, Trophy, Clock, Play, RotateCcw, Sparkles, Heart, AlertTriangle, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import BIRTHDAY_CONFIG from '../config/birthday.config';

export default function CatchTheStarsGame() {
  const { catchTheStarsGame } = BIRTHDAY_CONFIG;
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'ended'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(catchTheStarsGame.durationSeconds || 30);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('3011_universe_star_best_score') || '0', 10);
    } catch {
      return 0;
    }
  });

  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const starsRef = useRef([]);
  const floatTextsRef = useRef([]);
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(30);

  // Sync refs with state
  scoreRef.current = score;
  timeLeftRef.current = timeLeft;

  // Types of falling items
  const ITEM_TYPES = [
    { type: 'normal', color: '#c084fc', icon: '⭐', points: 10, size: 24, speed: 2.2, weight: 0.55 },
    { type: 'gold', color: '#fbbf24', icon: '🌟', points: 25, size: 28, speed: 2.8, weight: 0.20 },
    { type: 'heart', color: '#f472b6', icon: '💖', points: 50, size: 26, speed: 3.2, weight: 0.12 },
    { type: 'dark', color: '#475569', icon: '🌑', points: -15, size: 22, speed: 2.5, weight: 0.13 },
  ];

  const startGame = () => {
    setScore(0);
    setTimeLeft(catchTheStarsGame.durationSeconds || 30);
    starsRef.current = [];
    floatTextsRef.current = [];
    setGameState('playing');
  };

  const restartGame = () => {
    startGame();
  };

  // Timer Tick down
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  const endGame = () => {
    setGameState('ended');
    const finalScore = scoreRef.current;
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      try {
        localStorage.setItem('3011_universe_star_best_score', String(finalScore));
      } catch {}
    }

    // Celebration confetti burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f472b6', '#c084fc', '#38bdf8'],
      disableForReducedMotion: true
    });
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize internal canvas buffer to match client rect
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let width = canvas.width;
    let height = canvas.height;

    let frameCount = 0;
    let spawnRate = 35; // frames between spawns

    const handlePointerHit = (clientX, clientY) => {
      const bounds = canvas.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;

      const stars = starsRef.current;
      for (let i = stars.length - 1; i >= 0; i--) {
        const item = stars[i];
        const dist = Math.hypot(item.x - x, item.y - y);
        // generous hit radius for smooth mobile taps
        if (dist <= item.size + 14) {
          // Hit!
          const pts = item.points;
          setScore((prev) => Math.max(0, prev + pts));

          // Spawn floating text particle
          floatTextsRef.current.push({
            x: item.x,
            y: item.y,
            text: pts > 0 ? `+${pts}` : `${pts}`,
            color: pts > 0 ? (item.type === 'gold' ? '#fbbf24' : item.type === 'heart' ? '#f472b6' : '#c084fc') : '#ef4444',
            alpha: 1,
            vy: -1.8
          });

          // Remove item
          stars.splice(i, 1);
          break; // Catch one star per tap
        }
      }
    };

    const handleMouseDown = (e) => {
      handlePointerHit(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerHit(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // Difficulty progression over time
      const timeElapsed = (catchTheStarsGame.durationSeconds || 30) - timeLeftRef.current;
      const speedMultiplier = 1 + (timeElapsed / 30) * 0.8;
      const currentSpawnRate = Math.max(18, Math.floor(spawnRate - (timeElapsed / 30) * 14));

      // 1. Spawn falling items
      if (frameCount % currentSpawnRate === 0) {
        const rand = Math.random();
        let cumulative = 0;
        let chosenType = ITEM_TYPES[0];

        for (const t of ITEM_TYPES) {
          cumulative += t.weight;
          if (rand <= cumulative) {
            chosenType = t;
            break;
          }
        }

        starsRef.current.push({
          x: Math.random() * (width - 40) + 20,
          y: -30,
          ...chosenType,
          vy: chosenType.speed * speedMultiplier,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.05 + 0.02
        });
      }

      // 2. Update and render falling items
      const stars = starsRef.current;
      for (let i = stars.length - 1; i >= 0; i--) {
        const item = stars[i];
        item.y += item.vy;
        item.wobble += item.wobbleSpeed;
        item.x += Math.sin(item.wobble) * 0.8;

        // Draw item glow
        const glowGrad = ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, item.size * 1.5);
        glowGrad.addColorStop(0, `${item.color}88`);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw emoji icon representation
        ctx.font = `${item.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.icon, item.x, item.y);

        // Remove if off screen
        if (item.y > height + 40) {
          stars.splice(i, 1);
        }
      }

      // 3. Update and render floating score texts
      const floatTexts = floatTextsRef.current;
      for (let j = floatTexts.length - 1; j >= 0; j--) {
        const ft = floatTexts[j];
        ft.y += ft.vy;
        ft.alpha -= 0.03;

        ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = `${ft.color}${Math.floor(Math.max(0, ft.alpha) * 255).toString(16).padStart(2, '0')}`;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);

        if (ft.alpha <= 0) {
          floatTexts.splice(j, 1);
        }
      }

      gameLoopRef.current = requestAnimationFrame(render);
    };

    gameLoopRef.current = requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState]);

  return (
    <section id="catch-the-stars-game" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs text-amber-300 font-medium mb-3">
          <Star className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>{catchTheStarsGame.badge} • 30-Second Challenge</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-gold font-cinzel mb-3">
          {catchTheStarsGame.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300/80 font-light max-w-xl mx-auto">
          {catchTheStarsGame.subtitle}
        </p>
      </div>

      {/* GAME CONSOLE / ARENA */}
      <div className="relative w-full rounded-3xl glass-panel-glow border-2 border-amber-500/30 overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.15)] flex flex-col items-center">
        
        {/* HUD Bar (Score, Timer, Best Score) */}
        <div className="w-full flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-amber-500/20 backdrop-blur-md">
          {/* Score */}
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Score:</span>
            <span className="text-xl sm:text-2xl font-black font-cinzel text-amber-200">
              {score}
            </span>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-ping' : 'text-purple-300'}`} />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Time:</span>
            <span className={`text-xl sm:text-2xl font-black font-mono ${timeLeft <= 5 ? 'text-red-400' : 'text-slate-100'}`}>
              {String(timeLeft).padStart(2, '0')}s
            </span>
          </div>

          {/* Best Score */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-purple-300/80">
            <Award className="w-3.5 h-3.5 text-pink-400" />
            <span>Best: {bestScore}</span>
          </div>
        </div>

        {/* GAME CANVAS & OVERLAYS */}
        <div className="relative w-full h-[400px] sm:h-[450px] bg-[#050510] overflow-hidden select-none touch-none">
          
          {/* Active Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
          />

          {/* 1. IDLE SCREEN (Before Starting) */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/85 backdrop-blur-md text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(251,191,36,0.5)] animate-float">
                <Star className="w-8 h-8 text-slate-950 fill-slate-950" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-gradient-gold mb-2">
                Ready to Catch the Stars?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-light mb-6 leading-relaxed">
                {catchTheStarsGame.instructions}
              </p>

              {/* Point Values Legend */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono mb-8">
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  ⭐ Star +10
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-300">
                  🌟 Gold +25
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-950/80 border border-pink-500/30 text-pink-300">
                  💖 Heart +50
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400">
                  🌑 Debris -15
                </span>
              </div>

              <button
                onClick={startGame}
                className="group relative px-8 py-3.5 rounded-2xl font-cinzel font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(251,191,36,0.6)] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>START GAME</span>
                </div>
              </button>
            </div>
          )}

          {/* 2. ENDED / REWARD SCREEN */}
          {gameState === 'ended' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md text-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(244,114,182,0.5)]">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              </div>

              <span className="text-xs uppercase tracking-widest text-amber-300 font-mono mb-1">
                Cosmic Orbit Complete!
              </span>

              <div className="text-4xl sm:text-5xl font-black font-cinzel text-slate-100 my-2 drop-shadow-md">
                {score} Points
              </div>

              {/* Birthday Reward Message */}
              <p className="text-base sm:text-lg text-purple-200 font-serif italic max-w-md my-4 p-4 rounded-2xl bg-purple-950/50 border border-purple-500/30">
                “{catchTheStarsGame.endMessage}”
              </p>

              {/* Secret Score Unlock */}
              {score >= (catchTheStarsGame.secretUnlockScore || 150) && (
                <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-950/70 to-pink-950/70 border border-amber-400/50 text-xs text-amber-200 max-w-sm animate-fade-in">
                  <div className="flex items-center gap-1 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Secret High Score Blessing Unlocked!</span>
                  </div>
                  <p className="font-serif italic text-amber-100/90">
                    “{catchTheStarsGame.secretUnlockedMessage}”
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={restartGame}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-cinzel font-bold text-xs tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>PLAY AGAIN</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer controls while in-game */}
        {gameState === 'playing' && (
          <div className="w-full flex items-center justify-between px-6 py-2.5 bg-slate-950/90 border-t border-purple-500/15 text-xs text-slate-400 font-mono">
            <span>Tap falling stars & hearts to score!</span>
            <button
              onClick={restartGame}
              className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Restart
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
