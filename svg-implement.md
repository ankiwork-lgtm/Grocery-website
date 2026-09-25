# Radha Rani Store — Emoji → SVG Icons (Phase 2: Header & Navigation)

Context: Phase 1 replaced all emoji in the hero section with inline Lucide SVG icons via a shared sprite (`#icon-...` symbols defined near the top of `<body>`). This phase extends that same system to the header, cart button, and mobile nav drawer. The bottom mobile nav bar and footer are **not** in scope here — that's Phase 4.

This phase touches `index.html` and `css/style.css` only.

---

## Step 1 — Add new icons to the existing sprite

**File:** `index.html`

Find the icon sprite block added in Phase 1 (`<svg style="display:none;" aria-hidden="true"> ... </svg>` near the top of `<body>`). Add these four new `<symbol>` entries inside it, alongside the existing ones — do not remove or duplicate any Phase 1 symbols:

```html
<symbol id="icon-shopping-cart" viewBox="0 0 24 24"><!-- lucide: shopping-cart --></symbol>
<symbol id="icon-layout-grid" viewBox="0 0 24 24"><!-- lucide: layout-grid --></symbol>
<symbol id="icon-phone" viewBox="0 0 24 24"><!-- lucide: phone --></symbol>
```

(`icon-home` and `icon-tag` were already added in Phase 1 for the hero bubbles/floating cards — reuse those same symbols here rather than adding duplicates.)

As in Phase 1: get each icon's exact inner path data from https://lucide.dev/icons/{icon-name} and paste it inside the matching `<symbol>`, replacing the placeholder comment. All Lucide icons share the same `viewBox="0 0 24 24"` grid, so no scaling adjustments are needed.

---

## Step 2 — Replace the 🛒 cart icon (header button)

**File:** `index.html`

Find:
```html
<button class="btn-cart-header" data-action="cart" id="header-cart-btn" aria-label="Open cart">
  <span class="cart-icon" aria-hidden="true">🛒</span>
  <span class="cart-badge" aria-label="Items in cart" id="header-cart-badge">0</span>
  <span>Cart</span>
</button>
```
Replace the `<span class="cart-icon">` with:
```html
<svg class="icon cart-icon" aria-hidden="true"><use href="#icon-shopping-cart"></use></svg>
```
Leave the `.cart-badge` span (the numeric count bubble) exactly as-is — that is not an emoji and is not part of this task.

**File:** `css/style.css`

Find `.btn-cart-header .cart-icon` (currently `font-size: 17px`). Replace with:
```css
.btn-cart-header .cart-icon {
  width: 18px;
  height: 18px;
}
```

---

## Step 3 — Replace mobile nav drawer icons

**File:** `index.html`

Find the `.mobile-nav-drawer` block:
```html
<nav class="mobile-nav-drawer" id="mobile-nav-drawer" aria-label="Mobile navigation menu" aria-hidden="true">
  <a href="#" data-nav="home"    class="mobile-nav-link" id="mnav-home">🏠 Home</a>
  <a href="#" data-nav="products" class="mobile-nav-link" id="mnav-categories">📂 Categories</a>
  <a href="#" data-action="offers" class="mobile-nav-link" id="mnav-offers">🏷️ Offers</a>
  <a href="#" data-nav="contact" class="mobile-nav-link" id="mnav-contact">☎️ Contact</a>
  <a href="#" data-action="cart" class="mobile-nav-link" id="mnav-cart">🛒 Cart</a>
</nav>
```
Replace with:
```html
<nav class="mobile-nav-drawer" id="mobile-nav-drawer" aria-label="Mobile navigation menu" aria-hidden="true">
  <a href="#" data-nav="home" class="mobile-nav-link" id="mnav-home">
    <svg class="icon" aria-hidden="true"><use href="#icon-home"></use></svg>
    Home
  </a>
  <a href="#" data-nav="products" class="mobile-nav-link" id="mnav-categories">
    <svg class="icon" aria-hidden="true"><use href="#icon-layout-grid"></use></svg>
    Categories
  </a>
  <a href="#" data-action="offers" class="mobile-nav-link" id="mnav-offers">
    <svg class="icon" aria-hidden="true"><use href="#icon-tag"></use></svg>
    Offers
  </a>
  <a href="#" data-nav="contact" class="mobile-nav-link" id="mnav-contact">
    <svg class="icon" aria-hidden="true"><use href="#icon-phone"></use></svg>
    Contact
  </a>
  <a href="#" data-action="cart" class="mobile-nav-link" id="mnav-cart">
    <svg class="icon" aria-hidden="true"><use href="#icon-shopping-cart"></use></svg>
    Cart
  </a>
</nav>
```

