export const personalInfo = {
  name: "Sneha Sinha",
  brandName: "SNEHA.EXE",
  role: "Full Stack MERN Developer & AI Engineer",
  tagline: "Building Digital Experiences with Logic, Creativity & a Little Love.",
  subTagline: "Turning caffeine, creativity & code into digital magic.",
  location: "India // Remote Worldwide",
  availability: "Available for Freelance & Full-Time Roles",
  statusBadge: "🟢 Accepting New Projects — Q1/Q2",
  email: "snehasinha0905@gmail.com",
  github: "https://github.com/Sneh-a123",
  linkedin: "https://www.linkedin.com/in/sinha-sneha/",
  bioShort: "I'm Sneha Sinha — a developer who loves turning crazy ideas into meaningful digital products. From frontend pixels to backend logic, I enjoy the entire journey of making something from zero to WOW!",
  philosophy: "Some people fall in love with music, some with art... I fell in love with building things on the internet.",
  quote: "I don't just make things look good. I make sure they actually work."
};

export const personalityTraits = [
  {
    title: "Creative Mind",
    icon: "Sparkles",
    color: "#DC2626",
    description: "Seeing beyond standard UI grids. Crafting soulful micro-interactions, bold color harmonies, and fluid animations that make users smile.",
    stat: "100+ UI Prototypes",
  },
  {
    title: "Logical Brain",
    icon: "Cpu",
    color: "#F87171",
    description: "Obsessed with clean data structures, resilient REST/GraphQL APIs, type safety, database indexing, and sub-100ms response latencies.",
    stat: "99.9% Uptime Mindset",
  },
  {
    title: "Curious Soul",
    icon: "Compass",
    color: "#EF4444",
    description: "Constantly experimenting with Gemini LLM APIs, autonomous agents, WebGL shaders, Three.js 3D viewports, and edge computing.",
    stat: "Always Experimenting",
  },
  {
    title: "Builder Energy",
    icon: "Zap",
    color: "#B91C1C",
    description: "Turning raw coffee and whiteboard wireframes into deployed, revenue-generating SaaS platforms in record turnarounds.",
    stat: "Zero to WOW!",
  },
];

export const techStackCategories = [
  {
    name: "Frontend",
    tagline: "Pixel-perfect interfaces & cinematic animations",
    icon: "Layout",
    skills: [
      { name: "React.js", level: "Advanced", hot: true },
      { name: "JavaScript (ES6+)", level: "Advanced", hot: false },
      { name: "Tailwind CSS", level: "Expert", hot: true },
      { name: "HTML5 / Semantic", level: "Expert", hot: false },
      { name: "CSS3 / Modern", level: "Expert", hot: false },
      { name: "Three.js / WebGL", level: "Intermediate", hot: true },
    ]
  },
  {
    name: "Backend",
    tagline: "Scalable APIs, secure auth & microservices",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "Advanced", hot: true },
      { name: "Express.js", level: "Advanced", hot: true },
      { name: "RESTful Architecture", level: "Advanced", hot: false },
      { name: "JWT & RBAC Security", level: "Advanced", hot: false },
      { name: "WebSocket / Socket.io", level: "Proficient", hot: false },
    ]
  },
  {
    name: "Database",
    tagline: "Structured schemas & query performance",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "Advanced", hot: true },
      { name: "Mongoose ODM", level: "Advanced", hot: false },
      { name: "SQL / PostgreSQL", level: "Proficient", hot: false },
      { name: "Redis Caching", level: "Intermediate", hot: false },
    ]
  },
  {
    name: "AI & GenAI",
    tagline: "Smart autonomous assistants & vector pipelines",
    icon: "Bot",
    skills: [
      { name: "Gemini API", level: "Advanced", hot: true },
      { name: "LLM Orchestration", level: "Advanced", hot: true },
      { name: "Python Scripting", level: "Proficient", hot: false },
      { name: "AI Agent Workflows", level: "Advanced", hot: true },
      { name: "Prompt Engineering", level: "Expert", hot: false },
    ]
  },
  {
    name: "Tools & DevOps",
    tagline: "Smooth workflows, CI/CD & developer tools",
    icon: "Wrench",
    skills: [
      { name: "Git & GitHub", level: "Expert", hot: false },
      { name: "Postman", level: "Advanced", hot: false },
      { name: "Vite & Webpack", level: "Advanced", hot: false },
      { name: "Vercel & Render", level: "Advanced", hot: true },
      { name: "Docker (Basics)", level: "Intermediate", hot: false },
    ]
  }
];

