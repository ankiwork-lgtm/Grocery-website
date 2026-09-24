# Radha Rani Store — Visual Improvement Tasks

Context: This is a static HTML/CSS/JS grocery store site (`index.html`, `css/style.css`, `css/responsive.css`). The goal of this task is to improve visual polish, CTA hierarchy, and brand consistency **without changing the site's structure, JS logic, or data files**. Only `index.html` and `css/style.css` should need edits.

Work through the tasks below in order. Each task lists the file, the exact selector(s)/markup involved, and the change to make. Test in a browser after each task before moving to the next.

---

## Task 1 — Fix CTA hierarchy in the hero

**Problem:** `.hero-whatsapp-btn` (green, solid) and `.hero-cta-btn` (pink, solid) are both high-contrast, filled buttons sitting close together. There's no clear primary action.

**Goal:** Make WhatsApp the secondary action (outline style) and keep "Shop Daily Deals" as the one clear primary CTA.

**File:** `css/style.css`

Replace the existing `.hero-whatsapp-btn` rule with:

```css
.hero-whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #1ebe5c;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: var(--radius-pill);
  border: 1.5px solid #25D366;
  cursor: pointer;
  width: fit-content;
  margin-bottom: 18px;
  transition: background var(--transition), transform var(--transition);
  box-shadow: none;
}
.hero-whatsapp-btn:hover {
  background: rgba(37,211,102,0.08);
  transform: translateY(-1px);
}
```

