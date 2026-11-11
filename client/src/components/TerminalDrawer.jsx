import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalInfo, projects, techStackCategories } from '../data/portfolioData';
import { playClickSound, playSuccessChime } from '../utils/soundEffects';

export const TerminalDrawer = ({ isOpen, onClose, onOpenCupid }) => {
  const [commandHistory, setCommandHistory] = useState([
    {
      type: 'system',
      text: 'SNEHA.EXE Interactive Terminal [Version 2.0.26]\n(c) Sneha Sinha. All rights reserved.\nType "help" or "/about", "/projects", "/skills", "/contact", "/hire" to begin.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [pastInputs, setPastInputs] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, commandHistory]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    playClickSound();

    setPastInputs((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const lower = cmd.toLowerCase().replace(/^\//, ''); // handle both 'about' and '/about'

    let reply = '';
    let action = null;

    switch (lower) {
      case 'help':
      case '?':
        reply = `
AVAILABLE COMMANDS:
  /about         View Sneha's background, personality & philosophy
  /projects      Inspect flagship MERN & AI projects
  /skills        Show weapons of mass creation (Tech stack)
  /services      Explore freelance offerings & pricing
  /contact       Get direct communication links
  /cupid         Launch Cupid AI virtual receptionist
  /clear         Clear terminal output
  /whoami        Discover who you are in Sneha's universe
  sudo hire-sneha Issue instant offer letter (Easter Egg)
        `;
        break;

      case 'about':
      case 'bio':
        reply = `
[SNEHA SINHA // SNEHA.EXE]
Role:       Full Stack MERN Developer & AI Engineer
Tagline:    ${personalInfo.tagline}
Manifesto:  "${personalInfo.philosophy}"
Pillars:    Creative Mind • Logical Brain • Curious Soul • Builder Energy
Status:     ${personalInfo.availability}
        `;
        break;

      case 'projects':
      case 'work':
        reply = projects
          .map((p, i) => `[0${i + 1}] ${p.title}\n    Tech: ${p.techStack.join(', ')}\n    Demo: ${p.liveDemo}\n    Repo: ${p.github}`)
          .join('\n\n');
        break;

      case 'skills':
      case 'weapons':
      case 'stack':
        reply = techStackCategories
          .map((c) => `• ${c.name.toUpperCase()}: ${c.skills.map((s) => s.name).join(', ')}`)
          .join('\n');
        break;

      case 'services':
      case 'hire':
        reply = `
FREELANCE SERVICES:
  1. Website Development (Modern, responsive, SEO-ready)
  2. Full Stack MERN Development (Scalable APIs, auth & database)
  3. AI Chatbot Integration (Custom LLM & automated handoff)
  4. Website Redesign & Polish (Awwwards-level UI/UX & animations)
  5. API Development & Auth (REST, webhooks & microservices)

Ready to proceed? Scroll to the Freelance section or type /cupid!
        `;
        break;

      case 'contact':
      case 'email':
        reply = `
COMMUNICATION CHANNELS:
  Email:    ${personalInfo.email}
  GitHub:   ${personalInfo.github}
  LinkedIn: ${personalInfo.linkedin}
        `;
        break;

      case 'cupid':
        reply = `Connecting to Cupid AI Virtual Assistant... ❤️`;
        action = () => onOpenCupid();
        break;

      case 'clear':
      case 'cls':
        setCommandHistory([]);
        setInputVal('');
        return;

      case 'whoami':
        reply = `guest@sneha-universe ~ A visionary client or fellow engineer ready to build something great.`;
        break;

      case 'sudo hire-sneha':
      case 'sudo hire':
        reply = `
[ACCESS GRANTED] 🚀
Sneha has received your recruitment request!
Offer status: 200 OK.
Redirecting to Cupid AI to finalize details... ❤️
        `;
        playSuccessChime();
        action = () => onOpenCupid();
        break;

      default:
        reply = `Command not recognized: "${cmd}". Type "help" to view command list.`;
    }

    setCommandHistory((prev) => [
      ...prev,
      { type: 'user', text: `$ ${rawCmd}` },
      { type: 'response', text: reply.trim() },
    ]);

    setInputVal('');

    if (action) {
      setTimeout(action, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (pastInputs.length > 0) {
        const nextIdx = historyIndex + 1 < pastInputs.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(pastInputs[pastInputs.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(pastInputs[pastInputs.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 font-mono text-left ${
        isFullScreen
          ? 'inset-4 sm:inset-10'
          : 'bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-[580px] h-[450px]'
      }`}
    >
      <div className="w-full h-full rounded-2xl bg-[#0D0D0D]/95 border border-[#DC2626]/50 shadow-2xl shadow-red-950/70 flex flex-col overflow-hidden backdrop-blur-xl">
        
        {/* Terminal Header */}
        <div className="bg-[#171717] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-xs text-[#A1A1AA] font-bold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#DC2626]" />
              sneha@macbook-pro:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1 rounded hover:bg-white/10 text-[#71717A] hover:text-white"
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1 rounded hover:bg-[#DC2626] text-[#71717A] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed text-[#FEE2E2]">
          {commandHistory.map((item, idx) => (
            <div
              key={idx}
              className={`${
                item.type === 'user'
                  ? 'text-white font-bold'
                  : item.type === 'system'
                  ? 'text-[#A1A1AA]'
                  : 'text-[#FCA5A5] whitespace-pre-wrap'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input */}
        <div className="p-3 bg-[#111111] border-t border-white/10 flex items-center gap-2">
          <span className="text-[#DC2626] font-bold text-sm">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type /about, /projects, /skills, /hire..."
            className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder-[#52525B]"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-[#71717A]" />
        </div>

      </div>
    </div>
  );
};

