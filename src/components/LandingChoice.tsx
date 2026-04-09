import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { Play, LayoutGrid, Sparkles, User } from "lucide-react";

const CARDS = [
  {
    id: "continue" as const,
    label: "Continue Watching",
    description: "Resume your last title right where you left off",
    icon: Play,
  },
  {
    id: "browse" as const,
    label: "Browse",
    description: "Explore the full catalogue by genre and mood",
    icon: LayoutGrid,
  },
  {
    id: "starter" as const,
    label: "Curate My Night",
    description: "Answer three questions and get a personalised set",
    icon: Sparkles,
  },
];

export default function LandingChoice() {
  const { setStep } = useMood();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative z-10 mx-4 w-full max-w-4xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        {/* Account icon */}
        <button
          onClick={() => setStep("settings")}
          className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
          title="Account"
        >
          <div className="relative">
            <User size={24} />
            {/* Gold loyalty tier badge */}
            <span
              className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#141414]"
              style={{ backgroundColor: "#FFD700" }}
              title="Gold Tier"
            />
          </div>
        </button>
        <h1
          className="mb-4 text-center text-4xl font-extrabold tracking-tighter text-primary md:text-5xl"
        >
          NETFLIX
        </h1>

        <p className="mb-10 text-center text-lg text-muted-foreground">
          Choose your watching experience
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => setStep(card.id)}
                className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-secondary/60 px-5 py-6 text-center transition-all duration-200 hover:border-primary hover:bg-secondary"
              >
                <Icon
                  size={28}
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
                <span className="text-base font-semibold text-foreground">
                  {card.label}
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  {card.description}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
