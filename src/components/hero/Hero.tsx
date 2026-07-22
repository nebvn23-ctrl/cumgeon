"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import { useSiteState } from "@/components/providers/SiteStateProvider";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isConfiguredLink } from "@/lib/utils";
import CharacterActor from "@/components/character/CharacterActor";
import ParticleField from "@/components/effects/ParticleField";
import LiquidWordmark from "./LiquidWordmark";

export default function Hero() {
  const { introDone } = useSiteState();
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [linkNotice, setLinkNotice] = useState(false);
  const [caCopied, setCaCopied] = useState(false);
  const buyConfigured = isConfiguredLink(cumgeonConfig.links.buy);
  const xConfigured = isConfiguredLink(cumgeonConfig.links.x);
  const caConfigured =
    cumgeonConfig.featureFlags.showContractAddress && isConfiguredLink(cumgeonConfig.links.contractAddress);

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(cumgeonConfig.links.contractAddress);
      setCaCopied(true);
      setTimeout(() => setCaCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  useEffect(() => {
    if (introDone || reducedMotion) {
      const t = setTimeout(() => setEntered(true), reducedMotion ? 0 : 150);
      return () => clearTimeout(t);
    }
  }, [introDone, reducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-trench-950"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(55,71,42,0.5), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(202,255,0,0.06), transparent 70%)",
        }}
      />
      <ParticleField density={16} />

      {/* faint decorative background creatures at different depths */}
      <CharacterActor
        variant="moon"
        state="floating"
        size={90}
        className="absolute left-[8%] top-[22%] opacity-25 blur-[1px]"
      />
      <CharacterActor
        variant="matrix"
        state="floating"
        size={70}
        flip
        className="absolute right-[12%] top-[16%] opacity-20 blur-[1px]"
      />
      <CharacterActor
        variant="greenFields"
        state="floating"
        size={110}
        className="absolute bottom-[18%] left-[4%] opacity-20 blur-[1px]"
      />

      {/* vertical status indicator */}
      <div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-wide3 text-lime/70 sm:block">
        {cumgeonConfig.identity.trenchStatus}
      </div>

      {/* main composition */}
      <div className="relative z-10 mt-16 flex flex-col items-center px-4 text-center">
        <div className="relative">
          <LiquidWordmark text={cumgeonConfig.hero.headline} />

          <motion.div
            initial={{ opacity: 0, y: 120, scale: 0.6 }}
            animate={
              entered
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 120, scale: 0.6 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1.2, 0.3, 1], delay: 0.1 }}
            className="pointer-events-none absolute -bottom-6 left-1/2 z-20 -translate-x-1/2 sm:-bottom-10"
          >
            <CharacterActor
              variant="trenches"
              state={entered ? "floating" : "hidden"}
              size={220}
              showEye
              followPointerTilt
              priority
              className="drop-shadow-lime-lg sm:!h-[300px] sm:!w-[300px]"
            />
          </motion.div>

          {/* front clipped wordmark echo so some strokes read in front of the character */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: "polygon(0% 60%, 100% 60%, 100% 100%, 0% 100%)" }}
          >
            <h1
              className="font-display leading-[0.82] text-dirty/90"
              style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)", letterSpacing: "-0.045em" }}
            >
              {cumgeonConfig.hero.headline}
            </h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 font-mono text-sm uppercase tracking-wide2 text-lime sm:text-base"
        >
          {cumgeonConfig.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-3 flex flex-col gap-0.5 font-body text-base text-dirty/70 sm:text-lg"
        >
          {cumgeonConfig.hero.supportingLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 max-w-md font-body text-lg italic text-dirty/90 sm:text-xl"
        >
          &ldquo;{cumgeonConfig.quotes.hero}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="relative z-20 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="relative">
            <a
              href={buyConfigured ? cumgeonConfig.links.buy : "#"}
              target={buyConfigured ? "_blank" : undefined}
              rel={buyConfigured ? "noopener noreferrer" : undefined}
              data-cursor="BUY"
              onClick={(e) => {
                if (!buyConfigured) {
                  e.preventDefault();
                  setLinkNotice(true);
                  setTimeout(() => setLinkNotice(false), 1800);
                }
              }}
              className="inline-block rounded-sm border border-lime bg-lime px-7 py-3 font-mono text-sm font-bold uppercase tracking-wide2 text-black transition-transform hover:scale-105 active:scale-95"
            >
              {cumgeonConfig.hero.buttons.buy}
            </a>
            {linkNotice && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded border border-lime/40 bg-black/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide2 text-lime"
              >
                LINK COMING SOON
              </motion.span>
            )}
          </div>

          <a
            href="#lore"
            data-cursor="ENTER"
            className="rounded-sm border border-white/25 px-7 py-3 font-mono text-sm uppercase tracking-wide2 text-dirty transition-colors hover:border-lime hover:text-lime"
          >
            {cumgeonConfig.hero.buttons.lore}
          </a>

          <a
            href="#memes"
            data-cursor="INSPECT"
            className="rounded-sm border border-white/25 px-7 py-3 font-mono text-sm uppercase tracking-wide2 text-dirty transition-colors hover:border-lime hover:text-lime"
          >
            {cumgeonConfig.hero.buttons.archive}
          </a>

          <a
            href={xConfigured ? cumgeonConfig.links.x : "#"}
            target={xConfigured ? "_blank" : undefined}
            rel={xConfigured ? "noopener noreferrer" : undefined}
            data-cursor="ENTER"
            onClick={(e) => !xConfigured && e.preventDefault()}
            aria-label="Follow CUMGEON on X"
            className="flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3 font-mono text-sm uppercase tracking-wide2 text-dirty transition-colors hover:border-lime hover:text-lime"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.2 22H1l8.1-9.3L0.9 2H8.2l5 6.4L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z" />
            </svg>
            X
          </a>
        </motion.div>

        {caConfigured && (
          <motion.button
            type="button"
            onClick={copyCA}
            data-cursor="ENTER"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="group relative z-20 mt-8 w-full max-w-2xl rounded-md border border-lime/40 bg-black/50 px-6 py-4 backdrop-blur-sm transition-colors hover:border-lime"
            style={{ boxShadow: "0 0 0 rgba(202,255,0,0)" }}
          >
            <motion.div
              aria-hidden="true"
              animate={reducedMotion ? {} : { opacity: [0.25, 0.6, 0.25], scale: [1, 1.015, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 rounded-md"
              style={{ boxShadow: "0 0 30px 4px rgba(202,255,0,0.35)" }}
            />
            <p className="relative font-mono text-[10px] uppercase tracking-wide2 text-lime/70">
              Contract Address {caCopied ? "— Copied ✓" : "— Tap to copy"}
            </p>
            <p className="relative mt-1 break-all font-mono text-sm font-bold text-dirty sm:text-lg">
              {cumgeonConfig.links.contractAddress}
            </p>
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-dirty/50"
      >
        <span>{cumgeonConfig.hero.scrollHint}</span>
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
