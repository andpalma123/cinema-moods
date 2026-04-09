import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { ChevronLeft, User, Bell, Shield, Monitor, HelpCircle } from "lucide-react";

const SECTIONS = [
  { icon: User, label: "Account", desc: "Manage your profile and subscription" },
  { icon: Bell, label: "Notifications", desc: "Configure alerts and reminders" },
  { icon: Shield, label: "Privacy", desc: "Data sharing and viewing history" },
  { icon: Monitor, label: "Playback", desc: "Video quality, subtitles, audio" },
  { icon: HelpCircle, label: "Help", desc: "FAQs and customer support" },
];

export default function SettingsScreen() {
  const { resetAll } = useMood();

  return (
    <motion.div
      className="min-h-screen bg-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="fixed top-0 z-40 flex w-full items-center gap-6 bg-gradient-to-b from-[#141414]/90 to-transparent px-8 py-4 md:px-12">
        <h1 className="text-2xl font-extrabold tracking-tighter text-primary">NETFLIX</h1>
        <button onClick={resetAll} className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> Back
        </button>
      </nav>

      <div className="mx-auto max-w-2xl px-6 pt-24 pb-16">
        <h2 className="mb-8 text-3xl font-bold text-foreground">Settings</h2>

        <div className="space-y-3">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-muted-foreground/50 hover:bg-secondary"
              >
                <Icon size={24} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
