import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { MOODS, TIME_LABELS, MOCK_TITLES } from "@/lib/moodConfig";
import TitleCard from "./TitleCard";

export default function CuratedSurface() {
  const { mood, time } = useMood();
  const moodData = MOODS.find((m) => m.key === mood);
  const moodLabel = moodData?.label ?? "Your";
  const timeLabel = time ? TIME_LABELS[time] : "";

  const titles = MOCK_TITLES.slice(0, 10);

  return (
    <motion.div
      className="relative min-h-screen bg-background px-6 py-10 md:px-12 lg:px-20"
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

      {/* Netflix-style top bar */}
      <div className="relative mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter text-primary md:text-3xl">NETFLIX</h2>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Change Mood
        </button>
      </div>

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

      {/* 10-card grid with bigger tiles */}
      <motion.div
        className="relative grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {titles.map((t) => (
          <motion.div
            key={t.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <TitleCard titleId={t.id} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
