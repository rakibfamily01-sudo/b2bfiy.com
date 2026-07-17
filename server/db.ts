import { promises as fs } from 'fs';
import path from 'path';
import { DatabaseSchema } from '../src/types';

const DB_FILE = path.join(process.cwd(), 'data.json');

// High-quality placeholder images for default seed data (all clean, copyright-free abstract SVGs or standard high-res free visuals)
const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

const DEFAULT_PROJECT_WEB = "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80";
const DEFAULT_PROJECT_GRAPHIC = "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80";
const DEFAULT_PROJECT_VIDEO = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80";
const DEFAULT_PROJECT_SOCIAL = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80";

const DEFAULT_SEED: DatabaseSchema = {
  settings: {
    name: "B2bfiy",
    logo: "B2bfiy",
    favicon: "",
    phone: "+8801700000000",
    email: "info.b2bfiy@gmail.com",
    whatsapp: "+8801700000000",
    address: "Dhaka, Bangladesh",
    facebook: "https://facebook.com/b2bfiy",
    instagram: "https://instagram.com/b2bfiy",
    linkedin: "https://linkedin.com/company/b2bfiy",
    youtube: "https://youtube.com/b2bfiy",
    defaultSeoTitle: "B2bfiy - Digital Agency for Creative & Growth Solutions",
    defaultSeoDescription: "We build high-converting websites, professional graphic designs, engaging video contents, and complete social media management to grow your business.",
    googleAnalyticsId: "",
    facebookPixelId: ""
  },
  topbar: {
    enabled: true,
    phone: "+880 1700 000000",
    email: "info.b2bfiy@gmail.com"
  },
  header: {
    logo: "B2bfiy",
    ctaText: "Get a Free Audit",
    ctaUrl: "/free-audit",
    sticky: true
  },
  hero: {
    badge: "Your Digital Growth Partner",
    heading: "Build a Powerful Digital Presence That Helps Your Business Grow.",
    highlightedText: "Digital Presence",
    description: "হাই-কনভার্টিং ওয়েবসাইট এবং প্রফেশনাল গ্রাফিক ডিজাইন থেকে শুরু করে আকর্ষণীয় ভিডিও কন্টেন্ট ও সম্পূর্ণ সোশ্যাল মিডিয়া ম্যানেজমেন্ট পর্যন্ত — B2bfiy আপনার ব্যবসাকে আলাদাভাবে চোখে পড়ার মতো এবং বৃদ্ধির জন্য প্রয়োজনীয় সম্পূর্ণ ডিজিটাল সহায়তা প্রদান করে।",
    primaryCtaText: "Get a Free Consultation",
    primaryCtaUrl: "/free-audit",
    secondaryCtaText: "View Our Work",
    secondaryCtaUrl: "/portfolio",
    trustText: "One creative team for your complete digital presence.",
    heroImage: DEFAULT_HERO_IMAGE,
    visible: true
  },
  statistics: [
    { id: "1", label: "সম্পন্ন প্রজেক্ট (Completed Projects)", value: "120+" },
    { id: "2", label: "সন্তুষ্ট ক্লায়েন্ট (Happy Clients)", value: "80+" },
    { id: "3", label: "অভিজ্ঞতার বছর (Years of Experience)", value: "3+" },
    { id: "4", label: "ক্লায়েন্ট সন্তুষ্টি (Client Satisfaction)", value: "99%" }
  ],
  clientLogos: [
    { id: "logo-1", name: "Apex Tech", logoUrl: "", websiteUrl: "", published: true },
    { id: "logo-2", name: "Dhaka Bazaar", logoUrl: "", websiteUrl: "", published: true },
    { id: "logo-3", name: "Star Clinic", logoUrl: "", websiteUrl: "", published: true },
    { id: "logo-4", name: "Green Real Estate", logoUrl: "", websiteUrl: "", published: true }
  ],
  services: [
    {
      id: "web-dev",
      title: "ওয়েবসাইট ডেভেলপমেন্ট (Website Development)",
      description: "আমরা আধুনিক, দ্রুতগতির, মোবাইল-ফ্রেন্ডলি ওয়েবসাইট তৈরি করি যা ভিজিটরদের সম্ভাব্য গ্রাহকে রূপান্তরিত করতে সাহায্য করে।",
      icon: "laptop",
      features: [
        "বিজনেস ওয়েবসাইট (Business Website)",
        "ল্যান্ডিং পেজ (Landing Page)",
        "ই-কমার্স ওয়েবসাইট (E-commerce Website)",
        "কাস্টম ওয়েব সলিউশন (Custom Web Solutions)"
      ],
      published: true
    },
    {
      id: "graphic-design",
      title: "গ্রাফিক ডিজাইন (Graphic Design)",
      description: "প্রফেশনাল ভিজ্যুয়াল কন্টেন্ট যা আপনার ব্র্যান্ডকে সামঞ্জস্যপূর্ণ, বিশ্বাসযোগ্য এবং স্মরণীয় করে তোলে।",
      icon: "palette",
      features: [
        "সোশ্যাল মিডিয়া ডিজাইন (Social Media Design)",
        "ব্র্যান্ডিং (Branding & Identity)",
        "মার্কেটিং ক্রিয়েটিভ (Marketing Creatives)",
        "প্রমোショナル ডিজাইন (Promotional Design)"
      ],
      published: true
    },
    {
      id: "video-editing",
      title: "ভিডিও এডিটিং (Video Editing)",
      description: "আকর্ষণীয় ভিডিও কন্টেন্ট যা দৃষ্টি আকর্ষণ করতে এবং আপনার বার্তা কার্যকরভাবে পৌঁছে দিতে ডিজাইন করা হয়েছে।",
      icon: "video",
      features: [
        "রিলস ও শর্টস (Reels & Shorts)",
        "প্রমোショナル ভিডিও (Promotional Videos)",
        "সোশ্যাল মিডিয়া কন্টেন্ট (Social Media Content)",
        "মোশন গ্রাফিক্স (Motion Graphics)"
      ],
      published: true
    },
    {
      id: "social-media",
      title: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট (Social Media)",
      description: "আমরা আপনার সোশ্যাল মিডিয়া উপস্থিতি ম্যানেজ করি, যাতে আপনি আপনার ব্যবসা চালানোর দিকে মনোযোগ দিতে পারেন।",
      icon: "share2",
      features: [
        "কন্টেন্ট প্ল্যানিং (Content Planning)",
        "পোস্ট ডিজাইন (Post Designing)",
        "ক্যাপশন ও হ্যাশট্যাগ (Captions & Hashtags)",
        "পেজ ম্যানেজমেন্ট ও মাসিক রিপোর্টিং"
      ],
      published: true
    }
  ],
  whyChooseUs: [
    { id: "w-1", title: "সবকিছুর জন্য একটি টিম (All-in-one Team)", description: "ডিজাইন, ডেভেলপমেন্ট ও মার্কেটিং এক ছাদের নিচে।", icon: "users" },
    { id: "w-2", title: "কাস্টম সলিউশন (Custom Solutions)", description: "আপনার ব্যবসার ধরণ বুঝে পার্সোনালাইজড স্ট্র্যাটেজি।", icon: "sliders" },
    { id: "w-3", title: "প্রফেশনাল কোয়ালিটি (Professional Quality)", description: "ইন্ডাস্ট্রি স্ট্যান্ডার্ড আধুনিক ডিজাইন ও কোডিং মান।", icon: "award" },
    { id: "w-4", title: "দ্রুত যোগাযোগ (Fast Communication)", description: "হোয়াটসঅ্যাপ এবং ইমেইলে চটজলদি রেসপন্স ও সমাধান।", icon: "zap" },
    { id: "w-5", title: "সাশ্রয়ী প্যাকেজ (Affordable Packages)", description: "ছোট-মাঝারি ব্যবসার সাধ্যের মধ্যে সেরা ডিজিটাল সেবা।", icon: "sparkles" },
    { id: "w-6", title: "চলমান সাপোর্ট (Ongoing Support)", description: "প্রজেক্ট শেষ হলেও আমরা আপনার সাথে আছি মেইনটেন্যান্সে।", icon: "shield-check" }
  ],
  portfolioCategories: [
    { id: "c-1", name: "Website Development", slug: "website-development" },
    { id: "c-2", name: "Graphic Design", slug: "graphic-design" },
    { id: "c-3", name: "Video Editing", slug: "video-editing" },
    { id: "c-4", name: "Social Media Management", slug: "social-media-management" }
  ],
  portfolioProjects: [
    {
      id: "proj-1",
      title: "E-Commerce Footwear Brand Website",
      slug: "ecommerce-footwear-brand-website",
      clientName: "FitStep BD",
      category: "website-development",
      serviceType: "E-commerce Web Development",
      featuredImage: DEFAULT_PROJECT_WEB,
      galleryImages: [DEFAULT_PROJECT_WEB],
      videoUrl: "",
      liveWebsiteUrl: "https://fitstep-example.b2bfiy.com",
      date: "2026-04-12",
      shortDescription: "ফ্লিপ-ফ্লপ ও কেডস ব্র্যান্ডের জন্য একটি সম্পূর্ণ কাস্টম পেমেন্ট গেটওয়ে ইন্টিগ্রেটেড আধুনিক ই-কমার্স সাইট।",
      fullDescription: "আমরা FitStep এর জন্য একটি বিদ্যুৎ-গতিসম্পন্ন ই-কমার্স ল্যান্ডিং পেজ ও শপিং পোর্টাল তৈরি করেছি। এতে চমৎকার প্রোডাক্ট গ্যালারি, কাস্টম কার্ট এবং দ্রুত চেকআউট সিস্টেম সংযুক্ত আছে।",
      challenge: "গ্রাহকরা মোবাইল থেকে কেনাকাটা করার সময় সাইট স্লো হওয়ার কারণে কার্ট ছেড়ে চলে যাচ্ছিলেন।",
      solution: "Next.js/React ও Tailwind ব্যবহার করে একটি স্পিড-অপ্টিমাইজড ও মোবাইল-ফাস্ট শপিং এক্সপেরিয়েন্স তৈরি করেছি, যা লোড হতে ১ সেকেন্ডের কম সময় নেয়।",
      process: [
        "Requirement Gathering & UI Draft Design",
        "Mobile-first responsive frontend development",
        "Integration of simplified cod-friendly checkout form",
        "Performance optimization and lazy loading asset config"
      ],
      results: "সাইট চালুর পর প্রথম মাসেই বাউন্স রেট ৩৫% কমেছে এবং অনলাইন সেলস ৪২% বৃদ্ধি পেয়েছে।",
      tools: ["React", "Vite", "Tailwind CSS", "Express"],
      tags: ["Ecommerce", "Speed Optimized", "Mobile First"],
      seoTitle: "FitStep E-Commerce Case Study - B2bfiy",
      seoDescription: "How B2bfiy developed a blazing fast e-commerce portal for FitStep BD boosting conversions by 42%.",
      featured: true,
      status: "published"
    },
    {
      id: "proj-2",
      title: "Social Media Brand Identity & Creatives",
      slug: "social-media-brand-identity-creatives",
      clientName: "Flavor Junction Restaurant",
      category: "graphic-design",
      serviceType: "Social Media Campaign Design",
      featuredImage: DEFAULT_PROJECT_GRAPHIC,
      galleryImages: [DEFAULT_PROJECT_GRAPHIC],
      videoUrl: "",
      liveWebsiteUrl: "",
      date: "2026-05-20",
      shortDescription: "একটি প্রিমিয়াম রেস্টুরেন্টের জন্য ফেসবুক ও ইনস্টাগ্রাম ক্যাম্পেইন পোস্ট ডিজাইন ও ব্র্যান্ডিং গাইডলাইন।",
      fullDescription: "Flavor Junction এর জন্য একটি সুনির্দিষ্ট কালার প্যালেট ও আকর্ষণীয় ডিজাইন টেমপ্লেট সিরিজ প্রস্তুত করা হয়েছে যা তাদের সোশ্যাল মিডিয়া পেজে প্রফেশনাল লুক এনে দেয়।",
      challenge: "আগের পোস্টগুলো অগোছালো ছিল, কোনো ব্রান্ডিং কনসিস্টেন্সি ছিল না যার কারণে কাস্টমারদের বিশ্বস্ততা কমছিল।",
      solution: "লাল ও সোনালী কালারের মেলবন্ধনে একটি লাক্সারি ফুড ব্র্যান্ডিং গাইডলাইন তৈরি করে কাস্টম ২০+ সোশ্যাল মিডিয়া ডিজাইন ডেলিভারি করেছি।",
      process: [
        "Brand Identity Definition & Color Palette Selection",
        "Social Media Post Template creation",
        "Food photography retouching and banner design",
        "High converting promotional offer design"
      ],
      results: "সোশ্যাল পেজে মেসেজ ইনকোয়ারি এবং রেস্টুরেন্টে টেবিল বুকিং ৩০% বৃদ্ধি পেয়েছে।",
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
      tags: ["Social Media", "Branding", "Restaurant Marketing"],
      seoTitle: "Flavor Junction Brand Identity Case Study - B2bfiy",
      seoDescription: "Consistent restaurant branding and social media graphic design case study by B2bfiy.",
      featured: true,
      status: "published"
    },
    {
      id: "proj-3",
      title: "High-Converting Facebook Ad Reels & Shorts",
      slug: "high-converting-facebook-ad-reels-shorts",
      clientName: "Skincare Essentials BD",
      category: "video-editing",
      serviceType: "Short-form Video Production",
      featuredImage: DEFAULT_PROJECT_VIDEO,
      galleryImages: [DEFAULT_PROJECT_VIDEO],
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      liveWebsiteUrl: "",
      date: "2026-06-05",
      shortDescription: "ফেসবুক অ্যাড ক্যাম্পেইনের জন্য আকর্ষণীয় মোশন গ্রাফিক্স ও কাস্টম ক্যাপশন সহ রিলস এবং শর্টস তৈরি।",
      fullDescription: "পণ্য বিক্রি বাড়াতে আমরা কাস্টমারের মনোযোগ আকর্ষণের জন্য প্রথমে ৩ সেকেন্ডের হুক এবং চমৎকার বি-রোল এডিটিং এর মাধ্যমে ৭টি আকর্ষণীয় ছোট ভিডিও তৈরি করেছি।",
      challenge: "সাধারণ ভিডিওগুলোতে কাস্টমার রিটেনশন কম ছিল, ফেসবুক অ্যাডে সেলস আশানুরূপ আসছিল না।",
      solution: "ডাইনামিক টেক্সট অ্যানিমেশন, ট্রেন্ডি সাউন্ড ইফেক্ট এবং চমৎকার ভিডিও রিটেনশন হুক এডিটিং করে অ্যাড রান করেছি।",
      process: [
        "Scriptwriting and Hook Optimization",
        "Video editing with high retention sound effects",
        "Dynamic animated captions & color grading",
        "A/B testing different thumb versions"
      ],
      results: "অ্যাডের ROI (Return on Investment) বেড়েছে ২.৫ গুন, এবং ভিডিও ভিউ রিটেনশন ৬০% বৃদ্ধি পেয়েছে।",
      tools: ["Premiere Pro", "After Effects", "CapCut Pro"],
      tags: ["Video Editing", "Facebook Ads", "Reels", "Shorts"],
      seoTitle: "Skincare Reels Ad Campaign Case Study - B2bfiy",
      seoDescription: "How short form viral video editing boosted Skincare Essentials sales and engagement.",
      featured: true,
      status: "published"
    }
  ],
  workProcess: [
    { id: "wp-1", step: "01", title: "ডিসকভারি (Discovery)", description: "আপনার ব্যবসা, লক্ষ্য এবং টার্গেট কাস্টমারদের বিস্তারিত বুঝতে মিটিং ও রিসার্চ করা।", visible: true },
    { id: "wp-2", step: "02", title: "স্ট্র্যাটেজি (Strategy)", description: "ডিজাইন, কন্টেন্ট এবং ডেভেলপমেন্টের জন্য সম্পূর্ণ রোডম্যাপ ও প্ল্যান প্রস্তুত করা।", visible: true },
    { id: "wp-3", step: "03", title: "তৈরি (Create)", description: "প্রফেশনাল কোয়ালিটির ডিজাইন, আকর্ষণীয় ভিডিও এবং আধুনিক কোড দিয়ে সমাধানগুলো তৈরি করা।", visible: true },
    { id: "wp-4", step: "04", title: "লঞ্চ (Launch)", description: "সবকিছু নিখুঁতভাবে চেক করে আপনার সার্ভিস বা সাইট লাইভ ও মানুষের কাছে পৌঁছে দেওয়া।", visible: true },
    { id: "wp-5", step: "05", title: "সাপোর্ট ও গ্রোথ (Support & Growth)", description: "মাসিক রিপোর্টিং, পারফরম্যান্স অ্যানালাইসিস ও নতুন কাস্টমার টানার জন্য প্রতিনিয়ত সাপোর্ট বজায় রাখা।", visible: true }
  ],
  packages: [
    {
      id: "pkg-1",
      name: "স্টার্টার (STARTER)",
      price: "12,000",
      period: "/ মাস (Month)",
      features: [
        "১২টি প্রফেশনাল সোশ্যাল মিডিয়া ডিজাইন",
        "৪টি শর্ট-ফর্ম ভিডিও / রিলস",
        "ফেসবুক পেজ ম্যানেজমেন্ট",
        "কন্টেন্ট প্ল্যানিং ও ডিজাইন",
        "ক্যাপশন ও হ্যাশট্যাগ রিসার্চ",
        "মাসিক কন্টেন্ট ক্যালেন্ডার",
        "বেসিক পেজ অপ্টিমাইজেশন",
        "মাসিক পারফরম্যান্স রিপোর্ট"
      ],
      ctaText: "Get Started (শুরু করুন)",
      ctaUrl: "/free-audit?package=starter",
      isPopular: false,
      type: "monthly",
      published: true
    },
    {
      id: "pkg-2",
      name: "গ্রোথ (GROWTH)",
      price: "25,000",
      period: "/ মাস (Month)",
      features: [
        "২০টি প্রফেশনাল সোশ্যাল মিডিয়া ডিজাইন",
        "৮টি শর্ট-ফর্ম ভিডিও / রিলস",
        "ফেসবুক পেজ ম্যানেজমেন্ট",
        "কন্টেন্ট স্ট্র্যাটেজি ও কাস্টম থিম",
        "প্রফেশনাল ক্যাপশন ও হ্যাশট্যাগ",
        "মাসিক কন্টেন্ট ক্যালেন্ডার",
        "ফেসবুক পেজ সম্পূর্ণ অপ্টিমাইজেশন",
        "বেসিক অ্যাড ক্যাম্পেইন সেটআপ",
        "মাসিক পারফরম্যান্স রিপোর্ট",
        "অগ্রাধিকারমূলক (Priority) সাপোর্ট"
      ],
      ctaText: "Grow Your Business (আপনার ব্যবসা বাড়ান)",
      ctaUrl: "/free-audit?package=growth",
      isPopular: true,
      type: "monthly",
      published: true
    },
    {
      id: "pkg-3",
      name: "প্রিমিয়াম গ্রোথ (PREMIUM GROWTH)",
      price: "45,000",
      period: "/ মাস (Month)",
      features: [
        "৩০টি প্রিমিয়াম সোশ্যাল মিডিয়া ডিজাইন",
        "১২টি শর্ট-ফর্ম ভিডিও / রিলস",
        "সম্পূর্ণ ফেসবুক ও ইনস্টাগ্রাম ম্যানেজমেন্ট",
        "কন্টেন্ট স্ট্র্যাটেজি ও কাস্টম থিম",
        "প্রফেশনাল ক্যাপশন ও হ্যাশট্যাগ",
        "মাসিক কন্টেন্ট ক্যালেন্ডার",
        "ফেসবুক পেজ অপ্টিমাইজেশন",
        "অ্যাড ক্যাম্পেইন সেটআপ ও ম্যানেজমেন্ট",
        "মাসিক স্ট্র্যাটেজি কনসালটেশন",
        "বিস্তারিত পারফরম্যান্স রিপোর্ট",
        "অগ্রাধিকারমূলক (Priority) ভিআইপি সাপোর্ট",
        "বোনাস: প্রফেশনাল বিজনেস ল্যান্ডিং পেজ"
      ],
      ctaText: "Book a Free Consultation (ফ্রি পরামর্শ বুক করুন)",
      ctaUrl: "/free-audit?package=premium-growth",
      isPopular: false,
      type: "monthly",
      published: true
    },
    // Website Development Packages
    {
      id: "pkg-web-1",
      name: "স্টার্টার ওয়েবসাইট (STARTER WEBSITE)",
      price: "15,000",
      period: " থেকে (Starting)",
      features: [
        "সর্বোচ্চ ৫টি পেজ (Up to 5 Pages)",
        "মডার্ন প্রফেশনাল ডিজাইন",
        "মোবাইল ও ট্যাবলেট রেসপনসিভ",
        "কন্টাক্ট ফর্ম ইন্টিগ্রেশন",
        "হোয়াটসঅ্যাপ ডাইরেক্ট চ্যাট",
        "বেসিক SEO সেটআপ",
        "সোশ্যাল মিডিয়া ইন্টিগ্রেশন",
        "SSL সেটআপ ফ্রি সহায়তা"
      ],
      ctaText: "Get Started Website",
      ctaUrl: "/free-audit?package=starter-website",
      isPopular: false,
      type: "website",
      deliveryTime: "৭–১০ কর্মদিবস (7-10 Days)",
      startingPrice: true,
      published: true
    },
    {
      id: "pkg-web-2",
      name: "বিজনেস ওয়েবসাইট (BUSINESS WEBSITE)",
      price: "30,000",
      period: " থেকে (Starting)",
      features: [
        "সর্বোচ্চ ১০টি পেজ (Up to 10 Pages)",
        "প্রিমিয়াম কাস্টম ডিজাইন",
        "মডার্ন চমৎকার অ্যানিমেশন",
        "মোবাইল ও ট্যাবলেট ১০০% রেসপনসিভ",
        "লিড জেনারেশন ফর্ম",
        "হোয়াটসঅ্যাপ ডাইরেক্ট চ্যাট ইন্টিগ্রেশন",
        "অ্যাডভান্সড SEO সেটআপ",
        "স্পিড ও ক্যাশিং অপ্টিমাইজেশন",
        "গুগল অ্যানালিটিক্স সেটআপ",
        "সহজ অ্যাডমিন ড্যাশবোর্ড / CMS",
        "৩০ দিন ফ্রি মেইনটেইন্যান্স সাপোর্ট"
      ],
      ctaText: "Choose Business Web",
      ctaUrl: "/free-audit?package=business-website",
      isPopular: true,
      type: "website",
      deliveryTime: "১০–২০ কর্মদিবস (10-20 Days)",
      startingPrice: true,
      published: true
    },
    {
      id: "pkg-web-3",
      name: "কাস্টম / ই-কমার্স ওয়েবসাইট (CUSTOM / E-COMMERCE WEBSITE)",
      price: "50,000",
      period: " থেকে (Starting)",
      features: [
        "কাস্টম আনলিমিটেড UI/UX ডিজাইন",
        "সহজ প্রোডাক্ট ম্যানেজমেন্ট ও আপলোড",
        "আধুনিক শপিং কার্ট ও সিকিউর চেকআউট",
        "অনলাইন পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (bKash/Nagad/Cards)",
        "কাস্টমার অ্যাকাউন্ট প্যানেল",
        "পূর্ণাঙ্গ অর্ডার ম্যানেজমেন্ট",
        "সহজ অ্যাডমিন কন্ট্রোল ড্যাশবোর্ড",
        "সম্পূর্ণ SEO ও মেটা কনফিগারেশন",
        "পারফরম্যান্স ও ক্যাশ টিউনিং",
        "উচ্চমানের সিকিউরিটি কনফিগারেশন",
        "৬০ দিন ফুল মেইনটেইন্যান্স সাপোর্ট"
      ],
      ctaText: "Request a Custom Quote",
      ctaUrl: "/free-audit?package=ecommerce-custom",
      isPopular: false,
      type: "website",
      deliveryTime: "২০–৩০ কর্মদিবস (20-30 Days)",
      startingPrice: true,
      published: true
    },
    // Graphic Design Packages
    {
      id: "pkg-g-1",
      name: "সোশ্যাল স্টার্টার (SOCIAL STARTER)",
      price: "5,000",
      period: " (One-time)",
      features: [
        "১০টি সোশ্যাল মিডিয়া ডিজাইন",
        "কাস্টম ব্র্যান্ড কালার ও স্টাইল",
        "প্রতি ডিজাইনে সর্বোচ্চ ২ বার রিভিশন",
        "HD রেজোলিউশন JPG/PNG ডেলিভারি"
      ],
      ctaText: "Order Social Starter",
      ctaUrl: "/free-audit?package=social-starter",
      isPopular: false,
      type: "graphic",
      published: true
    },
    {
      id: "pkg-g-2",
      name: "বিজনেস কন্টেন্ট (BUSINESS CONTENT)",
      price: "10,000",
      period: " (One-time)",
      features: [
        "২০টি সোশ্যাল মিডিয়া ডিজাইন",
        "কাস্টম ব্র্যান্ড স্টাইল গাইড",
        "প্রমোショナル ক্যাম্পেইন ক্রিয়েটিভস",
        "১টি প্রোফাইল কভার ও ব্যানার ডিজাইন",
        "অগ্রাধিকার দ্রুত ডেলিভারি",
        "ফ্রি রিভিশন সাপোর্ট"
      ],
      ctaText: "Order Business Content",
      ctaUrl: "/free-audit?package=business-content",
      isPopular: true,
      type: "graphic",
      published: true
    },
    {
      id: "pkg-g-3",
      name: "মাসিক ডিজাইন পার্টনার (MONTHLY DESIGN PARTNER)",
      price: "18,000",
      period: "/ মাস (Month)",
      features: [
        "সর্বোচ্চ ৩০টি সোশ্যাল মিডিয়া ডিজাইন",
        "সকল ধরনের মার্কেটিং ক্রিয়েটিভ ও ব্যানার",
        "প্রমোショナル ক্যাম্পেইন ডিজাইন",
        "সামঞ্জস্যপূর্ণ ব্র্যান্ড স্টাইল গাইড",
        "অগ্রাধিকারমূলক চ্যাট ও কল সাপোর্ট",
        "আনলিমিটেড রিভিশন"
      ],
      ctaText: "Partner with Us",
      ctaUrl: "/free-audit?package=monthly-design-partner",
      isPopular: false,
      type: "graphic",
      published: true
    },
    // Video Editing Packages
    {
      id: "pkg-v-1",
      name: "রিলস স্টার্টার (REELS STARTER)",
      price: "6,000",
      period: " (One-time)",
      features: [
        "৪টি শর্ট ভিডিও/রিলস/শর্টস",
        "প্রফেশনাল কালার ও বি-রোল এডিটিং",
        "অ্যানিমেটেড ক্যাপশন ও সাবটাইটেল",
        "ট্রানজিশন ও আধুনিক ইফেক্ট",
        "কপিরাইট ফ্রি ট্রেন্ডি ব্যাকগ্রাউন্ড মিউজিক"
      ],
      ctaText: "Order Reels Starter",
      ctaUrl: "/free-audit?package=reels-starter",
      isPopular: false,
      type: "video",
      published: true
    },
    {
      id: "pkg-v-2",
      name: "কন্টেন্ট গ্রোথ (CONTENT GROWTH)",
      price: "12,000",
      period: " (One-time)",
      features: [
        "৮টি শর্ট ভিডিও/রিলস/শর্টস",
        "প্রফেশনাল চমৎকার এডিটিং",
        "অ্যানিমেটেড বোল্ড ক্যাপশন ও সাউন্ড এফেক্ট",
        "সাউন্ড ডিজাইন ও নয়েজ ক্যান্সেলেশন",
        "বেসিক মোশন গ্রাফিক্স ও স্টিকার"
      ],
      ctaText: "Order Content Growth",
      ctaUrl: "/free-audit?package=content-growth",
      isPopular: true,
      type: "video",
      published: true
    },
    {
      id: "pkg-v-3",
      name: "ভিডিও পার্টনার (VIDEO PARTNER)",
      price: "20,000",
      period: "/ মাস (Month)",
      features: [
        "১৫টি শর্ট ভিডিও/রিলস/শর্টস",
        "প্রিমিয়াম হাই-এন্ড ভিডিও এডিটিং",
        "অ্যাডভান্সড মোশন গ্রাফিক্স ও ইন্ট্রো",
        "অ্যানিমেটেড আই-ক্যাচিং ক্যাপশন",
        "সাউন্ড ডিজাইন ও স্টুডিও গ্রেড সাউন্ড",
        "অগ্রাধিকার দ্রুত ডেলিভারি সাপোর্ট"
      ],
      ctaText: "Partner for Video Content",
      ctaUrl: "/free-audit?package=video-partner",
      isPopular: false,
      type: "video",
      published: true
    }
  ],
  testimonials: [
    {
      id: "t-1",
      clientName: "এম ডি রাকিব হোসেন",
      companyName: "FitStep BD Owner",
      review: "B2bfiy আমাদের জুতার ই-কমার্স সাইটের স্পিড এবং সোশ্যাল ডিজাইন অপ্টিমাইজ করে দিয়েছে। তাদের কাজের কোয়ালিটি দারুণ এবং কাস্টমার রেসপন্স অনেক ফাস্ট।",
      rating: 5,
      clientImage: "",
      published: true
    },
    {
      id: "t-2",
      clientName: "ফারহানা আক্তার",
      companyName: "Flavor Junction Manager",
      review: "তাদের কাস্টম সোশ্যাল মিডিয়া ডিজাইন ক্যাম্পেইনের কারণে আমাদের রেস্টুরেন্টের কাস্টমার বুকিং অনেক বেড়ে গিয়েছে। ব্র্যান্ডিং এখন অনেক প্রফেশনাল দেখায়!",
      rating: 5,
      clientImage: "",
      published: true
    }
  ],
  faqs: [
    { id: "f-1", question: "একটি প্রজেক্টের খরচ কত?", answer: "আমাদের প্রতিটি সেবার জন্য নির্দিষ্ট সাশ্রয়ী প্যাকেজ রয়েছে। সার্ভিস ডেভেলপমেন্ট বা কাজের পরিধির উপর ভিত্তি করে এটি নির্ধারিত হয়। কাস্টম কাজের জন্য আমরা রিকোয়ারমেন্ট অনুযায়ী বাজেট নির্ধারণ করি।" },
    { id: "f-2", question: "ওয়েবসাইট ডেভেলপমেন্টে কত সময় লাগে?", answer: "সাধারনত একটি ল্যান্ডিং পেজ বা বেসিক সাইট ৭-১০ কর্মদিবস এবং একটি ডাইনামিক বড় ই-কমার্স বা বিজনেস সাইট ১০-২০ কর্মদিবসের মধ্যে আমরা রেডি করে দেই।" },
    { id: "f-3", question: "আপনারা কি আন্তর্জাতিক ক্লায়েন্টদের সাথে কাজ করেন?", answer: "হ্যাঁ, আমরা লোকাল ব্যবসার পাশাপাশি গ্লোবাল মার্কেটপ্লেস ও বিভিন্ন দেশের ক্লায়েন্টদের জন্য রিমোটলি কাস্টম সলিউশন ও সাপোর্ট দিয়ে আসছি।" },
    { id: "f-4", question: "আমি কি কাস্টম প্যাকেজ রিকোয়েস্ট করতে পারি?", answer: "অবশ্যই! আপনার প্রয়োজন যদি আমাদের প্যাকেজের বাইরে হয়, তাহলে সরাসরি 'Request a Custom Quote' এর মাধ্যমে অথবা হোয়াটসঅ্যাপে যোগাযোগ করে নিজের প্রয়োজন মত প্যাকেজ বানিয়ে নিতে পারবেন।" },
    { id: "f-5", question: "আপনারা কি চলমান সাপোর্ট প্রদান করেন?", answer: "হ্যাঁ, প্রজেক্ট লাইভ করার পরেও আমরা প্যাকেজ ভেদে ৩০ থেকে ৬০ দিন পর্যন্ত সম্পূর্ণ ফ্রি সাপোর্ট ও মেইনটেন্যান্স করে থাকি। এরপরও নামমাত্র খরচে মাসিক কাস্টম সাপোর্ট প্যাকেজ নেওয়া যায়।" },
    { id: "f-6", question: "আমি কীভাবে শুরু করব?", answer: "সরাসরি সাইটের 'Get a Free Audit' ফর্মটি পূরণ করুন অথবা হোয়াটসঅ্যাপ আইকনে ক্লিক করে আমাদের টিমের সাথে সরাসরি কনসালটেশন শুরু করে দিন।" }
  ],
  auditRequests: [],
  contactMessages: [],
  media: []
};

export class JSONDb {
  static async load(): Promise<DatabaseSchema> {
    try {
      const exists = await fs.access(DB_FILE).then(() => true).catch(() => false);
      if (!exists) {
        await JSONDb.save(DEFAULT_SEED);
        return DEFAULT_SEED;
      }
      const raw = await fs.readFile(DB_FILE, 'utf8');
      const data = JSON.parse(raw);
      // Ensure any missing collections are initialized
      return { ...DEFAULT_SEED, ...data };
    } catch (e) {
      console.error('Failed to load JSON database, resetting to default seed...', e);
      await JSONDb.save(DEFAULT_SEED);
      return DEFAULT_SEED;
    }
  }

  static async save(data: DatabaseSchema): Promise<void> {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }
}
