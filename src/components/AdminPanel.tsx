import React, { useState, useEffect } from 'react';
import { Lead, SiteConfig, PortfolioItem, ServicePackage, ServiceItem, WhyChooseUsReason, FAQItem, TestimonialItem } from '../types';
import { getSQLSchema, runSupabaseDiagnostics, getSupabaseUrl, getSupabaseAnonKey, saveSupabaseCredentials } from '../lib/supabaseClient';
import {
  Search, Filter, CheckCircle, FileSpreadsheet, Trash2, Phone, Mail,
  ExternalLink, MessageSquare, Sparkles, Calendar, Layers, Database,
  ArrowLeft, ChevronRight, TrendingUp, Clock, CheckSquare, AlertCircle,
  Plus, Shield, Lock, Eye, Edit3, Save, X, RefreshCw, LogOut,
  FolderOpen, Layout, Palette, Video, Share2, ShieldAlert, Info, Rocket,
  Star, Quote
} from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

function ImageUploadField({ label, value, onChange, placeholder = 'https://...', id }: ImageUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputId = `file-upload-${id || Math.random().toString(36).substr(2, 9)}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      alert("File is too large! Please select an image smaller than 8MB. (ফাইলটি অনেক বড়, দয়া করে ৮ মেগাবাইটের কম সাইজের ছবি সিলেক্ট করুন)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      
      {/* Drag & Drop Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-3.5 transition-all flex flex-col items-center justify-center text-center ${
          dragActive 
            ? 'border-rose-500 bg-rose-500/10' 
            : value 
              ? 'border-white/10 bg-black/10' 
              : 'border-white/10 hover:border-white/20 bg-black/20'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={fileInputId}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {value ? (
          <div className="flex flex-col items-center space-y-2 w-full">
            <div className="relative group/img">
              <img
                src={value}
                alt="Upload preview"
                referrerPolicy="no-referrer"
                className="max-h-20 max-w-full rounded-lg object-contain border border-white/10 shadow-lg"
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute -top-2 -right-2 bg-rose-600 text-white p-1 rounded-full hover:bg-rose-700 transition-colors shadow-lg shadow-black/50"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="text-[10px] text-gray-400 font-mono text-center w-full truncate px-4">
              {value.startsWith('data:') ? '✓ Custom Uploaded Image' : `URL: ${value}`}
            </div>
          </div>
        ) : (
          <label
            htmlFor={fileInputId}
            className="flex flex-col items-center justify-center cursor-pointer w-full py-1.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-rose-500/10 flex items-center justify-center mb-1.5 transition-colors">
              <Share2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-400" />
            </div>
            <p className="text-[11px] text-gray-300 font-semibold">
              Click to Upload <span className="text-rose-400">or Drag & Drop</span>
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5 bangla-text">
              মোবাইল বা পিসি থেকে ছবি সিলেক্ট করুন
            </p>
          </label>
        )}
      </div>

      {/* Manual Input Field (Fallback/URL option) */}
      <div className="relative">
        <input
          type="text"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={value.startsWith('data:') ? 'Base64 image is active (ছবি আপলোড করা আছে)' : placeholder}
          className="w-full pl-3 pr-16 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 transition-colors font-mono"
        />
        <label
          htmlFor={fileInputId}
          className="absolute right-1.5 top-1.5 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[9px] text-gray-300 font-bold cursor-pointer transition-all uppercase tracking-wider"
        >
          Browse
        </label>
      </div>
    </div>
  );
}

interface AdminPanelProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead['status']) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onResetLeads: () => void;
  onAddMockLead: () => void;
  onCloseAdmin: () => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  dbStatus?: {
    configured: boolean;
    connected: boolean;
    source: 'supabase' | 'local';
    error?: string;
  };
}

type AdminTab = 'leads' | 'branding' | 'services' | 'portfolio' | 'packages' | 'testimonials' | 'footer-faqs' | 'database' | 'security';

export default function AdminPanel({
  leads,
  onUpdateLeadStatus,
  onUpdateLeadNotes,
  onDeleteLead,
  onResetLeads,
  onAddMockLead,
  onCloseAdmin,
  siteConfig,
  onUpdateSiteConfig,
  dbStatus = { configured: false, connected: false, source: 'local' }
}: AdminPanelProps) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');

  // Edited Config State (cloned from prop)
  const [editedConfig, setEditedConfig] = useState<SiteConfig>({ ...siteConfig });
  const [isDirty, setIsDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Leads Workspace State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeLeadId, setActiveLeadId] = useState<string | null>(leads[0]?.id || null);
  const [tempNotes, setTempNotes] = useState('');

  // Modals / Item Editors State
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const [editingReason, setEditingReason] = useState<WhyChooseUsReason | null>(null);
  const [showReasonModal, setShowReasonModal] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  
  // Database Diagnostics state
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagResult, setDiagResult] = useState<{
    success: boolean;
    canReadLeads: boolean;
    canWriteLeads: boolean;
    canReadSettings: boolean;
    canWriteSettings: boolean;
    urlConfigured: boolean;
    keyConfigured: boolean;
    clientInitialized: boolean;
    errorLeadsRead?: string;
    errorLeadsWrite?: string;
    errorSettingsRead?: string;
    errorSettingsWrite?: string;
  } | null>(null);
  const [diagRun, setDiagRun] = useState(false);

  // Local states for Supabase credentials inputs
  const [inputUrl, setInputUrl] = useState(getSupabaseUrl());
  const [inputKey, setInputKey] = useState(getSupabaseAnonKey());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'cleared'>('idle');

  // Function to run connection test
  const handleRunDiagnostics = async () => {
    setDiagLoading(true);
    setDiagResult(null);
    setDiagRun(true);
    try {
      const res = await runSupabaseDiagnostics();
      setDiagResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setDiagLoading(false);
    }
  };

  // Sync edited config whenever siteConfig changes externally
  useEffect(() => {
    setEditedConfig({ ...siteConfig });
  }, [siteConfig]);

  // Handle local change detection
  const markDirty = () => {
    setIsDirty(true);
    setSaveSuccess(false);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctUser = siteConfig.adminCredentials?.username || 'b2bfiy';
    const correctPass = siteConfig.adminCredentials?.passwordHash || 'rakib1122@#';

    if (username.trim() === correctUser && password.trim() === correctPass) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin ID or Password! Please check and try again.');
    }
  };

  // Reset local config to current active site config
  const handleCancelChanges = () => {
    setEditedConfig({ ...siteConfig });
    setIsDirty(false);
    alert('All unsaved modifications have been discarded.');
  };

  // Submit and save configuration
  const handleSaveChanges = () => {
    onUpdateSiteConfig(editedConfig);
    setIsDirty(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.serviceNeeded.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource = selectedSource === 'All' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const activeLead = leads.find((l) => l.id === activeLeadId) || filteredLeads[0];

  useEffect(() => {
    if (activeLead) {
      setTempNotes(activeLead.adminNotes || '');
    }
  }, [activeLead]);

  // Calculates Lead Metrics
  const totalLeadsCount = leads.length;
  const pendingLeadsCount = leads.filter((l) => l.status === 'Pending').length;
  const inProgressLeadsCount = leads.filter((l) => l.status === 'In Progress').length;
  const completedLeadsCount = leads.filter((l) => l.status === 'Completed').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'Contacted').length;

  const conversionRate = totalLeadsCount > 0
    ? Math.round(((completedLeadsCount + contactedLeadsCount) / totalLeadsCount) * 100)
    : 0;

  // Export Leads to CSV
  const handleExportCSV = () => {
    const headers = 'ID,Name,Business Name,Phone,Email,Source,Service,Status,Created At,Admin Notes\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.businessName}","${l.phone}","${l.email}","${l.source}","${l.serviceNeeded}","${l.status}","${l.createdAt}","${(
            l.adminNotes || ''
          ).replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `b2bfiy_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  // Portfolio Item CRUDS
  const handleAddOrEditPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolioItem) return;

    let updatedItems = [...editedConfig.portfolio.items];
    if (editingPortfolioItem.id) {
      // Edit
      updatedItems = updatedItems.map(item => item.id === editingPortfolioItem.id ? editingPortfolioItem : item);
    } else {
      // Create
      const newItem = {
        ...editingPortfolioItem,
        id: 'p_new_' + Date.now()
      };
      updatedItems.push(newItem);
    }

    setEditedConfig({
      ...editedConfig,
      portfolio: {
        ...editedConfig.portfolio,
        items: updatedItems
      }
    });
    setShowPortfolioModal(false);
    setEditingPortfolioItem(null);
    markDirty();
  };

  const handleDeletePortfolioItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      const updatedItems = editedConfig.portfolio.items.filter(i => i.id !== id);
      setEditedConfig({
        ...editedConfig,
        portfolio: {
          ...editedConfig.portfolio,
          items: updatedItems
        }
      });
      markDirty();
    }
  };

  // Packages CRUDs
  const handleAddOrEditPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    let updatedPkgs = [...editedConfig.packages.items];
    if (editingPackage.id) {
      updatedPkgs = updatedPkgs.map(p => p.id === editingPackage.id ? editingPackage : p);
    } else {
      const newPkg = {
        ...editingPackage,
        id: 'pkg_new_' + Date.now()
      };
      updatedPkgs.push(newPkg);
    }

    setEditedConfig({
      ...editedConfig,
      packages: {
        ...editedConfig.packages,
        items: updatedPkgs
      }
    });
    setShowPackageModal(false);
    setEditingPackage(null);
    markDirty();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      const updatedPkgs = editedConfig.packages.items.filter(p => p.id !== id);
      setEditedConfig({
        ...editedConfig,
        packages: {
          ...editedConfig.packages,
          items: updatedPkgs
        }
      });
      markDirty();
    }
  };

  // Services CRUDs
  const handleAddOrEditService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    let updatedSvc = [...editedConfig.services.list];
    if (editingService.id) {
      updatedSvc = updatedSvc.map(s => s.id === editingService.id ? editingService : s);
    } else {
      const newSvc = {
        ...editingService,
        id: 'svc_new_' + Date.now()
      };
      updatedSvc.push(newSvc);
    }

    setEditedConfig({
      ...editedConfig,
      services: {
        ...editedConfig.services,
        list: updatedSvc
      }
    });
    setShowServiceModal(false);
    setEditingService(null);
    markDirty();
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedSvc = editedConfig.services.list.filter(s => s.id !== id);
      setEditedConfig({
        ...editedConfig,
        services: {
          ...editedConfig.services,
          list: updatedSvc
        }
      });
      markDirty();
    }
  };

  // Why Choose Us CRUDs
  const handleAddOrEditReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReason) return;

    let updatedReasons = [...editedConfig.whyChooseUs.reasons];
    if (editingReason.id) {
      updatedReasons = updatedReasons.map(r => r.id === editingReason.id ? editingReason : r);
    } else {
      const newReason = {
        ...editingReason,
        id: 'r_new_' + Date.now()
      };
      updatedReasons.push(newReason);
    }

    setEditedConfig({
      ...editedConfig,
      whyChooseUs: {
        ...editedConfig.whyChooseUs,
        reasons: updatedReasons
      }
    });
    setShowReasonModal(false);
    setEditingReason(null);
    markDirty();
  };

  const handleDeleteReason = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feature reason?')) {
      const updatedReasons = editedConfig.whyChooseUs.reasons.filter(r => r.id !== id);
      setEditedConfig({
        ...editedConfig,
        whyChooseUs: {
          ...editedConfig.whyChooseUs,
          reasons: updatedReasons
        }
      });
      markDirty();
    }
  };

  // FAQs CRUDs
  const handleAddOrEditFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    let updatedFaqs = [...editedConfig.faqs];
    const isEdit = updatedFaqs.some((f, idx) => idx === editingFaq._index);

    if (isEdit && editingFaq._index !== undefined) {
      updatedFaqs[editingFaq._index] = {
        question: editingFaq.question,
        answer: editingFaq.answer
      };
    } else {
      updatedFaqs.push({
        question: editingFaq.question,
        answer: editingFaq.answer
      });
    }

    setEditedConfig({
      ...editedConfig,
      faqs: updatedFaqs
    });
    setShowFaqModal(false);
    setEditingFaq(null);
    markDirty();
  };

  const handleDeleteFaq = (index: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      const updatedFaqs = editedConfig.faqs.filter((_, idx) => idx !== index);
      setEditedConfig({
        ...editedConfig,
        faqs: updatedFaqs
      });
      markDirty();
    }
  };

  // Testimonial CRUDs
  const handleAddOrEditTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const currentTestimonials = editedConfig.testimonials || { badge: 'Success', heading: '', description: '', items: [] };
    let updatedItems = [...(currentTestimonials.items || [])];

    if (editingTestimonial.id) {
      updatedItems = updatedItems.map(item => item.id === editingTestimonial.id ? editingTestimonial : item);
    } else {
      const newItem = {
        ...editingTestimonial,
        id: 't_new_' + Date.now()
      };
      updatedItems.push(newItem);
    }

    setEditedConfig({
      ...editedConfig,
      testimonials: {
        ...currentTestimonials,
        items: updatedItems
      }
    });
    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    markDirty();
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      const currentTestimonials = editedConfig.testimonials || { badge: 'Success', heading: '', description: '', items: [] };
      const updatedItems = (currentTestimonials.items || []).filter(item => item.id !== id);
      setEditedConfig({
        ...editedConfig,
        testimonials: {
          ...currentTestimonials,
          items: updatedItems
        }
      });
      markDirty();
    }
  };

  // --- RENDERING SECURITY LOGIN IF NOT LOGGED IN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#05070c] text-white flex items-center justify-center pt-28 pb-16 relative overflow-hidden bg-grid-pattern">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agency-purple/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#090f1d] border border-white/5 relative z-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-agency-purple to-agency-pink flex items-center justify-center shadow-lg shadow-agency-purple/30 mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
              B2bfiy Backoffice Gate
            </h1>
            <p className="text-xs text-gray-400 mt-2 bangla-text">
              প্যানেল অ্যাক্সেস করতে আপনার অ্যাডমিন আইডি ও পাসওয়ার্ড লিখুন।
            </p>
          </div>

          {loginError && (
            <div className="p-4 mb-6 rounded-xl bg-red-950/30 border border-red-900/30 text-red-400 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin ID / ID</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. b2bfiy"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple focus:border-agency-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple focus:border-agency-purple"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white font-bold text-sm shadow-xl shadow-agency-purple/20 hover:opacity-95 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>অ্যাডমিন প্রবেশ করুন (Login)</span>
              </button>
            </div>
          </form>

          {/* Credentials badge removed for privacy */}
        </div>
      </div>
    );
  }

  // --- MAIN LOGGED-IN ADMINISTRATIVE DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 font-sans pt-28 pb-16 relative">
      
      {/* Pending changes global floating save bar */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="p-4 rounded-2xl bg-[#090f1d] border border-agency-purple/40 shadow-2xl flex items-center space-x-4 max-w-sm">
            <div className="w-8 h-8 rounded-lg bg-agency-purple/15 flex items-center justify-center text-agency-purple">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-extrabold text-white">UNSAVED DRAFT DETECTED</h5>
              <p className="text-[10px] text-gray-400 mt-0.5">Please commit your changes to apply live.</p>
            </div>
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={handleCancelChanges}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                title="Discard draft changes"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 shadow-2xl flex items-center space-x-3 text-emerald-400">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div>
              <h5 className="text-xs font-extrabold text-white">CHANGES SAVED SUCCESSFULLY</h5>
              <p className="text-[10px] text-emerald-300 mt-0.5">Website layout and configurations are updated live.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Backoffice controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
          <div>
            <button
              onClick={onCloseAdmin}
              className="flex items-center space-x-1.5 text-xs font-bold text-agency-purple hover:text-white transition-all mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>বাংলাদেশী পাবলিক ওয়েবসাইট (Public Site)</span>
            </button>
            <div className="flex items-center space-x-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                {editedConfig.branding.logoText || 'B2b'}{editedConfig.branding.logoHighlightText || 'fiy'} Admin Hub
              </h1>
              {dbStatus.connected ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  <Database className="w-2.5 h-2.5 mr-1 text-emerald-400" />
                  SUPABASE ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  <Database className="w-2.5 h-2.5 mr-1 text-amber-400" />
                  LOCAL STORAGE FALLBACK
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">
              Live Content & Lead Control Center • Complete Dynamic Management Mode
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onAddMockLead}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center space-x-1.5 transition-all"
            >
              <Database className="w-3.5 h-3.5 text-agency-pink" />
              <span>Add Mock Inquiry</span>
            </button>

            <button
              onClick={onResetLeads}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-rose-950/30 text-rose-400 border border-rose-900/15 flex items-center space-x-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white flex items-center space-x-1.5 shadow-lg shadow-agency-purple/15 hover:opacity-95 transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Inquiries</span>
            </button>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-xs font-semibold rounded-xl bg-red-600/10 text-red-400 border border-red-600/15 flex items-center justify-center hover:bg-red-600/20"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Multi-Tab navigation menu */}
        <div className="flex flex-wrap gap-1.5 mb-8 border-b border-white/5 pb-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries & Audits ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'branding'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Branding & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'services'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services & Why Us</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'portfolio'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Portfolio items ({editedConfig.portfolio.items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'packages'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Service Packages ({editedConfig.packages.items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'testimonials'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Star className="w-4 h-4 text-rose-400" />
            <span>Success Stories ({(editedConfig.testimonials?.items || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('footer-faqs')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'footer-faqs'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Footer & FAQs ({editedConfig.faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'database'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4 text-rose-400" />
            <span>Vercel & Supabase</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'security'
                ? 'bg-agency-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Admin Security</span>
          </button>
        </div>

        {/* --- TAB CONTENT 1: LEADS --- */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Lead Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Total Leads</span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 block">{totalLeadsCount}</span>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-time tracking</span>
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Pending Audit</span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-yellow-500 mt-1 block">{pendingLeadsCount}</span>
                <span className="text-[10px] text-slate-400 block mt-2">Requires phone followup</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">In Progress</span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-agency-purple mt-1 block">{inProgressLeadsCount}</span>
                <span className="text-[10px] text-slate-400 block mt-2">Under active production</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Converted</span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-emerald-500 mt-1 block">{completedLeadsCount + contactedLeadsCount}</span>
                <span className="text-[10px] text-slate-400 block mt-2">Finalized deals</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 col-span-2 lg:col-span-1">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Conversion rate</span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-agency-pink mt-1 block">{conversionRate}%</span>
                <span className="text-[10px] text-slate-400 block mt-2">Successful acquisitions</span>
              </div>
            </div>

            {/* Inquiries List & Split notes view */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Search & Filters */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search client, business or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-agency-purple"
                    />
                  </div>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-slate-300 text-xs focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-slate-300 text-xs focus:outline-none"
                  >
                    <option value="All">All Sources</option>
                    <option value="Contact Form">Contact Form</option>
                    <option value="Free Audit">Free Audit</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden max-h-[500px] overflow-y-auto">
                  {filteredLeads.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                      No customer inquiries match the current filter.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => {
                        const isActive = lead.id === activeLeadId;
                        return (
                          <div
                            key={lead.id}
                            onClick={() => {
                              setActiveLeadId(lead.id);
                              setTempNotes(lead.adminNotes || '');
                            }}
                            className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                              isActive ? 'bg-agency-purple/10 border-l-4 border-agency-purple' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white text-sm sm:text-base">{lead.name}</span>
                                {lead.businessName && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-mono">
                                    {lead.businessName}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-400">
                                <span className="font-mono">{lead.phone}</span>
                                <span className="text-gray-600">•</span>
                                <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[10px]">
                                  {lead.serviceNeeded}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 self-start sm:self-auto">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                lead.status === 'Pending' ? 'bg-yellow-500/15 text-yellow-500 border border-yellow-500/20' :
                                lead.status === 'Contacted' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                                lead.status === 'In Progress' ? 'bg-agency-purple/15 text-agency-purple border border-agency-purple/20' :
                                'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {lead.status}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-600 hidden sm:block" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Lead Details & Notes Writer */}
              <div className="lg:col-span-5">
                {activeLead ? (
                  <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-gray-500 block">SOURCE: {activeLead.source}</span>
                        <h3 className="text-lg font-bold text-white mt-0.5">{activeLead.name}</h3>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this inquiry permanently?')) {
                            onDeleteLead(activeLead.id);
                            setActiveLeadId(null);
                          }
                        }}
                        className="p-2 text-rose-400 hover:text-white hover:bg-rose-950/40 rounded-xl transition-all border border-rose-900/10"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details checklist */}
                    <div className="space-y-3 text-xs sm:text-sm">
                      {activeLead.businessName && (
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Company / Business</span>
                          <span className="text-white font-medium">{activeLead.businessName}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] uppercase font-mono text-gray-500 block">Required Service / Package</span>
                        <span className="text-agency-pink font-semibold">{activeLead.serviceNeeded}</span>
                      </div>
                      {activeLead.websiteOrPage && (
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Auditable Website URL / FB Page</span>
                          <a
                            href={activeLead.websiteOrPage.startsWith('http') ? activeLead.websiteOrPage : `https://${activeLead.websiteOrPage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-agency-purple hover:underline flex items-center space-x-1 font-mono text-xs"
                          >
                            <span>{activeLead.websiteOrPage}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Phone Connection</span>
                          <a href={`tel:${activeLead.phone}`} className="text-white font-mono hover:underline flex items-center space-x-1">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{activeLead.phone}</span>
                          </a>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Email Address</span>
                          {activeLead.email ? (
                            <a href={`mailto:${activeLead.email}`} className="text-white font-mono hover:underline truncate flex items-center space-x-1">
                              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span className="truncate">{activeLead.email}</span>
                            </a>
                          ) : (
                            <span className="text-gray-600 block">Not provided</span>
                          )}
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-mono text-gray-500 block">Created At</span>
                        <span className="text-slate-400 font-mono text-xs">{activeLead.createdAt}</span>
                      </div>
                    </div>

                    {/* Change Status select */}
                    <div className="pt-4 border-t border-white/5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Update Project Status
                      </label>
                      <div className="flex gap-2">
                        {['Pending', 'Contacted', 'In Progress', 'Completed'].map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateLeadStatus(activeLead.id, st as Lead['status'])}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all border ${
                              activeLead.status === st
                                ? 'bg-agency-purple/20 text-agency-purple border-agency-purple/40'
                                : 'bg-white/[0.02] text-gray-400 border-white/5 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin notes box */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Office follow-up notes</span>
                        <span className="text-[9px] text-gray-500 font-mono">Autosaved to cache</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Type private notes about follow-up calls, budgets, custom demands..."
                        value={tempNotes}
                        onChange={(e) => {
                          setTempNotes(e.target.value);
                          onUpdateLeadNotes(activeLead.id, e.target.value);
                        }}
                        className="w-full p-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center text-gray-500 border border-white/5 rounded-2xl bg-white/[0.01]">
                    <Info className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                    <p>Select an inquiry card from the list to view full client information and manage communication status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 2: BRANDING & HERO --- */}
        {activeTab === 'branding' && (
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-8">
            
            {/* Website General branding */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2 flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-agency-pink" />
                <span>Branding Metadata & Logo Names</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Logo First Part</label>
                  <input
                    type="text"
                    value={editedConfig.branding.logoText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, logoText: e.target.value }
                      });
                      markDirty();
                    }}
                    placeholder="e.g. B2b"
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Logo Highlight (Purple)</label>
                  <input
                    type="text"
                    value={editedConfig.branding.logoHighlightText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, logoHighlightText: e.target.value }
                      });
                      markDirty();
                    }}
                    placeholder="e.g. fiy"
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Logo Subtext</label>
                  <input
                    type="text"
                    value={editedConfig.branding.logoSubText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, logoSubText: e.target.value }
                      });
                      markDirty();
                    }}
                    placeholder="e.g. Digital Partner"
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">App Meta Title (SEO)</label>
                  <input
                    type="text"
                    value={editedConfig.branding.appTitle}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, appTitle: e.target.value }
                      });
                      markDirty();
                    }}
                    placeholder="e.g. B2bfiy - Digital Partner"
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <ImageUploadField
                    label="Custom Logo Image (কাস্টম লোগো আপলোড)"
                    value={editedConfig.branding.logoImageUrl || ''}
                    onChange={(val) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, logoImageUrl: val }
                      });
                      markDirty();
                    }}
                    placeholder="Pasted logo image URL or uploaded base64"
                    id="branding-logo"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 bangla-text">
                    লোগো আপলোড করলে টেক্সট লোগোর পরিবর্তে ইমেজ লোগো শো করবে।
                  </p>
                </div>

                <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <ImageUploadField
                    label="Favicon Image (ফেভিকন আপলোড - 32x32)"
                    value={editedConfig.branding.faviconUrl || ''}
                    onChange={(val) => {
                      setEditedConfig({
                        ...editedConfig,
                        branding: { ...editedConfig.branding, faviconUrl: val }
                      });
                      markDirty();
                    }}
                    placeholder="e.g. https://.../image.png"
                    id="branding-favicon"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 bangla-text">
                    ব্রাউজার ট্যাবে যে ছোট্ট আইকনটি দেখায় সেটি।
                  </p>
                </div>
              </div>
            </div>

            {/* Hero text items */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-bold text-white pb-2 flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-agency-purple" />
                <span>Hero Banner Core Copy (Bangla)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Top Glowing Badge Text</label>
                  <input
                    type="text"
                    value={editedConfig.hero.badgeText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, badgeText: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hero Headline Highlight Word(s)</label>
                  <input
                    type="text"
                    value={editedConfig.hero.highlight}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, highlight: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hero Main Heading Title</label>
                  <textarea
                    rows={2}
                    value={editedConfig.hero.heading}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, heading: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3.5 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hero Description Paragraph Copy</label>
                  <textarea
                    rows={3}
                    value={editedConfig.hero.description}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, description: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3.5 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Primary CTA Button Label</label>
                  <input
                    type="text"
                    value={editedConfig.hero.primaryCtaText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, primaryCtaText: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Secondary CTA Button Label</label>
                  <input
                    type="text"
                    value={editedConfig.hero.secondaryCtaText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: { ...editedConfig.hero, secondaryCtaText: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-agency-purple"
                  />
                </div>
              </div>
            </div>

            {/* Hero metrics */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-bold text-white pb-2 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-agency-pink" />
                <span>Hero Stat Counters & Labels</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Projects Done Count</label>
                  <input
                    type="text"
                    value={editedConfig.hero.stats.projectsCount}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, projectsCount: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={editedConfig.hero.stats.projectsLabel}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, projectsLabel: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs mt-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Clients Count</label>
                  <input
                    type="text"
                    value={editedConfig.hero.stats.clientsCount}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, clientsCount: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={editedConfig.hero.stats.clientsLabel}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, clientsLabel: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs mt-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Delivery Rate</label>
                  <input
                    type="text"
                    value={editedConfig.hero.stats.deliveryRate}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, deliveryRate: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={editedConfig.hero.stats.deliveryLabel}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, deliveryLabel: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs mt-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Support Availability</label>
                  <input
                    type="text"
                    value={editedConfig.hero.stats.supportHours}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, supportHours: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={editedConfig.hero.stats.supportLabel}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        hero: {
                          ...editedConfig.hero,
                          stats: { ...editedConfig.hero.stats, supportLabel: e.target.value }
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs mt-2"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB CONTENT 3: SERVICES & WHY CHOOSE US --- */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            
            {/* SERVICES LIST EDITOR */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-agency-purple" />
                    <span>Dynamic Service Items List</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Add, edit, or delete core services shown on the public site.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingService({
                      id: '',
                      title: '',
                      description: '',
                      iconName: 'Layout',
                      color: 'from-blue-500 to-indigo-600',
                      bullets: []
                    });
                    setShowServiceModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Title parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Services Badge</label>
                  <input
                    type="text"
                    value={editedConfig.services.badge}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        services: { ...editedConfig.services, badge: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Services Headline</label>
                  <input
                    type="text"
                    value={editedConfig.services.heading}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        services: { ...editedConfig.services, heading: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Grid of services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editedConfig.services.list.map((svc) => (
                  <div key={svc.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between space-x-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-agency-purple" />
                        <h4 className="font-bold text-white text-sm">{svc.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 bangla-text">{svc.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {(svc.bullets || []).map((b, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 font-sans">{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingService({ ...svc });
                          setShowServiceModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                        title="Edit Service"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(svc.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/40 text-rose-400"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHY CHOOSE US REASONS EDITOR */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <CheckSquare className="w-5 h-5 text-agency-pink" />
                    <span>Why Choose B2bfiy Feature List</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Manage key benefit items describing why clients should choose B2bfiy.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingReason({
                      id: '',
                      title: '',
                      description: '',
                      iconName: 'Sparkles'
                    });
                    setShowReasonModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reason</span>
                </button>
              </div>

              {/* Title parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Why Us Badge</label>
                  <input
                    type="text"
                    value={editedConfig.whyChooseUs.badge}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        whyChooseUs: { ...editedConfig.whyChooseUs, badge: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Why Us Headline</label>
                  <input
                    type="text"
                    value={editedConfig.whyChooseUs.heading}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        whyChooseUs: { ...editedConfig.whyChooseUs, heading: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Why Us Description</label>
                  <input
                    type="text"
                    value={editedConfig.whyChooseUs.description}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        whyChooseUs: { ...editedConfig.whyChooseUs, description: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Reasons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {editedConfig.whyChooseUs.reasons.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-agency-purple">
                          Icon: {r.iconName}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              setEditingReason({ ...r });
                              setShowReasonModal(true);
                            }}
                            className="p-1 rounded bg-white/5 text-gray-300 hover:text-white"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteReason(r.id)}
                            className="p-1 rounded bg-white/5 text-rose-400 hover:text-white"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{r.title}</h4>
                      <p className="text-[11px] text-gray-400 bangla-text line-clamp-3">{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- FRICTION & CURE SECTION EDITOR --- */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <span>Problem & Solution (Friction & Cure) Editor</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  এই সেকশনটি ক্রেতার সমস্যা এবং B2BFIY-এর চমৎকার সমাধান তুলে ধরে। (Fully Configurable)
                </p>
              </div>

              {/* Friction Left Side Configurations */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-rose-400 flex items-center space-x-1">
                  <span>১. বাম কলাম (ডিজিটাল সীমাবদ্ধতা / Pain Points)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Friction Section Badge</label>
                    <input
                      type="text"
                      value={editedConfig.frictionAndCure?.badgeFriction || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            badgeFriction: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Friction Section Title</label>
                    <input
                      type="text"
                      value={editedConfig.frictionAndCure?.titleFriction || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            titleFriction: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Friction Section Description</label>
                    <textarea
                      rows={2}
                      value={editedConfig.frictionAndCure?.descriptionFriction || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            descriptionFriction: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                {/* 4 Friction Points */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-gray-300 block">Friction Points (সীমাবদ্ধতাসমূহ)</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editedConfig.frictionAndCure?.frictionPoints?.map((point, idx) => (
                      <div key={point.id || idx} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
                        <span className="text-[10px] font-bold text-rose-400 block uppercase">Point {idx + 1}</span>
                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={point.title}
                            onChange={(e) => {
                              const updatedPoints = [...(editedConfig.frictionAndCure?.frictionPoints || [])];
                              updatedPoints[idx] = { ...point, title: e.target.value };
                              setEditedConfig({
                                ...editedConfig,
                                frictionAndCure: {
                                  ...editedConfig.frictionAndCure,
                                  frictionPoints: updatedPoints
                                }
                              });
                              markDirty();
                            }}
                            className="w-full p-2 rounded-lg bg-black/25 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">Description</label>
                          <input
                            type="text"
                            value={point.description}
                            onChange={(e) => {
                              const updatedPoints = [...(editedConfig.frictionAndCure?.frictionPoints || [])];
                              updatedPoints[idx] = { ...point, description: e.target.value };
                              setEditedConfig({
                                ...editedConfig,
                                frictionAndCure: {
                                  ...editedConfig.frictionAndCure,
                                  frictionPoints: updatedPoints
                                }
                              });
                              markDirty();
                            }}
                            className="w-full p-2 rounded-lg bg-black/25 border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cure Right Side Configurations */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="text-sm font-semibold text-emerald-400 flex items-center space-x-1">
                  <span>২. ডান কলাম (B2BFIY সমাধান / Solution Card)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Solution Section Badge</label>
                    <input
                      type="text"
                      value={editedConfig.frictionAndCure?.badgeCure || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            badgeCure: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Solution Section Title</label>
                    <input
                      type="text"
                      value={editedConfig.frictionAndCure?.titleCure || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            titleCure: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Solution Section Description</label>
                    <textarea
                      rows={2}
                      value={editedConfig.frictionAndCure?.descriptionCure || ''}
                      onChange={(e) => {
                        setEditedConfig({
                          ...editedConfig,
                          frictionAndCure: {
                            ...editedConfig.frictionAndCure,
                            descriptionCure: e.target.value
                          }
                        });
                        markDirty();
                      }}
                      className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                {/* 4 Cure Points */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-gray-300 block">Solution Checkmarks (সমাধানসমূহ)</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editedConfig.frictionAndCure?.curePoints?.map((point, idx) => (
                      <div key={point.id || idx} className="p-3 rounded-xl bg-white/[0.01] border border-white/5">
                        <label className="block text-[10px] text-emerald-400 mb-1 font-semibold">Checkmark {idx + 1}</label>
                        <input
                          type="text"
                          value={point.text}
                          onChange={(e) => {
                            const updatedCures = [...(editedConfig.frictionAndCure?.curePoints || [])];
                            updatedCures[idx] = { ...point, text: e.target.value };
                            setEditedConfig({
                              ...editedConfig,
                              frictionAndCure: {
                                ...editedConfig.frictionAndCure,
                                curePoints: updatedCures
                              }
                            });
                            markDirty();
                          }}
                          className="w-full p-2 rounded-lg bg-black/25 border border-white/10 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button Label */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Solution Card CTA Button Label</label>
                  <input
                    type="text"
                    value={editedConfig.frictionAndCure?.ctaText || ''}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        frictionAndCure: {
                          ...editedConfig.frictionAndCure,
                          ctaText: e.target.value
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB CONTENT 4: PORTFOLIO ITEMS --- */}
        {activeTab === 'portfolio' && (
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5 text-agency-purple" />
                  <span>Dynamic Work Portfolio & Recent Projects</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">Configure project media, names, filters, technologies stack, and youtube video links.</p>
              </div>
              <button
                onClick={() => {
                  setEditingPortfolioItem({
                    id: '',
                    title: '',
                    category: 'Website Development',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                    description: '',
                    technologies: ['React', 'Tailwind'],
                    clientName: '',
                    videoLink: ''
                  });
                  setShowPortfolioModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Item</span>
              </button>
            </div>

            {/* Title headers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Portfolio Badge</label>
                <input
                  type="text"
                  value={editedConfig.portfolio.badge}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      portfolio: { ...editedConfig.portfolio, badge: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Portfolio Headline</label>
                <input
                  type="text"
                  value={editedConfig.portfolio.heading}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      portfolio: { ...editedConfig.portfolio, heading: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Portfolio Description</label>
                <input
                  type="text"
                  value={editedConfig.portfolio.description}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      portfolio: { ...editedConfig.portfolio, description: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* List Table of portfolio items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editedConfig.portfolio.items.map((item) => (
                <div key={item.id} className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                  <div className="relative h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-bold text-agency-pink">
                      {item.category}
                    </span>
                    {item.videoLink && (
                      <span className="absolute top-2.5 right-2.5 p-1 rounded-full bg-red-600 text-white" title="YouTube video attached">
                        <Video className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 bangla-text">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(item.technologies || []).map(t => (
                          <span key={t} className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-gray-400">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 border-t border-white/5 pt-3">
                      <button
                        onClick={() => {
                          setEditingPortfolioItem({ ...item });
                          setShowPortfolioModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center space-x-1"
                      >
                        <Edit3 className="w-3 h-3 text-agency-purple" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePortfolioItem(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/40 text-rose-400"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 5: SERVICE PACKAGES --- */}
        {activeTab === 'packages' && (
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-agency-pink" />
                  <span>Service Packages & Subscriptions</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">Configure individual pricing packages, lists, billing types, and feature checklists.</p>
              </div>
              <button
                onClick={() => {
                  setEditingPackage({
                    id: '',
                    name: '',
                    price: '৳',
                    billing: 'এককালীন পেমেন্ট',
                    features: [],
                    category: 'Website Development',
                    isPopular: false
                  });
                  setShowPackageModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            {/* Headers variables */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pricing Badge</label>
                <input
                  type="text"
                  value={editedConfig.packages.badge}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      packages: { ...editedConfig.packages, badge: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pricing Headline</label>
                <input
                  type="text"
                  value={editedConfig.packages.heading}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      packages: { ...editedConfig.packages, heading: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pricing Description</label>
                <input
                  type="text"
                  value={editedConfig.packages.description}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      packages: { ...editedConfig.packages, description: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* List of pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editedConfig.packages.items.map((pkg) => (
                <div key={pkg.id} className={`rounded-xl p-5 border flex flex-col justify-between ${
                  pkg.isPopular ? 'bg-agency-purple/5 border-agency-purple/30 shadow-lg' : 'bg-white/[0.02] border-white/5'
                }`}>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded text-agency-pink">
                        {pkg.category}
                      </span>
                      {pkg.isPopular && (
                        <span className="text-[9px] uppercase font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                          ★ Popular Choice
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-white text-base mt-2">{pkg.name}</h4>
                    <div className="flex items-baseline space-x-1.5 mt-2">
                      <span className="text-xl font-bold text-white">{pkg.price}</span>
                      <span className="text-[10px] text-gray-400">/ {pkg.billing}</span>
                    </div>
                    <ul className="space-y-1.5 my-4 text-xs text-gray-300 list-disc list-inside">
                      {(pkg.features || []).map((feat, idx) => (
                        <li key={idx} className="bangla-text line-clamp-1">{feat}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2 border-t border-white/5 pt-3">
                    <button
                      onClick={() => {
                        setEditingPackage({ ...pkg });
                        setShowPackageModal(true);
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-agency-purple" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/40 text-rose-400"
                      title="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 6: FOOTER & FAQS --- */}
        {activeTab === 'footer-faqs' && (
          <div className="space-y-8">
            
            {/* FAQS ACCORDION LISTING */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-agency-purple" />
                    <span>Collapsible Website FAQs</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Manage public frequently asked questions and copywriting answers.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingFaq({
                      question: '',
                      answer: ''
                    });
                    setShowFaqModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white text-xs font-bold flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* FAQs accordion lists */}
              <div className="space-y-3">
                {editedConfig.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-xs sm:text-sm bangla-text">Q: {faq.question}</h4>
                      <p className="text-xs text-gray-400 bangla-text mt-1">A: {faq.answer}</p>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaq({ ...faq, _index: idx });
                          setShowFaqModal(true);
                        }}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(idx)}
                        className="p-1 rounded bg-white/5 hover:bg-rose-950/40 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER PARAMS */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">
                Footer Content & Social Media Anchors
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Footer Brand Bio Text</label>
                  <textarea
                    rows={2}
                    value={editedConfig.footer.aboutText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, aboutText: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Helpline Call Number</label>
                  <input
                    type="text"
                    value={editedConfig.footer.helpline}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, helpline: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Corporate Support Email</label>
                  <input
                    type="email"
                    value={editedConfig.footer.email}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, email: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Facebook Page Address</label>
                  <input
                    type="text"
                    value={editedConfig.footer.facebookUrl}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, facebookUrl: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Instagram Channel Link</label>
                  <input
                    type="text"
                    value={editedConfig.footer.instagramUrl}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, instagramUrl: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">LinkedIn Page Address</label>
                  <input
                    type="text"
                    value={editedConfig.footer.linkedinUrl}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, linkedinUrl: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Bottom copyright suffix text</label>
                  <input
                    type="text"
                    value={editedConfig.footer.copyrightText}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        footer: { ...editedConfig.footer, copyrightText: e.target.value }
                      });
                      markDirty();
                    }}
                    className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB CONTENT: TESTIMONIALS (CLIENT SUCCESS STORIES) --- */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Star className="w-5 h-5 text-rose-500" />
                    <span>Client Success Stories (Testimonials) Editor</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    কাস্টমারদের চমৎকার রিভিউ এবং সফলতার গল্পগুলো যোগ করুন ও ম্যানেজ করুন। (Bangla Language Preferred)
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestimonial({
                      id: '',
                      clientName: '',
                      businessName: '',
                      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                      feedback: '',
                      rating: 5
                    });
                    setShowTestimonialModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-agency-pink text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-rose-500/15"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Success Story</span>
                </button>
              </div>

              {/* Section Header Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Badge (সেকশন ব্যাজ)</label>
                  <input
                    type="text"
                    value={editedConfig.testimonials?.badge || ''}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        testimonials: {
                          ...(editedConfig.testimonials || { badge: '', heading: '', description: '', items: [] }),
                          badge: e.target.value
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Heading (প্রধান শিরোনাম)</label>
                  <input
                    type="text"
                    value={editedConfig.testimonials?.heading || ''}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        testimonials: {
                          ...(editedConfig.testimonials || { badge: '', heading: '', description: '', items: [] }),
                          heading: e.target.value
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Section Description (সংক্ষিপ্ত বর্ণনা)</label>
                  <input
                    type="text"
                    value={editedConfig.testimonials?.description || ''}
                    onChange={(e) => {
                      setEditedConfig({
                        ...editedConfig,
                        testimonials: {
                          ...(editedConfig.testimonials || { badge: '', heading: '', description: '', items: [] }),
                          description: e.target.value
                        }
                      });
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-lg bg-black/20 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Testimonials List */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-white">Active Customer Testimonials ({((editedConfig.testimonials?.items) || []).length})</h4>
              
              {((editedConfig.testimonials?.items) || []).length === 0 ? (
                <div className="text-center py-10 bg-black/20 rounded-xl border border-dashed border-white/5">
                  <p className="text-xs text-gray-500">কোনো রিভিউ বা সফলতার গল্প যোগ করা হয়নি। উপরে "Add Success Story" বাটনে ক্লিক করে যোগ করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {((editedConfig.testimonials?.items) || []).map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {t.logoUrl ? (
                              <img
                                src={t.logoUrl}
                                alt={t.clientName}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover border border-white/10"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-bold">
                                {t.clientName?.charAt(0) || 'C'}
                              </div>
                            )}
                            <div>
                              <h5 className="text-xs font-bold text-white">{t.clientName}</h5>
                              <p className="text-[10px] text-rose-400 font-semibold">{t.businessName}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingTestimonial({ ...t });
                                setShowTestimonialModal(true);
                              }}
                              className="p-1 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="p-1 rounded bg-white/5 text-rose-400 hover:text-white hover:bg-rose-950/20"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < (t.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-gray-400 bangla-text line-clamp-3">"{t.feedback}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: DATABASE SETUP & VERCEL DEPLOYMENT --- */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Database className="w-5 h-5 text-rose-500" />
                    <span>Vercel Deploy & Supabase Setup Hub</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 bangla-text">
                    এই ওয়েবসাইটটি পার্মানেন্টলি Vercel-এ হোস্ট করুন এবং সকল ডেটা Supabase ডেটাবেজে সুরক্ষিত রাখুন।
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xs text-gray-400">Database Status:</span>
                  {dbStatus.connected ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center space-x-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>SUPABASE CONNECTED</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 flex items-center space-x-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>LOCAL STORAGE FALLBACK</span>
                    </span>
                  )}
                </div>
              </div>

              {/* --- Supabase Instant credentials manager --- */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Database className="w-4 h-4 text-rose-400" />
                    <span>Supabase Direct Integration (সরাসরি ডেটাবেজ কানেক্ট করুন)</span>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 bangla-text">
                    নিচের ইনপুট বক্সে আপনার Supabase প্রোজেক্টের URL এবং Anon Key বসিয়ে <strong>"Connect & Sync"</strong> বাটনে ক্লিক করলেই ব্রাউজার ও লাইভ সাইট সরাসরি Supabase ডেটাবেজের সাথে কানেক্ট হয়ে যাবে। এনভায়রনমেন্ট ভেরিয়েবল ছাড়াই রিয়েল-টাইমে সেভ এবং কানেকশন টেস্ট করার সেরা উপায়!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">SUPABASE URL</label>
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">SUPABASE ANON KEY</label>
                    <input
                      type="password"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-1 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      saveSupabaseCredentials(inputUrl, inputKey);
                      setSaveStatus('saved');
                      setTimeout(() => setSaveStatus('idle'), 3000);
                      // Run diagnostics test immediately
                      handleRunDiagnostics();
                      // Force a page/context status update
                      if (typeof window !== 'undefined') {
                        setTimeout(() => window.location.reload(), 1500);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-rose-500/20 cursor-pointer transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Connect & Sync (কানেক্ট করুন)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      saveSupabaseCredentials('', '');
                      setInputUrl('');
                      setInputKey('');
                      setSaveStatus('cleared');
                      setDiagResult(null);
                      setDiagRun(false);
                      setTimeout(() => setSaveStatus('idle'), 3000);
                      // Force update
                      if (typeof window !== 'undefined') {
                        setTimeout(() => window.location.reload(), 1500);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>Disconnect (ডিসকানেক্ট)</span>
                  </button>

                  {saveStatus === 'saved' && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center animate-pulse bangla-text">
                      ✓ সফলভাবে সেভ হয়েছে! পেজ রিলোড হচ্ছে...
                    </span>
                  )}
                  {saveStatus === 'cleared' && (
                    <span className="text-xs text-amber-400 font-bold flex items-center animate-pulse bangla-text">
                      ✓ ক্রেডেনশিয়াল মুছে ফেলা হয়েছে। পেজ রিলোড হচ্ছে...
                    </span>
                  )}
                </div>
              </div>

              {/* Status & Explanation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Side: Step-by-Step guides */}
                <div className="space-y-6">
                  
                  {/* Step 1: Create Supabase Project */}
                  <div className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-3">
                    <div className="flex items-center space-x-2.5 text-rose-400 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center text-xs text-rose-400 font-mono">১</span>
                      <span>Supabase ডেটাবেজ তৈরি করুন</span>
                    </div>
                    <ul className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed bangla-text pl-1">
                      <li><a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-rose-400 underline hover:text-white">Supabase.com</a>-এ একটি ফ্রি অ্যাকাউন্ট তৈরি করুন।</li>
                      <li>একটি নতুন প্রোজেক্ট (New Project) চালু করুন এবং পাসওয়ার্ড সুরক্ষিত রাখুন।</li>
                      <li>প্রোজেক্ট ড্যাশবোর্ডের বাম পাশের মেনু থেকে <strong>SQL Editor</strong>-এ ক্লিক করুন।</li>
                      <li>ডান পাশের কোড বক্স থেকে SQL স্ক্রিপ্টটি কপি করে পেস্ট করুন এবং <strong>Run</strong> বাটনে ক্লিক করুন।</li>
                    </ul>
                  </div>

                  {/* Step 2: Vercel Deploy */}
                  <div className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-3">
                    <div className="flex items-center space-x-2.5 text-rose-400 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center text-xs text-rose-400 font-mono">২</span>
                      <span>Vercel-এ হোস্ট এবং এনভায়রনমেন্ট ভেরিয়েবল সেট করুন</span>
                    </div>
                    <ul className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed bangla-text pl-1">
                      <li>আপনার এই সম্পূর্ণ প্রোজেক্টটি GitHub-এ পুশ করুন।</li>
                      <li><a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-rose-400 underline hover:text-white">Vercel.com</a>-এ গিয়ে <strong>Add New Project</strong> সিলেক্ট করে এই রিপোজিটরিটি ইম্পোর্ট করুন।</li>
                      <li>Deployment স্ক্রিনে <strong>Environment Variables</strong> সেকশনে গিয়ে নিচের ভেরিয়েবল দুটি যোগ করুন:</li>
                    </ul>
                    <div className="p-3 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-rose-400 space-y-1.5 pl-4">
                      <div>VITE_SUPABASE_URL = <span className="text-gray-500">{"<your_supabase_project_url>"}</span></div>
                      <div>VITE_SUPABASE_ANON_KEY = <span className="text-gray-500">{"<your_supabase_anon_public_key>"}</span></div>
                    </div>
                    <p className="text-[10px] text-gray-400 bangla-text">
                      * এই ভেরিয়েবলগুলো Supabase ড্যাশবোর্ডের Settings {`->`} API সেকশনে পাবেন।
                    </p>
                  </div>

                  {/* Automatic Sync Notice */}
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-slate-300 leading-relaxed bangla-text space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center space-x-1.5 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>হাইব্রিড অফলাইন-অনলাইন সিঙ্ক সুবিধা</span>
                    </span>
                    <p>
                      যদি আপনি Vercel-এ Supabase সেটআপ নাও করেন, ওয়েবসাইটটি বন্ধ হবে না। এটি স্বয়ংক্রিয়ভাবে ব্রাউজারের Local Storage ব্যবহার করে কাজ চালিয়ে যাবে। Supabase কানেক্ট হওয়া মাত্রই সকল ডেটা রিয়েল-টাইম ক্লাউড ডেটাবেজে সেভ হতে থাকবে।
                    </p>
                  </div>

                </div>

                {/* Right Side: SQL Copy Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                      <FileSpreadsheet className="w-4 h-4 text-rose-400" />
                      <span>SQL MIGRATION SCRIPT</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(getSQLSchema());
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center space-x-1 transition-all shrink-0 cursor-pointer"
                    >
                      {copiedSql ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Copy SQL Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 font-mono text-[10px] text-gray-500">
                      <span>SUPABASE_MIGRATION.SQL</span>
                      <span>POSTGRESQL</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[11px] font-mono text-slate-300 leading-relaxed max-h-[420px] select-all">
                      {getSQLSchema()}
                    </pre>
                  </div>
                </div>

              </div>

              {/* --- DATABASE DIAGNOSTICS SECTION --- */}
              <div className="border-t border-white/5 pt-6 mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                      <RefreshCw className={`w-4 h-4 text-rose-500 ${diagLoading ? 'animate-spin' : ''}`} />
                      <span>Supabase Real-Time Connection Diagnostic Tester (রিয়েল-টাইম কানেকশন টেস্ট)</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 bangla-text">
                      ডেটাবেজে ডেটা সেভ হতে সমস্যা হলে নিচের বাটনে ক্লিক করে নিখুঁতভাবে কানেকশন ও পারমিশন পরীক্ষা করে নিন।
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={diagLoading}
                    onClick={handleRunDiagnostics}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-agency-pink hover:opacity-90 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-rose-500/10 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {diagLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Diagnosing...</span>
                      </>
                    ) : (
                      <>
                        <Database className="w-3.5 h-3.5" />
                        <span>Run Connection Test & Diagnose</span>
                      </>
                    )}
                  </button>
                </div>

                {diagRun && diagResult && (
                  <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">DIAGNOSTIC REPORT</h5>
                      {diagResult.success ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          ALL SYSTEMS OK 🎉
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          ISSUES DETECTED ⚠️
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Configuration Checks */}
                      <div className="space-y-2.5">
                        <h6 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">1. Env Configuration Checks</h6>
                        
                        {/* URL Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">URL Environment Key (`VITE_SUPABASE_URL`)</span>
                          {diagResult.urlConfigured ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Configured</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Missing</span>
                          )}
                        </div>

                        {/* ANON Key Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">ANON Key (`VITE_SUPABASE_ANON_KEY`)</span>
                          {diagResult.keyConfigured ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Configured</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Missing</span>
                          )}
                        </div>

                        {/* Client Connection status */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">Supabase JS Client Initialization</span>
                          {diagResult.clientInitialized ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Initialized</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Failed</span>
                          )}
                        </div>
                      </div>

                      {/* Operation Checks */}
                      <div className="space-y-2.5">
                        <h6 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">2. Database Table Access Checks</h6>

                        {/* Leads Read Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">Read `leads` table</span>
                          {diagResult.canReadLeads ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Accessible</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Blocked</span>
                          )}
                        </div>

                        {/* Leads Write/RLS Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">Write/Insert into `leads` (RLS test)</span>
                          {diagResult.canWriteLeads ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Successful</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Failed / RLS Blocked</span>
                          )}
                        </div>

                        {/* Site Settings Read Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">Read `site_settings` table</span>
                          {diagResult.canReadSettings ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Accessible</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Blocked</span>
                          )}
                        </div>

                        {/* Site Settings Write Check */}
                        <div className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-gray-300">Write/Insert into `site_settings`</span>
                          {diagResult.canWriteSettings ? (
                            <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Successful</span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Failed / RLS Blocked</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Errors & Solutions Section */}
                    {(!diagResult.success || !diagResult.clientInitialized) && (
                      <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/10 space-y-3.5 text-xs leading-relaxed text-gray-300">
                        <div className="font-bold text-rose-400 flex items-center space-x-1">
                          <ShieldAlert className="w-4 h-4 text-rose-400" />
                          <span>ত্রুটি এবং সমাধান গাইড (Troubleshooting Solutions)</span>
                        </div>
                        
                        {/* Error 1: Missing Env variables */}
                        {(!diagResult.urlConfigured || !diagResult.keyConfigured) && (
                          <div className="space-y-1.5">
                            <p className="font-bold text-white bangla-text">• এনভায়রনমেন্ট ভেরিয়েবল সেট করা হয়নি:</p>
                            <p className="pl-3 bangla-text text-gray-400">
                              সমাধান: Vercel ড্যাশবোর্ডে আপনার প্রোজেক্টের <strong>Settings {`->`} Environment Variables</strong> সেকশনে যান। সেখানে <code>VITE_SUPABASE_URL</code> এবং <code>VITE_SUPABASE_ANON_KEY</code> কী-দ্বয় যুক্ত করুন এবং পুনরায় Deploy করুন।
                            </p>
                          </div>
                        )}

                        {/* Error 2: Table does not exist */}
                        {(diagResult.errorLeadsRead?.includes('42P01') || diagResult.errorSettingsRead?.includes('42P01')) && (
                          <div className="space-y-1.5">
                            <p className="font-bold text-white bangla-text">• ডেটাবেজ টেবিল খুঁজে পাওয়া যায়নি (Table Not Found):</p>
                            <p className="pl-3 bangla-text text-gray-400">
                              সমাধান: আপনি Supabase-এ টেবিলগুলো তৈরি করেননি। ডান পাশের <strong>Copy SQL Script</strong> বাটনে ক্লিক করে স্ক্রিপ্টটি কপি করুন। এরপর Supabase-এর <strong>SQL Editor</strong>-এ গিয়ে রান করান।
                            </p>
                          </div>
                        )}

                        {/* Error 3: Row Level Security block */}
                        {((diagResult.errorLeadsWrite && (diagResult.errorLeadsWrite.includes('42501') || diagResult.errorLeadsWrite.toLowerCase().includes('security') || diagResult.errorLeadsWrite.toLowerCase().includes('policy'))) ||
                          (diagResult.errorSettingsWrite && (diagResult.errorSettingsWrite.includes('42501') || diagResult.errorSettingsWrite.toLowerCase().includes('security') || diagResult.errorSettingsWrite.toLowerCase().includes('policy')))) && (
                          <div className="space-y-1.5">
                            <p className="font-bold text-white bangla-text">• রো লেভেল সিকিউরিটি বা অনুমতি বাধা (RLS Policy Blocked):</p>
                            <p className="pl-3 bangla-text text-gray-400">
                              সমাধান: Supabase-এ আপনার টেবিলের <strong>Row Level Security (RLS)</strong> অন করা আছে কিন্তু পাবলিকলি ডেটা লেখার কোনো অনুমতি (Policy) দেওয়া নেই। সমাধান করতে Supabase SQL Editor-এ নিচের দুটি লাইন রান করুন:
                            </p>
                            <pre className="p-2.5 rounded bg-black/60 border border-white/5 font-mono text-[11px] text-amber-400 pl-4 select-all">
{`ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;`}
                            </pre>
                          </div>
                        )}

                        {/* General API error info */}
                        {(diagResult.errorLeadsRead || diagResult.errorLeadsWrite || diagResult.errorSettingsRead || diagResult.errorSettingsWrite) && (
                          <div className="mt-2 pt-2.5 border-t border-white/5 space-y-1">
                            <p className="font-bold text-white font-mono uppercase tracking-wider text-[10px]">Raw API Error Messages:</p>
                            {diagResult.errorLeadsRead && <div className="font-mono text-[11px] text-rose-400 pl-2">• Leads Read Error: {diagResult.errorLeadsRead}</div>}
                            {diagResult.errorLeadsWrite && <div className="font-mono text-[11px] text-rose-400 pl-2">• Leads Write Error: {diagResult.errorLeadsWrite}</div>}
                            {diagResult.errorSettingsRead && <div className="font-mono text-[11px] text-rose-400 pl-2">• Settings Read Error: {diagResult.errorSettingsRead}</div>}
                            {diagResult.errorSettingsWrite && <div className="font-mono text-[11px] text-rose-400 pl-2">• Settings Write Error: {diagResult.errorSettingsWrite}</div>}
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- TAB CONTENT 7: ADMIN SECURITY CREDENTIALS --- */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6 max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2 flex items-center space-x-2">
              <Lock className="w-5 h-5 text-agency-purple" />
              <span>Change Admin Entrance Credentials</span>
            </h3>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">CRITICAL NOTICE:</span>
                <p className="mt-1 leading-relaxed bangla-text">
                  অ্যাডমিন আইডি এবং পাসওয়ার্ড পরিবর্তন করার পর সেটি অবশ্যই কোথাও লিখে রাখুন। নতুন আইডি-পাসওয়ার্ড ভুলে গেলে প্যানেলে প্রবেশ করা অসম্ভব হয়ে পড়বে!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">New Admin Username / ID</label>
                <input
                  type="text"
                  value={editedConfig.adminCredentials.username}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      adminCredentials: { ...editedConfig.adminCredentials, username: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">New Admin Password</label>
                <input
                  type="text"
                  value={editedConfig.adminCredentials.passwordHash}
                  onChange={(e) => {
                    setEditedConfig({
                      ...editedConfig,
                      adminCredentials: { ...editedConfig.adminCredentials, passwordHash: e.target.value }
                    });
                    markDirty();
                  }}
                  className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- PORTFOLIO EDIT / CREATE MODAL --- */}
      {showPortfolioModal && editingPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowPortfolioModal(false)} />
          <form
            onSubmit={handleAddOrEditPortfolio}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 overflow-hidden z-10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingPortfolioItem.id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </h4>
              <button type="button" onClick={() => setShowPortfolioModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Project Name / Title</label>
                <input
                  type="text"
                  required
                  value={editingPortfolioItem.title}
                  onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Work Category</label>
                <select
                  value={editingPortfolioItem.category}
                  onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs focus:outline-none"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Facebook Management">Facebook Management</option>
                </select>
              </div>

              <div>
                <ImageUploadField
                  label="Image / Cover Photo (কাজের ছবি আপলোড)"
                  value={editingPortfolioItem.image}
                  onChange={(val) => setEditingPortfolioItem({ ...editingPortfolioItem, image: val })}
                  placeholder="https://images.unsplash.com/photo-..."
                  id="portfolio-item-image"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">YouTube Video Link (Optional)</label>
                <input
                  type="text"
                  value={editingPortfolioItem.videoLink || ''}
                  onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, videoLink: e.target.value })}
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Client Name</label>
                <input
                  type="text"
                  value={editingPortfolioItem.clientName || ''}
                  onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Tech Stack Used (Comma-separated)</label>
                <input
                  type="text"
                  value={(editingPortfolioItem.technologies || []).join(', ')}
                  onChange={(e) => setEditingPortfolioItem({
                    ...editingPortfolioItem,
                    technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="React, Photoshop, Canva"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Project Short Description (Bangla)</label>
                <textarea
                  rows={3}
                  required
                  value={editingPortfolioItem.description}
                  onChange={(e) => setEditingPortfolioItem({ ...editingPortfolioItem, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white text-xs font-bold shadow-lg"
            >
              <span>{editingPortfolioItem.id ? 'Save changes' : 'Add portfolio item'}</span>
            </button>
          </form>
        </div>
      )}

      {/* --- PRICING PACKAGES EDIT / CREATE MODAL --- */}
      {showPackageModal && editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowPackageModal(false)} />
          <form
            onSubmit={handleAddOrEditPackage}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 overflow-hidden z-10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingPackage.id ? 'Edit Pricing Package' : 'Add Pricing Package'}
              </h4>
              <button type="button" onClick={() => setShowPackageModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Package Name / Title</label>
                <input
                  type="text"
                  required
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Service Category</label>
                <select
                  value={editingPackage.category}
                  onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs focus:outline-none"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Facebook Management">Facebook Management</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Price Label</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Billing Interval</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.billing}
                    onChange={(e) => setEditingPackage({ ...editingPackage, billing: e.target.value })}
                    placeholder="এককালীন পেমেন্ট, প্রতি মাসে"
                    className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  id="chk-popular"
                  checked={editingPackage.isPopular || false}
                  onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                  className="rounded border-white/10 bg-black/30 text-agency-purple focus:ring-agency-purple"
                />
                <label htmlFor="chk-popular" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Highlight as Popular Choice (Glow card)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Package Features (One feature per line)</label>
                <textarea
                  rows={4}
                  required
                  value={(editingPackage.features || []).join('\n')}
                  onChange={(e) => setEditingPackage({
                    ...editingPackage,
                    features: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="১টি আকর্ষণীয় কাস্টম পেজ&#10;ফ্রি ডোমেইন হোস্টিং&#10;১০ দিনের ফ্রি সাপোর্ট"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white text-xs font-bold shadow-lg"
            >
              <span>{editingPackage.id ? 'Save changes' : 'Add package'}</span>
            </button>
          </form>
        </div>
      )}

      {/* --- SERVICES EDIT / CREATE MODAL --- */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowServiceModal(false)} />
          <form
            onSubmit={handleAddOrEditService}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 z-10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h4>
              <button type="button" onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Service ID (Required, must match 'web', 'design', 'video', 'facebook' etc)</label>
                <input
                  type="text"
                  required
                  value={editingService.id}
                  onChange={(e) => setEditingService({ ...editingService, id: e.target.value })}
                  placeholder="e.g. web, design, video, facebook"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white font-mono"
                  disabled={!!editingService.id}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Icon Symbol (Lucide Icon name)</label>
                <select
                  value={editingService.iconName}
                  onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none"
                >
                  <option value="Layout">Layout (Website)</option>
                  <option value="Palette">Palette (Design)</option>
                  <option value="Video">Video (Editor)</option>
                  <option value="Share2">Share2 (Social)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Color Gradient class suffix (Tailwind classes)</label>
                <input
                  type="text"
                  required
                  value={editingService.color}
                  onChange={(e) => setEditingService({ ...editingService, color: e.target.value })}
                  placeholder="from-blue-500 to-indigo-600"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Short Description (Bangla)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Bullets / Deliverables (One per line)</label>
                <textarea
                  rows={3}
                  required
                  value={(editingService.bullets || []).join('\n')}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    bullets: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white text-xs font-bold"
            >
              <span>{editingService.id ? 'Save Service' : 'Create Service'}</span>
            </button>
          </form>
        </div>
      )}

      {/* --- WHY CHOOSE US REASONS MODAL --- */}
      {showReasonModal && editingReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowReasonModal(false)} />
          <form
            onSubmit={handleAddOrEditReason}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 z-10 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingReason.id ? 'Edit Feature Reason' : 'Add Feature Reason'}
              </h4>
              <button type="button" onClick={() => setShowReasonModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Feature Title</label>
                <input
                  type="text"
                  required
                  value={editingReason.title}
                  onChange={(e) => setEditingReason({ ...editingReason, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Icon Symbol (Lucide Icon name)</label>
                <select
                  value={editingReason.iconName}
                  onChange={(e) => setEditingReason({ ...editingReason, iconName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none font-mono"
                >
                  <option value="Users2">Users2 (Experienced Team)</option>
                  <option value="Clock">Clock (On-time Delivery)</option>
                  <option value="Palette">Palette (Modern Design)</option>
                  <option value="BadgePercent">BadgePercent (Affordable Pricing)</option>
                  <option value="HeartHandshake">HeartHandshake (24/7 Support)</option>
                  <option value="Settings">Settings (Custom Solutions)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description (Bangla)</label>
                <textarea
                  rows={3}
                  required
                  value={editingReason.description}
                  onChange={(e) => setEditingReason({ ...editingReason, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white text-xs font-bold"
            >
              <span>{editingReason.id ? 'Save Reason' : 'Create Reason'}</span>
            </button>
          </form>
        </div>
      )}

      {/* --- FAQS ACCORDION EDIT / CREATE MODAL --- */}
      {showFaqModal && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowFaqModal(false)} />
          <form
            onSubmit={handleAddOrEditFaq}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 z-10 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingFaq._index !== undefined ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h4>
              <button type="button" onClick={() => setShowFaqModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Question Title (Bangla)</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Answer Text (Bangla)</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white text-xs font-bold"
            >
              <span>{editingFaq._index !== undefined ? 'Save FAQ' : 'Create FAQ'}</span>
            </button>
          </form>
        </div>
      )}

      {/* --- TESTIMONIALS EDIT / CREATE MODAL --- */}
      {showTestimonialModal && editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowTestimonialModal(false)} />
          <form
            onSubmit={handleAddOrEditTestimonial}
            className="relative w-full max-w-lg rounded-2xl bg-[#0d1222] border border-white/10 p-6 z-10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="font-bold text-white text-base">
                {editingTestimonial.id ? 'Edit Success Story / Review' : 'Add Success Story / Review'}
              </h4>
              <button type="button" onClick={() => setShowTestimonialModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Client Name (ক্লায়েন্টের নাম)</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.clientName || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                  placeholder="e.g. সাকিব আল হাসান"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Business/Brand Name (ব্যবসার নাম)</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.businessName || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, businessName: e.target.value })}
                  placeholder="e.g. সাকিব’স কিচেন"
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <ImageUploadField
                  label="Logo / Avatar Image (ক্লায়েন্ট বা ব্র্যান্ডের লোগো/ছবি)"
                  value={editingTestimonial.logoUrl || ''}
                  onChange={(val) => setEditingTestimonial({ ...editingTestimonial, logoUrl: val })}
                  placeholder="https://images.unsplash.com/photo-..."
                  id="testimonial-logo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Client Rating (রেটিং স্টার)</label>
                <select
                  value={editingTestimonial.rating || 5}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Client Feedback/Testimonial (ক্লায়েন্টের মতামত - বাংলা)</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.feedback || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, feedback: e.target.value })}
                  placeholder="B2BFIY-এর সাথে কাজ করার অভিজ্ঞতা..."
                  className="w-full p-2.5 rounded-lg bg-black/30 border border-white/10 text-white text-xs bangla-text"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowTestimonialModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-agency-pink text-white text-xs font-bold"
              >
                Save Review
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
