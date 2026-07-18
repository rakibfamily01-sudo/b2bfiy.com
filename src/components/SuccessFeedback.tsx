import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, X, MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'audit' | 'contact';
  name: string;
}

export function SuccessModal({ isOpen, onClose, type, name }: SuccessModalProps) {
  const { language } = useLanguage();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleWhatsAppInstantChat = () => {
    const text = language === 'en'
      ? `Hello B2bfiy team! I just submitted a ${type === 'audit' ? 'Free Audit' : 'Contact Form'} request under the name "${name}". I would like to get an instant update.`
      : `আসসালামু আলাইকুম B2bfiy টিম! আমি "${name}" নামে একটি ${type === 'audit' ? 'ফ্রি অডিট' : 'যোগাযোগ ফর্ম'} সাবমিট করেছি। আমি দ্রুত আপডেট পেতে চাচ্ছি।`;
    
    const encodedText = encodeURIComponent(text);
    // Use the official WhatsApp number for b2bfiy (can use a generic fallback if needed, but let's route to the dynamic config-based number if possible, or +8801700000000)
    window.open(`https://wa.me/8801700000000?text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#03050a]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { type: 'spring', damping: 25, stiffness: 350 }
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#080c16]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl z-10"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-agency-purple/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-agency-pink/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Visual Icon Section */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                {/* Visual rings pulsing */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"
                />
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                  className="absolute -top-1 -right-1 text-agency-pink"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-white tracking-tight font-display mb-2">
                {language === 'en' ? 'Submission Received!' : 'সাবমিট সম্পন্ন হয়েছে!'}
              </h3>

              {/* Personalized greeting */}
              <p className="text-agency-pink font-semibold text-sm tracking-wide mb-4 uppercase font-mono">
                {language === 'en' ? `Thank you, ${name}!` : `ধন্যবাদ, ${name}!`}
              </p>

              {/* Content Description */}
              <div className="text-gray-300 text-sm space-y-4 max-w-sm mb-6 leading-relaxed bangla-text">
                {type === 'audit' ? (
                  <>
                    <p>
                      {language === 'en'
                        ? "Your digital page is successfully lined up for auditing! Our advanced analyzers and local strategists are studying your online performance right now."
                        : "আপনার পেজটি অডিট করার জন্য প্রস্তুত করা হয়েছে! আমাদের ডিজিটাল এনালিস্টরা এবং স্ট্র্যাটেজিস্টরা এখনই আপনার অনলাইন পারফরম্যান্স খতিয়ে দেখছেন।"}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/5 px-3 py-2 rounded-xl border border-emerald-500/10 justify-center">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>
                        {language === 'en'
                          ? 'Report is successfully saved under your session.'
                          : 'অডিট রিপোর্টটি আপনার ব্রাউজার সেশনে সেভ করা হয়েছে।'}
                      </span>
                    </div>
                  </>
                ) : (
                  <p>
                    {language === 'en'
                      ? 'We have received your custom requirements and business goals. A dedicated B2bfiy tech lead is preparing a tailored strategy for you.'
                      : 'আমরা আপনার কাস্টম রিকোয়ারমেন্ট এবং লক্ষ্যসমূহ পেয়েছি। একজন অভিজ্ঞ B2bfiy টেক লিড আপনার ব্যবসার জন্য একটি উপযুক্ত স্ট্র্যাটেজি ডিজাইন করছেন।'}
                  </p>
                )}

                <div className="flex items-center space-x-2.5 text-xs text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5 justify-center">
                  <PhoneCall className="w-4 h-4 text-agency-purple shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'We will connect with you via WhatsApp/Call within 1 hour!'
                      : 'আমরা ১ ঘণ্টার মধ্যে আপনার সাথে হোয়াটসঅ্যাপ/ফোনে সরাসরি যোগাযোগ করব!'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-3">
                <button
                  onClick={handleWhatsAppInstantChat}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-emerald-600/25 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>{language === 'en' ? 'Get Instant WhatsApp Support' : 'হোয়াটসঅ্যাপে দ্রুত নক করুন'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-xs transition-colors border border-white/10 cursor-pointer"
                >
                  {language === 'en' ? 'Awesome, Got It' : 'ঠিক আছে, ধন্যবাদ'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  type: 'audit' | 'contact';
  name: string;
}

export function SuccessToast({ isVisible, onClose, type, name }: SuccessToastProps) {
  const { language } = useLanguage();

  // Auto close timer
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, x: 30, transition: { duration: 0.2 } }}
          className="fixed top-24 right-4 sm:right-6 z-50 w-full max-w-sm rounded-2xl border border-emerald-500/20 bg-[#090d19]/90 p-4 shadow-xl backdrop-blur-md overflow-hidden"
        >
          {/* Animated shrinking loading line at bottom */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 bg-emerald-500"
          />

          <div className="flex items-start space-x-3">
            {/* Left Visual Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            {/* Content Text */}
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                {type === 'audit' 
                  ? (language === 'en' ? 'Audit Request Received' : 'অডিট রিকোয়েস্ট প্রাপ্তি') 
                  : (language === 'en' ? 'Inquiry Submitted' : 'তথ্যাদি সাবমিট সম্পন্ন')}
              </span>
              <p className="text-sm font-bold text-white mt-0.5 truncate">
                {language === 'en' ? `Lead Saved: ${name}` : `লিড সেভড: ${name}`}
              </p>
              <p className="text-xs text-gray-400 mt-1 bangla-text leading-relaxed">
                {language === 'en' 
                  ? 'Expert digital crew will connect within 1 hour.' 
                  : 'ডিজিটাল টিম ১ ঘণ্টার মধ্যে যোগাযোগ করবে।'}
              </p>
            </div>

            {/* Manual Dismiss Button */}
            <button
              onClick={onClose}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
