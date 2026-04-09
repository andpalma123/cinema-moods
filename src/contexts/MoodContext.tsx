import React, { createContext, useContext, useState, useCallback } from "react";
import { MoodKey, TimeKey, IntentKey, setMoodAccent, MOODS } from "@/lib/moodConfig";

type Step = "landing" | "starter" | "browse" | "continue" | "curated" | "preview" | "validation" | "settings" | "profile";

interface MoodState {
  mood: MoodKey | null;
  time: TimeKey | null;
  intent: IntentKey | null;
  step: Step;
  previewTitle: number | null;
  setMood: (m: MoodKey) => void;
  setTime: (t: TimeKey) => void;
  setIntent: (c: IntentKey) => void;
  setStep: (s: Step) => void;
  setPreviewTitle: (id: number | null) => void;
  resetAll: () => void;
  moodHsl: string;
}

const MoodContext = createContext<MoodState | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMoodState] = useState<MoodKey | null>(null);
  const [time, setTimeState] = useState<TimeKey | null>(null);
  const [intent, setIntentState] = useState<IntentKey | null>(null);
  const [step, setStep] = useState<Step>("landing");
  const [previewTitle, setPreviewTitle] = useState<number | null>(null);

  const moodHsl = mood ? MOODS.find((m) => m.key === mood)!.hsl : "0 72% 51%";

  const setMood = useCallback((m: MoodKey) => {
    setMoodState(m);
    const hsl = MOODS.find((x) => x.key === m)!.hsl;
    setMoodAccent(hsl);
  }, []);

  const setTime = useCallback((t: TimeKey) => setTimeState(t), []);
  const setIntent = useCallback((c: IntentKey) => setIntentState(c), []);

  const resetAll = useCallback(() => {
    setMoodState(null);
    setTimeState(null);
    setIntentState(null);
    setStep("landing");
    setPreviewTitle(null);
    setMoodAccent("357 83% 47%");
  }, []);

  return (
    <MoodContext.Provider
      value={{ mood, time, intent, step, previewTitle, setMood, setTime, setIntent, setStep, setPreviewTitle, resetAll, moodHsl }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export const useMood = () => {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be inside MoodProvider");
  return ctx;
};
