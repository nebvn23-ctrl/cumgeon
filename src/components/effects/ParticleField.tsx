"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  r: number;
  speedY: number;
  drift: number;
  driftPhase: number;
  opacity: number;
  spin: number;
  spinSpeed: number;
  kind: "feather" | "dust";
}

/**
 * Lightweight canvas particle field for ambient floating feathers + dust.
 * A single <canvas> + rAF loop instead of dozens of animated DOM nodes,
 * per the performance requirement to use canvas for large particle groups.
 */
export default function ParticleField({
  density = 18,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1.5,
      speedY: Math.random() * 0.25 + 0.08,
      drift: Math.random() * 0.6 + 0.2,
      driftPhase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.35 + 0.08,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.01,
      kind: Math.random() > 0.82 ? "feather" : "dust",
    });

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: density }, makeParticle);
    };

    const drawFeather = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#e8e6d9";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 2.2, p.r * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawDust = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#caff00";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speedY;
        p.driftPhase += 0.01;
        p.x += Math.sin(p.driftPhase) * p.drift * 0.05;
        p.spin += p.spinSpeed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.kind === "feather") drawFeather(p);
        else drawDust(p);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [density, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
