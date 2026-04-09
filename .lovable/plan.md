

## Plan: Enhance TitleCard, Browse Sections, and Filter Panel

This is a large set of changes across multiple files. Here is a breakdown:

---

### 1. TitleCard Enhancements (`src/components/TitleCard.tsx`)

**Hero image with auto-playing muted 5-minute video preview and unmute button:**
- Replace the static shimmer preview area with a simulated auto-playing video preview (animated gradient or embedded placeholder video loop). The mute/unmute toggle already exists at the top-right — wire it to visually toggle an "audio active" state indicator.

**"Hear the Story" button with AI-narrated audio controls:**
- When clicked, show an inline audio player bar with play/pause, skip (forward 10s), and a progress indicator. Use a mock 60-second timer that counts down. The button text changes to show playback state.

**Add to List, Share, and Watch Now CTAs:**
- Replace the single "Play" button at the bottom of the hover overlay with a row of three buttons: "Add to List" (Plus icon), "Share" (Share2 icon), and "Watch Now" (Play icon, primary styled).

**Loyalty tier badge on user avatar:**
- Add a small colored badge (Bronze/Gold/Platinum dot or icon) on the TitleCard's top-left area or near the user-facing elements. Since TitleCard doesn't have a user avatar, the badge will be added to the **LandingChoice** User icon and the **ProfileScreen** avatar area instead.

### 2. Loyalty Badge on User Avatar (`src/components/LandingChoice.tsx`, `src/components/ProfileScreen.tsx`)

- Wrap the User icon on LandingChoice with a relative container and overlay a small colored circle (Gold by default, matching the mock user's tier from ProfileScreen).
- On ProfileScreen, add the tier badge next to or on top of the avatar.

### 3. Browse Section Visual Grouping (`src/components/ClassicBrowse.tsx`)

**Aggregate sections with distinct colors and headings:**

- **Quick Discovery** (New Releases + Last Chance to Watch): Wrap in a container with a subtle left-border accent (e.g., teal `border-l-4 border-teal-500`) and a section header "Quick Discovery".
- **Mood Rooms** (Recharge, Escape, Reflect, Connect): Already has a heading. Add a distinct accent color (e.g., purple `border-l-4 border-purple-500`) and subtle background tint.
- **Genre Rooms** (Action, Drama, Comedy, Thriller, Documentary): Add a "Genre Rooms" section header with its own accent color (e.g., amber `border-l-4 border-amber-500`).

Each section gets a slightly different background shade to visually separate them.

### 4. Filter Panel Redesign (`src/components/ClassicBrowse.tsx`)

**Replace current filters with four categories:**
- **Genre** (multi-select) — keep existing implementation
- **Main Character** (text search) — rename existing "Character Type" multi-select to a text search input for "Main Character"
- **Director** (text search) — keep existing
- **Release Year** (range: from/to inputs) — keep existing

**Changes to Filters interface:**
- Replace `charTypes: string[]` with `characterSearch: string` (text search)
- Update `matchesFilters` accordingly
- Update `FilterChips` to handle the new character search chip
- Background of filter panel: `bg-[#141414]`

**Active filter chips in header** — already implemented with `FilterChips` component. Will remain as-is with updated chip types.

**Clear All button** — already present.

---

### Technical Details

**Files modified:**

| File | Changes |
|------|---------|
| `src/components/TitleCard.tsx` | Add video preview area, audio player for "Hear the Story", replace Play with 3 CTAs (Add to List, Share, Watch Now) |
| `src/components/ClassicBrowse.tsx` | Wrap rows in colored section containers (Quick Discovery, Mood Rooms, Genre Rooms); replace charTypes filter with characterSearch text input; set filter panel bg to #141414 |
| `src/components/LandingChoice.tsx` | Add Gold loyalty badge dot on User icon |
| `src/components/ProfileScreen.tsx` | Add loyalty tier badge next to avatar |

**No new dependencies required** — all icons come from lucide-react (Plus, Share2, SkipForward, Pause already available).

