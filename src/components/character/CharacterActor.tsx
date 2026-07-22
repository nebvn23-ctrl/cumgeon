"use client";

import Image from "next/image";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cumgeonConfig } from "@/config/cumgeon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CharacterEye } from "./CharacterEye";
import { cn } from "@/lib/utils";

export type CharacterVariant = keyof typeof cumgeonConfig.media.cutouts;

export type CharacterState =
  | "hidden"
  | "peeking"
  | "floating"
  | "jumping"
  | "landing"
  | "watching"
  | "tailWiggle"
  | "pushing"
  | "pulling"
  | "orbiting"
  | "frightened"
  | "triumphant"
  | "giant"
  | "exiting";

const STATE_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 40 },
  peeking: { opacity: 1, x: 0, rotate: -3, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  floating: {
    opacity: 1,
    scale: 1,
    y: [0, -16, 0],
    rotate: [-1.5, 1.5, -1.5],
    transition: { y: { repeat: Infinity, duration: 6, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 7, ease: "easeInOut" }, opacity: { duration: 0.6 }, scale: { duration: 0.6 } },
  },
  jumping: {
    opacity: 1,
    y: [80, -30, 0],
    scale: [0.85, 1.08, 1],
    transition: { duration: 0.85, ease: [0.16, 1.4, 0.4, 1] },
  },
  landing: {
    opacity: 1,
    y: 0,
    scaleY: [1, 0.85, 1.04, 1],
    scaleX: [1, 1.08, 0.97, 1],
    transition: { duration: 0.6, ease: "easeOut" },
  },
  watching: {
    opacity: 1,
    y: [0, -8, 0],
    transition: { y: { repeat: Infinity, duration: 5, ease: "easeInOut" } },
  },
  tailWiggle: {
    opacity: 1,
    rotate: [-4, 4, -4],
    transition: { rotate: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } },
  },
  pushing: {
    opacity: 1,
    x: [40, -6, 0],
    rotate: [8, -2, 0],
    transition: { duration: 0.7, ease: "easeOut" },
  },
  pulling: {
    opacity: 1,
    x: [0, -18, 0],
    transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
  },
  orbiting: {
    opacity: 1,
    transition: { duration: 1 },
  },
  frightened: {
    opacity: 1,
    y: [0, -22, -10],
    rotate: [0, -8, 6, 0],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  triumphant: {
    opacity: 1,
    scale: [1, 1.12, 1],
    y: [0, -10, 0],
    transition: { duration: 0.9, ease: "easeOut" },
  },
  giant: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
  exiting: {
    opacity: [1, 1, 0],
    x: [0, 60, 160],
    scale: [1, 0.9, 0.6],
    transition: { duration: 2.2, ease: "easeIn" },
  },
};

export interface CharacterActorProps {
  variant: CharacterVariant;
  state?: CharacterState;
  size?: number;
  flip?: boolean;
  className?: string;
  priority?: boolean;
  showEye?: boolean;
  eyePosition?: { x: number; y: number };
  followPointerTilt?: boolean;
  sizes?: string;
}

const DEFAULT_EYE = { x: 40, y: 32 };

export default function CharacterActor({
  variant,
  state = "floating",
  size = 320,
  flip = false,
  className,
  priority = false,
  showEye = false,
  eyePosition = DEFAULT_EYE,
  followPointerTilt = false,
  sizes,
}: CharacterActorProps) {
  const reducedMotion = useReducedMotion();
  const controls = useAnimation();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const src = cumgeonConfig.media.cutouts[variant];

  useEffect(() => {
    if (reducedMotion) {
      controls.set({ opacity: state === "hidden" ? 0 : 1, y: 0, x: 0, rotate: 0, scale: 1 });
      return;
    }
    controls.start(state);
  }, [state, controls, reducedMotion]);

  useEffect(() => {
    if (!followPointerTilt || reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      setTilt({ rx: dy * -4, ry: dx * 6 });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [followPointerTilt, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.div
        variants={STATE_VARIANTS}
        initial="hidden"
        animate={controls}
        style={{
          width: "100%",
          height: "100%",
          transform: followPointerTilt ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` : undefined,
          transformStyle: "preserve-3d",
          scaleX: flip ? -1 : 1,
        }}
        className="relative drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes ?? `${size}px`}
          priority={priority}
          className="object-contain"
        />
        {showEye && <CharacterEye xPercent={eyePosition.x} yPercent={eyePosition.y} />}
      </motion.div>
    </div>
  );
}
