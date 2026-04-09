

## Plan: Fix Ugly Horizontal Scroll in Browse Rows

### Problem
The `RowSlider` component uses a `scrollbar-hide` CSS class that doesn't exist anywhere in the project. This means the native browser scrollbar is visible on the horizontal scroll rows, which looks out of place with the dark Netflix-style UI.

### Solution

**`src/index.css`** — Add a `scrollbar-hide` utility class that hides scrollbars across all browsers while preserving scroll functionality:

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

This is a single CSS addition — no component changes needed. The `scrollbar-hide` class is already applied to the scroll containers in `ClassicBrowse.tsx` (line 245), it just needs the actual CSS definition.

