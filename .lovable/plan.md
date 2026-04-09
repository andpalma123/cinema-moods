

## Plan: Reshuffle Rejected Titles Instead of Removing

### Problem
Currently, clicking the reject (X) button on a curated card removes it entirely, shrinking the grid. Instead, it should replace the rejected title with a new one from the remaining pool.

### Changes

**`src/components/CuratedSurface.tsx`**

- Track rejected IDs in a `Set` so they are never re-used.
- Change `handleReject`: instead of filtering out the card, find the next available title from `MOCK_TITLES` that isn't already displayed and hasn't been rejected, then swap it in at the same position.
- If no replacement titles remain (pool exhausted), show a brief toast or keep the card as-is.
- Add a subtle swap animation using framer-motion's `AnimatePresence` with a key change to visually indicate the reshuffle.

### Technical Detail

```
const [rejected, setRejected] = useState<Set<number>>(new Set());

const handleReject = (id: number) => {
  const currentIds = new Set(titles.map(t => t.id));
  const replacement = MOCK_TITLES.find(t => !currentIds.has(t.id) && !rejected.has(t.id));
  setRejected(prev => new Set(prev).add(id));
  if (replacement) {
    setTitles(prev => prev.map(t => t.id === id ? replacement : t));
  }
  // If no replacement available, card stays (pool exhausted)
};
```

Only `src/components/CuratedSurface.tsx` is modified. No other files affected.

