export interface Lead {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  websiteOrPage: string;
  serviceNeeded: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'In Progress' | 'Completed';
  createdAt: string;
  adminNotes?: string;
  source: 'Contact Form' | 'Free Audit' | 'Consultation';
  auditDetails?: {
    score?: number;
    issues?: string[];
    recommendations?: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Website Development' | 'Graphic Design' | 'Video Editing' | 'Facebook Management';
  image: string;
  description: string;
  technologies: string[];
  clientName: string;
  videoLink?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  billing: string;
  features: string[];
  isPopular?: boolean;
  category: 'Website Development' | 'Graphic Design' | 'Video Editing' | 'Facebook Management';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  bullets: string[];
}

export interface WhyChooseUsReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  _index?: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  businessName: string;
  logoUrl: string;
  feedback: string;
  rating: number;
}

export interface TestimonialsSection {
  badge: string;
  heading: string;
  description: string;
  items: TestimonialItem[];
}

export interface FrictionPoint {
  id: string;
  title: string;
  description: string;
}

export interface CurePoint {
  id: string;
  text: string;
}

export interface FrictionAndCureSection {
  badgeFriction: string;
  titleFriction: string;
  descriptionFriction: string;
  frictionPoints: FrictionPoint[];
  
  badgeCure: string;
  titleCure: string;
  descriptionCure: string;
  curePoints: CurePoint[];
  ctaText: string;
}

export interface SiteConfig {
  adminCredentials: {
    username: string;
    passwordHash: string;
  };
  branding: {
    logoText: string;
    logoHighlightText: string;
    logoSubText: string;
    faviconUrl: string;
    logoImageUrl?: string;
    appUrl: string;
    appTitle: string;
  };
  hero: {
    badgeText: string;
    heading: string;
    highlight: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    stats: {
      projectsCount: string;
      projectsLabel: string;
      clientsCount: string;
      clientsLabel: string;
      deliveryRate: string;
      deliveryLabel: string;
      supportHours: string;
      supportLabel: string;
    };
  };
  frictionAndCure: FrictionAndCureSection;
  whyChooseUs: {
    badge: string;
    heading: string;
    description: string;
    reasons: WhyChooseUsReason[];
  };
  services: {
    badge: string;
    heading: string;
    list: ServiceItem[];
  };
  portfolio: {
    badge: string;
    heading: string;
    description: string;
    items: PortfolioItem[];
  };
  packages: {
    badge: string;
    heading: string;
    description: string;
    items: ServicePackage[];
  };
  testimonials: TestimonialsSection;
  footer: {
    aboutText: string;
    facebookUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    helpline: string;
    email: string;
    copyrightText: string;
  };
  faqs: FAQItem[];
}
