"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Renders the CUMGEON wordmark as two stacked layers sharing one SVG
 * displacement filter, so the letters read as wet / unstable rather than
 * flat vector type. The `frontClip` layer sits above the character and is
 * clipped to the region the character's body crosses, so some strokes read
 * as being in front of him and some behind — the layered-masking effect
 * the brief calls out as essential.
 */
export default function LiquidWordmark({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative select-none">
      {!reducedMotion && (
        <svg width="0" height="0" className="absolute">
          <filter id="liquid-type">
            <feTurbulence type="turbulence" baseFrequency="0.008 0.03" numOctaves="2" seed="7" result="noise">
              <animate attributeName="baseFrequency" dur="14s" values="0.008 0.03;0.014 0.02;0.008 0.03" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}

      <h1
        className="font-display leading-[0.82] text-dirty"
        style={{
          fontSize: "clamp(4.5rem, 16vw, 13rem)",
          letterSpacing: "-0.045em",
          filter: reducedMotion ? undefined : "url(#liquid-type)",
          WebkitTextStroke: "1px rgba(202,255,0,0.15)",
        }}
      >
        {text}
      </h1>

      {/* fog pass */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-trench-950/70 to-trench-950 backdrop-blur-md"
      />
    </div>
  );
}
