"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IDLE_MS = 45000;

/**
 * Two small ambient behaviors that don't belong to any single section:
 *  - after a long period of inactivity, CUMGEON peeks in from the edge
 *    with "STILL WATCHING?"
 *  - if the visitor scrolls deep into the site and then returns to the
 *    top, a brief "YOU CAME BACK" greeting appears.
 */
export default function AmbientPresence() {
  const reducedMotion = useReducedMotion();
  const [idleVisible, setIdleVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const wentDeep = useRef(false);
  const hasReturnedOnce = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!cumgeonConfig.featureFlags.enableIdlePeek || reducedMotion) return;

    const resetIdle = () => {
      setIdleVisible(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdleVisible(true), IDLE_MS);
    };
    resetIdle();

    const events = ["mousemove", "keydown", "scroll", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    return () => {
      clearTimeout(idleTimer.current);
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const heroEl = document.getElementById("top");
    const memesEl = document.getElementById("memes");
    if (!heroEl || !memesEl) return;

    const deepObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) wentDeep.current = true;
      },
      { threshold: 0 }
    );
    deepObserver.observe(memesEl);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wentDeep.current && !hasReturnedOnce.current) {
          hasReturnedOnce.current = true;
          setReturnVisible(true);
          setTimeout(() => setReturnVisible(false), 2600);
        }
      },
      { threshold: 0.6 }
    );
    heroObserver.observe(heroEl);

    return () => {
      deepObserver.disconnect();
      heroObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div aria-hidden="true">
      <AnimatePresence>
        {idleVisible && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-4 z-40 flex items-center gap-2"
          >
            <span className="rounded-sm border border-lime/40 bg-black/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-lime">
              {cumgeonConfig.finalManifesto.idlePeek}
            </span>
            <CharacterActor variant="trenches" state="peeking" size={64} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {returnVisible && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed left-1/2 top-20 z-40 -translate-x-1/2 rounded-sm border border-lime/40 bg-black/85 px-4 py-2 font-mono text-[11px] uppercase tracking-wide2 text-lime"
          >
            {cumgeonConfig.finalManifesto.returnMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
