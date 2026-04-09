import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";
import {
  ChevronLeft, Play, Plus, ThumbsUp, ChevronRight, Info,
  SlidersHorizontal, X, Users, Clock, MessageSquare, Heart, List, Sparkles,
} from "lucide-react";
import { useRef, useState, useMemo, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface BrowseItem {
  title: string;
  year: number;
  match: string;
  duration: string;
  img: string;
  genre: string;
  director: string;
  charType: string;
  badge?: "new" | "expiring";
  daysLeft?: number;
}

const DISCOVERY_NEW: BrowseItem[] = [
  { title: "Ripple Effect", year: 2026, match: "94%", duration: "1h 58m", img: "https://picsum.photos/seed/rip/400/225", genre: "Drama", director: "Greta Gerwig", charType: "Anti-hero", badge: "new" },
  { title: "Neon Divide", year: 2026, match: "91%", duration: "2h 05m", img: "https://picsum.photos/seed/nd/400/225", genre: "Sci-Fi", director: "Denis Villeneuve", charType: "Visionary", badge: "new" },
  { title: "Soft Landing", year: 2026, match: "89%", duration: "1h 42m", img: "https://picsum.photos/seed/sl/400/225", genre: "Comedy", director: "Taika Waititi", charType: "Underdog", badge: "new" },
  { title: "The Quiet Hours", year: 2026, match: "93%", duration: "1h 50m", img: "https://picsum.photos/seed/tqh/400/225", genre: "Drama", director: "Chloe Zhao", charType: "Loner", badge: "new" },
  { title: "Circuit Breaker", year: 2026, match: "90%", duration: "2h 10m", img: "https://picsum.photos/seed/cb2/400/225", genre: "Action", director: "Christopher Nolan", charType: "Genius", badge: "new" },
  { title: "Bloom Season", year: 2026, match: "88%", duration: "1h 35m", img: "https://picsum.photos/seed/bs2/400/225", genre: "Romance", director: "Greta Gerwig", charType: "Dreamer", badge: "new" },
];

const DISCOVERY_EXPIRING: BrowseItem[] = [
  { title: "Velvet Buzzsaw", year: 2019, match: "82%", duration: "1h 53m", img: "https://picsum.photos/seed/vb/400/225", genre: "Thriller", director: "Dan Gilroy", charType: "Anti-hero", badge: "expiring", daysLeft: 3 },
  { title: "The Ritual", year: 2017, match: "86%", duration: "1h 34m", img: "https://picsum.photos/seed/tr/400/225", genre: "Horror", director: "David Bruckner", charType: "Everyman", badge: "expiring", daysLeft: 5 },
  { title: "IO", year: 2019, match: "79%", duration: "1h 36m", img: "https://picsum.photos/seed/io/400/225", genre: "Sci-Fi", director: "Jonathan Helpert", charType: "Loner", badge: "expiring", daysLeft: 2 },
  { title: "Calibre", year: 2018, match: "90%", duration: "1h 41m", img: "https://picsum.photos/seed/cal/400/225", genre: "Thriller", director: "Matt Palmer", charType: "Everyman", badge: "expiring", daysLeft: 6 },
  { title: "Tau", year: 2018, match: "77%", duration: "1h 37m", img: "https://picsum.photos/seed/tau/400/225", genre: "Sci-Fi", director: "Federico D'Alessandro", charType: "Genius", badge: "expiring", daysLeft: 1 },
  { title: "The Cloverfield Paradox", year: 2018, match: "81%", duration: "1h 42m", img: "https://picsum.photos/seed/tcp/400/225", genre: "Sci-Fi", director: "Julius Onah", charType: "Visionary", badge: "expiring", daysLeft: 4 },
];

const MOOD_ROOMS: { label: string; items: BrowseItem[] }[] = [
  {
    label: "Recharge",
    items: [
      { title: "Chef's Table", year: 2023, match: "96%", duration: "45m", img: "https://picsum.photos/seed/ct/400/225", genre: "Documentary", director: "David Gelb", charType: "Visionary" },
      { title: "Our Planet", year: 2022, match: "98%", duration: "50m", img: "https://picsum.photos/seed/op/400/225", genre: "Documentary", director: "Alastair Fothergill", charType: "Narrator" },
      { title: "Headspace", year: 2023, match: "94%", duration: "20m", img: "https://picsum.photos/seed/hs/400/225", genre: "Documentary", director: "Vince Grashaw", charType: "Guide" },
      { title: "Abstract", year: 2021, match: "93%", duration: "45m", img: "https://picsum.photos/seed/abs/400/225", genre: "Documentary", director: "Scott Dadich", charType: "Visionary" },
      { title: "Midnight Diner", year: 2022, match: "95%", duration: "30m", img: "https://picsum.photos/seed/md/400/225", genre: "Drama", director: "Joji Matsuoka", charType: "Sage" },
      { title: "Salt Fat Acid Heat", year: 2020, match: "92%", duration: "50m", img: "https://picsum.photos/seed/sfah/400/225", genre: "Documentary", director: "Caroline Suh", charType: "Guide" },
    ],
  },
  {
    label: "Escape",
    items: [
      { title: "Stranger Things", year: 2022, match: "98%", duration: "S4:E7", img: "https://picsum.photos/seed/st/400/225", genre: "Sci-Fi", director: "The Duffer Brothers", charType: "Underdog" },
      { title: "The Witcher", year: 2023, match: "95%", duration: "S3:E2", img: "https://picsum.photos/seed/tw/400/225", genre: "Fantasy", director: "Lauren S. Hissrich", charType: "Anti-hero" },
      { title: "Dark", year: 2020, match: "97%", duration: "S2:E5", img: "https://picsum.photos/seed/dk/400/225", genre: "Sci-Fi", director: "Baran bo Odar", charType: "Loner" },
      { title: "Shadow and Bone", year: 2023, match: "91%", duration: "S2:E4", img: "https://picsum.photos/seed/sb/400/225", genre: "Fantasy", director: "Eric Heisserer", charType: "Chosen One" },
      { title: "Alice in Borderland", year: 2022, match: "93%", duration: "S2:E1", img: "https://picsum.photos/seed/aib/400/225", genre: "Action", director: "Shinsuke Sato", charType: "Underdog" },
      { title: "1899", year: 2022, match: "90%", duration: "S1:E5", img: "https://picsum.photos/seed/1899/400/225", genre: "Sci-Fi", director: "Baran bo Odar", charType: "Everyman" },
    ],
  },
  {
    label: "Reflect",
    items: [
      { title: "The Crown", year: 2023, match: "95%", duration: "S6:E1", img: "https://picsum.photos/seed/tc/400/225", genre: "Drama", director: "Peter Morgan", charType: "Leader" },
      { title: "Black Mirror", year: 2024, match: "94%", duration: "S7:E3", img: "https://picsum.photos/seed/bm/400/225", genre: "Sci-Fi", director: "Charlie Brooker", charType: "Everyman" },
      { title: "Mindhunter", year: 2019, match: "97%", duration: "S2:E9", img: "https://picsum.photos/seed/mh2/400/225", genre: "Thriller", director: "David Fincher", charType: "Genius" },
      { title: "The Social Dilemma", year: 2020, match: "92%", duration: "1h 34m", img: "https://picsum.photos/seed/tsd/400/225", genre: "Documentary", director: "Jeff Orlowski", charType: "Narrator" },
      { title: "Making a Murderer", year: 2018, match: "93%", duration: "S2:E10", img: "https://picsum.photos/seed/mam/400/225", genre: "Documentary", director: "Moira Demos", charType: "Everyman" },
      { title: "Wild Wild Country", year: 2018, match: "91%", duration: "S1:E6", img: "https://picsum.photos/seed/wwc/400/225", genre: "Documentary", director: "Chapman Way", charType: "Anti-hero" },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Heartstopper", year: 2024, match: "96%", duration: "S3:E1", img: "https://picsum.photos/seed/hst/400/225", genre: "Romance", director: "Euros Lyn", charType: "Underdog" },
      { title: "Sex Education", year: 2023, match: "94%", duration: "S4:E8", img: "https://picsum.photos/seed/se/400/225", genre: "Comedy", director: "Ben Taylor", charType: "Underdog" },
      { title: "Queer Eye", year: 2023, match: "93%", duration: "S8:E3", img: "https://picsum.photos/seed/qe/400/225", genre: "Reality", director: "David Collins", charType: "Guide" },
      { title: "Never Have I Ever", year: 2023, match: "91%", duration: "S4:E10", img: "https://picsum.photos/seed/nhie/400/225", genre: "Comedy", director: "Mindy Kaling", charType: "Underdog" },
      { title: "Atypical", year: 2021, match: "95%", duration: "S4:E10", img: "https://picsum.photos/seed/at/400/225", genre: "Comedy", director: "Robia Rashid", charType: "Underdog" },
      { title: "The Good Place", year: 2020, match: "96%", duration: "S4:E13", img: "https://picsum.photos/seed/tgp/400/225", genre: "Comedy", director: "Michael Schur", charType: "Anti-hero" },
    ],
  },
];

const GENRE_ROWS: { label: string; items: BrowseItem[] }[] = [
  {
    label: "Action & Thriller",
    items: [
      { title: "Extraction 2", year: 2023, match: "88%", duration: "2h 2m", img: "https://picsum.photos/seed/ex/400/225", genre: "Action", director: "Sam Hargrave", charType: "Anti-hero" },
      { title: "The Night Agent", year: 2024, match: "92%", duration: "S2:E1", img: "https://picsum.photos/seed/na/400/225", genre: "Thriller", director: "Shawn Ryan", charType: "Underdog" },
      { title: "Money Heist", year: 2021, match: "93%", duration: "S5:E3", img: "https://picsum.photos/seed/mh/400/225", genre: "Action", director: "Alex Pina", charType: "Genius" },
      { title: "Ozark", year: 2022, match: "96%", duration: "S4:E10", img: "https://picsum.photos/seed/oz/400/225", genre: "Thriller", director: "Jason Bateman", charType: "Anti-hero" },
      { title: "Narcos", year: 2018, match: "92%", duration: "S3:E8", img: "https://picsum.photos/seed/nc/400/225", genre: "Action", director: "Chris Brancato", charType: "Anti-hero" },
      { title: "The Diplomat", year: 2024, match: "91%", duration: "S2:E1", img: "https://picsum.photos/seed/td/400/225", genre: "Thriller", director: "Debora Cahn", charType: "Leader" },
    ],
  },
  {
    label: "Drama",
    items: [
      { title: "The Crown", year: 2023, match: "95%", duration: "S6:E1", img: "https://picsum.photos/seed/tc2/400/225", genre: "Drama", director: "Peter Morgan", charType: "Leader" },
      { title: "Beef", year: 2023, match: "96%", duration: "1h 30m", img: "https://picsum.photos/seed/bf/400/225", genre: "Drama", director: "Lee Sung Jin", charType: "Everyman" },
      { title: "All Quiet on the Western Front", year: 2023, match: "96%", duration: "2h 28m", img: "https://picsum.photos/seed/aq/400/225", genre: "Drama", director: "Edward Berger", charType: "Everyman" },
      { title: "Manifest", year: 2023, match: "85%", duration: "S4:E10", img: "https://picsum.photos/seed/mf/400/225", genre: "Drama", director: "Jeff Rake", charType: "Everyman" },
      { title: "Squid Game", year: 2021, match: "97%", duration: "S1:E9", img: "https://picsum.photos/seed/sg/400/225", genre: "Drama", director: "Hwang Dong-hyuk", charType: "Underdog" },
      { title: "Lupin", year: 2023, match: "93%", duration: "S3:E2", img: "https://picsum.photos/seed/lp/400/225", genre: "Drama", director: "George Kay", charType: "Genius" },
    ],
  },
  {
    label: "Comedy",
    items: [
      { title: "Wednesday", year: 2024, match: "94%", duration: "1h 52m", img: "https://picsum.photos/seed/wed/400/225", genre: "Comedy", director: "Tim Burton", charType: "Anti-hero" },
      { title: "Glass Onion", year: 2023, match: "91%", duration: "2h 19m", img: "https://picsum.photos/seed/go/400/225", genre: "Comedy", director: "Rian Johnson", charType: "Genius" },
      { title: "Enola Holmes 2", year: 2023, match: "90%", duration: "2h 9m", img: "https://picsum.photos/seed/eh/400/225", genre: "Comedy", director: "Harry Bradbeer", charType: "Underdog" },
      { title: "Don't Look Up", year: 2022, match: "87%", duration: "2h 18m", img: "https://picsum.photos/seed/dlu/400/225", genre: "Comedy", director: "Adam McKay", charType: "Everyman" },
      { title: "The Adam Project", year: 2024, match: "88%", duration: "1h 46m", img: "https://picsum.photos/seed/ap/400/225", genre: "Comedy", director: "Shawn Levy", charType: "Underdog" },
      { title: "Cobra Kai", year: 2024, match: "90%", duration: "S6:E5", img: "https://picsum.photos/seed/ck/400/225", genre: "Action", director: "Jon Hurwitz", charType: "Underdog" },
    ],
  },
  {
    label: "Sci-Fi & Fantasy",
    items: [
      { title: "3 Body Problem", year: 2024, match: "93%", duration: "S1:E8", img: "https://picsum.photos/seed/3bp/400/225", genre: "Sci-Fi", director: "David Benioff", charType: "Genius" },
      { title: "Altered Carbon", year: 2020, match: "90%", duration: "S2:E8", img: "https://picsum.photos/seed/ac/400/225", genre: "Sci-Fi", director: "Laeta Kalogridis", charType: "Anti-hero" },
      { title: "Bridgerton", year: 2024, match: "89%", duration: "S3:E4", img: "https://picsum.photos/seed/bg/400/225", genre: "Romance", director: "Chris Van Dusen", charType: "Dreamer" },
      { title: "You", year: 2024, match: "91%", duration: "S5:E1", img: "https://picsum.photos/seed/you/400/225", genre: "Thriller", director: "Greg Berlanti", charType: "Anti-hero" },
      { title: "Black Mirror", year: 2024, match: "94%", duration: "S7:E3", img: "https://picsum.photos/seed/bm2/400/225", genre: "Sci-Fi", director: "Charlie Brooker", charType: "Everyman" },
      { title: "Love, Death & Robots", year: 2022, match: "95%", duration: "S3:E9", img: "https://picsum.photos/seed/ldr/400/225", genre: "Sci-Fi", director: "Tim Miller", charType: "Visionary" },
    ],
  },
  {
    label: "Horror",
    items: [
      { title: "The Haunting of Hill House", year: 2018, match: "96%", duration: "S1:E10", img: "https://picsum.photos/seed/hh/400/225", genre: "Horror", director: "Mike Flanagan", charType: "Everyman" },
      { title: "Midnight Mass", year: 2021, match: "94%", duration: "S1:E7", img: "https://picsum.photos/seed/mm/400/225", genre: "Horror", director: "Mike Flanagan", charType: "Loner" },
      { title: "Fear Street", year: 2021, match: "88%", duration: "1h 47m", img: "https://picsum.photos/seed/fs/400/225", genre: "Horror", director: "Leigh Janiak", charType: "Underdog" },
      { title: "The Platform", year: 2019, match: "91%", duration: "1h 34m", img: "https://picsum.photos/seed/tp/400/225", genre: "Horror", director: "Galder Gaztelu-Urrutia", charType: "Everyman" },
      { title: "Apostle", year: 2018, match: "85%", duration: "2h 10m", img: "https://picsum.photos/seed/apo/400/225", genre: "Horror", director: "Gareth Evans", charType: "Anti-hero" },
      { title: "His House", year: 2020, match: "92%", duration: "1h 33m", img: "https://picsum.photos/seed/hhs/400/225", genre: "Horror", director: "Remi Weekes", charType: "Everyman" },
    ],
  },
  {
    label: "Documentary",
    items: [
      { title: "The Social Dilemma", year: 2020, match: "92%", duration: "1h 34m", img: "https://picsum.photos/seed/tsd2/400/225", genre: "Documentary", director: "Jeff Orlowski", charType: "Narrator" },
      { title: "My Octopus Teacher", year: 2020, match: "95%", duration: "1h 25m", img: "https://picsum.photos/seed/mot/400/225", genre: "Documentary", director: "Pippa Ehrlich", charType: "Guide" },
      { title: "American Factory", year: 2019, match: "90%", duration: "1h 50m", img: "https://picsum.photos/seed/af/400/225", genre: "Documentary", director: "Steven Bognar", charType: "Everyman" },
      { title: "The Tinder Swindler", year: 2022, match: "87%", duration: "1h 54m", img: "https://picsum.photos/seed/ts/400/225", genre: "Documentary", director: "Felicity Morris", charType: "Anti-hero" },
      { title: "Seaspiracy", year: 2021, match: "88%", duration: "1h 29m", img: "https://picsum.photos/seed/ss/400/225", genre: "Documentary", director: "Ali Tabrizi", charType: "Narrator" },
      { title: "Fyre", year: 2019, match: "91%", duration: "1h 37m", img: "https://picsum.photos/seed/fyre/400/225", genre: "Documentary", director: "Chris Smith", charType: "Anti-hero" },
    ],
  },
];

/* Collect all unique values for filters */
const ALL_ITEMS: BrowseItem[] = [
  ...DISCOVERY_NEW, ...DISCOVERY_EXPIRING,
  ...MOOD_ROOMS.flatMap((r) => r.items),
  ...GENRE_ROWS.flatMap((r) => r.items),
];
const UNIQUE_GENRES = [...new Set(ALL_ITEMS.map((i) => i.genre))].sort();
const UNIQUE_CHAR_TYPES = [...new Set(ALL_ITEMS.map((i) => i.charType))].sort();
const UNIQUE_YEARS = [...new Set(ALL_ITEMS.map((i) => i.year))].sort((a, b) => b - a);
const MIN_YEAR = Math.min(...UNIQUE_YEARS);
const MAX_YEAR = Math.max(...UNIQUE_YEARS);

/* ------------------------------------------------------------------ */
/*  FILTER TYPES                                                      */
/* ------------------------------------------------------------------ */
interface Filters {
  genres: string[];
  directorSearch: string;
  charTypes: string[];
  yearFrom: number;
  yearTo: number;
}
const EMPTY_FILTERS: Filters = { genres: [], directorSearch: "", charTypes: [], yearFrom: MIN_YEAR, yearTo: MAX_YEAR };

function matchesFilters(item: BrowseItem, filters: Filters) {
  if (filters.genres.length && !filters.genres.includes(item.genre)) return false;
  if (filters.directorSearch && !item.director.toLowerCase().includes(filters.directorSearch.toLowerCase())) return false;
  if (filters.charTypes.length && !filters.charTypes.includes(item.charType)) return false;
  if (item.year < filters.yearFrom || item.year > filters.yearTo) return false;
  return true;
}

const hasActiveFilters = (f: Filters) =>
  f.genres.length > 0 || f.directorSearch !== "" || f.charTypes.length > 0 || f.yearFrom !== MIN_YEAR || f.yearTo !== MAX_YEAR;

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                        */
/* ------------------------------------------------------------------ */

function DiscoveryBadge({ type, daysLeft }: { type: "new" | "expiring"; daysLeft?: number }) {
  if (type === "new") {
    return (
      <span className="absolute left-2 top-2 z-10 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
        New
      </span>
    );
  }
  return (
    <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
      <Clock size={10} /> {daysLeft}d left
    </span>
  );
}

function RowSlider({
  row,
  filters,
}: {
  row: { label: string; items: BrowseItem[] };
  filters: Filters;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = useMemo(
    () => (hasActiveFilters(filters) ? row.items.filter((i) => matchesFilters(i, filters)) : row.items),
    [row.items, filters]
  );

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  if (filtered.length === 0) return null;

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
        <div ref={scrollRef} className="scrollbar-hide flex gap-2 overflow-x-auto px-12">
          {filtered.map((item, i) => (
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
                {item.badge && <DiscoveryBadge type={item.badge} daysLeft={item.daysLeft} />}
                <img src={item.img} alt={item.title} className="h-[135px] w-full object-cover" loading="lazy" />
                {/* Title and year always visible */}
                <div className="bg-card/90 px-2 py-1.5">
                  <p className="truncate text-xs font-semibold text-foreground">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.year}</p>
                </div>
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

/* ------------------------------------------------------------------ */
/*  FILTER PANEL                                                      */
/* ------------------------------------------------------------------ */

function MultiSelect({
  label,
  options,
  selected,
  toggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  toggle: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              onClick={() => toggle(o)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterPanel({
  filters,
  setFilters,
  onClose,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClose: () => void;
}) {
  const toggleGenre = useCallback(
    (val: string) => {
      setFilters((prev) => ({
        ...prev,
        genres: prev.genres.includes(val) ? prev.genres.filter((v) => v !== val) : [...prev.genres, val],
      }));
    },
    [setFilters]
  );

  const toggleCharType = useCallback(
    (val: string) => {
      setFilters((prev) => ({
        ...prev,
        charTypes: prev.charTypes.includes(val) ? prev.charTypes.filter((v) => v !== val) : [...prev.charTypes, val],
      }));
    },
    [setFilters]
  );

  return (
    <motion.div
      className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-border bg-card p-6 shadow-2xl"
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      exit={{ x: -320 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
      </div>

      <MultiSelect label="Genre" options={UNIQUE_GENRES} selected={filters.genres} toggle={toggleGenre} />
      <MultiSelect label="Character Type" options={UNIQUE_CHAR_TYPES} selected={filters.charTypes} toggle={toggleCharType} />

      {/* Director - text input */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Director</p>
        <input
          type="text"
          placeholder="Search director..."
          value={filters.directorSearch}
          onChange={(e) => setFilters((prev) => ({ ...prev, directorSearch: e.target.value }))}
          className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Release Year - range */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Release Year</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={filters.yearFrom}
            onChange={(e) => setFilters((prev) => ({ ...prev, yearFrom: Number(e.target.value) }))}
            className="w-20 rounded-lg border border-border bg-secondary px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <input
            type="number"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={filters.yearTo}
            onChange={(e) => setFilters((prev) => ({ ...prev, yearTo: Number(e.target.value) }))}
            className="w-20 rounded-lg border border-border bg-secondary px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {hasActiveFilters(filters) && (
        <button
          onClick={() => setFilters(EMPTY_FILTERS)}
          className="mt-2 w-full rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
        >
          Clear All Filters
        </button>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMMUNITY PANEL                                                   */
/* ------------------------------------------------------------------ */

const MOCK_CLUBS = [
  { name: "Sci-Fi Collective", members: 12400 },
  { name: "True Crime Addicts", members: 8900 },
  { name: "K-Drama Lovers", members: 15200 },
  { name: "Documentary Deep Dive", members: 6700 },
];

const MOCK_LISTS = [
  { name: "Weekend Binge: Dark Thrillers", author: "sarah_m", count: 12 },
  { name: "Feel-Good Movies Only", author: "jk_films", count: 8 },
  { name: "Under 90 Minutes", author: "busy_bee", count: 15 },
];

const MOCK_THREADS = [
  { title: "Is Squid Game S2 worth it?", replies: 234, hot: true },
  { title: "Best sci-fi endings of all time", replies: 89, hot: false },
  { title: "Underrated comedies thread", replies: 156, hot: true },
];

const SHARED_TASTES = [
  { friend: "Alex R.", overlap: 78, topShared: ["Dark", "Black Mirror", "Mindhunter"] },
  { friend: "Maya L.", overlap: 65, topShared: ["Heartstopper", "Sex Education", "The Good Place"] },
];

function CommunityPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"clubs" | "lists" | "threads" | "shared">("clubs");

  return (
    <motion.div
      className="fixed inset-y-0 right-0 z-50 w-96 overflow-y-auto border-l border-border bg-card shadow-2xl"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sticky top-0 z-10 border-b border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Community</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="flex gap-1">
          {(
            [
              { key: "clubs", label: "Fan Clubs", icon: Heart },
              { key: "lists", label: "Lists", icon: List },
              { key: "threads", label: "Discuss", icon: MessageSquare },
              { key: "shared", label: "Shared", icon: Sparkles },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {tab === "clubs" && (
          <div className="space-y-3">
            {MOCK_CLUBS.map((club) => (
              <div key={club.name} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.members.toLocaleString()} members</p>
                </div>
                <button className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20">
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "lists" && (
          <div className="space-y-3">
            {MOCK_LISTS.map((list) => (
              <div key={list.name} className="rounded-xl bg-secondary/60 p-3">
                <p className="text-sm font-semibold text-foreground">{list.name}</p>
                <p className="text-xs text-muted-foreground">
                  by @{list.author} - {list.count} titles
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "threads" && (
          <div className="space-y-3">
            {MOCK_THREADS.map((thread) => (
              <div key={thread.title} className="rounded-xl bg-secondary/60 p-3">
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm font-semibold text-foreground">{thread.title}</p>
                  {thread.hot && (
                    <span className="shrink-0 rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      HOT
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{thread.replies} replies</p>
              </div>
            ))}
          </div>
        )}

        {tab === "shared" && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">See how your taste overlaps with friends</p>
            {SHARED_TASTES.map((s) => (
              <div key={s.friend} className="rounded-xl bg-secondary/60 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{s.friend}</p>
                  <span className="text-sm font-bold text-primary">{s.overlap}% match</span>
                </div>
                <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${s.overlap}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Top shared: {s.topShared.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FILTER CHIPS                                                      */
/* ------------------------------------------------------------------ */

function FilterChips({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
  const chips: { label: string; remove: () => void }[] = [];

  filters.genres.forEach((g) =>
    chips.push({ label: g, remove: () => setFilters((p) => ({ ...p, genres: p.genres.filter((x) => x !== g) })) })
  );
  filters.charTypes.forEach((c) =>
    chips.push({ label: c, remove: () => setFilters((p) => ({ ...p, charTypes: p.charTypes.filter((x) => x !== c) })) })
  );
  if (filters.directorSearch) {
    chips.push({ label: `Director: ${filters.directorSearch}`, remove: () => setFilters((p) => ({ ...p, directorSearch: "" })) });
  }
  if (filters.yearFrom !== MIN_YEAR || filters.yearTo !== MAX_YEAR) {
    chips.push({ label: `${filters.yearFrom}-${filters.yearTo}`, remove: () => setFilters((p) => ({ ...p, yearFrom: MIN_YEAR, yearTo: MAX_YEAR })) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-medium text-primary"
        >
          {chip.label}
          <button onClick={chip.remove} className="hover:text-primary-foreground">
            <X size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={() => setFilters(EMPTY_FILTERS)}
        className="rounded-full px-2.5 py-1 text-[10px] font-medium text-destructive hover:bg-destructive/10"
      >
        Clear All
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN BROWSE                                                       */
/* ------------------------------------------------------------------ */

export default function ClassicBrowse() {
  const { resetAll } = useMood();
  const hero = GENRE_ROWS[0].items[2];

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <motion.div
      className="min-h-screen bg-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Slide-out panels */}
      <AnimatePresence>
        {showFilters && <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCommunity && <CommunityPanel onClose={() => setShowCommunity(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {(showFilters || showCommunity) && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowFilters(false);
              setShowCommunity(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Nav bar */}
      <nav className="fixed top-0 z-30 flex w-full items-center gap-4 bg-gradient-to-b from-[#141414]/90 to-transparent px-8 py-4 md:px-12">
        <h1 className="text-2xl font-extrabold tracking-tighter text-primary">NETFLIX</h1>
        <div className="hidden gap-5 text-sm text-muted-foreground md:flex">
          <span className="font-semibold text-foreground">Home</span>
          <span className="cursor-pointer hover:text-foreground">TV Shows</span>
          <span className="cursor-pointer hover:text-foreground">Movies</span>
          <span className="cursor-pointer hover:text-foreground">New & Popular</span>
          <span className="cursor-pointer hover:text-foreground">My List</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => {
              setShowFilters((v) => !v);
              setShowCommunity(false);
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              showFilters ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <button
            onClick={() => {
              setShowCommunity((v) => !v);
              setShowFilters(false);
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              showCommunity ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users size={14} />
            Community
          </button>

          <button onClick={resetAll} className="text-sm text-muted-foreground hover:text-foreground">
            Back
          </button>
        </div>
      </nav>

      {/* Active filter chips */}
      {hasActiveFilters(filters) && (
        <div className="fixed top-14 z-20 w-full px-8 py-2 md:px-12">
          <FilterChips filters={filters} setFilters={setFilters} />
        </div>
      )}

      {/* Hero banner */}
      <div className="relative h-[56vh] w-full">
        <img src={hero.img} alt={hero.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute bottom-16 left-8 max-w-lg md:left-12">
          <h2 className="mb-3 text-5xl font-black text-foreground">{hero.title}</h2>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
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

      {/* Content rows */}
      <div className="-mt-12 relative z-10 pb-16">
        {/* Discovery rows above mood rooms */}
        <RowSlider row={{ label: "New Releases", items: DISCOVERY_NEW }} filters={filters} />
        <RowSlider row={{ label: "Last Chance to Watch", items: DISCOVERY_EXPIRING }} filters={filters} />

        {/* Mood Rooms */}
        <h2 className="mb-4 pl-12 text-2xl font-bold text-foreground">Mood Rooms</h2>
        {MOOD_ROOMS.map((row, i) => (
          <RowSlider key={`mood-${i}`} row={row} filters={filters} />
        ))}

        {/* Genre rows - 6 rows */}
        {GENRE_ROWS.map((row, i) => (
          <RowSlider key={`genre-${i}`} row={row} filters={filters} />
        ))}
      </div>
    </motion.div>
  );
}
