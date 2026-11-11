import React, { useState } from 'react';
import { Layout, Server, Database, Bot, Wrench, Zap, Check, Flame } from 'lucide-react';
import { techStackCategories } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

const categoryIconMap = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Bot: Bot,
  Wrench: Wrench,
};

export const TechStackSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...techStackCategories.map(c => c.name)];

  const filteredCategories = activeCategory === 'All'
    ? techStackCategories
    : techStackCategories.filter(c => c.name === activeCategory);

  return (
    <section id="weapons" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5 bg-[#0F0F0F]/60">
      
      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#DC2626]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-3">
            <Zap className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
            <span>SCENE 03 // TECH PLAYGROUND</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            My Weapons of <span className="text-[#DC2626]">Mass Creation.</span> ⚡
          </h2>

          <p className="mt-3 text-base sm:text-lg font-mono text-[#FEE2E2] max-w-xl italic">
            &ldquo;I don't just make things look good. I make sure they actually work.&rdquo;
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#DC2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] font-bold'
                  : 'bg-[#171717] text-[#A1A1AA] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = categoryIconMap[cat.icon] || Zap;
            return (
              <div
                key={cat.name}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#DC2626]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] font-mono text-[#71717A]">
                          {cat.skills.length} core tools
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/5 hover:border-[#DC2626]/50 hover:bg-[#DC2626]/10 text-xs font-mono text-white transition-all cursor-default"
                      >
                        {skill.hot && (
                          <Flame className="w-3 h-3 text-[#DC2626] animate-pulse" title="Primary weapon" />
                        )}
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-[#71717A]">({skill.level})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                  <span>Focus:</span>
                  <span className="text-[#FEE2E2]">{cat.tagline}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Philosophy Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-[#171717] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
            <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]">
              <span className="text-[#DC2626] font-bold">Sneha's Rule of Thumb:</span> Architecture first, pixel perfection always, clean commits forever.
            </p>
          </div>
          <div className="text-xs font-mono text-[#A1A1AA]">
            Stack: <span className="text-white font-bold">MERN + Gemini AI + Three.js</span>
          </div>
        </div>

      </div>
    </section>
  );
};

