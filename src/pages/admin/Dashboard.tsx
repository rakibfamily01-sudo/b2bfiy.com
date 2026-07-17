import React, { useState, useEffect } from 'react';
import { useApp } from '../../components/AppContext';
import { 
  LayoutDashboard, Globe, Briefcase, Award, CreditCard, 
  Inbox, Image, Shield, LogOut, CheckCircle, AlertCircle, 
  Plus, Edit, Trash2, Save, FileText, Check, Copy, Upload,
  Phone, Mail, MapPin, Link2, ExternalLink, RefreshCw, Star, Info, ListOrdered
} from 'lucide-react';

export default function Dashboard() {
  const { data, token, adminEmail, logout, refreshData, showToast, toast } = useApp();
  
  // Tab Management
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'services' | 'portfolio' | 'packages' | 'leads' | 'media' | 'account'>('overview');

  // --- Sub-States for Forms ---
  
  // Website Settings Form
  const [settingsForm, setSettingsForm] = useState<any>({
    name: '', logo: '', logoText: '', logoDisplayType: 'both', favicon: '',
    phone: '', email: '', whatsapp: '', address: '',
    facebook: '', instagram: '', linkedin: '', youtube: '',
    defaultSeoTitle: '', defaultMetaDescription: '',
    viewAllGraphicsDesignUrl: '', footerDescription: '', footerCopyright: ''
  });

  // Services State & Forms
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '', description: '', featuresString: '', iconName: 'Globe', order: 0, published: true
  });

  // Portfolio State & Forms
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '', clientName: '', categoryId: 'web-development', serviceType: '', 
    thumbnail: '', slug: '', tagsString: '', videoUrl: '', websiteUrl: '',
    date: '', description: '', challenge: '', solution: '', process: '', result: '',
    technologiesString: '', featured: false, published: true
  });

  // Packages State & Forms
  const [packages, setPackages] = useState<any[]>([]);
  const [editingPackage, setEditingPackage] = useState<any | null>(null);
  const [packageForm, setPackageForm] = useState({
    name: '', type: 'bundle', price: '', currency: '$', period: 'Month',
    featuresString: '', mostPopular: false, order: 0, deliveryTime: '', published: true
  });

  // Leads Lists
  const [auditRequests, setAuditRequests] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);

  // Media Library List & Upload State
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [uploadUrlInput, setUploadUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Security Credentials Form
  const [adminEmailForm, setAdminEmailForm] = useState('');
  const [adminPasswordForm, setAdminPasswordForm] = useState('');
  const [adminConfirmPasswordForm, setAdminConfirmPasswordForm] = useState('');

  // Sync state from AppContext data when it finishes loading
  useEffect(() => {
    if (data) {
      if (data.settings) {
        setSettingsForm({ ...data.settings });
      }
      if (data.services) {
        setServices(data.services);
      }
      if (data.portfolio_projects) {
        setPortfolio(data.portfolio_projects);
      }
      if (data.packages) {
        setPackages(data.packages);
      }
      if (data.audit_requests) {
        setAuditRequests(data.audit_requests);
      }
      if (data.contact_messages) {
        setContactMessages(data.contact_messages);
      }
      if (data.media) {
        setMediaItems(data.media);
      }
    }
  }, [data]);

  // Set default account form values
  useEffect(() => {
    if (adminEmail) {
      setAdminEmailForm(adminEmail);
    }
  }, [adminEmail]);

  // General state triggers
  const forceRefresh = async () => {
    showToast('Refreshing server data...', 'success');
    await refreshData();
  };

  // --- API Handlers ---

  // Website Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/save-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        showToast('Website configurations saved and synced successfully!', 'success');
        refreshData();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update website settings');
      }
    } catch (err: any) {
      showToast(err.message || 'Error updating settings', 'error');
    }
  };

  // Services Handlers
  const handleEditServiceClick = (srv: any) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title || '',
      description: srv.description || '',
      featuresString: srv.features ? srv.features.join('\n') : '',
      iconName: srv.iconName || 'Globe',
      order: srv.order || 0,
      published: srv.published !== false
    });
  };

  const handleAddNewServiceClick = () => {
    setEditingService('new');
    setServiceForm({
      title: '',
      description: '',
      featuresString: '',
      iconName: 'Globe',
      order: services.length + 1,
      published: true
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isNew = editingService === 'new';
      const features = serviceForm.featuresString
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const payload = {
        id: isNew ? `srv-${Date.now()}` : editingService.id,
        title: serviceForm.title,
        description: serviceForm.description,
        features,
        iconName: serviceForm.iconName,
        order: Number(serviceForm.order) || 0,
        published: serviceForm.published
      };

      let updatedServices;
      if (isNew) {
        updatedServices = [...services, payload];
      } else {
        updatedServices = services.map(s => s.id === payload.id ? payload : s);
      }

      const res = await fetch('/api/admin/save-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ services: updatedServices })
      });

      if (res.ok) {
        showToast(`Service "${payload.title}" saved successfully!`, 'success');
        setEditingService(null);
        refreshData();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save service');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to delete this service?')) return;
    try {
      const updatedServices = services.filter(s => s.id !== id);
      const res = await fetch('/api/admin/save-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ services: updatedServices })
      });

      if (res.ok) {
        showToast('Service deleted successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting service', 'error');
    }
  };

  // Portfolio Handlers
  const handleEditProjectClick = (proj: any) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      clientName: proj.clientName || '',
      categoryId: proj.categoryId || 'web-development',
      serviceType: proj.serviceType || '',
      thumbnail: proj.thumbnail || '',
      slug: proj.slug || '',
      tagsString: proj.tags ? proj.tags.join(', ') : '',
      videoUrl: proj.videoUrl || '',
      websiteUrl: proj.websiteUrl || '',
      date: proj.date || '',
      description: proj.description || '',
      challenge: proj.challenge || '',
      solution: proj.solution || '',
      process: proj.process || '',
      result: proj.result || '',
      technologiesString: proj.technologies ? proj.technologies.join(', ') : '',
      featured: !!proj.featured,
      published: proj.published !== false
    });
  };

  const handleAddNewProjectClick = () => {
    setEditingProject('new');
    const tempSlug = `project-${Date.now()}`;
    setProjectForm({
      title: '', clientName: '', categoryId: 'web-development', serviceType: '',
      thumbnail: '', slug: tempSlug, tagsString: '', videoUrl: '', websiteUrl: '',
      date: new Date().toISOString().split('T')[0], description: '',
      challenge: '', solution: '', process: '', result: '',
      technologiesString: '', featured: false, published: true
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isNew = editingProject === 'new';
      const tags = projectForm.tagsString
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      const technologies = projectForm.technologiesString
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const payload = {
        id: isNew ? `proj-${Date.now()}` : editingProject.id,
        title: projectForm.title,
        clientName: projectForm.clientName,
        categoryId: projectForm.categoryId,
        serviceType: projectForm.serviceType,
        thumbnail: projectForm.thumbnail,
        slug: projectForm.slug.trim().toLowerCase(),
        tags,
        videoUrl: projectForm.videoUrl,
        websiteUrl: projectForm.websiteUrl,
        date: projectForm.date,
        description: projectForm.description,
        challenge: projectForm.challenge,
        solution: projectForm.solution,
        process: projectForm.process,
        result: projectForm.result,
        technologies,
        featured: projectForm.featured,
        published: projectForm.published,
        images: isNew ? [] : (editingProject.images || [])
      };

      const res = await fetch('/api/admin/save-portfolio-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(`Case Study "${payload.title}" saved!`, 'success');
        setEditingProject(null);
        refreshData();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save project');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving case study', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;
    try {
      const res = await fetch(`/api/admin/delete-portfolio-project/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        showToast('Case study deleted successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to delete case study');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting case study', 'error');
    }
  };

  // Pricing Packages Handlers
  const handleEditPackageClick = (pkg: any) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name || '',
      type: pkg.type || 'bundle',
      price: pkg.price || '',
      currency: pkg.currency || '$',
      period: pkg.period || 'Month',
      featuresString: pkg.features ? pkg.features.join('\n') : '',
      mostPopular: !!pkg.mostPopular,
      order: pkg.order || 0,
      deliveryTime: pkg.deliveryTime || '',
      published: pkg.published !== false
    });
  };

  const handleAddNewPackageClick = () => {
    setEditingPackage('new');
    setPackageForm({
      name: '', type: 'bundle', price: '', currency: '$', period: 'Month',
      featuresString: '', mostPopular: false, order: packages.length + 1,
      deliveryTime: '3-5 Days', published: true
    });
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isNew = editingPackage === 'new';
      const features = packageForm.featuresString
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const payload = {
        id: isNew ? `pkg-${Date.now()}` : editingPackage.id,
        name: packageForm.name,
        type: packageForm.type,
        price: packageForm.price,
        currency: packageForm.currency,
        period: packageForm.period,
        features,
        mostPopular: packageForm.mostPopular,
        order: Number(packageForm.order) || 0,
        deliveryTime: packageForm.deliveryTime,
        published: packageForm.published
      };

      const res = await fetch('/api/admin/save-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(`Pricing plan "${payload.name}" saved!`, 'success');
        setEditingPackage(null);
        refreshData();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save package');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving package', 'error');
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this pricing package?')) return;
    try {
      const res = await fetch(`/api/admin/delete-package/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        showToast('Pricing plan deleted successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to delete pricing package');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting pricing package', 'error');
    }
  };

  // Leads Actions
  const handleUpdateLeadStatus = async (type: 'audit' | 'contact', id: string, newStatus: string) => {
    try {
      const endpoint = type === 'audit' 
        ? `/api/admin/audit-requests/${id}` 
        : `/api/admin/contact-messages/${id}`;
      
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        showToast('Lead status updated successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (err: any) {
      showToast(err.message || 'Error updating status', 'error');
    }
  };

  const handleDeleteLead = async (type: 'audit' | 'contact', id: string) => {
    if (!window.confirm('Delete this lead records permanently?')) return;
    try {
      const endpoint = type === 'audit' 
        ? `/api/admin/audit-requests/${id}` 
        : `/api/admin/contact-messages/${id}`;
        
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        showToast('Lead removed successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to delete record');
      }
    } catch (err: any) {
      showToast(err.message || 'Error removing lead', 'error');
    }
  };

  // Media Library Uploads & Registration
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadMediaFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadMediaFile(e.target.files[0]);
    }
  };

  const uploadMediaFile = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Custom image file successfully uploaded!', 'success');
        refreshData();
      } else {
        throw new Error(resData.error || 'Failed to upload media file');
      }
    } catch (err: any) {
      showToast(err.message || 'Error uploading file', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRegisterUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrlInput.trim()) return;
    try {
      const res = await fetch('/api/admin/media-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fileUrl: uploadUrlInput.trim() })
      });

      const resData = await res.json();
      if (res.ok) {
        showToast('Image URL registered in library successfully!', 'success');
        setUploadUrlInput('');
        refreshData();
      } else {
        throw new Error(resData.error || 'Failed to register image URL');
      }
    } catch (err: any) {
      showToast(err.message || 'Error registering URL', 'error');
    }
  };

  const handleDeleteMediaItem = async (id: string) => {
    if (!window.confirm('Delete this media asset? This might break pages showing this image.')) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        showToast('Media item deleted successfully!', 'success');
        refreshData();
      } else {
        throw new Error('Failed to delete media asset');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting media', 'error');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Copied to clipboard!', 'success');
  };

  // Account Security Credentials Update
  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmailForm.trim()) {
      showToast('Admin email/username cannot be blank.', 'error');
      return;
    }
    if (adminPasswordForm && adminPasswordForm !== adminConfirmPasswordForm) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: adminEmailForm.trim(),
          password: adminPasswordForm || undefined
        })
      });

      const resData = await res.json();
      if (res.ok) {
        showToast('Credentials updated successfully! Use your new login details next time.', 'success');
        setAdminPasswordForm('');
        setAdminConfirmPasswordForm('');
        refreshData();
      } else {
        throw new Error(resData.error || 'Failed to update admin credentials');
      }
    } catch (err: any) {
      showToast(err.message || 'Error updating credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] selection:bg-brand-primary selection:text-brand-pure-white flex flex-col md:flex-row text-xs">
      
      {/* Toast Notification */}
      {toast.message && (
        <div 
          id="toast-notification"
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl max-w-sm animate-fade-in ${
            toast.type === 'success' 
              ? 'bg-brand-pure-white border-green-100 text-green-800' 
              : 'bg-brand-pure-white border-red-100 text-red-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span className="font-bold leading-tight text-[11px]">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 bg-brand-dark text-gray-300 flex flex-col justify-between border-r border-gray-800">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary text-brand-pure-white flex items-center justify-center font-black text-sm">
                B
              </div>
              <div>
                <span className="font-extrabold text-brand-pure-white tracking-wide block">B2bfiy Studio</span>
                <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">CMS Console v2.0</span>
              </div>
            </div>
            <button 
              onClick={forceRefresh}
              className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 hover:text-brand-pure-white transition-colors cursor-pointer"
              title="Refresh State Cache"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('overview'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'overview' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>CRM Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'settings' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Globe className="w-4 h-4" />
              <span>Website CMS</span>
            </button>

            <button
              onClick={() => { setActiveTab('services'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'services' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services Options</span>
            </button>

            <button
              onClick={() => { setActiveTab('portfolio'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'portfolio' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Award className="w-4 h-4" />
              <span>Case Studies</span>
            </button>

            <button
              onClick={() => { setActiveTab('packages'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'packages' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Pricing Plans</span>
            </button>

            <button
              onClick={() => { setActiveTab('leads'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'leads' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Inbox className="w-4 h-4" />
              <span>Customer Leads</span>
              {(auditRequests.filter(r => r.status === 'new').length + contactMessages.filter(r => r.status === 'unread').length) > 0 && (
                <span className="ml-auto w-4 h-4 rounded-full bg-red-500 text-brand-pure-white text-[9px] flex items-center justify-center font-bold">
                  {auditRequests.filter(r => r.status === 'new').length + contactMessages.filter(r => r.status === 'unread').length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('media'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'media' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Image className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => { setActiveTab('account'); setEditingService(null); setEditingProject(null); setEditingPackage(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold cursor-pointer ${activeTab === 'account' ? 'bg-brand-primary text-brand-pure-white shadow-md shadow-brand-primary/15' : 'hover:bg-gray-900 hover:text-brand-pure-white'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin Security</span>
            </button>
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-gray-800 flex flex-col gap-3">
          <div className="px-4">
            <span className="text-[10px] text-gray-500 block">Logged in as:</span>
            <span className="font-extrabold text-brand-pure-white truncate block">{adminEmail || 'b2bfiy'}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-bold text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6 selection:bg-brand-primary selection:text-brand-pure-white">
        
        {/* Dynamic Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
          <div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight">
              {activeTab === 'overview' && 'CRM Overview'}
              {activeTab === 'settings' && 'Website CMS Config'}
              {activeTab === 'services' && 'Services Options'}
              {activeTab === 'portfolio' && 'Case Studies'}
              {activeTab === 'packages' && 'Pricing Plans'}
              {activeTab === 'leads' && 'Customer Leads'}
              {activeTab === 'media' && 'Media Library'}
              {activeTab === 'account' && 'Admin Security Settings'}
            </h1>
            <p className="text-brand-secondary text-[11px] mt-0.5">
              {activeTab === 'overview' && 'A macro overview of business metrics and pending leads.'}
              {activeTab === 'settings' && 'Customize headers, logos, contact info, SEO metadata, and footer copyright paragraphs.'}
              {activeTab === 'services' && 'Add, edit or delete business categories, descriptions, and feature lists.'}
              {activeTab === 'portfolio' && 'Highlight successful digital case studies, images, and category tagging.'}
              {activeTab === 'packages' && 'Manage subscription plans, deliverables, price rates, and features.'}
              {activeTab === 'leads' && 'Manage free audit submissions and general queries from clients.'}
              {activeTab === 'media' && 'Upload and copy high-fidelity custom files and references for use on the site.'}
              {activeTab === 'account' && 'Protect your dashboard by changing your Admin ID and secure master password.'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2 bg-brand-pure-white border border-brand-border rounded-xl font-bold text-brand-dark hover:border-brand-primary transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body rendering */}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Quick Stats */}
            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-brand-secondary uppercase font-bold tracking-wider block">Total Services</span>
                <span className="text-2xl font-black text-brand-dark mt-1 block">{services.length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-brand-secondary uppercase font-bold tracking-wider block">Case Studies</span>
                <span className="text-2xl font-black text-brand-dark mt-1 block">{portfolio.length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-brand-secondary uppercase font-bold tracking-wider block">Audit Requests</span>
                <span className="text-2xl font-black text-brand-dark mt-1 block">{auditRequests.length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-brand-secondary uppercase font-bold tracking-wider block">General Messages</span>
                <span className="text-2xl font-black text-brand-dark mt-1 block">{contactMessages.length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Inbox className="w-5 h-5" />
              </div>
            </div>

            {/* Quick Leads Desk */}
            <div className="md:col-span-4 bg-brand-pure-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                <h3 className="font-extrabold text-brand-dark text-sm">Pending Action Leads</h3>
                <button onClick={() => setActiveTab('leads')} className="text-brand-primary font-bold hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pending Audits */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-brand-dark text-[11px] uppercase tracking-wider text-amber-700">Latest Audits Needed</h4>
                  {auditRequests.filter(r => r.status === 'new').slice(0, 3).map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-warm-bg/50 border border-brand-border flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-brand-dark">{r.fullName} ({r.businessName || 'No Company'})</span>
                        <span className="text-[9px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold uppercase">New</span>
                      </div>
                      <span className="text-[10px] text-brand-secondary">Website: {r.websiteUrl || 'Not specified'}</span>
                      <p className="text-[10px] text-brand-secondary line-clamp-1">Service: {r.serviceNeeded}</p>
                    </div>
                  ))}
                  {auditRequests.filter(r => r.status === 'new').length === 0 && (
                    <div className="text-center py-6 text-brand-secondary border border-dashed border-brand-border rounded-xl">No pending audits. All clear!</div>
                  )}
                </div>

                {/* Pending Messages */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-brand-dark text-[11px] uppercase tracking-wider text-indigo-700">Latest Queries</h4>
                  {contactMessages.filter(r => r.status === 'unread').slice(0, 3).map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-warm-bg/50 border border-brand-border flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-brand-dark">{r.fullName}</span>
                        <span className="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold uppercase">Unread</span>
                      </div>
                      <span className="text-[10px] text-brand-secondary">Subject: {r.subject || 'Inquiry'}</span>
                      <p className="text-[10px] text-brand-secondary line-clamp-1">"{r.message}"</p>
                    </div>
                  ))}
                  {contactMessages.filter(r => r.status === 'unread').length === 0 && (
                    <div className="text-center py-6 text-brand-secondary border border-dashed border-brand-border rounded-xl">No unread inquiries. Great job!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SITE CONFIG / WEBSITE CMS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-brand-pure-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col gap-6">
            
            {/* Logo, Favicon, & Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-6 border-b border-brand-border">
              <div className="md:col-span-12">
                <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-brand-primary" /> Core Website Branding</h3>
              </div>
              
              <div className="md:col-span-6 flex flex-col gap-3">
                <label className="font-bold text-brand-dark">Custom Website Logo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settingsForm.logo || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, logo: e.target.value })}
                    className="flex-1 px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                    placeholder="e.g. /assets/logo.png"
                  />
                  <button 
                    type="button"
                    onClick={() => { setActiveTab('media'); showToast('Upload logo first, then copy URL here!', 'success'); }}
                    className="px-4 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-xl font-bold cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
                {settingsForm.logo && (
                  <div className="flex items-center gap-3 bg-brand-warm-bg/50 p-3 rounded-xl border border-brand-border">
                    <img src={settingsForm.logo} alt="Logo preview" className="h-8 max-w-[80px] object-contain rounded" onError={(e:any)=>{e.target.style.display='none'}} />
                    <span className="text-[10px] text-brand-secondary truncate">{settingsForm.logo}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-6 flex flex-col gap-3">
                <label className="font-bold text-brand-dark">Website Favicon URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settingsForm.favicon || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, favicon: e.target.value })}
                    className="flex-1 px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                    placeholder="e.g. /favicon.png"
                  />
                  <button 
                    type="button"
                    onClick={() => { setActiveTab('media'); showToast('Upload favicon first, then copy URL here!', 'success'); }}
                    className="px-4 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-xl font-bold cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Logo Label Text</label>
                <input
                  type="text"
                  value={settingsForm.logoText || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="B2bfiy"
                />
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Logo Display Type</label>
                <select
                  value={settingsForm.logoDisplayType || 'both'}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoDisplayType: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-bold"
                >
                  <option value="logo">Only Graphic Logo Icon</option>
                  <option value="text">Only Text Brand Name</option>
                  <option value="both">Both Logo Icon & Text</option>
                </select>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Website Title</label>
                <input
                  type="text"
                  value={settingsForm.name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="B2bfiy Scale"
                />
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-6 border-b border-brand-border">
              <div className="md:col-span-3">
                <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-brand-primary" /> Business Contact Channels</h3>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Phone Number</label>
                <input
                  type="text"
                  value={settingsForm.phone || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="+880 1700..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Public Email Address</label>
                <input
                  type="email"
                  value={settingsForm.email || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="info@b2bfiy.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">WhatsApp Number / Direct Link</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="+880..."
                />
              </div>

              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Physical Address Description</label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="E.g. Dhaka, Bangladesh"
                />
              </div>
            </div>

            {/* Social Medias & Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pb-6 border-b border-brand-border">
              <div className="md:col-span-4">
                <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Link2 className="w-4 h-4 text-brand-primary" /> Social Channels</h3>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Facebook Link</label>
                <input
                  type="text"
                  value={settingsForm.facebook || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Instagram Link</label>
                <input
                  type="text"
                  value={settingsForm.instagram || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">LinkedIn Profile Link</label>
                <input
                  type="text"
                  value={settingsForm.linkedin || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">YouTube Link</label>
                <input
                  type="text"
                  value={settingsForm.youtube || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            {/* Creative Graphics URL & Footer Branding Customizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-brand-border">
              <div className="md:col-span-2">
                <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Star className="w-4 h-4 text-brand-primary" /> Portfolio Action Button & Website Footer</h3>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Footer Brand Paragraph</label>
                <textarea
                  value={settingsForm.footerDescription || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footerDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                  placeholder="E.g. B2bfiy helps businesses build a powerful digital presence through high-converting websites, premium graphics, professional video clips..."
                ></textarea>
                <p className="text-[10px] text-brand-secondary">The brief description under your logo in the website footer column.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Footer Copyright Notice</label>
                <input
                  type="text"
                  value={settingsForm.footerCopyright || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footerCopyright: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="© 2026 B2bfiy. All rights reserved."
                />
                <p className="text-[10px] text-brand-secondary">Copyright disclaimer line at the bottom-most bar of your website.</p>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">"View All Graphic Design" Redirect URL</label>
                <input
                  type="text"
                  value={settingsForm.viewAllGraphicsDesignUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, viewAllGraphicsDesignUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="https://drive.google.com/drive/folders/..."
                />
                <p className="text-[10px] text-brand-secondary">This link powers the visual "View All Graphics Portfolio" CTA button inside your website's graphic portfolio filter.</p>
              </div>
            </div>

            {/* SEO Options */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-12">
                <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-brand-primary" /> Search Engine Optimizations (SEO)</h3>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Default Google Page Title</label>
                <input
                  type="text"
                  value={settingsForm.defaultSeoTitle || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, defaultSeoTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="B2bfiy | Scale Your Brand Digitally"
                />
              </div>

              <div className="md:col-span-8 flex flex-col gap-2">
                <label className="font-bold text-brand-dark">Default Google Search Description</label>
                <input
                  type="text"
                  value={settingsForm.defaultMetaDescription || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, defaultMetaDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                  placeholder="Description..."
                />
              </div>
            </div>

            {/* Save bar */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand-primary text-brand-pure-white rounded-xl font-extrabold flex items-center gap-2 shadow-md shadow-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>SAVE CHANGES & SYNC WEBSITE</span>
              </button>
            </div>
          </form>
        )}

        {/* 3. SERVICES OPTIONS */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-6">
            {!editingService ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-brand-pure-white p-4 rounded-xl border border-brand-border shadow-sm">
                  <span className="font-extrabold text-brand-dark text-[11px] uppercase tracking-wider">Registered Business Service Cards</span>
                  <button
                    onClick={handleAddNewServiceClick}
                    className="px-4 py-2 bg-brand-primary text-brand-pure-white rounded-xl font-bold flex items-center gap-1.5 hover:shadow transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {services.map((srv, idx) => (
                    <div key={srv.id || idx} className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex justify-between gap-4">
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 bg-brand-warm-bg text-brand-primary font-bold rounded text-[10px]">Order: {srv.order || idx + 1}</span>
                          {!srv.published && <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 font-bold rounded text-[9px] uppercase">Draft</span>}
                        </div>
                        <h4 className="font-extrabold text-brand-dark text-sm mt-1">{srv.title}</h4>
                        <p className="text-brand-secondary text-[11px] line-clamp-2 leading-relaxed">{srv.description}</p>
                        
                        {/* Features chips */}
                        {srv.features && srv.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {srv.features.map((f: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 bg-brand-warm-bg border border-brand-border rounded text-[9px] text-brand-secondary">✓ {f}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                        <span className="text-[10px] text-brand-primary font-bold bg-brand-primary/10 px-2 py-1 rounded">Icon: {srv.iconName}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditServiceClick(srv)}
                            className="p-2 bg-brand-warm-bg hover:bg-brand-primary/10 hover:text-brand-primary text-brand-dark rounded-xl border border-brand-border transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-2 bg-brand-warm-bg hover:bg-red-50 hover:text-red-600 text-brand-dark rounded-xl border border-brand-border transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Add/Edit Form */
              <form onSubmit={handleSaveService} className="bg-brand-pure-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                  <h3 className="font-extrabold text-brand-dark text-sm">
                    {editingService === 'new' ? 'Add New Business Service Card' : `Edit Service Card: "${editingService.title}"`}
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setEditingService(null)} 
                    className="text-brand-secondary font-bold hover:text-brand-dark"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Service Title / Name</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Website Development"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-brand-dark">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={serviceForm.iconName}
                        onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                        className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                        placeholder="Globe, Laptop, Video, Image, star..."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-brand-dark">Listing Order (Index)</label>
                      <input
                        type="number"
                        value={serviceForm.order}
                        onChange={(e) => setServiceForm({ ...serviceForm, order: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-bold text-brand-dark">Brief Description</label>
                    <textarea
                      required
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                      placeholder="Explain what the client gets..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-bold text-brand-dark">Included Deliverables (One item per line)</label>
                    <textarea
                      value={serviceForm.featuresString}
                      onChange={(e) => setServiceForm({ ...serviceForm, featuresString: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-mono"
                      placeholder="Premium Landing Page&#10;Highly Responsive Code&#10;Dynamic SEO Setup"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published-srv"
                      checked={serviceForm.published}
                      onChange={(e) => setServiceForm({ ...serviceForm, published: e.target.checked })}
                      className="w-4 h-4 text-brand-primary border-brand-border rounded focus:ring-brand-primary"
                    />
                    <label htmlFor="published-srv" className="font-bold text-brand-dark cursor-pointer">Publish and show instantly on public pages</label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2.5 bg-brand-warm-bg text-brand-dark border border-brand-border rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-primary text-brand-pure-white rounded-xl font-extrabold shadow-md shadow-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/20 transition-all cursor-pointer"
                  >
                    Save Service Options
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 4. PORTFOLIO / CASE STUDIES */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-6">
            {!editingProject ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-brand-pure-white p-4 rounded-xl border border-brand-border shadow-sm">
                  <span className="font-extrabold text-brand-dark text-[11px] uppercase tracking-wider">Showcased Case Studies ({portfolio.length})</span>
                  <button
                    onClick={handleAddNewProjectClick}
                    className="px-4 py-2 bg-brand-primary text-brand-pure-white rounded-xl font-bold flex items-center gap-1.5 hover:shadow transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Case Study Showcase</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {portfolio.map((p, idx) => (
                    <div key={p.id || idx} className="bg-brand-pure-white rounded-2xl border border-brand-border overflow-hidden shadow-sm flex flex-col justify-between">
                      <div>
                        {/* Thumbnail */}
                        <div className="h-44 bg-brand-warm-bg relative overflow-hidden flex items-center justify-center border-b border-brand-border">
                          {p.thumbnail ? (
                            <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" onError={(e:any)=>{e.target.style.display='none'}} />
                          ) : (
                            <Briefcase className="w-12 h-12 text-brand-secondary opacity-30" />
                          )}
                          
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            <span className="px-2 py-0.5 bg-brand-dark text-brand-pure-white rounded text-[8px] uppercase tracking-wide font-bold">{p.categoryId}</span>
                            {p.featured && <span className="px-2 py-0.5 bg-brand-primary text-brand-pure-white rounded text-[8px] uppercase font-bold">★ Featured</span>}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="p-4 flex flex-col gap-1.5">
                          <div className="flex justify-between text-[10px] text-brand-secondary">
                            <span>Client: {p.clientName || 'Private'}</span>
                            <span>{p.date}</span>
                          </div>
                          <h4 className="font-extrabold text-brand-dark text-sm line-clamp-1">{p.title}</h4>
                          <p className="text-[10px] text-brand-secondary line-clamp-2 leading-relaxed">{p.description}</p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex justify-between items-center border-t border-brand-border/50 mt-4">
                        <span className="text-[9px] font-bold text-brand-primary">Slug: /{p.slug}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEditProjectClick(p)}
                            className="p-1.5 bg-brand-warm-bg hover:bg-brand-primary/10 hover:text-brand-primary text-brand-dark rounded-lg border border-brand-border transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 bg-brand-warm-bg hover:bg-red-50 hover:text-red-600 text-brand-dark rounded-lg border border-brand-border transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Add/Edit Project Form */
              <form onSubmit={handleSaveProject} className="bg-brand-pure-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                  <h3 className="font-extrabold text-brand-dark text-sm">
                    {editingProject === 'new' ? 'Create New Case Study Showcase' : `Edit Case Study: "${editingProject.title}"`}
                  </h3>
                  <button type="button" onClick={() => setEditingProject(null)} className="text-brand-secondary font-bold hover:text-brand-dark">Cancel</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Real Estate Scaling Campaign"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Client Name</label>
                    <input
                      type="text"
                      value={projectForm.clientName}
                      onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Apex Holdings Ltd."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Portfolio Category</label>
                    <select
                      value={projectForm.categoryId}
                      onChange={(e) => setProjectForm({ ...projectForm, categoryId: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-bold"
                    >
                      <option value="web-development">Web Development</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="video-editing">Video Editing</option>
                      <option value="social-media">Social Media Scaling</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Unique URL Slug (No spaces, e.g. apex-campaign)</label>
                    <input
                      type="text"
                      required
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-mono text-brand-primary font-bold"
                      placeholder="apex-scaling-campaign"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Cover Image / Thumbnail URL</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={projectForm.thumbnail}
                        onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                        className="flex-1 px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                        placeholder="/assets/work1.png"
                      />
                      <button 
                        type="button"
                        onClick={() => { setActiveTab('media'); showToast('Upload media first, then copy URL here!', 'success'); }}
                        className="px-3 bg-brand-primary/15 text-brand-primary font-bold rounded-xl border border-brand-primary/20 cursor-pointer"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Service Subtype Label</label>
                    <input
                      type="text"
                      value={projectForm.serviceType}
                      onChange={(e) => setProjectForm({ ...projectForm, serviceType: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Next.js SaaS Website"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Live Website URL</label>
                    <input
                      type="text"
                      value={projectForm.websiteUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, websiteUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="https://apex.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Case Study Date</label>
                    <input
                      type="text"
                      value={projectForm.date}
                      onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Demo Video URL (optional)</label>
                    <input
                      type="text"
                      value={projectForm.videoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="https://youtube.com/embed/..."
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="font-bold text-brand-dark">Case Study Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.tagsString}
                      onChange={(e) => setProjectForm({ ...projectForm, tagsString: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="Next.js, Branding, Marketing, SEO"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="font-bold text-brand-dark">Technologies Used (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologiesString}
                      onChange={(e) => setProjectForm({ ...projectForm, technologiesString: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="Tailwind CSS, React, PostgreSQL"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="font-bold text-brand-dark">Project Summary / Overview</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">The Challenge Faced</label>
                    <textarea
                      value={projectForm.challenge}
                      onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Our Implemented Solution</label>
                    <textarea
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Results & Key Metrics Achieved</label>
                    <textarea
                      value={projectForm.result}
                      onChange={(e) => setProjectForm({ ...projectForm, result: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured-proj"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="w-4 h-4 text-brand-primary border-brand-border rounded"
                      />
                      <label htmlFor="featured-proj" className="font-bold text-brand-dark cursor-pointer">Feature on homepage bento grid</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="published-proj"
                        checked={projectForm.published}
                        onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                        className="w-4 h-4 text-brand-primary border-brand-border rounded"
                      />
                      <label htmlFor="published-proj" className="font-bold text-brand-dark cursor-pointer">Publish instantly</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-5 py-2.5 bg-brand-warm-bg text-brand-dark border border-brand-border rounded-xl font-bold cursor-pointer">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-brand-primary text-brand-pure-white rounded-xl font-extrabold shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all cursor-pointer">Save Case Study</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 5. PRICING PLANS */}
        {activeTab === 'packages' && (
          <div className="flex flex-col gap-6">
            {!editingPackage ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-brand-pure-white p-4 rounded-xl border border-brand-border shadow-sm">
                  <span className="font-extrabold text-brand-dark text-[11px] uppercase tracking-wider">Registered Subscription Pricing Plans</span>
                  <button
                    onClick={handleAddNewPackageClick}
                    className="px-4 py-2 bg-brand-primary text-brand-pure-white rounded-xl font-bold flex items-center gap-1.5 hover:shadow transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Pricing Plan</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {packages.map((pkg, idx) => (
                    <div key={pkg.id || idx} className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <span className="px-2.5 py-0.5 bg-brand-warm-bg text-brand-secondary rounded font-bold uppercase text-[9px] tracking-wide border border-brand-border">{pkg.type}</span>
                          <div className="flex gap-1">
                            {pkg.mostPopular && <span className="px-2 py-0.5 bg-brand-primary text-brand-pure-white font-black rounded text-[8px] uppercase">Popular</span>}
                            {!pkg.published && <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded text-[8px] uppercase">Draft</span>}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-brand-dark text-base">{pkg.name}</h4>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-black text-brand-dark">{pkg.currency || '$'}{pkg.price}</span>
                            <span className="text-[10px] text-brand-secondary">/ {pkg.period || 'one-time'}</span>
                          </div>
                          {pkg.deliveryTime && <span className="block text-[9px] text-brand-primary font-bold mt-1">Delivery: {pkg.deliveryTime}</span>}
                        </div>

                        <hr className="border-brand-border" />

                        {/* Feature bullets */}
                        {pkg.features && pkg.features.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {pkg.features.slice(0, 5).map((f: string, i: number) => (
                              <div key={i} className="flex items-start gap-1.5 text-[10px] text-brand-secondary">
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </div>
                            ))}
                            {pkg.features.length > 5 && (
                              <span className="text-[9px] text-brand-secondary font-bold italic">+{pkg.features.length - 5} more inclusions</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center border-t border-brand-border/50 pt-4 mt-5">
                        <span className="text-[9px] text-brand-secondary font-bold">Priority Order: {pkg.order}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPackageClick(pkg)}
                            className="p-1.5 bg-brand-warm-bg hover:bg-brand-primary/10 hover:text-brand-primary text-brand-dark rounded-lg border border-brand-border transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="p-1.5 bg-brand-warm-bg hover:bg-red-50 hover:text-red-600 text-brand-dark rounded-lg border border-brand-border transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Add/Edit Pricing Plan Form */
              <form onSubmit={handleSavePackage} className="bg-brand-pure-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center pb-3 border-b border-brand-border">
                  <h3 className="font-extrabold text-brand-dark text-sm">
                    {editingPackage === 'new' ? 'Create New Subscription/Pricing Plan' : `Edit Pricing Plan: "${editingPackage.name}"`}
                  </h3>
                  <button type="button" onClick={() => setEditingPackage(null)} className="text-brand-secondary font-bold hover:text-brand-dark">Cancel</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Pricing Plan Title</label>
                    <input
                      type="text"
                      required
                      value={packageForm.name}
                      onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Standard Monthly Growth"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Service Plan Type Category</label>
                    <select
                      value={packageForm.type}
                      onChange={(e) => setPackageForm({ ...packageForm, type: e.target.value as any })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-bold"
                    >
                      <option value="monthly">Monthly Subscription Scaling</option>
                      <option value="website">One-time Custom Website Building</option>
                      <option value="graphic">One-time Premium Graphic Package</option>
                      <option value="video">One-time Professional Video Pack</option>
                      <option value="bundle">Full Digital Business Bundle</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-brand-dark">Currency</label>
                      <input
                        type="text"
                        value={packageForm.currency}
                        onChange={(e) => setPackageForm({ ...packageForm, currency: e.target.value })}
                        className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-bold text-center"
                        placeholder="$"
                      />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                      <label className="font-bold text-brand-dark">Rate / Price (No commas)</label>
                      <input
                        type="text"
                        required
                        value={packageForm.price}
                        onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                        className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-black text-brand-primary"
                        placeholder="e.g. 299 or Contact"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Billing Time Period</label>
                    <input
                      type="text"
                      value={packageForm.period}
                      onChange={(e) => setPackageForm({ ...packageForm, period: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. Month, Project, Year, One-time"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Turnaround / Delivery Speed</label>
                    <input
                      type="text"
                      value={packageForm.deliveryTime || ''}
                      onChange={(e) => setPackageForm({ ...packageForm, deliveryTime: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                      placeholder="e.g. 5-7 Days delivery"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-brand-dark">Listing Index (Ordering number)</label>
                    <input
                      type="number"
                      value={packageForm.order}
                      onChange={(e) => setPackageForm({ ...packageForm, order: Number(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="font-bold text-brand-dark">Inclusions / Features (One per line)</label>
                    <textarea
                      value={packageForm.featuresString}
                      onChange={(e) => setPackageForm({ ...packageForm, featuresString: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none font-mono"
                      placeholder="2 Full Landing Pages&#10;Unlimited Revisions&#10;Professional WhatsApp Support"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="popular-pkg"
                        checked={packageForm.mostPopular}
                        onChange={(e) => setPackageForm({ ...packageForm, mostPopular: e.target.checked })}
                        className="w-4 h-4 text-brand-primary border-brand-border rounded focus:ring-brand-primary"
                      />
                      <label htmlFor="popular-pkg" className="font-bold text-brand-dark cursor-pointer">Highlight with "Most Popular" Ribbon</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pub-pkg"
                        checked={packageForm.published}
                        onChange={(e) => setPackageForm({ ...packageForm, published: e.target.checked })}
                        className="w-4 h-4 text-brand-primary border-brand-border rounded focus:ring-brand-primary"
                      />
                      <label htmlFor="pub-pkg" className="font-bold text-brand-dark cursor-pointer">Publish instantly</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                  <button type="button" onClick={() => setEditingPackage(null)} className="px-5 py-2.5 bg-brand-warm-bg text-brand-dark border border-brand-border rounded-xl font-bold cursor-pointer">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-brand-primary text-brand-pure-white rounded-xl font-extrabold shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all cursor-pointer">Save Pricing Plan</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 6. CUSTOMER LEADS LIST */}
        {activeTab === 'leads' && (
          <div className="flex flex-col gap-6">
            
            {/* Free Audit Proposals */}
            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-4">
              <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2 text-amber-700">
                <FileText className="w-4 h-4" /> Free Website Audit Proposals ({auditRequests.length})
              </h3>
              
              <div className="flex flex-col gap-3">
                {auditRequests.map((r, i) => (
                  <div key={r.id || i} className="p-4 rounded-xl border border-brand-border bg-brand-warm-bg/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-brand-dark text-xs">{r.fullName}</span>
                        {r.businessName && <span className="text-[10px] bg-brand-dark/10 px-2 py-0.5 rounded text-brand-dark font-medium">{r.businessName}</span>}
                        <span className="text-[9px] text-brand-secondary">{r.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-[10px] text-brand-secondary">
                        <span>Email: <b className="text-brand-dark font-semibold">{r.email}</b></span>
                        <span>WhatsApp: <b className="text-brand-dark font-semibold">{r.whatsapp}</b></span>
                        <span className="col-span-2">Website: <a href={r.websiteUrl} target="_blank" rel="noreferrer" className="text-brand-primary font-bold hover:underline inline-flex items-center gap-0.5">{r.websiteUrl} <ExternalLink className="w-2.5 h-2.5" /></a></span>
                        <span>Required: <b className="text-brand-primary font-bold">{r.serviceNeeded}</b></span>
                      </div>

                      <p className="text-[11px] text-brand-dark bg-brand-pure-white p-3 rounded-lg border border-brand-border mt-1 font-medium leading-relaxed">
                        "{r.message}"
                      </p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-3 shrink-0">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[9px] text-brand-secondary font-bold uppercase">Status</span>
                        <select
                          value={r.status || 'new'}
                          onChange={(e) => handleUpdateLeadStatus('audit', r.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg font-bold border outline-none text-[10px] cursor-pointer ${
                            r.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            r.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            'bg-green-50 text-green-800 border-green-200'
                          }`}
                        >
                          <option value="new">🔴 Unprocessed / New</option>
                          <option value="contacted">🔵 Contacted Client</option>
                          <option value="qualified">🟡 Qualified Lead</option>
                          <option value="meeting">🟣 Booked Meeting</option>
                          <option value="client">🟢 Confirmed Client</option>
                          <option value="closed">⚪ Closed/Archived</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDeleteLead('audit', r.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {auditRequests.length === 0 && (
                  <div className="text-center py-10 text-brand-secondary border border-dashed border-brand-border rounded-xl">No audit submissions recorded yet.</div>
                )}
              </div>
            </div>

            {/* General Inquiries */}
            <div className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-4">
              <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2 text-indigo-700">
                <Inbox className="w-4 h-4" /> General Contact Form Queries ({contactMessages.length})
              </h3>
              
              <div className="flex flex-col gap-3">
                {contactMessages.map((m, i) => (
                  <div key={m.id || i} className="p-4 rounded-xl border border-brand-border bg-brand-warm-bg/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-brand-dark text-xs">{m.fullName}</span>
                        <span className="text-[10px] text-brand-secondary">{m.email}</span>
                        <span className="text-[9px] text-brand-secondary ml-auto md:ml-0">{m.createdAt}</span>
                      </div>

                      <div className="text-[10px] text-brand-secondary font-bold">Subject: <span className="text-brand-dark">{m.subject || 'Direct Contact Submission'}</span></div>
                      
                      <p className="text-[11px] text-brand-dark bg-brand-pure-white p-3 rounded-lg border border-brand-border mt-1 leading-relaxed font-medium">
                        "{m.message}"
                      </p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-3 shrink-0">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[9px] text-brand-secondary font-bold uppercase">Status</span>
                        <select
                          value={m.status || 'unread'}
                          onChange={(e) => handleUpdateLeadStatus('contact', m.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg font-bold border outline-none text-[10px] cursor-pointer ${
                            m.status === 'unread' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-gray-50 text-gray-800 border-gray-200'
                          }`}
                        >
                          <option value="unread">🔴 Unread Message</option>
                          <option value="read">🔵 Read & Checked</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDeleteLead('contact', m.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {contactMessages.length === 0 && (
                  <div className="text-center py-10 text-brand-secondary border border-dashed border-brand-border rounded-xl">No contact requests submitted yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 7. MEDIA LIBRARY & UPLOAD */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left side: Upload Forms */}
            <div className="md:col-span-4 flex flex-col gap-5">
              {/* Drag & Drop Upload Zone */}
              <div 
                className={`bg-brand-pure-white p-6 rounded-2xl border-2 border-dashed rounded-3xl text-center flex flex-col items-center justify-center gap-3.5 cursor-pointer transition-all ${
                  dragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-border hover:border-brand-primary/40'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('media-file-input')?.click()}
              >
                <input 
                  type="file" 
                  id="media-file-input" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileSelect} 
                />
                
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>

                <div>
                  <span className="block font-extrabold text-brand-dark text-xs">Drag & Drop Image Here</span>
                  <span className="block text-[10px] text-brand-secondary mt-1">Or click to select local file</span>
                </div>

                <div className="text-[9px] text-brand-secondary">PNG, JPG, SVG, WebP up to 10MB</div>
                {uploading && <span className="text-[10px] text-brand-primary font-bold animate-pulse">Uploading file to server...</span>}
              </div>

              {/* URL Registration */}
              <form onSubmit={handleRegisterUrl} className="bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-3">
                <h4 className="font-extrabold text-brand-dark">Register Remote Image URL</h4>
                <p className="text-[10px] text-brand-secondary">Provide an existing hotlink to save it to your media library.</p>
                
                <input
                  type="url"
                  required
                  value={uploadUrlInput}
                  onChange={(e) => setUploadUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-dark text-brand-pure-white rounded-xl font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Register URL
                </button>
              </form>
            </div>

            {/* Right side: Gallery of assets */}
            <div className="md:col-span-8 bg-brand-pure-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                <h3 className="font-extrabold text-brand-dark text-sm">Media Library Assets ({mediaItems.length})</h3>
                <span className="text-[10px] text-brand-secondary">Click on any image to copy its URL path</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {mediaItems.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="group border border-brand-border rounded-xl overflow-hidden relative aspect-square bg-brand-warm-bg flex items-center justify-center cursor-pointer"
                    onClick={() => copyToClipboard(item.fileUrl)}
                    title="Click to copy file URL"
                  >
                    <img src={item.fileUrl} alt={item.fileName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e:any)=>{e.target.style.display='none'}} />
                    
                    {/* Hover tools overlay */}
                    <div className="absolute inset-0 bg-brand-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <span className="text-brand-pure-white text-[9px] font-bold line-clamp-1 truncate w-full text-center px-1">{item.fileName}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(item.fileUrl); }}
                          className="p-1.5 bg-brand-primary text-brand-pure-white rounded hover:bg-brand-primary/80"
                          title="Copy Link"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteMediaItem(item.id); }}
                          className="p-1.5 bg-red-600 text-brand-pure-white rounded hover:bg-red-500"
                          title="Delete File"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {mediaItems.length === 0 && (
                  <div className="col-span-4 text-center py-20 text-brand-secondary border border-dashed border-brand-border rounded-xl">No media files uploaded yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 8. SECURITY SETTINGS / PASSWORD */}
        {activeTab === 'account' && (
          <form onSubmit={handleUpdateAccount} className="bg-brand-pure-white rounded-2xl border border-brand-border p-6 shadow-sm flex flex-col gap-5 max-w-xl">
            <h3 className="font-extrabold text-brand-dark text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-brand-primary" /> Master Admin Login Configuration</h3>
            <p className="text-brand-secondary text-[10px]">Update your login ID / username and master security credentials here.</p>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-brand-dark">Admin Login ID (Email or Username)</label>
              <input
                type="text"
                required
                value={adminEmailForm}
                onChange={(e) => setAdminEmailForm(e.target.value)}
                placeholder="b2bfiy"
                className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
              />
              <span className="text-[9px] text-brand-secondary mt-0.5">Use this string as your main login ID for the CMS admin panel.</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-brand-dark">New Password (Leave blank to keep current)</label>
              <input
                type="password"
                value={adminPasswordForm}
                onChange={(e) => setAdminPasswordForm(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-brand-dark">Confirm New Password</label>
              <input
                type="password"
                value={adminConfirmPasswordForm}
                onChange={(e) => setAdminConfirmPasswordForm(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-brand-warm-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-3 bg-brand-primary text-brand-pure-white rounded-xl font-extrabold shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
              >
                UPDATE ADMIN CREDENTIALS
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
