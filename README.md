# SNEHA.EXE — Full Stack MERN Portfolio & Cupid AI

> **"Building Digital Experiences with Logic, Creativity & a Little Love ❤️"**

A high-performance, Awwwards-inspired MERN portfolio for **Sneha Sinha**, built with **React, Three.js, Tailwind CSS, Node.js, Express, MongoDB, and Nodemailer**.

---

## 🌟 Brand & Visual Direction

- **Brand Name:** `SNEHA.EXE`
- **Tagline:** *Building Digital Experiences with Logic, Creativity & a Little Love.*
- **Sub-tagline:** *Turning caffeine, creativity & code into digital magic.*
- **Palette:**
  - **Bold Red:** `#DC2626`
  - **Deep Black:** `#171717` / `#0F0F0F`
  - **Pure White:** `#FFFFFF`
  - **Soft Pink:** `#FEE2E2`
- **Typography:** `Space Grotesk` (Headings) + `Inter` (Body) + `JetBrains Mono` (Terminal & Code).
- **Tone Balance:** 60% High-Grade Engineering, 25% Creative Gen-Z Polish, 15% Playful Love Aesthetic.

---

## 🎬 7 Complete Scenes Breakdown

### Scene 1: Entry Animation — First Impression
- **Three.js 3D Glowing Heart:** Mathematically extruded parametric cardiac curve with physical sheen material, mouse-reactive 3D rotation, and ambient star constellation.
- **Micro-Interactions:** Heart bounces on hover/click with synthesized Web Audio heartbeat feedback.
- **Floating Code Snippets:** Live background chips with realistic async function signatures.
- **CTAs:** `[Explore My Universe]` & `[Let's Build Something ❤️]`.

### Scene 2: About Me — Personality + Love
- **Manifesto:** *"Some people fall in love with music, some with art... I fell in love with building things on the internet."*
- **4 Personality Pillars:**
  1. **Creative Mind:** Micro-interactions, soul, and fluid transitions.
  2. **Logical Brain:** 99.9% uptime mindset, database schemas, latency optimization.
  3. **Curious Soul:** LLM pipelines, autonomous agents, WebGL shaders.
  4. **Builder Energy:** Rapid zero-to-WOW SaaS delivery.

### Scene 3: Tech Stack — My Playground
- **Heading:** *My Weapons of Mass Creation. ⚡*
- **Categories:** Frontend, Backend, Database, AI & GenAI, DevOps & Tools.
- **Filter Tabs & Skills Cloud:** Filterable interactive category cards with proficiency levels.
- **Philosophy:** *"I don't just make things look good. I make sure they actually work."*

### Scene 4: Projects — Show, Don't Just Tell
- **Featured Products:**
  1. **AI School Management System:** Full MERN platform with student analytics, automated attendance, AI chatbot, and dynamic exam generator powered by Gemini API.
     - **GitHub:** https://github.com/Sneh-a123/Ai-School-management-system
  2. **AI Schedule Maker:** AI-powered calendar intelligence web application designed to solve conflict-free scheduling and optimize shifts.
     - **Live on Vercel:** https://ai-schedule-maker-eight.vercel.app/
     - **GitHub Profile:** https://github.com/Sneh-a123
  3. **AI-Powered Developer Productivity Assistant:** Intelligent developer assistant supercharging code analysis, workflow summaries & dev tooling.
     - **GitHub:** https://github.com/Sneh-a123/AI-Powered-Developer-Productivity-Assistant
- **Card Features:** 3D hover tilt physics with specular red glare, live demo link, GitHub repo link, and **"Deep Dive / My Contribution"** breakdown modal.

### Scene 5: Cupid AI — Virtual Receptionist ❤️
- **Superstar Feature:** Floating Cupid AI assistant dialog with live status indicator.
- **Tagline:** *"I'm Cupid. I connect good ideas with the right developer."*
- **Quick Actions:** *Hire Sneha ❤️*, *Freelance Project*, *Explore Projects*, *Contact Sneha*.
- **Autonomous Human Handoff:**
  - Collects Name, Email, Project Brief, and optional Budget.
  - Returns clear handoff message: *"That's an exciting idea! 🚀 I've received your project requirements and sent your message to Sneha. She's currently away from the chat... A real human reply is on the way! ❤️"*
  - Saves inquiry in MongoDB and dispatches a notification email to Sneha via **Nodemailer**.
  - Confetti celebration upon handoff completion.

### Scene 6: Freelance Section — Client Conversion
- **Heading:** *"Got an Idea? Let's Make It Real."*
- **Subtitle:** *"You bring the vision. I'll bring the code, creativity and commitment."*
- **Service Catalog:** Website Development, Full Stack MERN Development, AI Chatbot Integration, Website Redesign, API Development.
- **Instant Inquiry Form:** Direct client input with budget selector, input validation, and direct MongoDB + SMTP email notification.

### Scene 7: Final Screen — Memorable Ending
- **Closing Quote:** *"Every great product starts with an idea. Maybe yours starts here."*
- **Credits:** *"Made with ❤️ by Sneha. Building the future, one line of code at a time."*
- **Channels:** Direct links for GitHub ([github.com/Sneh-a123](https://github.com/Sneh-a123)), LinkedIn ([linkedin.com/in/sinha-sneha](https://www.linkedin.com/in/sinha-sneha/)), and Email (`snehasinha0905@gmail.com`).
- **Smooth Back-to-Top:** Instant return to hero.

---

## ⚡ Special Interactive Features

1. **Custom Trailing Cursor:** Precision glowing red dot with trailing mini heart icon and magnetic hover detection.
2. **Interactive CLI Terminal (`>_`):** Docked zsh-style terminal supporting `/about`, `/projects`, `/skills`, `/contact`, `/cupid`, `/clear`, `/services`, and Easter eggs like `sudo hire-sneha`.
3. **Web Audio Synthesizer:** Zero-dependency audio feedback for mechanical clicks, success chimes, and heartbeat pulses (includes mute toggle in header).
4. **Self-Healing Storage:** Automatically connects to MongoDB when available; seamlessly falls back to local storage if MongoDB is not running locally so development never blocks.

---

## 🚀 Running the Project

### 1. Installation
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configuration
Review `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sneha_portfolio
JWT_SECRET=sneha_super_secret_jwt_key_2026_exe_love_logic
ADMIN_EMAIL=snehasinha0905@gmail.com
ADMIN_PASSWORD=sneha@admin2026
NOTIFICATION_EMAIL=snehasinha0905@gmail.com
CLIENT_URL=http://localhost:5173

# Optional: Google Gemini API Key for dynamic LLM chat
GEMINI_API_KEY=

# Optional: Real SMTP credentials (e.g. Gmail App Password, Resend, or SendGrid)
# If left blank, Nodemailer automatically creates an Ethereal sandbox with preview URLs!
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

### 3. Launching

In Terminal 1 (Backend API):
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

In Terminal 2 (Vite Frontend):
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

