import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase, isDemoMode as checkDemoMode } from '../services/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

// ============================================================================
// AUTHENTICATION CONTEXT (Q-RESTOBAR CMS)
// ----------------------------------------------------------------------------
// Fully integrated with Supabase Auth (`supabase.auth.signInWithPassword`)
// with graceful fallback for offline demo showcase mode.
// ============================================================================

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  user: User | null;
  userEmail: string | null;
  sessionExpiresAt: number | null;
  lockoutRemainingSeconds: number;
  login: (credentials: { email?: string; password: string } | string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SESSION: 'qresto_admin_demo_session',
  FAILED_ATTEMPTS: 'qresto_admin_demo_failed_attempts',
  LOCKOUT_UNTIL: 'qresto_admin_demo_lockout_until',
};

const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 Hours for demo fallback
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000;

interface DemoSessionPayload {
  authenticated: boolean;
  email?: string;
  expiresAt: number;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);

  const isDemo = checkDemoMode();
  const demoPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'pass1234';

  // Check lockout status for client-side rate limiting
  const checkLockout = useCallback((): number => {
    try {
      const lockoutStr = sessionStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL);
      if (!lockoutStr) return 0;

      const lockoutTime = parseInt(lockoutStr, 10);
      const now = Date.now();

      if (now < lockoutTime) {
        const remaining = Math.ceil((lockoutTime - now) / 1000);
        setLockoutRemainingSeconds(remaining);
        return remaining;
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
        sessionStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
        setLockoutRemainingSeconds(0);
        return 0;
      }
    } catch {
      return 0;
    }
  }, []);

  // Initialize and check active session
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        // 1. If Supabase is configured, check live Supabase session
        if (supabase) {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (!error && session?.user && mounted) {
            setUser(session.user);
            setUserEmail(session.user.email || null);
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }

        // 2. Check local/demo session fallback
        const rawSession = sessionStorage.getItem(STORAGE_KEYS.SESSION);
        if (rawSession && mounted) {
          const demoSession: DemoSessionPayload = JSON.parse(rawSession);
          if (demoSession.authenticated && demoSession.expiresAt && Date.now() < demoSession.expiresAt) {
            setIsAuthenticated(true);
            setUserEmail(demoSession.email || 'admin@qrestobar.com');
            setSessionExpiresAt(demoSession.expiresAt);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Session verification issue:', err);
      } finally {
        if (mounted) {
          checkLockout();
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // 3. Listen to Supabase Auth state changes
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
        if (!mounted) return;
        if (session?.user) {
          setUser(session.user);
          setUserEmail(session.user.email || null);
          setIsAuthenticated(true);
        } else {
          // If no supabase session, keep demo session if valid
          const rawSession = sessionStorage.getItem(STORAGE_KEYS.SESSION);
          if (!rawSession) {
            setUser(null);
            setUserEmail(null);
            setIsAuthenticated(false);
          }
        }
        setIsLoading(false);
      });
      authListener = data;
    }

    return () => {
      mounted = false;
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [checkLockout]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setLockoutRemainingSeconds((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
          sessionStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutRemainingSeconds]);

  const login = async (
    credentials: { email?: string; password: string } | string
  ): Promise<{ success: boolean; error?: string }> => {
    const email = typeof credentials === 'string' ? 'admin@qrestobar.com' : (credentials.email || 'admin@qrestobar.com');
    const password = typeof credentials === 'string' ? credentials : credentials.password;

    // Check active lockout
    const remainingLockout = checkLockout();
    if (remainingLockout > 0) {
      return {
        success: false,
        error: `Too many failed attempts. Please wait ${remainingLockout}s before trying again.`,
      };
    }

    // 1. Try Supabase Auth first if available
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (!error && data.user) {
          setUser(data.user);
          setUserEmail(data.user.email || email);
          setIsAuthenticated(true);
          sessionStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
          sessionStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
          return { success: true };
        } else if (error) {
          // If demo password matches demo fallback, allow fallback login
          if (password === demoPassword) {
            const expiresAt = Date.now() + SESSION_DURATION_MS;
            sessionStorage.setItem(
              STORAGE_KEYS.SESSION,
              JSON.stringify({ authenticated: true, email, expiresAt })
            );
            setIsAuthenticated(true);
            setUserEmail(email);
            setSessionExpiresAt(expiresAt);
            return { success: true };
          }

          // Return Supabase error message
          return {
            success: false,
            error: error.message || 'Invalid login credentials.',
          };
        }
      } catch (err: any) {
        console.warn('Supabase Auth error, checking fallback:', err);
      }
    }

    // 2. Demo mode password fallback
    if (password === demoPassword) {
      sessionStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
      sessionStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
      setLockoutRemainingSeconds(0);

      const expiresAt = Date.now() + SESSION_DURATION_MS;
      sessionStorage.setItem(
        STORAGE_KEYS.SESSION,
        JSON.stringify({ authenticated: true, email, expiresAt })
      );
      setIsAuthenticated(true);
      setUserEmail(email);
      setSessionExpiresAt(expiresAt);

      return { success: true };
    }

    // Failed attempt handling
    let attempts = 0;
    try {
      attempts = parseInt(sessionStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS) || '0', 10);
    } catch {
      attempts = 0;
    }
    attempts += 1;

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
      sessionStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, lockoutTime.toString());
      sessionStorage.removeItem(STORAGE_KEYS.FAILED_ATTEMPTS);
      setLockoutRemainingSeconds(LOCKOUT_DURATION_MS / 1000);
      return {
        success: false,
        error: 'Too many failed attempts. Please wait 60 seconds.',
      };
    } else {
      sessionStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, attempts.toString());
      return {
        success: false,
        error: 'Incorrect email or password. Please try again.',
      };
    }
  };

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
    setUserEmail(null);
    setIsAuthenticated(false);
    setSessionExpiresAt(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isDemoMode: isDemo,
        user,
        userEmail,
        sessionExpiresAt,
        lockoutRemainingSeconds,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
