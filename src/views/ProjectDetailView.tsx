import React, { useEffect, useState } from 'react';
import { useApp } from '../components/AppContext';
import { useRouter, Link } from '../components/Router';
import { 
  ArrowLeft, Calendar, User, ExternalLink, ShieldCheck, 
  Settings, Award, Target, HelpCircle, Workflow, Trophy 
} from 'lucide-react';
import { PortfolioProject } from '../types';

export default function ProjectDetailView() {
  const { portfolioProjects } = useApp();
  const { navigate } = useRouter();
  
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract slug dynamically from current URL path
  useEffect(() => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const slug = segments[segments.length - 1]; // e.g. "/portfolio/my-slug" -> "my-slug"

    if (slug) {
      const found = portfolioProjects.find(p => p.slug === slug);
      if (found) {
        setProject(found);
      }
    }
    setLoading(false);
  }, [portfolioProjects]);

  // YT url embed helper
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-warm">
        <div className="animate-pulse text-muted font-bold">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <h2 className="text-2xl font-black text-dark">Project Not Found</h2>
        <p className="text-muted text-sm">The project case study you are looking for has been disabled or deleted.</p>
        <Link to="/portfolio" className="inline-flex items-center gap-1 bg-primary text-white font-bold py-2.5 px-6 rounded-xl text-sm">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);

  return (
    <div className="bg-white">
      {/* Upper bar with back link */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-warm-border">
        <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-primary transition-colors cursor-pointer">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Main detail content */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Detailed Case Content */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-primary bg-soft-red px-3 py-1 rounded-full uppercase tracking-wider">
              {project.category.replace('-', ' ')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-dark tracking-tight mt-3 mb-4 leading-tight">
              {project.title}
            </h1>

            {/* Quick meta data */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted font-bold border-y border-warm-border py-4 mt-4">
              <div className="flex items-center gap-1.5">
                <User size={16} className="text-primary shrink-0" />
                <span>Client: {project.clientName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-primary shrink-0" />
                <span>Date: {project.date}</span>
              </div>
              {project.serviceType && (
                <div className="flex items-center gap-1.5">
                  <Award size={16} className="text-primary shrink-0" />
                  <span>Type: {project.serviceType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Large Image / Cover */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-warm-border shadow-xs bg-warm">
            <img 
              src={project.featuredImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Description Block */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-dark tracking-tight">Project Overview</h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Challenge Box */}
          {project.challenge && (
            <div className="p-6 sm:p-8 bg-amber-50/50 border border-amber-200/60 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <Target size={20} className="shrink-0" />
                <h3 className="font-extrabold text-base sm:text-lg">The Challenge</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed font-semibold">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Solution Box */}
          {project.solution && (
            <div className="p-6 sm:p-8 bg-green-50/40 border border-green-200/60 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-green-700">
                <ShieldCheck size={20} className="shrink-0" />
                <h3 className="font-extrabold text-base sm:text-lg">Our Solution</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed font-semibold">
                {project.solution}
              </p>
            </div>
          )}

          {/* Process steps */}
          {project.process && project.process.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-dark">
                <Workflow size={20} className="text-primary shrink-0" />
                <h3 className="text-xl font-black">Our Work Process</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 pl-2">
                {project.process.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-warm/40 border border-warm-border p-4 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-muted leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube/Vimeo Video Embed */}
          {embedUrl && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-black text-dark">Video Preview Case Study</h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-warm-border shadow-xs">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title="Project Video Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {project.galleryImages && project.galleryImages.length > 0 && project.galleryImages[0] !== project.featuredImage && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-black text-dark">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-warm-border bg-warm shadow-xs">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Quick Case Panel & Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-warm/60 border border-warm-border p-6 rounded-2xl space-y-6 sticky top-28">
            <h3 className="font-extrabold text-lg text-dark border-b border-warm-border pb-3">Project Summary</h3>
            
            {/* Project results */}
            {project.results && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-primary">
                  <Trophy size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Achievements & Results</span>
                </div>
                <p className="text-sm font-extrabold text-dark leading-snug">
                  {project.results}
                </p>
              </div>
            )}

            {/* Tools list */}
            {project.tools && project.tools.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-warm-border">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Tools & Technology Used</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, idx) => (
                    <span key={idx} className="bg-white border border-warm-border text-dark text-xs font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags list */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-warm-border">
                <span className="text-xs font-bold text-muted uppercase tracking-wider block">Project Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-primary/5 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live website link if any */}
            {project.liveWebsiteUrl && (
              <div className="pt-4 border-t border-warm-border">
                <a
                  href={project.liveWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-primary text-white hover:bg-primary-coral font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Live Project</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            )}

            {/* Quick Consultation CTA */}
            <div className="pt-4 border-t border-warm-border space-y-3">
              <p className="text-xs text-muted font-bold text-center">Want to build a similar project for your business?</p>
              <Link
                to={`/free-audit?service=${encodeURIComponent(project.category)}`}
                className="w-full text-center bg-white border border-dark hover:bg-warm text-dark font-extrabold py-3 px-4 rounded-xl text-sm block transition-all cursor-pointer"
              >
                Request Free Audit
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
