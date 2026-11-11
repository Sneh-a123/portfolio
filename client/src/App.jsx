import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/HeroScene';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FreelanceSection } from './components/FreelanceSection';
import { CupidChatbot } from './components/CupidChatbot';
import { TerminalDrawer } from './components/TerminalDrawer';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cupidOpen, setCupidOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuildClick = () => {
    const el = document.getElementById('freelance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#DC2626] selection:text-white relative font-sans overflow-x-hidden">
      
      {/* Precision Custom Cursor with Trailing Mini Red Heart */}
      <CustomCursor />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCupid={() => setCupidOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Experience Scenes */}
      <main>
        {/* Scene 1: Entry Hero with 3D Heart Canvas & Floating Code */}
        <HeroScene
          onExploreClick={handleExploreClick}
          onBuildClick={handleBuildClick}
        />

        {/* Scene 2: About Me (Personality + Love & 4 Pillars) */}
        <AboutSection />

        {/* Scene 3: Tech Stack (My Weapons of Mass Creation. ⚡) */}
        <TechStackSection />

        {/* Scene 4: Projects (Show, Don't Just Tell & 3D Tilt) */}
        <ProjectsSection />

        {/* Scene 6: Freelance & Client Inquiries */}
        <FreelanceSection />
      </main>

      {/* Scene 7: Memorable Ending / Footer */}
      <Footer />

      {/* Scene 5: Cupid AI Receptionist Chatbot */}
      <CupidChatbot
        isOpen={cupidOpen}
        onClose={() => setCupidOpen(false)}
        onOpen={() => setCupidOpen(true)}
      />

      {/* Interactive Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenCupid={() => {
          setTerminalOpen(false);
          setCupidOpen(true);
        }}
      />

      {/* Interactive Resume / CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
}

export default App;

