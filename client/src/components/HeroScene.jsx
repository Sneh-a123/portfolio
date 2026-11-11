import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown, Code2, Heart, Terminal, Compass } from 'lucide-react';
import { ThreeHeartCanvas } from './ThreeHeartCanvas';
import { playClickSound, playHeartbeatSound } from '../utils/soundEffects';

export const HeroScene = ({ onExploreClick, onBuildClick }) => {
  const [initStage, setInitStage] = useState(0); // 0: Dot, 1: Expanding Heart, 2: Full Scene Loaded
  const [heartBounceTrigger, setHeartBounceTrigger] = useState(0);

  useEffect(() => {
    // Stage 0 -> 1: Expand dot into heart
    const t1 = setTimeout(() => setInitStage(1), 500);
    // Stage 1 -> 2: Reveal typography & hero content
    const t2 = setTimeout(() => setInitStage(2), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleHeartClick = () => {
    playHeartbeatSound();
    setHeartBounceTrigger((prev) => prev + 1);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
      
      {/* Background Ambience & Red Neon Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#DC2626]/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FEE2E2]/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Floating Code Snippets in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5 opacity-40 sm:opacity-75">
        <div className="absolute top-28 left-[6%] code-chip px-3 py-1.5 rounded-lg text-xs font-mono hidden md:block animate-float">
          <span className="text-[#A1A1AA]">// initializing soul</span><br/>
          <span className="text-[#DC2626]">const</span> sneha = <span className="text-yellow-400">new</span> Engineer(&#123; coffee: <span className="text-emerald-400">"100%"</span>, love: <span className="text-pink-400">"❤️"</span> &#125;);
        </div>

        <div className="absolute top-44 right-[8%] code-chip px-3 py-1.5 rounded-lg text-xs font-mono hidden md:block animate-float" style={{ animationDelay: '1.5s' }}>
          <span className="text-[#DC2626]">async function</span> turnZeroToWow() &#123;<br/>
          &nbsp;&nbsp;<span className="text-blue-400">await</span> logic.synthesize(creativity);<br/>
          &#125;
        </div>

        <div className="absolute bottom-28 left-[10%] code-chip px-3 py-1.5 rounded-lg text-xs font-mono hidden lg:block animate-float" style={{ animationDelay: '2.5s' }}>
          $ git commit -m <span className="text-emerald-400">"feat: shipped digital magic ⚡"</span>
        </div>

        <div className="absolute bottom-36 right-[12%] code-chip px-3 py-1.5 rounded-lg text-xs font-mono hidden lg:block animate-float" style={{ animationDelay: '0.8s' }}>
          &lt;<span className="text-[#DC2626]">CupidAI</span> status=<span className="text-emerald-400">"listening"</span> /&gt;
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Terminal Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-6 shadow-[0_0_15px_rgba(220,38,38,0.15)] animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" />
          <span className="text-[#A1A1AA]">SYSTEM.READY //</span>
          <span className="tracking-widest font-semibold">INITIALIZING CREATIVITY...</span>
        </div>

        {/* 3D Heart Canvas with interactive bounce */}
        <div className="my-1 sm:my-3">
          <ThreeHeartCanvas onHeartClick={handleHeartClick} />
        </div>

        {/* Main Headline */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#DC2626] uppercase font-bold">
              [ HELLO, WORLD! ]
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.08]">
            I'm <span className="text-gradient-red underline decoration-[#DC2626]/40 decoration-wavy decoration-2">Sneha</span>.
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#FEE2E2]/90 block mt-1">
              Not your regular developer.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            I'm the girl who turns <span className="text-white font-semibold">caffeine</span>, <span className="text-white font-semibold">creativity</span> &amp; <span className="text-white font-semibold">code</span> into <span className="text-[#DC2626] font-semibold">digital magic</span>.
          </p>
        </div>

        {/* Buttons / CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
          
          {/* Button 1: Explore My Universe */}
          <button
            onClick={() => {
              playClickSound();
              if (onExploreClick) onExploreClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#0F0F0F] font-display font-bold text-sm tracking-wide hover:bg-[#FEE2E2] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-[#DC2626] group-hover:rotate-45 transition-transform" />
            Explore My Universe
          </button>

          {/* Button 2: Let's Build Something ❤️ */}
          <button
            onClick={() => {
              playHeartbeatSound();
              if (onBuildClick) onBuildClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#DC2626] text-white font-display font-bold text-sm tracking-wide hover:bg-[#B91C1C] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer group hover:scale-[1.02]"
          >
            <Heart className="w-4 h-4 text-white fill-white group-hover:scale-125 transition-transform animate-pulse" />
            Let's Build Something ❤️
          </button>
        </div>

        {/* Micro indicator at bottom */}
        <div className="mt-12 text-xs font-mono text-[#71717A] flex items-center gap-2">
          <span>Scroll to uncover the architecture</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#DC2626]" />
        </div>

      </div>
    </section>
  );
};

