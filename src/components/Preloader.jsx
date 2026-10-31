import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated multilingual greetings focusing on the requested languages with ample reading time
const words = [
  { text: 'Hello', trans: 'English', font: "'Plus Jakarta Sans', sans-serif" },
  { text: 'வணக்கம்', trans: 'Vanakkam • Tamil', font: "'Noto Sans Tamil', 'Plus Jakarta Sans', sans-serif" },
  { text: 'നമസ്കാരം', trans: 'Namaskaram • Malayalam', font: "'Noto Sans Malayalam', 'Plus Jakarta Sans', sans-serif" },
  { text: 'नमस्ते', trans: 'Namaste • Hindi', font: "'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif" },
  { text: 'Bonjour', trans: 'French', font: "'Plus Jakarta Sans', sans-serif" },
  { text: 'నమస్కారం', trans: 'Namaskaram • Telugu', font: "'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif" },
  { text: 'Welcome', trans: 'Abilash Bhojan', font: "'Plus Jakarta Sans', sans-serif" },
];

export const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);

  // Measure window dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Lock page scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Relaxed, comfortably readable cadence
  useEffect(() => {
    if (index === words.length - 1) {
      // Hold closing word ("Welcome") comfortably before starting the curtain lift
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 950);
      return () => clearTimeout(exitTimer);
    }

    // Comfortable reading time: 900ms for opening, 820ms for each language greeting
    const delay = index === 0 ? 900 : 820;
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index]);

  // Handle keyboard skip (ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExiting(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // SVG morphing curve coordinates
  const { initialPath, targetPath } = useMemo(() => {
    const w = dimension.width || 1920;
    const h = dimension.height || 1080;
    return {
      initialPath: `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 280} 0 ${h} Z`,
      targetPath: `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z`,
    };
  }, [dimension]);

  // Framer Motion Animation Variants
  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: '-100vh',
      transition: {
        duration: 0.9,
        ease: [0.85, 0, 0.15, 1], // Cinematic high-end curve
        delay: 0.12,
      },
    },
  };

  const curveAnimations = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.85,
        ease: [0.85, 0, 0.15, 1],
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.85,
        ease: [0.85, 0, 0.15, 1],
        delay: 0.16,
      },
    },
  };

  const progressPercent = Math.round(((index + 1) / words.length) * 100);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.style.overflow = 'unset';
        if (onComplete) onComplete();
      }}
    >
      {!isExiting && (
        <motion.div
          key="preloader"
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-[#02000d] select-none pointer-events-auto overflow-hidden"
        >
          {/* Cinematic Vignette Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,16,60,0.65)_0%,#02000d_75%)] pointer-events-none" />

          {/* Anamorphic Horizontal Lens Light Beam */}
          <div className="absolute w-[80vw] max-w-[900px] h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/50 to-transparent blur-[0.5px] pointer-events-none" />
          <div className="absolute w-[60vw] max-w-[600px] h-[60px] bg-gradient-to-r from-transparent via-[#915EFF]/12 to-transparent blur-2xl pointer-events-none" />

          {/* Subtle Ambient Cosmic Particles */}
          <div className="absolute w-1 h-1 rounded-full bg-cyan-400/40 top-[20%] left-[25%] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-purple-400/40 bottom-[25%] right-[22%] animate-ping" style={{ animationDuration: '5s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-white/30 top-[30%] right-[32%] animate-pulse" />

          {/* Studio Top Info Bar */}
          <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/30 z-20 pointer-events-none">
            <span className="hidden sm:inline-block">ABILASH B // PORTFOLIO</span>
            <div className="flex items-center gap-2 pointer-events-auto ml-auto">
              <button
                onClick={() => setIsExiting(true)}
                className="text-[10px] font-mono tracking-wider text-white/40 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] backdrop-blur-md transition-all cursor-pointer"
              >
                Skip [Esc]
              </button>
            </div>
          </div>

          {/* Central Cinematic Greeting Stage */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index].text}
                initial={{ opacity: 0, y: 12, scale: 0.97, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, scale: 1.02, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center gap-3.5"
              >
                <div className="flex items-center gap-3.5 sm:gap-4.5">
                  {/* Glowing Cinematic Indicator Core */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-[#915EFF] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gradient-to-r from-[#915EFF] to-[#00cea8] shadow-[0_0_12px_#915EFF]" />
                  </div>

                  {/* Refined, Elegant Heading */}
                  <h1
                    style={{ fontFamily: words[index].font }}
                    className="text-white font-bold text-3xl sm:text-4xl md:text-[46px] tracking-tight drop-shadow-[0_0_25px_rgba(145,94,255,0.22)]"
                  >
                    {words[index].text}
                  </h1>
                </div>

                {/* Subtitle / Transliteration Minimal Pill */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="px-3.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-mono tracking-widest text-[#d8b4fe]/85 uppercase"
                >
                  {words[index].trans}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cinematic Timeline Progress Laser at Bottom */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center gap-2 z-10 pointer-events-none">
            {/* Fine laser line */}
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#915EFF] via-[#a855f7] to-[#00cea8] shadow-[0_0_8px_#915EFF]"
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            {/* Meta indicator */}
            <div className="w-full flex justify-between text-[10px] font-mono tracking-widest text-white/30">
              <span>{words[index].text.toUpperCase()}</span>
              <span>{String(progressPercent).padStart(3, '0')}%</span>
            </div>
          </div>

          {/* Morphing Curve SVG Exit Curtain */}
          {dimension.width > 0 && (
            <svg className="absolute top-0 left-0 w-full h-[calc(100vh+280px)] pointer-events-none fill-[#02000d]">
              <motion.path
                variants={curveAnimations}
                initial="initial"
                exit="exit"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
