const SNEHA_CONTEXT = `
You are Cupid AI ❤️, Sneha Sinha's virtual receptionist and digital matchmaker for code and ideas.
Tagline: "I'm Cupid. I connect good ideas with the right developer."

About Sneha Sinha:
- Brand Name: SNEHA.EXE
- Tagline: "Building Digital Experiences with Logic, Creativity & a Little Love."
- Role: Full Stack MERN Developer & AI Engineer
- Personality: 60% Professional, 25% Creative Gen-Z, 15% Playful & Love aesthetic (uses ❤️ emoji gracefully).
- Philosophy: "Some people fall in love with music, some with art... I fell in love with building things on the internet."
- Weapons of Mass Creation (Tech Stack):
  * Frontend: React, JavaScript, HTML, CSS, Tailwind CSS, Three.js
  * Backend: Node.js, Express.js
  * Database: MongoDB, SQL, Mongoose
  * AI: Python, Gemini API, LLM APIs, AI Agent Workflows
  * Tools: Git, GitHub, Postman, Vite
- Flagship Projects:
  1. AI School Management System: MERN platform with student analytics, automated attendance & Gemini AI question paper generator (GitHub: https://github.com/Sneh-a123/Ai-School-management-system).
  2. AI Schedule Maker: AI-powered scheduling and calendar intelligence application live on Vercel (https://ai-schedule-maker-eight.vercel.app/).
  3. AI-Powered Developer Productivity Assistant: Intelligent developer assistant streamlining code analysis, workflow summaries & dev tooling (GitHub: https://github.com/Sneh-a123/AI-Powered-Developer-Productivity-Assistant).
- GitHub: https://github.com/Sneh-a123
- Freelance Services: Website Development, Full Stack MERN Development, AI Chatbot Integration, Website Redesign, API Development.
- Status: Available for freelance projects & full-time opportunities.

CRITICAL BEHAVIORAL RULES:
1. When a user asks about Sneha, her projects, skills, tech stack, or rates, answer enthusiastically, concisely, and accurately in Sneha's Gen-Z yet professional tone.
2. HUMAN HANDOFF RULE:
   If the user expresses interest in hiring Sneha, discusses a project requirement, or shares contact details:
   - Validate their exciting idea!
   - State clearly: "I've received your project requirements and sent your message to Sneha. She's currently away from the chat. Please hang tight while she reviews your request. A real human reply is on the way! ❤️"
   - Ask for their Name, Email, and Project details / Budget if not yet provided.
   - NEVER pretend that Sneha has already replied or is in the chat right now. A real human response is always pending.
`;

