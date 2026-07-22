"use client";

import { useEffect, useRef, useState } from "react";
import { cumgeonConfig } from "@/config/cumgeon";
import { useIsCoarsePointer } from "@/hooks/useMediaQuery";

/**
 * Custom contextual cursor. Any element in the tree can opt in with
 * `data-cursor="ENTER" | "BUY" | "INSPECT" | ...` to change the label.
 *
 * Safety valve: the real system cursor is only hidden (`cursor: none` on
 * <html>) once this component has actually mounted and attached its
 * listeners. If anything throws during setup, the native cursor is left
 * alone — visitors are never left without any cursor at all.
 */
export default function ContaminationCursor() {
  const isCoarse = useIsCoarsePointer();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    if (!cumgeonConfig.featureFlags.enableCustomCursor || isCoarse) return;

    try {
      const handleMove = (e: PointerEvent) => {
        target.current = { x: e.clientX, y: e.clientY };
        setVisible(true);
        const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
        setLabel(el ? el.getAttribute("data-cursor") : null);
      };
      const handleLeave = () => setVisible(false);

      window.addEventListener("pointermove", handleMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handleLeave);
      document.documentElement.classList.add("cumgeon-cursor-active");
      setReady(true);

      const animate = () => {
        pos.current.x += (target.current.x - pos.current.x) * 0.22;
        pos.current.y += (target.current.y - pos.current.y) * 0.22;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }
        raf.current = requestAnimationFrame(animate);
      };
      raf.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener("pointermove", handleMove);
        document.documentElement.removeEventListener("pointerleave", handleLeave);
        document.documentElement.classList.remove("cumgeon-cursor-active");
        if (raf.current) cancelAnimationFrame(raf.current);
      };
    } catch {
      // Custom cursor failed to initialize — native cursor remains untouched.
      setReady(false);
    }
  }, [isCoarse]);

  if (!ready || isCoarse) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center transition-opacity duration-150"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-lime/70 bg-black/40 backdrop-blur-sm transition-all duration-150"
        style={{
          width: label ? "auto" : 10,
          height: label ? 30 : 10,
          padding: label ? "0 14px" : 0,
        }}
      >
        {label && (
          <span className="whitespace-nowrap font-mono text-[10px] tracking-wide2 text-lime">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
