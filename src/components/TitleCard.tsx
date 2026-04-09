import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, Plus, Share2, Pause, SkipForward } from "lucide-react";
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
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const title = MOCK_TITLES.find((t) => t.id === titleId)!;

  const handlePlay = () => {
    setPreviewTitle(titleId);
    setStep("validation");
  };

  // Audio narration mock (60s timer)
  useEffect(() => {
    if (audioPlaying) {
      audioTimerRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 60) {
            setAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (audioTimerRef.current) {
      clearInterval(audioTimerRef.current);
    }
    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [audioPlaying]);

  const handleHearStory = () => {
    if (audioPlaying) {
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      if (audioProgress >= 60) setAudioProgress(0);
    }
  };

  const handleSkipAudio = () => {
    setAudioProgress((prev) => Math.min(prev + 10, 60));
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
      {/* Audio toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        className="absolute right-2 top-2 z-20 rounded-full bg-background/70 p-1.5 transition-colors hover:bg-background"
      >
        <AudioIcon size={16} className="text-muted-foreground" />
      </button>

      {/* Poster with simulated video preview */}
      <div className="aspect-[2/3] w-full relative" style={{ background: title.poster ? undefined : posterGradient }}>
        {title.poster && POSTER_MAP[title.poster] && (
          <img src={POSTER_MAP[title.poster]} alt={title.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        )}
        {/* Simulated auto-playing video overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-transparent via-white/5 to-transparent" style={{ animationDuration: '3s' }} />
        </div>
        {/* Unmute indicator */}
        {!muted && (
          <div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-primary/80 px-2 py-0.5">
            <Volume2 size={10} className="text-primary-foreground" />
            <span className="text-[9px] font-bold text-primary-foreground">LIVE</span>
          </div>
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
            {/* Simulated video preview */}
            <div className="relative mb-3 h-24 shrink-0 overflow-hidden rounded-md">
              <div className="shimmer-animation h-full w-full rounded-md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-background/40 p-1.5">
                  <Play size={14} fill="currentColor" className="text-foreground" />
                </div>
              </div>
              {/* Video progress bar */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-muted">
                <div className="h-full bg-primary animate-[grow_300s_linear_infinite]" style={{ width: '15%' }} />
              </div>
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

            {/* Hear the Story - audio player */}
            <div className="mt-2 shrink-0">
              {audioPlaying || audioProgress > 0 ? (
                <div className="rounded-md border border-border bg-secondary/60 p-2">
                  <div className="mb-1.5 flex items-center gap-2">
                    <button onClick={handleHearStory} className="text-foreground hover:text-primary">
                      {audioPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                    </button>
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${(audioProgress / 60) * 100}%` }} />
                    </div>
                    <button onClick={handleSkipAudio} className="text-muted-foreground hover:text-foreground" title="Skip 10s">
                      <SkipForward size={12} />
                    </button>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{60 - audioProgress}s</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">AI-narrated summary</p>
                </div>
              ) : (
                <button
                  onClick={handleHearStory}
                  className="w-full rounded-md border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Hear the Story
                </button>
              )}
            </div>

            {/* CTAs: Add to List, Share, Watch Now */}
            <div className="mt-2 flex shrink-0 gap-2">
              <button
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Plus size={14} />
                List
              </button>
              <button
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Share2 size={14} />
                Share
              </button>
              <button
                onClick={handlePlay}
                className="flex flex-[2] items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Play size={16} fill="currentColor" />
                Watch Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
