import React, { useState } from 'react';
import { useApp } from '../../components/AppContext';
import { Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Database, AlertTriangle, CheckCircle, Code, Copy, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DBStatus {
  supabaseEnabled: boolean;
  lastCloudError: string | null;
  supabaseUrlConfigured: boolean;
  supabaseKeyConfigured: boolean;
  adminEmail: string;
}

export default function Login() {
  const { login, showToast, navigateTo, isAdminVerified, toast } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<DBStatus | null>(null);
  const [copied, setCopied] = useState(false);

  // Automatically redirect if already logged in
  React.useEffect(() => {
    if (isAdminVerified) {
      navigateTo('/admin');
    }
  }, [isAdminVerified, navigateTo]);

  // Fetch Supabase & Database status
  React.useEffect(() => {
    fetch('/api/auth/db-status')
      .then(res => {
        if (!res.ok) throw new Error('Status endpoint failed');
        return res.json();
      })
      .then(data => {
        setDbStatus(data);
        if (data.adminEmail) {
          setEmail(data.adminEmail);
        }
      })
      .catch(err => {
        console.error('Failed to load database status:', err);
        // Robust fallback so login page doesn't hang on "Loading diagnostics..."
        setDbStatus({
          supabaseEnabled: false,
          lastCloudError: err instanceof Error ? err.message : String(err),
          supabaseUrlConfigured: false,
          supabaseKeyConfigured: false,
          adminEmail: 'thedelusiongaming024@gmail.com'
        });
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please specify both admin email and password.', 'error');
      return;
    }

    try {
      setLoading(true);
      const trimmedEmail = email.trim();
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login(data.token, data.email);
        showToast('Successfully logged in! Opening B2bfiy CMS...', 'success');
        navigateTo('/admin');
      } else {
        showToast(data.error || 'Invalid credentials. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Backend offline or network error.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sqlCommand = `-- Paste this SQL query into your Supabase SQL Editor:

-- 1. site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. navigation_items
CREATE TABLE IF NOT EXISTS navigation_items (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. hero_content
CREATE TABLE IF NOT EXISTS hero_content (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. statistics
CREATE TABLE IF NOT EXISTS statistics (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. client_logos
CREATE TABLE IF NOT EXISTS client_logos (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. services
CREATE TABLE IF NOT EXISTS services (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. why_choose_us
CREATE TABLE IF NOT EXISTS why_choose_us (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. portfolio_categories
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. portfolio_projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. work_process
CREATE TABLE IF NOT EXISTS work_process (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. packages
CREATE TABLE IF NOT EXISTS packages (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. faqs
CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. audit_requests
CREATE TABLE IF NOT EXISTS audit_requests (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. media
CREATE TABLE IF NOT EXISTS media (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. admin_profile
CREATE TABLE IF NOT EXISTS admin_profile (
  id BIGINT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) so our secure Vercel Express backend can read & write
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE work_process DISABLE ROW LEVEL SECURITY;
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profile DISABLE ROW LEVEL SECURITY;`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCommand);
    setCopied(true);
    showToast('SQL copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-warm-bg flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-soft-red rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
      
      {/* Login Box */}
      <div className="max-w-md w-full bg-brand-pure-white rounded-3xl border border-brand-border shadow-xl p-8 md:p-10 relative overflow-hidden">
        {/* Brand identity */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary text-brand-pure-white rounded-2xl font-black text-2xl shadow-md mb-4">
            B
          </div>
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">B2bfiy CMS Portal</h2>
          <p className="text-xs text-brand-secondary mt-1">Provide administrator credentials to access the website database.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 text-left">
          {/* Username/Email Input */}
          <div>
            <label className="block text-xs font-bold text-brand-dark mb-2">Admin Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary opacity-70" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="thedelusiongaming024@gmail.com"
                className="w-full pl-11 pr-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl text-xs focus:border-brand-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-brand-dark">Security Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary opacity-70" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-brand-warm-bg border border-brand-border rounded-xl text-xs focus:border-brand-primary outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-primary cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="block mt-1 text-[10px] text-brand-secondary">
              Default password is <code className="bg-brand-warm-bg px-1 py-0.5 rounded text-brand-primary font-bold">admin</code>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-primary text-brand-pure-white font-bold rounded-xl shadow-lg hover:bg-brand-coral transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs md:text-sm uppercase tracking-wider mt-2"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-brand-border text-center">
          <p className="text-[10px] text-brand-secondary flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-primary" />
            Designed by B2bfiy Studio. Secure PBKDF2 Transactional Locks.
          </p>
        </div>
      </div>

      {/* Diagnostics Panel (Vercel & Supabase Status Guide) */}
      <div className="max-w-md w-full bg-brand-pure-white rounded-3xl border border-brand-border shadow-xl p-6 relative overflow-hidden flex flex-col gap-4 text-brand-dark">
        <div className="flex items-center gap-2 border-b border-brand-border pb-3">
          <Database className="w-5 h-5 text-brand-primary" />
          <h3 className="font-black text-sm uppercase tracking-wider">Vercel & Supabase Diagnostics</h3>
        </div>

        {dbStatus ? (
          <div className="flex flex-col gap-3 text-xs">
            {/* Supabase connection state */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-warm-bg">
              <span className="font-bold text-brand-secondary">Supabase Cloud Sync</span>
              {dbStatus.supabaseEnabled ? (
                <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Enabled
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Local Mode Only
                </span>
              )}
            </div>

            {/* Config details */}
            <div className="space-y-1 text-[11px] text-brand-secondary bg-brand-warm-bg p-3 rounded-xl border border-brand-border">
              <div className="flex justify-between">
                <span>SUPABASE_URL:</span>
                <span className="font-bold text-brand-dark">{dbStatus.supabaseUrlConfigured ? '✅ Configured' : '❌ Missing'}</span>
              </div>
              <div className="flex justify-between">
                <span>SUPABASE_KEY:</span>
                <span className="font-bold text-brand-dark">{dbStatus.supabaseKeyConfigured ? '✅ Configured' : '❌ Missing'}</span>
              </div>
            </div>

            {/* Error notifications */}
            {dbStatus.supabaseEnabled && dbStatus.lastCloudError ? (
              <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-start gap-1.5 font-bold text-[11px]">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 animate-pulse" />
                  <span>Cloud DB Notice: Operating in Local Fallback</span>
                </div>
                <p className="text-[10px] bg-amber-100 p-1.5 rounded font-mono break-all text-amber-800">{dbStatus.lastCloudError}</p>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  <strong>No worries!</strong> The portal is fully operational using secure local backup storage. You can log in, edit, and manage pages perfectly! Your changes are safe and will automatically sync once your Supabase database starts up.
                </p>
              </div>
            ) : dbStatus.supabaseEnabled ? (
              <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-bold text-[11px]">Supabase is connected and synced perfectly!</span>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl space-y-1.5">
                <span className="font-bold block text-[11px]">⚠️ Ephemeral Storage warning:</span>
                <p className="text-[10px] text-amber-800 leading-normal">
                  Vercel resets server storage on every redeploy or cold start. Changes you make will be <strong>lost</strong> unless you configure Supabase variables in Vercel.
                </p>
              </div>
            )}

            {/* Action instructions to create table */}
            <div className="mt-2 border-t border-brand-border pt-3 space-y-2">
              <span className="font-bold text-brand-dark flex items-center gap-1">
                <Code className="w-4 h-4 text-brand-primary" /> Setup Instruction (Supabase)
              </span>
              <p className="text-[10px] text-brand-secondary">
                To create the database schema in Supabase, go to your <strong>Supabase Dashboard &gt; SQL Editor &gt; New Query</strong>, paste the script below, and click <strong>Run</strong>:
              </p>

              <div className="relative mt-2">
                <pre className="text-[9px] font-mono bg-brand-dark text-brand-pure-white p-3 rounded-xl overflow-x-auto max-h-40 leading-normal whitespace-pre">
                  {sqlCommand}
                </pre>
                <button
                  onClick={copySqlToClipboard}
                  className="absolute top-2 right-2 p-1.5 bg-brand-primary text-brand-pure-white hover:bg-brand-coral rounded-lg cursor-pointer transition-colors"
                  title="Copy SQL Script"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10 text-brand-secondary text-xs">
            Loading diagnostics...
          </div>
        )}
      </div>

      {/* Floating System Notification Toast for Login Feedback */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-brand-pure-white rounded-2xl shadow-xl border border-brand-border p-4 flex items-start gap-3.5 text-left"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
            )}
            <div className="flex-grow">
              <h5 className="font-bold text-sm text-brand-dark">
                {toast.type === 'success' ? 'Success' : 'Notification'}
              </h5>
              <p className="text-xs text-brand-secondary leading-relaxed mt-0.5">
                {toast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
