import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { Play, ChevronLeft } from "lucide-react";
import whiplashPoster from "@/assets/whiplash-poster.jpg";

const CURRENT_TITLE = {
  title: "Whiplash",
  year: 2014,
  duration: "1h 47m",
  rating: "R",
  progress: 62,
  description:
    "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
};

const FOLLOW_UPS = [
  {
    title: "Black Swan",
    year: 2010,
    duration: "1h 48m",
    hook: "If Whiplash's obsessive perfectionism gripped you, Black Swan takes that pressure into the world of ballet with the same haunting intensity.",
    img: "https://picsum.photos/seed/bswan/400/225",
  },
  {
    title: "The Pianist",
    year: 2002,
    duration: "2h 30m",
    hook: "Another portrait of artistic genius under extreme pressure — a story of survival and music that echoes Whiplash's emotional rawness.",
    img: "https://picsum.photos/seed/pianist/400/225",
  },
  {
    title: "Sound of Metal",
    year: 2019,
    duration: "2h 10m",
    hook: "From drumming brilliance to the fear of losing it all — this film explores a musician's identity crisis with the same visceral power.",
    img: "https://picsum.photos/seed/sometal/400/225",
  },
];

export default function ContinueWatching() {
  const { resetAll } = useMood();

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nav */}
      <nav className="fixed top-0 z-40 flex w-full items-center gap-6 bg-gradient-to-b from-background/90 to-transparent px-8 py-4 md:px-12">
        <h1 className="text-2xl font-extrabold tracking-tighter text-primary">NETFLIX</h1>
        <button onClick={resetAll} className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> Back
        </button>
      </nav>

      {/* Hero section */}
      <div className="relative h-[65vh] w-full">
        <img src={whiplashPoster} alt="Whiplash" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <div className="absolute bottom-12 left-8 max-w-xl md:left-12">
          <h2 className="mb-2 text-4xl font-black text-foreground md:text-5xl">{CURRENT_TITLE.title}</h2>
          <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{CURRENT_TITLE.year}</span>
            <span className="rounded border border-muted-foreground/30 px-1.5 py-0.5 text-xs">{CURRENT_TITLE.rating}</span>
            <span>{CURRENT_TITLE.duration}</span>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">{CURRENT_TITLE.description}</p>

          {/* Progress bar */}
          <div className="mb-4 w-full max-w-md">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>{CURRENT_TITLE.progress}% watched</span>
              <span>{CURRENT_TITLE.duration}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${CURRENT_TITLE.progress}%` }} />
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-md bg-foreground px-8 py-3 text-base font-semibold text-background hover:bg-foreground/80">
            <Play size={20} fill="currentColor" /> Continue
          </button>
        </div>
      </div>

      {/* Follow-up recommendations */}
      <div className="relative z-10 -mt-6 px-8 pb-16 md:px-12">
        <h3 className="mb-5 text-xl font-bold text-foreground">Because you're watching Whiplash</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FOLLOW_UPS.map((item) => (
            <motion.div
              key={item.title}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-muted-foreground/50 hover:shadow-lg"
              whileHover={{ y: -4 }}
            >
              <div className="relative h-36 overflow-hidden">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">{item.duration}</p>
                <p className="text-sm leading-relaxed text-muted-foreground/80 italic">{item.hook}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