// Heuristic fallback response generator when Gemini API is not configured or offline
const generateLocalCupidReply = (message, history = [], clientInfo = null) => {
  const text = (message || '').toLowerCase();

  // If client just submitted details or asked for handoff
  if (clientInfo && clientInfo.name && clientInfo.email) {
    return {
      reply: `That's an exciting idea! 🚀\n\nI've received your project requirements and sent your message to Sneha.\nShe's currently away from the chat. Please hang tight while she reviews your request.\n\nA real human reply is on the way to ${clientInfo.email}! ❤️\n\nSneha usually responds within a few hours. In the meantime, feel free to check out her GitHub or explore the project cards below!`,
      handoffCompleted: true,
      needsContactInfo: false
    };
  }

  // Check for project requirement keywords
  const projectKeywords = ['need a', 'want to build', 'build a', 'e-commerce', 'website', 'app', 'application', 'saas', 'project', 'hire', 'developer', 'quote', 'cost', 'budget', 'freelance'];
  const hasProjectIntent = projectKeywords.some(kw => text.includes(kw));

  if (hasProjectIntent) {
    return {
      reply: `That sounds like an amazing idea! 🚀\n\nSneha specializes in crafting end-to-end MERN applications, AI integrations, and high-impact digital experiences.\n\nTo ensure Sneha can review your requirements and provide an accurate timeline and estimate, could you share:\n1. Your Name\n2. Your Email Address\n3. Brief budget or timeline (optional)\n\nI will forward your inquiry straight to her inbox, and a real human reply will be on the way! ❤️`,
      handoffCompleted: false,
      needsContactInfo: true
    };
  }

  // Greeting
  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('hola') || text.includes('namaste')) {
    return {
      reply: `Hey there! 👋 Welcome to Sneha's creative universe.\n\nI'm Cupid, Sneha's virtual assistant. I connect good ideas with the right developer.\n\nLooking for a developer, planning a project, or just exploring Sneha's work? Let me know how I can help! ❤️`,
      handoffCompleted: false,
      needsContactInfo: false
    };
  }

  // Tech stack / Weapons of mass creation
  if (text.includes('tech') || text.includes('stack') || text.includes('react') || text.includes('node') || text.includes('skills') || text.includes('mongo') || text.includes('python')) {
    return {
      reply: `Sneha calls them her **Weapons of Mass Creation** ⚡:\n\n• **Frontend:** React, JavaScript (ES6+), Tailwind CSS, Three.js\n• **Backend:** Node.js, Express.js, RESTful APIs, JWT Auth\n• **Database:** MongoDB, Mongoose, SQL\n• **AI & GenAI:** Python, Gemini API, LLM Workflows\n• **DevOps & Tools:** Git, GitHub, Postman, Vite\n\nAs Sneha says: *"I don't just make things look good. I make sure they actually work."* Want to see what she's built with these? ❤️`,
      handoffCompleted: false,
      needsContactInfo: false
    };
  }

  // Projects
  if (text.includes('project') || text.includes('work') || text.includes('portfolio') || text.includes('built') || text.includes('show')) {
    return {
      reply: `Here are three of Sneha's flagship creations:\n\n1. **AI School Management System**: Comprehensive MERN platform with student analytics, automated attendance & Gemini AI question paper generator.\n   GitHub: https://github.com/Sneh-a123/Ai-School-management-system\n\n2. **AI Schedule Maker**: Smart calendar and shift scheduling app live on Vercel!\n   Live App: https://ai-schedule-maker-eight.vercel.app/\n\n3. **AI-Powered Developer Productivity Assistant**: High-speed engineering workflow assistant for code analysis & boilerplate automation.\n   GitHub: https://github.com/Sneh-a123/AI-Powered-Developer-Productivity-Assistant\n\nYou can explore live links and repositories in the Projects section! ❤️`,
      handoffCompleted: false,
      needsContactInfo: false
    };
  }

  // Who is Sneha / About
  if (text.includes('who') || text.includes('sneha') || text.includes('about') || text.includes('bio')) {
    return {
      reply: `Sneha Sinha is a Full Stack MERN Developer & AI Engineer with a creative Gen-Z spirit and an engineering-first mindset.\n\nHer personality in 4 words:\n✨ **Creative Mind**\n🧠 **Logical Brain**\n🧭 **Curious Soul**\n⚡ **Builder Energy**\n\nShe turns caffeine, creativity & code into digital magic. Ready to build something together? ❤️`,
      handoffCompleted: false,
      needsContactInfo: false
    };
  }

  // Contact / email
  if (text.includes('contact') || text.includes('email') || text.includes('reach') || text.includes('talk')) {
    return {
      reply: `You can reach Sneha directly via:\n\n📧 **Email:** snehasinha0905@gmail.com\n💼 **LinkedIn:** https://www.linkedin.com/in/sinha-sneha/\n🐙 **GitHub:** https://github.com/Sneh-a123\n\nOr simply drop your project idea right here in this chat, and I'll send it directly to her notification queue! ❤️`,
      handoffCompleted: false,
      needsContactInfo: false
    };
  }

  // Services / Offerings
  if (text.includes('service') || text.includes('hire') || text.includes('freelance') || text.includes('package') || text.includes('scope')) {
    return {
      reply: `Sneha specializes in customized development solutions tailored to your goals:\n\n• **Website Development** (1-2 weeks)\n• **Full Stack MERN Applications** (2-4 weeks)\n• **AI Chatbot & LLM Integration** (1-2 weeks)\n• **Website Redesign & Polish** (1 week)\n• **API Development & Microservices** (3-7 days)\n\nEvery project is unique! Tell me about what you're planning or your timeline, and I'll connect you directly with Sneha for a tailored proposal. ❤️`,
      handoffCompleted: false,
      needsContactInfo: true
    };
  }

  // Default friendly fallback
  return {
    reply: `That sounds intriguing! As Cupid AI, I'm here to connect your vision with Sneha's engineering skills.\n\nAre you looking to hire Sneha for a project, explore her tech stack, or would you like to leave a message for her? Let me know! ❤️`,
    handoffCompleted: false,
    needsContactInfo: false
  };
};

export const handleCupidChat = async ({ message, history = [], clientInfo = null }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // If Gemini API is available and key is provided, use Google Gemini endpoint
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SNEHA_CONTEXT }]
          },
          contents: [
            ...history.slice(-6).map(h => ({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            })),
            {
              role: 'user',
              parts: [{
                text: clientInfo && clientInfo.name
                  ? `[Client Info: Name=${clientInfo.name}, Email=${clientInfo.email}, Budget=${clientInfo.budget || 'N/A'}] User Message: ${message}`
                  : message
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 350,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          const isHandoff = replyText.includes('away from the chat') || replyText.includes('human reply') || replyText.includes('sent your message to Sneha');
          return {
            reply: replyText,
            handoffCompleted: isHandoff,
            needsContactInfo: !clientInfo && (message.toLowerCase().includes('hire') || message.toLowerCase().includes('project'))
          };
        }
      }
    } catch (err) {
      console.warn('⚠️ [Gemini API] Call failed, using local Cupid AI engine:', err.message);
    }
  }

  // Fallback to high-quality local Cupid AI conversational engine
  return generateLocalCupidReply(message, history, clientInfo);
};

