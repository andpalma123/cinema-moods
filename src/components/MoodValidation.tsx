import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";
import { MOCK_TITLES } from "@/lib/moodConfig";

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
      className="fixed inset-0 z-50 flex items-end justify-center bg-background"
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
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted mood-accent-border border-t-transparent" />
            <p className="text-lg font-medium text-muted-foreground">
              Playing {title?.title ?? "title"}...
            </p>
          </motion.div>
        )}

        {phase === "feedback" && (
          <motion.div
            key="feedback"
            className="glass-panel m-4 mb-10 w-full max-w-2xl rounded-2xl p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full mood-accent-bg" />
              <h3 className="text-sm font-bold uppercase tracking-wider mood-accent-text">
                Satisfaction Check
              </h3>
            </div>
            <p className="mb-5 text-base text-foreground">
              Did <span className="font-semibold">{title?.title}</span> satisfy your mood?
            </p>

            <div className="flex flex-wrap gap-3">
              <FeedbackBtn icon={<><ThumbsUp size={18} /><ThumbsUp size={14} className="-ml-2" /></>} label="Perfect Match" onClick={() => setPhase("confirmed")} />
              <FeedbackBtn icon={<ThumbsUp size={18} />} label="Liked It" onClick={() => setPhase("confirmed")} />
              <FeedbackBtn icon={<ThumbsDown size={18} />} label="Not for Me" onClick={() => setPhase("confirmed")} />
              <button
                onClick={() => setPhase("confirmed")}
                className="tv-focus rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Good show, wrong mood
              </button>
            </div>
          </motion.div>
        )}

        {phase === "confirmed" && (
          <motion.div
            key="confirmed"
            className="glass-panel m-4 mb-10 w-full max-w-2xl rounded-2xl p-6 text-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <p className="mb-4 text-base text-foreground">
              Got it. We'll refine your picks for next time.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setStep("curated")}
                className="tv-focus flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <RotateCcw size={16} /> Back to Picks
              </button>
              <button
                onClick={resetAll}
                className="tv-focus mood-accent-bg rounded-lg px-6 py-3 text-sm font-bold text-primary-foreground"
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

function FeedbackBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="tv-focus flex items-center gap-2 rounded-lg border-2 border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  );
}
