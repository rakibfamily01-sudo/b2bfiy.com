import { SiteConfig } from './types';

export const uiTranslations: Record<string, Record<'en' | 'bn', string>> = {
  // Navigation / Headers
  nav_home: { en: 'Home', bn: 'হোম' },
  nav_services: { en: 'Services', bn: 'সার্ভিসসমূহ' },
  nav_why_us: { en: 'Why Us', bn: 'কেন আমরা' },
  nav_portfolio: { en: 'Portfolio', bn: 'কাজসমূহ' },
  nav_packages: { en: 'Packages', bn: 'প্যাকেজ' },
  nav_free_audit: { en: 'Free Audit', bn: 'ফ্রি অডিট' },
  nav_contact: { en: 'Contact', bn: 'যোগাযোগ' },
  nav_faq: { en: 'FAQ', bn: 'FAQ' },
  nav_admin_panel: { en: 'Admin Panel', bn: 'অ্যাডমিন প্যানেল' },
  nav_landing_page: { en: 'Landing Page', bn: 'ল্যান্ডিং পেজ' },
  nav_get_free_audit: { en: 'Free Audit', bn: 'ফ্রি অডিট নিন' },

  // General UI labels / actions
  btn_learn_more: { en: 'Learn More', bn: 'বিস্তারিত জানুন' },
  btn_contact_us: { en: 'Contact Us', bn: 'যোগাযোগ করুন' },
  btn_get_started: { en: 'Get Started', bn: 'শুরু করুন' },
  btn_submit: { en: 'Submit Now', bn: 'সাবমিট করুন' },
  btn_submitting: { en: 'Submitting...', bn: 'সাবমিট হচ্ছে...' },
  popular_badge: { en: 'Popular Choice', bn: 'সবচেয়ে জনপ্রিয়' },
  select_plan: { en: 'Choose This Plan', bn: 'প্যাকেজটি সিলেক্ট করুন' },
  all_categories: { en: 'All Categories', bn: 'সব কাজ' },

  // Free Audit Widget
  audit_title: { en: 'Get a Free Digital Audit for Your Business', bn: 'আপনার ব্যবসার জন্য একটি ফ্রি ডিজিটাল অডিট নিন' },
  audit_subtitle: { en: 'Find out why your competitors are getting more clients online and discover key areas of improvement for your website or page.', bn: 'অনলাইনে কেন আপনার প্রতিযোগীরা বেশি কাস্টমার পাচ্ছে এবং আপনার ওয়েবসাইট বা ফেসবুক পেজের প্রধান দুর্বলতাগুলো কী কী তা বের করুন।' },
  audit_placeholder_name: { en: 'Your Name', bn: 'আপনার নাম' },
  audit_placeholder_business: { en: 'Business / Brand Name', bn: 'ব্যবসা বা ব্র্যান্ডের নাম' },
  audit_placeholder_phone: { en: 'Mobile Number (WhatsApp)', bn: 'মোবাইল নম্বর (হোয়াটসঅ্যাপ)' },
  audit_placeholder_email: { en: 'Email Address (Optional)', bn: 'ইমেইল অ্যাড্রেস (ঐচ্ছিক)' },
  audit_placeholder_url: { en: 'Website Link or Facebook Page Link', bn: 'ওয়েবসাইট লিংক অথবা ফেসবুক পেজ লিংক' },
  audit_select_service: { en: 'Which service do you need?', bn: 'আপনার কোন সার্ভিসটি প্রয়োজন?' },
  audit_placeholder_msg: { en: 'Tell us briefly about your business goals...', bn: 'আপনার ব্যবসার লক্ষ্য সম্পর্কে সংক্ষেপে কিছু বলুন...' },
  audit_btn_run: { en: 'Analyze My Business (Free Audit) ➔', bn: 'অডিট শুরু করুন (সম্পূর্ণ ফ্রি) ➔' },
  audit_analyzing: { en: 'Analyzing Your Digital Presence...', bn: 'আপনার ডিজিটাল উপস্থিতি বিশ্লেষণ করা হচ্ছে...' },
  audit_scanning: { en: 'Scanning page responsiveness and speed...', bn: 'পেজ রেসপন্সিভনেস এবং স্পিড স্ক্যান করা হচ্ছে...' },
  audit_evaluating: { en: 'Evaluating SEO configuration and conversion design...', bn: 'এসইও কনফিগারেশন এবং কনভার্সন ডিজাইন মূল্যায়ন করা হচ্ছে...' },
  audit_generating: { en: 'Generating custom recommendations...', bn: 'কাস্টম রিকমেন্ডেশন তৈরি করা হচ্ছে...' },
  audit_result_title: { en: 'Your Digital Audit Report', bn: 'আপনার ডিজিটাল অডিট রিপোর্ট' },
  audit_score: { en: 'Digital Score', bn: 'ডিজিটাল স্কোর' },
  audit_issues_found: { en: 'Key Weaknesses Found:', bn: 'প্রধান দুর্বলতাগুলো:' },
  audit_recommendations: { en: 'Our Action Plan & Recommendation:', bn: 'আমাদের অ্যাকশন প্ল্যান ও পরামর্শ:' },
  audit_cta_contact: { en: 'Discuss Solution on WhatsApp ➔', bn: 'হোয়াটসঅ্যাপে সমাধান আলোচনা করুন ➔' },

  // Contact Form Section
  contact_section_title: { en: 'Grow Your Business Today', bn: 'আজই আপনার ব্যবসার প্রবৃদ্ধি শুরু করুন' },
  contact_section_subtitle: { en: 'Contact us for a free expert discussion. Fill out the form below or chat directly on WhatsApp.', bn: 'যেকোনো পরামর্শ বা সার্ভিসের জন্য আমাদের সাথে যোগাযোগ করুন। নিচের ফরমটি পূরণ করুন অথবা সরাসরি হোয়াটসঅ্যাপে কথা বলুন।' },
  contact_success_title: { en: 'Thank You! Message Received Successfully', bn: 'ধন্যবাদ! আপনার মেসেজটি সফলভাবে গৃহীত হয়েছে' },
  contact_success_desc: { en: 'Our team will contact you on WhatsApp or phone within the next 2-4 hours to discuss details.', bn: 'আমাদের টিম আগামী ২-৪ ঘণ্টার মধ্যে আপনার দেওয়া হোয়াটসঅ্যাপ নম্বর অথবা ফোনে সরাসরি যোগাযোগ করবে।' },
  contact_info_title: { en: 'Contact Information', bn: 'যোগাযোগের তথ্যসমূহ' },
  contact_info_desc: { en: 'We are always ready to assist you in making your business online-friendly and profitable.', bn: 'আপনার ব্যবসাকে অনলাইন-বান্ধব এবং লাভজনক করতে আমরা সবসময় প্রস্তুত।' },
  contact_support_hours: { en: 'Support Hours: 24/7', bn: 'সাপোর্ট সময়: ২৪/৭ (সবসময়)' },

  // WhatsApp Button Callout
  whatsapp_chat_support: { en: 'B2bfiy Support', bn: 'B2bfiy সাপোর্ট' },
  whatsapp_online: { en: 'Online (Ready to help)', bn: 'অনলাইন (সহায়তার জন্য প্রস্তুত)' },
  whatsapp_welcome: { en: 'Assalamu Alaikum! Welcome to B2bfiy. Please send us a message on WhatsApp for custom solutions or free consultation.', bn: 'আসসালামু আলাইকুম! B2bfiy এ আপনাকে স্বাগতম। আপনার ব্যবসা বাড়াতে আমাদের সার্ভিস সম্পর্কে জানতে অথবা ফ্রি কনসালটেশন পেতে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।' },
  whatsapp_reply_time: { en: 'Reply time: Instant', bn: 'উত্তর দেওয়ার সময়: তাৎক্ষণিক' },
  whatsapp_send_msg: { en: 'Send message on WhatsApp', bn: 'হোয়াটসঅ্যাপে মেসেজ পাঠান' },
  whatsapp_tooltip: { en: 'Need help? Contact us on WhatsApp!', bn: 'যেকোনো প্রয়োজনে আমাদের হোয়াটসঅ্যাপে নক দিন!' },
};

