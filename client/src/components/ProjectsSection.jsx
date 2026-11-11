import React, { useState, useRef } from 'react';
import { ExternalLink, Github, FolderGit2, Info, Eye, Sparkles } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { playClickSound } from '../utils/soundEffects';

// Interactive 3D Tilt Card with Dynamic Specular Glare
const ProjectCard3D = ({ project, index, onSelect }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.18s ease-out, box-shadow 0.18s ease-out',
      }}
      className="glass-panel relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#DC2626]/70 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(220,38,38,0.28)]"
    >
      {/* Dynamic Specular Red Glare Reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(220, 38, 38, ${glare.opacity}), transparent 80%)`,
        }}
      />

      <div>
        {/* Project Image & Overlay */}
        <div className="relative aspect-video overflow-hidden bg-[#121212]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-85" />
          
          {/* Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0F0F0F]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FEE2E2] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#DC2626]" />
            <span>{project.badge}</span>
          </div>

          {/* View Details Quick Overlay */}
          <button
            onClick={() => {
              playClickSound();
              onSelect(project);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity gap-2 text-xs font-mono text-white font-semibold cursor-pointer z-10"
          >
            <Eye className="w-4 h-4 text-[#DC2626]" />
            <span>Inspect Architecture</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#DC2626]">
              0{index + 1} // PROJECT
            </span>
            {project.liveDemo.includes('vercel.app') && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Live Deployed
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-xl text-white group-hover:text-[#DC2626] transition-colors mb-3">
            {project.title}
          </h3>

          <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3 mb-5">
            {project.shortDesc}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-[#0F0F0F] border border-white/5 text-[10px] font-mono text-[#E4E4E7]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#71717A]">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer / Links */}
      <div className="p-6 pt-0 relative z-10">
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              playClickSound();
              onSelect(project);
            }}
            className="text-xs font-mono text-[#FEE2E2] hover:text-[#DC2626] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Contribution</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              title="GitHub Repository"
              className="p-1.5 rounded-lg bg-[#0F0F0F] hover:bg-[#222222] border border-white/10 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              title={project.liveDemo.includes('vercel.app') ? 'Launch Live App' : 'Inspect Code'}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-mono font-semibold transition-all shadow-md shadow-red-950/40 cursor-pointer"
            >
              <span>{project.liveDemo.includes('vercel.app') ? 'Live App' : 'Demo'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5 bg-[#0F0F0F]">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#DC2626]/6 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>SCENE 04 // FEATURED WORKS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Things I've Built. <span className="text-[#DC2626]">Things I'm Proud Of.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base font-mono text-[#A1A1AA] max-w-xl">
            Real MERN and AI products engineered for real performance, real scale &amp; delight.
          </p>
        </div>

        {/* Projects Cards Grid with 3D Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              index={index}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Deep Dive Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
