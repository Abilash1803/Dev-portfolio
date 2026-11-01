import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/tech';

const ServiceCard = ({ service, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="w-full [perspective:1000px] cursor-pointer group active:scale-[0.98] transition-transform duration-200 select-none"
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Flipping Card Container */}
      <div
        className={`relative w-full min-h-[300px] h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] green-pink-gradient p-[1px] rounded-[22px] shadow-card">
          <div className="w-full h-full bg-[#151030] rounded-[22px] p-8 flex flex-col justify-between items-center relative overflow-hidden group-hover:bg-[#181236] transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: service.gemColor }}
            />

            {/* Icon & Title */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative mb-6">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-40 scale-110"
                  style={{ backgroundColor: service.gemColor }}
                />
                <img
                  src={service.icon}
                  alt={`${service.title} icon`}
                  className="w-16 h-16 object-contain relative drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-white text-[20px] font-bold text-center tracking-tight">
                {service.title}
              </h3>
            </div>

            {/* Subtle Flip Hint Indicator
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#aaa6c3]/60 uppercase group-hover:text-purple-300 transition-colors">
              <span>Flip for details</span>
              <span className="text-xs">↻</span>
            </div> */}
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] green-pink-gradient p-[1px] rounded-[22px] shadow-card">
          <div className="w-full h-full bg-[#100d28] rounded-[22px] p-7 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden border border-white/5">
            {/* Ambient Back Glow */}
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{ backgroundColor: service.gemColor }}
            />

            {/* Header Badge */}
            <div className="flex items-center gap-2 pt-1">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: service.gemColor }}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                {service.title}
              </span>
            </div>

            {/* Description Text */}
            <p className="text-[#dfd9ff] text-[15px] sm:text-[16px] leading-[26px] font-medium my-auto px-1 select-none">
              {service.description}
            </p>

            {/* Bottom Accent */}
            <div className="w-12 h-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Overview = () => {
  return (
    <section id="about" className="relative w-full py-20 z-10">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="sm:text-[14px] text-[12px] text-[#915EFF] font-tech uppercase tracking-widest font-semibold">
            WELCOME TO THE JOURNEY
          </p>
          <h2 className="text-white font-display font-black md:text-[54px] sm:text-[44px] xs:text-[34px] text-[28px] mt-1 tracking-tight">
            Explore the <span className="text-[#915EFF] purple-text-gradient">Overview.</span>
          </h2>
        </motion.div>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-[#aaa6c3] text-[16px] sm:text-[18px] max-w-4xl leading-[30px]"
        >
          Hey there! 👋 I'm a passionate software engineer with a bachelor's degree in the field. As a versatile full-stack developer, I'm experienced in various programming languages and frameworks. My expertise spans both front-end and back-end technologies, allowing me to create comprehensive, efficient, and user-friendly solutions. While I have a strong background in web development, I'm always eager to explore new technologies and adapt to different domains. My solid foundation in software engineering principles enables me to quickly learn and apply new skills. Whether it's crafting intuitive user interfaces, optimizing backend systems, or diving into emerging tech, I'm ready to take on diverse challenges. Let's collaborate to bring your ideas to life and create scalable, innovative solutions. Ready for the journey? 🚀
        </motion.p>

        {/* 4 Cards with Smooth 3D Flip on Hover */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
