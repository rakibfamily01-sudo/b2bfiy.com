import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import FrictionAndCure from './components/FrictionAndCure';
import Portfolio from './components/Portfolio';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import FreeAudit from './components/FreeAudit';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
import { SuccessModal, SuccessToast } from './components/SuccessFeedback';
import { initialLeads, defaultSiteConfig } from './data';
import { Lead, ServicePackage, SiteConfig } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { getTranslatedConfig } from './translations';
import { 
  isSupabaseConfigured, 
  fetchLeads, 
  saveLead, 
  deleteLead, 
  fetchSiteConfig, 
  saveSiteConfig 
} from './lib/supabaseClient';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const { language } = useLanguage();
  const [successFeedback, setSuccessFeedback] = useState<{
    isOpen: boolean;
    type: 'audit' | 'contact';
    name: string;
  } | null>(null);
  const [dbStatus, setDbStatus] = useState<{

    configured: boolean;
    connected: boolean;
    source: 'supabase' | 'local';
    error?: string;
  }>({
    configured: false,
    connected: false,
    source: 'local'
  });

  // 1. Initialize leads and siteConfig from Supabase or seed with defaults
  useEffect(() => {
    const initDb = async () => {
      const isConfigured = isSupabaseConfigured();
      
      // Load Site Config
      const configRes = await fetchSiteConfig(defaultSiteConfig);
      setSiteConfig(configRes.data);

      // Load Leads
      const leadsRes = await fetchLeads(initialLeads);
      setLeads(leadsRes.data);

      setDbStatus({
        configured: isConfigured,
        connected: configRes.source === 'supabase' && leadsRes.source === 'supabase',
        source: configRes.source,
        error: configRes.error || leadsRes.error
      });
    };

    initDb();
  }, []);

  // Sync site config to database (Supabase/LocalStorage hybrid)
  const handleUpdateSiteConfig = async (updatedConfig: SiteConfig) => {
    setSiteConfig(updatedConfig);
    const res = await saveSiteConfig(updatedConfig);
    if (!res.success) {
      console.warn('Could not save siteConfig to Supabase, fallback to local:', res.error);
    }
  };

  // Dynamically update Title and Favicon
  useEffect(() => {
    if (siteConfig && siteConfig.branding) {
      // Set Document Title
      document.title = siteConfig.branding.appTitle || 'B2bfiy - Digital Partner';

      // Set Document Favicon
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = siteConfig.branding.faviconUrl || 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=32';
    }
  }, [siteConfig]);

  // 2. Add Lead controller
  const handleAddLead = async (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const freshLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    const updated = [freshLead, ...leads];
    setLeads(updated);
    
    const res = await saveLead(freshLead);
    if (!res.success) {
      console.warn('Could not save lead to Supabase, saved locally:', res.error);
    }

    // Trigger visual feedback modal/toast
    setSuccessFeedback({
      isOpen: true,
      type: newLeadData.source === 'Free Audit' ? 'audit' : 'contact',
      name: newLeadData.name
    });
  };

  // 3. Update Lead Status
  const handleUpdateLeadStatus = async (id: string, status: Lead['status']) => {
    const updated = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
    setLeads(updated);
    const target = updated.find(l => l.id === id);
    if (target) {
      await saveLead(target);
    }
  };

  // 4. Update Lead Notes
  const handleUpdateLeadNotes = async (id: string, notes: string) => {
    const updated = leads.map((lead) => (lead.id === id ? { ...lead, adminNotes: notes } : lead));
    setLeads(updated);
    const target = updated.find(l => l.id === id);
    if (target) {
      await saveLead(target);
    }
  };

  // 5. Delete Lead record
  const handleDeleteLead = async (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    setLeads(updated);
    await deleteLead(id);
  };

  // 6. Reset database back to default initial list
  const handleResetLeads = async () => {
    if (confirm('Are you sure you want to restore default demo leads? This will overwrite your current backoffice list.')) {
      setLeads(initialLeads);
      localStorage.setItem('b2bfiy_leads_db', JSON.stringify(initialLeads));
      if (isSupabaseConfigured()) {
        for (const lead of initialLeads) {
          await saveLead(lead);
        }
      }
    }
  };

  // 7. Add realistic Bangladeshi Mock Lead
  const handleAddMockLead = async () => {
    const names = ['তাহমিদ রহমান', 'নুসরাত জাহান', 'আরিফ চৌধুরী', 'তানজিলা ইসলাম'];
    const businesses = ['অরগানিক হাট বিডি', 'উত্তরা বেকিং হাউজ', 'সুপার ফিটনেস জিম', 'গ্লোরিয়াস ফ্যাশন'];
    const services = ['Website Development', 'Graphic Design', 'Video Editing', 'Facebook Management'];
    
    const randIndex = Math.floor(Math.random() * names.length);
    const selectedServiceMock = services[Math.floor(Math.random() * services.length)];

    const mockLead: Lead = {
      id: `lead-mock-${Date.now()}`,
      name: names[randIndex],
      businessName: businesses[randIndex],
      phone: `01${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: `client${Math.floor(Math.random() * 100)}@gmail.com`,
      websiteOrPage: `${businesses[randIndex].toLowerCase().replace(/\s+/g, '')}.com`,
      serviceNeeded: selectedServiceMock,
      message: 'আমাদের ব্যবসার বিক্রি বাড়াতে আপনাদের প্রিমিয়াম সাহায্য প্রয়োজন। অনুগ্রহ করে আমাদের সাথে জলদি যোগাযোগ করুন।',
      status: 'Pending',
      source: Math.random() > 0.5 ? 'Contact Form' : 'Free Audit',
      createdAt: new Date().toISOString(),
      auditDetails: {
        score: Math.floor(Math.random() * 20) + 70,
        issues: ['সাইটের হোমপেজ লোডিং স্পিড দুর্বল', 'ক্যাচিং ইন্টিগ্রেশন নেই'],
        recommendations: 'কাস্টম রিয়্যাক্ট এসপিএ ডেভেলপমেন্ট।'
      }
    };

    const updated = [mockLead, ...leads];
    setLeads(updated);
    await saveLead(mockLead);
  };

  // Smooth scroll handler
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select package trigger
  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedService(`${pkg.category} - ${pkg.name}`);
    setTimeout(() => {
      scrollToContact();
    }, 100);
  };

  // Select service card trigger
  const handleSelectService = (title: string) => {
    setSelectedService(title);
    setTimeout(() => {
      scrollToContact();
    }, 100);
  };

  const displaySiteConfig = getTranslatedConfig(siteConfig, language);

  return (
    <div className="relative min-h-screen bg-[#05070c] text-white">


      {/* Floating Header Navbar */}
      <Navbar onToggleAdmin={() => setIsAdminMode(!isAdminMode)} isAdminMode={isAdminMode} branding={displaySiteConfig.branding} />

      <AnimatePresence mode="wait">
        {isAdminMode ? (
          <motion.div
            key="admin-workspace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <AdminPanel
              leads={leads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onUpdateLeadNotes={handleUpdateLeadNotes}
              onDeleteLead={handleDeleteLead}
              onResetLeads={handleResetLeads}
              onAddMockLead={handleAddMockLead}
              onCloseAdmin={() => setIsAdminMode(false)}
              siteConfig={siteConfig}
              onUpdateSiteConfig={handleUpdateSiteConfig}
              dbStatus={dbStatus}
            />
          </motion.div>
        ) : (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. Hero banner (Fades and slides up instantly on load for great UX) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <Hero heroConfig={displaySiteConfig.hero} branding={displaySiteConfig.branding} />
            </motion.div>

            {/* 2. Core Services */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <Services onSelectService={handleSelectService} servicesConfig={displaySiteConfig.services} />
            </motion.div>

            {/* 3. Why Choose B2bfiy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <WhyChooseUs whyChooseUsConfig={displaySiteConfig.whyChooseUs} />
            </motion.div>

            {/* Comparison of Pain & Cure */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <FrictionAndCure data={displaySiteConfig.frictionAndCure} onCtaClick={scrollToContact} />
            </motion.div>

            {/* 4. Filterable Projects */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <Portfolio portfolioConfig={displaySiteConfig.portfolio} />
            </motion.div>

            {/* 5. Pricing Tiers */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <Packages onSelectPackage={handleSelectPackage} packagesConfig={displaySiteConfig.packages} />
            </motion.div>

            {/* Client Success Stories */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <Testimonials testimonialsConfig={displaySiteConfig.testimonials} />
            </motion.div>

            {/* 6. Free Audit Widget */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <FreeAudit onAddLead={handleAddLead} />
            </motion.div>

            {/* 7. Conversion Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <Contact
                selectedService={selectedService}
                onAddLead={handleAddLead}
                resetSelection={() => setSelectedService('')}
                siteConfig={displaySiteConfig}
              />
            </motion.div>

            {/* 8. Collapsible Accordion FAQs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <FAQ faqs={displaySiteConfig.faqs} />
            </motion.div>

            {/* 9. Final CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={sectionVariants}
            >
              <CTA siteConfig={displaySiteConfig} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corporate Foot footer */}
      <Footer onToggleAdmin={() => setIsAdminMode(!isAdminMode)} isAdminMode={isAdminMode} siteConfig={displaySiteConfig} />

      {/* WhatsApp Interactive Floating Widget */}
      {!isAdminMode && <WhatsAppWidget siteConfig={displaySiteConfig} />}

      {/* Floating Scroll to Top button */}
      {!isAdminMode && <ScrollToTop />}

      {/* Global Success Feedback System */}
      {successFeedback && (
        <>
          <SuccessModal
            isOpen={successFeedback.isOpen}
            onClose={() => setSuccessFeedback(prev => prev ? { ...prev, isOpen: false } : null)}
            type={successFeedback.type}
            name={successFeedback.name}
          />
          <SuccessToast
            isVisible={!successFeedback.isOpen}
            onClose={() => setSuccessFeedback(null)}
            type={successFeedback.type}
            name={successFeedback.name}
          />
        </>
      )}
    </div>
  );
}

