"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import { useSiteState } from "@/components/providers/SiteStateProvider";
import CharacterActor from "@/components/character/CharacterActor";
import { playGlitchDrop } from "@/lib/audio";

type Stage = "waiting" | "failed" | "restoring" | "restored";

export default function FakeSystemFailure() {
  const { setInfected, soundEnabled } = useSiteState();
  const [stage, setStage] = useState<Stage>("waiting");

  if (!cumgeonConfig.featureFlags.enableSystemFailureSequence) return null;

  const triggerFailure = () => {
    if (stage !== "waiting") return;
    setStage("failed");
    if (soundEnabled) playGlitchDrop();
  };

  const reboot = () => {
    setStage("restoring");
    setTimeout(() => {
      setStage("restored");
      setInfected(true);
    }, 900);
  };

  const skip = () => {
    setStage("restored");
    setInfected(true);
  };

  return (
    <motion.section
      onViewportEnter={triggerFailure}
      viewport={{ once: true, amount: 0.6 }}
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-trench-950 py-20"
    >
      <motion.div
        animate={{ filter: stage === "waiting" || stage === "failed" ? "grayscale(1) contrast(1.1)" : "grayscale(0)" }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(202,255,0,0.08),transparent_70%)]"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {(stage === "failed" || stage === "restoring") && (
          <motion.p
            animate={{ opacity: [1, 0.2, 1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-mono text-lg uppercase tracking-wide2 text-dirty/70 sm:text-2xl"
          >
            {cumgeonConfig.systemFailure.message}
          </motion.p>
        )}

        {stage === "failed" && (
          <>
            <motion.div initial={{ x: -140, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              <CharacterActor variant="matrix" state="pulling" size={140} />
            </motion.div>
            <button
              onClick={reboot}
              data-cursor="ENTER"
              className="rounded-sm border-2 border-lime bg-lime px-8 py-4 font-display text-xl uppercase tracking-tightest2 text-black transition-transform hover:scale-105 active:scale-95"
            >
              {cumgeonConfig.systemFailure.rebootLabel}
            </button>
            <button
              onClick={skip}
              className="font-mono text-[10px] uppercase tracking-wide2 text-dirty/40 underline-offset-2 hover:underline"
            >
              {cumgeonConfig.systemFailure.skipLabel}
            </button>
          </>
        )}

        {stage === "restoring" && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.35, repeat: 2 }}
          >
            <CharacterActor variant="matrix" state="jumping" size={150} />
          </motion.div>
        )}

        {stage === "restored" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <CharacterActor variant="matrix" state="triumphant" size={140} showEye />
            <p className="font-mono text-xs uppercase tracking-wide2 text-lime">
              {cumgeonConfig.identity.controlStatusInfected}
            </p>
          </motion.div>
        )}

        {stage === "waiting" && <div className="h-40" aria-hidden="true" />}
      </div>
    </motion.section>
  );
}
