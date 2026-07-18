import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhatsAppWidgetProps {
  siteConfig: SiteConfig;
}

export default function WhatsAppWidget({ siteConfig }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Extract number digits from helpline string
  const rawHelpline = siteConfig.footer.helpline || '+৮৮০ ১৭০০-০০০০০০';
  
  // Convert bangla or formatted number to pure english digits
  const banglaDigitsMap: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  
  let englishPhoneDigits = '';
  for (let char of rawHelpline) {
    if (banglaDigitsMap[char]) {
      englishPhoneDigits += banglaDigitsMap[char];
    } else if (/[0-9]/.test(char)) {
      englishPhoneDigits += char;
    }
  }

  // Fallback if empty
  if (!englishPhoneDigits) {
    englishPhoneDigits = '8801700000000';
  }
  
  // Ensure country code is prepended
  if (englishPhoneDigits.startsWith('0')) {
    englishPhoneDigits = '88' + englishPhoneDigits;
  } else if (englishPhoneDigits.startsWith('+')) {
    englishPhoneDigits = englishPhoneDigits.replace('+', '');
  } else if (!englishPhoneDigits.startsWith('88') && englishPhoneDigits.length === 10) {
    englishPhoneDigits = '880' + englishPhoneDigits;
  }

  const whatsappUrl = `https://wa.me/${englishPhoneDigits}?text=Hello%20${encodeURIComponent(siteConfig.branding.logoText || 'B2bfiy')},%20I%20want%20to%20discuss%20about%20my%20business%20digital%20presence.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 w-76 sm:w-85 rounded-2xl bg-[#0b101f]/95 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden text-left"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.628 1.97 14.166.945 11.54.945 6.105.945 1.683 5.315 1.679 10.746c-.001 1.764.463 3.49 1.345 5.021l-.993 3.626 3.725-.977-.109-.09zm10.995-7.531c-.301-.151-1.781-.879-2.056-.979-.275-.1-.475-.151-.675.151-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.487-.893-.797-1.495-1.782-1.67-2.083-.175-.3-.019-.462.131-.611.135-.134.301-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.228-.244-.589-.493-.51-.675-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.075-.275.3-.675 1.228-.675 2.5 0 1.275.925 2.5 1.05 2.675.125.175 1.821 2.78 4.41 3.896.616.265 1.096.424 1.47.542.618.197 1.18.169 1.625.1.496-.076 1.78-.729 2.03-1.433.25-.704.25-1.306.175-1.433-.075-.125-.275-.201-.575-.351z"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0b101f] rounded-full animate-ping" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0b101f] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">B2bfiy Support</h4>
                  <p className="text-[10px] text-emerald-100 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full mr-1.5 animate-pulse" />
                    Online (সহায়তার জন্য প্রস্তুত)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <div className="p-4 bg-black/20 space-y-3">
              <div className="bg-white/5 rounded-2xl p-3 text-xs leading-relaxed text-gray-200 border border-white/5 bangla-text">
                আসসালামু আলাইকুম! <strong>{siteConfig.branding.logoText || 'B2bfiy'}</strong> এ আপনাকে স্বাগতম। <br />
                আপনার ব্যবসা বাড়াতে আমাদের সার্ভিস সম্পর্কে জানতে অথবা ফ্রি কনসালটেশন পেতে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।
              </div>
              <div className="text-[9px] text-gray-500 text-right uppercase tracking-wider font-mono">
                Reply time: Customary Instant
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-3 bg-black/40 border-t border-white/5 flex justify-end">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer group"
              >
                <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip Callout */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 mr-1 w-64 bg-emerald-950/90 border border-emerald-500/20 text-emerald-100 text-xs py-2 px-3 rounded-xl shadow-xl backdrop-blur-md bangla-text text-left flex items-center justify-between"
          >
            <span>যেকোনো প্রয়োজনে আমাদের <strong>হোয়াটসঅ্যাপে</strong> নক দিন!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-emerald-400 hover:text-emerald-200 ml-1.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Circle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 cursor-pointer border border-emerald-500/30 relative group focus:outline-none"
        aria-label="Contact on WhatsApp"
      >
        {/* Radar Ring Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping opacity-75 group-hover:opacity-100" />
        
        {/* WhatsApp Icon */}
        <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.628 1.97 14.166.945 11.54.945 6.105.945 1.683 5.315 1.679 10.746c-.001 1.764.463 3.49 1.345 5.021l-.993 3.626 3.725-.977-.109-.09zm10.995-7.531c-.301-.151-1.781-.879-2.056-.979-.275-.1-.475-.151-.675.151-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.487-.893-.797-1.495-1.782-1.67-2.083-.175-.3-.019-.462.131-.611.135-.134.301-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.228-.244-.589-.493-.51-.675-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.075-.275.3-.675 1.228-.675 2.5 0 1.275.925 2.5 1.05 2.675.125.175 1.821 2.78 4.41 3.896.616.265 1.096.424 1.47.542.618.197 1.18.169 1.625.1.496-.076 1.78-.729 2.03-1.433.25-.704.25-1.306.175-1.433-.075-.125-.275-.201-.575-.351z"/>
        </svg>
      </motion.button>
    </div>
  );
}