export const englishSiteConfig: Partial<SiteConfig> = {
  hero: {
    badgeText: '🚀 Your Business Digital Partner',
    heading: 'Make Your Business Stronger & Credible Online',
    highlight: 'Digital Presence',
    description: 'B2bfiy provides Professional Website Development, Graphic Design, Video Editing, and Facebook Page Management services to reach more customers and supercharge your business sales.',
    primaryCtaText: '👉 Get Free Consultation',
    secondaryCtaText: '📂 View Our Works',
    stats: {
      projectsCount: '250+',
      projectsLabel: 'Successful Projects',
      clientsCount: '120+',
      clientsLabel: 'Satisfied Clients',
      deliveryRate: '99%',
      deliveryLabel: 'On-Time Delivery',
      supportHours: '24/7',
      supportLabel: 'Dedicated Support',
    },
  },
  frictionAndCure: {
    badgeFriction: 'Digital Constraints',
    titleFriction: 'Is Your Business Lacking a Unique Brand Identity Online?',
    descriptionFriction: 'Running a business is already challenging enough, and managing social media, graphic designing, search optimization, and video production adds overwhelming pressure. The primary issues with your business digital presence are:',
    frictionPoints: [
      {
        id: 'fp1',
        title: 'Outdated & Slow Website',
        description: 'Not mobile-friendly, lacks modern booking features or high-converting client funnels.'
      },
      {
        id: 'fp2',
        title: 'Irregular Social Media Posting',
        description: 'Lack of consistent, strategically planned posts fails to grab and retain consumer attention.'
      },
      {
        id: 'fp3',
        title: 'Unprofessional Graphics & Branding',
        description: 'Using generic, low-quality templates degrades your overall premium brand value.'
      },
      {
        id: 'fp4',
        title: 'Low Views & Engagement in Videos',
        description: 'Lacking modern trending transitions and professional video edits fails to pull prospective buyers.'
      }
    ],
    badgeCure: 'B2BFIY Solution',
    titleCure: 'You Focus on Your Business. We Will Manage Your Complete Digital Presence.',
    descriptionCure: 'B2bfiy works as your own in-house creative, tech, and marketing team. We hook up skilled designers, dedicated web developers, and professional video editors directly to drive your brand’s success.',
    curePoints: [
      {
        id: 'cp1',
        text: '100% Unique and Premium Custom Layouts'
      },
      {
        id: 'cp2',
        text: 'Super-Fast and Modern Feature-Rich Websites'
      },
      {
        id: 'cp3',
        text: 'Planned Content Strategy & Monthly Editorial Calendar'
      },
      {
        id: 'cp4',
        text: 'Zero Hassles of Managing Multiple Unreliable Freelancers'
      }
    ],
    ctaText: 'Let\'s Scale Your Business ➔'
  },
  whyChooseUs: {
    badge: 'Our Key Assets',
    heading: 'Why Partner with B2bfiy?',
    description: 'We don\'t just execute tasks; we forge deep trust-filled partnerships that guarantee tangible growth for your business.',
    reasons: [
      {
        id: 'r1',
        title: 'Skilled Team',
        description: 'Our team comprises experts in UI design, coding, and strategic marketing dedicated entirely to your business victory.',
        iconName: 'Users2',
      },
      {
        id: 'r2',
        title: 'On-Time Project Delivery',
        description: 'We value time. Every project undergoes tight planning to ensure it gets delivered precisely within agreed timelines.',
        iconName: 'Clock',
      },
      {
        id: 'r3',
        title: 'Avant-Garde Designs',
        description: 'We employ high-end, contemporary, and trending design aesthetics that attract your clients at very first glance.',
        iconName: 'Palette',
      },
      {
        id: 'r4',
        title: 'Value-Rich Pricing',
        description: 'Catering to businesses of all sizes, we provide top-tier premium services at extremely flexible and affordable rates.',
        iconName: 'BadgePercent',
      },
      {
        id: 'r5',
        title: '24/7 Priority Support',
        description: 'Our customer success squad is always on standby for post-delivery troubleshooting, guidance, or updates.',
        iconName: 'HeartHandshake',
      },
      {
        id: 'r6',
        title: 'Bespoke Custom Solutions',
        description: 'No template slop. We thoroughly dissect your industry needs to formulate fully custom digital solutions.',
        iconName: 'Settings',
      },
    ],
  },
  services: {
    badge: 'Our Services',
    heading: 'We Provide End-to-End Digital Solutions for Your Business',
    list: [
      {
        id: 'web',
        title: 'Website Development',
        description: 'We craft professional, highly responsive websites that boost your brand authority and acquire prospective leads automatically.',
        iconName: 'Layout',
        color: 'from-blue-500 to-indigo-600',
        bullets: [
          'Business Websites',
          'E-commerce Solutions',
          'High-converting Landing Pages',
          'Custom Web Applications',
        ],
      },
      {
        id: 'design',
        title: 'Graphic Design',
        description: 'Elevate your visual identity with custom high-end graphic design that leaves a lasting impression.',
        iconName: 'Palette',
        color: 'from-pink-500 to-rose-600',
        bullets: [
          'Social Media Creatives',
          'Logo & Visual Identity',
          'Marketing Banners',
          'Complete Brand Packages',
        ],
      },
      {
        id: 'video',
        title: 'Video Editing',
        description: 'Polish your video content to be highly engaging, premium, and optimized for maximum organic reach and virality.',
        iconName: 'Video',
        color: 'from-purple-500 to-violet-600',
        bullets: [
          'Facebook/YouTube Videos',
          'Reels & TikToks',
          'Short Promo Clips',
          'Corporate Presentations',
        ],
      },
      {
        id: 'facebook',
        title: 'Facebook Management',
        description: 'Fully handle your Facebook pages with premium planning, professional visual design, and data-backed captions.',
        iconName: 'Share2',
        color: 'from-cyan-500 to-blue-600',
        bullets: [
          'Strategic Content Planning',
          'Creative Post Designing',
          'Copywriting & Captioning',
          'SEO Hashtag Research',
          'Monthly Growth Reports',
        ],
      },
    ],
  },
  portfolio: {
    badge: 'Our Portfolio',
    heading: 'Our Recent Successful Works',
    description: 'Explore our latest deliverables in Website Development, Graphic Design, Video Editing, and Facebook Management.',
    items: [
      {
        id: 'p1',
        title: 'Daruchini Express - Premium Restaurant Website',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        description: 'A fully responsive dining portal integrated with online ordering and instant table reservation features for Dhanmondi restaurant.',
        technologies: ['React', 'Tailwind CSS', 'Node.js'],
        clientName: 'Daruchini Express, Dhanmondi',
        videoLink: '',
      },
      {
        id: 'p2',
        title: 'Shoukhin Clothing - Modern E-commerce Platform',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        description: 'A highly functional, fast-loading, and mobile-optimized e-commerce storefront for a prominent boutique fashion brand.',
        technologies: ['Next.js', 'PostgreSQL', 'Tailwind'],
        clientName: 'Shoukhin Clothing',
        videoLink: '',
      },
      {
        id: 'p3',
        title: 'Cheese & Crust - Creative Social Media Campaign',
        category: 'Graphic Design',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
        description: 'Custom culinary post creatives, banners, and digital flyers curated to increase direct orders on social channels.',
        technologies: ['Photoshop', 'Illustrator'],
        clientName: 'Cheese & Crust Pizza',
        videoLink: '',
      },
      {
        id: 'p4',
        title: 'IT Scholars BD - Facebook Management Campaign',
        category: 'Facebook Management',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        description: 'Successful social marketing campaign including weekly content planning, page optimization, and daily targeted user engagement.',
        technologies: ['Meta Ads Manager', 'Canva'],
        clientName: 'IT Scholars BD',
        videoLink: '',
      },
      {
        id: 'p5',
        title: 'Global Visa Consultancy - Motion Promo Video',
        category: 'Video Editing',
        image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=800',
        description: 'An informative 2-minute promotional clip featuring premium motion templates, custom assets, and high-fidelity narration.',
        technologies: ['Premiere Pro', 'After Effects'],
        clientName: 'Global Visa & Immigration Services',
        videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        id: 'p6',
        title: 'Uttara Dental Care - High-Converting Lead Landing Page',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
        description: 'Single-page appointment lead-gen portal for healthcare clinic integrated with Google Sheets/SMS triggers.',
        technologies: ['React', 'Framer Motion'],
        clientName: 'Uttara Dental Care',
        videoLink: '',
      }
    ],
  },
  packages: {
    badge: 'Flexible Subscriptions',
    heading: 'Choose the Right Growth Strategy for Your Business',
    description: 'We offer highly cost-effective monthly pricing options to consistently build your customer pipelines and brand assets.',
    items: [
      {
        id: 'pkg1',
        name: 'Startup Landing Page',
        price: '৳12,500',
        billing: 'One-Time Payment',
        features: [
          '1 Premium Custom Landing Page',
          'Fully Responsive Layout (Mobile/Tablet)',
          'Lead Generation Form Integration',
          'Free Domain & Cloud Hosting (1 Year)',
          'Easy admin control dashboard',
          '10 Days Free Technical Support'
        ],
        category: 'Website Development'
      },
      {
        id: 'pkg2',
        name: 'Full-Functional Business Portal',
        price: '৳24,500',
        billing: 'One-Time Payment',
        features: [
          '5 Core Custom Pages (Home, About, Services, etc)',
          'Ultra-fast page speed & SEO optimizations',
          'Appointment Booking Engine Integration',
          'Live Chat & WhatsApp Integration',
          'Free SSL Security Certificate',
          '1-Month Dedicated Post-Delivery Support'
        ],
        isPopular: true,
        category: 'Website Development'
      },
      {
        id: 'pkg3',
        name: 'Social Media Starter Kit',
        price: '৳4,999',
        billing: 'Monthly Retainer',
        features: [
          '10 High-Quality Custom Facebook Posts',
          '1 Custom Brand Banner / Cover Art',
          'Commercial-licensed Stock Imagery',
          'Brand Colors & Styling Compliant',
          '2 Revision Iterations Included'
        ],
        category: 'Graphic Design'
      },
      {
        id: 'pkg4',
        name: 'Ultimate Reels / TikTok Pro',
        price: '৳9,999',
        billing: 'Monthly Retainer',
        features: [
          '12 Reels / Shorts Edited (Trending formats)',
          'Voiceover enhancement and sound engineering',
          'Premium cinematic transitions & dynamic subtitles',
          'Trending audio overlay research',
          'Title thumbnail art design'
        ],
        category: 'Video Editing'
      },
      {
        id: 'pkg5',
        name: 'Facebook Page Premium retainer',
        price: '৳১৪,৯৯৯',
        billing: 'Monthly Retainer',
        features: [
          '16 Tailored Posts per Month',
          'Professional caption writing & hashtag clusters',
          '3 Video Reels / Shorts included',
          'Dedicated account executive',
          'Monthly analytics performance report'
        ],
        category: 'Facebook Management'
      }
    ],
  },
  testimonials: {
    badge: 'Client Success Stories',
    heading: 'What Our Clients Say About B2bfiy',
    description: 'Read the feedback of local brands we scaled into professional high-converting online entities.',
    items: [],
  },
  faqs: [
    {
      question: 'Will B2bfiy provide free domains and hosting?',
      answer: 'Yes, with our Website Development packages, we bundle a free domain (.com/.xyz depending on package) and super-fast cloud hosting free of charge for the first year.'
    },
    {
      question: 'How long does a website project usually take?',
      answer: 'A high-converting single-page landing site is generally delivered within 3-5 working days. A full-scale 5-page corporate website takes approximately 7-12 working days.'
    },
    {
      question: 'Can I request design revisions during the retainer month?',
      answer: 'Absolutely. Depending on your chosen monthly retainer tier, you get specified feedback loops. We make sure everything perfectly fits your precise brand guidelines.'
    },
    {
      question: 'Is WhatsApp support available?',
      answer: 'Yes, we assign a dedicated account manager reachable on WhatsApp and phone for all our monthly retainer and custom corporate partners.'
    }
  ],
  footer: {
    aboutText: 'We help local small and medium businesses expand online via Website Development, Graphic Design, Video Editing, and Facebook Management services.',
    copyrightText: 'All rights reserved. Designed for premium Bangladeshi agencies.',
    helpline: '+880 1700-000000',
    email: 'info@b2bfiy.com',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com'
  }
};

