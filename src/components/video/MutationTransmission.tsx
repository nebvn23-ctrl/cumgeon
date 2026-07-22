"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";

export default function MutationTransmission() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [duration, setDuration] = useState<number>(cumgeonConfig.video.durationSeconds);
  const [progress, setProgress] = useState(0); // 0..1
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [climax, setClimax] = useState(false);
  const climaxFired = useRef(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  // autoplay-in / pause-out on viewport visibility
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      if (video.duration && Number.isFinite(video.duration)) setDuration(video.duration);
    };
    const onTime = () => {
      const d = video.duration && Number.isFinite(video.duration) ? video.duration : duration;
      const p = d > 0 ? video.currentTime / d : 0;
      setProgress(p);

      let current: string | null = null;
      for (const cue of cumgeonConfig.video.annotations) {
        if (p >= cue.at) current = cue.label;
      }
      setActiveAnnotation(current);

      if (!climaxFired.current && p >= 0.8) {
        climaxFired.current = true;
        setClimax(true);
        setTimeout(() => setClimax(false), 1700);
      }
    };
    const onEnd = () => {
      setEnded(true);
      setPlaying(false);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnd);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnd);
    };
  }, [duration]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    climaxFired.current = false;
    setEnded(false);
    setClimax(false);
    video.play();
    setPlaying(true);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section id="mutation" className="relative w-full bg-black py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wide2 text-lime/70">Recovered Transmission</p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-tightest2 text-dirty sm:text-5xl">
          THE ORIGINAL MUTATION
        </h2>
      </div>

      <div
        ref={containerRef}
        className={`relative mx-auto mt-14 border-2 border-lime/30 bg-trench-950 transition-all duration-700 ${
          climax ? "fixed inset-0 z-[92] m-0 max-w-none border-0" : "max-w-3xl px-2 sm:px-0"
        }`}
        style={{
          boxShadow: climax ? "none" : "0 0 60px rgba(202,255,0,0.12)",
        }}
      >
        {/* corrupted frame chrome */}
        <div className="flex items-center justify-between border-b border-lime/20 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-lime/60">
          <span>REC ● LAB-FEED 07</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>

        <div className="relative aspect-square w-full sm:aspect-video">
          <video
            ref={videoRef}
            src={cumgeonConfig.video.src}
            poster={cumgeonConfig.video.poster}
            muted={muted}
            playsInline
            className="h-full w-full object-cover"
          />

          {/* scanline / corruption overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 3px)",
            }}
          />

          {/* terminal annotation */}
          {activeAnnotation && (
            <motion.p
              key={activeAnnotation}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-3 top-3 rounded-sm border border-lime/40 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide2 text-lime"
            >
              {activeAnnotation}
            </motion.p>
          )}

          {/* ended overlay */}
          {ended && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <button
                onClick={handleReplay}
                data-cursor="ENTER"
                className="rounded-sm border border-lime bg-lime/90 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide2 text-black"
              >
                ▶ REPLAY TRANSMISSION
              </button>
            </div>
          )}
        </div>

        {/* controls + progress */}
        <div className="flex items-center gap-3 border-t border-lime/20 bg-black/60 px-3 py-2">
          <button
            onClick={handleMuteToggle}
            aria-label={muted ? "Unmute video" : "Mute video"}
            data-cursor="ENTER"
            className="rounded border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wide2 text-dirty/80 hover:border-lime hover:text-lime"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            onClick={handleReplay}
            aria-label="Replay video"
            data-cursor="ENTER"
            className="rounded border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wide2 text-dirty/80 hover:border-lime hover:text-lime"
          >
            ↺
          </button>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-lime transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-dirty/50">{playing ? "PLAYING" : ended ? "ENDED" : "PAUSED"}</span>
        </div>
      </div>
    </section>
  );
}
