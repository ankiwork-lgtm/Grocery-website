# Radha Rani Store --- Website Specification & Implementation Plan

## 1. Project Overview

Build a mobile-first grocery shopping website for **Radha Rani Store**.

Customers should be able to:

1.  Browse grocery products by category.
2.  View product image, name, weight, price, and availability.
3.  Search for products.
4.  Filter products by category.
5.  Add products to a shopping cart.
6.  Change quantities or remove items.
7.  View the cart total.
8.  Enter customer and delivery details.
9.  Review the order.
10. Send the complete order to the store's WhatsApp number.

### Primary constraint

The first version should have **₹0 recurring cost**.

The initial solution should therefore avoid: - Paid hosting - Paid
database - Paid backend - Payment gateway - Customer accounts - WhatsApp
Business API - Server-side order processing

------------------------------------------------------------------------

# 2. Recommended V1 Architecture

``` text
                         INTERNET
                            |
                            v
                  +--------------------+
                  |    GitHub Pages    |
                  |                    |
                  | Radha Rani Store   |
                  +---------+----------+
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          Products        Search         Cart
            JSON                           |
              |                            |
              +-------------+--------------+
                            |
                            v
                       Checkout
                            |
                            v
                   WhatsApp Click-to-Chat
                            |
                            v
                     Store WhatsApp
```

## Technology Stack

  Layer               Technology
  ------------------- ------------------------
  Frontend            HTML5
  Styling             CSS3
  Application logic   Vanilla JavaScript
  Product catalogue   JSON
  Cart persistence    Browser LocalStorage
  Images              WebP/JPG
  Hosting             GitHub Pages
  Source control      GitHub
  Order delivery      WhatsApp Click-to-Chat
  Database            None in V1
  Backend             None in V1
  Payment             None in V1
  Authentication      None in V1
  Recurring cost      ₹0

------------------------------------------------------------------------

# 3. Design Principles

The website should be:

-   Mobile-first
-   Fast
-   Simple
-   Clean
-   Easy to maintain
-   Easy for a local grocery customer to understand
-   Optimized for WhatsApp-based ordering
-   Structured so that a database/admin panel can be added later

Do not make V1 unnecessarily complex.

Avoid React/Next.js/backend/database unless a real requirement emerges.

------------------------------------------------------------------------

# 4. Website Screens

V1 should contain these main screens/sections:

1.  Home
2.  Categories
3.  Product Listing
4.  Search
5.  Cart
6.  Checkout
7.  Order Confirmation
8.  About/Store Information
9.  Contact

These can initially be implemented as a single-page application rather
than separate HTML pages.

------------------------------------------------------------------------

# 5. Home Page

Recommended structure:

``` text
+------------------------------------------------+
| Radha Rani Store                    Cart       |
+------------------------------------------------+
|                                                |
|       Fresh Groceries                          |
|       Delivered to Your Door                   |
|                                                |
|       [ Search products... ]                   |
|                                                |
+------------------------------------------------+
| Categories                                     |
|                                                |
| Dal      Rice      Spices      Dry Fruits      |
| Oil      Snacks    Beverages   Other Grocery   |
|                                                |
+------------------------------------------------+
| Popular Products                               |
|                                                |
| [Product] [Product] [Product] [Product]       |
|                                                |
+------------------------------------------------+
| Today's Offers                                 |
|                                                |
| [Product] [Product] [Product]                 |
+------------------------------------------------+
| Store Information / Contact                    |
+------------------------------------------------+
```

------------------------------------------------------------------------

# 6. Header

## Desktop

``` text
Radha Rani Store | Home | Categories | Offers | Contact | Search | Cart
```

## Mobile

``` text
+--------------------------------+
| Radha Rani Store          Cart |
+--------------------------------+
```

Display a dynamic cart badge:

``` text
Cart
Cart 2
Cart 5
```

------------------------------------------------------------------------

# 7. Product Categories

