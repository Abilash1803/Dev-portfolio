import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, Cpu, Database, Wrench, ArrowUpRight } from 'lucide-react';
import { techIcons } from '../assets/techIcons';

const categories = [
  { id: 'all', label: 'All Stacks', icon: Layers, count: 13 },
  { id: 'frontend', label: 'Frontend Core', icon: Cpu, count: 6 },
  { id: 'backend', label: 'Backend & APIs', icon: Layers, count: 2 },
  { id: 'database', label: 'Databases & Cloud', icon: Database, count: 3 },
  { id: 'tools', label: 'DevOps & Tools', icon: Wrench, count: 2 },
];

const techMeta = {
  react: {
    category: 'frontend',
    role: 'Client Architecture',
    tag: 'React 18 & Virtual DOM',
    accent: '#61DAFB',
    connections: ['javascript', 'tailwind', 'html5'],
  },
  javascript: {
    category: 'frontend',
    role: 'Language Core',
    tag: 'ES6+ & Async Engine',
    accent: '#F7DF1E',
    connections: ['react', 'nodejs', 'express'],
  },
  html5: {
    category: 'frontend',
    role: 'Markup Standard',
    tag: 'Semantic & Accessible UI',
    accent: '#E34F26',
    connections: ['css3', 'javascript'],
  },
  css3: {
    category: 'frontend',
    role: 'Styling Engine',
    tag: 'Modern Layouts & FX',
    accent: '#1572B6',
    connections: ['html5', 'tailwind', 'bootstrap'],
  },
  tailwind: {
    category: 'frontend',
    role: 'Utility CSS System',
    tag: 'Fluid Design Tokens',
    accent: '#38BDF8',
    connections: ['react', 'css3'],
  },
  bootstrap: {
    category: 'frontend',
    role: 'Component UI',
    tag: 'Rapid Grid Systems',
    accent: '#7952B3',
    connections: ['css3', 'html5'],
  },
  nodejs: {
    category: 'backend',
    role: 'Server Runtime',
    tag: 'Event-Driven Engine',
    accent: '#339933',
    connections: ['express', 'mongodb', 'javascript'],
  },
  express: {
    category: 'backend',
    role: 'API Framework',
    tag: 'RESTful Routing & Middleware',
    accent: '#FFFFFF',
    connections: ['nodejs', 'mongodb', 'mysql'],
  },
  mongodb: {
    category: 'database',
    role: 'NoSQL Storage',
    tag: 'Document Aggregations',
    accent: '#47A248',
    connections: ['nodejs', 'express'],
  },
  supabase: {
    category: 'database',
    role: 'BaaS & Realtime',
    tag: 'PostgreSQL & Edge APIs',
    accent: '#3ECF8E',
    connections: ['react', 'nodejs'],
  },
  mysql: {
    category: 'database',
    role: 'Relational DB',
    tag: 'ACID & Normalized Schemas',
    accent: '#00758F',
    connections: ['express', 'nodejs'],
  },
  git: {
    category: 'tools',
    role: 'Version Control',
    tag: 'Branching & Tree History',
    accent: '#F05032',
    connections: ['github'],
  },
  github: {
    category: 'tools',
    role: 'Code Platform',
    tag: 'CI/CD & Remote Collab',
    accent: '#FFFFFF',
    connections: ['git'],
  },
};

const allTechKeys = Object.keys(techIcons);

