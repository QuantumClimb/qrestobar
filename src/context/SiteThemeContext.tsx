import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SiteThemeId, SiteThemeDefinition } from '../themes/types';
import { isRuntimeThemeAvailable, getRuntimeThemeDefinition } from '../themes/runtimeThemeRegistry';
import { applySiteTheme } from '../themes/themeUtils';
import { siteThemeService } from '../services/siteThemeService';
import { useTheme } from './ThemeContext';

export interface SiteThemeContextType {
  activeThemeId: SiteThemeId;
  previewThemeId: SiteThemeId | null;
  effectiveThemeId: SiteThemeId;
  activeTheme: SiteThemeDefinition;
  effectiveTheme: SiteThemeDefinition;
  previewTheme: (themeId: SiteThemeId) => { success: boolean; error?: string };
  clearThemePreview: () => void;
  publishTheme: (themeId: SiteThemeId) => { success: boolean; error?: string };
  resetToOriginalTheme: () => void;
  isThemeRuntimeAvailable: (themeId: SiteThemeId) => boolean;
}

const SiteThemeContext = createContext<SiteThemeContextType | undefined>(undefined);

export const SiteThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme: colorMode } = useTheme();
  const [activeThemeId, setActiveThemeId] = useState<SiteThemeId>(() => {
    return siteThemeService.getStoredSiteThemeId();
  });
  const [previewThemeId, setPreviewThemeId] = useState<SiteThemeId | null>(null);

  const effectiveThemeId: SiteThemeId = previewThemeId || activeThemeId;

  const activeTheme = useMemo(() => {
    return getRuntimeThemeDefinition(activeThemeId);
  }, [activeThemeId]);

  const effectiveTheme = useMemo(() => {
    return getRuntimeThemeDefinition(effectiveThemeId);
  }, [effectiveThemeId]);

  // Apply site theme tokens and attributes whenever effective theme or light/dark color mode changes
  useEffect(() => {
    applySiteTheme(effectiveTheme, colorMode);
  }, [effectiveTheme, colorMode]);

  const previewTheme = (themeId: SiteThemeId): { success: boolean; error?: string } => {
    if (!isRuntimeThemeAvailable(themeId)) {
      return {
        success: false,
        error: `Theme "${themeId}" is not currently available for preview in this release.`
      };
    }
    setPreviewThemeId(themeId);
    return { success: true };
  };

  const clearThemePreview = () => {
    setPreviewThemeId(null);
  };

  const publishTheme = (themeId: SiteThemeId): { success: boolean; error?: string } => {
    if (!isRuntimeThemeAvailable(themeId)) {
      return {
        success: false,
        error: `Theme "${themeId}" cannot be published because its runtime implementation is not yet available.`
      };
    }

    const saveResult = siteThemeService.storeSiteThemeId(themeId);
    if (!saveResult.success) {
      return saveResult;
    }

    setActiveThemeId(themeId);
    setPreviewThemeId(null);
    return { success: true };
  };

  const resetToOriginalTheme = () => {
    publishTheme('original');
  };

  const isThemeRuntimeAvailable = (themeId: SiteThemeId): boolean => {
    return isRuntimeThemeAvailable(themeId);
  };

  return (
    <SiteThemeContext.Provider
      value={{
        activeThemeId,
        previewThemeId,
        effectiveThemeId,
        activeTheme,
        effectiveTheme,
        previewTheme,
        clearThemePreview,
        publishTheme,
        resetToOriginalTheme,
        isThemeRuntimeAvailable,
      }}
    >
      {children}
    </SiteThemeContext.Provider>
  );
};

export const useSiteTheme = (): SiteThemeContextType => {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error('useSiteTheme must be used within a SiteThemeProvider');
  }
  return context;
};
