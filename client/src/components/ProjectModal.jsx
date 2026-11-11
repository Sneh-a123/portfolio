import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#171717] border border-[#DC2626]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-red-950/50 z-10 text-left">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#222222] hover:bg-[#DC2626] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC2626]/15 border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{project.badge}</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {project.title}
          </h3>

          <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Preview Image */}
        <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 group aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2">
            Technologies Utilized
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#0F0F0F] border border-white/10 text-xs font-mono text-[#FEE2E2]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Engineering Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-3">
            Key Architecture &amp; Features
          </h4>
          <div className="space-y-2.5">
            {project.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E4E4E7]">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* My Contribution Section */}
        <div className="p-4 rounded-xl bg-[#0F0F0F] border border-[#DC2626]/30 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#DC2626] font-bold uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>Sneha's Exact Contribution:</span>
          </div>
          <p className="text-xs sm:text-sm text-[#FEE2E2]/90 leading-relaxed">
            {project.myContribution}
          </p>
        </div>

        {/* Actions Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Launch Live Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-white/10 text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            Inspect GitHub Repo
          </a>
        </div>

      </div>
    </div>
  );
};

