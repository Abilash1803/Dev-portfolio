import React from 'react';
import { motion } from 'framer-motion';

// Orbits configuration: Elements fit cleanly in 3 orbits; 4th outer orbit acts as cosmic boundary
const orbitsData = [
  {
    id: 1,
    radius: 75, // diameter 150px
    duration: 25,
    direction: 1, // clockwise
    borderStyle: 'border-purple-400/25',
    planets: [
      {
        id: 'react',
        name: 'React',
        angle: 0,
        color: '#61DAFB',
        glow: 'rgba(97, 218, 251, 0.4)',
        size: 'w-12 h-12 sm:w-13 sm:h-13',
        icon: (
          <svg viewBox="0 0 115.3 100" className="w-6 h-6 sm:w-7 sm:h-7">
            <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(30 57.65 50)" />
            <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(90 57.65 50)" />
            <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(150 57.65 50)" />
            <circle cx="57.65" cy="50" r="9" fill="#61DAFB" />
          </svg>
        ),
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        angle: 180,
        color: '#F7DF1E',
        glow: 'rgba(247, 223, 30, 0.4)',
        size: 'w-12 h-12 sm:w-13 sm:h-13',
        icon: (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#F7DF1E] flex items-center justify-center font-bold text-black text-[13px] sm:text-[15px] font-mono shadow-sm">
            JS
          </div>
        ),
      },
    ],
  },
  {
    id: 2,
    radius: 140, // diameter 280px
    duration: 38,
    direction: -1, // counter-clockwise
    borderStyle: 'border-indigo-400/20 border-dashed',
    planets: [
      {
        id: 'nodejs',
        name: 'Node.js',
        angle: 0,
        color: '#339933',
        glow: 'rgba(51, 153, 51, 0.4)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 128 128" className="w-7 h-7 sm:w-8 sm:h-8">
            <path fill="#3F873F" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z" />
            <path fill="#52A044" d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z" />
            <path fill="#6ABF4B" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z" />
          </svg>
        ),
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        angle: 120,
        color: '#38BDF8',
        glow: 'rgba(56, 189, 248, 0.4)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M25 45 C30 35 40 33 46 38 C49 41 52 44 55 47 C61 53 67 58 80 55 C88 53 95 47 98 40 C93 50 83 52 77 47 C74 44 71 41 68 38 C62 32 56 27 43 30 C35 32 28 38 25 45 Z M2 70 C7 60 17 58 23 63 C26 66 29 69 32 72 C38 78 44 83 57 80 C65 78 72 72 75 65 C70 75 60 77 54 72 C51 69 48 66 45 63 C39 57 33 52 20 55 C12 57 5 63 2 70 Z" fill="#38BDF8" />
          </svg>
        ),
      },
      {
        id: 'express',
        name: 'Express',
        angle: 240,
        color: '#FFFFFF',
        glow: 'rgba(255, 255, 255, 0.35)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#120f26] flex items-center justify-center font-bold text-white text-[14px] font-mono border border-white/20">
            ex
          </div>
        ),
      },
    ],
  },
  {
    id: 3,
    radius: 205, // diameter 410px
    duration: 54,
    direction: 1, // clockwise
    borderStyle: 'border-cyan-400/20',
    planets: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        angle: 0,
        color: '#47A248',
        glow: 'rgba(71, 162, 72, 0.4)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8">
            <path d="M50 4 C48 10 30 38 30 60 C30 78 40 92 50 96 C60 92 70 78 70 60 C70 38 52 10 50 4 Z" fill="#47A248" />
            <path d="M50 4 L50 96 C50 96 68 78 68 60 C68 38 51 10 50 4 Z" fill="#4EA94B" />
            <path d="M50 96 L50 68 L53 68 C53 82 50 96 50 96 Z" fill="#FFFFFF" opacity="0.6" />
          </svg>
        ),
      },
      {
        id: 'mysql',
        name: 'MySQL',
        angle: 90,
        color: '#00758F',
        glow: 'rgba(0, 117, 143, 0.4)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full">
            <circle cx="50" cy="50" r="48" fill="#00758F" />
            <text x="50" y="44" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#F29111" textAnchor="middle">MY</text>
            <text x="50" y="70" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#FFFFFF" textAnchor="middle">SQL</text>
          </svg>
        ),
      },
      {
        id: 'git',
        name: 'Git',
        angle: 180,
        color: '#F05032',
        glow: 'rgba(240, 80, 50, 0.4)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8">
            <g transform="rotate(45 50 50)">
              <rect x="18" y="18" width="64" height="64" rx="14" fill="#F05032" />
              <circle cx="36" cy="50" r="7" fill="#FFFFFF" />
              <circle cx="64" cy="36" r="7" fill="#FFFFFF" />
              <circle cx="64" cy="64" r="7" fill="#FFFFFF" />
              <path d="M36 50 L64 36 M36 50 L64 64" stroke="#FFFFFF" strokeWidth="5" />
            </g>
          </svg>
        ),
      },
      {
        id: 'github',
        name: 'GitHub',
        angle: 270,
        color: '#FFFFFF',
        glow: 'rgba(255, 255, 255, 0.35)',
        size: 'w-13 h-13 sm:w-14 sm:h-14',
        icon: (
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 4,
    radius: 265, // diameter 530px - Outer cosmic boundary ring (no elements on this orbit)
    duration: 72,
    direction: -1,
    borderStyle: 'border-white/10 border-dashed',
    planets: [],
  },
];

