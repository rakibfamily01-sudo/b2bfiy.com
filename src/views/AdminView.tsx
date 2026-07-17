import React, { useState, useEffect } from 'react';
import { useApp } from '../components/AppContext';
import { useRouter, Link } from '../components/Router';
import { 
  LayoutDashboard, Settings as SettingsIcon, Image as ImageIcon, 
  Package, MessageSquare, Plus, Trash2, Edit, CheckCircle, 
  Eye, EyeOff, LogOut, Save, Phone, Shield, Activity, X, 
  ChevronRight, Laptop, HelpCircle, FileText 
} from 'lucide-react';
import { PortfolioProject, PackageItem, AuditRequest, ContactMessage } from '../types';

export default function AdminView() {
  const { 
    settings, hero, topbar, header, statistics, clientLogos, whyChooseUs, 
    portfolioProjects, portfolioCategories, workProcess, packages, testimonials, 
    faqs, adminSession, setAdminSession, refreshData 
  } = useApp();

  const { navigate } = useRouter();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<'dashboard' | 'settings' | 'hero' | 'portfolio' | 'packages' | 'leads' | 'faqs' | 'account'>('dashboard');

  // Leads state
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Generic modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Partial<PackageItem> | null>(null);

  // Save/Update notifications
  const [notify, setNotify] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch Admin leads on tab open or load
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const [resAudit, resContact] = await Promise.all([
        fetch('/api/audit-requests'),
        fetch('/api/contact-messages')
      ]);
      if (resAudit.ok && resContact.ok) {
        const auditData = await resAudit.json();
        const contactData = await resContact.json();
        setAuditRequests(auditData.data || []);
        setContactMessages(contactData.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    if (adminSession?.authenticated) {
      fetchLeads();
    }
  }, [adminSession]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotify({ message, type });
    setTimeout(() => setNotify(null), 4000);
  };

  // 1. Auth Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both your username and password!');
      return;
    }

    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminSession({ authenticated: true, username: data.username });
        showNotification('Successfully logged in!');
        fetchLeads();
      } else {
        setLoginError(data.error || 'Invalid username or password!');
      }
    } catch (err) {
      setLoginError('Server connection error! Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 2. Auth Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAdminSession({ authenticated: false });
      navigate('/');
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  // Account Credentials Save Handler
  const [accountForm, setAccountForm] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountLoading, setAccountLoading] = useState(false);

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountForm.currentPassword) {
      setAccountError('Please enter your current password to make changes.');
      return;
    }
    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      setAccountError('New password and confirm password do not match.');
      return;
    }

    setAccountLoading(true);
    setAccountError(null);

    try {
      const res = await fetch('/api/auth/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: accountForm.username || undefined,
          currentPassword: accountForm.currentPassword,
          newPassword: accountForm.newPassword || undefined
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Admin credentials updated successfully! Log in again to verify.');
        setAccountForm({
          username: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        refreshData();
        // Log out user so they can log back in with their new credentials
        handleLogout();
      } else {
        setAccountError(data.error || 'Failed to update credentials.');
      }
    } catch (err) {
      setAccountError('Server connection error! Please try again.');
    } finally {
      setAccountLoading(false);
    }
  };

  // 3. Settings Save Handler
  const [settingsForm, setSettingsForm] = useState(settings || {});
  useEffect(() => {
    if (settings) setSettingsForm(settings);
  }, [settings]);

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        showNotification('Site settings saved successfully!');
        refreshData();
      } else {
        showNotification('Failed to save settings.', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  // 4. Hero & Topbar Save Handler
  const [heroForm, setHeroForm] = useState(hero || {});
  const [topbarForm, setTopbarForm] = useState(topbar || {});
  const [headerForm, setHeaderForm] = useState(header || {});

  useEffect(() => {
    if (hero) setHeroForm(hero);
    if (topbar) setTopbarForm(topbar);
    if (header) setHeaderForm(header);
  }, [hero, topbar, header]);

  const handleHeroSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [resHero, resTopbar, resHeader] = await Promise.all([
        fetch('/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(heroForm)
        }),
        fetch('/api/topbar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(topbarForm)
        }),
        fetch('/api/header', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(headerForm)
        })
      ]);

      if (resHero.ok && resTopbar.ok && resHeader.ok) {
        showNotification('Hero banner and navigation settings saved successfully!');
        refreshData();
      } else {
        showNotification('Failed to save settings!', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  // 5. Portfolio CRUD Handlers
  const handleOpenAddProject = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'website-development',
      date: new Date().getFullYear().toString(),
      clientName: '',
      shortDescription: '',
      fullDescription: '',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
      galleryImages: [],
      tools: [],
      tags: [],
      status: 'draft',
      featured: false
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: PortfolioProject) => {
    setEditingProject(proj);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    // Validate slug
    if (!editingProject.slug?.trim() || !editingProject.title?.trim()) {
      showNotification('Please enter the title and a unique URL slug!', 'error');
      return;
    }

    try {
      const method = editingProject.id ? 'PUT' : 'POST';
      const url = editingProject.id 
        ? `/api/portfolio-projects/${editingProject.id}` 
        : '/api/portfolio-projects';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      });

      if (res.ok) {
        showNotification(editingProject.id ? 'Project updated successfully!' : 'New project added successfully!');
        setIsProjectModalOpen(false);
        setEditingProject(null);
        refreshData();
      } else {
        const data = await res.json();
        showNotification(data.error || 'Failed to save project!', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone!')) return;
    try {
      const res = await fetch(`/api/portfolio-projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Project deleted successfully!');
        refreshData();
      } else {
        showNotification('Failed to delete project.', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  // 6. Packages CRUD Handlers
  const handleOpenAddPackage = () => {
    setEditingPackage({
      name: '',
      price: '',
      period: '/ month',
      type: 'monthly',
      features: [],
      isPopular: false,
      published: true,
      ctaText: 'Get Started Now',
      ctaUrl: ''
    });
    setIsPackageModalOpen(true);
  };

  const handleOpenEditPackage = (pkg: PackageItem) => {
    setEditingPackage(pkg);
    setIsPackageModalOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    if (!editingPackage.name?.trim() || !editingPackage.price?.trim()) {
      showNotification('Please enter package name and price!', 'error');
      return;
    }

    try {
      const method = editingPackage.id ? 'PUT' : 'POST';
      const url = editingPackage.id 
        ? `/api/packages/${editingPackage.id}` 
        : '/api/packages';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPackage)
      });

      if (res.ok) {
        showNotification(editingPackage.id ? 'Package updated successfully!' : 'New package added successfully!');
        setIsPackageModalOpen(false);
        setEditingPackage(null);
        refreshData();
      } else {
        const data = await res.json();
        showNotification(data.error || 'Failed to save package!', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Package deleted successfully!');
        refreshData();
      } else {
        showNotification('Failed to delete package.', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  // 7. CRM Lead resolution/deletion handlers
  const handleResolveLead = async (type: 'audit' | 'contact', id: string) => {
    try {
      const endpoint = type === 'audit' ? `/api/audit-requests/${id}/resolve` : `/api/contact-messages/${id}/resolve`;
      const res = await fetch(endpoint, { method: 'POST' });
      if (res.ok) {
        showNotification('Lead message has been successfully resolved!');
        fetchLeads();
      } else {
        showNotification('Failed to update lead status.', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  const handleDeleteLead = async (type: 'audit' | 'contact', id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      const endpoint = type === 'audit' ? `/api/audit-requests/${id}` : `/api/contact-messages/${id}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        showNotification('Lead deleted successfully!');
        fetchLeads();
      } else {
        showNotification('Failed to delete lead.', 'error');
      }
    } catch (err) {
      showNotification('Server connection error!', 'error');
    }
  };

  // ==========================================
  // VIEW RENDER: LOGIN VIEW (IF NOT AUTH)
  // ==========================================
  if (!adminSession?.authenticated) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Ambient curves */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-soft-red blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-60"></div>

        <div className="w-full max-w-md bg-white border border-warm-border rounded-3xl p-8 shadow-xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
              B
            </div>
            <h2 className="text-2xl font-black text-dark tracking-tight">B2bfiy CMS Admin Panel</h2>
            <p className="text-xs text-muted font-bold">Please log in using your admin credentials.</p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 text-primary text-xs sm:text-sm font-semibold rounded-xl border border-primary/15 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Admin Username *</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary text-white hover:bg-primary-coral font-bold py-3.5 rounded-xl shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <span>Verifying...</span>
              ) : (
                <span>Login (Admin)</span>
              )}
            </button>
          </form>

          <div className="border-t border-warm-border pt-4 text-center">
            <Link to="/" className="text-xs font-bold text-muted hover:text-primary">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW RENDER: CMS DASHBOARD (IF AUTHENTICATED)
  // ==========================================
  return (
    <div className="min-h-screen bg-warm flex flex-col lg:flex-row">
      
      {/* 1. Sidebar Panel */}
      <aside className="w-full lg:w-64 bg-dark text-white shrink-0 p-6 flex flex-col justify-between border-r border-gray-800">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-gray-800 pb-5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-extrabold text-white">B</span>
            </div>
            <span className="font-black text-lg tracking-tight">CMS CONTROL</span>
          </div>

          {/* Tab Navigation links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
              { id: 'leads', name: 'Lead Manager', icon: MessageSquare, badge: auditRequests.filter(r => !r.resolved).length + contactMessages.filter(r => !r.resolved).length },
              { id: 'settings', name: 'Site Settings', icon: SettingsIcon },
              { id: 'account', name: 'Admin Account', icon: Shield },
              { id: 'hero', name: 'Hero CMS', icon: ImageIcon },
              { id: 'portfolio', name: 'Portfolio', icon: Laptop },
              { id: 'packages', name: 'Pricing Packages', icon: Package }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{tab.name}</span>
                  </div>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom session action info */}
        <div className="pt-6 border-t border-gray-800 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-xs text-gray-400 font-mono">User: {adminSession.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>


      {/* 2. Main Content Board Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-6 overflow-y-auto">
        
        {/* Save updates toast notification */}
        {notify && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300 ${
            notify.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-primary/20 text-primary'
          }`}>
            {notify.type === 'success' ? '✓ ' : '✗ '}
            {notify.message}
          </div>
        )}

        {/* TAB 1: DASHBOARD METRICS */}
        {adminTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="border-b border-warm-border pb-4">
              <h2 className="text-2xl font-black text-dark tracking-tight">Overview Dashboard (CMS Home)</h2>
              <p className="text-xs text-muted font-bold">Manage digital audit requests, contact leads, and portfolio items here.</p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-warm-border p-6 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Free Audit Requests</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-dark">{auditRequests.length}</span>
                  <span className="text-xs text-primary font-bold">
                    {auditRequests.filter(r => !r.resolved).length} new
                  </span>
                </div>
              </div>

              <div className="bg-white border border-warm-border p-6 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Contact Message Leads</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-dark">{contactMessages.length}</span>
                  <span className="text-xs text-primary font-bold">
                    {contactMessages.filter(r => !r.resolved).length} new
                  </span>
                </div>
              </div>

              <div className="bg-white border border-warm-border p-6 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Portfolio Projects</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-dark">{portfolioProjects.length}</span>
                  <span className="text-xs text-green-600 font-bold">
                    {portfolioProjects.filter(p => p.status === 'published').length} live
                  </span>
                </div>
              </div>

              <div className="bg-white border border-warm-border p-6 rounded-2xl shadow-xs">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Pricing Packages</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-dark">{packages.length}</span>
                  <span className="text-xs text-muted font-bold">Published Plans</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons row */}
            <div className="bg-white border border-warm-border p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-base text-dark">Quick CMS Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setAdminTab('leads')}
                  className="bg-primary text-white hover:bg-primary-coral font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Open Lead Manager ({auditRequests.filter(r => !r.resolved).length + contactMessages.filter(r => !r.resolved).length})</span>
                </button>
                <button
                  onClick={handleOpenAddProject}
                  className="bg-white border border-warm-border text-dark hover:border-primary hover:text-primary font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus size={14} className="text-primary" />
                  <span>Add New Portfolio Project</span>
                </button>
                <button
                  onClick={handleOpenAddPackage}
                  className="bg-white border border-warm-border text-dark hover:border-primary hover:text-primary font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus size={14} className="text-primary" />
                  <span>Add New Pricing Package</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SITE SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-white border border-warm-border p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="border-b border-warm-border pb-4">
              <h2 className="text-xl font-black text-dark">Agency Settings</h2>
              <p className="text-xs text-muted font-bold">Edit agency name, phone, email, WhatsApp number, and office address.</p>
            </div>

            <form onSubmit={handleSettingsSave} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Agency Name</label>
                  <input
                    type="text"
                    value={settingsForm.name || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Hotline Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.phone || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Official Email</label>
                  <input
                    type="email"
                    value={settingsForm.email || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">WhatsApp Number (with Country Code)</label>
                  <input
                    type="text"
                    placeholder="+88017XXXXXXXX"
                    value={settingsForm.whatsapp || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark">Office Address</label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                />
              </div>

              {/* Social URLs */}
              <div className="border-t border-warm-border pt-4 space-y-4">
                <h3 className="font-extrabold text-base text-dark">Social Media Profiles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Facebook URL</label>
                    <input
                      type="url"
                      value={settingsForm.facebook || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Instagram URL</label>
                    <input
                      type="url"
                      value={settingsForm.instagram || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settingsForm.linkedin || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">YouTube URL</label>
                    <input
                      type="url"
                      value={settingsForm.youtube || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SEO parameters */}
              <div className="border-t border-warm-border pt-4 space-y-4">
                <h3 className="font-extrabold text-base text-dark">Meta SEO Defaults</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Default SEO Title Tag</label>
                  <input
                    type="text"
                    value={settingsForm.defaultSeoTitle || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, defaultSeoTitle: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Default Meta Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.defaultSeoDescription || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, defaultSeoDescription: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold resize-none text-xs"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3.5 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={16} />
                <span>Save Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ADMIN ACCOUNT CREDENTIALS */}
        {adminTab === 'account' && (
          <div className="bg-white border border-warm-border p-6 sm:p-8 rounded-3xl space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-warm-border pb-4">
              <h2 className="text-xl font-black text-dark">Admin Account Credentials</h2>
              <p className="text-xs text-muted font-bold">Update your secure login ID / username and password. Logging out will happen automatically upon success so you can verify changes.</p>
            </div>

            {accountError && (
              <div className="p-4 bg-red-50 border border-primary/20 text-primary font-bold text-sm rounded-xl">
                {accountError}
              </div>
            )}

            <form onSubmit={handleAccountSave} className="space-y-5 text-sm max-w-xl">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark">New Admin Login ID / Username</label>
                <input
                  type="text"
                  placeholder="e.g. b2bfiy"
                  value={accountForm.username}
                  onChange={(e) => setAccountForm({ ...accountForm, username: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[11px] text-muted font-semibold">Leave blank to keep current login ID.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={accountForm.newPassword}
                  onChange={(e) => setAccountForm({ ...accountForm, newPassword: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[11px] text-muted font-semibold">Leave blank to keep current password.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={accountForm.confirmPassword}
                  onChange={(e) => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                />
              </div>

              <div className="border-t border-warm-border pt-4 flex flex-col gap-1.5">
                <label className="font-bold text-dark text-primary">Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={accountForm.currentPassword}
                  onChange={(e) => setAccountForm({ ...accountForm, currentPassword: e.target.value })}
                  className="border border-primary/25 bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[11px] text-muted font-semibold">You must enter your correct current password to verify your identity.</p>
              </div>

              <button
                type="submit"
                disabled={accountLoading}
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3.5 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Save size={16} />
                <span>{accountLoading ? 'Updating...' : 'Update Admin Credentials'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: HERO BANNER & NAVIGATION */}
        {adminTab === 'hero' && (
          <div className="bg-white border border-warm-border p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="border-b border-warm-border pb-4">
              <h2 className="text-xl font-black text-dark">Hero Banner & Navigation (Hero Banner CMS)</h2>
              <p className="text-xs text-muted font-bold">Customize hero section text, buttons, header bar, and main slider visibility.</p>
            </div>

            <form onSubmit={handleHeroSave} className="space-y-6 text-sm">
              {/* Top Contact Bar enabled/disabled toggle */}
              <div className="p-4 bg-warm border border-warm-border rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-dark">Top Contact Bar (Top Header Bar)</h4>
                  <p className="text-xs text-muted">Display the thin contact details bar at the very top of the page?</p>
                </div>
                <input
                  type="checkbox"
                  checked={topbarForm.enabled || false}
                  onChange={(e) => setTopbarForm({ ...topbarForm, enabled: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
              </div>

              {/* Sticky Header toggle */}
              <div className="p-4 bg-warm border border-warm-border rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-dark">Sticky Navigation Bar</h4>
                  <p className="text-xs text-muted">Keep the main logo navigation fixed at the top while scrolling?</p>
                </div>
                <input
                  type="checkbox"
                  checked={headerForm.sticky || false}
                  onChange={(e) => setHeaderForm({ ...headerForm, sticky: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
              </div>

              {/* Hero values */}
              <div className="space-y-4 border-t border-warm-border pt-4">
                <h3 className="font-extrabold text-base text-dark">Hero Content Editor</h3>

                <div className="flex items-center gap-4">
                  <label className="font-bold text-dark">Hero Section Visibility</label>
                  <input
                    type="checkbox"
                    checked={heroForm.visible || false}
                    onChange={(e) => setHeroForm({ ...heroForm, visible: e.target.checked })}
                    className="w-5 h-5 accent-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-dark">Hero Badge Text</label>
                    <input
                      type="text"
                      value={heroForm.badge || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-dark">Highlight Keyword (Red Accent text)</label>
                    <input
                      type="text"
                      value={heroForm.highlightedText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, highlightedText: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Hero Heading Text</label>
                  <input
                    type="text"
                    value={heroForm.heading || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Hero Description</label>
                  <textarea
                    rows={4}
                    value={heroForm.description || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-warm-border pt-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Primary CTA Text</label>
                    <input
                      type="text"
                      value={heroForm.primaryCtaText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Primary CTA Destination URL</label>
                    <input
                      type="text"
                      value={heroForm.primaryCtaUrl || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCtaUrl: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={heroForm.secondaryCtaText || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted">Secondary CTA Destination URL</label>
                    <input
                      type="text"
                      value={heroForm.secondaryCtaUrl || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaUrl: e.target.value })}
                      className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark">Trust Badge Text</label>
                  <input
                    type="text"
                    value={heroForm.trustText || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, trustText: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3.5 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={16} />
                <span>Save Banner Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PORTFOLIO LIST & CRUD */}
        {adminTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-warm-border p-6 rounded-3xl">
              <div>
                <h2 className="text-xl font-black text-dark">Portfolio Case Studies Manager</h2>
                <p className="text-xs text-muted font-bold">Database of projects completed by the agency, video links, and solutions.</p>
              </div>
              <button
                onClick={handleOpenAddProject}
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Project List Table */}
            <div className="bg-white border border-warm-border rounded-3xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-warm/60 border-b border-warm-border font-bold text-dark">
                    <th className="p-4">Project Name & Category</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border">
                  {portfolioProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-warm/20 font-semibold text-muted text-xs sm:text-sm">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={proj.featuredImage} alt={proj.title} className="w-10 h-10 rounded-lg object-cover bg-warm" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-extrabold text-dark block leading-tight">{proj.title}</span>
                            <span className="text-[10px] text-muted block mt-0.5 uppercase">{proj.category.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{proj.clientName}</td>
                      <td className="p-4">{proj.date}</td>
                      <td className="p-4">
                        {proj.status === 'published' ? (
                          <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full border border-green-200">Live</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Draft</span>
                        )}
                      </td>
                      <td className="p-4">
                        {proj.featured ? (
                          <span className="text-yellow-500 font-extrabold text-[10px] uppercase">★ Yes</span>
                        ) : (
                          <span className="text-gray-400 font-medium">No</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEditProject(proj)}
                          className="bg-white border border-warm-border hover:border-primary hover:text-primary p-2 rounded-xl transition-colors cursor-pointer inline-flex items-center"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="bg-white border border-warm-border hover:bg-primary/5 hover:text-primary p-2 rounded-xl transition-colors cursor-pointer inline-flex items-center"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PRICING PLANS LIST & CRUD */}
        {adminTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-warm-border p-6 rounded-3xl">
              <div>
                <h2 className="text-xl font-black text-dark">Services & Pricing Plans (Pricing Plans CMS)</h2>
                <p className="text-xs text-muted font-bold">Monthly and one-time budget packages for social media, graphics, or video editing.</p>
              </div>
              <button
                onClick={handleOpenAddPackage}
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Package</span>
              </button>
            </div>

            {/* Pricing List Table */}
            <div className="bg-white border border-warm-border rounded-3xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-warm/60 border-b border-warm-border font-bold text-dark">
                    <th className="p-4">Package Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Delivery</th>
                    <th className="p-4">Popular</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-warm/20 font-semibold text-muted text-xs sm:text-sm">
                      <td className="p-4 font-extrabold text-dark">{pkg.name}</td>
                      <td className="p-4">
                        <span className="bg-primary/5 text-primary text-[10px] px-2 py-0.5 rounded uppercase">
                          {pkg.type}
                        </span>
                      </td>
                      <td className="p-4">৳{pkg.price} {pkg.period}</td>
                      <td className="p-4">{pkg.deliveryTime || 'N/A'}</td>
                      <td className="p-4">
                        {pkg.isPopular ? (
                          <span className="text-primary font-black text-[10px]">★ Yes</span>
                        ) : (
                          <span className="text-gray-400 font-medium">No</span>
                        )}
                      </td>
                      <td className="p-4">
                        {pkg.published ? (
                          <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full border border-green-200">Live</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Draft</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <button
                          onClick={() => handleOpenEditPackage(pkg)}
                          className="bg-white border border-warm-border hover:border-primary hover:text-primary p-2 rounded-xl cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="bg-white border border-warm-border hover:bg-primary/5 hover:text-primary p-2 rounded-xl cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CRM LEADS & ENQUIRIES */}
        {adminTab === 'leads' && (
          <div className="space-y-8">
            {/* Audit requests */}
            <div className="space-y-4">
              <div className="border-b border-warm-border pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-dark">Digital Audit Request Leads (Free Audits Lead CRM)</h2>
                  <p className="text-xs text-muted font-bold">Database of audit requests received from the website forms.</p>
                </div>
                <button onClick={fetchLeads} className="text-xs font-bold text-primary hover:underline">Refresh Leads</button>
              </div>

              {leadsLoading ? (
                <div className="py-6 text-center text-muted font-bold text-sm">Loading...</div>
              ) : auditRequests.length > 0 ? (
                <div className="bg-white border border-warm-border rounded-3xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-warm/60 border-b border-warm-border font-bold text-dark text-xs sm:text-sm">
                        <th className="p-4">Applicant & Business</th>
                        <th className="p-4">WhatsApp & Email</th>
                        <th className="p-4">Service & URL</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-border">
                      {auditRequests.map((req) => (
                        <tr key={req.id} className={`font-semibold text-xs sm:text-sm ${req.resolved ? 'text-gray-400 bg-gray-50/30' : 'text-dark font-bold'}`}>
                          <td className="p-4">
                            <span className="font-extrabold text-dark block leading-tight">{req.fullName}</span>
                            <span className="text-[10px] text-muted block mt-0.5">Co: {req.businessName || 'N/A'}</span>
                          </td>
                          <td className="p-4">
                            <a href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block font-mono">
                              {req.whatsapp}
                            </a>
                            <span className="text-[10px] text-muted block font-mono">{req.email || 'N/A'}</span>
                          </td>
                          <td className="p-4">
                            <span className="bg-soft-red text-primary text-[10px] px-2 py-0.5 rounded leading-none block w-max uppercase">
                              {req.service}
                            </span>
                            {req.url && (
                              <a href={req.url} target="_blank" rel="noopener noreferrer" className="text-muted text-[10px] hover:underline block mt-1 leading-none line-clamp-1">
                                {req.url}
                              </a>
                            )}
                          </td>
                          <td className="p-4">
                            <p className="line-clamp-2 max-w-[180px] leading-relaxed text-xs text-muted" title={req.message}>
                              {req.message || '-'}
                            </p>
                          </td>
                          <td className="p-4">
                            {req.resolved ? (
                              <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Completed</span>
                            ) : (
                              <span className="bg-red-50 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20">New Lead</span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {!req.resolved && (
                              <button
                                onClick={() => handleResolveLead('audit', req.id)}
                                className="bg-white border border-warm-border hover:border-green-500 hover:text-green-500 p-2 rounded-xl cursor-pointer inline-flex items-center"
                                title="Mark Resolved"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteLead('audit', req.id)}
                              className="bg-white border border-warm-border hover:bg-primary/5 hover:text-primary p-2 rounded-xl cursor-pointer inline-flex items-center"
                              title="Delete Lead"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-white border border-warm-border rounded-3xl text-muted text-xs sm:text-sm font-semibold">
                  No audit requests found.
                </div>
              )}
            </div>

            {/* Contact messages */}
            <div className="space-y-4">
              <div className="border-b border-warm-border pb-3">
                <h2 className="text-lg font-black text-dark">Contact Form Inquiries (Contact Messages CRM)</h2>
                <p className="text-xs text-muted font-bold">Database of general messages and inquiries received from the contact page.</p>
              </div>

              {leadsLoading ? (
                <div className="py-6 text-center text-muted font-bold text-sm">Loading...</div>
              ) : contactMessages.length > 0 ? (
                <div className="bg-white border border-warm-border rounded-3xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-warm/60 border-b border-warm-border font-bold text-dark text-xs sm:text-sm">
                        <th className="p-4">Sender</th>
                        <th className="p-4">WhatsApp & Email</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-border">
                      {contactMessages.map((msg) => (
                        <tr key={msg.id} className={`font-semibold text-xs sm:text-sm ${msg.resolved ? 'text-gray-400 bg-gray-50/30' : 'text-dark font-bold'}`}>
                          <td className="p-4">
                            <span className="font-extrabold text-dark block leading-none">{msg.name}</span>
                          </td>
                          <td className="p-4">
                            <a href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block font-mono">
                              {msg.whatsapp}
                            </a>
                            <span className="text-[10px] text-muted block font-mono">{msg.email || 'N/A'}</span>
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-100 text-muted text-[10px] px-2 py-0.5 rounded uppercase">
                              {msg.subject}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="line-clamp-2 max-w-[200px] leading-relaxed text-xs text-muted" title={msg.message}>
                              {msg.message}
                            </p>
                          </td>
                          <td className="p-4">
                            {msg.resolved ? (
                              <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">Resolved</span>
                            ) : (
                              <span className="bg-red-50 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20">New Msg</span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {!msg.resolved && (
                              <button
                                onClick={() => handleResolveLead('contact', msg.id)}
                                className="bg-white border border-warm-border hover:border-green-500 hover:text-green-500 p-2 rounded-xl cursor-pointer inline-flex items-center"
                                title="Mark Resolved"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteLead('contact', msg.id)}
                              className="bg-white border border-warm-border hover:bg-primary/5 hover:text-primary p-2 rounded-xl cursor-pointer inline-flex items-center"
                              title="Delete Message"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-white border border-warm-border rounded-3xl text-muted text-xs sm:text-sm font-semibold">
                  No contact inquiries found.
                </div>
              )}
            </div>
          </div>
        )}

      </main>


      {/* ==========================================
          MODAL 1: ADD/EDIT PORTFOLIO PROJECT FORM
          ========================================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-warm-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150 text-sm">
            
            <div className="flex justify-between items-center border-b border-warm-border pb-4">
              <h3 className="text-lg font-black text-dark">
                {editingProject.id ? 'Edit Project Case Study' : 'Add New Project Case Study'}
              </h3>
              <button
                onClick={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
                className="p-1.5 rounded-lg hover:bg-warm text-muted"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs sm:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Unique URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="my-project-slug"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  >
                    <option value="website-development">Website Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="social-media-management">Social Media Management</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.clientName || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Date / Year</label>
                  <input
                    type="text"
                    value={editingProject.date || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-dark">Short Description</label>
                <input
                  type="text"
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-dark">Detailed Case Study Full Description</label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold resize-none text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Client's Problem (Challenge)</label>
                  <textarea
                    rows={2}
                    value={editingProject.challenge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold resize-none text-xs"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Our Agency Solution</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold resize-none text-xs"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Project Deliverable Results</label>
                  <input
                    type="text"
                    placeholder="e.g. 440% Facebook engagement and 30+ conversion rate growth"
                    value={editingProject.results || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Tools & Software Used (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, Figma, Premiere Pro"
                    value={editingProject.tools?.join(', ') || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Featured Image Link (URL)</label>
                  <input
                    type="text"
                    value={editingProject.featuredImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, featuredImage: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">YouTube Video Link (URL)</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    value={editingProject.videoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Live Website Link (URL)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editingProject.liveWebsiteUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveWebsiteUrl: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 border-t border-warm-border pt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="project-published"
                    checked={editingProject.status === 'published'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="project-published" className="font-bold text-dark cursor-pointer">Publish Live (status: published)</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="project-featured"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="project-featured" className="font-bold text-dark cursor-pointer">Feature on Homepage (Starred case study)</label>
                </div>
              </div>

              <div className="border-t border-warm-border pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
                  className="bg-white border border-warm-border text-dark hover:bg-warm font-bold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-coral font-bold py-2 px-6 rounded-xl cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ==========================================
          MODAL 2: ADD/EDIT PRICING PLAN FORM
          ========================================== */}
      {isPackageModalOpen && editingPackage && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-warm-border rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150 text-sm">
            
            <div className="flex justify-between items-center border-b border-warm-border pb-3">
              <h3 className="text-lg font-black text-dark">
                {editingPackage.id ? 'Edit Package' : 'Add New Package'}
              </h3>
              <button
                onClick={() => { setIsPackageModalOpen(false); setEditingPackage(null); }}
                className="p-1 text-muted hover:bg-warm rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.name || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Category Type</label>
                  <select
                    value={editingPackage.type}
                    onChange={(e) => setEditingPackage({ ...editingPackage, type: e.target.value as any })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  >
                    <option value="monthly">Monthly Social Media</option>
                    <option value="website">Website Development</option>
                    <option value="graphic">Graphic Design</option>
                    <option value="video">Video Editing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Price (Tk) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15,000"
                    value={editingPackage.price || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs sm:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Period / Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. / month, One-time"
                    value={editingPackage.period || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, period: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark">Delivery Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. 5-7 days"
                    value={editingPackage.deliveryTime || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, deliveryTime: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-dark">Package Features (comma-separated)</label>
                <textarea
                  rows={3}
                  placeholder="10 professional designs, 3 viral reels, 1 month page management"
                  value={editingPackage.features?.join(', ') || ''}
                  onChange={(e) => setEditingPackage({ ...editingPackage, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold resize-none text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-muted">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingPackage.ctaText || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, ctaText: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-muted">CTA Custom Link (Optional)</label>
                  <input
                    type="text"
                    placeholder="Leave blank for contact form trigger"
                    value={editingPackage.ctaUrl || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, ctaUrl: e.target.value })}
                    className="border border-warm-border bg-warm p-2.5 rounded-xl focus:outline-none font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 border-t border-warm-border pt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pkg-published"
                    checked={editingPackage.published || false}
                    onChange={(e) => setEditingPackage({ ...editingPackage, published: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="pkg-published" className="font-bold text-dark cursor-pointer">Publish Live</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pkg-popular"
                    checked={editingPackage.isPopular || false}
                    onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="pkg-popular" className="font-bold text-dark cursor-pointer">Popular Badge</label>
                </div>
              </div>

              <div className="border-t border-warm-border pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsPackageModalOpen(false); setEditingPackage(null); }}
                  className="bg-white border border-warm-border text-dark hover:bg-warm font-bold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-coral font-bold py-2 px-6 rounded-xl cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