export const Tech = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredKey, setHoveredKey] = useState(null);

  const filteredKeys = allTechKeys.filter((key) => {
    if (activeTab === 'all') return true;
    return techMeta[key]?.category === activeTab;
  });

  const activeConnectedKeys = hoveredKey ? techMeta[hoveredKey]?.connections || [] : [];

  return (
    <section className="relative w-full py-24 z-10 overflow-hidden">
      {/* Background Cosmic Grid & Glowing Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(145,94,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#915EFF]/10 via-[#00cea8]/05 to-transparent blur-[160px] pointer-events-none" />

      {/* Cyber Grid Pattern Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          {/* Top Metadata Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#100d25]/90 border border-[#915EFF]/40 backdrop-blur-md shadow-[0_0_20px_rgba(145,94,255,0.25)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#915EFF] animate-pulse" />
            <span className="text-xs font-tech tracking-widest uppercase text-purple-200">
              System Architecture // Tech Matrix
            </span>
          </div>

          <h2 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight font-display">
            Technological <span className="text-[#915EFF] purple-text-gradient">Stacks.</span>
          </h2>

          <p className="mt-4 text-[#aaa6c3] text-sm sm:text-base max-w-2xl leading-relaxed font-body">
            A cohesive constellation of languages, reactive frontends, scalable backend engines, and database systems engineered for production performance.
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#0c0822]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium font-tech active:scale-95 transition-[color,background-color,transform] duration-200 ease-out cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/80 to-[#7c3aed]/80 rounded-xl shadow-[0_0_15px_rgba(145,94,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cinematic Holographic Artifacts Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 w-full max-w-6xl"
        >
          <AnimatePresence>
            {filteredKeys.map((key, index) => {
              const tech = techIcons[key];
              const meta = techMeta[key];
              const isHovered = hoveredKey === key;
              const isConnected = activeConnectedKeys.includes(key);

              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: index * 0.04 },
                  }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Holographic Glowing Backdrop Aura */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${meta.accent}50 0%, transparent 70%)`,
                    }}
                  />

                  {/* Connected Network Pulse Indicator */}
                  {isConnected && !isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 z-30 px-2 py-0.5 rounded-full bg-[#00cea8]/20 border border-[#00cea8]/60 text-[9px] font-mono text-[#00cea8] flex items-center gap-1 shadow-[0_0_10px_#00cea8]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-ping" />
                      <span>Linked</span>
                    </motion.div>
                  )}

                  {/* Holo-Glass Artifact Card */}
                  <div
                    className={`relative w-full h-[180px] sm:h-[195px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-center text-center transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out active:scale-[0.98] backdrop-blur-xl border overflow-hidden ${
                      isHovered
                        ? 'bg-[#140e34]/90 border-white/50 -translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                        : isConnected
                        ? 'bg-[#0e0926]/90 border-[#00cea8]/50 shadow-[0_0_20px_rgba(0,206,168,0.2)]'
                        : 'bg-[#0c0822]/70 border-white/10 hover:border-white/30 shadow-lg'
                    }`}
                  >
                    {/* Sci-Fi Decorative Corner Brackets */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/60 transition-colors" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/60 transition-colors" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/60 transition-colors" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/60 transition-colors" />

                    {/* Top Status & Role Pill */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-wider text-[#aaa6c3] z-10">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: meta.accent }}
                        />
                        <span className="uppercase text-[9px] sm:text-[10px] text-white/50">
                          {meta.category}
                        </span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out" />
                    </div>

                    {/* Floating Holographic Pedestal & Brand Icon */}
                    <div className="relative my-auto flex flex-col items-center justify-center">
                      {/* Radial Icon Aura */}
                      <div
                        className="absolute w-14 h-14 rounded-full blur-md opacity-25 group-hover:opacity-75 group-hover:scale-125 transition-[transform,opacity] duration-300 ease-out"
                        style={{ backgroundColor: meta.accent }}
                      />

                      {/* Icon Container */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative p-2.5 transition-transform duration-300 group-hover:scale-115 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        dangerouslySetInnerHTML={{ __html: tech.svg }}
                      />
                    </div>

                    {/* Bottom Metadata: Name & Architectural Capability */}
                    <div className="w-full flex flex-col items-center z-10">
                      <h3 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-white transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-mono tracking-wide text-white/40 group-hover:text-purple-300 transition-colors truncate max-w-[130px] sm:max-w-[150px]">
                        {meta.tag}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Constellation Legend Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono tracking-wider text-[#aaa6c3]/60 border-t border-white/10 pt-6 w-full max-w-4xl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-pulse" />
            <span>Interactive Full-Stack Web</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#915EFF]" />
            <span>Hover to Trace Interconnections</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>13 Integrated Technologies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;
