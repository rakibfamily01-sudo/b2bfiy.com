import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem, SiteConfig } from '../types';
import { Eye, X, Globe, Video, ExternalLink } from 'lucide-react';

interface PortfolioProps {
  portfolioConfig: SiteConfig['portfolio'];
}

export default function Portfolio({ portfolioConfig }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const badgeText = portfolioConfig.badge || 'পোর্টফোলিও';
  const headingText = portfolioConfig.heading || 'আমাদের সাম্প্রতিক কাজ';
  const descriptionText = portfolioConfig.description || 'আমাদের করা Website, Graphic Design, Video Editing এবং Facebook Management প্রজেক্টগুলো দেখে নিন।';
  const portfolioItems = portfolioConfig.items || [];

  const categories = [
    { label: 'সব কাজ', value: 'All' },
    { label: 'Website Development', value: 'Website Development' },
    { label: 'Graphic Design', value: 'Graphic Design' },
    { label: 'Video Editing', value: 'Video Editing' },
    { label: 'Facebook Management', value: 'Facebook Management' }
  ];

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agency-pink/10 text-agency-pink text-xs font-semibold uppercase mb-3">
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              {headingText}
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base bangla-text">
              {descriptionText}
            </p>
          </div>

          <button
            id="btn-portfolio-all"
            onClick={() => setActiveFilter('All')}
            className="mt-4 md:mt-0 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all border border-white/10 flex items-center space-x-2 self-start md:self-auto"
          >
            <span>সব কাজ দেখুন</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat.value
                  ? 'bg-agency-purple text-white shadow-lg shadow-agency-purple/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#0a0f1d] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer shadow-xl shadow-black/40"
              >
                {/* Image Wrap */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-[#05070c]/90 border border-white/10 text-agency-pink">
                    {item.category}
                  </span>

                  {/* Video indicator overlay */}
                  {item.videoLink && (
                    <span className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-red-600/90 border border-white/10 text-white flex items-center justify-center">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  )}

                  {/* Hover Eye Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="p-3.5 rounded-full bg-agency-purple text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-agency-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 bangla-text">
                    {item.description}
                  </p>
                  
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl rounded-2xl bg-[#0d1222] border border-white/10 p-6 sm:p-8 overflow-hidden z-10 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Media */}
                <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-6 relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Category & Title */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-agency-purple/10 text-agency-purple border border-agency-purple/20">
                    {selectedItem.category}
                  </span>
                  {selectedItem.videoLink && (
                    <a
                      href={selectedItem.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-600/30 flex items-center space-x-1 hover:bg-red-600/30 transition-colors"
                    >
                      <Video className="w-3 h-3" />
                      <span>ভিডিও লিংক</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 mb-3">
                  {selectedItem.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 bangla-text">
                  {selectedItem.description}
                </p>

                {/* Footer details */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-500 uppercase tracking-wider font-mono text-[10px]">Client</span>
                    <span className="text-white font-medium">{selectedItem.clientName || 'Bangladesh Brand'}</span>
                  </div>
                  {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                    <div>
                      <span className="block text-gray-500 uppercase tracking-wider font-mono text-[10px]">Stack Used</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedItem.technologies.map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action */}
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-agency-purple/20"
                >
                  <Globe className="w-4 h-4" />
                  <span>অনুরূপ প্রজেক্ট অর্ডার করুন</span>
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
