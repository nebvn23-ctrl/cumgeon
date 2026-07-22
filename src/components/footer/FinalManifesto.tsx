"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cumgeonConfig } from "@/config/cumgeon";
import { useSiteState } from "@/components/providers/SiteStateProvider";
import { isConfiguredLink } from "@/lib/utils";
import CharacterActor from "@/components/character/CharacterActor";
import type { CharacterState } from "@/components/character/CharacterActor";

function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const configured =
    cumgeonConfig.featureFlags.showContractAddress && isConfiguredLink(cumgeonConfig.links.contractAddress);
  if (!configured) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cumgeonConfig.links.contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor="ENTER"
      className="rounded-sm border border-white/15 px-4 py-2 font-mono text-xs text-dirty/70 hover:border-lime hover:text-lime"
    >
      {copied ? "COPIED ✓" : `CA: ${cumgeonConfig.links.contractAddress}`}
    </button>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const configured = isConfiguredLink(href);
  return (
    <a
      href={configured ? href : undefined}
      target={configured ? "_blank" : undefined}
      rel={configured ? "noopener noreferrer" : undefined}
      aria-disabled={!configured}
      data-cursor={configured ? "ENTER" : undefined}
      onClick={(e) => !configured && e.preventDefault()}
      className={`font-mono text-xs uppercase tracking-wide2 ${
        configured ? "text-dirty/70 hover:text-lime" : "cursor-default text-dirty/25"
      }`}
      title={configured ? undefined : "Not configured yet"}
    >
      {label}
    </a>
  );
}

export default function FinalManifesto() {
  const { restartLore } = useSiteState();
  const [stage, setStage] = useState<"lines" | "closing" | "exit" | "gone">("lines");
  const buyConfigured = isConfiguredLink(cumgeonConfig.links.buy);
  const communityHref = isConfiguredLink(cumgeonConfig.links.telegram)
    ? cumgeonConfig.links.telegram
    : cumgeonConfig.links.x;

  const characterState: CharacterState =
    stage === "gone" ? "hidden" : stage === "exit" ? "exiting" : "floating";

  return (
    <footer className="relative w-full overflow-hidden bg-trench-950">
      <motion.section
        onViewportEnter={() => {
          setTimeout(() => setStage("closing"), 2600);
          setTimeout(() => setStage("exit"), 5200);
          setTimeout(() => setStage("gone"), 7600);
        }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center"
      >
        <Image
          src={cumgeonConfig.media.scenes.greenFields}
          alt="A quiet green field at sunrise."
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-trench-950 via-trench-950/60 to-trench-950" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,170,60,0.12), transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-10">
          {stage !== "gone" && (
            <CharacterActor variant="greenFields" state={characterState} size={210} showEye />
          )}

          {(stage === "lines" || stage === "closing") && (
            <div className="space-y-2">
              {cumgeonConfig.finalManifesto.lines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.5, duration: 0.6 }}
                  className="font-display text-3xl uppercase tracking-tightest2 text-dirty sm:text-5xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          )}

          {stage === "closing" && (
            <div className="space-y-1">
              {cumgeonConfig.finalManifesto.closingLines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.4, duration: 0.6 }}
                  className="font-mono text-xs uppercase tracking-wide2 text-lime sm:text-sm"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          )}

          {stage === "gone" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="font-mono text-sm uppercase tracking-wide2 text-lime/80"
            >
              {cumgeonConfig.finalManifesto.departure}
            </motion.p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={buyConfigured ? cumgeonConfig.links.buy : "#"}
              target={buyConfigured ? "_blank" : undefined}
              rel={buyConfigured ? "noopener noreferrer" : undefined}
              data-cursor="BUY"
              onClick={(e) => !buyConfigured && e.preventDefault()}
              className="rounded-sm border border-lime bg-lime px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide2 text-black transition-transform hover:scale-105"
            >
              {cumgeonConfig.finalManifesto.ctas.buy}
            </a>
            <a
              href={isConfiguredLink(communityHref) ? communityHref : "#"}
              target={isConfiguredLink(communityHref) ? "_blank" : undefined}
              rel={isConfiguredLink(communityHref) ? "noopener noreferrer" : undefined}
              data-cursor="ENTER"
              onClick={(e) => !isConfiguredLink(communityHref) && e.preventDefault()}
              className="rounded-sm border border-white/25 px-6 py-3 font-mono text-sm uppercase tracking-wide2 text-dirty hover:border-lime hover:text-lime"
            >
              {cumgeonConfig.finalManifesto.ctas.community}
            </a>
            <button
              onClick={restartLore}
              data-cursor="ENTER"
              className="rounded-sm border border-white/25 px-6 py-3 font-mono text-sm uppercase tracking-wide2 text-dirty hover:border-lime hover:text-lime"
            >
              {cumgeonConfig.finalManifesto.ctas.restart}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <SocialLink label="X / TWITTER" href={cumgeonConfig.links.x} />
            <SocialLink label="TELEGRAM" href={cumgeonConfig.links.telegram} />
            <SocialLink label="DEXSCREENER" href={cumgeonConfig.links.dexscreener} />
            <ContractAddress />
          </div>
        </div>
      </motion.section>

      <div className="relative z-10 border-t border-white/5 bg-trench-950 px-6 py-8 text-center">
        <p className="mx-auto max-w-xl font-mono text-[10px] uppercase tracking-wide2 text-dirty/40">
          {cumgeonConfig.footer.line1}
        </p>
        <p className="mx-auto mt-1 max-w-xl font-mono text-[10px] uppercase tracking-wide2 text-dirty/40">
          {cumgeonConfig.footer.line2}
        </p>
        <p className="mt-4 font-mono text-[10px] text-dirty/30">{cumgeonConfig.footer.copyright}</p>
      </div>
    </footer>
  );
}
