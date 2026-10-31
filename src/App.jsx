import React, { useState } from 'react';
import { Agentation } from 'agentation';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import Experience from './sections/Experience';
import Tech from './sections/Tech';
import Security from './sections/Security';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import StarsCanvas from './canvas/StarsCanvas';
import BlackHole from './canvas/BlackHole';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative z-0 bg-[#040015] text-white min-h-screen overflow-hidden">
      {/* Multilingual Intro Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Exact Celestial Stars Canvas (Teal pinpricks in a sphere) */}
      <StarsCanvas />

      {/* Nav Black Hole Video background spanning top navbar and hero */}
      <BlackHole />

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Overview Section */}
      <Overview />

      {/* 4. Work Experience Section */}
      <Experience />

      {/* 5. Tech Stack 3D Balls Section */}
      <Tech />

      {/* 6. Performance & Security 3D Lock Section */}
      <Security />

      {/* 7. Projects Section */}
      <Projects />

      {/* 8. Contact Section with 3D Earth Globe */}
      <Contact />

      {/* 10. Footer with Back-to-Top Button */}
      <Footer />

      {/* Visual Feedback for AI Coding Agents (Dev Mode Only) */}
      {(import.meta.env.DEV || process.env.NODE_ENV === 'development') && (
        <Agentation endpoint="http://localhost:4747" />
      )}
    </div>
  );
}

export default App;
