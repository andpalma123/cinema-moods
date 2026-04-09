import { AnimatePresence } from "framer-motion";
import { MoodProvider, useMood } from "@/contexts/MoodContext";
import LandingChoice from "@/components/LandingChoice";
import SessionStarter from "@/components/SessionStarter";
import ClassicBrowse from "@/components/ClassicBrowse";
import ContinueWatching from "@/components/ContinueWatching";
import CuratedSurface from "@/components/CuratedSurface";
import MoodValidation from "@/components/MoodValidation";
import SettingsScreen from "@/components/SettingsScreen";
import ProfileScreen from "@/components/ProfileScreen";

function MoodApp() {
  const { step } = useMood();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "landing" && <LandingChoice key="landing" />}
        {step === "starter" && <SessionStarter key="starter" />}
        {step === "browse" && <ClassicBrowse key="browse" />}
        {step === "continue" && <ContinueWatching key="continue" />}
        {step === "curated" && <CuratedSurface key="curated" />}
        {step === "validation" && <MoodValidation key="validation" />}
        {step === "settings" && <SettingsScreen key="settings" />}
        {step === "profile" && <ProfileScreen key="profile" />}
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
