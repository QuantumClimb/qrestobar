-- ====================================================================
-- Q-RESTOBAR - Seed Data Migration for Supabase
-- Populates Menu Categories, Menu Items, Promotions, Settings & Reservations
-- ====================================================================

-- 1. SEED MENU CATEGORIES
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

-- 2. SEED RESTAURANT SETTINGS
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

-- 3. SEED PROMOTIONS
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

-- 4. SEED MENU ITEMS
INSERT INTO public.menu_items (
  id, name, category_id, price, description, image_url,
  spicy_level, is_vegetarian, is_chefs_pick, is_available,
  allergens, pairing_recommendation
)
VALUES
  -- Malaysian Signatures
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

  -- Small Plates
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

  -- Grill
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

  -- Seafood
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

  -- Vegetarian
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

  -- Desserts
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

  -- Cocktails
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

  -- Mocktails
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

  -- Wine & Beer
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
