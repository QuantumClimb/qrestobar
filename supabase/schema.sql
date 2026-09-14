-- ====================================================================
-- Q-RESTOBAR - Supabase Database Schema
-- Production Ready Migration for PostgreSQL with Row Level Security (RLS)
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Custom ENUMs
CREATE TYPE reservation_status_enum AS ENUM (
  'new',
  'contacted',
  'confirmed',
  'seated',
  'completed',
  'cancelled'
);

-- 3. TABLE: menu_categories
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 4. TABLE: menu_items
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  category_id VARCHAR(50) NOT NULL REFERENCES public.menu_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  spicy_level SMALLINT NOT NULL DEFAULT 0 CHECK (spicy_level BETWEEN 0 AND 3),
  is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  is_chefs_pick BOOLEAN NOT NULL DEFAULT FALSE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  allergens TEXT[] DEFAULT '{}',
  pairing_recommendation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Suggested Indexes for menu
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_chefs_pick ON public.menu_items(is_chefs_pick);

-- ====================================================================
-- 5. TABLE: promotions
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  schedule VARCHAR(150) NOT NULL,
  timeframe VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  badge VARCHAR(50) NOT NULL,
  terms TEXT[] DEFAULT '{}',
  pricing_highlights VARCHAR(100),
  cta_text VARCHAR(50) NOT NULL DEFAULT 'Reserve Now',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  priority INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(is_active);

-- ====================================================================
-- 6. TABLE: restaurant_settings
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL DEFAULT 'Q-RESTOBAR',
  secondary_name VARCHAR(100) NOT NULL DEFAULT 'KUALA LUMPUR',
  tagline VARCHAR(255) NOT NULL,
  secondary_tagline VARCHAR(255),
  location_area VARCHAR(150) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  opening_hours_display VARCHAR(255) NOT NULL,
  opening_hours_weekday VARCHAR(255) NOT NULL,
  opening_hours_weekend VARCHAR(255) NOT NULL,
  dress_code VARCHAR(255) NOT NULL,
  announcement_bar_text TEXT,
  announcement_bar_active BOOLEAN NOT NULL DEFAULT TRUE,
  google_maps_embed_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- 7. TABLE: reservations
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guest_count SMALLINT NOT NULL CHECK (guest_count BETWEEN 1 AND 20),
  seating_preference seating_preference_enum NOT NULL DEFAULT 'indoor',
  occasion occasion_type_enum NOT NULL DEFAULT 'casual',
  special_requests TEXT,
  consent BOOLEAN NOT NULL DEFAULT TRUE,
  status reservation_status_enum NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_reference ON public.reservations(reference_number);

-- ====================================================================
-- 8. AUTOMATIC updated_at TIMESTAMP TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_menu_items_updated ON public.menu_items;
CREATE TRIGGER tr_menu_items_updated BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_promotions_updated ON public.promotions;
CREATE TRIGGER tr_promotions_updated BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_reservations_updated ON public.reservations;
CREATE TRIGGER tr_reservations_updated BEFORE UPDATE ON public.reservations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_settings_updated ON public.restaurant_settings;
CREATE TRIGGER tr_settings_updated BEFORE UPDATE ON public.restaurant_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ====================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
-- Enable RLS on all public tables
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Public Anonymous Reads: Anyone can view menu, categories, active promotions, and restaurant settings
CREATE POLICY "Allow public read access to categories" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to menu items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to promotions" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to settings" ON public.restaurant_settings FOR SELECT USING (true);

-- Public Anonymous Insert for Reservations (Anyone can submit a table request)
CREATE POLICY "Allow public to insert table reservations" ON public.reservations FOR INSERT WITH CHECK (true);

-- Authenticated Staff/Admin Access: Full control for authenticated users (Staff login via Supabase Auth)
CREATE POLICY "Allow full access for authenticated admins on categories" ON public.menu_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow full access for authenticated admins on menu_items" ON public.menu_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow full access for authenticated admins on promotions" ON public.promotions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow full access for authenticated admins on settings" ON public.restaurant_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow full access for authenticated admins on reservations" ON public.reservations FOR ALL TO authenticated USING (true);
