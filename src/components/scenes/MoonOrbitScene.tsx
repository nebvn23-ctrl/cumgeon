"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";

function useOrbitPoint(progress: MotionValue<number>, radiusX: number, radiusY: number, phase: number) {
  const x = useTransform(progress, (p) => Math.cos(p * Math.PI * 1.4 + phase) * radiusX);
  const y = useTransform(progress, (p) => Math.sin(p * Math.PI * 1.4 + phase) * radiusY);
  return { x, y };
}

export default function MoonOrbitScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starsY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const main = useOrbitPoint(scrollYProgress, 140, 60, 0);
  const trail1 = useOrbitPoint(scrollYProgress, 140, 60, -0.18);
  const trail2 = useOrbitPoint(scrollYProgress, 140, 60, -0.32);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-black">
      <Image
        src={cumgeonConfig.media.scenes.moon}
        alt="The moon against a deep field of stars."
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          y: starsY,
          backgroundImage: "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent), radial-gradient(1px 1px at 90% 20%, white, transparent)",
          backgroundSize: "220px 220px",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          y: starsY2,
          backgroundImage: "radial-gradient(1.5px 1.5px at 35% 45%, white, transparent), radial-gradient(1.5px 1.5px at 85% 75%, white, transparent), radial-gradient(1.5px 1.5px at 15% 65%, white, transparent)",
          backgroundSize: "300px 300px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-1 w-1">
          <motion.div style={{ x: trail2.x, y: trail2.y }} className="absolute opacity-20">
            <CharacterActor variant="moon" state="orbiting" size={90} />
          </motion.div>
          <motion.div style={{ x: trail1.x, y: trail1.y }} className="absolute opacity-40">
            <CharacterActor variant="moon" state="orbiting" size={110} />
          </motion.div>
          <motion.div style={{ x: main.x, y: main.y }} className="absolute">
            <CharacterActor variant="moon" state="orbiting" size={150} showEye />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
