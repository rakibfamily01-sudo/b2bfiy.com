import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { Send, Check, ShieldCheck, HelpCircle } from 'lucide-react';

export default function FreeAuditView() {
  const { refreshData } = useApp();

  // Form states
  const [auditForm, setAuditForm] = useState({
    fullName: '',
    businessName: '',
    email: '',
    whatsapp: '',
    url: '',
    service: 'Website Development',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Parse package pre-select if any from query params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedPkg = params.get('package');
    const selectedSrv = params.get('service');
    
    if (selectedPkg) {
      setAuditForm(prev => ({
        ...prev,
        message: `I am interested in getting more information about your "${selectedPkg}" package.`
      }));
    } else if (selectedSrv) {
      setAuditForm(prev => ({
        ...prev,
        service: selectedSrv,
        message: `I would like to request a free digital presence audit for the "${selectedSrv}" service.`
      }));
    }
  }, []);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auditForm.fullName.trim() || !auditForm.whatsapp.trim()) {
      setFormError('Please enter both your name and WhatsApp number!');
      return;
    }

    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const res = await fetch('/api/audit-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess('Your free audit request has been successfully submitted! Our team will contact you on WhatsApp with your analysis PDF within 24 hours.');
        setAuditForm({
          fullName: '',
          businessName: '',
          email: '',
          whatsapp: '',
          url: '',
          service: 'Website Development',
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
            Free Strategy Audit
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-none">
            Get Your Free Digital Presence Audit
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            No hidden fees or strings attached! We will identify bottlenecks on your current Facebook page, website, or landing pages and send you a custom growth report via WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Form content split */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-dark">What do we analyze in this audit?</h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed font-semibold">
              Our experienced design, development, and media buying specialists will review your brand's digital presence:
            </p>
          </div>

          <div className="space-y-5">
            {[
              { title: "Website Speed & SEO Optimization", desc: "Checking mobile speed scores, meta tags structure, and UX bottlenecks." },
              { title: "Social Media Branding Consistency", desc: "Analyzing the professionalism of your social graphics, layouts, and copy copywrites." },
              { title: "Video Hook & Viewer Retention", desc: "Screening hooks, transition quality, and pacing for high retention Reels/Shorts." },
              { title: "Ad Campaigns & Conversion Funnels", desc: "Providing tips on how to lower your acquisition costs and maximize ROI." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-soft-red text-primary font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-dark">{item.title}</h4>
                  <p className="text-muted text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-warm border border-warm-border p-6 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-sm text-dark flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              <span>Your Data is 100% Protected</span>
            </h4>
            <p className="text-xs text-muted leading-relaxed font-bold">
              We never request passwords, logins, or personal data. We only need your public links or URLs to evaluate your presence.
            </p>
          </div>
        </div>

        {/* Right Form box */}
        <div className="lg:col-span-7 bg-white border border-warm-border rounded-3xl p-6 sm:p-10 shadow-lg relative">
          <h3 className="font-extrabold text-2xl text-dark mb-1">Apply for Free Audit</h3>
          <p className="text-xs text-muted font-bold mb-6">Please fill in your details accurately. Red asterisks (*) represent mandatory fields.</p>
          
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

          <form onSubmit={handleAuditSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={auditForm.fullName}
                  onChange={(e) => setAuditForm({ ...auditForm, fullName: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Business Name</label>
                <input
                  type="text"
                  placeholder="Fitstep BD"
                  value={auditForm.businessName}
                  onChange={(e) => setAuditForm({ ...auditForm, businessName: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={auditForm.email}
                  onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+88017XXXXXXXX"
                  value={auditForm.whatsapp}
                  onChange={(e) => setAuditForm({ ...auditForm, whatsapp: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Website or Facebook Page URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/mybusiness"
                value={auditForm.url}
                onChange={(e) => setAuditForm({ ...auditForm, url: e.target.value })}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Service Focus</label>
              <select
                value={auditForm.service}
                onChange={(e) => setAuditForm({ ...auditForm, service: e.target.value })}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
              >
                <option value="Website Development">Website Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Social Media Management">Social Media Management</option>
                <option value="All-in-one Growth">All-in-one Growth</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark uppercase">Message</label>
              <textarea
                rows={4}
                placeholder="Briefly describe your business challenges, current bottlenecks, and goals..."
                value={auditForm.message}
                onChange={(e) => setAuditForm({ ...auditForm, message: e.target.value })}
                className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-primary text-white hover:bg-primary-coral font-bold py-4 rounded-xl shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {formLoading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Get My Free Audit</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
