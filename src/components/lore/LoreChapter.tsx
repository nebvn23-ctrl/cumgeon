"use client";

import { motion } from "framer-motion";
import type { LoreChapter as LoreChapterData } from "@/config/cumgeon";

/**
 * Shared chrome for every lore chapter: index badge, title, paragraphs and
 * the small terminal HUD readout. The actual background / character
 * choreography for each chapter lives in src/components/scenes/*, passed
 * in as `visual`.
 */
export default function LoreChapter({
  chapter,
  visual,
  align = "left",
  hideChrome = false,
}: {
  chapter: LoreChapterData;
  visual: React.ReactNode;
  align?: "left" | "right";
  /**
   * When true, skips rendering the standard title/paragraph block. Used for
   * chapters whose scene already delivers the copy as a dramatic visual
   * (e.g. the Chapter 03 manifesto slam), so the two don't render on top of
   * each other. The title is kept for screen readers via a visually-hidden
   * heading.
   */
  hideChrome?: boolean;
}) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="relative flex min-h-screen w-full items-center overflow-hidden py-28"
    >
      <div className="absolute inset-0">{visual}</div>

      {/* terminal HUD chip */}
      {chapter.terminalLines && (
        <div className="absolute left-4 top-6 z-20 space-y-0.5 font-mono text-[10px] uppercase tracking-wide2 text-lime/60 sm:left-8">
          {chapter.terminalLines.map((line) => (
            <p key={line}>{`// ${line}`}</p>
          ))}
        </div>
      )}

      {hideChrome ? (
        <h2 id={`${chapter.id}-title`} className="sr-only">
          {chapter.title}
        </h2>
      ) : (
        <div
          className={`relative z-20 mx-auto flex w-full max-w-6xl px-6 sm:px-10 ${
            align === "right" ? "justify-end text-right" : "justify-start text-left"
          }`}
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wide2 text-lime/70"
            >
              <span className="h-px w-8 bg-lime/50" />
              CHAPTER {chapter.index}
            </motion.div>

            <motion.h2
              id={`${chapter.id}-title`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl uppercase leading-[0.95] tracking-tightest2 text-dirty sm:text-6xl"
            >
              {chapter.title}
            </motion.h2>

            <div className="mt-6 space-y-4">
              {chapter.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="whitespace-pre-line font-body text-base text-dirty/80 sm:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
