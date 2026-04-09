import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { Play, Sparkles, LayoutGrid } from "lucide-react";
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

      <motion.div
        className="glass-panel relative z-10 mx-4 w-full max-w-3xl rounded-2xl p-10 md:p-14"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        <h1
          className="mb-4 text-center text-4xl font-extrabold tracking-tighter text-primary md:text-5xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          NETFLIX
        </h1>

        <p className="mb-10 text-center text-lg text-muted-foreground">
          Choose your watching experience
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
          {/* Continue Watching */}
          <button
            onClick={() => setStep("continue")}
            className="tv-focus group flex w-full max-w-[220px] flex-col items-center gap-2 rounded-xl border-2 border-border bg-secondary/60 px-6 py-5 text-base font-semibold text-foreground transition-all duration-200 hover:border-muted-foreground hover:bg-secondary"
          >
            <Play size={24} className="text-muted-foreground transition-colors group-hover:text-foreground" />
            Continue Watching
          </button>

          {/* Browse */}
          <button
            onClick={() => setStep("browse")}
            className="tv-focus group flex w-full max-w-[220px] flex-col items-center gap-2 rounded-xl border-2 border-border bg-secondary/60 px-6 py-5 text-base font-semibold text-foreground transition-all duration-200 hover:border-muted-foreground hover:bg-secondary"
          >
            <LayoutGrid size={24} className="text-muted-foreground transition-colors group-hover:text-foreground" />
            Browse
          </button>

          {/* Curate My Night */}
          <button
            onClick={() => setStep("starter")}
            className="tv-focus group flex w-full max-w-[220px] flex-col items-center gap-2 rounded-xl border-2 border-primary bg-primary/10 px-6 py-5 text-base font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <Sparkles size={24} className="transition-colors" />
            Curate My Night
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
