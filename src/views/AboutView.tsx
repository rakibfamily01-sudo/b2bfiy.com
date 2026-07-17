import React from 'react';
import { useApp } from '../components/AppContext';
import { Link } from '../components/Router';
import { Shield, Target, Eye, Users, ChevronRight, Award, Trophy } from 'lucide-react';

export default function AboutView() {
  const { settings } = useApp();

  if (!settings) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-gradient-to-b from-warm to-white py-16 px-6 text-center border-b border-warm-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-widest">
            About Us (About B2bfiy)
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-none">
            About B2bfiy Digital Agency
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            We help businesses build a robust online presence with stunning websites, premium designs, and engaging digital content.
          </p>
        </div>
      </section>

      {/* Main Company Story */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-dark tracking-tight leading-tight">
            Your Dedicated Creative & Digital Growth Partner
          </h2>
          <p className="text-muted leading-relaxed font-semibold text-sm sm:text-base">
            "B2bfiy helps businesses build a powerful digital presence with high-converting websites, professional graphic designs, engaging video content, and comprehensive social media management."
          </p>
          <p className="text-muted text-sm leading-relaxed font-semibold">
            We do not just stop after delivering assets. We operate with a strategic focus on our clients' business growth, customer engagement, and conversion optimization. Our team crafts modern solutions combining design with technology.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-dark pt-4">
            <div className="flex items-center gap-2 bg-warm p-3.5 rounded-xl border border-warm-border">
              <ChevronRight size={16} className="text-primary shrink-0" />
              <span>Small Business & Local Branding</span>
            </div>
            <div className="flex items-center gap-2 bg-warm p-3.5 rounded-xl border border-warm-border">
              <ChevronRight size={16} className="text-primary shrink-0" />
              <span>High-Converting E-commerce Solutions</span>
            </div>
            <div className="flex items-center gap-2 bg-warm p-3.5 rounded-xl border border-warm-border">
              <ChevronRight size={16} className="text-primary shrink-0" />
              <span>Real Estate & Clinic Page Moderation</span>
            </div>
            <div className="flex items-center gap-2 bg-warm p-3.5 rounded-xl border border-warm-border">
              <ChevronRight size={16} className="text-primary shrink-0" />
              <span>Monthly Content Marketing Strategy</span>
            </div>
          </div>
        </div>

        {/* Brand identity illustration card */}
        <div className="lg:col-span-6 bg-soft-red/40 border border-warm-border rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center font-black text-2xl mb-2">
            B
          </div>
          <h3 className="font-extrabold text-xl text-dark">B2bfiy Creative Team</h3>
          <p className="text-muted text-sm leading-relaxed max-w-sm">
            A dedicated team consisting of skilled web designers, full-stack developers, creative content writers, and professional video editors.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <span className="block font-black text-2xl text-primary leading-none">100%</span>
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mt-1">Satisfaction</span>
            </div>
            <div className="w-px bg-warm-border h-8 self-center"></div>
            <div className="text-center">
              <span className="block font-black text-2xl text-primary leading-none">24/7</span>
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mt-1">Live Chat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-warm/50 border-y border-warm-border py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-warm-border p-8 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-dark">Our Mission</h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed font-semibold">
              Accelerating the business growth of small and medium enterprises by delivering highly professional IT, content, and marketing solutions tailored to their budgets.
            </p>
          </div>

          <div className="bg-white border border-warm-border p-8 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-dark">Our Vision</h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed font-semibold">
              To be established as the ideal, reliable, and cost-effective digital branding partner agency that guarantees results-driven deliverables.
            </p>
          </div>

          <div className="bg-white border border-warm-border p-8 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-soft-red text-primary flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h3 className="font-extrabold text-lg text-dark">Core Values</h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed font-semibold">
              Earning long-term customer trust through honesty, transparent workflows, strict deadline adherence, and 100% original custom work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
