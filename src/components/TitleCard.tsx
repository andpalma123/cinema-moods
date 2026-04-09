import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";
import { MOCK_TITLES, MOODS } from "@/lib/moodConfig";
import whiplashPoster from "@/assets/whiplash-poster.jpg";

const POSTER_MAP: Record<string, string> = {
  whiplash: whiplashPoster,
};

interface Props {
  titleId: number;
}

export default function TitleCard({ titleId }: Props) {
  const { mood, setStep, setPreviewTitle } = useMood();
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const title = MOCK_TITLES.find((t) => t.id === titleId)!;

  const handlePlay = () => {
    setPreviewTitle(titleId);
    setStep("validation");
  };

  const moodData = MOODS.find((m) => m.key === mood);
  const hue = moodData ? moodData.hsl.split(" ")[0] : "0";
  const posterGradient = `linear-gradient(${135 + titleId * 25}deg, hsl(${hue} 40% ${15 + (titleId % 4) * 8}%), hsl(${(parseInt(hue) + 40) % 360} 30% ${20 + (titleId % 3) * 6}%))`;

  const AudioIcon = muted ? VolumeX : Volume2;

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-lg border-2 border-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Audio toggle - always on top right */}
      <button
        onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        className="absolute right-2 top-2 z-20 rounded-full bg-background/70 p-1.5 transition-colors hover:bg-background"
      >
        <AudioIcon size={16} className="text-muted-foreground" />
      </button>

      {/* Poster */}
      <div className="aspect-[2/3] w-full relative" style={{ background: title.poster ? undefined : posterGradient }}>
        {title.poster && POSTER_MAP[title.poster] && (
          <img src={POSTER_MAP[title.poster]} alt={title.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        )}
        <div className="relative flex h-full flex-col justify-end p-4 bg-gradient-to-t from-background/80 to-transparent">
          <span className="text-xs font-semibold mood-accent-text italic">{title.tag}</span>
          <span className="text-base font-bold text-foreground">{title.title}</span>
        </div>
      </div>

      {/* Expanded preview overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col bg-card/95 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Simulated silent preview */}
            <div className="relative mb-3 h-24 shrink-0 overflow-hidden rounded-md">
              <div className="shimmer-animation h-full w-full rounded-md" />
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              <h3 className="text-sm font-bold text-foreground">{title.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {title.year} - {title.duration} - {title.genre}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {title.synopsis}
              </p>
              <p className="mt-2 rounded-md bg-secondary px-2 py-1.5 text-xs mood-accent-text">
                {title.moodJustification}
              </p>
            </div>

            {/* Hear the Story button */}
            <button
              className="mt-2 w-full shrink-0 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Hear the Story
            </button>

            <button
              onClick={handlePlay}
              className="mt-2 flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
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
