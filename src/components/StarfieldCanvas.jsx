import React, { useEffect, useRef } from 'react';

/**
 * High-performance 3D-depth Starfield Canvas with ambient cosmic dust
 * Automatically intensifies twinkling & speed when Birthday Mode is active.
 */
export default function StarfieldCanvas({ isBirthdayMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate starry cosmos
    const starCount = Math.min(Math.floor((width * height) / 4500), 280);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (isBirthdayMode ? 1.6 : 1),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color: getRandomStarColor(),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    function getRandomStarColor() {
      const colors = [
        'rgba(255, 255, 255, ',
        'rgba(216, 180, 254, ', // lavender
        'rgba(192, 132, 252, ', // purple
        'rgba(244, 114, 182, ', // pink
        'rgba(186, 230, 253, ', // soft blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Floating stardust nebulae particles
    const dustCount = 25;
    const dust = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 80 + 40,
      alpha: Math.random() * 0.04 + 0.015,
      color: Math.random() > 0.5 ? '168, 85, 247' : '56, 189, 248',
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle dust nebulae
      for (const d of dust) {
        if (!prefersReducedMotion) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < -d.radius) d.x = width + d.radius;
          if (d.x > width + d.radius) d.x = -d.radius;
          if (d.y < -d.radius) d.y = height + d.radius;
          if (d.y > height + d.radius) d.y = -d.radius;
        }

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        grad.addColorStop(0, `rgba(${d.color}, ${d.alpha * (isBirthdayMode ? 1.4 : 1)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render stars
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;

          s.alpha += s.twinkleSpeed * s.twinkleDir;
          if (s.alpha > 0.95) {
            s.alpha = 0.95;
            s.twinkleDir = -1;
          } else if (s.alpha < 0.2) {
            s.alpha = 0.2;
            s.twinkleDir = 1;
          }
        }

        const effectiveAlpha = isBirthdayMode ? Math.min(1, s.alpha * 1.3) : s.alpha;
        ctx.fillStyle = `${s.color}${effectiveAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (isBirthdayMode ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fill();

        // Extra twinkle flare for brighter stars
        if (s.size > 1.4 && s.alpha > 0.7) {
          ctx.strokeStyle = `${s.color}${effectiveAlpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - 3, s.y);
          ctx.lineTo(s.x + 3, s.y);
          ctx.moveTo(s.x, s.y - 3);
          ctx.lineTo(s.x, s.y + 3);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBirthdayMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
