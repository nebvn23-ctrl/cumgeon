"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import ParticleField from "@/components/effects/ParticleField";

export default function TrenchScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.4]);
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={ref} className="relative h-full w-full bg-trench-950">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={cumgeonConfig.media.scenes.trenches}
          alt="A muddy World War style trench lined with sandbags, barbed wire and ammo crates."
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-trench-950 via-trench-950/60 to-trench-950/30" />
      <ParticleField density={22} />

      {/* 900x stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.16, 0.05, 0.16, 0] }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 3, times: [0, 0.25, 0.5, 0.7, 1] }}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="font-display text-[30vw] leading-none text-lime sm:text-[22vw]">
          {cumgeonConfig.lore[0].stamp}
        </span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10 sm:justify-end sm:pr-16">
        <CharacterActor variant="trenches" state="floating" size={200} showEye followPointerTilt />
      </div>
    </div>
  );
}
