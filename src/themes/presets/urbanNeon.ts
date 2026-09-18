import { SiteThemeDefinition } from '../types';
import { THEME_CATALOG } from '../themeCatalog';

/**
 * Urban Neon Theme Preset
 * 
 * Cyber obsidian background, electric cyan & vibrant neon magenta nightlife aesthetic.
 * Fixed-dark color mode policy.
 */

export const urbanNeonThemePreset: SiteThemeDefinition = {
  metadata: {
    ...THEME_CATALOG['urban-neon'],
    available: true,
  },

  typography: {
    fontDisplay: '"Oswald", "Bebas Neue", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    fontMono: '"IBM Plex Mono", monospace',
    fontSerif: 'Georgia, serif',
    letterSpacingDisplay: '0.05em',
    letterSpacingLogo: '0.22em',
  },

  layout: {
    cardRadius: '6px',
    buttonRadius: '4px',
    inputRadius: '4px',
    borderWidth: '1px',
    glowEffect: '0 0 25px rgba(32, 227, 210, 0.35)',
  },

  darkTokens: {
    // Surfaces
    bgPrimary: '#090B18',
    bgSecondary: '#111827',
    bgCard: '#131B2E',
    bgElevated: '#1F293D',
    overlayColor: 'rgba(9, 11, 24, 0.85)',

    // Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#F3F4F6',
    textMuted: '#9CA3AF',

    // Borders & Accents
    borderDefault: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(32, 227, 210, 0.40)',
    accentPrimary: '#20E3D2',
    accentHover: '#14B8A6',
    accentSurface: 'rgba(32, 227, 210, 0.15)',

    // Buttons
    buttonPrimaryBg: '#20E3D2',
    buttonPrimaryText: '#090B18',
    buttonPrimaryBorder: '#20E3D2',
    buttonHoverBg: '#14B8A6',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#20E3D2',

    // Form Controls
    inputBg: '#111827',
    inputText: '#FFFFFF',
    inputBorder: 'rgba(255, 255, 255, 0.18)',
    inputPlaceholder: '#6B7280',
    inputFocusBorder: '#20E3D2',
    inputFocusRing: 'rgba(32, 227, 210, 0.25)',

    // Overlays & Header
    shadowColor: 'rgba(0, 0, 0, 0.90)',
    headerBg: 'rgba(9, 11, 24, 0.90)',
    headerBgScrolled: 'rgba(9, 11, 24, 0.98)',
    mobileMenuBg: 'rgba(9, 11, 24, 0.98)',
    logoTextColor: '#FFFFFF',

    // Specialized
    calendarIconFilter: 'invert(1)',
    cardImageGradient: 'rgba(19, 27, 46, 0.95)',
  },

  componentVariants: {
    announcementBarGradient: 'linear-gradient(90deg, #090B18 0%, #EC4899 50%, #20E3D2 100%)',
    announcementBarBorder: '1px solid rgba(32, 227, 210, 0.40)',
    announcementBarTextColor: '#FFFFFF',
    announcementBarLinkColor: '#20E3D2',
    goldDividerGradient: 'linear-gradient(90deg, transparent, rgba(32, 227, 210, 0.60), transparent)',
    heroOverlayGradient: 'linear-gradient(to top, #090B18 0%, rgba(9, 11, 24, 0.70) 60%, transparent 100%)',
    reservationCtaGradient: 'linear-gradient(to bottom, #111827 0%, rgba(19, 27, 46, 0.85) 50%, #090B18 100%)',
  }
};
