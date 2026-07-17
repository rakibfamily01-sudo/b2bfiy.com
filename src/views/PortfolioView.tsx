import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { useRouter, Link } from '../components/Router';
import { Search, Grid, ArrowRight, FolderKanban, Star, Calendar, User } from 'lucide-react';

export default function PortfolioView() {
  const { portfolioProjects, portfolioCategories } = useApp();
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter logic
  const filteredProjects = portfolioProjects.filter((proj) => {
    if (proj.status !== 'published') return false;
    
    // Category match
    const categoryMatches = selectedCategory === 'all' || proj.category === selectedCategory;
    
    // Search match (title, client, shortDescription, tools, tags)
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatches && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-gradient-to-b from-warm to-white py-16 px-6 text-center border-b border-warm-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-widest">
            Creative Showcase (Portfolio)
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tight leading-none">
            Our Digital Agency Portfolio
          </h1>
          <p className="text-muted text-base sm:text-lg font-medium max-w-2xl mx-auto">
            We don't build cheap, cookie-cutter templates. Explore our professional website development, custom branding, and high-retention video portfolio cases.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Filtering and Search Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-warm/50 border border-warm-border p-6 rounded-2xl">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search projects or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-warm-border pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full justify-start md:justify-end">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'bg-white border border-warm-border text-muted hover:text-primary hover:bg-soft-red'
              }`}
            >
              All Projects
            </button>
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-white shadow-md shadow-primary/15'
                    : 'bg-white border border-warm-border text-muted hover:text-primary hover:bg-soft-red'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigate(`/portfolio/${proj.slug}`)}
                className="bg-white border border-warm-border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-warm overflow-hidden border-b border-warm-border">
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {proj.featured && (
                    <span className="absolute top-3 left-3 bg-gradient-to-tr from-primary to-primary-coral text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      <span>FEATURED CASE</span>
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-dark/80 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {proj.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      <span>Client: {proj.clientName}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{proj.date}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl text-dark group-hover:text-primary transition-colors leading-tight line-clamp-1">
                    {proj.title}
                  </h3>
                  
                  <p className="text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  {/* Tools used tags */}
                  {proj.tools && proj.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tools.slice(0, 3).map((tool, idx) => (
                        <span key={idx} className="bg-warm border border-warm-border text-muted text-[10px] font-bold px-2 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                      {proj.tools.length > 3 && (
                        <span className="bg-warm border border-warm-border text-muted text-[10px] font-bold px-1.5 py-0.5 rounded">
                          +{proj.tools.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="border-t border-warm-border pt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-primary group-hover:underline">
                    <span>View Case Study & Results</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-warm border border-warm-border rounded-2xl py-16 px-6 text-center space-y-4">
            <FolderKanban size={48} className="text-muted mx-auto" />
            <h3 className="font-extrabold text-lg text-dark">No Projects Found</h3>
            <p className="text-muted text-sm max-w-sm mx-auto">
              We couldn't find any projects matching your filter or search query. Please try searching something else.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="bg-primary text-white hover:bg-primary-coral font-bold px-5 py-2.5 rounded-xl shadow-xs text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
