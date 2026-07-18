import { motion } from 'motion/react';
import { Sparkles, MessageSquareCode } from 'lucide-react';
import { SiteConfig } from '../types';

interface CTAProps {
  siteConfig: SiteConfig;
}

export default function CTA({ siteConfig }: CTAProps) {
  // Extract number digits from helpline string
  const rawHelpline = siteConfig.footer.helpline || '+৮৮০ ১৭০০-০০০০০০';
  // convert bangla or formatted number to pure english digits
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
  
  // ensure country code is prepended
  if (englishPhoneDigits.startsWith('0')) {
    englishPhoneDigits = '88' + englishPhoneDigits;
  } else if (englishPhoneDigits.startsWith('+')) {
    englishPhoneDigits = englishPhoneDigits.replace('+', '');
  } else if (!englishPhoneDigits.startsWith('88') && englishPhoneDigits.length === 10) {
    englishPhoneDigits = '880' + englishPhoneDigits;
  }

  const whatsappUrl = `https://wa.me/${englishPhoneDigits}?text=Hello%20${siteConfig.branding.logoText || 'B2bfiy'},%20I%20want%20to%20discuss%20about%20my%20business%20digital%20presence.`;

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#05070c]">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agency-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-tr from-[#0a0f1d] via-[#0d1326] to-[#0a0f1d] p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Accent decoration line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-agency-purple via-agency-pink to-agency-violet" />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            className="w-12 h-12 rounded-2xl bg-agency-purple/15 flex items-center justify-center text-agency-purple mx-auto mb-6 border border-agency-purple/20"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight font-display mb-6">
            আপনার ব্যবসাকে অনলাইনে আরও এক ধাপ এগিয়ে নিতে প্রস্তুত?
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 bangla-text">
            আজই আমাদের সাথে যোগাযোগ করুন এবং আপনার ব্যবসার জন্য সেরা ডিজিটাল সমাধান গ্রহণ করুন। আমাদের অভিজ্ঞ কন্সালটেন্ট আপনার প্রোডাক্ট ও সার্ভিস অ্যানালিসিস করে সম্পূর্ণ গাইডলাইন শেয়ার করবেন।
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <a
              id="cta-section-primary"
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white font-bold text-base shadow-xl shadow-agency-purple/25 hover:opacity-95 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 border border-white/5"
            >
              <span>ফ্রি কনসালটেশন</span>
            </a>

            <a
              id="cta-section-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/10 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquareCode className="w-5 h-5 shrink-0" />
              <span>WhatsApp-এ কথা বলুন</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