export const projects = [
  {
    id: "ai-school-system",
    title: "AI School Management System",
    badge: "MERN + AI Flagship",
    shortDesc: "An intelligent MERN platform featuring automated attendance, automated question paper generation, real-time student analytics, and an integrated AI academic tutor.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Gemini API", "Tailwind CSS", "JWT"],
    liveDemo: "https://github.com/Sneh-a123/Ai-School-management-system",
    github: "https://github.com/Sneh-a123/Ai-School-management-system",
    highlights: [
      "Engineered full MERN backend supporting role-based access for Admins, Teachers, Students, and Parents.",
      "Built instant AI Question Paper generator with configurable Bloom's taxonomy difficulty curves using Gemini API.",
      "Integrated automated facial & biometric-ready attendance logging with PDF grade report export.",
      "Embedded Cupid-inspired AI academic guidance chatbot answering syllabus doubts 24/7."
    ],
    myContribution: "Architected the complete system from scratch: database schema design with Mongoose, secure JWT auth with refresh tokens, Gemini API prompt chains for dynamic exam generation, and responsive React frontend with interactive data charts."
  },
  {
    id: "ai-schedule-maker",
    title: "AI Schedule Maker",
    badge: "Live on Vercel ⚡",
    shortDesc: "An AI-powered scheduling and calendar intelligence web application designed to solve conflict-free scheduling, optimize shifts, and make planning effortless.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    techStack: ["React", "Express.js", "Node.js", "MongoDB", "AI Heuristics", "Vercel"],
    liveDemo: "https://ai-schedule-maker-eight.vercel.app/",
    github: "https://github.com/Sneh-a123",
    highlights: [
      "Live deployed on Vercel with instant cloud responsiveness and optimized bundle delivery.",
      "Constraint-satisfaction scheduling algorithm handling leave balance, priority roles, and fatigue rules.",
      "Natural language schedule generation: converts unstructured requests into structured timelines.",
      "Interactive drag-and-drop timeline with instant conflict-warning toasts and 3D preview cards."
    ],
    myContribution: "Designed the visual schedule builder UI, deployed the live production build on Vercel, integrated constraint solver logic in Node.js, and implemented optimistic UI updates for lag-free scheduling."
  },
  {
    id: "ai-developer-productivity-assistant",
    title: "AI-Powered Developer Productivity Assistant",
    badge: "GenAI & Developer Tooling",
    shortDesc: "An intelligent developer assistant designed to supercharge engineering productivity, automate code analysis, summarize technical workflows, and streamline daily engineering tasks.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express", "Gemini API", "Python"],
    liveDemo: "https://github.com/Sneh-a123/AI-Powered-Developer-Productivity-Assistant",
    github: "https://github.com/Sneh-a123/AI-Powered-Developer-Productivity-Assistant",
    highlights: [
      "Intelligent developer workflow assistant integrating LLM APIs for automated code review, documentation generation, and bug root-cause analysis.",
      "Natural language developer prompt routing: converts complex requirements into structured code boilerplates.",
      "Smart context retention for multi-step engineering queries, refactoring suggestions, and API contract designs.",
      "Engineered with a high-speed, keyboard-driven UI inspired by modern developer CLI tooling."
    ],
    myContribution: "Architected the prompt orchestration pipeline with LLMs, built the full-stack interface with React and Tailwind, and created modular utilities for codebase context injection."
  }
];

export const freelanceServices = [
  {
    id: "web-dev",
    title: "Website Development",
    icon: "Globe",
    timeline: "1 - 2 Weeks",
    description: "High-performance, mobile-responsive, SEO-optimized web applications with modern animations and startup-grade polish.",
    tags: ["React", "Vite", "Tailwind", "Responsive", "SEO Ready"]
  },
  {
    id: "mern-stack",
    title: "Full Stack MERN Development",
    icon: "Layers",
    timeline: "2 - 4 Weeks",
    description: "Complete end-to-end web apps with Node.js/Express APIs, MongoDB schemas, JWT authentication, payment gates, and admin portals.",
    tags: ["Full Stack", "Express", "MongoDB", "REST API", "Auth"]
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Integration",
    icon: "Bot",
    timeline: "1 - 2 Weeks",
    description: "Custom AI assistants like Cupid AI tailored for your business with automated lead capture, smart fallback, and human handoff via email/SMS.",
    tags: ["Gemini API", "LLM Fine-tuning", "Lead Gen", "Smart Handoff"]
  },
  {
    id: "redesign",
    title: "Website Redesign & Polish",
    icon: "Palette",
    timeline: "1 Week",
    description: "Transform outdated websites into Awwwards-worthy digital experiences with 3D elements, dark mode, smooth scrolling, and Gen-Z aesthetics.",
    tags: ["UI/UX Redesign", "Awwwards Feel", "Animations", "Conversion"]
  },
  {
    id: "api-dev",
    title: "API Development & Integration",
    icon: "Cpu",
    timeline: "3 - 7 Days",
    description: "Robust, documented, and secure RESTful backend endpoints with rate limiting, validation, webhooks, and third-party integrations.",
    tags: ["Node.js", "Express", "Swagger", "Webhooks", "Security"]
  }
];

export const quickChatPrompts = [
  { label: "Hire Sneha ❤️", action: "hire", prompt: "I would like to discuss hiring Sneha for a project or role!" },
  { label: "Freelance Project", action: "freelance", prompt: "I have a freelance project idea and need an estimate." },
  { label: "Explore Projects", action: "projects", prompt: "Tell me about Sneha's flagship projects and what tech she used." },
  { label: "Contact Sneha", action: "contact", prompt: "What is the best way to directly contact Sneha?" },
];
