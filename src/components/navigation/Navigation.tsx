"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import { useSiteState } from "@/components/providers/SiteStateProvider";
import { isConfiguredLink } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const { soundEnabled, toggleSound, infected } = useSiteState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const buyConfigured = isConfiguredLink(cumgeonConfig.links.buy);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        >
          <a
            href="#top"
            data-cursor="ENTER"
            className="flex items-center gap-2 font-display text-lg tracking-tightest2 text-dirty"
          >
            <span
              className={`h-2 w-2 rounded-full ${infected ? "bg-lime animate-pulse" : "bg-white/40"}`}
              aria-hidden="true"
            />
            CUMGEON
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {cumgeonConfig.navigation.main.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-cursor="ENTER"
                  className="font-mono text-[11px] uppercase tracking-wide2 text-dirty/70 transition-colors hover:text-lime"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-wide2 text-lime/70 lg:inline">
              {infected ? cumgeonConfig.identity.controlStatusInfected : cumgeonConfig.identity.controlStatusDefault}
            </span>

            <button
              type="button"
              onClick={toggleSound}
              data-cursor="ENTER"
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
              className="rounded border border-white/15 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-dirty/70 transition-colors hover:border-lime hover:text-lime"
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>

            <a
              href={buyConfigured ? cumgeonConfig.links.buy : "#"}
              target={buyConfigured ? "_blank" : undefined}
              rel={buyConfigured ? "noopener noreferrer" : undefined}
              data-cursor="BUY"
              onClick={(e) => {
                if (!buyConfigured) e.preventDefault();
              }}
              className="hidden rounded-sm border border-lime bg-lime px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide2 text-black transition-transform hover:scale-105 sm:inline-block"
              title={buyConfigured ? undefined : "Link coming soon"}
            >
              {cumgeonConfig.navigation.buyLabel}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              data-cursor="ENTER"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex flex-col gap-1.5 p-2 md:hidden"
            >
              <motion.span className="h-[2px] w-6 bg-dirty" />
              <motion.span className="h-[2px] w-6 bg-dirty" />
              <motion.span className="h-[2px] w-4 bg-lime" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
