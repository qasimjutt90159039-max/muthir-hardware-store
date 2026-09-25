# Mutahir Hardware Store — E-Commerce Platform

A production-quality, full-stack hardware and tools e-commerce platform built for **Mutahir Hardware Store**, combining an industrial **"Professional Hardware Workshop + Modern Tool Marketplace"** aesthetic with comprehensive customer e-commerce workflows and an integrated Admin Control Center.

---

## 🏬 Verified Business Information

| Attribute | Verified Value |
| :--- | :--- |
| **Business Name** | **Mutahir Hardware Store** |
| **Category** | Hardware Store / Tool Store / Building & Home Improvement Supplies |
| **Phone** | **+92 308 6236092** |
| **Address** | **Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan** |
| **Public Category** | Hardware Store / Tool Store |

> [!IMPORTANT]
> **Strict Business & Real Data Compliance:**
> - In strict compliance with store policy, unverified information is never invented (no unverified email, fake owners, artificial delivery promises, or fake customer testimonials).
> - All initial catalog pricing is explicitly badged with **`DEMO PRICE — VERIFY BEFORE LAUNCH`** until matched with daily wholesale market rates.
> - Payment methods default to **Cash on Delivery (COD)** and **Direct In-Store Counter Pickup** at Haqbaho Market, Multan.

---

## 🎨 Industrial Design Identity

- **Theme Palette:**
  - **Primary Orange:** `#F97316` (Buttons, active badges, CTAs, highlight borders)
  - **Dark Orange:** `#C2410C` (Hover accents, active indicators)
  - **Deep Black:** `#111111` (Headers, footers, technical panels)
  - **Dark Surface:** `#1A1A1A` (Card backgrounds, admin suite)
  - **Clean White:** `#FFFFFF` (Product presentation areas)
  - **Light Background:** `#F7F7F5` (Catalog pages, contrast grids)
  - **Technical Gray:** `#6B7280` & **Border:** `#E5E7EB`

---

## 🛠 Tech Stack

- **Frontend:** React.js 18 + Vite + Tailwind CSS + Lucide Icons + React Router DOM v6
- **Backend:** Node.js + Express.js + Mongoose ODM + JSON Web Tokens (JWT) + bcryptjs
- **Database:** MongoDB (Local or Atlas URI, with resilient automatic fallback for zero-config local development)

---

## 🚀 Quick Start Guide

### 1. Database Seeding & Server Startup

In a terminal, navigate to the `server/` directory:

```bash
cd server
npm install
npm run seed     # Populates categories, brands, genuine tool specs, and accounts
npm start        # Launches backend API on http://localhost:5000
```

### 2. Frontend Client Startup

In a second terminal, navigate to the `client/` directory:

```bash
cd client
npm install
npm run dev      # Launches client application on http://localhost:5173
```

---

## 🔑 Pre-Configured Test Credentials

For rapid verification, the seed runner configures two pre-loaded accounts:

### 1. Store Administrator Account
- **URL:** [http://localhost:5173/admin](http://localhost:5173/admin) or click the **Admin** button in the header
- **Email:** `admin@mutahirhardware.local`
- **Password:** `Admin@123456`
- **Capabilities:** Revenue & sales analytics, product catalog management, category tree, brand management, SKU stock adjustment with audit trails, order fulfillment pipeline (`Pending` &rarr; `Delivered`), customer directory, review moderation, coupon generator, and store settings.

### 2. Verified Customer Account
- **URL:** [http://localhost:5173/login](http://localhost:5173/login) (Use the **"Fill Demo Customer"** quick button)
- **Email:** `customer@mutahirhardware.local`
- **Password:** `Customer@123456`
- **Capabilities:** Place COD orders, view order history & invoices, maintain saved jobsite delivery addresses, manage wishlist, and submit verified purchase reviews.

---

## 📦 Key Functional Modules

1. **Homepage (14 Unique Sections):** Announcement bar, sticky navigation, full-width tool hero ("BUILD. REPAIR. CREATE."), shop by category, featured tools, hardware split banner, power tools showcase, hand tools grid, promo banner, new arrivals, best sellers, technical guides teaser, and verified Multan store location map.
2. **Catalog & Dynamic Filters (`/shop`):** Live keyword search, dynamic category checklists, brand filters, price range sliders, availability filters (In Stock / Low Stock / Out of Stock), and sorting.
3. **Product Detail Page (`/product/:slug`):** Image gallery, full technical specifications table, features breakdown, construction material, package contents, stock status, demo price badge, and verified customer reviews.
4. **Tool Comparison Matrix (`/compare`):** Side-by-side comparison of up to 4 tools comparing wattage, RPM, chuck size, weight, and dimensions.
5. **Persistent Cart & Cash on Delivery Checkout (`/cart`, `/checkout`):** Real-time stock quantity validation, free delivery threshold calculation (orders &ge; PKR 5,000), promotional coupon engine (`WELCOME10`), recipient address validation, and Cash on Delivery order placement.
6. **Educational Safety Guides (`/hardware-guides`):** 10 safety-conscious technical guides covering drills, hand tools, screw types, plumbing fittings, electrical wire sizing, and workshop ergonomics.
7. **Admin Suite (`/admin`):** Complete management console with revenue analytics, product CRUD, inventory adjustments with audit history, and order state machine.
