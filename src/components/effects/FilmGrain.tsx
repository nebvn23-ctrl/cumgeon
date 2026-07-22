"use client";

import { cumgeonConfig } from "@/config/cumgeon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Full-viewport film-grain texture using an SVG feTurbulence filter animated
 * via the `grain` keyframe (see tailwind.config.ts). Cheap: one fixed div,
 * no canvas, no per-frame JS.
 */
export default function FilmGrain() {
  const reducedMotion = useReducedMotion();
  if (!cumgeonConfig.featureFlags.enableFilmGrain || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay"
    >
      <svg className="h-[300%] w-[300%] animate-grain" style={{ transform: "translate(-33%,-33%)" }}>
        <filter id="cumgeon-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cumgeon-grain)" />
      </svg>
    </div>
  );
}
