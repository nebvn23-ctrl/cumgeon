// ============================================================================
// Shared smooth-scroll helper.
// ----------------------------------------------------------------------------
// Lenis intercepts wheel/touch input to smooth native scrolling, but it does
// NOT automatically know about programmatic jumps (element.scrollIntoView,
// location.hash anchor clicks, etc.) — those can fight with Lenis's own RAF
// loop and land in the wrong place. Every in-app "jump to section" action
// should go through this helper instead of calling scrollIntoView directly.
// ============================================================================

declare global {
  interface Window {
    __cumgeonLenis?: { scrollTo: (target: string | HTMLElement, opts?: Record<string, unknown>) => void };
  }
}

export function scrollToId(id: string, options?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  if (window.__cumgeonLenis) {
    window.__cumgeonLenis.scrollTo(target, { offset: -72, ...options });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
