import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, TopBarSettings, HeaderSettings, HeroSettings, StatisticItem, ClientLogo, ServiceItem, WhyChooseUsItem, PortfolioCategory, PortfolioProject, WorkProcessStep, PackageItem, TestimonialItem, FAQItem } from '../types';
import fallbackData from '../../data.json';

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

const safeFetchJson = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      return null;
    }
    const text = await res.text();
    if (text.trim().startsWith('<')) return null; // It's HTML, not JSON
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(fallbackData.settings as any);
  const [topbar, setTopbar] = useState<TopBarSettings | null>(fallbackData.topbar as any);
  const [header, setHeader] = useState<HeaderSettings | null>(fallbackData.header as any);
  const [hero, setHero] = useState<HeroSettings | null>(fallbackData.hero as any);
  const [statistics, setStatistics] = useState<StatisticItem[]>(fallbackData.statistics as any || []);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(fallbackData.clientLogos as any || []);
  const [services, setServices] = useState<ServiceItem[]>(fallbackData.services as any || []);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>(fallbackData.whyChooseUs as any || []);
  const [portfolioCategories, setPortfolioCategories] = useState<PortfolioCategory[]>(fallbackData.portfolioCategories as any || []);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(fallbackData.portfolioProjects as any || []);
  const [workProcess, setWorkProcess] = useState<WorkProcessStep[]>(fallbackData.workProcess as any || []);
  const [packages, setPackages] = useState<PackageItem[]>(fallbackData.packages as any || []);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackData.testimonials as any || []);
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackData.faqs as any || []);
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
        safeFetchJson('/api/settings'),
        safeFetchJson('/api/hero'),
        safeFetchJson('/api/statistics'),
        safeFetchJson('/api/client-logos'),
        safeFetchJson('/api/services'),
        safeFetchJson('/api/why-choose-us'),
        safeFetchJson('/api/portfolio-categories'),
        safeFetchJson('/api/portfolio'),
        safeFetchJson('/api/work-process'),
        safeFetchJson('/api/packages'),
        safeFetchJson('/api/testimonials'),
        safeFetchJson('/api/faqs')
      ]);

      if (settingsRes) {
        setSettings(settingsRes.settings);
        setTopbar(settingsRes.topbar);
        setHeader(settingsRes.header);
      }
      if (heroRes) setHero(heroRes);
      if (statsRes) setStatistics(statsRes);
      if (logosRes) setClientLogos(logosRes);
      if (servicesRes) setServices(servicesRes);
      if (whyRes) setWhyChooseUs(whyRes);
      if (categoriesRes) setPortfolioCategories(categoriesRes);
      if (portfolioRes) setPortfolioProjects(portfolioRes);
      if (processRes) setWorkProcess(processRes);
      if (packagesRes) setPackages(packagesRes);
      if (testimonialsRes) setTestimonials(testimonialsRes);
      if (faqsRes) setFaqs(faqsRes);
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
