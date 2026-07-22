"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterActor from "@/components/character/CharacterActor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Phase = "idle" | "falling" | "shaking" | "tail" | "opening" | "items" | "character" | "done";

export default function ArchiveCrate({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (p: Phase, delay: number) => timers.push(setTimeout(() => setPhase(p), delay));
    schedule("falling", 50);
    schedule("shaking", 650);
    schedule("tail", 1150);
    schedule("opening", 1600);
    schedule("items", 2100);
    schedule("character", 2700);
    schedule("done", 3500);
    timers.push(setTimeout(onComplete, 3700));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (reducedMotion) return null;

  const shakeActive = phase === "shaking";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden="true"
        >
          {/* crate body */}
          <motion.div
            initial={{ y: -260, opacity: 0 }}
            animate={{
              y: phase === "idle" ? -260 : 0,
              opacity: phase === "idle" ? 0 : 1,
              rotate: shakeActive ? [0, -2.5, 2.5, -2, 2, 0] : 0,
            }}
            transition={{
              y: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              rotate: { duration: 0.5, repeat: shakeActive ? 1 : 0 },
            }}
            className="relative h-40 w-56 rounded-sm border-2 border-trench-600 bg-trench-700 shadow-2xl sm:h-48 sm:w-64"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, transparent 3px, transparent 26px, rgba(0,0,0,0.15) 29px)",
            }}
          >
            <span className="absolute inset-x-0 top-3 text-center font-mono text-[10px] uppercase tracking-wide2 text-lime/60">
              CUMGEON ARCHIVE
            </span>

            {/* tail poking out of the seam */}
            {(phase === "tail" || phase === "opening" || phase === "items" || phase === "character") && (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -20, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2"
              >
                <CharacterActor variant="trenches" state="tailWiggle" size={70} />
              </motion.div>
            )}

            {/* lid */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: phase === "opening" || phase === "items" || phase === "character" ? -110 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              className="absolute -top-3 left-0 right-0 h-6 rounded-sm border-2 border-trench-600 bg-trench-600"
            />
          </motion.div>

          {/* items flying out */}
          {(phase === "items" || phase === "character") &&
            Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const dist = 160;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist * 0.6,
                    opacity: 1,
                    rotate: (i % 2 === 0 ? 1 : -1) * (20 + i * 6),
                    scale: 1,
                  }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-14 w-11 rounded-sm border border-lime/40 bg-trench-800 shadow-lg"
                />
              );
            })}

          {/* CUMGEON jumps out last */}
          {phase === "character" && (
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.6 }}
              animate={{ y: -70, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1.4, 0.4, 1] }}
              className="absolute"
            >
              <CharacterActor variant="trenches" state="triumphant" size={160} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
