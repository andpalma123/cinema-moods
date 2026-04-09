import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";
import { MOCK_TITLES } from "@/lib/moodConfig";

const FEEDBACK_OPTIONS = [
  "Loved it",
  "Liked it",
  "Mixed feelings",
  "Disappointed",
  "Not for me",
];

export default function MoodValidation() {
  const { previewTitle, resetAll, setStep } = useMood();
  const [phase, setPhase] = useState<"loading" | "feedback" | "confirmed">("loading");
  const title = MOCK_TITLES.find((t) => t.id === previewTitle);

  // Auto-advance from loading
  if (phase === "loading") {
    setTimeout(() => setPhase("feedback"), 1800);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="flex h-full w-full flex-col items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
            <p className="text-lg font-medium text-muted-foreground">
              Playing {title?.title ?? "title"}...
            </p>
          </motion.div>
        )}

        {phase === "feedback" && (
          <motion.div
            key="feedback"
            className="relative glass-panel m-4 w-full max-w-md rounded-2xl p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* Dismiss button */}
            <button
              onClick={() => setPhase("confirmed")}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              Satisfaction Check
            </h3>
            <p className="mb-5 text-base text-foreground">
              How did you feel about <span className="font-semibold">{title?.title}</span>?
            </p>

            <div className="flex flex-col gap-2">
              {FEEDBACK_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setPhase("confirmed")}
                  className="w-full rounded-lg border-2 border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "confirmed" && (
          <motion.div
            key="confirmed"
            className="glass-panel m-4 w-full max-w-md rounded-2xl p-6 text-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <p className="mb-4 text-base text-foreground">
              Thanks for the feedback. We will refine your picks for next time.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setStep("curated")}
                className="rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Back to Picks
              </button>
              <button
                onClick={resetAll}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                Return Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