export const HeroOrbitGrid = () => {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] flex items-center justify-center select-none scale-[0.72] xs:scale-[0.8] sm:scale-[0.92] lg:scale-100 transition-transform">
      {/* Deep Space Celestial Nebula Backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Subtle Planetary Star Dust Particles in the Sky */}
      <div className="absolute w-[2px] h-[2px] rounded-full bg-white/70 top-12 left-16 animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute w-[2px] h-[2px] rounded-full bg-cyan-300/80 bottom-16 right-20 animate-ping" style={{ animationDuration: '5s' }} />
      <div className="absolute w-[2px] h-[2px] rounded-full bg-purple-300/70 top-28 right-14 animate-ping" style={{ animationDuration: '3.5s' }} />
      <div className="absolute w-[2px] h-[2px] rounded-full bg-amber-200/80 bottom-24 left-14 animate-ping" style={{ animationDuration: '4.5s' }} />

      {/* Central Celestial Sun / Star Core */}
      <div className="absolute z-20 flex items-center justify-center">
        {/* Sun Pulsing Rays */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#915EFF]/30 via-[#7c3aed]/20 to-transparent blur-xl animate-pulse" />

        {/* Sun Outer Corona Ring */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#915EFF]/20 to-[#00cea8]/20 border border-purple-400/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(145,94,255,0.5)]">
          {/* Radiant Sun Sphere */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#915EFF] via-[#a855f7] to-[#00cea8] shadow-[0_0_16px_#915EFF] animate-pulse" />
        </div>
      </div>

      {/* 4 Orbits in the Sky (Elements fit comfortably in the inner 3 orbits) */}
      {orbitsData.map((orbit) => {
        const diameter = orbit.radius * 2;

        return (
          <div
            key={orbit.id}
            style={{
              width: `${diameter}px`,
              height: `${diameter}px`,
            }}
            className="absolute rounded-full pointer-events-none flex items-center justify-center"
          >
            {/* Visual Orbit Track Ring in the Sky */}
            <div
              className={`absolute inset-0 rounded-full border ${orbit.borderStyle} pointer-events-none transition-colors duration-300`}
            />

            {/* Orbit Revolving Layer */}
            {orbit.planets.length > 0 && (
              <motion.div
                animate={{
                  rotate: orbit.direction === 1 ? [0, 360] : [360, 0],
                }}
                transition={{
                  duration: orbit.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
                className="pointer-events-none flex items-center justify-center"
              >
                {/* Planetary Elements in this Orbit */}
                {orbit.planets.map((planet) => {
                  const rad = (planet.angle * Math.PI) / 180;
                  // Position on circle perimeter
                  const x = orbit.radius * Math.cos(rad);
                  const y = orbit.radius * Math.sin(rad);

                  return (
                    <div
                      key={planet.id}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="pointer-events-auto group cursor-pointer"
                    >
                      {/* Counter-rotation component: Keeps planet upright while revolving */}
                      <motion.div
                        animate={{
                          rotate: orbit.direction === 1 ? [0, -360] : [-360, 0],
                        }}
                        transition={{
                          duration: orbit.duration,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="flex items-center justify-center relative"
                      >
                        {/* Planetary Atmospheric Glow */}
                        <div
                          className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none"
                          style={{
                            backgroundColor: planet.glow,
                          }}
                        />

                        {/* Planet Spherical Body */}
                        <div
                          className={`${planet.size} rounded-full bg-[#0a071e]/90 group-hover:bg-[#140e36] border border-white/20 group-hover:border-white/60 transition-all duration-300 backdrop-blur-xl flex items-center justify-center p-2 relative shadow-lg group-hover:scale-125 z-10`}
                          style={{
                            boxShadow: `0 0 15px -2px ${planet.glow}, inset 0 2px 6px rgba(255,255,255,0.15)`,
                          }}
                        >
                          {planet.icon}

                          {/* Planet Hover Name Tooltip */}
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0c0824]/95 border border-white/20 text-[11px] font-mono tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl z-30">
                            {planet.name}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HeroOrbitGrid;
