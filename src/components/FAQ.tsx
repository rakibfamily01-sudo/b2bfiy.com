import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface FAQProps {
  faqs: SiteConfig['faqs'];
}

export default function FAQ({ faqs }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqList = faqs || [];

  return (
    <section id="faq" className="py-24 bg-[#070b14] relative">
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-agency-purple/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agency-purple/10 text-agency-purple text-xs font-semibold uppercase mb-3"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>প্রায় জিজ্ঞাসিত প্রশ্ন</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            প্রায় জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base bangla-text">
            B2bfiy-এর কাজের প্রক্রিয়া এবং সার্ভিস নিয়ে সাধারণ কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো।
          </p>
        </div>

        {/* Accordion List */}
        {faqList.length === 0 ? (
          <div className="text-center py-8 text-gray-400 bg-white/[0.01] border border-white/5 rounded-2xl">
            <p className="bangla-text">বর্তমানে কোনো প্রশ্ন নেই। অ্যাডমিন প্যানেল থেকে যোগ করুন।</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqList.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0d1325] border-agency-purple/30 shadow-lg'
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    id={`btn-faq-toggle-${index}`}
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-relaxed bangla-text pr-4">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full bg-white/5 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-agency-purple bg-agency-purple/10' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Box */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed bangla-text border-t border-white/5 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
