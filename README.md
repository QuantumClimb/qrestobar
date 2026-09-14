# Q-RESTOBAR

> **Modern Malaysian Dining, Reimagined.**  
> A premium, full-stack demonstration web application developed by **Quantum Climb** showcasing modern Malaysian gastronomy, real-time table reservations, digital menu curation, and a powerful hidden Admin CMS dashboard.

---

## 1. Project Overview

**Q-RESTOBAR** is an editorial-grade, mobile-first restaurant platform crafted specifically for hospitality venues, fine-dining restaurants, cocktail lounges, and boutique hotels in Malaysia.

### Key Highlights
- **Gastronomic Digital Menu:** 26+ curated Malaysian and contemporary fusion dishes & craft botanicals with prices in Malaysian Ringgit (RM), real-time dietary filters (Spicy, Vegetarian, Chef's Pick, In-Stock/Sold Out), and detailed ingredient modals with wine/drink pairings.
- **Interactive Table Reservation Engine:** Seamless booking flow validating guest counts (1–20 pax), date restrictions, operating time slots, automatic reference code generation (e.g., `QRESTO-82914`), Google Calendar / `.ics` export, WhatsApp concierge confirmation link, and clear separation between *request received* and *confirmed booking*.
- **Integrated Admin CMS (`/admin`):**
  - **Reservations Hub:** Real-time customer tracking, status updates (*New, Contacted, Confirmed, Seated, Completed, Cancelled*), guest notes, CSV data export, and deletion safeguards.
  - **Menu & Price Management:** Instant dish creation, live price edits in RM, 1-click Sold Out toggles, Chef's Pick badges, and allergen management.
  - **Promotions & Offers:** Live campaign controls for Weekend Brunches, Ladies Nights, and Live DJ events.
  - **Settings:** Live editing of operating hours, address, phone numbers, and website top announcement banner.
- **Pluggable Storage Layer:** Immediate out-of-the-box operation using browser `localStorage` demo mode, backed by a production-ready PostgreSQL architecture for Supabase (`supabase/schema.sql`).
- **Luxury Editorial Aesthetics:** Deep burgundy (`#1C0609` / `#2E090F`), charcoal black (`#0B0B0D` / `#121215`), warm gold (`#C5A059`), and ivory typography powered by Cinzel, Playfair Display, and Plus Jakarta Sans.

---

## 2. Technology Stack

- **Framework:** React 18+ with TypeScript
- **Bundler & Dev Server:** Vite 5
- **Routing:** React Router v6
- **Styling:** Tailwind CSS with custom luxury color palette and animations
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Data Layer:** Unified Service Pattern with dual-mode storage (`localStorage` fallback + Supabase Client ready)

---

## 3. Installation & Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Setup Instructions
1. Clone or navigate to the repository directory:
   ```bash
   cd "d:/QUANTUM CLIMB - PROJECTS/QBar&Restaurant"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 4. Admin CMS Instructions (`/admin`)

The Admin CMS dashboard is intentionally decoupled from the public navigation for operational privacy.

- **Access URL:** Navigate directly to `http://localhost:3000/admin` (or `/admin` on your deployed domain).
- **Default Mode:** Runs in **LocalStorage Demo Mode** by default (`VITE_DEMO_MODE=true`). Any dishes added, prices modified, campaigns scheduled, or reservations accepted persist immediately within your browser.
- **Factory Reset:** If you wish to restore original demo dishes and sample bookings, click **"Reset Demo"** in the top navigation bar or **"Reset Everything"** in Settings.

---

## 5. Supabase Production Setup

To transition from the local demo mode to a live cloud PostgreSQL database:

### 1. Create a Supabase Project
1. Log in to [Supabase](https://supabase.com/) and create a new project.
2. In the **SQL Editor**, open and execute the contents of:
   ```
   supabase/schema.sql
   ```
   This creates all required tables (`menu_categories`, `menu_items`, `promotions`, `restaurant_settings`, `reservations`), establishes Row Level Security (RLS) policies, and creates automatic timestamp triggers.

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_DEMO_MODE=false
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-public-anon-key
```

### 3. Production Security Checklist
- [x] **Never expose `service_role` secret keys** in frontend environment variables. Only the public `anon` key is used in `VITE_SUPABASE_ANON_KEY`.
- [x] **Row Level Security (RLS)** is enabled on all tables:
  - Public anonymous users can read menu items, active promotions, and restaurant settings.
  - Public anonymous users can insert new table reservation requests.
  - Authenticated staff members (via Supabase Auth) have full administrative control over all records.
- [x] When ready for staff logins, implement `@supabase/auth-ui-react` or Supabase email/password login on the `/admin` route.

---

## 6. Image Replacement Guide

All photography is organized with high-resolution, royalty-free culinary imagery from Unsplash.

To replace with your venue's photography:
1. **Local Assets:** Place compressed WebP/JPG images inside `public/images/`.
2. **CMS Updates:** Go to `/admin` -> **Menu & Pricing** or **Offers & Events**, click **Edit**, and replace the Image URL field with `/images/your-photo.webp`.
3. **Hero Image:** Update the hero background image URL in `src/components/home/HeroSection.tsx`.

---

## 7. Deployment to Vercel

The project is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

1. Push your repository to GitHub or GitLab.
2. Import the project in Vercel:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables if connecting to Supabase:
   - `VITE_DEMO_MODE=true` (or `false` with Supabase keys).
4. For single-page app client routing on Vercel, ensure `vercel.json` contains:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

---

## 8. Credits & Attribution

Designed and engineered by **Quantum Climb** for Malaysian dining and hospitality showcases.
All branding, culinary concepts, and software architecture are demonstration assets.
