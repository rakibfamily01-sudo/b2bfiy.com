import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactView() {
  const { settings, refreshData } = useApp();

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: 'General Enquiry',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (!settings) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactForm.name.trim() || !contactForm.whatsapp.trim()) {
      setFormError('Please enter both your name and WhatsApp number!');
      return;
    }

    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess('Your message has been sent successfully! Our customer relations team will contact you on WhatsApp within 24 hours.');
        setContactForm({
          name: '',
          email: '',
          whatsapp: '',
          subject: 'General Enquiry',
          message: ''
        });
        refreshData();
      } else {
        setFormError(data.error || 'Sorry, something went wrong. Please try again.');
      }
    } catch (err) {
      setFormError('Failed to connect to server. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-gradient-to-b from-warm to-white py-16 px-6 text-center border-b border-warm-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-widest">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-none">
            Get in Touch with B2bfiy
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            We are here to help scale your business. Contact us today to discuss your custom project ideas.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col Contact Info Card */}
        <div className="lg:col-span-5 space-y-8 bg-warm/40 border border-warm-border p-8 rounded-3xl">
          <div className="space-y-3">
            <h3 className="font-extrabold text-xl text-dark">Our Contact Info</h3>
            <p className="text-xs text-muted font-bold leading-relaxed">
              Feel free to visit our office or reach out to us via Email/WhatsApp support.
            </p>
          </div>

          <div className="space-y-6">
            {settings.phone && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-warm-border text-primary flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-dark uppercase tracking-wider">Call Us (Hotline)</h4>
                  <a href={`tel:${settings.phone}`} className="text-sm font-semibold text-muted block mt-1 hover:text-primary">
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}

            {settings.email && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-warm-border text-primary flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-dark uppercase tracking-wider">Email Us</h4>
                  <a href={`mailto:${settings.email}`} className="text-sm font-semibold text-muted block mt-1 hover:text-primary">
                    {settings.email}
                  </a>
                </div>
              </div>
            )}

            {settings.address && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-warm-border text-primary flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-dark uppercase tracking-wider">Office Address</h4>
                  <span className="text-sm font-semibold text-muted block mt-1 leading-normal">
                    {settings.address}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-warm-border text-primary flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-dark uppercase tracking-wider">Business Hours</h4>
                <span className="text-sm font-semibold text-muted block mt-1 leading-normal">
                  Saturday - Thursday: 10:00 AM - 08:00 PM (Friday Closed)
                </span>
              </div>
            </div>
          </div>

          {settings.whatsapp && (
            <div className="pt-6 border-t border-warm-border">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/10 transition-all"
              >
                <MessageSquare size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Col Message Form */}
        <div className="lg:col-span-7 bg-white border border-warm-border rounded-3xl p-6 sm:p-10 shadow-lg">
          <h3 className="font-extrabold text-2xl text-dark mb-1">Drop Us a Message</h3>
          <p className="text-xs text-muted font-bold mb-6">Our support team will get back to you with professional solutions as soon as possible.</p>
          
          {formSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 text-xs sm:text-sm font-semibold rounded-xl border border-green-200">
              {formSuccess}
            </div>
          )}

          {formError && (
            <div className="mb-6 p-4 bg-red-50 text-primary text-xs sm:text-sm font-semibold rounded-xl border border-primary/20">
              {formError}
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+88017XXXXXXXX"
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Subject</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Website Quote">Website Quote</option>
                  <option value="Design & Video Content">Design & Video Content</option>
                  <option value="Monthly Retainer Partnership">Monthly Retainer Partnership</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Write your proposal or inquiry in detail here..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-primary text-white hover:bg-primary-coral font-bold py-4 rounded-xl shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {formLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
