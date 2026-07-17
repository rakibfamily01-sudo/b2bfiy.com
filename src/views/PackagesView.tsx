import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { Link } from '../components/Router';
import { Check, ArrowRight, Star, Clock, Laptop, Palette, Video, Share2, Sparkles } from 'lucide-react';

export default function PackagesView() {
  const { packages } = useApp();
  const [activeTab, setActiveTab] = useState<'monthly' | 'website' | 'graphic' | 'video'>('monthly');

  const tabs = [
    { id: 'monthly', name: 'Monthly Growth (Social)', icon: Share2 },
    { id: 'website', name: 'Websites Development', icon: Laptop },
    { id: 'graphic', name: 'Graphics Design', icon: Palette },
    { id: 'video', name: 'Video Editing', icon: Video }
  ] as const;

  // Filter based on selected category tab
  const activePackages = packages.filter((pkg) => pkg.published && pkg.type === activeTab);

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-gradient-to-b from-warm to-white py-16 px-6 text-center border-b border-warm-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-widest">
            Our Growth Packages (Growth Pricing)
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-none">
            Choose the Right Plan for Your Growth
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium max-w-2xl mx-auto">
            A transparent and affordable pricing structure tailored specifically for small and medium businesses, without any hidden charges or complex contracts.
          </p>
        </div>
      </section>

      {/* Package Tabs Selector */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 bg-warm/50 border border-warm-border p-4 rounded-3xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/15 scale-105'
                    : 'bg-white border border-warm-border text-muted hover:text-primary hover:bg-soft-red'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-primary'} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active pricing plans grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {activePackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {activePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border p-8 flex flex-col justify-between relative shadow-xs hover:shadow-md transition-all ${
                  pkg.isPopular
                    ? 'border-primary ring-4 ring-primary/10 lg:scale-105 z-10'
                    : 'border-warm-border'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    RECOMMENDED PLAN
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    {pkg.deliveryTime && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-soft-red px-2 py-1 rounded-md uppercase tracking-wider mb-3">
                        <Clock size={10} />
                        <span>Delivery: {pkg.deliveryTime}</span>
                      </span>
                    )}
                    <h3 className="font-extrabold text-lg sm:text-xl text-dark uppercase">{pkg.name}</h3>
                    
                    <div className="flex items-baseline gap-1 mt-4">
                      {pkg.startingPrice && <span className="text-xs sm:text-sm font-bold text-muted mr-1">Starts</span>}
                      <span className="text-3xl sm:text-4xl font-black text-dark">৳{pkg.price}</span>
                      <span className="text-xs sm:text-sm font-bold text-muted">{pkg.period}</span>
                    </div>
                  </div>

                  <div className="border-t border-warm-border pt-6">
                    <h4 className="font-extrabold text-xs text-dark mb-4 uppercase tracking-wider">Package Features:</h4>
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
                    className={`w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm block transition-all shadow-md cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-primary text-white hover:bg-primary-coral shadow-primary/25 hover:-translate-y-0.5'
                        : 'bg-white border-2 border-primary text-primary hover:bg-soft-red hover:-translate-y-0.5'
                    }`}
                  >
                    {pkg.ctaText || 'Get Started Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-warm border border-warm-border rounded-3xl py-12 px-6 text-center space-y-3">
            <Sparkles size={36} className="text-primary mx-auto animate-pulse" />
            <h3 className="font-bold text-lg text-dark">No packages in this category</h3>
            <p className="text-muted text-sm max-w-sm mx-auto">
              Please select another category tab to explore our active packages.
            </p>
          </div>
        )}
      </section>

      {/* Complete Business Launch Banner */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-tr from-dark to-neutral-900 text-white rounded-[32px] p-8 sm:p-12 border-l-8 border-primary shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                COMPLETE STARTUP BUNDLE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Everything Your Business Needs to Launch Online
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Looking to build and scale your brand from scratch? Get a complete custom business website, custom branding/logo, professional social media setup, and custom content marketing designs in our all-in-one mega launch bundle.
              </p>
            </div>
            <div className="shrink-0 text-left lg:text-center space-y-4 w-full lg:w-auto">
              <div>
                <span className="text-xs text-gray-400 block font-bold uppercase">Mega Launch Budget</span>
                <span className="text-3xl sm:text-4xl font-black text-primary">Starts from ৳75,000</span>
              </div>
              <Link
                to="/free-audit?package=business-launch"
                className="bg-primary text-white hover:bg-primary-coral font-bold py-3.5 px-8 rounded-xl shadow-lg block lg:inline-block transition-all text-center"
              >
                Launch Your Business with B2bfiy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
