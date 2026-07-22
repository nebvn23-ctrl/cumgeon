"use client";

import { cumgeonConfig } from "@/config/cumgeon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Faint CRT-style scanline + vignette texture, purely decorative. */
export default function ScanLines() {
  const reducedMotion = useReducedMotion();
  if (!cumgeonConfig.featureFlags.enableScanlines) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65]">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {!reducedMotion && (
        <div
          className="absolute inset-x-0 h-40 animate-scanline opacity-[0.04]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(202,255,0,0.5), transparent)",
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
