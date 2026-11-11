import React, { useState } from 'react';
import { Send, CheckCircle2, Heart, Sparkles, Layers, Globe, Bot, Palette, Cpu, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { freelanceServices } from '../data/portfolioData';
import { sendInquiry } from '../services/api';
import { playClickSound, playSuccessChime, playHeartbeatSound } from '../utils/soundEffects';

const serviceIconMap = {
  Globe: Globe,
  Layers: Layers,
  Bot: Bot,
  Palette: Palette,
  Cpu: Cpu,
};

export const FreelanceSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Stack MERN Development',
    budget: 'Full MERN Application',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    playHeartbeatSound();

    try {
      const res = await sendInquiry({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        project: formData.message,
        source: 'contact_form',
      });

      setLoading(false);
      setSubmitted(true);
      playSuccessChime();

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#FEE2E2', '#FFFFFF'],
      });
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to deliver message. Please contact snehasinha0905@gmail.com directly.');
    }
  };

  return (
    <section id="freelance" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5 bg-[#0F0F0F]">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/2 right-10 w-[420px] h-[420px] bg-[#DC2626]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#DC2626]/30 text-xs font-mono text-[#FEE2E2] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
            <span>SCENE 06 // FREELANCE &amp; COLLABORATION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Got an Idea? <span className="text-[#DC2626]">Let's Make It Real.</span>
          </h2>

          <div className="mt-4 max-w-xl text-base sm:text-lg font-sans text-[#A1A1AA] leading-relaxed">
            <p className="text-white font-medium">You bring the vision.</p>
            <p>I'll bring the code, creativity and commitment.</p>
          </div>
        </div>

        {/* Services Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {freelanceServices.map((service) => {
            const Icon = serviceIconMap[service.icon] || Globe;
            const isSelected = formData.service === service.title;
            return (
              <div
                key={service.id}
                onClick={() => {
                  playClickSound();
                  setFormData({ ...formData, service: service.title });
                }}
                className={`glass-panel rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-[#DC2626] bg-[#221010]/50 shadow-[0_0_20px_rgba(220,38,38,0.25)]'
                    : 'border-white/10 hover:border-white/25 hover:bg-[#1A1A1A]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center text-[#DC2626]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded">
                      {service.timeline}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#DC2626] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#0F0F0F] text-[10px] font-mono text-[#E4E4E7]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71717A]">Scope:</span>
                  <span className="text-[#FEE2E2] font-semibold">Custom &bull; Scalable</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instant Inquiry Contact Form */}
        <div id="contact" className="glass-panel rounded-2xl p-8 sm:p-12 border border-[#DC2626]/40 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="font-display font-bold text-2xl text-white">
                  Message Dispatched to Sneha! ❤️
                </h3>
                
                <p className="text-sm font-sans text-[#FEE2E2]/90 leading-relaxed max-w-md mx-auto">
                  Your project requirements have been recorded in MongoDB and sent directly to Sneha's email via Nodemailer.
                  <br />
                  <strong className="text-white block mt-2">
                    A real human reply is on the way to {formData.email}!
                  </strong>
                </p>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        service: 'Full Stack MERN Development',
                        budget: 'Full MERN Application',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Start a Conversation
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#A1A1AA] mt-1">
                    Fill in your project brief. Sneha reads every message and replies within 24 hours.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Interested Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors cursor-pointer"
                    >
                      {freelanceServices.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full-Time Hiring / Role">Full-Time Hiring / Role</option>
                      <option value="Consulting / Architecture">Consulting / Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                      Project Scope
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors cursor-pointer"
                    >
                      <option value="MVP / Rapid Launch">MVP / Rapid Launch (1-2 weeks)</option>
                      <option value="Full MERN Application">Full MERN Application (End-to-End)</option>
                      <option value="AI Integration / Custom Agent">AI Integration / Custom Agent</option>
                      <option value="Redesign & Performance Polish">Redesign &amp; Performance Polish</option>
                      <option value="Full-time Role / Contract">Full-time Role / Contract</option>
                      <option value="Custom Project Scope">Custom Project Scope</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A1A1AA] mb-1.5">
                    Project Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your vision, timeline, key features, or any links..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] disabled:bg-[#441111] text-white font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {loading ? (
                      <span className="font-mono text-xs">Sending to Sneha's Inbox...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-white fill-white group-hover:scale-125 transition-transform animate-pulse" />
                        <span>Let's Create Something Crazy ❤️</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-mono text-[#71717A] flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    Direct SMTP delivery • Zero spam • Human response guaranteed
                  </span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

