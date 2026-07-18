import { useState } from 'react';
import { motion } from 'motion/react';
import { ServicePackage, SiteConfig } from '../types';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (pkg: ServicePackage) => void;
  packagesConfig: SiteConfig['packages'];
}

export default function Packages({ onSelectPackage, packagesConfig }: PackagesProps) {
  // Set Facebook Management as the default category to match the user's uploaded SMM packages first!
  const [activeCategory, setActiveCategory] = useState<string>('Facebook Management');

  const badgeText = packagesConfig.badge || 'ফ্লেক্সিবল সাবস্ক্রিপশন';
  const headingText = packagesConfig.heading || 'আপনার ব্যবসার জন্য সঠিক মাসিক গ্রোথ প্ল্যান বেছে নিন';
  const descriptionText = packagesConfig.description || 'প্রতিদিন কাস্টমার এনগেজমেন্ট এবং ব্র্যান্ড অথরিটি তৈরি করতে প্রফেশনাল গ্রাফিক্স এবং ডাইনামিক রিলস ডিজাইন।';
  const packagesList = packagesConfig.items || [];

  const categories = [
    { label: 'সোশ্যাল মিডিয়া গ্রোথ (SMM)', value: 'Facebook Management' },
    { label: 'ওয়েবসাইট ডেভেলপমেন্ট', value: 'Website Development' },
    { label: 'গ্রাফিক ডিজাইন', value: 'Graphic Design' },
    { label: 'ভিডিও এডিটিং', value: 'Video Editing' }
  ];

  const filteredPackages = packagesList.filter(pkg => pkg.category === activeCategory);

  const handleBrowseNext = () => {
    // Cycles categories when clicking the bottom link
    const currentIndex = categories.findIndex(cat => cat.value === activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex].value);
    
    // Smooth scroll back to top of packages section
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="packages" className="py-24 bg-[#05070c] relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>{badgeText}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight"
          >
            {headingText}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base bangla-text max-w-2xl mx-auto leading-relaxed"
          >
            {descriptionText}
          </motion.p>
        </div>

        {/* Category Tabs with enhanced micro-interactions */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              id={`tab-pkg-${cat.value.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border duration-300 ${
                activeCategory === cat.value
                  ? 'bg-gradient-to-r from-rose-500 to-agency-pink text-white border-rose-500 shadow-lg shadow-rose-500/25'
                  : 'bg-white/[0.02] text-gray-400 border-white/5 hover:text-white hover:bg-white/5 hover:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-[#090d1a]/40 rounded-3xl border border-white/5 max-w-lg mx-auto">
            <p className="bangla-text text-sm">এই ক্যাটাগরিতে কোনো প্যাকেজ নেই। অ্যাডমিন প্যানেল থেকে যোগ করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                id={`card-pkg-${pkg.id}`}
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[32px] p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 group ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-[#120f20] to-[#060810] border-rose-500 border-2 shadow-2xl shadow-rose-500/10 scale-[1.02] lg:scale-[1.03] z-10'
                    : 'bg-[#090d1a]/50 border-white/5 hover:border-white/15'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] sm:text-xs uppercase tracking-wider font-extrabold px-4 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                    সবচেয়ে জনপ্রিয়
                  </div>
                )}

                <div>
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight group-hover:text-rose-400 transition-colors uppercase">
                      {pkg.name}
                    </h3>
                  </div>
                  
                  {/* Pricing */}
                  <div className="flex items-baseline mb-6 border-b border-white/5 pb-6">
                    <span className="text-3xl sm:text-4.5xl font-black text-white tracking-tight font-display">
                      {pkg.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 font-medium ml-2 bangla-text">
                      / {pkg.billing || 'মাস'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    {(pkg.features || []).map((feat, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="bangla-text text-gray-300 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  id={`btn-select-pkg-${pkg.id}`}
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-rose-500 to-agency-pink text-white shadow-lg shadow-rose-500/30 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <span>{pkg.isPopular ? 'আপনার ব্যবসা বৃদ্ধি করুন' : 'প্যাকেজটি বেছে নিন'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Center aligned Browse Link below the packages exactly matching the photo */}
        <div className="flex justify-center mt-16">
          <motion.button
            id="btn-browse-other-packages"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={handleBrowseNext}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 border border-rose-500/15 hover:border-rose-500/30 text-xs sm:text-sm font-bold transition-all shadow-md group active:scale-95 duration-200"
          >
            <span>অন্যান্য ক্যাটাগরির (ওয়েবসাইট, গ্রাফিক ও ভিডিও) প্যাকেজ দেখুন</span>
            <ArrowRight className="w-4 h-4 text-rose-400 transition-transform group-hover:translate-x-1.5" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
