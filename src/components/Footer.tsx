import React from 'react';
import { useApp } from './AppContext';
import { Link } from './Router';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageSquare } from 'lucide-react';

export default function Footer() {
  const { settings, services } = useApp();

  if (!settings) return null;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, url: settings.facebook, label: 'Facebook' },
    { icon: Instagram, url: settings.instagram, label: 'Instagram' },
    { icon: Linkedin, url: settings.linkedin, label: 'LinkedIn' },
    { icon: Youtube, url: settings.youtube, label: 'YouTube' }
  ].filter(s => s.url);

  // Take first 4 services or default
  const footerServices = services.length > 0 ? services : [
    { title: 'Website Development', id: 'web-dev' },
    { title: 'Graphic Design', id: 'graphic-design' },
    { title: 'Video Editing', id: 'video-editing' },
    { title: 'Social Media Management', id: 'social-media' }
  ];

  return (
    <footer className="bg-dark text-white border-t-4 border-primary">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: About Agency */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-extrabold text-xl text-white tracking-tighter">B</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">{settings.name}</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            {settings.defaultSeoDescription}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((s, idx) => {
              const Icon = s.icon;
              return (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg text-white border-b border-gray-800 pb-2">Quick Links</h4>
          <div className="grid grid-cols-1 gap-2.5 text-sm text-gray-400">
            <Link to="/" className="hover:text-primary hover:translate-x-1 transition-all">Home</Link>
            <Link to="/services" className="hover:text-primary hover:translate-x-1 transition-all">Services</Link>
            <Link to="/portfolio" className="hover:text-primary hover:translate-x-1 transition-all">Portfolio</Link>
            <Link to="/packages" className="hover:text-primary hover:translate-x-1 transition-all">Packages</Link>
            <Link to="/about" className="hover:text-primary hover:translate-x-1 transition-all">About Us</Link>
            <Link to="/contact" className="hover:text-primary hover:translate-x-1 transition-all">Contact</Link>
          </div>
        </div>

        {/* Col 3: Services */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg text-white border-b border-gray-800 pb-2">Our Services</h4>
          <div className="grid grid-cols-1 gap-2.5 text-sm text-gray-400">
            {footerServices.map((srv, idx) => (
              <Link
                key={idx}
                to="/services"
                className="hover:text-primary hover:translate-x-1 transition-all"
              >
                {srv.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg text-white border-b border-gray-800 pb-2">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-start gap-2.5 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{settings.phone}</span>
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-start gap-2.5 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{settings.email}</span>
              </a>
            )}
            {settings.address && (
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </div>
            )}
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-green-400 hover:text-green-500 transition-colors"
              >
                <MessageSquare size={16} className="text-green-400 mt-0.5 shrink-0" />
                <span>WhatsApp Inquiry Chat</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-neutral-950 text-gray-500 text-xs sm:text-sm py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span>
            © {currentYear} <strong>{settings.name}</strong>. All rights reserved. 
            {" "}Your business growth and digital solutions partner.
          </span>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
