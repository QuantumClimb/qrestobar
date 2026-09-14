/**
 * Supabase Client Configuration & Adapter Layer
 * 
 * Note: By default, this demo application runs in self-contained LocalStorage mode
 * when VITE_DEMO_MODE=true or when VITE_SUPABASE_URL is not set.
 * 
 * To connect to a live Supabase project:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Run the SQL migrations from `supabase/schema.sql` in the SQL editor.
 * 3. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
 * 4. Set VITE_DEMO_MODE=false.
 * 
 * SECURITY NOTICE:
 * Never expose the Supabase `service_role` secret key in the frontend client.
 * Use the public `anon` key only, backed by PostgreSQL Row Level Security (RLS).
 */

export const isDemoMode = (): boolean => {
  const envDemo = import.meta.env.VITE_DEMO_MODE;
  const hasUrl = Boolean(import.meta.env.VITE_SUPABASE_URL);
  const hasKey = Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);
  
  if (envDemo === 'false' && hasUrl && hasKey) {
    return false;
  }
  return true;
};

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isDemo: isDemoMode(),
};
