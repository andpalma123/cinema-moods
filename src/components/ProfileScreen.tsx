import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { ChevronLeft, Award } from "lucide-react";

const TIERS = [
  {
    name: "Bronze",
    color: "#CD7F32",
    hoursRequired: 0,
    perks: ["Standard streaming quality", "Single device", "Basic recommendations"],
  },
  {
    name: "Gold",
    color: "#FFD700",
    hoursRequired: 20,
    perks: ["HD streaming quality", "Two devices simultaneously", "Priority new releases", "Curate My Night feature"],
  },
  {
    name: "Platinum",
    color: "#E5E4E2",
    hoursRequired: 50,
    perks: ["4K Ultra HD quality", "Four devices simultaneously", "Early access to originals", "Exclusive behind-the-scenes content", "Ad-free experience"],
  },
];

export default function ProfileScreen() {
  const { resetAll } = useMood();

  // Mock user data
  const currentTier = TIERS[1]; // Gold
  const monthlyHours = 32;
  const nextTier = TIERS[2];
  const hoursToNext = nextTier.hoursRequired - monthlyHours;

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
        {/* Avatar with tier badge */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-3xl font-bold text-foreground">
              J
            </div>
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold"
              style={{ backgroundColor: currentTier.color, color: "#141414" }}
            >
              {currentTier.name}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">John</h2>
        </div>

        {/* Stats */}
        <div className="mb-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Award size={20} style={{ color: currentTier.color }} />
            <span className="text-sm font-semibold text-foreground">
              Current tier: <span style={{ color: currentTier.color }}>{currentTier.name}</span>
            </span>
          </div>
          <p className="mb-2 text-sm text-muted-foreground">
            Monthly hours watched: <span className="font-semibold text-foreground">{monthlyHours}h</span>
          </p>
          <p className="mb-3 text-sm text-muted-foreground">
            Hours to {nextTier.name}: <span className="font-semibold text-foreground">{hoursToNext}h</span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(monthlyHours / nextTier.hoursRequired) * 100}%`,
                backgroundColor: currentTier.color,
              }}
            />
          </div>
        </div>

        {/* Tier perks */}
        <h3 className="mb-4 text-lg font-bold text-foreground">Tier Perks</h3>
        <div className="space-y-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-4 ${
                tier.name === currentTier.name
                  ? "border-2 bg-card"
                  : "border-border bg-card/50"
              }`}
              style={tier.name === currentTier.name ? { borderColor: tier.color } : undefined}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: tier.color, color: "#141414" }}
                >
                  {tier.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tier.hoursRequired}+ hours/month
                </span>
              </div>
              <ul className="space-y-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="text-sm text-muted-foreground">
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
