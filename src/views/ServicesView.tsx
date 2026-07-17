import React from 'react';
import { useApp } from '../components/AppContext';
import { Link } from '../components/Router';
import { Laptop, Palette, Video, Share2, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServicesView() {
  const { services } = useApp();

  const renderIcon = (name: string, className = "text-primary") => {
    switch (name.toLowerCase()) {
      case 'laptop': return <Laptop className={className} size={32} />;
      case 'palette': return <Palette className={className} size={32} />;
      case 'video': return <Video className={className} size={32} />;
      case 'share2': return <Share2 className={className} size={32} />;
      default: return <Sparkles className={className} size={32} />;
    }
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-warm to-white py-16 px-6 text-center border-b border-warm-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-widest">
            Our Services (Core Offerings)
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-tight">
            Comprehensive Digital Services for Business Growth
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            We do not use cheap, cookie-cutter templates. We provide completely custom marketing, design, and development services tailored to your unique business goals.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        {services.map((srv, idx) => (
          <div 
            key={srv.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl border border-warm-border shadow-xs ${
              idx % 2 === 1 ? 'bg-warm/30' : 'bg-white'
            }`}
          >
            {/* Visual Column */}
            <div className={`lg:col-span-5 flex justify-center ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="w-full max-w-sm aspect-square bg-gradient-to-tr from-soft-red to-white rounded-2xl border border-warm-border flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-md group">
                <div className="w-20 h-20 rounded-full bg-white text-primary shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {renderIcon(srv.icon)}
                </div>
                <h3 className="font-extrabold text-xl text-dark leading-none uppercase tracking-tight mb-2">B2BFIY {srv.title.split(' (')[0]}</h3>
                <span className="text-xs text-primary font-bold">100% QUALITY GUARANTEED</span>
                
                <div className="absolute inset-x-0 bottom-0 bg-primary/5 py-3 border-t border-warm-border">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Premium Service Module</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Service {idx + 1}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-dark tracking-tight leading-none">
                {srv.title}
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-semibold">
                {srv.description}
              </p>

              {srv.features && srv.features.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-warm-border">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark">Features Included in Service:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {srv.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2">
                        <Check size={16} className="text-green-600 bg-green-50 p-0.5 rounded-full shrink-0" />
                        <span className="text-muted font-bold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/free-audit?service=${encodeURIComponent(srv.title)}`}
                  className="bg-primary text-white hover:bg-primary-coral font-bold py-3 px-6 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get Free Audit Report</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/packages"
                  className="bg-white border-2 border-primary text-primary hover:bg-soft-red font-bold py-3 px-6 rounded-xl transition-all text-center cursor-pointer"
                >
                  <span>View Packages & Pricing</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Trust Quote CTA */}
      <section className="bg-warm border-t border-warm-border py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <ShieldCheck size={48} className="text-primary mx-auto" />
          <h3 className="font-extrabold text-xl sm:text-2xl text-dark">Personalized Solutions Tailored to Your Business</h3>
          <p className="text-muted text-sm sm:text-base leading-relaxed font-semibold max-w-lg mx-auto">
            Have custom project requirements or a unique vision? Share it with us today. Our IT & digital specialist team will prepare a custom roadmap and quotation.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="bg-primary text-white hover:bg-primary-coral font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/10 transition-all inline-flex items-center gap-1.5"
            >
              <span>Talk to Our Specialists Direct</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