Initial suggested categories:

## Dal & Pulses

-   Moong Dal
-   Masoor Dal
-   Chana Dal
-   Toor Dal
-   Urad Dal
-   Rajma
-   Kabuli Chana
-   Black Chana

## Rice & Grains

-   Basmati Rice
-   Regular Rice
-   Poha
-   Dalia
-   Suji
-   Besan

## Spices

-   Turmeric Powder
-   Red Chilli Powder
-   Coriander Powder
-   Garam Masala
-   Cumin
-   Mustard
-   Black Pepper
-   Hing

## Dry Fruits & Nuts

-   Almonds
-   Cashews
-   Raisins
-   Walnuts
-   Pistachios
-   Dates

## Oil & Ghee

-   Mustard Oil
-   Sunflower Oil
-   Refined Oil
-   Ghee

## Biscuits & Snacks

-   Biscuits
-   Namkeen
-   Chips
-   Snacks

## Tea & Beverages

-   Tea
-   Coffee
-   Health Drinks
-   Juices

## Other Grocery

-   Salt
-   Sugar
-   Jaggery
-   Sauces
-   Pickles

The actual category/product list should be updated based on the real
Radha Rani Store inventory.

------------------------------------------------------------------------

# 8. Product Card

Each product card must display:

-   Product image
-   Product name
-   Weight
-   Price
-   Availability
-   Add to Cart button

Example:

``` text
+----------------------+
|                      |
|    PRODUCT IMAGE     |
|                      |
+----------------------+
| Moong Dal            |
| 1 kg                 |
|                      |
| ₹145                 |
|                      |
| [ ADD TO CART ]      |
+----------------------+
```

After adding:

``` text
+----------------------+
| Moong Dal            |
| 1 kg                 |
| ₹145                 |
|                      |
| [ - ]   2   [ + ]    |
+----------------------+
```

------------------------------------------------------------------------

# 9. Product Data Model

Use `data/products.json`.

Example:

``` json
[
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
  },
  {
    "id": "DAL002",
    "name": "Masoor Dal",
    "category": "dal-pulses",
    "weight": "1 kg",
    "price": 120,
    "mrp": 135,
    "image": "images/products/masoor-dal.webp",
    "available": true,
    "featured": false,
    "offer": false
  }
]
```

## Field definitions

  Field       Purpose
  ----------- -------------------------------------
  id          Unique product identifier
  name        Product name
  category    Category identifier
  weight      Pack/quantity displayed to customer
  price       Selling price
  mrp         Optional original/MRP price
  image       Product image path
  available   Stock availability flag
  featured    Show on homepage
  offer       Show as offer

------------------------------------------------------------------------

# 10. Category Data

Use `data/categories.json`.

Example:

``` json
[
  {
    "id": "dal-pulses",
    "name": "Dal & Pulses",
    "image": "images/categories/dal.webp"
  },
  {
    "id": "rice-grains",
    "name": "Rice & Grains",
    "image": "images/categories/rice.webp"
  },
  {
    "id": "spices",
    "name": "Spices",
    "image": "images/categories/spices.webp"
  }
]
```

------------------------------------------------------------------------

# 11. Product IDs

Never use the product name as the unique identifier.

Use identifiers such as:

``` text
DAL001
DAL002
RIC001
SPC001
DRF001
OIL001
SNK001
```

This will make future inventory, database, order, and reporting features
easier.

------------------------------------------------------------------------

# 12. Search

Provide:

``` text
[ 🔍 Search products... ]
```

Search should work against:

-   Product name
-   Category
-   Weight

Example:

Searching for:

``` text
dal
```

should find:

``` text
Moong Dal
Masoor Dal
Chana Dal
Toor Dal
Urad Dal
```

Search should update results without a page reload.

------------------------------------------------------------------------

# 13. Category Filtering

Provide a category filter such as:

``` text
All | Dal | Rice | Spices | Dry Fruits | Oil | Snacks
```

