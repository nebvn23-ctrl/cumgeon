import TrenchTerminal from "@/components/intro/TrenchTerminal";
import Navigation from "@/components/navigation/Navigation";
import Hero from "@/components/hero/Hero";
import LoreJourney from "@/components/lore/LoreJourney";
import FakeSystemFailure from "@/components/effects/FakeSystemFailure";
import MutationTransmission from "@/components/video/MutationTransmission";
import MemeArchive from "@/components/archive/MemeArchive";
import GiantReveal from "@/components/scenes/GiantReveal";
import FinalManifesto from "@/components/footer/FinalManifesto";

export default function HomePage() {
  return (
    <>
      <TrenchTerminal />
      <Navigation />
      <main id="main-content">
        <Hero />
        <LoreJourney />
        <FakeSystemFailure />
        <MutationTransmission />
        <MemeArchive />
        <GiantReveal />
      </main>
      <div id="community">
        <FinalManifesto />
      </div>
    </>
  );
}
