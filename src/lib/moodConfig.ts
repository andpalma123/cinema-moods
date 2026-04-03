import { Flame, Wind, Laugh, Sparkles, Compass } from "lucide-react";

export type MoodKey = "angry" | "chill" | "laugh" | "inspired" | "escapism";
export type TimeKey = "30m" | "60m" | "90m";
export type CompanyKey = "alone" | "family" | "partner";

export const MOODS: { key: MoodKey; label: string; icon: typeof Flame; hsl: string }[] = [
  { key: "angry", label: "Angry", icon: Flame, hsl: "0 65% 48%" },
  { key: "chill", label: "Chill", icon: Wind, hsl: "210 60% 50%" },
  { key: "laugh", label: "Need a Laugh", icon: Laugh, hsl: "38 80% 55%" },
  { key: "inspired", label: "Inspired", icon: Sparkles, hsl: "280 50% 55%" },
  { key: "escapism", label: "Escapism", icon: Compass, hsl: "160 50% 45%" },
];

export const TIMES: { key: TimeKey; label: string }[] = [
  { key: "30m", label: "Under 30m" },
  { key: "60m", label: "Around 60m" },
  { key: "90m", label: "90m+" },
];

export const COMPANY: { key: CompanyKey; label: string }[] = [
  { key: "alone", label: "Alone" },
  { key: "family", label: "With Family" },
  { key: "partner", label: "With My Partner" },
];

export const TIME_LABELS: Record<TimeKey, string> = {
  "30m": "30-Minute",
  "60m": "60-Minute",
  "90m": "90-Minute",
};

export const MOOD_REASONS: Record<MoodKey, string[]> = {
  angry: [
    "High-intensity pacing matches your energy",
    "Cathartic storytelling to channel your fire",
    "Raw emotional arcs that hit hard",
  ],
  chill: [
    "Slow-burn atmosphere for total relaxation",
    "Soothing cinematography and pacing",
    "Low-stakes, feel-good vibes throughout",
  ],
  laugh: [
    "Sharp comedic timing guaranteed to land",
    "Absurd situations that'll crack you up",
    "Witty dialogue from start to finish",
  ],
  inspired: [
    "True stories of extraordinary achievement",
    "Visionary storytelling that expands perspective",
    "Uplifting themes that stay with you",
  ],
  escapism: [
    "Immersive world-building pulls you in completely",
    "Fantasy and adventure far from reality",
    "Rich lore and expansive universes to explore",
  ],
};

export const MOCK_TITLES: { id: number; title: string; year: number; rating: string; duration: string; poster?: string }[] = [
  { id: 1, title: "Whiplash", year: 2014, rating: "R", duration: "1h 47m", poster: "whiplash" },
  { id: 2, title: "Velvet Silence", year: 2023, rating: "PG-13", duration: "1h 48m" },
  { id: 3, title: "Neon Drifters", year: 2024, rating: "R", duration: "1h 55m" },
  { id: 4, title: "The Last Garden", year: 2023, rating: "PG", duration: "1h 32m" },
  { id: 5, title: "Obsidian Waves", year: 2024, rating: "TV-14", duration: "2h 05m" },
  { id: 6, title: "Echo Chamber", year: 2023, rating: "R", duration: "1h 41m" },
  { id: 7, title: "Solar Wind", year: 2024, rating: "PG-13", duration: "1h 58m" },
  { id: 8, title: "Fractured Light", year: 2023, rating: "TV-MA", duration: "2h 20m" },
  { id: 9, title: "Whispering Pines", year: 2024, rating: "PG", duration: "1h 29m" },
  { id: 10, title: "Iron Bloom", year: 2023, rating: "R", duration: "1h 45m" },
  { id: 11, title: "Phantom Meridian", year: 2024, rating: "TV-14", duration: "2h 01m" },
  { id: 12, title: "Glass Frontier", year: 2023, rating: "PG-13", duration: "1h 37m" },
];

export function setMoodAccent(hsl: string) {
  document.documentElement.style.setProperty("--mood-accent", hsl);
  document.documentElement.style.setProperty("--mood-accent-glow", `${hsl} / 0.4`);
}
