"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { useSoundPreference } from "@/hooks/useSoundPreference";
import { scrollToId } from "@/lib/scroll";

interface SiteState {
  soundEnabled: boolean;
  toggleSound: () => void;
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
  infected: boolean;
  setInfected: (v: boolean) => void;
  restartLore: () => void;
  restartKey: number;
}

const SiteStateContext = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  const { soundEnabled, toggleSound } = useSoundPreference();
  const [introDone, setIntroDone] = useState(false);
  const [infected, setInfected] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const restartLore = () => {
    setRestartKey((k) => k + 1);
    scrollToId("lore");
  };

  const value = useMemo(
    () => ({
      soundEnabled,
      toggleSound,
      introDone,
      setIntroDone,
      infected,
      setInfected,
      restartLore,
      restartKey,
    }),
    [soundEnabled, toggleSound, introDone, infected, restartKey]
  );

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState() {
  const ctx = useContext(SiteStateContext);
  if (!ctx) throw new Error("useSiteState must be used within SiteStateProvider");
  return ctx;
}
