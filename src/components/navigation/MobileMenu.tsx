"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import { isConfiguredLink } from "@/lib/utils";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const buyConfigured = isConfiguredLink(cumgeonConfig.links.buy);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a,button");
      firstLink?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col bg-trench-950/98 p-6 font-mono md:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-wide2 text-lime">CUMGEON // NAV</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded border border-white/20 px-3 py-1 text-xs uppercase tracking-wide2 text-dirty"
            >
              CLOSE [X]
            </button>
          </div>

          <ul className="mt-10 flex flex-1 flex-col justify-center gap-6">
            {cumgeonConfig.navigation.main.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="text-4xl font-display uppercase tracking-tightest2 text-dirty active:text-lime"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
            <motion.li initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <a
                href={buyConfigured ? cumgeonConfig.links.buy : "#"}
                target={buyConfigured ? "_blank" : undefined}
                rel={buyConfigured ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!buyConfigured) e.preventDefault();
                  else onClose();
                }}
                className="inline-block rounded-sm border border-lime bg-lime px-6 py-3 text-lg font-bold uppercase tracking-wide2 text-black"
              >
                {cumgeonConfig.hero.buttons.buy}
              </a>
            </motion.li>
          </ul>

          <div className="relative flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-wide2 text-dirty/50">
            <span>{cumgeonConfig.identity.trenchStatus}</span>
            <CharacterActor
              variant="trenches"
              state="tailWiggle"
              size={64}
              className="absolute -right-2 -top-16 opacity-90"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
