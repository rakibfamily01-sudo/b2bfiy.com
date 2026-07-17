export interface SiteSettings {
  name: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export interface TopBarSettings {
  enabled: boolean;
  phone: string;
  email: string;
}

export interface HeaderSettings {
  logo: string;
  ctaText: string;
  ctaUrl: string;
  sticky: boolean;
}

export interface HeroSettings {
  badge: string;
  heading: string;
  highlightedText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  trustText: string;
  heroImage: string;
  visible: boolean;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  published: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  published: boolean;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  category: string; // matches Category slug/name
  serviceType: string;
  featuredImage: string;
  galleryImages: string[];
  videoUrl: string;
  liveWebsiteUrl: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  process: string[];
  results: string;
  tools: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: 'draft' | 'published';
}

export interface WorkProcessStep {
  id: string;
  step: string; // e.g. "01"
  title: string;
  description: string;
  visible: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  period: string; // e.g. "/ month" or "one-time"
  features: string[];
  ctaText: string;
  ctaUrl: string;
  isPopular: boolean;
  type: 'monthly' | 'website' | 'graphic' | 'video';
  deliveryTime?: string;
  startingPrice?: boolean;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  companyName: string;
  review: string;
  rating: number;
  clientImage: string;
  published: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AuditRequest {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  url: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'meeting' | 'client' | 'closed';
  notes: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  notes: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  topbar: TopBarSettings;
  header: HeaderSettings;
  hero: HeroSettings;
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
  auditRequests: AuditRequest[];
  contactMessages: ContactMessage[];
  media: MediaItem[];
}
