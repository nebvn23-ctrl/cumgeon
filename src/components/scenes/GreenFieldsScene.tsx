"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function GreenFieldsScene({
  manifesto = false,
  background = "greenFields",
}: {
  manifesto?: boolean;
  background?: "greenFields" | "matrix";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const characterAnchorRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const grassY = useTransform(scrollYProgress, [0, 1], [10, -30]);
  const isMatrix = background === "matrix";
  const characterVariant = isMatrix ? "matrix" : "greenFields";

  const [auraOn, setAuraOn] = useState(false);
  const [distortOn, setDistortOn] = useState(false);
  const [slamIndex, setSlamIndex] = useState(0);

  useEffect(() => {
    if (manifesto || reducedMotion) return;
    const handleMove = (e: PointerEvent) => {
      const el = characterAnchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      setAuraOn(dist < 260);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [manifesto, reducedMotion]);

  const manifestoLines = cumgeonConfig.finalManifesto.lines;

  return (
    <div ref={ref} className={`relative h-full w-full ${isMatrix ? "bg-trench-950" : "bg-trench-800"}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={isMatrix ? cumgeonConfig.media.scenes.matrix : cumgeonConfig.media.scenes.greenFields}
          alt={
            isMatrix
              ? "A dark green data corridor made of streaming code."
              : "Sunlit rolling green grasslands under a bright blue sky."
          }
          fill
          sizes="100vw"
          className={`object-cover ${isMatrix ? "opacity-60" : "opacity-70"}`}
        />
      </motion.div>
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isMatrix ? "from-trench-950 via-trench-950/60 to-trench-950/30" : "from-trench-950 via-trench-900/50 to-trench-900/20"
        }`}
      />

      {/* grass foreground silhouette — only makes sense over the green fields photo */}
      {!isMatrix && (
        <motion.svg
          style={{ y: grassY }}
          aria-hidden="true"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-28 w-full text-trench-950/90 sm:h-36"
        >
          <path
            fill="currentColor"
            d="M0,60 L20,90 L40,50 L60,100 L80,40 L100,95 L120,55 L140,110 L160,45 L180,90 L200,60 L220,100 L240,50 L260,95 L280,40 L300,90 L320,55 L340,110 L360,45 L380,95 L400,60 L420,100 L440,50 L460,95 L480,40 L500,90 L520,55 L540,110 L560,45 L580,95 L600,60 L620,100 L640,50 L660,95 L680,40 L700,90 L720,55 L740,110 L760,45 L780,95 L800,60 L820,100 L840,50 L860,95 L880,40 L900,90 L920,55 L940,110 L960,45 L980,95 L1000,60 L1020,100 L1040,50 L1060,95 L1080,40 L1100,90 L1120,55 L1140,110 L1160,45 L1180,95 L1200,60 L1200,120 L0,120 Z"
          />
        </motion.svg>
      )}

      {!manifesto && (
        <div
          ref={characterAnchorRef}
          className="absolute inset-x-0 bottom-16 flex justify-center sm:justify-start sm:pl-20"
        >
          <div className="relative">
            {/* bull-horn aura, only visible near pointer */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 200 120"
              animate={{ opacity: auraOn ? 0.8 : 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute -top-14 left-1/2 h-28 w-52 -translate-x-1/2"
              style={{ filter: "drop-shadow(0 0 10px rgba(202,255,0,0.8))" }}
            >
              <path
                d="M40 100 C10 70, 15 20, 55 10 C50 40, 55 65, 75 85"
                fill="none"
                stroke="#caff00"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M160 100 C190 70, 185 20, 145 10 C150 40, 145 65, 125 85"
                fill="none"
                stroke="#caff00"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </motion.svg>
            <CharacterActor variant={characterVariant} state="watching" size={200} showEye followPointerTilt />
          </div>
        </div>
      )}

      {manifesto && (
        <motion.div
          onViewportEnter={() => {
            manifestoLines.forEach((_, i) => {
              setTimeout(() => {
                setSlamIndex(i + 1);
                if (i === manifestoLines.length - 1) {
                  setDistortOn(true);
                  setTimeout(() => setDistortOn(false), 700);
                }
              }, i * 550);
            });
          }}
          viewport={{ once: true, amount: 0.5 }}
          animate={
            distortOn
              ? { filter: ["hue-rotate(0deg)", "hue-rotate(25deg)", "hue-rotate(0deg)"], skewX: [0, -2, 0] }
              : { filter: "hue-rotate(0deg)", skewX: 0 }
          }
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
        >
          {manifestoLines.map((line, i) => (
            <motion.div
              key={line}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -120 : 120, rotate: i % 2 === 0 ? -6 : 6 }}
              animate={
                slamIndex > i
                  ? { opacity: 1, x: 0, rotate: 0 }
                  : { opacity: 0, x: i % 2 === 0 ? -120 : 120, rotate: i % 2 === 0 ? -6 : 6 }
              }
              transition={{ duration: 0.45, ease: [0.16, 1.6, 0.4, 1] }}
            >
              {i % 2 === 0 && slamIndex === i + 1 && (
                <CharacterActor variant={characterVariant} state="pushing" size={70} className="hidden sm:block" />
              )}
              <span className="font-display text-4xl uppercase tracking-tightest2 text-dirty drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-6xl">
                {line}
              </span>
              {i % 2 !== 0 && slamIndex === i + 1 && (
                <CharacterActor variant={characterVariant} state="pushing" flip size={70} className="hidden sm:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
