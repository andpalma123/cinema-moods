import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import { ChevronLeft, Play, Plus, ThumbsUp, ChevronRight, Info } from "lucide-react";
import { useRef, useState } from "react";

const ROWS = [
  {
    label: "Continue Watching",
    items: [
      { title: "Stranger Things", year: 2022, match: "98%", duration: "S4:E7", img: "https://picsum.photos/seed/st/400/225" },
      { title: "The Witcher", year: 2023, match: "95%", duration: "S3:E2", img: "https://picsum.photos/seed/tw/400/225" },
      { title: "Dark", year: 2020, match: "97%", duration: "S2:E5", img: "https://picsum.photos/seed/dk/400/225" },
      { title: "Ozark", year: 2022, match: "96%", duration: "S4:E10", img: "https://picsum.photos/seed/oz/400/225" },
      { title: "Money Heist", year: 2021, match: "93%", duration: "S5:E3", img: "https://picsum.photos/seed/mh/400/225" },
      { title: "Narcos", year: 2018, match: "92%", duration: "S3:E8", img: "https://picsum.photos/seed/nc/400/225" },
    ],
  },
  {
    label: "Trending Now",
    items: [
      { title: "Wednesday", year: 2024, match: "94%", duration: "1h 52m", img: "https://picsum.photos/seed/wed/400/225" },
      { title: "Glass Onion", year: 2023, match: "91%", duration: "2h 19m", img: "https://picsum.photos/seed/go/400/225" },
      { title: "All Quiet on the Western Front", year: 2023, match: "96%", duration: "2h 28m", img: "https://picsum.photos/seed/aq/400/225" },
      { title: "The Adam Project", year: 2024, match: "88%", duration: "1h 46m", img: "https://picsum.photos/seed/ap/400/225" },
      { title: "Enola Holmes 2", year: 2023, match: "90%", duration: "2h 9m", img: "https://picsum.photos/seed/eh/400/225" },
      { title: "Don't Look Up", year: 2022, match: "87%", duration: "2h 18m", img: "https://picsum.photos/seed/dlu/400/225" },
    ],
  },
  {
    label: "Popular on Netflix",
    items: [
      { title: "Squid Game", year: 2021, match: "97%", duration: "S1:E9", img: "https://picsum.photos/seed/sg/400/225" },
      { title: "Bridgerton", year: 2024, match: "89%", duration: "S3:E4", img: "https://picsum.photos/seed/bg/400/225" },
      { title: "The Crown", year: 2023, match: "95%", duration: "S6:E1", img: "https://picsum.photos/seed/tc/400/225" },
      { title: "Lupin", year: 2023, match: "93%", duration: "S3:E2", img: "https://picsum.photos/seed/lp/400/225" },
      { title: "You", year: 2024, match: "91%", duration: "S5:E1", img: "https://picsum.photos/seed/you/400/225" },
      { title: "Cobra Kai", year: 2024, match: "90%", duration: "S6:E5", img: "https://picsum.photos/seed/ck/400/225" },
    ],
  },
  {
    label: "Top 10 Today",
    items: [
      { title: "The Night Agent", year: 2024, match: "92%", duration: "S2:E1", img: "https://picsum.photos/seed/na/400/225" },
      { title: "Beef", year: 2023, match: "96%", duration: "1h 30m", img: "https://picsum.photos/seed/bf/400/225" },
      { title: "Black Mirror", year: 2024, match: "94%", duration: "S7:E3", img: "https://picsum.photos/seed/bm/400/225" },
      { title: "Extraction 2", year: 2023, match: "88%", duration: "2h 2m", img: "https://picsum.photos/seed/ex/400/225" },
      { title: "The Diplomat", year: 2024, match: "91%", duration: "S2:E1", img: "https://picsum.photos/seed/td/400/225" },
      { title: "Manifest", year: 2023, match: "85%", duration: "S4:E10", img: "https://picsum.photos/seed/mf/400/225" },
    ],
  },
];

function RowSlider({ row }: { row: typeof ROWS[0] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <div className="mb-8">
      <h2 className="mb-3 pl-12 text-xl font-bold text-foreground">{row.label}</h2>
      <div className="group/row relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover/row:opacity-100"
        >
          <ChevronLeft className="text-foreground" size={28} />
        </button>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto px-12"
        >
          {row.items.map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 cursor-pointer transition-transform duration-300"
              style={{ width: 240 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`overflow-hidden rounded-md transition-all duration-300 ${
                  hovered === i ? "scale-110 z-20 shadow-2xl" : ""
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-[135px] w-full object-cover"
                  loading="lazy"
                />
                {hovered === i && (
                  <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-card p-3">
                    <div className="mb-2 flex gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                        <Play size={14} fill="currentColor" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground/40 text-foreground hover:border-foreground">
                        <Plus size={16} />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground/40 text-foreground hover:border-foreground">
                        <ThumbsUp size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="font-semibold text-green-500">{item.match}</span>
                      <span className="text-muted-foreground">{item.year}</span>
                      <span className="text-muted-foreground">{item.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover/row:opacity-100"
        >
          <ChevronRight className="text-foreground" size={28} />
        </button>
      </div>
    </div>
  );
}

export default function ClassicBrowse() {
  const { resetAll } = useMood();
  const hero = ROWS[1].items[0];

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nav bar */}
      <nav className="fixed top-0 z-40 flex w-full items-center gap-6 bg-gradient-to-b from-background/90 to-transparent px-12 py-4">
        <h1
          className="text-2xl font-extrabold tracking-tighter text-primary"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          NETFLIX
        </h1>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Home</span>
          <span className="cursor-pointer hover:text-foreground">TV Shows</span>
          <span className="cursor-pointer hover:text-foreground">Movies</span>
          <span className="cursor-pointer hover:text-foreground">New & Popular</span>
          <span className="cursor-pointer hover:text-foreground">My List</span>
        </div>
        <button
          onClick={resetAll}
          className="ml-auto text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
      </nav>

      {/* Hero banner */}
      <div className="relative h-[56vh] w-full">
        <img
          src={hero.img}
          alt={hero.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-16 left-12 max-w-lg">
          <h2 className="mb-3 text-5xl font-black text-foreground">{hero.title}</h2>
          <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
            A gripping story that will keep you on the edge of your seat from start to finish. Critically acclaimed and universally loved.
          </p>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-md bg-foreground px-6 py-2 font-semibold text-background hover:bg-foreground/80">
              <Play size={20} fill="currentColor" /> Play
            </button>
            <button className="flex items-center gap-2 rounded-md bg-muted/60 px-6 py-2 font-semibold text-foreground hover:bg-muted/80">
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="-mt-12 relative z-10 pb-16">
        {ROWS.map((row, i) => (
          <RowSlider key={i} row={row} />
        ))}
      </div>
    </motion.div>
  );
}
