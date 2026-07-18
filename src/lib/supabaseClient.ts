import { createClient } from '@supabase/supabase-js';
import { Lead, SiteConfig } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase Client ONLY if credentials are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export function isSupabaseConfigured(): boolean {
  return !!supabase;
}

// Convert DB Lead (snake_case) to Frontend Lead (camelCase)
function mapDbToLead(dbLead: any): Lead {
  return {
    id: dbLead.id,
    name: dbLead.name,
    businessName: dbLead.business_name || '',
    phone: dbLead.phone || '',
    email: dbLead.email || '',
    websiteOrPage: dbLead.website_or_page || '',
    serviceNeeded: dbLead.service_needed || '',
    message: dbLead.message || '',
    status: dbLead.status || 'Pending',
    source: dbLead.source || 'Contact Form',
    createdAt: dbLead.created_at || new Date().toISOString(),
    auditDetails: dbLead.audit_details || undefined,
    adminNotes: dbLead.admin_notes || ''
  };
}

// Convert Frontend Lead (camelCase) to DB Lead (snake_case)
function mapLeadToDb(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name,
    business_name: lead.businessName,
    phone: lead.phone,
    email: lead.email,
    website_or_page: lead.websiteOrPage,
    service_needed: lead.serviceNeeded,
    message: lead.message,
    status: lead.status,
    source: lead.source,
    created_at: lead.createdAt,
    audit_details: lead.auditDetails || null,
    admin_notes: lead.adminNotes || null
  };
}

/**
 * FETCH ALL LEADS
 */
export async function fetchLeads(fallbackLeads: Lead[]): Promise<{ data: Lead[]; source: 'supabase' | 'local'; error?: string }> {
  if (!supabase) {
    return { data: getLocalLeads(fallbackLeads), source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const mapped = (data || []).map(mapDbToLead);
    // Sync to local storage as secondary backup
    localStorage.setItem('b2bfiy_leads_db', JSON.stringify(mapped));
    return { data: mapped, source: 'supabase' };
  } catch (err: any) {
    console.error('Supabase fetchLeads error, falling back to local storage:', err);
    return { 
      data: getLocalLeads(fallbackLeads), 
      source: 'local', 
      error: err.message || 'Database table might not exist yet.' 
    };
  }
}

/**
 * SAVE OR UPDATE LEAD
 */
export async function saveLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  const dbLead = mapLeadToDb(lead);

  // Always save locally first as backup
  const localLeads = getLocalLeads([]);
  const existingIndex = localLeads.findIndex(l => l.id === lead.id);
  if (existingIndex >= 0) {
    localLeads[existingIndex] = lead;
  } else {
    localLeads.unshift(lead);
  }
  localStorage.setItem('b2bfiy_leads_db', JSON.stringify(localLeads));

  if (!supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .upsert(dbLead, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Supabase saveLead error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * DELETE LEAD
 */
export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  // Always update local storage first
  const localLeads = getLocalLeads([]);
  const filtered = localLeads.filter(l => l.id !== id);
  localStorage.setItem('b2bfiy_leads_db', JSON.stringify(filtered));

  if (!supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Supabase deleteLead error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * FETCH SITE CONFIG
 */
export async function fetchSiteConfig(fallbackConfig: SiteConfig): Promise<{ data: SiteConfig; source: 'supabase' | 'local'; error?: string }> {
  if (!supabase) {
    return { data: getLocalSiteConfig(fallbackConfig), source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'config')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Record doesn't exist yet, seed it with fallback
        console.log('No configuration found in Supabase. Seeding with current config...');
        await saveSiteConfig(fallbackConfig);
        return { data: fallbackConfig, source: 'supabase' };
      }
      throw error;
    }

    if (data && data.value) {
      // Sync locally
      localStorage.setItem('b2bfiy_site_config', JSON.stringify(data.value));
      return { data: data.value as SiteConfig, source: 'supabase' };
    }

    return { data: getLocalSiteConfig(fallbackConfig), source: 'local' };
  } catch (err: any) {
    console.error('Supabase fetchSiteConfig error, falling back to local storage:', err);
    return { 
      data: getLocalSiteConfig(fallbackConfig), 
      source: 'local', 
      error: err.message || 'Database table might not exist yet.' 
    };
  }
}

/**
 * SAVE SITE CONFIG
 */
export async function saveSiteConfig(config: SiteConfig): Promise<{ success: boolean; error?: string }> {
  // Always update locally first
  localStorage.setItem('b2bfiy_site_config', JSON.stringify(config));

  if (!supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        key: 'config',
        value: config,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Supabase saveSiteConfig error:', err);
    return { success: false, error: err.message };
  }
}

// Local Storage helpers
function getLocalLeads(fallback: Lead[]): Lead[] {
  const stored = localStorage.getItem('b2bfiy_leads_db');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function getLocalSiteConfig(fallback: SiteConfig): SiteConfig {
  const stored = localStorage.getItem('b2bfiy_site_config');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

/**
 * GET THE SQL SCHEMA FOR MANUAL SETUP
 */
export function getSQLSchema(): string {
  return `-- 1. Create leads table to store customer inquiries and free audit results
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  business_name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  website_or_page TEXT,
  service_needed TEXT,
  message TEXT,
  status TEXT DEFAULT 'Pending',
  source TEXT DEFAULT 'Contact Form',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  audit_details JSONB,
  admin_notes TEXT
);

-- 2. Create site_settings table to store the custom admin panel configuration
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Public Access policies (For easy deployment without complex auth logic)
-- Turn off Row Level Security (RLS) for these tables or add public policies in Supabase dashboard.
-- To disable RLS (Simplest for rapid setup):
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- (Optional) If you prefer to KEEP RLS enabled, run these policies instead:
/*
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read/write on leads" ON leads FOR ALL USING (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read/write on site_settings" ON site_settings FOR ALL USING (true);
*/`;
}
