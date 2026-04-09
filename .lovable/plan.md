

## Plan: Move Settings to Account Icon in Session Starter

### What changes

1. **`src/components/LandingChoice.tsx`** — Remove the Settings card from the CARDS array (keep only Continue Watching, Browse, Curate My Night). Update the grid to `sm:grid-cols-3`.

2. **`src/components/SessionStarter.tsx`** — Import `User` from `lucide-react`. Add a `User` icon button in the top-right corner (`absolute right-6 top-6`) that navigates to `setStep("settings")`. This gives access to the same settings/account content that was previously a landing card.

### Technical details
- The `User` icon is already available in lucide-react (used in SettingsScreen)
- The settings step and SettingsScreen component remain unchanged — only the entry point moves
- Grid changes from `sm:grid-cols-4` to `sm:grid-cols-3` for balanced layout with 3 cards

