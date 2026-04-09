

## Plan: Adjust Curated Surface Grid and CTA Button Sizes

### Changes

**`src/components/CuratedSurface.tsx`**
- Reduce titles from 12 to 9: `MOCK_TITLES.slice(0, 9)`
- Change grid to fixed 3 columns: `grid-cols-2 sm:grid-cols-3` → `grid-cols-3` with appropriate gap

**`src/components/TitleCard.tsx`**
- Shrink CTA buttons: reduce padding from `py-2` / `py-2.5` to `py-1` / `py-1.5`, icon sizes from 14/16 to 10/12, text from `text-xs`/`text-sm` to `text-[10px]`/`text-xs`, and gap from `gap-2` to `gap-1.5`

