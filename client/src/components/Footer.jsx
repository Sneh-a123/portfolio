import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound, playHeartbeatSound } from '../utils/soundEffects';

export const Footer = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden">
      
      {/* Background Soft Red Pulse */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DC2626]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        
        {/* Memorable Closing Headline */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2]">
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626] animate-pulse" />
            <span>SCENE 07 // MEMORABLE ENDING</span>
          </div>

          <blockquote className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            &ldquo;Every great product starts with an idea.
            <br />
            <span className="text-[#DC2626]">Maybe yours starts here.</span>&rdquo;
          </blockquote>

          <p className="text-sm font-mono text-[#A1A1AA] pt-2">
            Building the future, one line of code at a time.
          </p>
        </div>

        {/* Social & Channel Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-[#DC2626] hover:border-[#DC2626]/40 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-[#DC2626] hover:border-[#DC2626]/40 transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            onClick={playClickSound}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/10 text-xs font-mono text-[#E4E4E7] hover:text-[#DC2626] hover:border-[#DC2626]/40 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#DC2626]" />
            <span>{personalInfo.email}</span>
          </a>
        </div>

        {/* Back to top button */}
        <div className="mb-12">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#DC2626] border border-white/10 text-xs font-mono text-[#A1A1AA] hover:text-white transition-all cursor-pointer group shadow-lg"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626] animate-pulse" />
            <span>by <strong className="text-white">Sneha Sinha</strong> // {personalInfo.brandName}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>MERN Stack</span>
            <span>•</span>
            <span>Gemini AI</span>
            <span>•</span>
            <span>Three.js</span>
            <span>•</span>
            <span>Nodemailer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

