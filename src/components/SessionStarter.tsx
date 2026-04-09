import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { MOODS, TIMES, INTENT } from "@/lib/moodConfig";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function SessionStarter() {
  const { mood, time, intent, setMood, setTime, setIntent, setStep, resetAll } = useMood();

  // Calculate current question number
  const currentQ = !mood ? 1 : !time ? 2 : !intent ? 3 : 3;
  const totalQ = 3;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="glass-panel relative z-10 mx-4 w-full max-w-3xl rounded-2xl p-8 md:p-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
      >
        {/* Back button */}
        <button
          onClick={resetAll}
          className="absolute left-6 top-6 text-sm text-muted-foreground hover:text-foreground"
        >
          Back
        </button>

        {/* Netflix logo */}
        <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tighter text-primary md:text-5xl">
          NETFLIX
        </h1>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQ} of {totalQ}
          </span>
          <div className="flex gap-1.5 ml-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  n <= currentQ ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Mood - always shown until answered */}
        <AnimatePresence mode="wait">
          {!mood && (
            <motion.div key="mood" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
                How are you feeling tonight?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {MOODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setMood(m.key)}
                      className="flex flex-col items-center gap-2 rounded-xl border-2 border-border bg-secondary/50 px-5 py-4 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `hsl(${m.hsl})`;
                        e.currentTarget.style.color = `hsl(${m.hsl})`;
                        e.currentTarget.style.boxShadow = `0 0 20px 4px hsl(${m.hsl} / 0.3)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <Icon size={28} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Time - shown only after mood */}
          {mood && !time && (
            <motion.div key="time" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
                How much time do you have?
              </p>
              <div className="flex justify-center gap-3">
                {TIMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTime(t.key)}
                    className="rounded-lg border-2 border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Intent - shown only after time */}
          {mood && time && !intent && (
            <motion.div key="intent" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Who are you watching with?
              </p>
              <div className="flex justify-center gap-3">
                {INTENT.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setIntent(c.key)}
                    className="rounded-lg border-2 border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA - shown after all answered */}
          {mood && time && intent && (
            <motion.div key="cta" className="flex justify-center" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
              <button
                onClick={() => setStep("curated")}
                className="rounded-lg bg-primary px-10 py-4 text-lg font-bold text-primary-foreground transition-opacity hover:opacity-90"
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
