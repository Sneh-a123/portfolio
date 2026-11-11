import React from 'react';
import { X, Download, Printer, Heart, Sparkles, CheckCircle2, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { personalInfo, projects, techStackCategories } from '../data/portfolioData';
import { playClickSound, playSuccessChime } from '../utils/soundEffects';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#141414] border border-[#DC2626]/40 rounded-2xl shadow-2xl shadow-red-950/60 overflow-hidden z-10 text-left">
        
        {/* Header Controls */}
        <div className="bg-[#1C1C1C] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DC2626]/20 border border-[#DC2626] flex items-center justify-center text-[#DC2626]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Curriculum Vitae // Sneha Sinha
              </h3>
              <p className="text-xs font-mono text-[#A1A1AA]">
                Full Stack MERN Developer &amp; AI Integrator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-xs font-mono text-[#FEE2E2] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#252525] hover:bg-[#DC2626] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0F0F0F] text-white font-sans print:bg-white print:text-black">
          
          {/* Header Summary */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  SNEHA SINHA
                </h1>
                <p className="text-sm font-mono text-[#DC2626] font-semibold mt-1">
                  Full Stack MERN Developer &bull; AI Integration Engineer
                </p>
              </div>

              <div className="text-xs font-mono text-[#A1A1AA] space-y-1 sm:text-right">
                <p>snehasinha0905@gmail.com</p>
                <p>github.com/Sneh-a123</p>
                <p>linkedin.com/in/sinha-sneha</p>
                <p>India &bull; Remote Available</p>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Product-focused Full Stack Developer specializing in high-velocity MERN architectures, Google Gemini API integrations, and cinematic frontend experiences. Proven track record turning whiteboard ideas into production SaaS applications with 99.9% uptime and sub-100ms API response benchmarks.
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#DC2626] font-bold mb-3">
              <Code2 className="w-4 h-4" />
              Technical Weapons
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#171717] border border-white/5">
                <span className="text-white font-bold block mb-1">Frontend Engineering:</span>
                <span className="text-[#A1A1AA]">React.js, JavaScript (ES6+), Tailwind CSS, Three.js, WebGL, HTML5/CSS3, Responsive UI/UX</span>
              </div>
              <div className="p-3 rounded-lg bg-[#171717] border border-white/5">
                <span className="text-white font-bold block mb-1">Backend &amp; Security:</span>
                <span className="text-[#A1A1AA]">Node.js, Express.js, REST APIs, JWT Authentication, RBAC, Rate Limiting, Helmet</span>
              </div>
              <div className="p-3 rounded-lg bg-[#171717] border border-white/5">
                <span className="text-white font-bold block mb-1">Databases &amp; Cloud:</span>
                <span className="text-[#A1A1AA]">MongoDB, Mongoose ODM, SQL, Redis, Schema Indexing &amp; Optimization</span>
              </div>
              <div className="p-3 rounded-lg bg-[#171717] border border-white/5">
                <span className="text-white font-bold block mb-1">AI &amp; Workflows:</span>
                <span className="text-[#A1A1AA]">Gemini LLM API, Python, Prompt Engineering, Autonomous Chatbot Handoff, Webhooks</span>
              </div>
            </div>
          </div>

          {/* Flagship Projects */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#DC2626] font-bold mb-3">
              <Briefcase className="w-4 h-4" />
              Featured Projects &amp; Architecture
            </h4>

            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#171717] border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h5 className="font-display font-bold text-sm text-white">
                      {p.title}
                    </h5>
                    <span className="text-[11px] font-mono text-[#FEE2E2]">
                      {p.techStack.join(' • ')}
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
                    {p.shortDesc}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#D1D5DB]">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#DC2626] font-bold mb-3">
              <GraduationCap className="w-4 h-4" />
              Education &amp; Recognition
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                <span className="text-white font-bold block">Bachelor of Technology (B.Tech)</span>
                <span className="text-[#A1A1AA] block mt-0.5">Computer Science &amp; Engineering</span>
                <span className="text-[11px] font-mono text-[#DC2626] mt-2 block">First Class Honors &bull; 2021 - 2025</span>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                <span className="text-white font-bold block flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  Hackathon Winner &bull; Smart India
                </span>
                <span className="text-[#A1A1AA] block mt-0.5">Top Finalist for AI Academic Scheduler Solution</span>
                <span className="text-[11px] font-mono text-[#10B981] mt-2 block">300+ GitHub Contributions in 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

