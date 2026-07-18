import React, { useState, useEffect } from 'react';
import { useApp, apiFetch } from '../../components/AppContext';
import { User, Lock, Eye, EyeOff, ShieldCheck, Database, AlertTriangle, ArrowRight, CheckCircle2, Copy, Check, FileCode } from 'lucide-react';

const SUPABASE_SQL_SCRIPT = `-- Supabase Table Setup Script for B2bfiy CMS
-- Copy and run this script in the SQL Editor of your Supabase Dashboard

CREATE TABLE IF NOT EXISTS site_settings (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS navigation_items (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS hero_content (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS statistics (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS client_logos (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS services (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS why_choose_us (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS portfolio_categories (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS portfolio_projects (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS work_process (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS packages (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS testimonials (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS faqs (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS audit_requests (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS contact_messages (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS media (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));
CREATE TABLE IF NOT EXISTS admin_profile (id bigint PRIMARY KEY DEFAULT 1, data jsonb, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()));

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

export default function Login() {
  const { login, showToast, navigateTo, isAdminVerified, toast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCopySql = () => {
    try {
      navigator.clipboard.writeText(SUPABASE_SQL_SCRIPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showToast('Supabase SQL Setup script successfully copied!', 'success');
    } catch (e) {
      showToast('Failed to copy. Please copy from /SUPABASE_SETUP.sql', 'error');
    }
  };

  // If already logged in, go straight to admin dashboard
  useEffect(() => {
    if (isAdminVerified) {
      navigateTo('/admin');
    }
  }, [isAdminVerified, navigateTo]);

  // Load Database/Supabase statuses on mount
  useEffect(() => {
    const fetchDbStatus = async () => {
      try {
        const res = await apiFetch('/api/auth/db-status');
        if (res.ok) {
          const data = await res.json();
          setDbStatus(data);
          if (data.adminEmail) {
            setEmail(prev => prev ? prev : data.adminEmail);
          }
        }
      } catch (err) {
        console.error('Failed to load DB status:', err);
      }
    };
    fetchDbStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please specify both admin email/username and password.', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('Failed to parse response as JSON. Raw body:', text);
        if (text.includes('__cookie_check') || text.includes('<html>') || text.includes('302 Found')) {
          throw new Error('Third-party cookies are blocked in this iframe. Please click the "Open in new tab" icon (top-right of the preview window) or open this page directly in a new tab to log in successfully!');
        }
        if (res.status >= 500) {
          throw new Error(`The server is currently booting up or restarting (Status ${res.status}). Please try again in 5-10 seconds!`);
        }
        throw new Error(`Invalid response from server (non-JSON).`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate admin session.');
      }

      if (data.success && data.token) {
        login(data.token, data.email);
        navigateTo('/admin');
      } else {
        throw new Error('Incomplete response payload from server.');
      }
    } catch (err: any) {
      showToast(err.message || 'Login failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoLogin = async () => {
    try {
      setLoading(true);
      setEmail('b2bfiy');
      setPassword('rakib1122@#');
      
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'b2bfiy', password: 'rakib1122@#' }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        if (text.includes('__cookie_check') || text.includes('<html>') || text.includes('302 Found')) {
          throw new Error('Third-party cookies are blocked in this iframe. Please click the "Open in new tab" icon (top-right of the preview window) or open this page directly in a new tab to log in successfully!');
        }
        if (res.status >= 500) {
          throw new Error('Server is currently booting up. Please try again in 5 seconds!');
        }
        throw new Error('Invalid response from server.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate.');
      }

      if (data.success && data.token) {
        login(data.token, data.email);
        navigateTo('/admin');
      } else {
        throw new Error('Incomplete response payload.');
      }
    } catch (err: any) {
      showToast(err.message || 'Auto-login failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-warm-bg flex flex-col items-center justify-center p-6 md:p-12 selection:bg-brand-primary selection:text-brand-pure-white">
      {/* Toast Notifier */}
      {toast.message && (
        <div 
          id="toast-notification"
          className={`fixed top-6 right-6 z-50 flex items-center gap-3.5 px-6 py-4 rounded-2xl border shadow-xl max-w-sm animate-fade-in ${
            toast.type === 'success' 
              ? 'bg-brand-pure-white border-green-100 text-green-800' 
              : 'bg-brand-pure-white border-red-100 text-red-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span className="text-xs font-bold leading-tight">{toast.message}</span>
        </div>
      )}

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Login Form */}
        <div id="login-form-card" className="md:col-span-6 bg-brand-pure-white rounded-3xl border border-brand-border p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            {/* Branding Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 bg-brand-primary text-brand-pure-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
                B
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">B2bfiy CMS Portal</h1>
              <p className="text-xs text-brand-secondary mt-1">Provide administrator credentials to access the website database.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 text-left">
              {/* Username/Email Input */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2">Admin Login ID / Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary opacity-70" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="b2bfiy"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-dark transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="block text-[10px] text-brand-secondary mt-1.5">
                  Default credentials: ID <code className="bg-brand-warm-bg px-1 py-0.5 rounded text-brand-primary font-bold">b2bfiy</code> and password <code className="bg-brand-warm-bg px-1 py-0.5 rounded text-brand-primary font-bold">rakib1122@#</code>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-brand-primary text-brand-pure-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/20 transition-all cursor-pointer mt-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? 'Verifying Session...' : 'ENTER DASHBOARD'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* One-Click Auto-Login Button */}
              <button
                type="button"
                onClick={handleAutoLogin}
                disabled={loading}
                className="w-full py-3 px-6 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>⚡ ONE-CLICK AUTO LOGIN</span>
              </button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-center gap-2 text-[10px] text-brand-secondary">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span>Designed by B2bfiy Studio. Secure PBKDF2 Transactional Locks.</span>
          </div>
        </div>

        {/* Right Card: Diagnostics & Sync Information */}
        <div id="diagnostics-card" className="md:col-span-6 bg-brand-pure-white rounded-3xl border border-brand-border p-8 md:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-brand-border">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">Supabase Sync Diagnostics</h3>
                <p className="text-[10px] text-brand-secondary">Real-time Cloud Database Status Monitoring</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Cloud Sync Status */}
              <div className="bg-brand-warm-bg/50 p-4 rounded-2xl border border-brand-border flex items-center justify-between">
                <div>
                  <span className="block text-xs font-extrabold text-brand-dark">Supabase Cloud Sync</span>
                  <span className="text-[9px] text-brand-secondary">Automatically writes changes to cloud database</span>
                </div>
                {dbStatus?.supabaseEnabled ? (
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[9px] font-bold">Cloud Sync Enabled</span>
                ) : (
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-100 rounded-full text-[9px] font-bold">Local File Backup Only</span>
                )}
              </div>

              {/* Variable Validations */}
              <div className="p-4 rounded-2xl border border-brand-border">
                <h4 className="text-xs font-bold text-brand-dark mb-3">Environment Checklists</h4>
                <div className="flex flex-col gap-2.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-secondary">SUPABASE_URL</span>
                    {dbStatus?.supabaseUrlConfigured ? (
                      <span className="text-green-600 font-bold flex items-center gap-1">✓ Active</span>
                    ) : (
                      <span className="text-red-500 font-bold flex items-center gap-1">✗ Missing</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-secondary">SUPABASE_KEY</span>
                    {dbStatus?.supabaseKeyConfigured ? (
                      <span className="text-green-600 font-bold flex items-center gap-1">✓ Active</span>
                    ) : (
                      <span className="text-red-500 font-bold flex items-center gap-1">✗ Missing</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Error warning and SQL script copy button */}
              {dbStatus?.supabaseEnabled && dbStatus?.lastCloudError && (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex flex-col gap-3 text-red-900 text-xs animate-pulse">
                  <div className="flex gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-extrabold text-[11px] text-red-900">Supabase Tables Missing!</h5>
                      <p className="text-[10px] text-red-700 leading-normal mt-1">
                        You have connected Supabase, but the 17 required tables do not exist or are empty in your database. 
                        <strong> Run the SQL script below in your Supabase SQL Editor</strong> to fix this instantly:
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>✓ SETUP SQL COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>📋 COPY SUPABASE SQL SETUP</span>
                      </>
                    )}
                  </button>
                  <span className="text-[9px] text-red-500 text-center block">
                    (Paste in Supabase &gt; SQL Editor &gt; Run)
                  </span>
                </div>
              )}

              {/* Storage Warning */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex gap-3 text-amber-900 text-xs">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-extrabold text-[11px] text-amber-900">Local Cache & Cloud Syncing</h5>
                  <p className="text-[10px] text-amber-700 leading-normal mt-1">
                    When Supabase variables are configured, all edits made inside this dashboard are permanently saved in your Cloud PostgreSQL tables instantly. Otherwise, they remain in the server's local file store.
                  </p>
                </div>
              </div>

              {/* Handy always available button to copy SQL */}
              {dbStatus?.supabaseEnabled && !dbStatus?.lastCloudError && (
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="w-full py-2.5 px-4 bg-brand-warm-bg text-brand-dark hover:bg-brand-border/40 border border-brand-border rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">✓ SQL SETUP COPIED</span>
                    </>
                  ) : (
                    <>
                      <FileCode className="w-4 h-4 text-brand-primary" />
                      <span>GET DATABASE SQL SETUP</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 text-[10px] text-brand-secondary text-center leading-relaxed">
            Trouble logging in? Make sure your server is initialized. The system will auto-heal and pre-seed credentials if databases are refreshed.
          </div>
        </div>
      </div>
    </div>
  );
}