Selecting a category should immediately filter the product grid.

------------------------------------------------------------------------

# 14. Product Availability

When:

``` json
"available": true
```

show:

``` text
[ ADD TO CART ]
```

When:

``` json
"available": false
```

show:

``` text
OUT OF STOCK
```

and disable adding the product to the cart.

------------------------------------------------------------------------

# 15. Offers

Products can optionally contain:

``` json
{
  "price": 220,
  "mrp": 250,
  "offer": true
}
```

Display:

``` text
₹220  ~~₹250~~
```

Products with:

``` json
"offer": true
```

can appear in:

``` text
Today's Offers
```

------------------------------------------------------------------------

# 16. Featured Products

Products with:

``` json
"featured": true
```

should appear in:

``` text
Popular Products
```

on the homepage.

This lets the store owner change homepage products without changing
HTML.

------------------------------------------------------------------------

# 17. Shopping Cart

Cart must support:

-   Add product
-   Increase quantity
-   Decrease quantity
-   Remove product
-   Calculate subtotal
-   Calculate total quantity
-   Empty cart
-   Persist cart using LocalStorage

Cart item structure:

``` javascript
{
  productId: "DAL001",
  name: "Moong Dal",
  weight: "1 kg",
  price: 145,
  quantity: 2,
  subtotal: 290
}
```

------------------------------------------------------------------------

# 18. Cart UI

Example:

``` text
YOUR CART

Moong Dal
1 kg

[ - ]  2  [ + ]

₹290

Almonds
250 g

[ - ]  1  [ + ]

₹220

----------------------------

Subtotal: ₹510

Delivery: To be confirmed

TOTAL: ₹510

[ PROCEED TO ORDER ]
```

------------------------------------------------------------------------

# 19. LocalStorage

The cart should be saved locally:

``` text
Customer adds products
        |
        v
JavaScript Cart
        |
        v
Browser LocalStorage
```

Therefore the cart can survive page refreshes.

No database is required for V1.

------------------------------------------------------------------------

# 20. Checkout

Checkout form:

``` text
ORDER DETAILS

Name
[________________________]

Mobile Number
[________________________]

Delivery Option

( ) Home Delivery
( ) Store Pickup

Delivery Address
[________________________]
[________________________]

[ PLACE ORDER ON WHATSAPP ]
```

Address is required for home delivery.

Address is optional for store pickup.

------------------------------------------------------------------------

# 21. Customer Validation

Required:

-   Name
-   Mobile number
-   Delivery option

Required only for home delivery:

-   Address

Mobile validation should initially require a valid Indian 10-digit
mobile number.

Do not collect unnecessary personal information.

------------------------------------------------------------------------

# 22. Order Review

Before opening WhatsApp, display:

``` text
ORDER SUMMARY

Moong Dal
1 kg × 2                         ₹290

Almonds
250 g × 1                        ₹220

--------------------------------

TOTAL                            ₹510

Customer: Ankit
Delivery: Home Delivery

Address:
Customer address here

[ ORDER VIA WHATSAPP ]
```

This gives the customer a final chance to review the order.

------------------------------------------------------------------------

# 23. WhatsApp Ordering

Do NOT use the WhatsApp Business API for V1.

Use WhatsApp Click-to-Chat.

The application should construct a WhatsApp message dynamically.

Example:

``` text
🛒 RADHA RANI STORE ORDER

Customer Name: Ankit
Mobile: 98XXXXXXXX

Items:

1. Moong Dal
   Weight: 1 kg
   Quantity: 2
   Price: ₹145
   Subtotal: ₹290

2. Almonds
   Weight: 250 g
   Quantity: 1
   Price: ₹220
   Subtotal: ₹220

-------------------------
TOTAL: ₹510
-------------------------

Delivery: Home Delivery

Address:
ABC Colony, Faridabad

Please confirm my order.
```

The website opens WhatsApp with this pre-filled message.