/**
 * Returns either the default English node or the dynamic Bangla node based on language selection.
 * Fallback values are handled cleanly if the config differs from the default data.ts.
 */
export function getTranslatedConfig(siteConfig: SiteConfig, lang: 'en' | 'bn'): SiteConfig {
  if (lang === 'bn') return siteConfig;

  // Build localized version based on English siteConfig defaults,
  // but preserving any customizations made by the admin in AdminPanel
  return {
    ...siteConfig,
    branding: {
      ...siteConfig.branding,
      // Keep custom values if they've changed, otherwise use the standard Branding structure in English if applicable
    },
    hero: {
      ...siteConfig.hero,
      badgeText: siteConfig.hero.badgeText === '🚀 আপনার ব্যবসার ডিজিটাল পার্টনার' ? (englishSiteConfig.hero?.badgeText || '') : siteConfig.hero.badgeText,
      heading: siteConfig.hero.heading === 'আপনার ব্যবসাকে অনলাইনে আরও শক্তিশালী ও বিশ্বাসযোগ্য করে তুলুন' ? (englishSiteConfig.hero?.heading || '') : siteConfig.hero.heading,
      highlight: siteConfig.hero.highlight === 'ডিজিটাল উপস্থিতি' ? (englishSiteConfig.hero?.highlight || '') : siteConfig.hero.highlight,
      description: siteConfig.hero.description.includes('B2bfiy আপনার ব্যবসার জন্য Professional Website') ? (englishSiteConfig.hero?.description || '') : siteConfig.hero.description,
      primaryCtaText: siteConfig.hero.primaryCtaText === '👉 ফ্রি কনসালটেশন নিন' ? (englishSiteConfig.hero?.primaryCtaText || '') : siteConfig.hero.primaryCtaText,
      secondaryCtaText: siteConfig.hero.secondaryCtaText === '📂 আমাদের কাজ দেখুন' ? (englishSiteConfig.hero?.secondaryCtaText || '') : siteConfig.hero.secondaryCtaText,
      stats: {
        projectsCount: siteConfig.hero.stats.projectsCount,
        projectsLabel: siteConfig.hero.stats.projectsLabel === 'সফল প্রজেক্ট' ? 'Successful Projects' : siteConfig.hero.stats.projectsLabel,
        clientsCount: siteConfig.hero.stats.clientsCount,
        clientsLabel: siteConfig.hero.stats.clientsLabel === 'সন্তুষ্ট দেশীয় ক্লায়েন্ট' ? 'Happy Local Clients' : siteConfig.hero.stats.clientsLabel,
        deliveryRate: siteConfig.hero.stats.deliveryRate,
        deliveryLabel: siteConfig.hero.stats.deliveryLabel === 'সময়মতো ডেলিভারি' ? 'On-Time Delivery' : siteConfig.hero.stats.deliveryLabel,
        supportHours: siteConfig.hero.stats.supportHours,
        supportLabel: siteConfig.hero.stats.supportLabel === 'ডেডিকেটেড সাপোর্ট' ? 'Dedicated Support' : siteConfig.hero.stats.supportLabel,
      }
    },
    frictionAndCure: {
      ...siteConfig.frictionAndCure,
      badgeFriction: siteConfig.frictionAndCure.badgeFriction === 'ডিজিটাল সীমাবদ্ধতা' ? 'Digital Painpoints' : siteConfig.frictionAndCure.badgeFriction,
      titleFriction: siteConfig.frictionAndCure.titleFriction === 'আপনার ব্যবসা কি অনলাইনে আলাদাভাবে পরিচিত হতে পারছে না?' ? 'Is Your Business Lacking Dynamic Brand Power Online?' : siteConfig.frictionAndCure.titleFriction,
      descriptionFriction: siteConfig.frictionAndCure.descriptionFriction.includes('আজকের যুগে একটি ব্যবসা সফলভাবে') ? 'Managing visual design, social campaigns, custom coding, and audio elements is incredibly demanding. The core painpoints with your present online approach are:' : siteConfig.frictionAndCure.descriptionFriction,
      frictionPoints: siteConfig.frictionAndCure.frictionPoints.map((pt, idx) => {
        const engPt = englishSiteConfig.frictionAndCure?.frictionPoints?.[idx];
        if (engPt && pt.id === engPt.id) {
          return {
            ...pt,
            title: pt.title === 'পুরানো এবং ধীরগতির ওয়েবসাইট' || pt.title === 'অনিয়মিত সোশ্যাল মিডিয়া পোস্ট' || pt.title === 'অপেশাদার গ্রাফিক্স ও ব্যানার' || pt.title === 'কম ভিউ এবং এঙ্গেজমেন্টের ভিডিও' ? engPt.title : pt.title,
            description: pt.description === 'মোবাইলে রেসপন্সিভ না হওয়া বা আধুনিক বুকিং ও কাস্টমার ফানেল না থাকা।' || pt.description === 'সোশ্যাল পেজগুলোতে কোনো নিয়মিত অ্যাক্টিভিটি বা প্ল্যানিং না থাকা যা ক্রেতাদের আকর্ষণ করতে পারে না।' || pt.description === 'সাধারণ এবং নিম্নমানের টেমপ্লেট ব্যবহার করা যা আপনার ব্র্যান্ড ভ্যালু নষ্ট করে।' || pt.description === 'ট্রেন্ডিং ট্রানজিশন বা পেশাদার সম্পাদনার অভাব, যা নতুন ক্রেতা টানতে ব্যর্থ হয়।' ? engPt.description : pt.description
          };
        }
        return pt;
      }),
      badgeCure: siteConfig.frictionAndCure.badgeCure === 'B2BFIY সমাধান' ? 'B2BFIY Solution' : siteConfig.frictionAndCure.badgeCure,
      titleCure: siteConfig.frictionAndCure.titleCure === 'আপনি আপনার ব্যবসা সামলান। আমরা সামলাবো আপনার সম্পূর্ণ ডিজিটাল উপস্থিতি।' ? 'You Focus on Your Sales. We Scale Your Complete Online Strategy.' : siteConfig.frictionAndCure.titleCure,
      descriptionCure: siteConfig.frictionAndCure.descriptionCure.includes('B2bfiy আপনার নিজস্ব ক্রিয়েটিভ') ? 'B2bfiy acts as your comprehensive design, tech, and marketing crew, steering real growth directly to your brand without any of the freelancer stress.' : siteConfig.frictionAndCure.descriptionCure,
      curePoints: siteConfig.frictionAndCure.curePoints.map((pt, idx) => {
        const engCure = englishSiteConfig.frictionAndCure?.curePoints?.[idx];
        if (engCure && pt.id === engCure.id) {
          return {
            ...pt,
            text: pt.text === '১০০% ইউনিক এবং প্রিমিয়াম কাস্টম ডিজাইন' || pt.text === 'সুপার-ফাস্ট এবং আধুনিক সব ফিচারযুক্ত ওয়েবসাইট' || pt.text === 'পরিকল্পিত কন্টেন্ট স্ট্র্যাটেজি এবং মাসিক ক্যালেন্ডার' || pt.text === 'একাধিক ফ্রিল্যান্সার সামলানোর কোনো অতিরিক্ত ঝামেলা নেই' ? engCure.text : pt.text
          };
        }
        return pt;
      }),
      ctaText: siteConfig.frictionAndCure.ctaText === 'চলুন আপনার ব্যবসা বাড়াই ➔' ? 'Let\'s Boost Your Business ➔' : siteConfig.frictionAndCure.ctaText
    },
    whyChooseUs: {
      ...siteConfig.whyChooseUs,
      badge: siteConfig.whyChooseUs.badge === 'আমাদের বৈশিষ্ট্য' ? 'Why Choose Us' : siteConfig.whyChooseUs.badge,
      heading: siteConfig.whyChooseUs.heading === 'কেন B2bfiy বেছে নিবেন?' ? 'Why Partner with B2bfiy?' : siteConfig.whyChooseUs.heading,
      description: siteConfig.whyChooseUs.description.includes('আমরা শুধু কাজ করে দেই না') ? 'We don\'t just design or deliver; we construct highly profitable, trust-filled strategic partnerships.' : siteConfig.whyChooseUs.description,
      reasons: siteConfig.whyChooseUs.reasons.map((r, idx) => {
        const engR = englishSiteConfig.whyChooseUs?.reasons?.[idx];
        if (engR && r.id === engR.id) {
          return {
            ...r,
            title: r.title === 'অভিজ্ঞ টিম' || r.title === 'সময়মতো কাজ ডেলিভারি' || r.title === 'আধুনিক ডিজাইন' || r.title === 'যুক্তিসঙ্গত মূল্য' || r.title === '২৪/৭ সাপোর্ট' || r.title === 'কাস্টম সমাধান' ? engR.title : r.title,
            description: r.description.startsWith('আমাদের রয়েছে ডিজাইন') || r.description.startsWith('আমরা সময়ের মূল্য') || r.description.startsWith('আমরা ট্রেন্ডি') || r.description.startsWith('ছোট-বড় সব ধরণের') || r.description.startsWith('প্রজেক্ট ডেলিভারির পরেও') || r.description.startsWith('সাধারণ টেমপ্লেট নয়') ? engR.description : r.description
          };
        }
        return r;
      })
    },
    services: {
      ...siteConfig.services,
      badge: siteConfig.services.badge === 'আমাদের সার্ভিসসমূহ' ? 'Premium Services' : siteConfig.services.badge,
      heading: siteConfig.services.heading === 'আমরা আপনার ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সমাধান প্রদান করি' ? 'We Deliver Complete End-to-End Online Solutions' : siteConfig.services.heading,
      list: siteConfig.services.list.map((s, idx) => {
        const engS = englishSiteConfig.services?.list?.[idx];
        if (engS && s.id === engS.id) {
          return {
            ...s,
            title: s.title,
            description: s.description.includes('পেশাদার ও আধুনিক Website') || s.description.includes('আপনার ব্র্যান্ডকে আরও আকর্ষণীয়') || s.description.includes('আপনার ভিডিওকে আরও আকর্ষণীয়') || s.description.includes('আপনার Facebook Page সম্পূর্ণ') ? engS.description : s.description
          };
        }
        return s;
      })
    },
    portfolio: {
      ...siteConfig.portfolio,
      badge: siteConfig.portfolio.badge === 'পোর্টফোলিও' ? 'Our Work' : siteConfig.portfolio.badge,
      heading: siteConfig.portfolio.heading === 'আমাদের সাম্প্রতিক কাজ' ? 'Our Recent Projects' : siteConfig.portfolio.heading,
      description: siteConfig.portfolio.description.includes('আমাদের করা Website, Graphic') ? 'Browse our premium portfolios of web development, designs, animations, and social growth campaigns.' : siteConfig.portfolio.description,
      items: siteConfig.portfolio.items.map((it, idx) => {
        const engIt = englishSiteConfig.portfolio?.items?.[idx];
        if (engIt && it.id === engIt.id) {
          return {
            ...it,
            title: it.title.startsWith('দারুচিনি এক্সপ্রেস') || it.title.startsWith('শৌখিন ক্লোথিং') || it.title.startsWith('চিজ অ্যান্ড ক্রাস্ট') || it.title.startsWith('আইটি স্কলার্স') || it.title.startsWith('গ্লোবাল কনসালটেন্সি') || it.title.startsWith('উত্তরা ডেন্টাল কেয়ার') ? engIt.title : it.title,
            description: it.description.startsWith('ঢাকার একটি বিখ্যাত') || it.description.startsWith('ফাস্ট-লোডিং এবং') || it.description.startsWith('গ্রাহকদের আকর্ষণ করতে') || it.description.startsWith('সম্পূর্ণ অর্গানিক রিচ') || it.description.startsWith('ফেসবুক ও ইউটিউবের জন্য') || it.description.startsWith('রোগীদের সরাসরি অ্যাপয়েন্টমেন্ট') ? engIt.description : it.description
          };
        }
        return it;
      })
    },
    packages: {
      ...siteConfig.packages,
      badge: siteConfig.packages.badge === 'ফ্লেক্সিবল সাবস্ক্রিপশন' ? 'Flexible Subscriptions' : siteConfig.packages.badge,
      heading: siteConfig.packages.heading === 'আপনার ব্যবসার জন্য সঠিক মাসিক গ্রোথ প্ল্যান বেছে নিন' ? 'Choose the Perfect Growth Strategy for Your Business' : siteConfig.packages.heading,
      description: siteConfig.packages.description.includes('প্রতিদিন কাস্টমার এনগেজমেন্ট') ? 'Select a budget-friendly strategic pricing bundle that aligns precisely with your growth targets.' : siteConfig.packages.description,
      items: siteConfig.packages.items.map((pkg, idx) => {
        const engPkg = englishSiteConfig.packages?.items?.[idx];
        if (engPkg && pkg.id === engPkg.id) {
          return {
            ...pkg,
            name: pkg.name === 'স্টার্টআপ ল্যান্ডিং পেজ' || pkg.name === 'ফুল-ফাংশনাল বিজনেস ওয়েবসাইট' || pkg.name === 'সোশ্যাল মিডিয়া স্টার্টার কিট' || pkg.name === 'আল্টিমেট রিলস / টিকটক প্রো' || pkg.name === 'ফেসবুক পেজ প্রিমিয়াম রিটেইনার' ? engPkg.name : pkg.name,
            billing: pkg.billing === 'এককালীন পেমেন্ট' ? 'One-time Payment' : pkg.billing === 'প্রতি মাসে' ? 'Monthly' : engPkg.billing,
            features: pkg.features.map((feat, fIdx) => {
              const engFeat = engPkg.features?.[fIdx];
              if (engFeat && (feat.includes('পেজ') || feat.includes('সাপোর্ট') || feat.includes('পোস্ট') || feat.includes('ব্যানার') || feat.includes('SSL') || feat.includes('মোবাইল') || feat.includes('ডোমেইন') || feat.includes('সার্টিফিকেট') || feat.includes('cinematic') || feat.includes('caption') || feat.includes('reels') || feat.includes('রিভিশন'))) {
                return engFeat;
              }
              return feat;
            })
          };
        }
        return pkg;
      })
    },
    testimonials: {
      ...siteConfig.testimonials,
      badge: siteConfig.testimonials.badge === 'ক্লায়েন্ট রিভিউ' || siteConfig.testimonials.badge === 'সফলতার গল্প' ? 'Testimonials' : siteConfig.testimonials.badge,
      heading: siteConfig.testimonials.heading === 'আমাদের ক্লায়েন্টদের সফলতার গল্প' ? 'What Our Clients Say' : siteConfig.testimonials.heading,
      description: siteConfig.testimonials.description.includes('আমরা ছোট-বড় অনেক') ? 'Listen to the verified opinions of real local brands we scaled into high-converting online assets.' : siteConfig.testimonials.description
    },
    faqs: siteConfig.faqs.map((f, idx) => {
      const engF = englishSiteConfig.faqs?.[idx];
      if (engF) {
        return {
          ...f,
          question: f.question.includes('ডোমেইন') || f.question.includes('কত সময়') || f.question.includes('রিভিশন') || f.question.includes('হোয়াটসঅ্যাপ') ? engF.question : f.question,
          answer: f.answer.includes('হ্যাঁ') || f.answer.includes('একটি ল্যান্ডিং') || f.answer.includes('অবশ্যই') || f.answer.includes('হ্যাঁ, আমাদের') ? engF.answer : f.answer
        };
      }
      return f;
    }),
    footer: {
      ...siteConfig.footer,
      aboutText: siteConfig.footer.aboutText.includes('আমরা Website Development') ? (englishSiteConfig.footer?.aboutText || '') : siteConfig.footer.aboutText,
      copyrightText: siteConfig.footer.copyrightText.includes('সর্বস্বত্ব সংরক্ষিত') ? (englishSiteConfig.footer?.copyrightText || '') : siteConfig.footer.copyrightText,
    }
  };
}
