import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, VolumeX } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";
import { MOCK_TITLES, MOOD_REASONS, MOODS } from "@/lib/moodConfig";

interface Props {
  titleId: number;
}

export default function TitleCard({ titleId }: Props) {
  const { mood, setStep, setPreviewTitle } = useMood();
  const [hovered, setHovered] = useState(false);
  const title = MOCK_TITLES.find((t) => t.id === titleId)!;
  const reasons = mood ? MOOD_REASONS[mood] : [];
  const reason = reasons[titleId % reasons.length];

  const handlePlay = () => {
    setPreviewTitle(titleId);
    setStep("validation");
  };

  // Generate a unique gradient for each card as "poster"
  const moodData = MOODS.find((m) => m.key === mood);
  const hue = moodData ? moodData.hsl.split(" ")[0] : "0";
  const posterGradient = `linear-gradient(${135 + titleId * 25}deg, hsl(${hue} 40% ${15 + (titleId % 4) * 8}%), hsl(${(parseInt(hue) + 40) % 360} 30% ${20 + (titleId % 3) * 6}%))`;

  return (
    <motion.div
      className="tv-focus relative cursor-pointer overflow-hidden rounded-lg border-2 border-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Poster */}
      <div
        className="aspect-[2/3] w-full"
        style={{ background: posterGradient }}
      >
        <div className="flex h-full flex-col justify-end p-3">
          <span className="text-xs font-semibold text-foreground/70">{title.rating}</span>
          <span className="text-sm font-bold text-foreground">{title.title}</span>
        </div>
      </div>

      {/* Expanded preview overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-between bg-card/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Simulated "video" with shimmer */}
            <div className="relative mb-3 h-24 overflow-hidden rounded-md">
              <div className="shimmer-animation h-full w-full rounded-md" />
              <div className="absolute right-2 top-2 rounded-full bg-background/70 p-1">
                <VolumeX size={16} className="text-muted-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground">{title.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {title.year} · {title.duration} · {title.rating}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                A gripping story that keeps you on the edge of your seat with unexpected twists.
              </p>
              <p className="mt-2 rounded-md bg-secondary px-2 py-1 text-xs mood-accent-text">
                Why this fits your mood: {reason}
              </p>
            </div>

            <button
              onClick={handlePlay}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md mood-accent-bg py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play size={16} fill="currentColor" />
              Play
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