The customer presses Send.

------------------------------------------------------------------------

# 24. Store Configuration

Create:

`js/config.js`

Example:

``` javascript
const STORE_CONFIG = {
  storeName: "Radha Rani Store",
  whatsappNumber: "91XXXXXXXXXX",
  currency: "₹",
  deliveryEnabled: true,
  pickupEnabled: true
};
```

The actual store WhatsApp number should be entered before deployment.

Never duplicate the number across multiple JavaScript files.

------------------------------------------------------------------------

# 25. Project Folder Structure

``` text
radha-rani-store/
│
├── index.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── products.js
│   ├── cart.js
│   ├── search.js
│   ├── checkout.js
│   └── config.js
│
├── data/
│   ├── products.json
│   └── categories.json
│
├── images/
│   ├── logo/
│   │   └── logo.png
│   │
│   ├── banners/
│   │   └── store-banner.webp
│   │
│   ├── categories/
│   │   ├── dal.webp
│   │   ├── rice.webp
│   │   ├── spices.webp
│   │   └── dry-fruits.webp
│   │
│   └── products/
│       ├── moong-dal.webp
│       ├── masoor-dal.webp
│       └── ...
│
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# 26. JavaScript Responsibilities

## `app.js`

Responsible for:

-   Application initialization
-   Loading product/category data
-   Rendering homepage
-   Connecting UI components

## `products.js`

Responsible for:

-   Product rendering
-   Product filtering
-   Product availability
-   Featured products

## `cart.js`

Responsible for:

-   Add to cart
-   Remove
-   Quantity
-   Cart totals
-   LocalStorage

## `search.js`

Responsible for:

-   Search input
-   Search filtering
-   Empty search results

## `checkout.js`

Responsible for:

-   Form validation
-   Order summary
-   WhatsApp message generation
-   WhatsApp redirect

## `config.js`

Responsible for:

-   Store name
-   WhatsApp number
-   Currency
-   Feature flags

------------------------------------------------------------------------

# 27. Responsive Design

The website must work well on:

### Mobile

``` text
320px
375px
390px
414px
```

### Tablet

``` text
768px
```

### Desktop

``` text
1024px
1280px
1440px+
```

Mobile is the primary target.

------------------------------------------------------------------------

# 28. Mobile Navigation

Recommended bottom navigation:

``` text
+---------------------------------------+
|                                       |
|              PAGE CONTENT             |
|                                       |
+---------------------------------------+
| 🏠       📂       🛒       ☎️        |
| Home   Categories  Cart    Contact    |
+---------------------------------------+
```

------------------------------------------------------------------------

# 29. Visual Design

Use a clean, warm, local grocery-store visual style.

Characteristics:

-   Clean cards
-   Large product images
-   Prominent prices
-   Large touch-friendly buttons
-   Good whitespace
-   Simple navigation
-   No excessive animations

Possible free fonts:

-   Poppins
-   Inter

Use CSS variables so the theme can easily be changed later.

Example:

``` css
:root {
  --primary: #7a1f1f;
  --secondary: #f5c542;
  --background: #fffaf2;
  --text: #222222;
  --muted: #666666;
  --card: #ffffff;
}
```

The exact colors can be adjusted during implementation.

------------------------------------------------------------------------

# 30. Product Images

Prefer:

``` text
WebP
400 × 400 px
50–150 KB where practical
```

Avoid very large original photographs.

Use lazy loading:

``` html
<img loading="lazy" ...>
```

This keeps the site fast.

------------------------------------------------------------------------

# 31. Footer

Example:

``` text
--------------------------------------

🪷 RADHA RANI STORE

Your Local Grocery Store

📍 Store Address
📞 WhatsApp
🕒 Opening Hours

Quick Links

Home
Categories
Cart
Contact

--------------------------------------

© 2026 Radha Rani Store
```

------------------------------------------------------------------------

# 32. SEO

Add:

``` html
<title>Radha Rani Store | Grocery Store</title>

