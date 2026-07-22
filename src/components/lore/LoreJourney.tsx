"use client";

import { cumgeonConfig } from "@/config/cumgeon";
import LoreChapter from "./LoreChapter";
import TrenchScene from "@/components/scenes/TrenchScene";
import GreenFieldsScene from "@/components/scenes/GreenFieldsScene";
import ScannerScene from "@/components/scenes/ScannerScene";
import MatrixInfectionScene from "@/components/scenes/MatrixInfectionScene";
import RainbowAscensionScene from "@/components/scenes/RainbowAscensionScene";
import MoonOrbitScene from "@/components/scenes/MoonOrbitScene";
import ExplosionScene from "@/components/scenes/ExplosionScene";

function sceneFor(id: string) {
  switch (id) {
    case "last-bull":
      return <TrenchScene />;
    case "sacred-bull-suit":
      return <GreenFieldsScene />;
    case "bull-suit-stays-on":
      return <GreenFieldsScene manifesto />;
    case "so-memeable":
      return <ScannerScene />;
    case "flip-the-trenches":
      return <MatrixInfectionScene mode="infect" />;
    case "chosen-pigeon":
      return <RainbowAscensionScene />;
    case "cumgeon-effect":
      return <MatrixInfectionScene mode="effect" />;
    case "lunar-migration":
      return <MoonOrbitScene />;
    case "too-memeable":
      return <ExplosionScene />;
    default:
      return null;
  }
}

export default function LoreJourney() {
  return (
    <div id="lore" className="relative bg-trench-950">
      <div className="mx-auto max-w-4xl px-6 pb-4 pt-24 text-center sm:pt-32">
        <p className="font-mono text-xs uppercase tracking-wide2 text-lime/70">The Lore</p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-tightest2 text-dirty sm:text-5xl">
          Nine chapters. One infection.
        </h2>
      </div>
      {cumgeonConfig.lore.map((chapter, i) => (
        <LoreChapter
          key={chapter.id}
          chapter={chapter}
          visual={sceneFor(chapter.id)}
          align={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}
