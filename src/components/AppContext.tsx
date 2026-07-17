import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, TopBarSettings, HeaderSettings, HeroSettings, StatisticItem, ClientLogo, ServiceItem, WhyChooseUsItem, PortfolioCategory, PortfolioProject, WorkProcessStep, PackageItem, TestimonialItem, FAQItem } from '../types';

interface AppContextProps {
  settings: SiteSettings | null;
  topbar: TopBarSettings | null;
  header: HeaderSettings | null;
  hero: HeroSettings | null;
  statistics: StatisticItem[];
  clientLogos: ClientLogo[];
  services: ServiceItem[];
  whyChooseUs: WhyChooseUsItem[];
  portfolioCategories: PortfolioCategory[];
  portfolioProjects: PortfolioProject[];
  workProcess: WorkProcessStep[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  adminSession: { authenticated: boolean; email?: string; username?: string } | null;
  setAdminSession: React.Dispatch<React.SetStateAction<{ authenticated: boolean; email?: string; username?: string } | null>>;
  loading: boolean;
  refreshData: () => Promise<void>;
  checkAdminSession: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [topbar, setTopbar] = useState<TopBarSettings | null>(null);
  const [header, setHeader] = useState<HeaderSettings | null>(null);
  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [statistics, setStatistics] = useState<StatisticItem[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>([]);
  const [portfolioCategories, setPortfolioCategories] = useState<PortfolioCategory[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [workProcess, setWorkProcess] = useState<WorkProcessStep[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [adminSession, setAdminSession] = useState<{ authenticated: boolean; email?: string; username?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      const [
        settingsRes,
        heroRes,
        statsRes,
        logosRes,
        servicesRes,
        whyRes,
        categoriesRes,
        portfolioRes,
        processRes,
        packagesRes,
        testimonialsRes,
        faqsRes
      ] = await Promise.all([
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/hero').then(r => r.json()),
        fetch('/api/statistics').then(r => r.json()),
        fetch('/api/client-logos').then(r => r.json()),
        fetch('/api/services').then(r => r.json()),
        fetch('/api/why-choose-us').then(r => r.json()),
        fetch('/api/portfolio-categories').then(r => r.json()),
        fetch('/api/portfolio').then(r => r.json()),
        fetch('/api/work-process').then(r => r.json()),
        fetch('/api/packages').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/faqs').then(r => r.json())
      ]);

      if (settingsRes) {
        setSettings(settingsRes.settings);
        setTopbar(settingsRes.topbar);
        setHeader(settingsRes.header);
      }
      setHero(heroRes);
      setStatistics(statsRes || []);
      setClientLogos(logosRes || []);
      setServices(servicesRes || []);
      setWhyChooseUs(whyRes || []);
      setPortfolioCategories(categoriesRes || []);
      setPortfolioProjects(portfolioRes || []);
      setWorkProcess(processRes || []);
      setPackages(packagesRes || []);
      setTestimonials(testimonialsRes || []);
      setFaqs(faqsRes || []);
    } catch (e) {
      console.error('Error loading global site content:', e);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data && data.authenticated) {
        setAdminSession({ authenticated: true, email: data.email, username: data.username });
      } else {
        setAdminSession(null);
      }
    } catch (e) {
      setAdminSession(null);
    }
  };

  useEffect(() => {
    fetchAllData();
    checkAdminSession();
  }, []);

  const refreshData = async () => {
    await fetchAllData();
  };

  return (
    <AppContext.Provider value={{
      settings,
      topbar,
      header,
      hero,
      statistics,
      clientLogos,
      services,
      whyChooseUs,
      portfolioCategories,
      portfolioProjects,
      workProcess,
      packages,
      testimonials,
      faqs,
      adminSession,
      setAdminSession,
      loading,
      refreshData,
      checkAdminSession
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