<meta
  name="description"
  content="Shop groceries, pulses, spices, dry fruits and daily essentials from Radha Rani Store."
>
```

Use semantic headings:

``` text
H1: Radha Rani Store

H2: Categories
H2: Popular Products
H2: Today's Offers
```

Add descriptive `alt` text to product images.

------------------------------------------------------------------------

# 33. Accessibility

The website should include:

-   Keyboard-accessible buttons
-   Proper labels
-   Alt text
-   Sufficient text contrast
-   Visible focus states
-   Touch-friendly controls
-   `aria-label` where necessary

Example:

``` html
<button aria-label="Increase quantity">
  +
</button>
```

------------------------------------------------------------------------

# 34. Empty States

The application must handle empty states gracefully.

## Empty cart

``` text
🛒

Your cart is empty.

Add some groceries to get started.

[ SHOP PRODUCTS ]
```

## No search results

``` text
No products found.

Try another search.
```

## Category with no products

``` text
No products are currently available
in this category.
```

------------------------------------------------------------------------

# 35. Error Handling

Handle:

-   Products JSON failing to load
-   Invalid product data
-   Invalid customer details
-   Empty cart
-   Invalid WhatsApp configuration

Do not expose technical errors to customers.

Example:

``` text
We're unable to load products right now.
Please refresh the page and try again.
```

------------------------------------------------------------------------

# 36. Security Considerations

V1 does not have a backend, so there is no server-side customer
database.

Still:

-   Do not store sensitive information in LocalStorage.
-   Do not collect unnecessary personal data.
-   Do not put API secrets in JavaScript.
-   Do not put payment credentials in the frontend.
-   Do not expose future backend credentials in GitHub.
-   Keep `.env` files out of Git.

Example `.gitignore`:

``` text
.env
.env.*
node_modules/
.DS_Store
```

------------------------------------------------------------------------

# 37. Performance Targets

Target:

``` text
Initial page size: ideally < 2–3 MB
Product images: optimized
Lazy loading: enabled
No unnecessary libraries
Minimal JavaScript
```

The website should feel fast on mobile data connections.

------------------------------------------------------------------------

# 38. V1 Acceptance Criteria

## Product Catalogue

-   [ ] Categories display correctly
-   [ ] Products display correctly
-   [ ] Product image works
-   [ ] Product name works
-   [ ] Weight works
-   [ ] Price works
-   [ ] MRP/offer works
-   [ ] Availability works
-   [ ] Featured products work

## Search

-   [ ] Search works
-   [ ] Search updates without reload
-   [ ] No-results state works

## Categories

-   [ ] Category filtering works
-   [ ] All-products view works

## Cart

-   [ ] Add product works
-   [ ] Increase quantity works
-   [ ] Decrease quantity works
-   [ ] Remove works
-   [ ] Empty cart works
-   [ ] Total calculates correctly
-   [ ] LocalStorage works

## Checkout

-   [ ] Name validation works
-   [ ] Mobile validation works
-   [ ] Delivery option works
-   [ ] Address validation works
-   [ ] Order summary works

## WhatsApp

-   [ ] Correct WhatsApp number
-   [ ] Correct products
-   [ ] Correct quantities
-   [ ] Correct prices
-   [ ] Correct subtotals
-   [ ] Correct total
-   [ ] Customer details included
-   [ ] Address included
-   [ ] WhatsApp opens correctly

## Responsive

-   [ ] 320px mobile
-   [ ] 375px mobile
-   [ ] 414px mobile
-   [ ] Tablet
-   [ ] Desktop

------------------------------------------------------------------------

# 39. Development Sprints

## Sprint 1 --- Foundation

-   [ ] Create project structure
-   [ ] Create HTML
-   [ ] Create CSS
-   [ ] Create header
-   [ ] Create footer
-   [ ] Create responsive layout
-   [ ] Create navigation

## Sprint 2 --- Product Catalogue

-   [ ] Create categories JSON
-   [ ] Create products JSON
-   [ ] Load JSON
-   [ ] Render product cards
-   [ ] Render categories
-   [ ] Implement filtering
-   [ ] Implement featured products
-   [ ] Implement offers

## Sprint 3 --- Search

-   [ ] Search input
-   [ ] Search logic
-   [ ] Search results
-   [ ] Empty search state

## Sprint 4 --- Cart

-   [ ] Add to cart
-   [ ] Quantity controls
-   [ ] Remove item
-   [ ] Cart count
-   [ ] Subtotal
-   [ ] Total
-   [ ] LocalStorage
-   [ ] Empty cart

## Sprint 5 --- Checkout

-   [ ] Customer form
-   [ ] Validation
-   [ ] Delivery option
-   [ ] Address
-   [ ] Order summary

## Sprint 6 --- WhatsApp

-   [ ] Generate WhatsApp message
-   [ ] Encode message correctly
-   [ ] Open WhatsApp
-   [ ] Test desktop
-   [ ] Test mobile

## Sprint 7 --- Polish

-   [ ] Mobile optimization
-   [ ] Image optimization
-   [ ] Accessibility
-   [ ] SEO
-   [ ] Error states
-   [ ] Loading states
-   [ ] Empty states

## Sprint 8 --- Deployment

-   [ ] Create GitHub repository
-   [ ] Push project
-   [ ] Enable GitHub Pages
-   [ ] Test production URL
-   [ ] Test on phone
-   [ ] Test complete ordering workflow

------------------------------------------------------------------------

# 40. Future V2 Architecture

Do not implement this in V1, but keep the application structure ready
for it.

``` text
                         CUSTOMER
                            |
                            v
                       WEBSITE
                            |
                            v
                           API
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          Products       Stock         Orders
              |             |             |
              +-------------+-------------+
                            |
                            v
                         DATABASE
                            ^
                            |
                       ADMIN PANEL
