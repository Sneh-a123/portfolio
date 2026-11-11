import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Volume2, VolumeX, Menu, X, Heart, FileText } from 'lucide-react';
import { toggleMute, getMuteState, playClickSound } from '../utils/soundEffects';

export const Navbar = ({ onOpenTerminal, onOpenCupid, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(getMuteState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (!muted) playClickSound();
  };

  const navLinks = [
    { label: '// ABOUT', href: '#about' },
    { label: '// WEAPONS', href: '#weapons' },
    { label: '// PROJECTS', href: '#projects' },
    { label: '// SERVICES', href: '#freelance' },
    { label: '// CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F0F0F]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#"
          onClick={playClickSound}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#171717] border border-[#DC2626]/40 group-hover:border-[#DC2626] group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all">
            <Heart className="w-4 h-4 text-[#DC2626] fill-[#DC2626] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#DC2626] rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-[#DC2626] transition-colors">
              SNEHA<span className="text-[#DC2626]">.EXE</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#A1A1AA] font-mono uppercase -mt-1 hidden sm:block">
              BUILD WITH LOGIC & LOVE
            </span>
          </div>
        </a>

        {/* Live Status Pill (Center Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 text-xs font-mono text-[#FEE2E2]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Available for Freelance & Full-time</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={playClickSound}
              className="text-xs font-mono tracking-wider text-[#A1A1AA] hover:text-white hover:text-shadow transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#DC2626] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Resume Modal Shortcut */}
          <button
            onClick={() => {
              playClickSound();
              if (onOpenResume) onOpenResume();
            }}
            title="Inspect Sneha's CV / Resume"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#171717] hover:bg-[#222222] border border-white/10 text-xs font-mono text-[#A1A1AA] hover:text-[#FFFFFF] hover:border-[#DC2626]/40 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline">CV</span>
          </button>

          {/* CLI Terminal Shortcut */}
          <button
            onClick={() => {
              playClickSound();
              onOpenTerminal();
            }}
            title="Open Interactive Terminal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#171717] hover:bg-[#222222] border border-white/10 text-xs font-mono text-[#A1A1AA] hover:text-[#FFFFFF] hover:border-[#DC2626]/40 transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Cupid AI Chat Quick Trigger */}
          <button
            onClick={() => {
              playClickSound();
              onOpenCupid();
            }}
            title="Chat with Cupid AI Receptionist"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#DC2626]/15 hover:bg-[#DC2626]/25 border border-[#DC2626]/40 hover:border-[#DC2626] text-xs font-mono text-white transition-all shadow-[0_0_12px_rgba(220,38,38,0.2)] hover:shadow-[0_0_18px_rgba(220,38,38,0.45)] cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline font-semibold">Cupid AI</span>
            <span className="text-[#DC2626]">❤️</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-1.5 rounded-md bg-[#171717] hover:bg-[#222222] border border-white/10 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#DC2626]" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-[#171717] text-white border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171717] border-b border-white/10 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono text-[#FEE2E2]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>🟢 Available for freelance projects & roles</span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="text-sm font-mono tracking-wider text-[#A1A1AA] hover:text-[#DC2626] py-1"
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCupid();
              }}
              className="flex-1 py-2 rounded-md bg-[#DC2626] text-white font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Chat with Cupid AI ❤️
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

