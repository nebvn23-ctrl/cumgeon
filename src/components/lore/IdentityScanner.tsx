"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A humorous "identity scanner" that tries to classify CUMGEON, glitches,
 * and then loses track of him as his head drifts outside the frame — the
 * scan frame chases him and fails, per the brief for Chapter 04.
 */
export default function IdentityScanner() {
  const reducedMotion = useReducedMotion();
  const [rowIndex, setRowIndex] = useState(0);
  const [malfunction, setMalfunction] = useState(false);
  const [escaped, setEscaped] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setRowIndex(cumgeonConfig.identityScanner.length);
      setMalfunction(true);
      setEscaped(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    cumgeonConfig.identityScanner.forEach((_, i) => {
      timers.push(setTimeout(() => setRowIndex(i + 1), 500 + i * 550));
    });
    timers.push(
      setTimeout(() => setMalfunction(true), 500 + cumgeonConfig.identityScanner.length * 550 + 300)
    );
    timers.push(
      setTimeout(() => setEscaped(true), 500 + cumgeonConfig.identityScanner.length * 550 + 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-6">
      <div className="relative flex h-56 w-56 items-center justify-center">
        {/* scan frame — chases the character and fails */}
        <motion.div
          animate={
            escaped
              ? { x: [0, 30, -20, 40], y: [0, -25, 15, -10], opacity: [1, 1, 1, 0] }
              : malfunction
                ? { x: [0, -4, 4, -4, 0], rotate: [0, -1, 1, 0] }
                : {}
          }
          transition={escaped ? { duration: 1.1, ease: "easeIn" } : { duration: 0.3, repeat: malfunction ? Infinity : 0 }}
          className="absolute inset-0 rounded-md border-2 border-lime/70"
          style={{
            boxShadow: malfunction ? "0 0 25px rgba(202,255,0,0.4)" : "0 0 12px rgba(202,255,0,0.2)",
          }}
        >
          <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-lime" />
          <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-lime" />
          <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-lime" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-lime" />
        </motion.div>

        <motion.div
          animate={
            escaped
              ? { x: 70, y: -40, rotate: 8 }
              : malfunction
                ? { x: [0, 6, -6, 0], rotate: [0, 3, -3, 0] }
                : {}
          }
          transition={escaped ? { duration: 1, ease: "easeOut" } : { duration: 0.4, repeat: malfunction ? Infinity : 0 }}
        >
          <CharacterActor variant="trenches" state={escaped ? "frightened" : "watching"} size={160} showEye />
        </motion.div>
      </div>

      <div className="w-full space-y-2 rounded border border-lime/20 bg-black/60 p-4 font-mono text-sm">
        {cumgeonConfig.identityScanner.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-white/5 pb-1 last:border-0"
            style={{ opacity: i < rowIndex ? 1 : 0.15 }}
          >
            <span className="text-dirty/70">{row.label}</span>
            <span className="text-lime">{i < rowIndex ? row.value : "—"}</span>
          </div>
        ))}
        {malfunction && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-2 text-center text-[11px] uppercase tracking-wide2 text-rust"
          >
            SCANNER MALFUNCTION
          </motion.p>
        )}
      </div>
    </div>
  );
}
