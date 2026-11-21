import React, { useEffect, useRef } from 'react';

/**
 * Global Ambient Bokeh Flower Atmosphere
 * Inspired by Tamil Nadu Twilight & Residential Evenings:
 * - Gentle Jasmine (*Malli*) cream petals with soft golden centers
 * - Warm amber streetlight glow blending into indigo and violet night skies
 * - Floating bokeh orbs with breathing luminescence
 * - Lavender, pink, violet, celestial blue, and subtle golden starlight
 * - 3 Depth layers: background (slow, blurred), midground, foreground (crisp, gentle drift)
 * - Optimized with requestAnimationFrame & reduced-motion check
 * - Non-intrusive: pointer-events-none, strictly behind content
 */
export default function BokehFlowerEffect({ isBirthdayMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Tamil Nadu Twilight Palette:
    // Jasmine Cream, Warm Amber Streetlight, Lavender, Soft Pink, Violet, Night Sky Indigo
    const palette = [
      { r: 253, g: 251, b: 247, type: 'jasmine' }, // Jasmine white/cream
      { r: 251, g: 191, b: 36,  type: 'amber'   }, // Warm Streetlight Amber
      { r: 216, g: 180, b: 254, type: 'lavender'}, // Soft Lavender
      { r: 244, g: 114, b: 182, type: 'rose'    }, // Twilight Rose
      { r: 192, g: 132, b: 252, type: 'violet'  }, // Deep Violet
      { r: 129, g: 140, b: 248, type: 'indigo'  }, // Indigo Night
    ];

    const isMobile = width < 768;
    const bokehCount = isMobile ? 18 : 34;
    const flowerCount = isMobile ? 16 : 28;

    // 1. Floating Bokeh Orbs (Ambient Streetlight & Cosmic Dust)
    const bokehCircles = Array.from({ length: bokehCount }, () => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      const layer = Math.random() < 0.35 ? 'bg' : Math.random() < 0.7 ? 'mid' : 'fg';
      const radius = layer === 'bg' ? Math.random() * 48 + 32 : layer === 'mid' ? Math.random() * 26 + 14 : Math.random() * 12 + 6;
      const speed = layer === 'bg' ? 0.14 : layer === 'mid' ? 0.26 : 0.38;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color,
        baseAlpha: layer === 'bg' ? 0.08 : layer === 'mid' ? 0.14 : 0.22,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
        vy: -speed * (Math.random() * 0.4 + 0.8),
        vx: (Math.random() - 0.5) * speed * 0.45,
        layer
      };
    });

    // 2. Glowing Jasmine Blossoms & Drifting Petals
    const flowers = Array.from({ length: flowerCount }, () => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      const isJasmine = color.type === 'jasmine' || Math.random() < 0.35;
      const isSinglePetal = Math.random() > 0.45;
      const size = Math.random() * 7 + 4; // petal size

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        isJasmine,
        isSinglePetal,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        alpha: Math.random() * 0.35 + 0.25,
        vy: -(Math.random() * 0.26 + 0.14),
        vx: (Math.random() - 0.5) * 0.22,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.008
      };
    });

    // Draw Jasmine Flower (Tamil Nadu Malli Blossom)
    function drawJasmineFlower(ctx, x, y, size, alpha, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Warm amber-gold center aura
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.2);
      glowGrad.addColorStop(0, `rgba(254, 240, 138, ${alpha * 0.8})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 6 delicate white/cream petals
      const petalCount = 6;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.5, -size * 1.1, 0, -size * 1.55);
        ctx.quadraticCurveTo(-size * 0.5, -size * 1.1, 0, 0);
        ctx.fillStyle = `rgba(253, 251, 247, ${alpha * 0.75})`;
        ctx.fill();

        ctx.restore();
      }

      // Golden stamen
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.95})`;
      ctx.fill();

      ctx.restore();
    }

    // Draw General Starlight Blossom
    function drawFlower(ctx, x, y, size, color, alpha, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.2);
      glowGrad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.7})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 5 Soft Petals
      const petalCount = 5;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.6, -size * 1.2, 0, -size * 1.6);
        ctx.quadraticCurveTo(-size * 0.6, -size * 1.2, 0, 0);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.65})`;
        ctx.fill();

        ctx.restore();
      }

      // Stamen
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254, 240, 138, ${alpha * 0.9})`;
      ctx.fill();

      ctx.restore();
    }

    // Draw single drifting petal
    function drawPetal(ctx, x, y, size, color, alpha, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.7, -size * 1.1, 0, -size * 1.8);
      ctx.quadraticCurveTo(-size * 0.7, -size * 1.1, 0, 0);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.52})`;
      ctx.fill();

      ctx.restore();
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      const birthdayMultiplier = isBirthdayMode ? 1.3 : 1;

      // 1. Render Bokeh Orbs
      for (const orb of bokehCircles) {
        if (!prefersReducedMotion) {
          orb.y += orb.vy;
          orb.x += orb.vx;
          if (orb.y < -orb.radius * 2) {
            orb.y = height + orb.radius;
            orb.x = Math.random() * width;
          }
          if (orb.x < -orb.radius) orb.x = width + orb.radius;
          if (orb.x > width + orb.radius) orb.x = -orb.radius;
        }

        const pulse = Math.sin(time + orb.pulseOffset) * 0.04;
        const currentAlpha = Math.max(0.02, (orb.baseAlpha + pulse) * birthdayMultiplier);

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentAlpha})`);
        grad.addColorStop(0.6, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentAlpha * 0.38})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Jasmine & Starlight Flowers
      for (const fl of flowers) {
        if (!prefersReducedMotion) {
          fl.wobble += fl.wobbleSpeed;
          fl.y += fl.vy;
          fl.x += fl.vx + Math.sin(fl.wobble) * 0.32;
          fl.rotation += fl.rotSpeed;

          if (fl.y < -30) {
            fl.y = height + 20;
            fl.x = Math.random() * width;
          }
          if (fl.x < -30) fl.x = width + 20;
          if (fl.x > width + 30) fl.x = -20;
        }

        const effectiveAlpha = Math.min(0.9, fl.alpha * birthdayMultiplier);

        if (fl.isSinglePetal) {
          drawPetal(ctx, fl.x, fl.y, fl.size, fl.color, effectiveAlpha, fl.rotation);
        } else if (fl.isJasmine) {
          drawJasmineFlower(ctx, fl.x, fl.y, fl.size, effectiveAlpha, fl.rotation);
        } else {
          drawFlower(ctx, fl.x, fl.y, fl.size, fl.color, effectiveAlpha, fl.rotation);
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
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
