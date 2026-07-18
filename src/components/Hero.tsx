import { motion } from 'motion/react';
import { ArrowRight, FolderOpen, Flame, Users, CheckCircle, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  heroConfig: SiteConfig['hero'];
  branding: SiteConfig['branding'];
}

export default function Hero({ heroConfig, branding }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background blobs for depth */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-agency-purple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-agency-pink/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 mb-6 backdrop-blur-md shadow-inner"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide">{heroConfig.badgeText || '🚀 আপনার ব্যবসার ডিজিটাল পার্টনার'}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.2] font-display"
        >
          {heroConfig.heading || 'আপনার ব্যবসাকে অনলাইনে আরও শক্তিশালী ও বিশ্বাসযোগ্য করে তুলুন'}{' '}
          <span className="block mt-2 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-agency-purple via-purple-400 to-agency-pink">
            {heroConfig.highlight || '"ডিজিটাল উপস্থিতি"'}
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-agency-violet/30 rounded-full -z-10" />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed bangla-text"
        >
          {heroConfig.description || (
            <>
              <strong className="text-white">{branding.logoText || 'B2bfiy'}</strong> আপনার ব্যবসার জন্য <span className="text-white font-semibold">Professional Website</span>, <span className="text-white font-semibold">Graphic Design</span>, <span className="text-white font-semibold">Video Editing</span> এবং <span className="text-white font-semibold">Facebook Page Management</span> সার্ভিস প্রদান করে, যাতে আপনার ব্যবসা আরও বেশি মানুষের কাছে পৌঁছাতে পারে এবং বিক্রি বৃদ্ধি পায়।
            </>
          )}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <a
            id="hero-primary-cta"
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white font-semibold text-base shadow-xl shadow-agency-purple/20 hover:opacity-95 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 border border-white/10 group"
          >
            <span>{heroConfig.primaryCtaText || '👉 ফ্রি কনসালটেশন নিন'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            id="hero-secondary-cta"
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-base border border-white/10 backdrop-blur-sm transition-all flex items-center justify-center space-x-2"
          >
            <FolderOpen className="w-5 h-5 text-agency-pink" />
            <span>{heroConfig.secondaryCtaText || '📂 আমাদের কাজ দেখুন'}</span>
          </a>
        </motion.div>

        {/* Trust Indicators / Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/5 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-agency-purple">
              <Flame className="w-5 h-5" />
              <span className="text-2xl font-bold font-display text-white">{heroConfig.stats.projectsCount || '২৫০+'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{heroConfig.stats.projectsLabel || 'সফল প্রজেক্ট'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-agency-pink">
              <Users className="w-5 h-5" />
              <span className="text-2xl font-bold font-display text-white">{heroConfig.stats.clientsCount || '১২০+'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{heroConfig.stats.clientsLabel || 'সন্তুষ্ট দেশীয় ক্লায়েন্ট'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-purple-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-2xl font-bold font-display text-white">{heroConfig.stats.deliveryRate || '৯৯%'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{heroConfig.stats.deliveryLabel || 'সময়মতো ডেলিভারি'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-2xl font-bold font-display text-white">{heroConfig.stats.supportHours || '২৪/৭'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{heroConfig.stats.supportLabel || 'ডেডিকেটেড সাপোর্ট'}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
