"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { MemeArchiveEntry } from "@/config/cumgeon";

export default function ArchiveModal({
  entry,
  onClose,
}: {
  entry: MemeArchiveEntry | null;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (entry) {
      lastFocused.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entry]);

  useEffect(() => {
    if (!entry) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [entry, onClose]);

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={entry.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded border border-lime/30 bg-trench-950"
          >
            <div className="relative aspect-square w-full sm:aspect-video">
              <Image src={entry.image} alt={entry.alt} fill sizes="90vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide2 text-lime/70">
                  {entry.classification}
                </p>
                <h3 className="font-display text-2xl uppercase tracking-tightest2 text-dirty">
                  {entry.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-wide2 text-dirty hover:border-lime hover:text-lime"
              >
                CLOSE [ESC]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
