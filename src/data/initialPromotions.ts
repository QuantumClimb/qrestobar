import { Promotion } from '../types/promotion';

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-weekend-brunch',
    title: 'Weekend Brunch & Botanicals',
    slug: 'weekend-brunch',
    tagline: 'Unlimited small plates, free-flow spritz, and acoustic ambient sessions.',
    description: 'Elevate your weekend afternoons with our signature Malaysian brunch spread. Enjoy endless artisan satay, soft-shell crab laksa bowls, signature nasi lemak royale, and free-flowing tropical botanical spritz cocktails.',
    schedule: 'Every Saturday & Sunday, 11:30 AM to 3:30 PM',
    timeframe: 'Saturdays & Sundays',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    badge: 'Weekend Special',
    terms: [
      'Advance reservation recommended',
      '2-hour seating duration per table',
      'Free-flow cocktail upgrade available for RM88 per guest'
    ],
    pricingHighlights: 'From RM128++ per person',
    ctaText: 'Reserve for Brunch',
    isActive: true,
    priority: 1
  },
  {
    id: 'promo-ladies-night',
    title: 'Velvet Thursdays: Ladies Night',
    slug: 'ladies-night',
    tagline: 'Complimentary craft cocktails, curated R&B grooves, and late night bites.',
    description: 'Every Thursday evening, ladies enjoy complimentary Lychee Rose Martinis and Calamansi Spritz between 8:00 PM and 10:00 PM with any food order, alongside special sharing platters and live vinyl sets.',
    schedule: 'Every Thursday, 8:00 PM to 12:00 AM',
    timeframe: 'Thursday Evenings',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    badge: 'Popular Night',
    terms: [
      'Up to 3 complimentary cocktails per lady with food order',
      'Group bookings of 4 or more receive a complimentary dessert platter'
    ],
    pricingHighlights: 'Complimentary cocktails with dining',
    ctaText: 'Book Thursday Table',
    isActive: true,
    priority: 2
  },
  {
    id: 'promo-live-dj-saturdays',
    title: 'Pulse & Plates: Live DJ Saturdays',
    slug: 'live-dj-saturdays',
    tagline: 'Deep melodic house, late-night wok delicacies, and crafted highballs.',
    description: 'When the dinner rush softens, Q-RESTOBAR transitions into an atmospheric lounge. Resident and guest DJs spin deep soulful grooves from 9:30 PM till late while our bar team serves signature drinks and midnight small plates.',
    schedule: 'Every Saturday, 9:30 PM till late',
    timeframe: 'Saturday Nights',
    imageUrl: '/images/DJLivemusic.png',
    badge: 'Nightlife',
    terms: [
      'Smart casual dress code strictly enforced after 9:00 PM',
      'Bottle service and private booth packages available on request'
    ],
    pricingHighlights: 'Cover charge waived with dinner reservation',
    ctaText: 'Reserve DJ Night Table',
    isActive: true,
    priority: 3
  },
  {
    id: 'promo-birthday-celebration',
    title: 'Bespoke Birthday Celebrations',
    slug: 'birthday-celebrations',
    tagline: 'Customised menu printings, sparkler desserts, and personalized dining.',
    description: 'Celebrate your special milestone at Q-RESTOBAR with tailored group set menus, custom dessert presentations featuring our Pandan Crème Brûlée, personalized cocktail greetings, and attentive banquet service.',
    schedule: 'Available daily upon reservation',
    timeframe: 'Daily',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    badge: 'Celebrations',
    terms: [
      'Advance notice of at least 48 hours required for custom menu printing',
      'Complimentary celebration cake for parties of 6 guests and above'
    ],
    pricingHighlights: 'Group packages from RM148++ per guest',
    ctaText: 'Plan a Birthday',
    isActive: true,
    priority: 4
  },
  {
    id: 'promo-corporate-dining',
    title: 'Corporate Dinners & Networking',
    slug: 'corporate-dining',
    tagline: 'Impress clients and celebrate team milestones in Bukit Bintang.',
    description: 'Host sophisticated client dinners and corporate celebrations with private audio-visual setup, multi-course executive tasting menus, curated wine pairings, and seamless single-invoice corporate billing.',
    schedule: 'Available Monday to Friday for Lunch and Dinner',
    timeframe: 'Weekdays',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    badge: 'Executive',
    terms: [
      'Dedicated event coordinator assigned to your booking',
      'Flexible minimum spend requirements depending on date and room choice'
    ],
    pricingHighlights: 'Custom executive menus available',
    ctaText: 'Inquire for Corporate',
    isActive: true,
    priority: 5
  },
  {
    id: 'promo-private-events',
    title: 'Exclusive Private Venue Buyouts',
    slug: 'private-events',
    tagline: 'Full restaurant and lounge hire for up to 120 seated or 180 standing guests.',
    description: 'Transform Q-RESTOBAR into your private luxury venue for product launches, gala celebrations, weddings, and brand activations. Full access to our sound system, lighting, bar team, and culinary masters.',
    schedule: 'Available on selected weekdays and Sundays',
    timeframe: 'Custom Booking',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    badge: 'Exclusive Buyout',
    terms: [
      'Minimum 2 weeks advance lead time',
      'Bespoke catering and mixology options tailored to your event theme'
    ],
    pricingHighlights: 'Bespoke quotation on request',
    ctaText: 'Contact Events Team',
    isActive: true,
    priority: 6
  }
];
