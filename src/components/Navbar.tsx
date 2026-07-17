import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useRouter, Link } from './Router';
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { settings, topbar, header, adminSession } = useApp();
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!settings) return null;

  // Active path check helper
  const isActive = (p: string) => {
    if (p === '/') return path === '/';
    return path.startsWith(p);
  };

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Packages', url: '/packages' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, url: settings.facebook },
    { icon: Instagram, url: settings.instagram },
    { icon: Linkedin, url: settings.linkedin },
    { icon: Youtube, url: settings.youtube }
  ].filter(s => s.url);

  return (
    <header className={`${header?.sticky ? 'sticky top-0 z-40' : ''} w-full transition-all duration-300`}>
      {/* 1. Slim Red Top Contact Bar */}
      {topbar?.enabled && (
        <div id="top-contact-bar" className="bg-primary text-white text-xs sm:text-sm py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-white/10 font-medium">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {topbar.phone && (
              <a href={`tel:${topbar.phone}`} className="flex items-center gap-1.5 hover:text-soft-red transition-colors">
                <Phone size={14} />
                <span>{topbar.phone}</span>
              </a>
            )}
            {topbar.email && (
              <a href={`mailto:${topbar.email}`} className="flex items-center gap-1.5 hover:text-soft-red transition-colors">
                <Mail size={14} />
                <span>{topbar.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((s, idx) => {
              const Icon = s.icon;
              return (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-soft-red hover:scale-110 transition-all p-0.5">
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Main Navigation Header */}
      <nav id="main-nav-bar" className="bg-white border-b border-warm-border py-4 px-4 sm:px-8 flex justify-between items-center shadow-xs">
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-coral flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl text-white tracking-tighter">B</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl text-dark tracking-tight leading-none group-hover:text-primary transition-colors">
              {header?.logo || settings.name}
            </span>
            <span className="text-[10px] text-muted font-bold tracking-widest uppercase leading-none mt-0.5">DIGITAL AGENCY</span>
          </div>
        </Link>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`text-sm xl:text-base font-semibold transition-colors duration-200 py-1 border-b-2 ${
                isActive(item.url)
                  ? 'text-primary border-primary'
                  : 'text-muted border-transparent hover:text-primary hover:border-primary/40'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side: CTA Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Edit shortcut if admin is logged in */}
          {adminSession?.authenticated && (
            <Link to="/admin" className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold bg-dark text-white px-2.5 py-1.5 rounded-md hover:bg-primary transition-all">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              Admin CMS
            </Link>
          )}

          {header?.ctaText && (
            <Link
              to={header.ctaUrl}
              className="hidden md:inline-flex items-center gap-1.5 bg-primary text-white hover:bg-primary-coral font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-primary/15 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>{header.ctaText}</span>
              <ArrowRight size={14} />
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-dark hover:text-primary hover:bg-warm rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] z-50 bg-white border-t border-warm-border flex flex-col p-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold p-3 rounded-xl transition-all ${
                  isActive(item.url)
                    ? 'text-primary bg-soft-red/60'
                    : 'text-dark hover:text-primary hover:bg-warm'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 border-t border-warm-border pt-6 flex flex-col gap-4">
            {header?.ctaText && (
              <Link
                to={header.ctaUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-primary text-white hover:bg-primary-coral font-bold py-3.5 rounded-xl shadow-lg shadow-primary/10 transition-all"
              >
                {header.ctaText}
              </Link>
            )}
            
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/10 transition-all"
              >
                <Phone size={18} />
                <span>WhatsApp Inquiry</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
