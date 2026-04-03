import React, { createContext, useContext, useState, useCallback } from "react";
import { MoodKey, TimeKey, CompanyKey, setMoodAccent, MOODS } from "@/lib/moodConfig";

type Step = "starter" | "curated" | "preview" | "validation";

interface MoodState {
  mood: MoodKey | null;
  time: TimeKey | null;
  company: CompanyKey | null;
  step: Step;
  previewTitle: number | null;
  setMood: (m: MoodKey) => void;
  setTime: (t: TimeKey) => void;
  setCompany: (c: CompanyKey) => void;
  setStep: (s: Step) => void;
  setPreviewTitle: (id: number | null) => void;
  resetAll: () => void;
  moodHsl: string;
}

const MoodContext = createContext<MoodState | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMoodState] = useState<MoodKey | null>(null);
  const [time, setTimeState] = useState<TimeKey | null>(null);
  const [company, setCompanyState] = useState<CompanyKey | null>(null);
  const [step, setStep] = useState<Step>("starter");
  const [previewTitle, setPreviewTitle] = useState<number | null>(null);

  const moodHsl = mood ? MOODS.find((m) => m.key === mood)!.hsl : "0 72% 51%";

  const setMood = useCallback((m: MoodKey) => {
    setMoodState(m);
    const hsl = MOODS.find((x) => x.key === m)!.hsl;
    setMoodAccent(hsl);
  }, []);

  const setTime = useCallback((t: TimeKey) => setTimeState(t), []);

  const resetAll = useCallback(() => {
    setMoodState(null);
    setTimeState(null);
    setStep("starter");
    setPreviewTitle(null);
    setMoodAccent("0 72% 51%");
  }, []);

  return (
    <MoodContext.Provider
      value={{ mood, time, step, previewTitle, setMood, setTime, setStep, setPreviewTitle, resetAll, moodHsl }}
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
