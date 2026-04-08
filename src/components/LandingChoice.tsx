import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { Play, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function LandingChoice() {
  const { setStep } = useMood();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Blurred cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "blur(20px) brightness(0.4)", transform: "scale(1.1)" }}
          width={1920}
          height={1080}
        />
      </div>

      {/* Glass modal */}
      <motion.div
        className="glass-panel relative z-10 mx-4 w-full max-w-2xl rounded-2xl p-10 md:p-14"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        {/* Netflix logo */}
        <h1
          className="mb-4 text-center text-4xl font-extrabold tracking-tighter text-primary md:text-5xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          NETFLIX
        </h1>

        <p className="mb-10 text-center text-lg text-muted-foreground">
          How do you want to watch tonight?
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {/* Browse Now */}
          <button
            onClick={() => {
              /* For now, just go to curated as placeholder for classic UI */
              setStep("curated");
            }}
            className="tv-focus group flex w-full max-w-xs items-center justify-center gap-3 rounded-xl border-2 border-border bg-secondary/60 px-8 py-5 text-lg font-semibold text-foreground transition-all duration-200 hover:border-muted-foreground hover:bg-secondary"
          >
            <Play size={24} className="text-muted-foreground transition-colors group-hover:text-foreground" />
            Browse Now
          </button>

          {/* Curate My Night */}
          <button
            onClick={() => setStep("starter")}
            className="tv-focus group flex w-full max-w-xs items-center justify-center gap-3 rounded-xl border-2 border-primary bg-primary/10 px-8 py-5 text-lg font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <Sparkles size={24} className="transition-colors" />
            Curate My Night
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
