"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A subtle glowing "pupil tracker" positioned over the character's actual
 * eye (coordinates calibrated per-image below). It nudges a couple of
 * pixels toward the pointer, just enough to feel alive without pretending
 * to be a fully rigged 3D eyeball.
 */
export function CharacterEye({
  xPercent,
  yPercent,
}: {
  xPercent: number;
  yPercent: number;
}) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = dotRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      el.style.transform = `translate(${dx * 3}px, ${dy * 3}px)`;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-[5%] w-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        boxShadow: "0 0 12px 3px rgba(202,255,0,0.55)",
      }}
    >
      <div ref={dotRef} className="h-full w-full rounded-full" />
    </div>
  );
}
