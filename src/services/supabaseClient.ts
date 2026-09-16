import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration & Adapter Layer
 * 
 * Automatically connects to your Supabase project when VITE_SUPABASE_URL and
 * VITE_SUPABASE_ANON_KEY are present. Falls back cleanly to LocalStorage demo mode
 * if credentials are not configured or if in demo mode.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const envDemo = import.meta.env.VITE_DEMO_MODE;

export const isDemoMode = (): boolean => {
  if (envDemo === 'false' && Boolean(supabaseUrl) && Boolean(supabaseAnonKey)) {
    return false;
  }
  return true;
};

export const SUPABASE_CONFIG = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  isDemo: isDemoMode(),
};

// Create and export the Supabase Client instance
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
