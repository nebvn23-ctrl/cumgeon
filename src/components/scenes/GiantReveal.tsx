"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cumgeonConfig } from "@/config/cumgeon";
import CharacterActor from "@/components/character/CharacterActor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const orbitThumbs = Object.values(cumgeonConfig.media.scenes);
const scaleLabels = ["MASS: UNQUANTIFIABLE", "THREAT LEVEL: MEMETIC", "SCALE: N/A", "ORIGIN: UNKNOWN"];

/**
 * The climax scene. Unlike the other lore chapters (which use Framer
 * Motion's scroll utilities), this signature sequence is driven by a real
 * GSAP timeline scrubbed to scroll position via ScrollTrigger — the
 * "advanced scroll sequence" tool called for in the brief.
 */
export default function GiantReveal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const characterWrapRef = useRef<HTMLDivElement | null>(null);
  const tailRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);
  const line3Ref = useRef<HTMLParagraphElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
        .fromTo(characterWrapRef.current, { scale: 0.45 }, { scale: 3, duration: 0.5, ease: "none" }, 0)
        .to(characterWrapRef.current, { scale: 5.2, duration: 0.5, ease: "none" }, 0.5)
        .fromTo(line1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.13 }, 0.05)
        .to(line1Ref.current, { opacity: 0, duration: 0.14 }, 0.18)
        .fromTo(line2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.38)
        .to(line2Ref.current, { opacity: 0, duration: 0.12 }, 0.5)
        .fromTo(line3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.7)
        .to(line3Ref.current, { opacity: 0, duration: 0.13 }, 0.82)
        .fromTo(tailRef.current, { xPercent: -120 }, { xPercent: 120, duration: 0.2, ease: "none" }, 0.55)
        .to(sectionRef.current, { x: -4, duration: 0.05, repeat: 5, yoyo: true }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="giant-reveal" ref={sectionRef} className="relative h-[220vh] w-full bg-black">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(202,255,0,0.10), transparent 55%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 70%)",
            }}
          />
        </div>

        {/* orbiting meme fragments — continuous CSS animation, independent of scroll */}
        {!reducedMotion && (
          <div className="absolute h-[70vmin] w-[70vmin] animate-[spin_26s_linear_infinite]" aria-hidden="true">
            {orbitThumbs.map((src, i) => {
              const angle = (i / orbitThumbs.length) * 360;
              return (
                <div
                  key={src}
                  className="absolute left-1/2 top-1/2 h-10 w-8 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-lime/30 opacity-70"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -32vmin) rotate(-${angle}deg)`,
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
          {scaleLabels.map((label, i) => (
            <span
              key={label}
              className="absolute font-mono text-[9px] uppercase tracking-wide2 text-lime/40"
              style={{ left: `${12 + i * 22}%`, top: i % 2 === 0 ? "20%" : "72%" }}
            >
              {label}
            </span>
          ))}
        </div>

        <div ref={characterWrapRef} className="relative" style={{ transform: reducedMotion ? "scale(2.5)" : undefined }}>
          <CharacterActor
            variant="moon"
            state="watching"
            size={220}
            showEye
            eyePosition={{ x: 42, y: 34 }}
            followPointerTilt
          />
        </div>

        {!reducedMotion && (
          <div
            ref={tailRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-trench-600/70 to-transparent"
            style={{ transform: "translateX(-120%)" }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center px-6 text-center">
          <p
            ref={line1Ref}
            className="absolute font-display text-2xl uppercase tracking-tightest2 text-dirty opacity-0 sm:text-4xl"
          >
            {cumgeonConfig.giantReveal.lines[0]}
          </p>
          <p
            ref={line2Ref}
            className="absolute font-display text-2xl uppercase tracking-tightest2 text-lime opacity-0 sm:text-4xl"
          >
            {cumgeonConfig.giantReveal.lines[1]}
          </p>
          <p
            ref={line3Ref}
            className="absolute whitespace-pre-line font-display text-xl uppercase leading-snug tracking-tightest2 text-dirty opacity-0 sm:text-3xl"
          >
            {cumgeonConfig.giantReveal.lines[2]}
          </p>
        </div>

        {reducedMotion && (
          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-2 px-6 text-center">
            {cumgeonConfig.giantReveal.lines.map((l) => (
              <p key={l} className="whitespace-pre-line font-display text-xl uppercase tracking-tightest2 text-dirty">
                {l}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
