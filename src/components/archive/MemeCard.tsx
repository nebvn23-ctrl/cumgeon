"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MemeArchiveEntry } from "@/config/cumgeon";

/** Deterministic per-card "scattered" rotation so re-renders stay stable and SSR matches CSR. */
function restRotation(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 997;
  return ((hash % 9) - 4) * 1.1; // roughly -4.4deg .. 4.4deg
}

export default function MemeCard({
  entry,
  onOpen,
  tailHeld = false,
}: {
  entry: MemeArchiveEntry;
  onOpen: () => void;
  tailHeld?: boolean;
}) {
  const rotation = restRotation(entry.id);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="INSPECT"
      layout
      initial={{ opacity: 0, scale: 0.7, rotate: rotation * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      exit={{ opacity: 0, scale: 0.5, y: 40 }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10 bg-trench-900 text-left shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime"
    >
      <Image
        src={entry.image}
        alt={entry.alt}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      <span className="absolute left-2 top-2 rounded-sm border border-lime/40 bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide2 text-lime">
        {entry.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-display text-sm uppercase leading-tight tracking-tightest2 text-dirty sm:text-base">
          {entry.title}
        </p>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide2 text-dirty/50">
          {entry.classification}
        </p>
      </div>

      <span className="absolute inset-0 flex items-center justify-center bg-lime/0 font-mono text-xs uppercase tracking-wide2 text-lime opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
        INSPECT
      </span>

      {tailHeld && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rotate-[30deg] rounded-full border-b-4 border-r-4 border-lime/50"
        />
      )}
    </motion.button>
  );
}
