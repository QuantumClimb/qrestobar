-- ====================================================================
-- Q-RESTOBAR - COMPLETE 1-STEP SUPABASE SETUP (SCHEMA + SEED DATA)
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mtkqkzgjaxugtoazcjvv/sql/new
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Custom ENUM Types
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reservation_status_enum') THEN
        CREATE TYPE reservation_status_enum AS ENUM (
          'new',
          'contacted',
          'confirmed',
          'seated',
          'completed',
          'cancelled'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'seating_preference_enum') THEN
        CREATE TYPE seating_preference_enum AS ENUM (
          'indoor',
          'outdoor',
          'chefs-table'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'occasion_type_enum') THEN
        CREATE TYPE occasion_type_enum AS ENUM (
          'casual',
          'birthday',
          'anniversary',
          'business',
          'date-night',
          'celebration',
          'other'
        );
    END IF;
END $$;

-- ====================================================================
-- 3. TABLES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.menu_categories (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid()::text,
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

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_chefs_pick ON public.menu_items(is_chefs_pick);

CREATE TABLE IF NOT EXISTS public.promotions (
  id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  schedule VARCHAR(150) NOT NULL,
  timeframe VARCHAR(50) NOT NULL,
  image_url TEXT NOT NULL,
  image_position VARCHAR(50) NOT NULL DEFAULT 'center',
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

CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id VARCHAR(100) PRIMARY KEY DEFAULT 'default-settings',
  name VARCHAR(100) NOT NULL DEFAULT 'Q-RESTOBAR',
  secondary_name VARCHAR(100) NOT NULL DEFAULT 'KUALA LUMPUR',
  tagline VARCHAR(255) NOT NULL,
  secondary_tagline VARCHAR(255),
  location_area VARCHAR(150) NOT NULL DEFAULT '',
  address_line1 VARCHAR(255) NOT NULL DEFAULT '',
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL DEFAULT '',
  postcode VARCHAR(20) NOT NULL DEFAULT '',
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

CREATE TABLE IF NOT EXISTS public.reservations (
  id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  reference_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
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
-- 4. AUTOMATIC updated_at TIMESTAMP TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_menu_categories_updated ON public.menu_categories;
CREATE TRIGGER tr_menu_categories_updated BEFORE UPDATE ON public.menu_categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_menu_items_updated ON public.menu_items;
CREATE TRIGGER tr_menu_items_updated BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_promotions_updated ON public.promotions;
CREATE TRIGGER tr_promotions_updated BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_reservations_updated ON public.reservations;
CREATE TRIGGER tr_reservations_updated BEFORE UPDATE ON public.reservations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_settings_updated ON public.restaurant_settings;
CREATE TRIGGER tr_settings_updated BEFORE UPDATE ON public.restaurant_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ====================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to categories" ON public.menu_categories;
DROP POLICY IF EXISTS "Allow public read access to menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Allow public read access to promotions" ON public.promotions;
DROP POLICY IF EXISTS "Allow public read access to settings" ON public.restaurant_settings;
DROP POLICY IF EXISTS "Allow public to insert table reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow full access on categories" ON public.menu_categories;
DROP POLICY IF EXISTS "Allow full access on menu_items" ON public.menu_items;
DROP POLICY IF EXISTS "Allow full access on promotions" ON public.promotions;
DROP POLICY IF EXISTS "Allow full access on settings" ON public.restaurant_settings;
DROP POLICY IF EXISTS "Allow full access on reservations" ON public.reservations;

-- Public Anonymous Reads
CREATE POLICY "Allow public read access to categories" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to menu items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to promotions" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to settings" ON public.restaurant_settings FOR SELECT USING (true);

-- Public Reservation Insertions
CREATE POLICY "Allow public to insert table reservations" ON public.reservations FOR INSERT WITH CHECK (true);

-- Full Operations for App
CREATE POLICY "Allow full access on categories" ON public.menu_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on menu_items" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on promotions" ON public.promotions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on settings" ON public.restaurant_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on reservations" ON public.reservations FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- 6. SEED DATA
-- ====================================================================

-- Categories
INSERT INTO public.menu_categories (id, label, description, display_order)
VALUES
  ('signatures', 'Malaysian Signatures', 'Reimagined heritage classics crafted with contemporary precision', 1),
  ('small-plates', 'Small Plates', 'Artisanal bites designed for sharing, discovery, and aperitifs', 2),
  ('grill', 'From the Grill', 'Charred skewers, prime cuts, and smoky wok-kissed delicacies', 3),
  ('seafood', 'Seafood', 'Fresh ocean catches infused with aromatic herbs, laksa broths, and citrus', 4),
  ('vegetarian', 'Vegetarian', 'Plant-forward creations brimming with bold Southeast Asian spices', 5),
  ('desserts', 'Desserts', 'Indulgent treats celebrating pandan, palm sugar, coconut, and tropical fruit', 6),
  ('cocktails', 'Signature Cocktails', 'Artfully crafted mixology celebrating local botanicals and spirits', 7),
  ('mocktails', 'Botanical Mocktails', 'Zero-proof craft infusions with refreshing tropical notes', 8),
  ('wine-beer', 'Wine & Beer', 'Curated international wines and crisp craft beers to complement bold flavours', 9)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

-- Restaurant Settings
INSERT INTO public.restaurant_settings (
  id, name, secondary_name, tagline, secondary_tagline,
  location_area, address_line1, address_line2, city, postcode,
  phone, whatsapp, email, opening_hours_display,
  opening_hours_weekday, opening_hours_weekend, dress_code,
  announcement_bar_text, announcement_bar_active,
  google_maps_embed_url, instagram_url, facebook_url, tiktok_url
)
VALUES (
  'default-settings',
  'Q-RESTOBAR',
  'KUALA LUMPUR',
  'Modern Malaysian Dining, Reimagined.',
  'Local Soul. Contemporary Flavour.',
  '',
  '',
  NULL,
  '',
  '',
  '+60 11-6424 2145',
  '+60 11-6424 2145',
  'reservations@q-restobar.com',
  'Daily: 12:00 PM to 12:00 AM',
  'Mon - Thu: 12:00 PM - 11:30 PM (Kitchen closes 10:30 PM)',
  'Fri - Sun: 12:00 PM - 1:00 AM (Kitchen closes 11:30 PM)',
  'Smart Casual (No beachwear or flip-flops after 6:00 PM)',
  'Complimentary Pandan Crème Brûlée for every table booking this week with promo code "QRESTO2026"',
  TRUE,
  'https://maps.google.com/maps?q=Bukit+Bintang+Kuala+Lumpur&t=&z=15&ie=UTF8&iwloc=&output=embed',
  'https://instagram.com/',
  'https://facebook.com/',
  'https://tiktok.com/'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  email = EXCLUDED.email,
  opening_hours_display = EXCLUDED.opening_hours_display;

-- Promotions
INSERT INTO public.promotions (
  id, title, slug, tagline, description, schedule, timeframe,
  image_url, image_position, badge, terms, pricing_highlights,
  cta_text, is_active, priority
)
VALUES
  (
    'promo-weekend-brunch',
    'Weekend Brunch & Botanicals',
    'weekend-brunch',
    'Unlimited small plates, free-flow spritz, and acoustic ambient sessions.',
    'Elevate your weekend afternoons with our signature Malaysian brunch spread. Enjoy endless artisan satay, soft-shell crab laksa bowls, signature nasi lemak royale, and free-flowing tropical botanical spritz cocktails.',
    'Every Saturday & Sunday, 11:30 AM to 3:30 PM',
    'Saturdays & Sundays',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    'center',
    'Weekend Special',
    ARRAY['Advance reservation recommended', '2-hour seating duration per table', 'Free-flow cocktail upgrade available for RM88 per guest'],
    'From RM128++ per person',
    'Reserve for Brunch',
    TRUE,
    1
  ),
  (
    'promo-ladies-night',
    'Velvet Thursdays: Ladies Night',
    'ladies-night',
    'Complimentary craft cocktails, curated R&B grooves, and late night bites.',
    'Every Thursday evening, ladies enjoy complimentary Lychee Rose Martinis and Calamansi Spritz between 8:00 PM and 10:00 PM with any food order, alongside special sharing platters and live vinyl sets.',
    'Every Thursday, 8:00 PM to 12:00 AM',
    'Thursday Evenings',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    'center',
    'Popular Night',
    ARRAY['Up to 3 complimentary cocktails per lady with food order', 'Group bookings of 4 or more receive a complimentary dessert platter'],
    'Complimentary cocktails with dining',
    'Book Thursday Table',
    TRUE,
    2
  ),
  (
    'promo-live-dj-saturdays',
    'Pulse & Plates: Live DJ Saturdays',
    'live-dj-saturdays',
    'Deep melodic house, late-night wok delicacies, and crafted highballs.',
    'When the dinner rush softens, Q-RESTOBAR transitions into an atmospheric lounge. Resident and guest DJs spin deep soulful grooves from 9:30 PM till late while our bar team serves signature drinks and midnight small plates.',
    'Every Saturday, 9:30 PM till late',
    'Saturday Nights',
    '/images/DJLivemusic.png',
    'center top',
    'Nightlife',
    ARRAY['Smart casual dress code strictly enforced after 9:00 PM', 'Bottle service and private booth packages available on request'],
    'Cover charge waived with dinner reservation',
    'Reserve Nightlife Table',
    TRUE,
    3
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  schedule = EXCLUDED.schedule,
  image_url = EXCLUDED.image_url,
  is_active = EXCLUDED.is_active;

-- Menu Items
INSERT INTO public.menu_items (
  id, name, category_id, price, description, image_url,
  spicy_level, is_vegetarian, is_chefs_pick, is_available,
  allergens, pairing_recommendation
)
VALUES
  (
    'menu-sig-1',
    'Slow-Cooked Beef Rendang',
    'signatures',
    48.00,
    'Tender Australian grain-fed beef brisket simmered for 8 hours with freshly toasted kerisik, aromatic galangal, kaffir lime leaves, and rich coconut milk reduction.',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    2, FALSE, TRUE, TRUE,
    ARRAY['Coconut'],
    'Cabernet Sauvignon or Calamansi Spritz'
  ),
  (
    'menu-sig-2',
    'Q-RESTOBAR Nasi Lemak Royale',
    'signatures',
    42.00,
    'Fragrant santan basmati rice infused with pandan leaf, served with spiced spiced spiced berempah fried chicken leg, sambal tumis, crispy anchovies, soft egg, and house-pickled acar.',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    2, FALSE, TRUE, TRUE,
    ARRAY['Peanuts', 'Seafood / Belacan', 'Egg'],
    'Tiger Crystal or Ginger Lemongrass Fizz'
  ),
  (
    'menu-sig-3',
    'Crispy Soft-Shell Crab Laksa',
    'signatures',
    46.00,
    'Deep-fried golden soft-shell crab nestled in an opulent coconut curry broth, silken rice noodles, fresh laksa leaves, tofu puffs, and charred lime.',
    'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80',
    2, FALSE, TRUE, TRUE,
    ARRAY['Crustaceans', 'Gluten', 'Coconut'],
    'Pandan Colada'
  ),
  (
    'menu-sig-4',
    'Smoked Duck Breast Sarawak Pepper',
    'signatures',
    52.00,
    'Pan-seared duck breast with cracked black pepper from Sarawak highlands, served over charred sweet potato puree and wild ginger flower reduction.',
    '/images/Smoked Duck Breast Sarawak Pepper.jpg',
    1, FALSE, FALSE, TRUE,
    ARRAY['Poultry'],
    'Pinot Noir'
  ),
  (
    'menu-sp-1',
    'Charred Chicken Satay (6 Skewers)',
    'small-plates',
    32.00,
    'Lemongrass and turmeric marinated chicken thighs grilled over coconut husk charcoal, served with velvety peanut sauce, pressed rice cakes (nasi impit), and cucumber shallot relish.',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    1, FALSE, TRUE, TRUE,
    ARRAY['Peanuts'],
    'Spiced Pineapple Highball'
  ),
  (
    'menu-sp-2',
    'Cured Hamachi Umai Tartare',
    'small-plates',
    38.00,
    'Sarawak-inspired raw hamachi yellowtail tossed with calamansi juice, shallots, bird’s eye chili, torch ginger bud (bunga kantan), and sago crisps.',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    2, FALSE, FALSE, TRUE,
    ARRAY['Fish'],
    'Sauvignon Blanc'
  ),
  (
    'menu-sp-3',
    'Truffle Otak-Otak Brioche Bites',
    'small-plates',
    34.00,
    'Muar-style mackerel spiced fish custard lightly torched on toasted buttery brioche rounds, finished with black truffle glaze and micro coriander.',
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    1, FALSE, FALSE, TRUE,
    ARRAY['Fish', 'Gluten', 'Dairy', 'Egg'],
    'Lychee Rose Martini'
  ),
  (
    'menu-sp-4',
    'Crispy Salted Egg Squid Bites',
    'small-plates',
    36.00,
    'Tender squid rings flashed in wok with fragrant curry leaves, bird’s eye chilies, and creamy golden salted egg yolk crumble.',
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    1, FALSE, FALSE, TRUE,
    ARRAY['Mollusc', 'Egg', 'Dairy'],
    'Calamansi Spritz'
  ),
  (
    'menu-grill-1',
    'Black Angus Ribeye Percik (300g)',
    'grill',
    118.00,
    'Char-grilled prime Australian Black Angus ribeye basted in Kelantanese percik spiced coconut glaze, accompanied by grilled okra and charred lime.',
    '/images/Lethu_steak.jpg',
    1, FALSE, TRUE, TRUE,
    ARRAY['Beef', 'Coconut'],
    'Shiraz or Spiced Pineapple Highball'
  ),
  (
    'menu-grill-2',
    'Ikan Bakar Sambal Petai Seabream',
    'grill',
    64.00,
    'Whole grilled wild sea bream wrapped in banana leaf with fiery house sambal, stink beans (petai), and calamansi dipping sauce.',
    'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    3, FALSE, FALSE, TRUE,
    ARRAY['Fish', 'Seafood / Belacan'],
    'Crisp Riesling'
  ),
  (
    'menu-grill-3',
    'Smoky Tiger Prawns with Torch Ginger Chimichurri',
    'grill',
    58.00,
    'Jumbo Sabah tiger prawns flame-kissed with house-churned garlic butter and tangy bunga kantan Malaysian chimichurri.',
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    1, FALSE, FALSE, TRUE,
    ARRAY['Crustaceans', 'Dairy'],
    'Chardonnay or Asam Boi Highball'
  ),
  (
    'menu-sea-1',
    'Butter Prawns with Golden Egg Floss',
    'seafood',
    56.00,
    'Succulent king prawns tossed in wok with unsalted butter, bird’s eye chillies, crisp curry leaves, and decadent golden egg floss nest.',
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    1, FALSE, TRUE, TRUE,
    ARRAY['Crustaceans', 'Egg', 'Dairy'],
    'Sauvignon Blanc'
  ),
  (
    'menu-sea-2',
    'Steamed Coral Trout with Superior Soy & Ginger',
    'seafood',
    78.00,
    'Fresh Sabah coral trout fillet gently steamed with aged superior soy, julienned ginger, scallions, and hot sesame oil splash.',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    0, FALSE, FALSE, TRUE,
    ARRAY['Fish', 'Soy', 'Sesame'],
    'Pinot Grigio'
  ),
  (
    'menu-veg-1',
    'Charred Cauliflower Steak Percik',
    'vegetarian',
    34.00,
    'Thick cauliflower steak roasted over charcoal, glazed with creamy percik coconut sauce, pomegranate gems, and crispy shallots.',
    'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
    1, TRUE, TRUE, TRUE,
    ARRAY['Coconut'],
    'Chenin Blanc'
  ),
  (
    'menu-veg-2',
    'Wild Mushroom Rendang',
    'vegetarian',
    36.00,
    'King oyster, portobello, and shiitake mushrooms slow-simmered in roasted kerisik, coconut broth, and fragrant turmeric leaf.',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    2, TRUE, FALSE, TRUE,
    ARRAY['Coconut', 'Mushrooms'],
    'Merlot'
  ),
  (
    'menu-veg-3',
    'Wok-Hei Brussels Sprouts with Candied Pecans',
    'vegetarian',
    28.00,
    'Charred sprouts wok-tossed with vegetarian mushroom oyster sauce, toasted garlic crisps, and spiced candied pecans.',
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY['Nuts', 'Soy'],
    'Craft Lager'
  ),
  (
    'menu-des-1',
    'Smoked Gula Melaka Pandan Soufflé',
    'desserts',
    32.00,
    'Oven-risen fragrant pandan soufflé served with warm smoked Malaccan palm sugar syrup and house-churned coconut ice cream.',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    0, TRUE, TRUE, TRUE,
    ARRAY['Dairy', 'Egg', 'Coconut'],
    'Espresso or Dessert Muscat'
  ),
  (
    'menu-des-2',
    'Musang King Durian Crème Brûlée',
    'desserts',
    38.00,
    'Velvety custard infused with authentic Pahang Musang King durian puree, finished with a brittle caramelized turbinado sugar crust.',
    'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY['Dairy', 'Egg'],
    'Warm Jasmine Green Tea'
  ),
  (
    'menu-des-3',
    'Artisanal Cendol Panna Cotta',
    'desserts',
    26.00,
    'Silky coconut panna cotta layered with green pandan rice droplets, organic adzuki red beans, and rich gula melaka drizzle.',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY['Dairy', 'Coconut'],
    'Pandan Colada'
  ),
  (
    'menu-cock-1',
    'Bunga Kantan Gin Fizz',
    'cocktails',
    42.00,
    'Roku Japanese gin, freshly pressed torch ginger bud syrup, clarified calamansi juice, elderflower liqueur, and sparkling soda.',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    0, TRUE, TRUE, TRUE,
    ARRAY[]::TEXT[],
    'Charred Chicken Satay'
  ),
  (
    'menu-cock-2',
    'Smoky Tuak Jungle Bird',
    'cocktails',
    45.00,
    'Dark rum, Campari, artisanal Sarawak rice wine (tuak), freshly squeezed tropical pineapple, lime juice, and smoked star anise.',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    0, TRUE, TRUE, TRUE,
    ARRAY[]::TEXT[],
    'Slow-Cooked Beef Rendang'
  ),
  (
    'menu-cock-3',
    'Pandan Coconut Old Fashioned',
    'cocktails',
    44.00,
    'Bourbon whiskey fat-washed with toasted virgin coconut oil, house-made pandan syrup, and Angostura aromatic bitters.',
    'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY['Coconut'],
    'Black Angus Ribeye Percik'
  ),
  (
    'menu-cock-4',
    'Kaffir Lime Chili Margarita',
    'cocktails',
    42.00,
    'Blanco tequila, orange liqueur, fresh kaffir lime juice, agave nectar, bird’s eye chili infusion, and smoked Himalayan sea salt rim.',
    'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    1, TRUE, FALSE, TRUE,
    ARRAY[]::TEXT[],
    'Crispy Salted Egg Squid Bites'
  ),
  (
    'menu-mock-1',
    'Calamansi Asam Boi Sparkler',
    'mocktails',
    24.00,
    'Crushed fresh calamansi limes, salted dried plum reduction (asam boi), fresh mint leaves, and effervescent sparkling soda.',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY[]::TEXT[],
    'Q-RESTOBAR Nasi Lemak Royale'
  ),
  (
    'menu-mock-2',
    'Lemongrass Ginger Tonic',
    'mocktails',
    24.00,
    'Slow-steeped organic bentong ginger root, bruised fragrant lemongrass, cloudy apple juice, and Mediterranean premium tonic.',
    'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY[]::TEXT[],
    'Steamed Coral Trout'
  ),
  (
    'menu-wb-1',
    'Cloudy Bay Sauvignon Blanc 2023',
    'wine-beer',
    260.00,
    'Marlborough, New Zealand. Vibrant citrus, kaffir lime notes, and bright mineral acidity pairing impeccably with spicy seafood.',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    0, TRUE, FALSE, TRUE,
    ARRAY['Sulphites'],
    'Crispy Soft-Shell Crab Laksa'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category_id = EXCLUDED.category_id,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  spicy_level = EXCLUDED.spicy_level,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_chefs_pick = EXCLUDED.is_chefs_pick,
  is_available = EXCLUDED.is_available,
  allergens = EXCLUDED.allergens,
  pairing_recommendation = EXCLUDED.pairing_recommendation;
