import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead, SiteConfig } from '../types';
import { Phone, Mail, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactProps {
  selectedService: string;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  resetSelection: () => void;
  siteConfig: SiteConfig;
}

export default function Contact({ selectedService, onAddLead, resetSelection, siteConfig }: ContactProps) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [service, setService] = useState('Website Development');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract Helpline raw value
  const rawHelpline = siteConfig.footer.helpline || '+৮৮০ ১৭০০-০০০০০০';
  const supportEmail = siteConfig.footer.email || 'info.b2bfiy@gmail.com';

  // convert bangla formatted number to pure english digits for link
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

  // Sync state if selectedService is passed from packages or services
  useEffect(() => {
    if (selectedService) {
      if (selectedService.toLowerCase().includes('web') || selectedService.toLowerCase().includes('সাইট')) {
        setService('Website Development');
      } else if (selectedService.toLowerCase().includes('design') || selectedService.toLowerCase().includes('গ্রাফিক')) {
        setService('Graphic Design');
      } else if (selectedService.toLowerCase().includes('video') || selectedService.toLowerCase().includes('ভিডিও')) {
        setService('Video Editing');
      } else if (selectedService.toLowerCase().includes('facebook') || selectedService.toLowerCase().includes('ফেসবুক')) {
        setService('Facebook Management');
      } else {
        setService(selectedService);
      }
      setMessage(`আমি আপনাদের "${selectedService}" প্যাকেজ/সার্ভিসটি সম্পর্কে বিস্তারিত জানতে আগ্রহী।`);
    }
  }, [selectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      businessName,
      phone,
      email,
      websiteOrPage: link,
      serviceNeeded: service,
      message,
      source: 'Contact Form'
    });

    setIsSubmitted(true);
    resetSelection();
  };

  const handleReset = () => {
    setName('');
    setBusinessName('');
    setPhone('');
    setEmail('');
    setLink('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#05070c] relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-agency-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-agency-purple/10 text-agency-purple text-xs font-semibold uppercase mb-3"
          >
            <span>যোগাযোগ করুন</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            আজই যোগাযোগ করুন
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base bangla-text">
            আপনার ব্যবসার জন্য কোন সার্ভিসটি সবচেয়ে উপযুক্ত জানতে চাইলে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Grid: Contact Info Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-6 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-agency-purple/10 flex items-center justify-center text-agency-purple shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest font-mono">মোবাইল নম্বর</span>
                <a href={`tel:${englishPhoneDigits}`} className="text-white hover:text-agency-purple font-semibold text-sm sm:text-base transition-colors mt-1 block font-mono">
                  {rawHelpline}
                </a>
                <span className="text-[11px] text-gray-400 block mt-0.5">শনিবার - বৃহস্পতিবার (সকাল ৯:০০ - রাত ৮:০০)</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-6 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-agency-pink/10 flex items-center justify-center text-agency-pink shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest font-mono">ইমেইল ঠিকানা</span>
                <a href={`mailto:${supportEmail}`} className="text-white hover:text-agency-pink font-semibold text-sm sm:text-base transition-colors mt-1 block">
                  {supportEmail}
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-6 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest font-mono">প্রধান কার্যালয়</span>
                <p className="text-white text-sm mt-1 bangla-text leading-relaxed">
                  উত্তরা মডেল টাউন, সেক্টর-১১,<br />ঢাকা-১২৩০, বাংলাদেশ।
                </p>
              </div>
            </div>

            {/* Micro Trust Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#111625] to-[#0a0e1a] border border-agency-purple/10 flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-agency-purple shrink-0" />
              <p className="text-xs text-gray-400 bangla-text leading-relaxed">
                আমাদের প্রতিনিধি সাধারণত সাবমিট করার <strong className="text-white">১ ঘণ্টার মধ্যে</strong> ফোনে যোগাযোগ করে থাকেন।
              </p>
            </div>
          </div>

          {/* Right Grid: Interactive Contact Form */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/5 bg-[#0a0f1d] p-6 sm:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">নাম *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="আপনার নাম"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">ব্যবসার নাম</label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="আপনার ব্যবসার নাম"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">মোবাইল নম্বর *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="উদা: 017xxxxxxxx"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">ইমেইল</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="উদা: yourname@gmail.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Website / Facebook Link</label>
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          placeholder="ফেসবুক পেজ লিংক বা ওয়েবসাইট"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">কোন সার্ভিস প্রয়োজন?</label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0d1222] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Facebook Management">Facebook Management</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">বার্তা</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="আপনার ব্যবসার লক্ষ্য বা কাঙ্ক্ষিত ডিজাইন সম্পর্কে লিখুন..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple resize-none"
                      />
                    </div>

                    <button
                      id="btn-submit-contact"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-agency-purple to-agency-violet text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-agency-purple/25 transition-all flex items-center justify-center space-x-2 border border-white/5 hover:border-white/10"
                    >
                      <Send className="w-4 h-4 animate-bounce" />
                      <span>সাবমিট করুন</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-display">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto mb-6 bangla-text leading-relaxed">
                      ধন্যবাদ! আপনার ক্যোয়ারীটি আমরা পেয়েছি। খুব শীঘ্রই B2bfiy-এর পক্ষ থেকে একজন কন্সালটেন্ট আপনার সাথে যোগাযোগ করবেন।
                    </p>
                    <button
                      id="btn-contact-reset"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-all"
                    >
                      নতুন বার্তা পাঠান
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
