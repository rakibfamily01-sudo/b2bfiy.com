-- =========================================================================
-- B2BFIY AGENCY CMS - SUPABASE SQL SETUP SCRIPT
-- =========================================================================
-- Instructions:
-- 1. Go to your Supabase Dashboard (https://supabase.com).
-- 2. Open your project and click on the "SQL Editor" in the left sidebar.
-- 3. Click "New query" or "New empty query".
-- 4. Paste this entire script into the editor.
-- 5. Click the "Run" button (bottom-right of the SQL editor) to execute.
-- 6. Make sure you set your SUPABASE_URL and SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY)
--    in your Vercel deployment's environment variables.
-- =========================================================================

-- 1. CREATE ALL INDIVIDUAL SECTION TABLES
CREATE TABLE IF NOT EXISTS site_settings (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS navigation_items (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS hero_content (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS statistics (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS client_logos (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS services (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS why_choose_us (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS portfolio_categories (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS work_process (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS packages (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS testimonials (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS faqs (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS audit_requests (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS media (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS admin_profile (
  id bigint PRIMARY KEY DEFAULT 1,
  data jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. DISABLE ROW LEVEL SECURITY (RLS) FOR ALL CREATED TABLES
-- This allows direct backend-to-database writes and reads without needing public RLS policies.
-- (Alternatively, you can use your Supabase "service_role" secret key as SUPABASE_KEY,
-- which bypasses RLS automatically and securely!)
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
ALTER TABLE admin_profile DISABLE ROW LEVEL SECURITY;

-- 3. VERIFICATION SELECTS
SELECT 'Supabase Database tables successfully initialized!' as status;
