import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { MOODS, TIMES, COMPANY } from "@/lib/moodConfig";
import heroBg from "@/assets/hero-bg.jpg";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function SessionStarter() {
  const { mood, time, company, setMood, setTime, setCompany, setStep } = useMood();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Blurred cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "blur(20px) brightness(0.4)", transform: "scale(1.1)" }}
          width={1920}
          height={1080}
        />
      </div>

      {/* Glass modal */}
      <motion.div
        className="glass-panel relative z-10 mx-4 w-full max-w-3xl rounded-2xl p-8 md:p-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        {/* Netflix logo */}
        <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tighter text-primary md:text-5xl" style={{ fontFamily: "'Inter', sans-serif" }}>
          NETFLIX
        </h1>

        {/* Step 1: Mood */}
        <div className="mb-6">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">What's your mood</p>
          <div className="flex flex-wrap justify-center gap-3">
            {MOODS.map((m) => {
              const Icon = m.icon;
              const selected = mood === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setMood(m.key)}
                  className={`tv-focus flex flex-col items-center gap-2 rounded-xl border-2 px-5 py-4 text-sm font-medium transition-all duration-200 ${
                    selected
                      ? "mood-accent-border mood-accent-glow bg-secondary text-foreground"
                      : "border-border bg-secondary/50 text-muted-foreground"
                  }`}
                  style={
                    selected
                      ? {}
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = `hsl(${m.hsl})`;
                      e.currentTarget.style.color = `hsl(${m.hsl})`;
                      e.currentTarget.style.boxShadow = `0 0 20px 4px hsl(${m.hsl} / 0.3)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.boxShadow = '';
                    }
                  }}
                >
                  <Icon size={28} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Time - shown only after mood */}
        <AnimatePresence>
          {mood && (
            <motion.div className="mb-6" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">How much time do you have</p>
              <div className="flex justify-center gap-3">
                {TIMES.map((t) => {
                  const selected = time === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTime(t.key)}
                      className={`tv-focus rounded-lg border-2 px-6 py-3 text-sm font-medium transition-colors ${
                        selected
                          ? "mood-accent-border mood-accent-glow bg-secondary text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Company - shown only after time */}
        <AnimatePresence>
          {mood && time && (
            <motion.div className="mb-6" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">Are you alone or do you have company</p>
              <div className="flex justify-center gap-3">
                {COMPANY.map((c) => {
                  const selected = company === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setCompany(c.key)}
                      className={`tv-focus rounded-lg border-2 px-6 py-3 text-sm font-medium transition-colors ${
                        selected
                          ? "mood-accent-border mood-accent-glow bg-secondary text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA - shown only after all selected */}
        <AnimatePresence>
          {mood && time && company && (
            <motion.div className="flex justify-center" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <button
                onClick={() => setStep("curated")}
                className="tv-focus mood-accent-bg rounded-lg px-10 py-4 text-lg font-bold text-primary-foreground transition-all"
              >
                Curate My Night
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
