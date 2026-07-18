import { Lead, SiteConfig } from './types';

export const defaultSiteConfig: SiteConfig = {
  adminCredentials: {
    username: 'b2bfiy',
    passwordHash: 'rakib1122@#',
  },
  branding: {
    logoText: 'B2b',
    logoHighlightText: 'fiy',
    logoSubText: 'Digital Partner',
    faviconUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=32',
    logoImageUrl: '',
    appUrl: 'https://b2bfiy.com',
    appTitle: 'B2bfiy - Premium Digital Marketing Agency',
  },
  hero: {
    badgeText: '🚀 আপনার ব্যবসার ডিজিটাল পার্টনার',
    heading: 'আপনার ব্যবসাকে অনলাইনে আরও শক্তিশালী ও বিশ্বাসযোগ্য করে তুলুন',
    highlight: 'ডিজিটাল উপস্থিতি',
    description: 'B2bfiy আপনার ব্যবসার জন্য Professional Website, Graphic Design, Video Editing এবং Facebook Page Management সার্ভিস প্রদান করে, যাতে আপনার ব্যবসা আরও বেশি মানুষের কাছে পৌঁছাতে পারে এবং বিক্রি বৃদ্ধি পায়।',
    primaryCtaText: '👉 ফ্রি কনসালটেশন নিন',
    secondaryCtaText: '📂 আমাদের কাজ দেখুন',
    stats: {
      projectsCount: '২৫০+',
      projectsLabel: 'সফল প্রজেক্ট',
      clientsCount: '১২০+',
      clientsLabel: 'সন্তুষ্ট দেশীয় ক্লায়েন্ট',
      deliveryRate: '৯৯%',
      deliveryLabel: 'সময়মতো ডেলিভারি',
      supportHours: '২৪/৭',
      supportLabel: 'ডেডিকেটেড সাপোর্ট',
    },
  },
  frictionAndCure: {
    badgeFriction: 'ডিজিটাল সীমাবদ্ধতা',
    titleFriction: 'আপনার ব্যবসা কি অনলাইনে আলাদাভাবে পরিচিত হতে পারছে না?',
    descriptionFriction: 'আজকের যুগে একটি ব্যবসা সফলভাবে পরিচালনা করা এমনিতেই কঠিন, তার উপর সোশ্যাল মিডিয়া কন্টেন্ট তৈরি, আকর্ষণীয় গ্রাফিক্স ডিজাইন, সার্চ অপ্টিমাইজেশন এবং ভিডিও মেকিং সামলানো আরও অনেক বাড়তি চাপ তৈরি করে। আপনার ব্যবসার ডিজিটাল উপস্থিতির প্রধান সমস্যাগুলো:',
    frictionPoints: [
      {
        id: 'fp1',
        title: 'পুরানো এবং ধীরগতির ওয়েবসাইট',
        description: 'মোবাইলে রেসপন্সিভ না হওয়া বা আধুনিক বুকিং ও কাস্টমার ফানেল না থাকা।'
      },
      {
        id: 'fp2',
        title: 'অনিয়মিত সোশ্যাল মিডিয়া পোস্ট',
        description: 'সোশ্যাল পেজগুলোতে কোনো নিয়মিত অ্যাক্টিভিটি বা প্ল্যানিং না থাকা যা ক্রেতাদের আকর্ষণ করতে পারে না।'
      },
      {
        id: 'fp3',
        title: 'অপেশাদার গ্রাফিক্স ও ব্যানার',
        description: 'সাধারণ এবং নিম্নমানের টেমপ্লেট ব্যবহার করা যা আপনার ব্র্যান্ড ভ্যালু নষ্ট করে।'
      },
      {
        id: 'fp4',
        title: 'কম ভিউ এবং এঙ্গেজমেন্টের ভিডিও',
        description: 'ট্রেন্ডিং ট্রানজিশন বা পেশাদার সম্পাদনার অভাব, যা নতুন ক্রেতা টানতে ব্যর্থ হয়।'
      }
    ],
    badgeCure: 'B2BFIY সমাধান',
    titleCure: 'আপনি আপনার ব্যবসা সামলান। আমরা সামলাবো আপনার সম্পূর্ণ ডিজিটাল উপস্থিতি।',
    descriptionCure: 'B2bfiy আপনার নিজস্ব ক্রিয়েটিভ, প্রযুক্তি ও মার্কেটিং টিম হিসেবে কাজ করবে। আমরা দক্ষ ডিজাইনার, ডেডিকেটেড ওয়েব ডেভেলপার এবং পেশাদার ভিডিও এডিটরদের সরাসরি আপনার ব্র্যান্ডের সাফল্যে যুক্ত করি।',
    curePoints: [
      {
        id: 'cp1',
        text: '১০০% ইউনিক এবং প্রিমিয়াম কাস্টম ডিজাইন'
      },
      {
        id: 'cp2',
        text: 'সুপার-ফাস্ট এবং আধুনিক সব ফিচারযুক্ত ওয়েবসাইট'
      },
      {
        id: 'cp3',
        text: 'পরিকল্পিত কন্টেন্ট স্ট্র্যাটেজি এবং মাসিক ক্যালেন্ডার'
      },
      {
        id: 'cp4',
        text: 'একাধিক ফ্রিল্যান্সার সামলানোর কোনো অতিরিক্ত ঝামেলা নেই'
      }
    ],
    ctaText: 'চলুন আপনার ব্যবসা বাড়াই ➔'
  },
  whyChooseUs: {
    badge: 'আমাদের বৈশিষ্ট্য',
    heading: 'কেন B2bfiy বেছে নিবেন?',
    description: 'আমরা শুধু কাজ করে দেই না, বরং একটি বিশ্বস্ত পার্টনারশিপ তৈরি করে আপনার ব্যবসার প্রকৃত প্রবৃদ্ধি নিশ্চিত করি।',
    reasons: [
      {
        id: 'r1',
        title: 'অভিজ্ঞ টিম',
        description: 'আমাদের রয়েছে ডিজাইন, কোডিং এবং মার্কেটিংয়ে দক্ষ পেশাদারদের অভিজ্ঞ দল, যারা আপনার ব্যবসাকে সফল করতে সবসময় নিবেদিত।',
        iconName: 'Users2',
      },
      {
        id: 'r2',
        title: 'সময়মতো কাজ ডেলিভারি',
        description: 'আমরা সময়ের মূল্য বুঝি। প্রতিটি প্রজেক্ট সঠিক পরিকল্পনার মাধ্যমে নির্দিষ্ট সময়ের মধ্যেই সম্পন্ন করে আপনার হাতে তুলে দেওয়া হয়।',
        iconName: 'Clock',
      },
      {
        id: 'r3',
        title: 'আধুনিক ডিজাইন',
        description: 'আমরা ট্রেন্ডি, আকর্ষণীয় এবং একদম আধুনিক ডিজাইন প্যাটার্ন ব্যবহার করি, যা আপনার গ্রাহকদের প্রথম দেখাতেই আকৃষ্ট করবে।',
        iconName: 'Palette',
      },
      {
        id: 'r4',
        title: 'যুক্তিসঙ্গত মূল্য',
        description: 'ছোট-বড় সব ধরণের ব্যবসার বাজেটের কথা চিন্তা করে আমরা সাশ্রয়ী এবং অত্যন্ত যুক্তিসঙ্গত মূল্যে প্রিমিয়াম সার্ভিস দিয়ে থাকি।',
        iconName: 'BadgePercent',
      },
      {
        id: 'r5',
        title: '২৪/৭ সাপোর্ট',
        description: 'প্রজেক্ট ডেলিভারির পরেও যেকোনো প্রযুক্তিগত সমস্যা বা পরামর্শের জন্য আমাদের দক্ষ কাস্টমার সাপোর্ট টিম সর্বদা প্রস্তুত।',
        iconName: 'HeartHandshake',
      },
      {
        id: 'r6',
        title: 'কাস্টম সমাধান',
        description: 'সাধারণ টেমপ্লেট নয়, বরং আপনার ব্যবসার ধরণ এবং প্রয়োজন পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করে আমরা কাস্টম ডিজিটাল সমাধান তৈরি করি।',
        iconName: 'Settings',
      },
    ],
  },
  services: {
    badge: 'আমাদের সার্ভিসসমূহ',
    heading: 'আমরা আপনার ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সমাধান প্রদান করি',
    list: [
      {
        id: 'web',
        title: 'Website Development',
        description: 'পেশাদার ও আধুনিক Website তৈরি করি যা আপনার ব্যবসার বিশ্বাসযোগ্যতা বৃদ্ধি করবে এবং নতুন কাস্টমার আনতে সাহায্য করবে।',
        iconName: 'Layout',
        color: 'from-blue-500 to-indigo-600',
        bullets: [
          'Business Website',
          'E-commerce Website',
          'Landing Page',
          'Custom Web Application',
        ],
      },
      {
        id: 'design',
        title: 'Graphic Design',
        description: 'আপনার ব্র্যান্ডকে আরও আকর্ষণীয় ও Professional করে তুলতে আমরা মানসম্মত Graphic Design তৈরি করি।',
        iconName: 'Palette',
        color: 'from-pink-500 to-rose-600',
        bullets: [
          'Social Media Post',
          'Logo Design',
          'Banner Design',
          'Branding',
        ],
      },
      {
        id: 'video',
        title: 'Video Editing',
        description: 'আপনার ভিডিওকে আরও আকর্ষণীয়, Professional এবং Viral হওয়ার উপযোগী করে এডিট করি।',
        iconName: 'Video',
        color: 'from-purple-500 to-violet-600',
        bullets: [
          'Facebook Video',
          'Reels',
          'Shorts',
          'Promotional Video',
        ],
      },
      {
        id: 'facebook',
        title: 'Facebook Management',
        description: 'আপনার Facebook Page সম্পূর্ণ Professional ভাবে পরিচালনা করি।',
        iconName: 'Share2',
        color: 'from-cyan-500 to-blue-600',
        bullets: [
          'Content Planning',
          'Post Design',
          'Caption Writing',
          'Hashtag Research',
          'Monthly Report',
        ],
      },
    ],
  },
  portfolio: {
    badge: 'পোর্টফোলিও',
    heading: 'আমাদের সাম্প্রতিক কাজ',
    description: 'আমাদের করা Website, Graphic Design, Video Editing এবং Facebook Management প্রজেক্টগুলো দেখে নিন।',
    items: [
      {
        id: 'p1',
        title: 'দারুচিনি এক্সপ্রেস - প্রিমিয়াম রেস্টুরেন্ট ওয়েবসাইট',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        description: 'ঢাকার একটি বিখ্যাত রেস্টুরেন্টের জন্য অনলাইন অর্ডারিং এবং টেবিল বুকিং সুবিধাসহ সম্পূর্ণ রেসপন্সিভ ওয়েবসাইট।',
        technologies: ['React', 'Tailwind CSS', 'Node.js'],
        clientName: 'Daruchini Express, Dhanmondi',
        videoLink: '',
      },
      {
        id: 'p2',
        title: 'শৌখিন ক্লোথিং - আধুনিক ই-কমার্স প্ল্যাটফর্ম',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        description: 'ফাস্ট-লোডিং এবং ইউজার-ফ্রেন্ডলি শপিং এক্সপেরিয়েন্স সহ একটি প্রিমিয়াম ফেসবুক-বেসড ব্র্যান্ডের নিজস্ব ই-কমার্স স্টোর।',
        technologies: ['Next.js', 'PostgreSQL', 'Tailwind'],
        clientName: 'Shoukhin Clothing',
        videoLink: '',
      },
      {
        id: 'p3',
        title: 'চিজ অ্যান্ড ক্রাস্ট - সোশ্যাল মিডিয়া ক্রিয়েটিভ ডিজাইন',
        category: 'Graphic Design',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
        description: 'গ্রাহকদের আকর্ষণ করতে এবং ফেসবুক পেজের বিক্রি বাড়াতে কাস্টম ফুড ব্যানার ও প্রমোショナル পোস্ট ডিজাইন।',
        technologies: ['Photoshop', 'Illustrator'],
        clientName: 'Cheese & Crust Pizza',
        videoLink: '',
      },
      {
        id: 'p4',
        title: 'আইটি স্কলার্স - ফেসবুক পেজ ম্যানেজমেন্ট ক্যাম্পেইন',
        category: 'Facebook Management',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        description: 'সম্পূর্ণ অর্গানিক রিচ বৃদ্ধি, প্রতিদিনের পোস্ট শিডিউলিং এবং টার্গেটেড কাস্টমার এনগেজমেন্ট বাড়ানোর সফল প্রচারণা।',
        technologies: ['Meta Ads Manager', 'Canva'],
        clientName: 'IT Scholars BD',
        videoLink: '',
      },
      {
        id: 'p5',
        title: 'গ্লোবাল কনসালটেন্সি - শর্ট প্রমোショナル ভিডিও',
        category: 'Video Editing',
        image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=800',
        description: 'ফেসবুক ও ইউটিউবের জন্য ২ মিনিটের আকর্ষণীয় মোশন গ্রাফিক্স এবং রিয়েল-ভয়েসওভার যুক্ত প্রোমো ভিডিও।',
        technologies: ['Premiere Pro', 'After Effects'],
        clientName: 'Global Visa & Immigration',
        videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        id: 'p6',
        title: 'উত্তরা ডেন্টাল কেয়ার - প্রফেশনাল ল্যান্ডিং পেজ',
        category: 'Website Development',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
        description: 'রোগীদের সরাসরি অ্যাপয়েন্টমেন্ট বুকিং করার জন্য একটি গতিশীল এবং কাস্টমাইজড সিঙ্গেল-পেজ ল্যান্ডিং সাইট।',
        technologies: ['React', 'Framer Motion'],
        clientName: 'Uttara Dental Care',
        videoLink: '',
      }
    ],
  },
  packages: {
    badge: 'ফ্লেক্সিবল সাবস্ক্রিপশন',
    heading: 'আপনার ব্যবসার জন্য সঠিক মাসিক গ্রোথ প্ল্যান বেছে নিন',
    description: 'প্রতিদিন কাস্টমার এনগেজমেন্ট এবং ব্র্যান্ড অথরিটি তৈরি করতে প্রফেশনাল গ্রাফিক্স এবং ডাইনামিক রিলস ডিজাইন।',
    items: [
      {
        id: 'pkg1',
        name: 'স্টার্টআপ ল্যান্ডিং পেজ',
        price: '৳১২,৫০০',
        billing: 'এককালীন পেমেন্ট',
        features: [
          '১টি আকর্ষণীয় কাস্টম পেজ',
          'সম্পূর্ণ মোবাইল ও ট্যাব ফ্রেন্ডলি',
          'কনট্যাক্ট ও লিড ফরম ইন্টিগ্রেশন',
          'ফ্রি ডোমেইন ও হোস্টিং (১ বছর)',
          'সহজ অ্যাডমিন কন্ট্রোল প্যানেল',
          '১০ দিনের ফ্রি সাপোর্ট'
        ],
        category: 'Website Development'
      },
      {
        id: 'pkg2',
        name: 'ফুল-ফাংশনাল বিজনেস ওয়েবসাইট',
        price: '৳২৪,৫০০',
        billing: 'এককালীন পেমেন্ট',
        features: [
          '৫টি মূল পেজ (Home, About, Services, etc.)',
          'হাই-স্পিড লোডিং স্পিড এবং এসইও অপ্টিমাইজড',
          'অনলাইন অ্যাপয়েন্টমেন্ট / বুকিং সিস্টেম',
          'লাইভ চ্যাট / হোয়াটসঅ্যাপ ইন্টিগ্রেশন',
          'ফ্রি SSL সার্টিফিকেট',
          '১ মাসের ডেডিকেটেড সাপোর্ট'
        ],
        isPopular: true,
        category: 'Website Development'
      },
      {
        id: 'pkg3',
        name: 'সোশ্যাল মিডিয়া স্টার্টার কিট',
        price: '৳৪,৯৯৯',
        billing: 'প্রতি মাসে',
        features: [
          '১০টি হাই-কোয়ালিটি ফেসবুক পোস্ট ডিজাইন',
          '১টি কাস্টম ব্যানার / কভার ফটো ডিজাইন',
          'উচ্চমানের স্টক ইমেজ ব্যবহার',
          'ব্র্যান্ড কালার গাইডলাইন মেনে ডিজাইন',
          '২ বার ফ্রি রিভিশন সুবিধা'
        ],
        category: 'Graphic Design'
      },
      {
        id: 'pkg4',
        name: 'রিলস ও শর্টস বুস্ট প্যাক',
        price: '৳৮,৯৯৯',
        billing: 'প্রতি মাসে',
        features: [
          '১২টি প্রফেশনাল শর্টস বা রিলস ভিডিও',
          'ভাইরাল সাউন্ড ট্র্যাক ও ট্রেন্ডিং এফেক্টস',
          'বাংলা ও ইংরেজি আকর্ষণীয় সাবটাইটেল',
          'কালার গ্রেডিং ও অডিও নয়েজ রিমুভাল',
          'হাই-রেজোলিউশন ১০৮০পি ডেলিভারি'
        ],
        isPopular: true,
        category: 'Video Editing'
      },
      {
        id: 'pkg5',
        name: 'STARTER SMM',
        price: '৳১২,০০০',
        billing: 'প্রতি মাসে',
        features: [
          '১২টি প্রফেশনাল সোশ্যাল মিডিয়া ডিজাইন',
          '৪টি শর্ট-ফর্ম ভিডিও / রিলস',
          'ফেসবুক পেজ ম্যানেজমেন্ট',
          'কনটেন্ট প্ল্যানিং',
          'ক্যাপশন ও হ্যাশট্যাগ',
          'মাসিক কনটেন্ট ক্যালেন্ডার',
          'বেসিক পেজ অপ্টিমাইজেশন',
          'মাসিক পারফরম্যান্স রিপোর্ট'
        ],
        isPopular: false,
        category: 'Facebook Management'
      },
      {
        id: 'pkg6',
        name: 'GROWTH PLAN',
        price: '৳২৫,০০০',
        billing: 'প্রতি মাসে',
        features: [
          '২০টি প্রফেশনাল সোশ্যাল মিডিয়া ডিজাইন',
          '৮টি শর্ট-ফর্ম ভিডিও / রিলস',
          'ফেসবুক পেজ ম্যানেজমেন্ট',
          'কনটেন্ট স্ট্র্যাটেজি',
          'প্রফেশনাল ক্যাপশন ও হ্যাশট্যাগ',
          'মাসিক কনটেন্ট ক্যালেন্ডার',
          'ফেসবুক পেজ অপ্টিমাইজেশন',
          'বেসিক অ্যাড ক্যাম্পেইন সেটআপ',
          'মাসিক পারফরম্যান্স রিপোর্ট',
          'প্রায়োরিটি সাপোর্ট'
        ],
        isPopular: true,
        category: 'Facebook Management'
      },
      {
        id: 'pkg7',
        name: 'PREMIUM GROWTH',
        price: '৳৪৫,০০০',
        billing: 'প্রতি মাসে',
        features: [
          '৩০টি প্রিমিয়াম সোশ্যাল মিডিয়া ডিজাইন',
          '১২টি শর্ট-ফর্ম ভিডিও / রিলস',
          'সম্পূর্ণ ফেসবুক পেজ ম্যানেজমেন্ট',
          'কনটেন্ট স্ট্র্যাটেজি ও প্ল্যানিং',
          'ক্যাপশন ও হ্যাশট্যাগ',
          'মাসিক কনটেন্ট ক্যালেন্ডার',
          'ফেসবুক পেজ অপ্টিমাইজেশন',
          'অ্যাড ক্যাম্পেইন ম্যানেজমেন্ট',
          'মাসিক স্ট্র্যাটেজি কনসালটেশন',
          'বিস্তারিত পারফরম্যান্স রিপোর্ট',
          'প্রায়োরিটি সাপোর্ট',
          'বোনাস: প্রফেশনাল বিজনেস ল্যান্ডিং পেজ'
        ],
        isPopular: false,
        category: 'Facebook Management'
      }
    ],
  },
  testimonials: {
    badge: 'ক্লায়েন্টদের সফলতা',
    heading: 'আমাদের ক্লায়েন্টদের সফলতার গল্প',
    description: 'B2BFIY-এর সাথে যুক্ত হয়ে দেশের অনেক উদ্যোক্তা তাদের ব্যবসা ডিজিটালি সফলভাবে এগিয়ে নিয়ে যাচ্ছেন। তাদের অভিজ্ঞতা জানুন:',
    items: [
      {
        id: 't1',
        clientName: 'সাকিব আল হাসান',
        businessName: 'সাকিব’স কিচেন',
        logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        feedback: 'B2BFIY আমাদের সম্পূর্ণ ফেসবুক পেজ ম্যানেজমেন্ট করার পর আমাদের রেস্টুরেন্টের অর্ডার প্রায় দ্বিগুণ বেড়েছে! তাদের কন্টেন্ট ক্যালেন্ডার এবং পোস্ট ডিজাইন সত্যিই প্রশংসনীয়।',
        rating: 5
      },
      {
        id: 't2',
        clientName: 'আরিফ রহমান',
        businessName: 'টেক মার্ট বিডি',
        logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        feedback: 'তাদের দিয়ে একটি আধুনিক ই-কমার্স ওয়েবসাইট তৈরি করিয়েছিলাম। ওয়েবসাইটটি অত্যন্ত ফাস্ট এবং ক্রেতারা মোবাইলেই খুব সহজে অর্ডার করতে পারেন। সাপোর্টও অসাধারণ!',
        rating: 5
      },
      {
        id: 't3',
        clientName: 'ফারহানা ইয়াসমিন',
        businessName: 'স্টাইলিশ অ্যাটায়ার',
        logoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        feedback: 'সোশ্যাল মিডিয়া গ্রাফিক্স ও শর্ট রিলস তৈরির জন্য B2BFIY-এর সাথে মাসিক চুক্তিতে কাজ করছি। ভিডিও কোয়ালিটি অত্যন্ত প্রিমিয়াম এবং তারা ঠিক সময়ে ডেলিভারি দেয়।',
        rating: 5
      }
    ]
  },
  footer: {
    aboutText: 'আমরা Website Development, Graphic Design, Video Editing এবং Facebook Management সার্ভিসের মাধ্যমে বাংলাদেশের ছোট ও মাঝারি ব্যবসাকে ডিজিটালি এগিয়ে নিতে সহায়তা করি।',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    helpline: '+৮৮০ ১৭০০-০০০০০০',
    email: 'info.b2bfiy@gmail.com',
    copyrightText: 'All rights reserved. Designed for premium Bangladeshi agencies.',
  },
  faqs: [
    {
      question: 'B2bfiy মূলত কী ধরণের সার্ভিস প্রদান করে?',
      answer: 'আমরা বাংলাদেশের ব্যবসাগুলোকে ডিজিটালি সফল করতে ৪টি প্রধান সার্ভিস প্রদান করি: Website Development (পেশাদার ওয়েবসাইট), Graphic Design (ব্র্যান্ড পোস্ট ও লোগো), Video Editing (রিলস, শর্টস ও বিজ্ঞাপন) এবং Facebook Page Management (সম্পূর্ণ পেজ পরিচালনা)।'
    },
    {
      question: 'কাজের ডেলিভারি সময় সাধারণত কতদিন হয়ে থাকে?',
      answer: 'সার্ভিস এবং প্যাকেজ অনুযায়ী কাজের সময় নির্ধারিত হয়। সাধারণ ল্যান্ডিং পেজ তৈরি করতে ৫ থেকে ৭ কর্মদিবস এবং প্রফেশনাল বিজনেস ওয়েবসাইটের জন্য ১৫ থেকে ২৫ কর্মদিবস লাগে। গ্রাফিক ডিজাইন এবং ভিডিও এডিট প্যাকেজগুলো মাসিক চুক্তি অনুযায়ী নিয়মিত ডেলিভারি দেওয়া হয়।'
    },
    {
      question: 'আপনাদের সার্ভিস নেওয়ার পর কোনো টেকনিক্যাল সাপোর্ট পাবো কি?',
      answer: 'অবশ্যই! আমাদের প্রতিটি ওয়েবসাইটে প্যাকেজ অনুযায়ী অন্তত ১০ দিন থেকে শুরু করে ১ মাস পর্যন্ত সম্পূর্ণ ফ্রি সাপোর্ট দেওয়া হয়। এছাড়া আপনি যেকোনো প্রয়োজনে ২৪/৭ আমাদের হেল্পলাইন বা হোয়াটসঅ্যাপের মাধ্যমে সাপোর্ট টিমকে পাবেন।'
    },
    {
      question: 'পেমেন্ট করার নিয়ম বা পলিসি কী?',
      answer: 'যেকোনো এককালীন সার্ভিস (যেমন ওয়েবসাইট ডেভেলপমেন্ট) শুরুর পূর্বে ৫০% অগ্রিম পেমেন্ট করতে হয় এবং কাজ সম্পূর্ণ সন্তোষজনকভাবে বুঝিয়ে দেওয়ার পর বাকি ৫০% পেমেন্ট করতে হয়। মাসিক চুক্তির কাজগুলোর ক্ষেত্রে প্রতি মাসের শুরুতে অ্যাডভান্স পেমেন্ট প্রযোজ্য।'
    },
    {
      question: 'আমি কী আমার ফেসবুক পেজ বা ওয়েবসাইটের ফ্রি অডিট রিপোর্ট পেতে পারি?',
      answer: 'হ্যাঁ! আমাদের "ফ্রি অডিট নিন" সেকশনে গিয়ে আপনার ফেসবুক পেজ বা ওয়েবসাইটের লিংক দিলে আমাদের অভিজ্ঞ টিম সেটি সম্পূর্ণ বিনামূল্যে পর্যালোচনা করে একটি চমৎকার অ্যাকশনেবল রিপোর্ট প্রদান করবে, যেখানে আপনার কোথায় ল্যাকিং রয়েছে এবং কীভাবে বিক্রি বাড়াতে পারেন তা উল্লেখ থাকবে।'
    }
  ],
};

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'সাকিব আল হাসান',
    businessName: 'সাকিব’স কিচেন',
    phone: '01712345678',
    email: 'sakib.kitchen@gmail.com',
    websiteOrPage: 'facebook.com/sakibskitchenbd',
    serviceNeeded: 'Facebook Management',
    message: 'আমাদের ফেসবুক পেজ থেকে আরও ভালো কাস্টমার এনগেজমেন্ট চাই এবং প্রতি সপ্তাহে ৩টি ডিজাইন দরকার।',
    status: 'Pending',
    createdAt: '2026-07-16T14:30:00Z',
    source: 'Contact Form'
  },
  {
    id: 'lead-2',
    name: 'তানভীর আহমেদ',
    businessName: 'দেশী এক্সপ্রেস লিমিটেড',
    phone: '01911223344',
    email: 'info.deshiexpress@gmail.com',
    websiteOrPage: 'deshiexpressbd.com',
    serviceNeeded: 'Website Development',
    message: 'আমাদের লজিস্টিকস ব্যবসার জন্য একটি ফাস্ট বিজনেস ওয়েবসাইট দরকার যেখানে ট্র্যাকিং পোর্টাল থাকবে।',
    status: 'Contacted',
    createdAt: '2026-07-17T09:15:00Z',
    source: 'Free Audit'
  }
];
