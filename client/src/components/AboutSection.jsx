import React from 'react';
import { Sparkles, Cpu, Compass, Zap, Heart, Coffee, CheckCircle2 } from 'lucide-react';
import { personalityTraits, personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

const iconMap = {
  Sparkles: Sparkles,
  Cpu: Cpu,
  Compass: Compass,
  Zap: Zap,
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5 bg-[#0F0F0F]">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
            <span>SCENE 02 // ABOUT ME</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Personality + <span className="text-[#DC2626]">Engineering Love</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base font-mono text-[#A1A1AA] max-w-xl">
            Beyond standard resumes — the human philosophy driving every commit.
          </p>
        </div>

        {/* Cinematic Quote Callout */}
        <div className="relative glass-panel rounded-2xl p-8 sm:p-12 mb-16 border-l-4 border-l-[#DC2626] shadow-xl overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 text-9xl font-display font-black text-white pointer-events-none">
            ❤️
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#DC2626] uppercase font-bold block mb-2">
              [ MANIFESTO ]
            </span>
            <blockquote className="font-display font-semibold text-2xl sm:text-3xl text-white leading-snug">
              &ldquo;Some people fall in love with music, some with art...
              <br />
              <span className="text-[#FEE2E2]">I fell in love with building things on the internet.</span>&rdquo;
            </blockquote>

            <p className="mt-6 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              I'm <strong className="text-white">Sneha Sinha</strong> — a developer who loves turning crazy ideas into meaningful digital products. From frontend pixels to backend logic, I enjoy the entire journey of making something from <span className="text-[#DC2626] font-bold">zero to WOW!</span>
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[#FEE2E2]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#DC2626]" />
                <span>Fuel: Cold Brew + High Curiosity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Production Mindset: Scalable &amp; Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Words / 4 Pillars Grid */}
        <div className="mb-10 text-center sm:text-left">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            My Personality in 4 Words:
          </h3>
          <p className="text-xs sm:text-sm font-mono text-[#71717A] mt-1">
            Hover to inspect what each attribute translates to in production code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalityTraits.map((trait, index) => {
            const IconComponent = iconMap[trait.icon] || Sparkles;
            return (
              <div
                key={trait.title}
                onClick={playClickSound}
                className="glass-panel glass-panel-hover rounded-xl p-6 relative flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center group-hover:border-[#DC2626] group-hover:bg-[#DC2626]/10 transition-colors">
                      <IconComponent className="w-6 h-6 text-[#DC2626] group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-mono text-[#71717A] group-hover:text-[#FEE2E2]">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#DC2626] transition-colors">
                    {trait.title}
                  </h4>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {trait.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#71717A]">Deliverable:</span>
                  <span className="text-[#FEE2E2] font-semibold">{trait.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

