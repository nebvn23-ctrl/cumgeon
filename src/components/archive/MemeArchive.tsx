"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import type { MemeArchiveEntry } from "@/config/cumgeon";
import { scrollToId } from "@/lib/scroll";
import MemeCard from "./MemeCard";
import ArchiveCrate from "./ArchiveCrate";
import ArchiveModal from "./ArchiveModal";

type CategoryFilter = "ALL" | (typeof cumgeonConfig.archiveCategories)[number];

export default function MemeArchive() {
  const [crateDone, setCrateDone] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [selected, setSelected] = useState<MemeArchiveEntry | null>(null);

  const filtered = useMemo(() => {
    if (filter === "ALL") return cumgeonConfig.memeArchive;
    return cumgeonConfig.memeArchive.filter((e) => e.category === filter);
  }, [filter]);

  return (
    <section id="memes" className="relative w-full bg-trench-900 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 text-center">
          <p className="font-mono text-xs uppercase tracking-wide2 text-lime/70">Classified</p>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-tightest2 text-dirty sm:text-5xl">
            THE CONTAMINATED MEME ARCHIVE
          </h2>
        </div>

        <motion.div
          onViewportEnter={() => {
            if (!crateDone) {
              /* crate plays via its own internal timers once mounted below */
            }
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-16 min-h-[240px]"
        >
          {!crateDone && <ArchiveCrate onComplete={() => setCrateDone(true)} />}

          <AnimatePresence>
            {crateDone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {/* category filters */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  {(["ALL", ...cumgeonConfig.archiveCategories] as CategoryFilter[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      data-cursor="ENTER"
                      className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide2 transition-colors ${
                        filter === cat
                          ? "border-lime bg-lime text-black"
                          : "border-white/15 text-dirty/60 hover:border-lime/60 hover:text-lime"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <motion.div
                  layout
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((entry) => (
                      <MemeCard
                        key={entry.id}
                        entry={entry}
                        tailHeld={entry.id === "trench-origin"}
                        onOpen={() => {
                          if (entry.id === "original-mutation") {
                            scrollToId("mutation");
                          } else {
                            setSelected(entry);
                          }
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ArchiveModal entry={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
