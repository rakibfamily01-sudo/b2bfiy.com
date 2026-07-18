import { motion } from 'motion/react';
import { Users2, Clock, Palette, BadgePercent, HeartHandshake, Settings, Sparkles, LucideIcon } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhyChooseUsProps {
  whyChooseUsConfig: SiteConfig['whyChooseUs'];
}

const iconMap: Record<string, LucideIcon> = {
  Users2,
  Clock,
  Palette,
  BadgePercent,
  HeartHandshake,
  Settings
};

export default function WhyChooseUs({ whyChooseUsConfig }: WhyChooseUsProps) {
  const badgeText = whyChooseUsConfig.badge || 'আমাদের বৈশিষ্ট্য';
  const headingText = whyChooseUsConfig.heading || 'কেন B2bfiy বেছে নিবেন?';
  const descriptionText = whyChooseUsConfig.description || 'আমরা শুধু কাজ করে দেই না, বরং একটি বিশ্বস্ত পার্টনারশিপ তৈরি করে আপনার ব্যবসার প্রকৃত প্রবৃদ্ধি নিশ্চিত করি।';
  const reasons = whyChooseUsConfig.reasons || [];

  return (
    <section id="why-us" className="py-24 bg-[#03050a]/80 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-agency-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agency-pink/10 text-agency-pink text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <span>{badgeText}</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            {headingText}
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed bangla-text">
            {descriptionText}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-agency-pink to-agency-purple mx-auto mt-4 rounded-full" />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.iconName] || Sparkles;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-2xl border border-white/5 bg-[#070b14] p-8 hover:border-white/10 hover:bg-[#090f1d] transition-all duration-300"
              >
                {/* Accent line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-agency-purple to-agency-pink group-hover:h-12 transition-all duration-300 rounded-r-full" />

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-purple group-hover:bg-agency-purple/10 group-hover:border-agency-purple/20 transition-all mb-6">
                  <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>

                {/* Heading */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-agency-purple transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed bangla-text">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
