"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";

export default function ExplosionScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const explosionOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.15, 0.9, 0.75]);
  const explosionScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.35]);
  const turn = useTransform(scrollYProgress, [0, 0.4], [65, 0]);
  const shake = useTransform(scrollYProgress, [0.3, 0.36, 0.42, 0.7], [0, -6, 6, 0]);

  return (
    <div ref={ref} className="relative h-full w-full bg-black" style={{ perspective: 800 }}>
      <motion.div style={{ opacity: explosionOpacity, scale: explosionScale }} className="absolute inset-0">
        <Image
          src={cumgeonConfig.media.scenes.explosion}
          alt="A massive fireball and smoke cloud erupting over a desert."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

      <motion.div style={{ x: shake }} className="absolute inset-x-0 bottom-20 flex justify-center sm:justify-start sm:pl-24">
        <motion.div style={{ rotateY: turn, transformStyle: "preserve-3d" }}>
          <CharacterActor variant="explosion" state="watching" size={210} showEye followPointerTilt />
        </motion.div>
      </motion.div>
    </div>
  );
}
