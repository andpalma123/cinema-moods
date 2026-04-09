import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { MOODS, TIME_LABELS, MOCK_TITLES } from "@/lib/moodConfig";
import TitleCard from "./TitleCard";
import { X } from "lucide-react";

export default function CuratedSurface() {
  const { mood, time, resetAll } = useMood();
  const moodData = MOODS.find((m) => m.key === mood);
  const moodLabel = moodData?.label ?? "Your";
  const timeLabel = time ? TIME_LABELS[time] : "";

  const [titles, setTitles] = useState(() => MOCK_TITLES.slice(0, 9));
  const [rejected, setRejected] = useState<Set<number>>(new Set());

  const handleReject = (id: number) => {
    const currentIds = new Set(titles.map((t) => t.id));
    const replacement = MOCK_TITLES.find(
      (t) => !currentIds.has(t.id) && !rejected.has(t.id) && t.id !== id
    );
    setRejected((prev) => new Set(prev).add(id));
    if (replacement) {
      setTitles((prev) => prev.map((t) => (t.id === id ? replacement : t)));
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="relative min-h-screen bg-[#141414] px-6 py-10 md:px-12 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle mood tint pulse */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, hsl(${moodData?.hsl ?? "0 0% 0%"} / 0.06), transparent 70%)`,
          animation: "pulse-bg 4s ease-in-out infinite",
        }}
      />

      {/* Top bar */}
      <div className="relative mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter text-primary md:text-3xl">NETFLIX</h2>
        <button
          onClick={resetAll}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Change Mood
        </button>
      </div>

      {/* Session date label */}
      <p className="relative mb-6 text-sm text-muted-foreground">{today}</p>

      {/* Section header */}
      <motion.h1
        className="relative mb-8 text-2xl font-bold text-foreground md:text-3xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Your {timeLabel}{" "}
        <span className="mood-accent-text">{moodLabel}</span> Curated Selection
      </motion.h1>

      {/* Numbered card grid with reject buttons */}
      <motion.div
        className="relative grid grid-cols-3 gap-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <AnimatePresence mode="popLayout">
          {titles.map((t, index) => (
            <motion.div
              key={t.id}
              className="relative"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sequential number */}
              <div className="absolute -left-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </div>
              {/* Reject button */}
              <button
                onClick={() => handleReject(t.id)}
                className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                title="Reject this title"
              >
                <X size={12} />
              </button>
              <TitleCard titleId={t.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
