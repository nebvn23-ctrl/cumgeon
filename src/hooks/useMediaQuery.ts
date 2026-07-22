"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/** True on touch / coarse-pointer devices where hover & custom cursors don't apply. */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