Update `.hero-cta-btn` to add slightly more visual weight (it's now the sole primary action):

```css
.hero-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--primary);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  width: fit-content;
  margin-bottom: 20px;
  transition: background var(--transition), transform var(--transition);
  box-shadow: 0 6px 20px rgba(232,61,132,0.35);
}
.hero-cta-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
```

---

## Task 2 — Consolidate hero bubble colors to the brand palette

**Problem:** `.hero-bubble--green`, `--orange`, `--red`, `--purple`, `--teal`, `--pink`, `--blue` use 7 unrelated colors. This looks generic/templated rather than branded.

**Goal:** Use only two color treatments — brand green and brand pink — alternating across the bubbles, matching `--brand-green` / `--brand-green-lt` and `--primary` from the existing `:root` variables.

**File:** `css/style.css`

Replace all seven `.hero-bubble--*` color-variant rules with these two:

```css
.hero-bubble--brand {
  background: var(--brand-green-lt);
  color: var(--brand-green);
  border: 1.5px solid rgba(31,107,69,0.15);
}
.hero-bubble--accent {
  background: #fce7f3;
  color: var(--primary-dark);
  border: 1.5px solid rgba(232,61,132,0.15);
}
```

**File:** `index.html`

In the `.hero-bubbles` block, replace the existing class names (`hero-bubble--green`, `hero-bubble--orange`, `hero-bubble--red`, `hero-bubble--purple`, `hero-bubble--teal`, `hero-bubble--pink`, `hero-bubble--blue`) so the classes **alternate** between `hero-bubble--brand` and `hero-bubble--accent` in the order the bubbles appear. Example:

```html
<div class="hero-bubbles">
  <span class="hero-bubble hero-bubble--brand">🚚 Free Home Delivery</span>
  <span class="hero-bubble hero-bubble--accent">🌾 Unpolished Daal</span>
  <span class="hero-bubble hero-bubble--brand">🌶️ Pure Spices</span>
  <span class="hero-bubble hero-bubble--accent">🥜 Premium Dry Fruits</span>
  <span class="hero-bubble hero-bubble--brand">🧂 No Preservatives</span>
  <span class="hero-bubble hero-bubble--accent">⚖️ Fair Prices</span>
  <span class="hero-bubble hero-bubble--brand">🏡 Trusted by Families</span>
</div>
```

Keep the emoji and text content exactly as-is — only the class names change.

---

## Task 3 — Give the hero visual (basket emoji) a designed backdrop

**Problem:** `.hero-visual-emoji` currently floats alone with no visual context, which reads as unfinished.

**Goal:** Add a soft radial gradient "blob" behind it using the existing brand colors, so it looks intentionally composed. This is a stopgap until real product photography replaces the emoji (see Task 7 note).

**File:** `css/style.css`

Add this new rule directly after the existing `.hero-visual` rule:

```css
.hero-visual::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(232,61,132,0.10) 0%, rgba(31,107,69,0.06) 70%, transparent 100%);
  border-radius: 50%;
  z-index: 0;
}
```

Then update `.hero-visual-emoji` to sit above it:

```css
.hero-visual-emoji {
  position: relative;
  z-index: 1;
  font-size: 100px;
  line-height: 1;
  filter: drop-shadow(0 12px 28px rgba(0,0,0,0.10));
  animation: heroFloat 4s ease-in-out infinite;
}
```

(Keep the existing `@keyframes heroFloat` rule unchanged.)

Also confirm `.hero-visual` has `position: relative;` already set (it does) so the `::before` pseudo-element positions correctly against it, and that `.hero-float-card` elements (which use `position: absolute`) remain visually above the blob — add `z-index: 2;` to `.hero-float-card` if they appear behind it after this change.

---

## Task 4 — Add a trust/stats line under the hero tagline

**Problem:** No social proof appears anywhere in the hero.

**Goal:** Add a small stats row between `.hero-tagline` and `.hero-search-wrap`.

**File:** `index.html`

Locate:
```html
<p class="hero-tagline">Fresh Groceries, Delivered to Your Door</p>
```
Immediately after it, add:
```html
<div class="hero-stats">
  <span>500+ Happy Families</span>
  <span class="hero-stats-dot">•</span>
  <span>⭐ 4.8 Rated</span>
</div>
```

> **IMPORTANT:** These numbers ("500+ Happy Families", "4.8 Rated") are placeholders. Do not treat them as final content — leave a `<!-- TODO: replace with real stats before launch -->` comment directly above this block so the store owner knows to swap in real figures (or remove the block entirely) before publishing.

**File:** `css/style.css`

Add:
```css
.hero-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand-green);
  margin-bottom: 18px;
}
.hero-stats-dot {
  color: var(--text-light);
  font-size: 10px;
}
```

---

## Task 5 — Unify the section-title accent style across WWO and Store Info blocks

**Problem:** Product sections use a white card with a small pink accent bar (`.section-title::before`), but the "What We Offer" (`.wwo-header`) and Store Info (`.store-info-header`) blocks use solid green backgrounds with no shared visual accent — the page currently feels like two different design systems stitched together.

**Goal:** Add the same pink accent-bar treatment to the WWO heading so it visually matches the rest of the page.

**File:** `css/style.css`

Add this new rule near the existing `.wwo-header` / `.wwo-subtitle` rules:

```css
#wwo-heading {
  position: relative;
  padding-left: 14px;
}
#wwo-heading::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 22px;
  background: var(--primary);
  border-radius: 2px;
}
```

Do not change `.store-info-header` — its solid green treatment is intentional as a section divider and should stay as-is.

---

## Task 6 — Verify after all changes

After completing Tasks 1–5:
1. Open `index.html` in a browser (or via Live Server) and check the hero section at mobile width (~375px) and desktop width (~1280px).
2. Confirm the WhatsApp button now reads as secondary (outline) and "Shop Daily Deals" is the clear primary action.
3. Confirm hero bubbles alternate between the two brand colors and no orange/red/purple/teal/blue variants remain visible.
4. Confirm the basket emoji has a soft colored halo behind it and the floating micro-cards (`100% Quality`, `Best Prices`) still render above it, not behind it.
5. Confirm the new stats line appears under the tagline and above the search bar, and is clearly marked as placeholder content via the HTML comment.
6. Confirm the "What We Offer" heading now shows the same pink accent bar used elsewhere on the page.
7. Run through the existing `responsive.css` breakpoints (< 360px, 768px, 1024px, 1280px) to make sure none of the above changes break spacing — no new media query rules should be needed since these are color/decoration-only changes, but flag it if something breaks and needs a follow-up adjustment.

---

## Not in scope for this pass (future work, do not attempt now)

- Replacing emoji icons with an SVG icon set
- Replacing the hero basket emoji with real product photography
- Adding real customer testimonials
- Adding `og:image` meta tag
- Any change to `js/*.js`, `data/products.json`, or `data/categories.json`

Flag these as follow-up items in your summary but do not implement them in this task.