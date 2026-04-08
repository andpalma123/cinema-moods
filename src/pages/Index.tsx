import { AnimatePresence } from "framer-motion";
import { MoodProvider, useMood } from "@/contexts/MoodContext";
import LandingChoice from "@/components/LandingChoice";
import SessionStarter from "@/components/SessionStarter";
import ClassicBrowse from "@/components/ClassicBrowse";
import CuratedSurface from "@/components/CuratedSurface";
import MoodValidation from "@/components/MoodValidation";

function MoodApp() {
  const { step } = useMood();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "landing" && <LandingChoice key="landing" />}
        {step === "starter" && <SessionStarter key="starter" />}
        {step === "browse" && <ClassicBrowse key="browse" />}
        {step === "curated" && <CuratedSurface key="curated" />}
        {step === "validation" && <MoodValidation key="validation" />}
      </AnimatePresence>
    </div>
  );
}

export default function Index() {
  return (
    <MoodProvider>
      <MoodApp />
    </MoodProvider>
  );
}
