import { useState, useEffect } from 'react';
import { Menu, X, Rocket, LayoutDashboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onToggleAdmin: () => void;
  isAdminMode: boolean;
  branding: {
    logoText: string;
    logoHighlightText: string;
    logoSubText: string;
  };
}

export default function Navbar({ onToggleAdmin, isAdminMode, branding }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'হোম', href: '#home' },
    { label: 'সার্ভিসসমূহ', href: '#services' },
    { label: 'কেন আমরা', href: '#why-us' },
    { label: 'কাজসমূহ', href: '#portfolio' },
    { label: 'প্যাকেজ', href: '#packages' },
    { label: 'ফ্রি অডিট', href: '#free-audit' },
    { label: 'যোগাযোগ', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
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
                <span>{isAdminMode ? 'Landing Page' : 'Admin Panel'}</span>
              </button>

              <a
                id="cta-nav-button"
                href="#free-audit"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold text-white rounded-lg group bg-gradient-to-br from-agency-purple to-agency-pink group-hover:from-agency-purple group-hover:to-agency-pink hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
                style={{ marginBottom: 0, marginRight: 0 }}
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#05070c] rounded-md group-hover:bg-opacity-0">
                  ফ্রি অডিট নিন
                </span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
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
                  <span>{isAdminMode ? 'Landing Page-এ ফিরে যান' : 'Admin Panel (English)'}</span>
                </button>
                <a
                  id="mobile-cta-action"
                  href="#free-audit"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-agency-purple to-agency-pink text-white shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ফ্রি অডিট নিন</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
