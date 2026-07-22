"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import MatrixRain from "./MatrixRain";
import { useSiteState } from "@/components/providers/SiteStateProvider";

/** Deterministic pseudo-random in [0,1) so SSR and client render identically. */
function pseudo(i: number, salt = 0) {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

const archiveThumbs = Object.values(cumgeonConfig.media.scenes);

export default function MatrixInfectionScene({
  mode = "infect",
}: {
  mode?: "infect" | "effect";
}) {
  const { setInfected } = useSiteState();
  const [swept, setSwept] = useState(false);
  const [cards, setCards] = useState(0);

  return (
    <div
      data-cursor={mode === "infect" ? "INFECT" : "DECRYPT"}
      className="relative h-full w-full bg-trench-950"
    >
      <MatrixRain intensity={mode === "infect" ? 1 : 0.6} />
      <div className="absolute inset-0 bg-gradient-to-t from-trench-950 via-trench-950/40 to-trench-950/60" />

      {mode === "infect" && (
        <motion.div
          onViewportEnter={() => {
            setSwept(true);
            setInfected(true);
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ x: "-110%" }}
            animate={swept ? { x: "110%" } : { x: "-110%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            aria-hidden="true"
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-lime/25 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-0 right-0 overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-wide2 text-lime/50"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="inline-block"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-6">
                  META CONTAMINATED // WEAPONIZED STUPIDITY // 01001100 // CUMGEON PROPAGATING //
                </span>
              ))}
            </motion.div>
          </div>
          <div className="absolute inset-x-0 bottom-24 flex justify-center sm:justify-end sm:pr-24">
            <CharacterActor variant="matrix" state="floating" size={190} showEye followPointerTilt />
          </div>
        </motion.div>
      )}

      {mode === "effect" && (
        <motion.div
          onViewportEnter={() => {
            [1, 10, 26].forEach((count, i) => {
              setTimeout(() => setCards(count), i * 500);
            });
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="absolute inset-0"
        >
          {Array.from({ length: 26 }).map((_, i) => {
            const active = i < cards;
            const dx = (pseudo(i, 1) - 0.5) * 70;
            const dy = (pseudo(i, 2) - 0.5) * 60;
            const rot = (pseudo(i, 3) - 0.5) * 40;
            const explode = cards === 26;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={
                  active
                    ? {
                        opacity: explode ? 0 : 1,
                        scale: explode ? 1.6 : 1,
                        left: `calc(50% + ${dx * (explode ? 3 : 1)}%)`,
                        top: `calc(50% + ${dy * (explode ? 3 : 1)}%)`,
                        rotate: rot,
                      }
                    : { opacity: 0, scale: 0.4, left: "50%", top: "50%" }
                }
                transition={{ duration: explode ? 0.9 : 0.5, ease: "easeOut" }}
                className="absolute h-16 w-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-lime/40 bg-cover bg-center shadow-lg sm:h-20 sm:w-16"
                style={{ backgroundImage: `url(${archiveThumbs[i % archiveThumbs.length]})` }}
                aria-hidden="true"
              />
            );
          })}
          <div className="absolute inset-x-0 bottom-16 flex justify-center">
            <CharacterActor variant="matrix" state="triumphant" size={170} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
