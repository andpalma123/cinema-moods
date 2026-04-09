import { Flame, Wind, Laugh, Sparkles, Compass, Moon } from "lucide-react";

export type MoodKey = "energised" | "relaxed" | "reflective" | "curious" | "social" | "tired";
export type TimeKey = "30m" | "60m" | "90m";
export type IntentKey = "alone" | "family" | "partner";

export const MOODS: { key: MoodKey; label: string; icon: typeof Flame; hsl: string }[] = [
  { key: "energised", label: "Energised", icon: Flame, hsl: "0 65% 48%" },
  { key: "relaxed", label: "Relaxed", icon: Wind, hsl: "210 60% 50%" },
  { key: "reflective", label: "Reflective", icon: Sparkles, hsl: "280 50% 55%" },
  { key: "curious", label: "Curious", icon: Compass, hsl: "38 80% 55%" },
  { key: "social", label: "Social", icon: Laugh, hsl: "160 50% 45%" },
  { key: "tired", label: "Tired", icon: Moon, hsl: "240 30% 45%" },
];

export const TIMES: { key: TimeKey; label: string }[] = [
  { key: "30m", label: "Under 30m" },
  { key: "60m", label: "Around 60m" },
  { key: "90m", label: "90m+" },
];

export const INTENT: { key: IntentKey; label: string }[] = [
  { key: "alone", label: "Solo viewing" },
  { key: "family", label: "Family night" },
  { key: "partner", label: "Date night" },
];

export const TIME_LABELS: Record<TimeKey, string> = {
  "30m": "30-Minute",
  "60m": "60-Minute",
  "90m": "90-Minute",
};

export const MOOD_REASONS: Record<MoodKey, string[]> = {
  energised: [
    "High-intensity pacing matches your energy",
    "Cathartic storytelling to channel your fire",
    "Raw emotional arcs that hit hard",
  ],
  relaxed: [
    "Slow-burn atmosphere for total relaxation",
    "Soothing cinematography and pacing",
    "Low-stakes, feel-good vibes throughout",
  ],
  reflective: [
    "Thought-provoking themes that stay with you",
    "Layered narratives that reward attention",
    "Quiet intensity that lingers after credits",
  ],
  curious: [
    "Surprising twists you won't see coming",
    "Worlds and ideas that expand your perspective",
    "Fresh storytelling that breaks conventions",
  ],
  social: [
    "Sharp comedic timing guaranteed to land",
    "Absurd situations that'll crack you up",
    "Witty dialogue from start to finish",
  ],
  tired: [
    "Gentle pacing that won't overwhelm",
    "Comforting familiarity in every scene",
    "Easy-watching that helps you unwind",
  ],
};

export const MOCK_TITLES: {
  id: number;
  title: string;
  year: number;
  genre: string;
  duration: string;
  tag: string;
  synopsis: string;
  moodJustification: string;
  poster?: string;
}[] = [
  { id: 1, title: "Whiplash", year: 2014, genre: "Drama", duration: "1h 47m", tag: "Intense drama", synopsis: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.", poster: "whiplash", moodJustification: "Raw intensity that matches your current energy perfectly" },
  { id: 2, title: "Velvet Silence", year: 2023, genre: "Thriller", duration: "1h 48m", tag: "A must-watch", synopsis: "A deaf pianist discovers she can hear a frequency that reveals hidden truths about the people around her.", moodJustification: "Gripping atmosphere that keeps you fully immersed" },
  { id: 3, title: "Neon Drifters", year: 2024, genre: "Sci-Fi", duration: "1h 55m", tag: "Genre's favourite", synopsis: "In a neon-lit future, a street racer discovers her car is sentient and hiding a dangerous secret.", moodJustification: "Vibrant world-building for your current state of mind" },
  { id: 4, title: "The Last Garden", year: 2023, genre: "Drama", duration: "1h 32m", tag: "Sweet and short", synopsis: "An elderly botanist tends to the last garden on Earth, finding unexpected connection with a young runaway.", moodJustification: "Gentle storytelling that resonates with your mood" },
  { id: 5, title: "Obsidian Waves", year: 2024, genre: "Drama", duration: "2h 05m", tag: "Hidden gem", synopsis: "A marine biologist uncovers an underwater civilization while investigating mysterious whale disappearances.", moodJustification: "Deep, immersive narrative for how you feel right now" },
  { id: 6, title: "Echo Chamber", year: 2023, genre: "Thriller", duration: "1h 41m", tag: "Cult classic", synopsis: "A podcast host realizes her listeners are acting out the fictional crimes she describes on air.", moodJustification: "Twisting suspense that complements your mood perfectly" },
  { id: 7, title: "Solar Wind", year: 2024, genre: "Adventure", duration: "1h 58m", tag: "Feel-good hit", synopsis: "A solar-sail pilot and her AI companion race to deliver a cure across the galaxy before time runs out.", moodJustification: "Uplifting adventure aligned with how you feel tonight" },
  { id: 8, title: "Fractured Light", year: 2023, genre: "Drama", duration: "2h 20m", tag: "Award winner", synopsis: "A war photographer returns home to find that the images she captured have begun altering reality.", moodJustification: "Powerful emotional depth that matches your headspace" },
  { id: 9, title: "Whispering Pines", year: 2024, genre: "Comedy", duration: "1h 29m", tag: "Cozy pick", synopsis: "A burned-out city planner inherits a failing summer camp and rediscovers joy through the campers' antics.", moodJustification: "Light-hearted warmth suited to your mood right now" },
  { id: 10, title: "Iron Bloom", year: 2023, genre: "Action", duration: "1h 45m", tag: "Edge-of-seat", synopsis: "A retired blacksmith forges a legendary weapon to defend her village from a tech-enhanced warlord.", moodJustification: "Action-packed intensity that fits how you feel" },
  { id: 11, title: "Phantom Meridian", year: 2024, genre: "Sci-Fi", duration: "2h 01m", tag: "Mind-bending", synopsis: "A cartographer discovers that the maps she draws are creating new realities.", moodJustification: "Cerebral storytelling for your current mindset" },
  { id: 12, title: "Glass Frontier", year: 2023, genre: "Comedy", duration: "1h 37m", tag: "Crowd pleaser", synopsis: "Two rival architects are forced to collaborate on a glass bridge that keeps mysteriously shattering.", moodJustification: "Fun and engaging, perfect for tonight" },
];

export function setMoodAccent(hsl: string) {
  document.documentElement.style.setProperty("--mood-accent", hsl);
  document.documentElement.style.setProperty("--mood-accent-glow", `${hsl} / 0.4`);
}
