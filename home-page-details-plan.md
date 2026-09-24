# Home Page Details — Plan

## Overview

Add three content sections to the home page that mirror the reference advertisement image for Radha Rani Store. The additions surface the store's product range, quality proposition, and free delivery offer — all of which currently exist in the flyer but not on the website. No existing sections are removed; all additions slot in after the hero and before the footer.

> **Note:** Contact details (address, phone numbers, map) are already correct in the footer and contact page — Sub-Task 4 is removed.

---

## Sub-Tasks

---

### Sub-Task 1 — Product Marquee / Scrolling Strip

**Intent**
Add a horizontally scrolling strip (like a ticker/marquee) showing the product range mentioned in the flyer. Items use **mixed Hindi + English** as shown in the flyer: `अनपोलिस दाल (Dal) | चावल (Rice) | साबुत एवं पिसे मसाले (Spices) | ड्राई फ्रूट (Dry Fruits) | मैंदा | सूजी | बेसन | MDH मसाले | चीनी (Sugar) | देसी खांड`. This tells visitors immediately what the store stocks.

**Expected Outcomes**
- A full-width strip appears just below the hero, above the "Shop by Category" section.
- Items scroll infinitely left on all screen sizes.
- Visually consistent with the brand (pink/green palette, --primary colours).

**Todo List**
1. Add HTML for `.product-marquee` section in `index.html` directly after the closing `</div><!-- /hero -->` tag (line 167) and before the Categories section.
2. Populate it with `<span>` items for each product — **mixed Hindi + English label** per item.
3. Add CSS for `.product-marquee`, `.marquee-track`, `.marquee-item` in `css/style.css` — infinite scroll animation using `@keyframes marqueeScroll`, `animation: marqueeScroll 22s linear infinite`.
4. Duplicate the track span once (for seamless loop) inside the HTML.

**Relevant Context**
- Insert point: `index.html` line 168, before `<!-- Categories -->`.
- Colour tokens to use: `--primary` (#E83D84), `--brand-green` (#1F6B45), `--bg-section` (#F4F6F4).
- No JS required — pure CSS animation.

**Status** — `[x] done`

---

### Sub-Task 2 — "What We Offer" 4-Card Section

**Intent**
Add a section titled "राधा रानी स्टोर पर क्या-क्या मिलता है?" (with an English sub-label "What We Offer") containing four cards matching the image:
1. 🌾 Polish-free Top Quality Dals (पॉलिश फ्री टॉप क्वालिटी की दालें)
2. 🍚 Premium Basmati Rice (प्रीमियम बासमती चावल)
3. 🌶️ Pure Whole & Ground Home Spices (शुद्ध साबुत एवं पिसे हुए घरेलू मसाले)
4. 🥜 Premium Quality Dry Fruits (उच्च कोटि के ड्राई फ्रूट्स)

**Expected Outcomes**
- Four cards rendered in a 2×2 grid on mobile, 4-column row on desktop.
- Each card has an emoji icon, Hindi product name, and a short English description.
- Section sits between the "Today's Offers" section and the footer.

**Todo List**
1. Add HTML for `.what-we-offer` section in `index.html` after the Today's Offers `</section>` (line 194) and before `</section id="screen-home">`.
2. Write four `.offer-card` items with emoji, Hindi title, and English subtitle.
3. Add CSS for `.what-we-offer`, `.wwo-title`, `.wwo-grid`, `.wwo-card`, `.wwo-card-icon`, `.wwo-card-label`, `.wwo-card-sub` in `css/style.css`.
4. Grid: `repeat(2, 1fr)` mobile → `repeat(4, 1fr)` at `@media (min-width: 768px)` in `css/responsive.css`.

**Relevant Context**
- Insert point: `index.html` after line 194 (after Today's Offers section close tag).
- Match visual style of `.category-card` (white bg, border-radius var(--radius), box-shadow var(--shadow-sm)).
- Existing section pattern: `.section` class with `.section-header` and `.section-title`.

**Status** — `[x] done`

---

### Sub-Task 3 — Free Home Delivery Banner

**Intent**
Add a prominent full-width banner matching the bottom section of the reference image. It communicates three things in one strip:
- Left: "एक बार ऑर्डर करें और हमारी क्वालिटी चेक करें" (Order once, check our quality)
- Centre: 🚚 FREE HOME DELIVERY
- Right: "घर बैठे ऑर्डर करें और पाएं बिल्कुल फ्री होम डिलीवरी!" — **text only, no button**.

**Expected Outcomes**
- Full-width coloured banner (dark green `--brand-green` background, white text) appears between the "What We Offer" section and the footer.
- On mobile the three columns stack vertically; on desktop they sit side-by-side.
- No interactive button inside the banner — the centre truck icon and "FREE HOME DELIVERY" text is the focal point.

**Todo List**
1. Add HTML for `.delivery-banner` in `index.html` after the What We Offer section (Sub-Task 2 insertion point).
2. Three inner `<div>` columns: `.delivery-banner-trust`, `.delivery-banner-main`, `.delivery-banner-cta` (text-only, no button).
3. Add CSS for `.delivery-banner` and its children in `css/style.css`.
4. Add responsive stacking rule in `css/responsive.css` at the `768px` breakpoint.

**Relevant Context**
- Insert point: directly after the `.what-we-offer` section added in Sub-Task 2.
- No `data-action="whatsapp"` button needed in this banner.
- Colour: `--brand-green` background with white text to match the dark green stripe in the reference image.

**Status** — `[x] done`

---

