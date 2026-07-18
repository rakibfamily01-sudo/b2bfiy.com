import { motion } from 'motion/react';
import { TestimonialsSection } from '../types';
import { Star, Quote, Sparkles } from 'lucide-react';

interface TestimonialsProps {
  testimonialsConfig: TestimonialsSection;
}

export default function Testimonials({ testimonialsConfig }: TestimonialsProps) {
  if (!testimonialsConfig) return null;

  const badgeText = testimonialsConfig.badge || 'ক্লায়েন্টদের সফলতা';
  const headingText = testimonialsConfig.heading || 'আমাদের ক্লায়েন্টদের সফলতার গল্প';
  const descriptionText = testimonialsConfig.description || 'B2BFIY-এর সাথে যুক্ত হয়ে দেশের অনেক উদ্যোক্তা তাদের ব্যবসা ডিজিটালি সফলভাবে এগিয়ে নিয়ে যাচ্ছেন।';
  const list = testimonialsConfig.items || [];

  return (
    <section id="testimonials" className="py-24 bg-[#05070c] relative overflow-hidden">
      {/* Background soft ambient blur */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-agency-purple/[0.02] rounded-full blur-[130px] pointer-events-none" />

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

        {/* Testimonials Grid */}
        {list.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-[#090d1a]/40 rounded-3xl border border-white/5 max-w-lg mx-auto">
            <p className="bangla-text text-sm">কোনো রিভিউ যোগ করা হয়নি। অ্যাডমিন প্যানেল থেকে প্রথম রিভিউটি যোগ করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {list.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl p-6 sm:p-8 bg-[#090d1a]/40 border border-white/5 hover:border-rose-500/15 hover:bg-[#0c1224]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Quote decoration */}
                <div className="absolute top-6 right-6 text-rose-500/10 group-hover:text-rose-500/20 transition-colors pointer-events-none">
                  <Quote className="w-12 h-12 stroke-[1.5]" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Rating stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed bangla-text italic font-medium">
                    "{item.feedback}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-6 border-t border-white/5 mt-6">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.clientName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/20 group-hover:border-rose-500/40 transition-colors shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/20 to-agency-pink/20 flex items-center justify-center text-rose-400 font-bold font-mono border border-rose-500/10 shrink-0">
                      {item.clientName?.charAt(0) || 'C'}
                    </div>
                  )}
                  <div>
                    <h4 className="text-white text-sm font-bold tracking-tight">
                      {item.clientName}
                    </h4>
                    <p className="text-rose-400 text-xs font-semibold mt-0.5 font-mono">
                      {item.businessName}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
