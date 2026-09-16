import { SiteThemeDefinition } from '../types';
import { THEME_CATALOG } from '../themeCatalog';

/**
 * Original Theme Preset (Quantum Climb Ultraviolet Baseline)
 * 
 * Exact 1:1 typed representation of the visual values in src/index.css,
 * tailwind.config.js, and existing public components.
 */

export const originalThemePreset: SiteThemeDefinition = {
  metadata: THEME_CATALOG['original'],
  
  typography: {
    fontDisplay: '"Space Grotesk", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    fontMono: '"IBM Plex Mono", monospace',
    fontSerif: '"Cinzel", Georgia, serif',
    letterSpacingDisplay: '-0.01em',
    letterSpacingLogo: '0.22em',
  },

  layout: {
    cardRadius: '4px',
    buttonRadius: '3px',
    inputRadius: '3px',
    borderWidth: '1px',
    glowEffect: '0 0 20px rgba(124, 58, 237, 0.28)',
  },

  darkTokens: {
    // Surfaces
    bgPrimary: '#050506',
    bgSecondary: '#08080A',
    bgCard: '#0A0A0D',
    bgElevated: '#101014',
    overlayColor: 'rgba(5, 5, 6, 0.72)',

    // Typography
    textPrimary: '#F5F5F7',
    textSecondary: '#B8BBC3',
    textMuted: '#777B86',

    // Borders & Accents
    borderDefault: '#27272F',
    borderStrong: '#3A3A44',
    accentPrimary: '#8B5CF6',
    accentHover: '#A855F7',
    accentSurface: 'rgba(139, 92, 246, 0.12)',

    // Buttons
    buttonPrimaryBg: '#E2E4E8',
    buttonPrimaryText: '#09090B',
    buttonPrimaryBorder: '#F5F5F7',
    buttonHoverBg: '#7C3AED',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#A855F7',

    // Form Controls
    inputBg: '#09090C',
    inputText: '#F5F5F7',
    inputBorder: '#303038',
    inputPlaceholder: '#717580',
    inputFocusBorder: '#8B5CF6',
    inputFocusRing: 'rgba(139, 92, 246, 0.16)',

    // Overlays & Header
    shadowColor: 'rgba(0, 0, 0, 0.70)',
    headerBg: 'rgba(5, 5, 6, 0.85)',
    headerBgScrolled: 'rgba(5, 5, 6, 0.97)',
    mobileMenuBg: 'rgba(5, 5, 6, 0.97)',
    logoTextColor: '#F5F5F7',

    // Specialized
    calendarIconFilter: 'invert(1)',
    cardImageGradient: 'rgba(10, 10, 13, 0.95)',
  },

  lightTokens: {
    // Surfaces
    bgPrimary: '#F4F4F6',
    bgSecondary: '#ECEDEF',
    bgCard: '#FFFFFF',
    bgElevated: '#F8F8FA',
    overlayColor: 'rgba(244, 244, 246, 0.75)',

    // Typography
    textPrimary: '#111114',
    textSecondary: '#454852',
    textMuted: '#6D717C',

    // Borders & Accents
    borderDefault: '#D7D9DF',
    borderStrong: '#B8BBC4',
    accentPrimary: '#6D28D9',
    accentHover: '#7C3AED',
    accentSurface: 'rgba(109, 40, 217, 0.09)',

    // Buttons
    buttonPrimaryBg: '#17171B',
    buttonPrimaryText: '#FFFFFF',
    buttonPrimaryBorder: '#17171B',
    buttonHoverBg: '#7C3AED',
    buttonHoverText: '#FFFFFF',
    buttonHoverBorder: '#A855F7',

    // Form Controls
    inputBg: '#FFFFFF',
    inputText: '#151519',
    inputBorder: '#CACDD4',
    inputPlaceholder: '#777B85',
    inputFocusBorder: '#8B5CF6',
    inputFocusRing: 'rgba(139, 92, 246, 0.16)',

    // Overlays & Header
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    headerBg: 'rgba(244, 244, 246, 0.88)',
    headerBgScrolled: 'rgba(244, 244, 246, 0.97)',
    mobileMenuBg: 'rgba(244, 244, 246, 0.98)',
    logoTextColor: '#111114',

    // Specialized
    calendarIconFilter: 'none',
    cardImageGradient: 'rgba(255, 255, 255, 0.95)',
  },

  componentVariants: {
    announcementBarGradient: 'linear-gradient(90deg, #17002B 0%, #4B00B5 50%, #25005C 100%)',
    announcementBarBorder: '1px solid rgba(129, 76, 255, 0.40)',
    announcementBarTextColor: '#F5F5F7',
    announcementBarLinkColor: '#C084FC',
    goldDividerGradient: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.12), transparent)',
    heroOverlayGradient: 'linear-gradient(to top, #050506 0%, transparent 60%)',
    reservationCtaGradient: 'linear-gradient(to bottom, #08080A 0%, rgba(5, 5, 6, 0.72) 50%, #08080A 100%)',
  }
};
