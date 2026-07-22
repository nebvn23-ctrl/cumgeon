"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cumgeon:sound-enabled";

/**
 * Session-scoped sound preference (sessionStorage, not localStorage — the
 * brief only asks that a preference survive the session, not forever).
 * Sound always starts OFF on a fresh session; browsers block autoplaying
 * audio with sound anyway, so this also doubles as the "user interaction"
 * gate required before anything audible can play.
 */
export function useSoundPreference() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "true") setSoundEnabled(true);
    } catch {
      // sessionStorage unavailable (privacy mode, etc.) — default stays off
    }
    setHydrated(true);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  return { soundEnabled, toggleSound, hydrated };
}
