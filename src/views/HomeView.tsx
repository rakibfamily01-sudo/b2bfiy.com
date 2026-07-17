import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { useRouter, Link } from '../components/Router';
import { 
  Check, ChevronDown, ChevronUp, Zap, Sliders, Award, Users, 
  ShieldCheck, Sparkles, Laptop, Palette, Video, Share2, 
  MessageCircle, Send, Star, ArrowUpRight, ArrowRight 
} from 'lucide-react';

export default function HomeView() {
  const { 
    settings, hero, statistics, clientLogos, services, whyChooseUs, 
    portfolioProjects, workProcess, packages, testimonials, faqs, refreshData 
  } = useApp();

  const { navigate } = useRouter();

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Form states for Free Digital Audit
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

  if (!settings || !hero) return (
    <div className="flex items-center justify-center min-h-screen bg-warm">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 border-t-2 border-primary animate-spin"></div>
        <p className="text-muted font-bold">Loading...</p>
      </div>
    </div>
  );

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Icon mapping helper
  const renderIcon = (name: string, className = "text-primary") => {
    switch (name.toLowerCase()) {
      case 'laptop': return <Laptop className={className} size={24} />;
      case 'palette': return <Palette className={className} size={24} />;
      case 'video': return <Video className={className} size={24} />;
      case 'share2': return <Share2 className={className} size={24} />;
      case 'users': return <Users className={className} size={24} />;
      case 'sliders': return <Sliders className={className} size={24} />;
      case 'award': return <Award className={className} size={24} />;
      case 'zap': return <Zap className={className} size={24} />;
      case 'sparkles': return <Sparkles className={className} size={24} />;
      case 'shield-check': return <ShieldCheck className={className} size={24} />;
      default: return <Sparkles className={className} size={24} />;
    }
  };

  // Handle audit form submission
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Zod-like local validation
    if (!auditForm.fullName.trim() || !auditForm.whatsapp.trim()) {
      setFormError('Please enter your name and WhatsApp number!');
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
        setFormSuccess('Your audit request has been submitted successfully! Our team will contact you soon.');
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
      setFormError('Failed to communicate with the server. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Get active pricing plans of type 'monthly'
  const monthlyPlans = packages.filter(p => p.published && p.type === 'monthly');
  // Featured/Featured projects limit to 3 for preview
  const featuredProjects = portfolioProjects
    .filter(p => p.status === 'published' && p.featured)
    .slice(0, 3);

  return (
    <div id="homepage-container" className="bg-white">
      
      {/* ==================================================
          8. HERO SECTION
          ================================================== */}
      {hero.visible && (
        <section className="relative overflow-hidden bg-gradient-to-b from-warm to-white py-16 lg:py-24 px-6 md:px-12 lg:px-20 border-b border-warm-border">
          {/* Decorative Curves / Lines in background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-soft-red/40 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-1.5 bg-soft-red text-primary font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full mb-6 uppercase tracking-wider animate-bounce">
                <Sparkles size={14} />
                <span>{hero.badge}</span>
              </span>

              {/* Headline with dynamic red highlight */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark mb-6 leading-tight">
                {/* Dynamically highlight specified keyword if present */}
                {hero.heading.includes(hero.highlightedText) ? (
                  <>
                    {hero.heading.split(hero.highlightedText)[0]}
                    <span className="text-primary underline decoration-primary-coral/30 decoration-4 underline-offset-4">
                      {hero.highlightedText}
                    </span>
                    {hero.heading.split(hero.highlightedText)[1]}
                  </>
                ) : (
                  hero.heading
                )}
              </h1>

              <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-medium">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to={hero.primaryCtaUrl}
                  className="bg-primary text-white hover:bg-primary-coral font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{hero.primaryCtaText}</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to={hero.secondaryCtaUrl}
                  className="bg-white border-2 border-primary text-primary hover:bg-soft-red font-bold text-base px-8 py-4 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{hero.secondaryCtaText}</span>
                </Link>
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-2 mt-8 text-xs sm:text-sm text-muted font-bold">
                <Check size={16} className="text-primary bg-soft-red p-0.5 rounded-full" />
                <span>{hero.trustText}</span>
              </div>
            </div>

            {/* Right Column: High Fidelity Floating Visual Graphics */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-[32px] bg-gradient-to-tr from-soft-red via-warm to-white p-6 border border-warm-border shadow-xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                {/* Fallback elegant UI preview box representing complete digital presence */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between bg-white border border-warm-border rounded-2xl p-5 shadow-lg">
                  {/* Mock browser header */}
                  <div className="flex items-center justify-between border-b border-warm-border pb-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <span className="text-[10px] font-mono text-muted">b2bfiy.com</span>
                    <span className="w-3"></span>
                  </div>

                  {/* Mock hero info */}
                  <div className="py-4 space-y-3">
                    <div className="h-4 w-2/3 bg-soft-red rounded-sm animate-pulse"></div>
                    <div className="h-8 w-full bg-dark rounded-md"></div>
                    <div className="h-3 w-4/5 bg-gray-200 rounded-sm"></div>
                  </div>

                  {/* Floating badge inside visual: website, social, video, design */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-warm border border-warm-border shadow-xs hover:scale-105 transition-transform">
                      <Laptop size={14} className="text-primary shrink-0" />
                      <span className="text-[10px] font-bold text-dark">Website</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-warm border border-warm-border shadow-xs hover:scale-105 transition-transform">
                      <Palette size={14} className="text-primary shrink-0" />
                      <span className="text-[10px] font-bold text-dark">Graphics</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-warm border border-warm-border shadow-xs hover:scale-105 transition-transform">
                      <Video size={14} className="text-primary shrink-0" />
                      <span className="text-[10px] font-bold text-dark">Video</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-warm border border-warm-border shadow-xs hover:scale-105 transition-transform">
                      <Share2 size={14} className="text-primary shrink-0" />
                      <span className="text-[10px] font-bold text-dark">Social Media</span>
                    </div>
                  </div>

                  {/* Growth stats box */}
                  <div className="mt-4 p-3 bg-primary text-white rounded-xl flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">MONTHLY CONVERSIONS</span>
                    <span className="font-extrabold text-sm">+240%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          9. SERVICE CATEGORY FLOATING CARDS (FLOATING CARD BAR)
          ================================================== */}
      <section className="relative z-20 -mt-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate('/services')}
              className="bg-white border border-warm-border p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                {renderIcon(srv.icon)}
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-dark mb-2 group-hover:text-primary transition-colors leading-tight">
                {srv.title.split(' (')[0]}
              </h3>
              <p className="text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {srv.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-bold mt-4 group-hover:underline">
                <span>View Details</span>
                <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* ==================================================
          10. TRUST & CLIENT LOGOS (CAROUSEL SLIDER)
          ================================================== */}
      {clientLogos.length > 0 && (
        <section className="py-12 px-6 max-w-7xl mx-auto border-b border-warm-border mt-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-muted mb-6">
            Trusted by Businesses We've Worked With
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="font-extrabold text-xl sm:text-2xl tracking-tighter text-gray-400 hover:text-dark transition-colors">
                {logo.logoUrl ? (
                  <img src={logo.logoUrl} alt={logo.name} className="h-8 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <span>{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ==================================================
          11. STATISTICS
          ================================================== */}
      {statistics.length > 0 && (
        <section className="bg-warm border-y border-warm-border py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-muted max-w-[150px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ==================================================
          12. STRUGGLE & SOLUTION SECTION
          ================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Problem */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold bg-soft-red text-primary px-3 py-1.5 rounded-full uppercase tracking-wider">
            Problem & Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-tight">
            Is Your Business Struggling to Stand Out Online?
          </h2>
          <p className="text-muted leading-relaxed font-medium">
            Standing out among thousands of competitors in today's digital era is incredibly difficult. Are you also facing these common challenges?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Slow, outdated, and unoptimized websites",
              "Inconsistent social media posts & scheduling",
              "Unprofessional graphics and poor design quality",
              "Low reach & low engagement video content",
              "Lack of a solid content marketing strategy",
              "No reliable design, tech or digital support team"
            ].map((prob, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-warm p-3.5 rounded-xl border border-warm-border">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></span>
                <span className="text-sm font-semibold text-dark">{prob}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Solution */}
        <div className="lg:col-span-6 bg-gradient-to-tr from-primary to-primary-coral text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            You Focus on Your Business. We Handle Your Digital Presence.
          </h3>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            B2bfiy acts as your on-demand dedicated creative team. We handle your entire digital marketing, graphic design, and technology operations so you can focus strictly on growing your business.
          </p>

          <div className="space-y-3 mb-8">
            {[
              "100% mobile-friendly & conversion-optimized websites",
              "Consistent engaging social media designs & moderator support",
              "Viral short-form video & reels editing services",
              "Dedicated account manager & weekly progress tracking"
            ].map((sol, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check size={16} className="bg-white text-primary p-0.5 rounded-full shrink-0" />
                <span className="text-xs sm:text-sm font-bold">{sol}</span>
              </div>
            ))}
          </div>

          <Link
            to="/free-audit"
            className="inline-flex items-center gap-1.5 bg-white text-primary hover:bg-soft-red font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all"
          >
            <span>Let's Grow Your Business</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>


      {/* ==================================================
          13. DETAILED SERVICES SECTION
          ================================================== */}
      <section className="bg-warm/50 border-y border-warm-border py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
              Everything Your Business Needs to Grow Online
            </h2>
            <p className="text-muted text-sm sm:text-base">
              All the essential services to strengthen your online presence and attract high-paying clients, under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white border border-warm-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-soft-red text-primary flex items-center justify-center shrink-0">
                    {renderIcon(srv.icon)}
                  </div>
                  <span className="text-xs font-bold text-muted bg-warm border border-warm-border px-2.5 py-1 rounded-full uppercase">
                    Core Service
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-dark mb-3">
                  {srv.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 font-medium">
                  {srv.description}
                </p>

                {srv.features && srv.features.length > 0 && (
                  <div className="border-t border-warm-border pt-6">
                    <h4 className="font-bold text-xs sm:text-sm text-dark mb-3 uppercase tracking-wider">Key Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check size={14} className="text-green-600 bg-green-50 p-0.5 rounded-full shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-muted">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-4">
                  <Link
                    to={`/free-audit?service=${encodeURIComponent(srv.title)}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    <span>Get Free Audit Consultation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================
          14. WHY CHOOSE B2BFIY BENTO GRID
          ================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
            Why Choose Us (Why B2bfiy)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
            Why Businesses Choose B2bfiy
          </h2>
          <p className="text-muted text-sm sm:text-base">
            We are not cheap template customizers; we work to build real brand value and drive higher conversions for every business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((w) => (
            <div
              key={w.id}
              className="bg-white border border-warm-border p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center mb-4">
                  {renderIcon(w.icon)}
                </div>
                <h3 className="font-extrabold text-lg text-dark mb-2 leading-tight">
                  {w.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  {w.description}
                </p>
              </div>
              <div className="mt-4 border-t border-warm-border pt-3 flex justify-end">
                <span className="text-[10px] font-bold text-primary bg-soft-red px-2 py-0.5 rounded-md">B2BFIY PRO</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================================================
          15. PORTFOLIO SHOWCASE PREVIEW
          ================================================== */}
      {featuredProjects.length > 0 && (
        <section className="bg-warm/30 border-y border-warm-border py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="space-y-3">
                <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Our Work (Portfolio)
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-none">
                  Check Our Latest Creative Cases
                </h2>
                <p className="text-muted text-sm sm:text-base max-w-xl">
                  Case studies of successful and high-converting projects completed by our agency.
                </p>
              </div>
              <Link
                to="/portfolio"
                className="bg-primary text-white hover:bg-primary-coral font-bold px-6 py-3 rounded-xl shadow-md shadow-primary/10 transition-all inline-flex items-center gap-1 shrink-0"
              >
                <span>View Full Portfolio</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigate(`/portfolio/${proj.slug}`)}
                  className="bg-white border border-warm-border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="relative aspect-video w-full bg-warm overflow-hidden">
                    <img
                      src={proj.featuredImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {proj.category.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted font-bold">
                      <span>Client: {proj.clientName}</span>
                      <span>{proj.date}</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-dark group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                    <div className="border-t border-warm-border pt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-primary group-hover:underline">
                      <span>View Case Study</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          16. WORK PROCESS (TIMELINE)
          ================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
            Our Work Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
            We Take Care of Your Growth Step-by-Step
          </h2>
          <p className="text-muted text-sm sm:text-base">
            From discovery to live launch and continuous growth — how we execute every project successfully.
          </p>
        </div>

        {/* Dynamic Timeline items */}
        <div className="relative border-l-2 border-primary/20 ml-4 sm:ml-8 space-y-12">
          {workProcess.filter(wp => wp.visible !== false).map((proc, index) => (
            <div key={proc.id} className="relative pl-8 sm:pl-12 group">
              {/* Timeline marker node */}
              <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center font-extrabold text-sm text-primary shadow-md group-hover:bg-primary group-hover:text-white transition-colors">
                {proc.step || `0${index + 1}`}
              </div>

              <div className="bg-warm/50 border border-warm-border p-6 rounded-2xl hover:shadow-xs transition-shadow">
                <h3 className="text-lg sm:text-xl font-extrabold text-dark mb-2">
                  {proc.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {proc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================================================
          17. MONTHLY PRICING PACKAGES
          ================================================== */}
      {monthlyPlans.length > 0 && (
        <section className="bg-warm py-20 px-6 border-y border-warm-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
                Monthly Social Media Plans
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                Choose the Right Growth Plan
              </h2>
              <p className="text-muted text-sm sm:text-base">
                Flexible plans to manage your business's social media and visual content marketing without any hidden charges.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {monthlyPlans.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl border p-8 flex flex-col justify-between relative shadow-sm ${
                    pkg.isPopular 
                      ? 'border-primary ring-4 ring-primary/10 lg:scale-105 z-10' 
                      : 'border-warm-border'
                  }`}
                >
                  {pkg.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                      MOST POPULAR
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-extrabold text-lg text-dark uppercase">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1 mt-3">
                        <span className="text-3xl sm:text-4xl font-black text-dark">৳{pkg.price}</span>
                        <span className="text-xs sm:text-sm font-bold text-muted">{pkg.period}</span>
                      </div>
                    </div>

                    <div className="border-t border-warm-border pt-6">
                      <h4 className="font-extrabold text-xs text-dark mb-4 uppercase tracking-wider">Features Included in Package:</h4>
                      <ul className="space-y-3">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check size={16} className="text-primary bg-soft-red p-0.5 rounded-full shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm font-semibold text-muted leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-warm-border">
                    <Link
                      to={pkg.ctaUrl || `/free-audit?package=${encodeURIComponent(pkg.name)}`}
                      className={`w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm block transition-all shadow-md ${
                        pkg.isPopular
                          ? 'bg-primary text-white hover:bg-primary-coral shadow-primary/20 hover:-translate-y-0.5'
                          : 'bg-white border-2 border-primary text-primary hover:bg-soft-red hover:-translate-y-0.5'
                      }`}
                    >
                      {pkg.ctaText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Nav link to all services Packages */}
            <div className="text-center mt-12">
              <Link to="/packages" className="inline-flex items-center gap-1.5 text-primary hover:underline font-extrabold">
                <span>View All Services & Custom Website Packages</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          21. COMPLETE BUSINESS LAUNCH PACKAGE (HERO BOX)
          ================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-dark to-neutral-900 text-white rounded-3xl p-8 sm:p-12 border-b-8 border-primary relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-primary text-white px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                All-in-One Mega Launch (Complete Bundle)
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Everything Your Business Needs to Launch Online
              </h2>
              <p className="text-gray-300 leading-relaxed font-medium">
                A complete solution package to rebrand and launch your business live online. Instead of purchasing separately, get your website, graphic design, and social pages all integrated in this single mega bundle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Professional Business Website",
                  "Logo & Brand Identity Creation",
                  "Facebook Page Setup & Optimization",
                  "20 Ready-to-Post Social Media Designs",
                  "8 High-Converting Promotional Reels & Shorts",
                  "1 Month Full Social Media Management",
                  "Content Marketing Strategy & Action Plan",
                  "WhatsApp Direct Chat Integration",
                  "Basic Search Engine Optimization (SEO)",
                  "30 Days Dedicated Post-Launch Support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check size={14} className="text-primary bg-primary/10 p-0.5 rounded-full shrink-0" />
                    <span className="text-gray-300 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col Price & Action */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-6">
              <p className="text-primary font-black text-xs sm:text-sm tracking-wider uppercase">LAUNCH SPECIAL BUDGET</p>
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-400">Starting From</span>
                <div className="font-black text-4xl sm:text-5xl text-white mt-1">৳75,000</div>
                <span className="text-xs text-gray-400">One-Time Complete Launch Budget</span>
              </div>
              
              <Link
                to="/free-audit?package=business-launch"
                className="w-full text-center bg-primary text-white hover:bg-primary-coral font-bold py-4 rounded-xl shadow-lg shadow-primary/25 block transition-all"
              >
                Launch Your Business with B2bfiy
              </Link>
              <p className="text-[11px] text-gray-500 font-medium">This offer is applicable for the first 10 project bookings.</p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================
          22. TESTIMONIALS
          ================================================== */}
      {testimonials.filter(t => t.published).length > 0 && (
        <section className="bg-warm/40 border-y border-warm-border py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
                Client Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                Trusted by Businesses Like Yours
              </h2>
              <p className="text-muted text-sm sm:text-base">
                Real feedback from some of our happy clients who achieved business growth using our custom designs and solutions.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.filter(t => t.published).map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-warm-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <p className="text-muted text-sm sm:text-base leading-relaxed italic font-medium mb-6">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center font-bold text-lg shrink-0">
                      {t.clientName[0]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-dark leading-none">{t.clientName}</h4>
                      <span className="text-xs text-muted font-bold block mt-1">{t.companyName}</span>
                      <div className="flex gap-0.5 mt-1 text-yellow-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          23. FREE DIGITAL AUDIT (LEAD GENERATION FORM)
          ================================================== */}
      <section id="free-audit-form-section" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
              Free Marketing Audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
              Not Sure What Your Business Needs?
            </h2>
            <p className="text-muted leading-relaxed font-medium">
              Our expert team will analyze your website loading speed, social media performance, graphics consistency, and video marketing entirely for free.
            </p>
            <p className="text-muted text-sm leading-relaxed font-medium">
              After completing the audit, we will send you a completely free, detailed action plan and recommendation PDF. No strings attached!
            </p>

            <div className="space-y-3 pt-4 border-t border-warm-border">
              {[
                "100% Customized Report",
                "No Hidden or Tricky Charges",
                "Quick Action Plan Delivered via WhatsApp"
              ].map((txt, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <Check size={14} className="text-primary bg-soft-red p-0.5 rounded-full" />
                  <span className="text-xs sm:text-sm font-bold text-dark">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Lead generation form */}
          <div className="lg:col-span-7 bg-white border border-warm-border rounded-3xl p-6 sm:p-10 shadow-lg relative">
            <h3 className="font-extrabold text-2xl text-dark mb-2">Free Digital Audit Form</h3>
            <p className="text-xs text-muted font-bold mb-6">Please fill in the information below. Our specialist team will start working on your audit within the next 24 hours.</p>
            
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
                    placeholder="e.g. John Doe"
                    value={auditForm.fullName}
                    onChange={(e) => setAuditForm({ ...auditForm, fullName: e.target.value })}
                    className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-dark uppercase">Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. MyBrand BD"
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
                    placeholder="example@gmail.com"
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
                <label className="text-xs font-bold text-dark uppercase">Service Required</label>
                <select
                  value={auditForm.service}
                  onChange={(e) => setAuditForm({ ...auditForm, service: e.target.value })}
                  className="border border-warm-border bg-warm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Complete Digital Solution">Complete Digital Solution</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-dark uppercase">Message (Message)</label>
                <textarea
                  rows={3}
                  placeholder="Briefly tell us about your business and goals..."
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
        </div>
      </section>


      {/* ==================================================
          24. FAQ ACCORDION
          ================================================== */}
      {faqs.length > 0 && (
        <section className="bg-warm/30 border-y border-warm-border py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1.5 rounded-full uppercase tracking-wider">
                FAQs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm sm:text-base">
                Common questions about our services, payment process, and project delivery.
              </p>
            </div>

            {/* Accordion container */}
            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white border border-warm-border rounded-2xl overflow-hidden shadow-xs hover:border-primary/20 transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none"
                    >
                      <span className="font-extrabold text-sm sm:text-base text-dark hover:text-primary transition-colors leading-tight">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-primary shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-muted shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-warm-border bg-warm/20 text-xs sm:text-sm text-muted leading-relaxed font-semibold">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================
          25. FINAL CALL TO ACTION (CTA)
          ================================================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="bg-soft-red rounded-[32px] p-8 sm:p-16 border-2 border-primary/10 relative overflow-hidden flex flex-col items-center gap-6">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-10 -mt-10 blur-xl"></div>
          
          <span className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full uppercase tracking-widest leading-none">
            Let's Talk Growth
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight max-w-3xl leading-tight">
            Ready to Build a Stronger Digital Presence?
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            Tell us about your business and let's create something that helps your brand stand out and grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link
              to="/free-audit"
              className="bg-primary text-white hover:bg-primary-coral font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={16} />
            </Link>
            
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