```

------------------------------------------------------------------------

# 41. Future Admin Panel

Possible features:

## Product Management

-   Add product
-   Edit product
-   Delete product
-   Change price
-   Change weight
-   Change category
-   Upload image
-   Enable/disable product
-   Mark featured
-   Mark offer

## Inventory

``` text
Product       Available Stock
Moong Dal     25 kg
Masoor Dal    18 kg
Sugar         40 kg
```

## Orders

``` text
Order Number
Customer
Items
Total
Order Status
Date
```

## Reports

-   Daily sales
-   Weekly sales
-   Monthly sales
-   Top products
-   Category sales

------------------------------------------------------------------------

# 42. Future Features

Potential future additions:

-   PWA / Add to Home Screen
-   Customer accounts
-   Online payment
-   UPI
-   Order history
-   Inventory management
-   Admin dashboard
-   Order database
-   Delivery charges
-   Minimum order amount
-   Coupon codes
-   Customer notifications
-   Sales reports
-   WhatsApp Business API
-   Invoice generation
-   Printable bills
-   Stock alerts

These should NOT block V1.

------------------------------------------------------------------------

# 43. Important V1 Limitation

With the static website + WhatsApp architecture:

``` text
Customer
   |
   v
Website
   |
   v
WhatsApp
   |
   v
Store Owner
```

The website does not automatically know whether the order was:

-   Accepted
-   Rejected
-   Delivered
-   Paid
-   Cancelled

The store owner handles the order manually through WhatsApp.

This is intentional for the zero-cost MVP.

------------------------------------------------------------------------

# 44. Zero-Cost Deployment

Recommended deployment:

``` text
Local Development
       |
       v
Git
       |
       v
GitHub Repository
       |
       v
GitHub Pages
       |
       v
