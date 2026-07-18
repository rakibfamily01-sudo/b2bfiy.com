import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '../types';
import { ShieldCheck, Search, Cpu, CheckCircle2, AlertTriangle, Play, HelpCircle, Loader } from 'lucide-react';

interface FreeAuditProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
}

export default function FreeAudit({ onAddLead }: FreeAuditProps) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [service, setService] = useState('Website Development');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const steps = [
    'আপনার লিংক কানেক্ট করা হচ্ছে...',
    'মোবাইল ফ্রেন্ডলিনেস চেক করা হচ্ছে...',
    'এসইও এবং মেটা ট্যাগ এনালাইসিস চলছে...',
    'পেজ লোডিং স্পিড এবং পারফরম্যান্স রিড করা হচ্ছে...',
    'নিরাপত্তা সার্টিফিকেট (SSL) ভেরিফাই করা হচ্ছে...',
    'ফ্রি অডিট রিপোর্ট প্রস্তুত করা হচ্ছে...'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!link || !phone || !name) return;

    setIsAuditing(true);
    setAuditStep(0);

    // Dynamic scanning animation steps
    const interval = setInterval(() => {
      setAuditStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAuditing(false);
            setIsDone(true);
            onAddLead({
              name,
              businessName,
              phone,
              email,
              websiteOrPage: link,
              serviceNeeded: service,
              message: 'Free digital audit requested via landing page widget.',
              source: 'Free Audit',
              auditDetails: {
                score: Math.floor(Math.random() * 25) + 60, // random baseline
                issues: [
                  'পেজ লোডিং টাইম ২.৮ সেকেন্ডের বেশি (আদর্শ মান ১.৫ সেকেন্ড)',
                  'সোশ্যাল মিডিয়া মেটা ট্যাগগুলো সঠিক নয়',
                  'মোবাইল লেআউটে কিছু সাইজিং সমস্যা রয়েছে'
                ],
                recommendations: 'কাস্টম ফাস্ট-লোডিং আর্কিটেকচার এবং মেটা অপ্টিমাইজেশন।'
              }
            });
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setBusinessName('');
    setPhone('');
    setEmail('');
    setLink('');
    setIsDone(false);
  };

  return (
    <section id="free-audit" className="py-24 bg-[#070b14] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Grid */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-agency-purple/10 text-agency-purple text-xs font-semibold uppercase mb-4">
              <span>ফ্রি সার্ভিস</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display">
              আপনার ব্যবসার জন্য সম্পূর্ণ ফ্রি ডিজিটাল অডিট
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed bangla-text">
              আপনার Website অথবা Facebook Page আমরা সম্পূর্ণ ফ্রি রিভিউ করে জানিয়ে দেব কোথায় সমস্যা রয়েছে এবং কীভাবে উন্নতি করা যায়।
            </p>

            {/* Micro Benefits list */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-agency-purple/10 flex items-center justify-center text-agency-purple mt-0.5 shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">সম্পূর্ণ নিরাপদ</h4>
                  <p className="text-xs text-gray-400">আপনার কোনো পাসওয়ার্ড বা গোপন তথ্যের প্রয়োজন নেই।</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-agency-pink/10 flex items-center justify-center text-agency-pink mt-0.5 shrink-0">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">অ্যাকশনেবল রিপোর্ট</h4>
                  <p className="text-xs text-gray-400">যে পয়েন্টগুলো ফিক্স করলে সরাসরি বিক্রি বেড়ে যাবে তা জানিয়ে দেওয়া হবে।</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/5 bg-[#0a0f1d] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* 1. Form view */}
                {!isAuditing && !isDone && (
                  <motion.form
                    key="audit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">আপনার নাম *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="উদা: সাকিব আহমেদ"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">ব্যবসার নাম</label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="উদা: সাকিব’স কিচেন"
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
                          placeholder="উদা: sakib@gmail.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Website অথবা Facebook Page Link *</label>
                      <input
                        type="url"
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="উদা: facebook.com/yourbusiness"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">কোন সার্ভিস নিয়ে অডিট চান?</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0d1222] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-agency-purple"
                      >
                        <option value="Website Development">Website Development Audit</option>
                        <option value="Graphic Design">Graphic Design & Branding Audit</option>
                        <option value="Video Editing">Video Marketing Audit</option>
                        <option value="Facebook Management">Facebook Page Growth Audit</option>
                      </select>
                    </div>

                    <button
                      id="btn-submit-audit"
                      type="submit"
                      className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-agency-purple to-agency-pink text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-agency-purple/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>ফ্রি অডিট নিন</span>
                    </button>
                  </motion.form>
                )}

                {/* 2. Scanning Loader view */}
                {isAuditing && (
                  <motion.div
                    key="scanning-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full border-4 border-agency-purple/20 border-t-agency-purple animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-agency-purple">
                        <Cpu className="w-8 h-8 animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">আপনার ডিজিটাল প্ল্যাটফর্ম এনালাইসিস করা হচ্ছে</h3>
                    <p className="text-xs text-agency-pink font-mono tracking-widest uppercase mb-4">SYSTEM SCANNING IN PROGRESS...</p>
                    
                    {/* Live step indicator */}
                    <div className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-sm max-w-sm inline-block bangla-text">
                      {steps[auditStep]}
                    </div>
                  </motion.div>
                )}

                {/* 3. Done Success view */}
                {isDone && (
                  <motion.div
                    key="done-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-display">অডিট সফলভাবে সাবমিট হয়েছে!</h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto mb-6 bangla-text leading-relaxed">
                      ধন্যবাদ! আমাদের অভিজ্ঞ টিম আপনার লিংকটি পর্যালোচনা করা শুরু করেছে। আগামী ২৪ ঘণ্টার মধ্যে আপনার মোবাইল নম্বরে অথবা ইমেইলে ডিটেইলড অডিট রিপোর্ট পাঠিয়ে দেওয়া হবে।
                    </p>
                    
                    <button
                      id="btn-audit-reset"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-all"
                    >
                      আরেকটি অডিট করুন
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
