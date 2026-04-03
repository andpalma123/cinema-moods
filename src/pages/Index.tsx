import { AnimatePresence } from "framer-motion";
import { MoodProvider, useMood } from "@/contexts/MoodContext";
import SessionStarter from "@/components/SessionStarter";
import CuratedSurface from "@/components/CuratedSurface";
import MoodValidation from "@/components/MoodValidation";

function MoodApp() {
  const { step } = useMood();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "starter" && <SessionStarter key="starter" />}
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
