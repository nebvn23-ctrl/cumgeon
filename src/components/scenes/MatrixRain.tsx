"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "01CUMGEONΨΦΩ₿$%#+".split("");

/** Canvas-based digital rain used behind the Matrix / infection chapters. */
export default function MatrixRain({ intensity = 1 }: { intensity?: number }) {
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
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 16;
    let raf = 0;
    let visible = true;
    let frame = 0;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -height);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame++;
      if (!visible || frame % 2 !== 0) return;
      ctx.fillStyle = "rgba(5,9,4,0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px var(--font-mono, monospace)`;
      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i];
        const alpha = Math.random() * 0.5 + 0.3;
        ctx.fillStyle = `rgba(202,255,0,${alpha * intensity})`;
        ctx.fillText(char, x, y);
        drops[i] += fontSize * 0.9;
        if (drops[i] > height && Math.random() > 0.975) {
          drops[i] = Math.random() * -200;
        }
      }
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [intensity, reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(202,255,0,0.15) 0px, transparent 2px, transparent 16px)",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
