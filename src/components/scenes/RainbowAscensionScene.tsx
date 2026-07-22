"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";

export default function RainbowAscensionScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const characterY = useTransform(scrollYProgress, [0, 1], [80, -160]);
  const graphOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0, 0.8, 0]);
  const rainbowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 0.6, 0.15, 0.05]);

  return (
    <div ref={ref} className="relative h-full w-full bg-sky-200">
      <Image
        src={cumgeonConfig.media.scenes.rainbowBridge}
        alt="A wooden staircase ascending toward a rainbow over green fields."
        fill
        sizes="100vw"
        className="object-cover"
      />
      <motion.div style={{ opacity: rainbowOpacity }} className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-trench-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-trench-950 via-trench-950/10 to-trench-950/40" />

      {/* glitching timeline graph overlay */}
      <motion.svg
        style={{ opacity: graphOpacity }}
        viewBox="0 0 400 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <polyline
          points="0,160 40,140 80,150 120,100 160,120 200,60 240,90 280,40 320,55 360,15 400,30"
          fill="none"
          stroke="#caff00"
          strokeWidth="2"
        />
        <text x="10" y="20" fill="#caff00" fontSize="10" fontFamily="monospace">
          TIMELINE.EXE — UNGOVERNABLE
        </text>
      </motion.svg>

      <motion.div style={{ y: characterY }} className="absolute inset-x-0 bottom-24 flex justify-center">
        <CharacterActor variant="rainbowBridge" state="jumping" size={190} showEye />
      </motion.div>
    </div>
  );
}
