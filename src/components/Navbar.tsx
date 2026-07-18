import { useState, useEffect } from 'react';
import { Menu, X, Rocket, LayoutDashboard, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onToggleAdmin: () => void;
  isAdminMode: boolean;
  branding: {
    logoText: string;
    logoHighlightText: string;
    logoSubText: string;
    logoImageUrl?: string;
  };
}

export default function Navbar({ onToggleAdmin, isAdminMode, branding }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav_home'), href: '#home' },
    { label: t('nav_services'), href: '#services' },
    { label: t('nav_why_us'), href: '#why-us' },
    { label: t('nav_portfolio'), href: '#portfolio' },
    { label: t('nav_packages'), href: '#packages' },
    { label: t('nav_free_audit'), href: '#free-audit' },
    { label: t('nav_contact'), href: '#contact' },
    { label: t('nav_faq'), href: '#faq' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[#05070c]/95 border-b border-white/5 shadow-lg backdrop-blur-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            {branding.logoImageUrl ? (
              <img
                src={branding.logoImageUrl}
                alt={branding.logoText || "B2bfiy"}
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain max-w-[150px] group-hover:scale-102 transition-transform"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agency-purple to-agency-pink flex items-center justify-center shadow-md shadow-agency-purple/25 group-hover:scale-105 transition-transform">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white font-display">
                    {branding.logoText || 'B2b'}<span className="text-agency-violet">{branding.logoHighlightText || 'fiy'}</span>
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-mono">
                    {branding.logoSubText || 'Digital Partner'}
                  </span>
                </div>
              </>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-agency-violet hover:after:w-full after:transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-bold">
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'bn'
                      ? 'bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  বাং
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                id="btn-admin-nav"
                onClick={onToggleAdmin}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  isAdminMode
                    ? 'bg-agency-pink text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{isAdminMode ? t('nav_landing_page') : t('nav_admin_panel')}</span>
              </button>

              <a
                id="cta-nav-button"
                href="#free-audit"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-lg group bg-gradient-to-br from-agency-purple to-agency-pink group-hover:from-agency-purple group-hover:to-agency-pink hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#05070c] rounded-md group-hover:bg-opacity-0">
                  {t('nav_get_free_audit')}
                </span>
              </a>
            </div>
          </div>

          {/* Mobile menu and Language switcher button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Language Switcher for Mobile */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-[10px] font-bold mr-1">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'bn'
                    ? 'bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-sm'
                    : 'text-gray-400'
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-sm'
                    : 'text-gray-400'
                }`}
              >
                EN
              </button>
            </div>

            <button
              id="mobile-admin-toggle"
              onClick={onToggleAdmin}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#05070c]/98 border-b border-white/5 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col space-y-3">
                <button
                  id="mobile-admin-action"
                  onClick={() => {
                    onToggleAdmin();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-semibold bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{isAdminMode ? t('nav_landing_page') : t('nav_admin_panel')}</span>
                </button>
                <a
                  id="mobile-cta-action"
                  href="#free-audit"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('nav_get_free_audit')}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

