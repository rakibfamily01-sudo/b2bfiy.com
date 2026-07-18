import { Rocket, Facebook, Instagram, Linkedin, ShieldAlert } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  onToggleAdmin: () => void;
  isAdminMode: boolean;
  siteConfig: SiteConfig;
}

export default function Footer({ onToggleAdmin, isAdminMode, siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const branding = siteConfig.branding;
  const footerData = siteConfig.footer;

  return (
    <footer className="bg-[#03050a] border-t border-white/5 py-16 text-gray-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Bio Column */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <a href="#home" className="flex items-center space-x-2 group self-start">
              {branding.logoImageUrl ? (
                <img
                  src={branding.logoImageUrl}
                  alt={branding.logoText || "B2bfiy"}
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain max-w-[130px]"
                />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-agency-purple to-agency-pink flex items-center justify-center shadow-md">
                    <Rocket className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white font-display">
                    {branding.logoText || 'B2b'}<span className="text-agency-violet">{branding.logoHighlightText || 'fiy'}</span>
                  </span>
                </>
              )}
            </a>
            <p className="text-sm leading-relaxed bangla-text max-w-sm">
              {footerData.aboutText || 'আমরা Website Development, Graphic Design, Video Editing এবং Facebook Management সার্ভিসের মাধ্যমে বাংলাদেশের ছোট ও মাঝারি ব্যবসাকে ডিজিটালি এগিয়ে নিতে সহায়তা করি।'}
            </p>
            <div className="flex space-x-4">
              {footerData.facebookUrl && (
                <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-agency-purple hover:text-white transition-all text-gray-400">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {footerData.instagramUrl && (
                <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-agency-pink hover:text-white transition-all text-gray-400">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {footerData.linkedinUrl && (
                <a href={footerData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-gray-400">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">লিংকসমূহ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">আমাদের সার্ভিসসমূহ</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">সাম্প্রতিক কাজসমূহ</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">জনপ্রিয় প্যাকেজসমূহ</a></li>
              <li><a href="#free-audit" className="hover:text-white transition-colors">ফ্রি অডিট নিন</a></li>
            </ul>
          </div>

          {/* Support links */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">সাহায্য ও সহযোগিতা</h4>
            <p className="text-xs leading-relaxed bangla-text">
              যেকোনো ধরণের পরামর্শ বা প্রজেক্ট কোটেশন পেতে সরাসরি আমাদের মেইল করতে পারেন অথবা হোয়াটসঅ্যাপে নক দিতে পারেন।
            </p>
            {footerData.helpline && (
              <div className="pt-2">
                <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider">হেল্পলাইন</span>
                <span className="text-white font-semibold text-sm sm:text-base block mt-0.5">{footerData.helpline}</span>
              </div>
            )}
            {footerData.email && (
              <div className="pt-1">
                <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider">ইমেইল</span>
                <span className="text-white font-medium text-xs sm:text-sm block mt-0.5">{footerData.email}</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            &copy; {currentYear} {branding.logoText || 'B2b'}{branding.logoHighlightText || 'fiy'}. {footerData.copyrightText || 'All rights reserved. Designed for premium Bangladeshi agencies.'}
          </p>

          <div className="flex items-center space-x-4">
            {/* Direct Admin Control Trigger */}
            <button
              id="footer-admin-btn"
              onClick={onToggleAdmin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-agency-pink animate-pulse" />
              <span>{isAdminMode ? 'Landing Page' : 'Admin Panel (English)'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
