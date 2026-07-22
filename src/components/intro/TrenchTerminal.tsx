"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteState } from "@/components/providers/SiteStateProvider";
import CharacterActor from "@/components/character/CharacterActor";
import { playTerminalBlip, playHeartbeatPulse } from "@/lib/audio";

type Phase = "lines" | "warning" | "eye" | "impact" | "crack" | "done";

export default function TrenchTerminal() {
  const reducedMotion = useReducedMotion();
  const { soundEnabled, toggleSound, setIntroDone } = useSiteState();
  const [phase, setPhase] = useState<Phase>("lines");
  const [lineIndex, setLineIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    setDismissed(true);
    setIntroDone(true);
  };

  useEffect(() => {
    if (!cumgeonConfig.featureFlags.enableIntro) {
      finish();
      return;
    }
    if (reducedMotion) return; // static fallback rendered below instead

    const lines = cumgeonConfig.intro.lines;
    let t = 0;
    lines.forEach((_, i) => {
      t += 260;
      timeouts.current.push(
        setTimeout(() => {
          setLineIndex(i + 1);
          if (soundEnabled) playTerminalBlip(560 + i * 14);
        }, t)
      );
    });

    t += 350;
    timeouts.current.push(
      setTimeout(() => {
        setPhase("warning");
        if (soundEnabled) playHeartbeatPulse();
      }, t)
    );

    t += 900;
    timeouts.current.push(setTimeout(() => setPhase("eye"), t));

    t += 800;
    timeouts.current.push(
      setTimeout(() => {
        setPhase("impact");
        if (soundEnabled) playHeartbeatPulse();
      }, t)
    );

    t += 750;
    timeouts.current.push(setTimeout(() => setPhase("crack"), t));

    t += 700;
    timeouts.current.push(setTimeout(() => finish(), t));

    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (dismissed) return null;

  // -------------------------------------------------------------------
  // Static, non-animated fallback for prefers-reduced-motion visitors.
  // -------------------------------------------------------------------
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-black px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wide2 text-lime">
          {cumgeonConfig.intro.lines[cumgeonConfig.intro.lines.length - 1]}
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-tightest2 text-dirty">
          {cumgeonConfig.identity.name}
        </h1>
        <p className="mt-2 max-w-sm font-mono text-xs text-dirty/60">
          Motion has been reduced for this session. Enter the site to continue.
        </p>
        <button
          onClick={finish}
          className="mt-8 rounded-sm border border-lime px-6 py-2 font-mono text-xs uppercase tracking-wide2 text-lime"
        >
          Enter the Trenches
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[95] overflow-hidden bg-black"
      >
        <span className="sr-only">Cinematic introduction playing. Press Skip Intro to continue.</span>

        {/* controls */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={toggleSound}
            className="rounded border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-dirty/80"
          >
            {soundEnabled ? cumgeonConfig.intro.soundOffLabel : cumgeonConfig.intro.soundOnLabel}
          </button>
          <button
            onClick={finish}
            className="rounded border border-lime/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-lime"
          >
            {cumgeonConfig.intro.skipLabel}
          </button>
        </div>

        {/* terminal lines */}
        {(phase === "lines" || phase === "warning") && (
          <div className="flex h-full w-full flex-col items-start justify-center px-8 font-mono text-sm text-lime/90 sm:px-24 sm:text-base" aria-hidden="true">
            {cumgeonConfig.intro.lines.slice(0, lineIndex).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i === lineIndex - 1 ? 1 : 0.35, x: 0 }}
                className="py-0.5"
              >
                {`> ${line}`}
              </motion.p>
            ))}
          </div>
        )}

        {/* warning flash */}
        <AnimatePresence>
          {phase === "warning" && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-center"
            >
              <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.4, repeat: 3 }}
                className="font-mono text-lg uppercase tracking-wide2 text-rust sm:text-2xl"
              >
                {cumgeonConfig.intro.warning[0]}
              </motion.p>
              <p className="mt-2 font-display text-3xl uppercase tracking-tightest2 text-dirty sm:text-5xl">
                {cumgeonConfig.intro.warning[1]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* eye glimpse through interference */}
        <AnimatePresence>
          {phase === "eye" && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <motion.div
                animate={{ filter: ["contrast(1) brightness(0.6)", "contrast(2.2) brightness(1.1)", "contrast(1) brightness(0.7)"] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="relative h-56 w-56 overflow-hidden rounded-full border border-lime/30"
                style={{
                  backgroundImage: `url(${cumgeonConfig.media.cutouts.trenches})`,
                  backgroundSize: "280%",
                  backgroundPosition: "38% 30%",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,transparent_2px,transparent_4px)] mix-blend-multiply" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* impact: CUMGEON rushes toward viewer */}
        <AnimatePresence>
          {phase === "impact" && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <motion.div
                initial={{ scale: 0.2, filter: "blur(6px)" }}
                animate={{ scale: 2.6, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <CharacterActor variant="trenches" state="jumping" size={260} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* crack into green fragments -> reveals hero underneath */}
        <AnimatePresence>
          {phase === "crack" && (
            <motion.div aria-hidden="true" className="absolute inset-0 grid grid-cols-6 grid-rows-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: 0,
                    scale: 0.4,
                    x: (Math.random() - 0.5) * 260,
                    y: (Math.random() - 0.5) * 260,
                    rotate: (Math.random() - 0.5) * 90,
                  }}
                  transition={{ duration: 0.65, delay: i * 0.012, ease: "easeIn" }}
                  className="border border-lime/30 bg-trench-950"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
