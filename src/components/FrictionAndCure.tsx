import { motion } from 'motion/react';
import { FrictionAndCureSection } from '../types';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface FrictionAndCureProps {
  data: FrictionAndCureSection;
  onCtaClick: () => void;
}

export default function FrictionAndCure({ data, onCtaClick }: FrictionAndCureProps) {
  if (!data) return null;

  return (
    <section className="py-24 bg-[#05070c] relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agency-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: The Digital Friction */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider"
              >
                <span>{data.badgeFriction}</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-display max-w-2xl"
              >
                {data.titleFriction}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm sm:text-base leading-relaxed bangla-text max-w-2xl"
              >
                {data.descriptionFriction}
              </motion.p>
            </div>

            {/* Friction Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.frictionPoints?.map((point, idx) => (
                <motion.div
                  key={point.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="p-5 rounded-2xl bg-[#090d1a]/60 border border-white/5 hover:border-rose-500/20 hover:bg-[#0c1224]/80 transition-all flex items-start space-x-3 group"
                >
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1 group-hover:text-rose-400 transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed bangla-text">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: The Cure Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="rounded-3xl border border-agency-purple/20 bg-gradient-to-b from-[#0e1428] to-[#060a15] p-6 sm:p-10 shadow-2xl relative overflow-hidden group"
            >
              {/* Card top-right glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-agency-purple/10 rounded-full blur-2xl group-hover:bg-agency-purple/20 transition-all duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <span>{data.badgeCure}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-display">
                    {data.titleCure}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed bangla-text">
                    {data.descriptionCure}
                  </p>
                </div>

                {/* Solutions List */}
                <div className="space-y-3">
                  {data.curePoints?.map((point, idx) => (
                    <div key={point.id || idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-200 font-medium bangla-text">
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  id="btn-cure-cta"
                  onClick={onCtaClick}
                  className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-agency-purple to-agency-violet text-white font-bold text-sm tracking-wide shadow-lg shadow-agency-purple/20 hover:shadow-agency-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 border border-white/5 hover:border-white/15"
                >
                  <span>{data.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
