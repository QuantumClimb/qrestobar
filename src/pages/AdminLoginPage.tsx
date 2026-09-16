import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@qrestobar.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, lockoutRemainingSeconds, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || lockoutRemainingSeconds > 0) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      if (result.success) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid credentials. Please try again.');
        setPassword('');
      }
    } catch {
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLockedOut = lockoutRemainingSeconds > 0;

  return (
    <div className="min-h-screen bg-qc-base text-qc-primary flex flex-col justify-between relative overflow-hidden transition-colors selection:bg-purple-500/20">
      {/* Top Bar with Back Link & Theme Toggle */}
      <header className="p-4 sm:p-6 flex items-center justify-between z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-qc-body hover:text-purple-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </Link>

        <ThemeToggle />
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-qc-surface border border-border-default rounded-sm shadow-2xl p-6 sm:p-8 space-y-6 transition-all">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block focus:outline-none py-1">
              <span
                className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.22em] select-none transition-colors"
                style={{ color: 'var(--logo-text-color)' }}
              >
                Q - RESTOBAR
              </span>
            </Link>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 bg-purple-950/40 text-purple-300 border border-purple-600/40 text-[10px] font-mono font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5">
                <Database className="w-3 h-3 text-purple-400" />
                <span>Supabase Auth Live</span>
              </span>
            </div>

            <h1 className="text-2xl font-display font-bold text-qc-primary tracking-wide pt-2">
              CMS Admin Access
            </h1>

            <p className="text-xs text-qc-body font-light leading-relaxed">
              Sign in with your administrator credentials to manage digital menus, reservations, and promotions.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-qc-body"
              >
                Admin Email
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-qc-muted">
                  <Mail className="w-4 h-4" />
                </div>

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@qrestobar.com"
                  disabled={isSubmitting || isLockedOut}
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-qc-base text-qc-primary border border-border-strong rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-qc-body"
              >
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-qc-muted">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isSubmitting || isLockedOut}
                  autoFocus
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-qc-base text-qc-primary border border-border-strong rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-qc-muted hover:text-qc-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                className="p-3 bg-red-950/40 border border-red-500/40 rounded-sm text-xs text-red-300 flex items-start gap-2 animate-fade-in"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Lockout Notification */}
            {isLockedOut && (
              <div
                className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-sm text-xs text-amber-300 space-y-1"
                role="alert"
              >
                <p className="font-semibold">Too many failed attempts.</p>
                <p className="text-[11px] text-amber-200/80">
                  Rate limit active. Please wait{' '}
                  <span className="font-bold text-amber-100">{lockoutRemainingSeconds}s</span> before retrying.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLockedOut || !password || !email}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 active:scale-[0.99] text-white font-display font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md hover:shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Info Footer */}
          <div className="pt-4 border-t border-border-default text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-qc-muted font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Secured by PostgreSQL Row Level Security & Supabase Auth</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="p-4 text-center text-[11px] text-qc-muted z-10">
        <span>© {new Date().getFullYear()} Q-RESTOBAR • Powered by Quantum Climb</span>
      </footer>
    </div>
  );
};
