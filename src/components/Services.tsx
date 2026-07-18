import { motion } from 'motion/react';
import { Layout, Palette, Video, Share2, Check, ArrowUpRight, Sparkles, LucideIcon } from 'lucide-react';
import { SiteConfig } from '../types';

interface ServicesProps {
  onSelectService: (service: string) => void;
  servicesConfig: SiteConfig['services'];
}

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Palette,
  Video,
  Share2
};

export default function Services({ onSelectService, servicesConfig }: ServicesProps) {
  const badgeText = servicesConfig.badge || 'আমাদের সার্ভিসসমূহ';
  const headingText = servicesConfig.heading || 'আমরা আপনার ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সমাধান প্রদান করি';
  const servicesList = servicesConfig.list || [];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-transparent to-[#080d1a]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agency-purple/10 text-agency-purple text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <span>{badgeText}</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            {headingText}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-agency-purple to-agency-pink mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const Icon = iconMap[service.iconName] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/5 bg-[#0a0f1d] p-8 hover:border-white/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={{
                  boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.5)`
                }}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color || 'from-blue-500 to-indigo-600'} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 blur-2xl rounded-full`} />

                <div>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color || 'from-blue-500 to-indigo-600'} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/30`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center group-hover:text-agency-purple transition-colors">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 bangla-text">
                    {service.description}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-white/5 pt-6 mb-8">
                    {(service.bullets || []).map((bullet, bIndex) => (
                      <div key={bIndex} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-300">
                        <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action inside card */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-agency-purple hover:to-agency-violet hover:text-white text-gray-300 font-semibold text-sm transition-all flex items-center justify-center space-x-1 border border-white/5 hover:border-white/10"
                >
                  <span>সার্ভিসটি বেছে নিন</span>
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