Public Website
```

Example:

``` text
https://YOUR-USERNAME.github.io/radha-rani-store/
```

A custom domain can be considered later.

------------------------------------------------------------------------

# 45. Coding Assistant IDE Instructions

The project should be developed incrementally.

Do NOT generate a huge application in one step.

Recommended sequence:

``` text
1. Create project structure
2. Implement UI shell
3. Implement product data
4. Implement product rendering
5. Implement search/filter
6. Implement cart
7. Implement checkout
8. Implement WhatsApp
9. Test
10. Optimize
11. Deploy
```

After each step, run and test the application before continuing.

------------------------------------------------------------------------

# 46. Coding Standards

Use:

-   Semantic HTML
-   Modular JavaScript
-   CSS variables
-   Descriptive function names
-   Small reusable functions
-   Comments for important business logic
-   No unnecessary dependencies
-   No hard-coded product HTML
-   No hard-coded WhatsApp message
-   No duplicate configuration values

Avoid:

-   Inline JavaScript
-   Inline styles
-   Duplicated product data
-   Hard-coded cart totals
-   Hard-coded category lists in multiple places

------------------------------------------------------------------------

# 47. Example User Journey

``` text
Customer opens website
        |
        v
Sees Radha Rani Store
        |
        v
Selects "Dal & Pulses"
        |
        v
Sees Moong Dal
        |
        v
Selects 2 × 1kg
        |
        v
Adds to Cart
        |
        v
Continues shopping
        |
        v
Adds 2 more products
        |
        v
Opens Cart
        |
        v
Reviews total
        |
        v
Proceed to Checkout
        |
        v
Enters name/mobile/address
        |
        v
Reviews order
        |
        v
"Order via WhatsApp"
        |
        v
WhatsApp opens
        |
        v
Customer presses Send
        |
        v
Store receives order
```

------------------------------------------------------------------------

# 48. Definition of Done

V1 is complete when a customer can perform this entire journey on a
mobile phone:

``` text
OPEN WEBSITE
     ↓
BROWSE CATEGORY
     ↓
VIEW PRODUCT
     ↓
ADD TO CART
     ↓
CHANGE QUANTITY
     ↓
VIEW TOTAL
     ↓
ENTER DETAILS
     ↓
REVIEW ORDER
     ↓
OPEN WHATSAPP
     ↓
SEND ORDER
```

The complete journey must work without:

-   Creating an account
-   Installing an app
-   Paying online
-   Calling the store
-   Using a separate order form

------------------------------------------------------------------------

# 49. Recommended V1 Scope

### MUST HAVE

-   Product catalogue
-   Categories
-   Images
-   Price
-   Weight
-   Availability
-   Search
-   Cart
-   Quantity
-   LocalStorage
-   Checkout
-   Customer details
-   WhatsApp order
-   Responsive mobile UI
-   GitHub Pages deployment

### SHOULD HAVE

-   Featured products
-   Offers
-   SEO
-   Accessibility
-   Loading states
-   Empty states
-   Error handling

### NOT IN V1

-   Login
-   Database
-   Admin panel
-   Online payment
-   Customer accounts
-   Order tracking
-   Inventory backend
-   WhatsApp API
-   Delivery management

------------------------------------------------------------------------

# 50. Final V1 Architecture

``` text
                    RADHA RANI STORE
                           |
                           v
                +---------------------+
                |     GitHub Pages    |
                +----------+----------+
                           |
                           v
                +---------------------+
                |    HTML / CSS / JS  |
                +----------+----------+
                           |
              +------------+------------+
              |            |            |
              v            v            v
          Products       Search       Cart
           JSON                         |
              |                         |
              +------------+------------+
                           |
                           v
                       Checkout
                           |
                           v
                  Order Confirmation
                           |
                           v
                 WhatsApp Click-to-Chat
                           |
                           v
                    Store WhatsApp
```

**Target V1 recurring cost: ₹0.**

The architecture is intentionally simple, but the data structures and
code organization should allow a future migration to a
backend/database/admin system without replacing the customer-facing UI.
