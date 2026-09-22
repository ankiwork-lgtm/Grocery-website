# Radha Rani Store

A mobile-first grocery ordering website built with pure HTML, CSS, and Vanilla JavaScript. Customers can browse products, add to cart, and place orders directly via WhatsApp.

**Live URL:** `https://YOUR-USERNAME.github.io/radha-rani-store/`

---

## ✨ Features

- Browse groceries by 8 categories
- Search products by name, category, or weight
- Add to cart with quantity controls
- Cart persists across page refreshes (LocalStorage)
- Checkout with form validation
- WhatsApp order delivery (Click-to-Chat)
- Mobile-first responsive design
- Zero recurring cost (GitHub Pages hosting)

---

## 🚀 Running Locally

No build step required. Just open `index.html` in a browser.

**Option 1 — VS Code Live Server:**
1. Install the "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

**Option 2 — Python HTTP Server:**
```bash
python -m http.server 8080
# Open http://localhost:8080
```

---

## ⚙️ Configuration

Edit `js/config.js` before deployment:

```javascript
const STORE_CONFIG = {
  storeName: "Radha Rani Store",
  whatsappNumber: "91XXXXXXXXXX",  // ← Your 10-digit number with country code
  address: "Your Store Address",
  openingHours: "9 AM – 9 PM, All Days",
  phone: "+91 XXXXX XXXXX"
};
```

---

## 📦 Adding / Editing Products

Edit `data/products.json`. Each product looks like:

```json
{
  "id": "DAL001",
  "name": "Moong Dal",
  "category": "dal-pulses",
  "weight": "1 kg",
  "price": 145,
  "mrp": 160,
  "image": "images/products/moong-dal.webp",
  "available": true,
  "featured": true,
  "offer": true
}
```

| Field | Purpose |
|-------|---------|
| `id` | Unique identifier (never change once set) |
| `available` | `false` → shows "Out of Stock" |
| `featured` | `true` → appears on homepage Popular section |
| `offer` | `true` → appears in Today's Offers section |
| `mrp` | If higher than `price`, shows strikethrough price |

---

## 🖼️ Product Images

- Format: WebP preferred (JPG also works)
- Size: 400×400 px
- Location: `images/products/` and `images/categories/`
- Reference in JSON: `"image": "images/products/product-name.webp"`

---

## 🌐 Deploying to GitHub Pages

1. Create a GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at `https://USERNAME.github.io/REPO-NAME/`

---

## 📁 Project Structure

```
├── index.html
├── css/
│   ├── style.css       ← Design system & core styles
│   └── responsive.css  ← Breakpoints
├── js/
│   ├── config.js       ← Store configuration (edit this first!)
│   ├── cart.js         ← Cart logic & LocalStorage
│   ├── products.js     ← Product rendering & filtering
│   ├── search.js       ← Search functionality
│   ├── checkout.js     ← Form validation & WhatsApp
│   └── app.js          ← App bootstrap & SPA routing
├── data/
│   ├── products.json   ← Product catalogue (edit to add/remove products)
│   └── categories.json ← Category list
└── images/
    ├── logo/
    ├── categories/
    └── products/
```

---

## 📱 Testing Checklist

- [ ] All 8 categories display
- [ ] Products load correctly
- [ ] Search works (try "dal", "rice")
- [ ] Category filtering works
- [ ] Add to Cart works
- [ ] Quantity controls work
- [ ] Cart persists on refresh
- [ ] Checkout form validates
- [ ] WhatsApp opens with correct message
- [ ] Tested on real phone

---

## 🔮 Future V2 Plans

- Admin panel (add/edit/delete products)
- Database backend (Firebase or Supabase)
- Online payment (UPI/Razorpay)
- Customer accounts & order history
- WhatsApp Business API
- Delivery charge calculation
- Coupon codes
