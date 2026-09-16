import { SiteThemeId, ThemeMetadata } from './types';

/**
 * Central Theme Catalog
 * 
 * Defines metadata, access policies, and preview specifications for all six themes.
 * Note: `available` signifies whether runtime implementation is complete.
 */

export const THEME_CATALOG: Record<SiteThemeId, ThemeMetadata> = {
  'original': {
    id: 'original',
    name: 'Original Theme',
    tagline: 'Quantum Climb signature ultraviolet & sleek obsidian aesthetic',
    description: 'The iconic Q-RESTOBAR visual identity featuring dark obsidian surfaces, electric ultraviolet accents, and dual light/dark flexibility.',
    access: 'included',
    colorModePolicy: 'user-toggle',
    previewImage: '/images/themes/original-theme.png',
    available: true,
    accentColor: '#8B5CF6',
    secondaryAccent: '#7C3AED',
    tags: ['Signature', 'Ultraviolet', 'Dual-Mode'],
    badge: 'Active Default'
  },
  'midnight-ember': {
    id: 'midnight-ember',
    name: 'Midnight Ember',
    tagline: 'Deep charcoal, smoldering amber & burnished copper warmth',
    description: 'An intimate, dimly lit speakeasy mood evoking aged oak, glowing embers, and artisanal whiskey cocktails.',
    access: 'premium',
    colorModePolicy: 'fixed-dark',
    previewImage: '/images/themes/midnight-ember.png',
    available: false,
    accentColor: '#F59E0B',
    secondaryAccent: '#D97706',
    tags: ['Speakeasy', 'Amber Glow', 'Intimate'],
    badge: 'Premium'
  },
  'heritage-spice': {
    id: 'heritage-spice',
    name: 'Heritage Spice',
    tagline: 'Rich cinnamon, toasted rempah terracotta & golden turmeric',
    description: 'Warm, earthy tones celebrating Malaysia’s rich spice heritage, artisanal clay pot traditions, and culinary craftsmanship.',
    access: 'premium',
    colorModePolicy: 'fixed-warm',
    previewImage: '/images/themes/heritage-spice.png',
    available: false,
    accentColor: '#D97706',
    secondaryAccent: '#9A3412',
    tags: ['Malaysian Roots', 'Terracotta', 'Warm Spice'],
    badge: 'Premium'
  },
  'botanical-bistro': {
    id: 'botanical-bistro',
    name: 'Botanical Bistro',
    tagline: 'Lush tropical sage, rainforest emerald & delicate gold accents',
    description: 'A daytime garden oasis ambiance infused with fresh botanical herbs, airy natural sunlight, and tropical flora.',
    access: 'premium',
    colorModePolicy: 'fixed-light',
    previewImage: '/images/themes/botanical-bistro.png',
    available: false,
    accentColor: '#059669',
    secondaryAccent: '#10B981',
    tags: ['Botanical', 'Rainforest', 'Bright Oasis'],
    badge: 'Premium'
  },
  'urban-neon': {
    id: 'urban-neon',
    name: 'Urban Neon',
    tagline: 'Cyber obsidian, electric cyan & vibrant neon magenta nightlife',
    description: 'High-energy Bukit Bintang nightlife aesthetic inspired by neon city skylines, late-night DJ sets, and electric lounge vibes.',
    access: 'premium',
    colorModePolicy: 'fixed-dark',
    previewImage: '/images/themes/urban-neon.png',
    available: false,
    accentColor: '#06B6D4',
    secondaryAccent: '#EC4899',
    tags: ['Nightlife', 'Electric Cyan', 'Futuristic'],
    badge: 'Premium'
  },
  'coastal-linen': {
    id: 'coastal-linen',
    name: 'Coastal Linen',
    tagline: 'Sun-bleached driftwood, sea salt sands & breezy indigo mists',
    description: 'An airy, relaxed coastal dining atmosphere combining natural linen textures, sea breeze tones, and laid-back sophistication.',
    access: 'premium',
    colorModePolicy: 'fixed-light',
    previewImage: '/images/themes/coastal-linen.png',
    available: false,
    accentColor: '#0284C7',
    secondaryAccent: '#38BDF8',
    tags: ['Coastal', 'Natural Linen', 'Breezy'],
    badge: 'Premium'
  }
};

export const THEME_CATALOG_LIST: ThemeMetadata[] = Object.values(THEME_CATALOG);

export const DEFAULT_THEME_ID: SiteThemeId = 'original';

export const getThemeMetadata = (id: SiteThemeId): ThemeMetadata => {
  return THEME_CATALOG[id] || THEME_CATALOG[DEFAULT_THEME_ID];
};
