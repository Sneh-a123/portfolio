import React, { useState, useEffect, useRef } from 'react';
import { Bot, Heart, Send, X, Minimize2, Maximize2, Sparkles, CheckCircle2, User, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendChatMessage } from '../services/api';
import { quickChatPrompts } from '../data/portfolioData';
import { playClickSound, playSuccessChime, playHeartbeatSound } from '../utils/soundEffects';

export const CupidChatbot = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome_1',
      sender: 'cupid_ai',
      text: "Hey there! 👋 Welcome to Sneha's creative universe.\n\nLooking for a developer, planning a project, or just exploring?\nI'm Cupid, Sneha's AI assistant. Let's make something awesome!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);

  // Client Info for Human Handoff
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (customMessage = null) => {
    const textToSend = customMessage || inputText;
    if (!textToSend.trim()) return;

    playClickSound();

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call backend Cupid AI endpoint
    try {
      const response = await sendChatMessage({
        message: textToSend,
        history: messages.map(m => ({ sender: m.sender, text: m.text })),
        clientInfo: clientData.email ? clientData : null,
      });

      setIsTyping(false);

      const aiMsg = {
        id: 'msg_ai_' + Date.now(),
        sender: 'cupid_ai',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If user expressed project intent and hasn't filled form yet, prompt for handoff form
      if (response.needsContactInfo || textToSend.toLowerCase().includes('hire') || textToSend.toLowerCase().includes('project')) {
        setTimeout(() => setShowLeadForm(true), 600);
      }

      if (response.handoffCompleted) {
        setLeadSuccess(true);
        playSuccessChime();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#DC2626', '#FEE2E2', '#FFFFFF'],
        });
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'cupid_ai',
          text: "I've received your note! Sneha is currently away from the chat, but a real human reply is on the way! ❤️",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  };

  const handleQuickOption = (prompt) => {
    playClickSound();
    handleSend(prompt.prompt);
    if (prompt.action === 'hire' || prompt.action === 'freelance') {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!clientData.name || !clientData.email || !clientData.project) return;

    playHeartbeatSound();
    setIsTyping(true);

    try {
      const response = await sendChatMessage({
        message: clientData.project,
        history: messages.map(m => ({ sender: m.sender, text: m.text })),
        clientInfo: clientData,
      });

      setIsTyping(false);
      setShowLeadForm(false);
      setLeadSuccess(true);

      const confirmationMsg = {
        id: 'lead_confirm_' + Date.now(),
        sender: 'cupid_ai',
        text: `That's an exciting idea, ${clientData.name}! 🚀\n\nI've received your project requirements and sent your message to Sneha.\nShe's currently away from the chat. Please hang tight while she reviews your request.\n\nA real human reply is on the way to ${clientData.email}! ❤️\n\nNotification sent to Sneha's queue. Thank you for connecting!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, confirmationMsg]);
      playSuccessChime();

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#FEE2E2', '#10B981'],
      });
    } catch (err) {
      setIsTyping(false);
      setShowLeadForm(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            playHeartbeatSound();
            onOpen();
          }}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-[#171717] hover:bg-[#202020] border border-[#DC2626]/50 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.65)] hover:scale-105 transition-all cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#DC2626] text-white">
            <Heart className="w-4 h-4 fill-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-[#171717]" />
          </div>

          <div className="text-left font-mono">
            <span className="text-xs font-bold text-white block">
              Cupid AI <span className="text-[#DC2626]">❤️</span>
            </span>
            <span className="text-[10px] text-[#A1A1AA]">
              Virtual Receptionist
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#DC2626] text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[410px] max-h-[85vh] flex flex-col rounded-2xl bg-[#171717] border border-[#DC2626]/40 shadow-2xl shadow-red-950/60 overflow-hidden animate-in slide-in-from-bottom duration-200">
      
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#171717] via-[#221010] to-[#171717] border-b border-white/10 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center text-white shadow-[0_0_12px_#DC2626]">
            <Heart className="w-4 h-4 fill-white animate-pulse" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-[#171717]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm text-white">Cupid AI</h3>
              <span className="text-xs text-[#DC2626]">❤️</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[#FEE2E2]">
                ASSISTANT
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#A1A1AA] truncate max-w-[210px]">
              I connect good ideas with the right developer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-md hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-md hover:bg-[#DC2626] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[380px] min-h-[260px] bg-[#121212]/90 text-left">
            
            {/* Receptionist Status Note */}
            <div className="p-2.5 rounded-lg bg-[#1F1717] border border-[#DC2626]/20 text-[11px] font-mono text-[#FEE2E2] flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
              <span>
                <strong>Virtual Receptionist Active:</strong> Sneha reviews all inquiries personally. Inquiries are stored in MongoDB &amp; notified via Nodemailer.
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender !== 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#DC2626] shrink-0 flex items-center justify-center text-white text-[10px] mt-1 shadow-[0_0_8px_#DC2626]">
                    ❤️
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#DC2626] text-white rounded-br-none shadow-md shadow-red-950/40'
                      : 'bg-[#202020] text-[#F3F4F6] border border-white/5 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line font-sans">{m.text}</p>
                  <span
                    className={`block text-[9px] font-mono mt-1 text-right ${
                      m.sender === 'user' ? 'text-white/70' : 'text-[#71717A]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] pl-8">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" />
                <span>Cupid AI is typing...</span>
              </div>
            )}

            {/* Quick Action Prompts */}
            {messages.length <= 2 && (
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block mb-1.5">
                  Quick Inquiries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickChatPrompts.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handleQuickOption(p)}
                      className="px-2.5 py-1 rounded-full bg-[#1A1A1A] hover:bg-[#DC2626] border border-white/10 hover:border-transparent text-[11px] font-mono text-[#FEE2E2] hover:text-white transition-all cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In-Chat Human Handoff Lead Capture Form */}
            {showLeadForm && !leadSuccess && (
              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#DC2626]/40 mt-3 animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                    Send Project Brief to Sneha:
                  </span>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="text-[#71717A] hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address *"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Project Brief / Requirements *"
                    value={clientData.project}
                    onChange={(e) => setClientData({ ...clientData, project: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626]"
                  />
                  <input
                    type="text"
                    placeholder="Project Timeline / Scope (e.g. 2 weeks / Full App)"
                    value={clientData.budget}
                    onChange={(e) => setClientData({ ...clientData, budget: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Notify Sneha Directly ❤️</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-[#171717] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Cupid anything or describe a project..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#DC2626] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-[#DC2626] disabled:bg-[#333333] disabled:text-[#71717A] text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