**File:** `css/style.css`

`.mobile-nav-link` is already `display: flex; align-items: center; gap: 12px;` so the new inline SVGs will align with the text automatically — no additional CSS should be required. After this change, visually confirm each icon in the open drawer sits vertically centered with its label text; if any icon looks vertically offset, add `flex-shrink: 0;` to `.mobile-nav-link .icon` (create this rule only if needed).

---

## Step 4 — Replace the 🪷 lotus logo with a custom SVG mark

The lotus is a brand identity element specific to Radha Rani Store, not a generic icon — it isn't sourced from Lucide. Below is a simple geometric lotus mark built from six rotated petal shapes plus a center dot, using your existing brand colors. It renders correctly as-is with no external path data needed.

**File:** `index.html`

Find, in the header:
```html
<span class="header-logo-icon" aria-hidden="true">🪷</span>
```
Replace with:
```html
<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
  <g fill="var(--primary)">
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(0 16 16)" opacity="0.9"/>
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(60 16 16)" opacity="0.9"/>
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(120 16 16)" opacity="0.9"/>
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(180 16 16)" opacity="0.75"/>
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(240 16 16)" opacity="0.75"/>
    <ellipse cx="16" cy="9" rx="4.2" ry="8" transform="rotate(300 16 16)" opacity="0.75"/>
  </g>
  <circle cx="16" cy="16" r="3" fill="var(--brand-green)"/>
</svg>
```

Also find, in the footer (same emoji reused there):
```html
<p class="footer-brand-name">🪷 Radha Rani Store</p>
```
Leave this one alone for now — the footer is Phase 4. Only replace the header logo in this phase.

**File:** `css/style.css`

Replace `.header-logo-icon` (currently `font-size: 28px`) with:
```css
.logo-mark {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}
```

After this change, visually check that the six petals overlap into a clean flower silhouette rather than looking like six separate ovals — if the petals look too sparse/disconnected, reduce the `ry` value slightly (e.g. from `8` to `7`) on all six ellipses so they overlap more toward the center, and re-check.

---

## Verification

1. Confirm all four sprite additions (`shopping-cart`, `layout-grid`, `phone`, plus reused `home`/`tag`) have real Lucide path data, not placeholder comments.
2. Confirm the header cart button icon renders correctly at 18×18px, aligned with the "Cart" text and badge.
3. Open the mobile hamburger drawer at mobile width (~375px) and confirm all 5 links (Home, Categories, Offers, Contact, Cart) show a correctly aligned icon + label, with no emoji remaining.
4. Confirm the new lotus logo mark renders as a coherent flower shape (not scattered ovals) in the header, sized proportionally next to "Radha Rani Store" text, and uses the brand pink/green palette rather than looking flat or monochrome.
5. Confirm the footer's 🪷 emoji is still present and untouched (Phase 4 scope) — this phase should not have modified anything outside the header/nav.
6. Confirm no emoji characters remain in the `<header class="site-header">` block or `.mobile-nav-drawer` in the final `index.html`.

---

## Not in scope for this phase

- Bottom mobile nav bar (🏠📂🛒☎️ in `.bottom-nav`) — Phase 4
- Footer lotus logo, address/phone/hours icons — Phase 4
- Category grid, "What We Offer," delivery banner icons — Phase 3
- Contact screen (`#screen-contact`) icons — Phase 4