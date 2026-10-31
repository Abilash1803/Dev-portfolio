import React from 'react';
import { motion } from 'framer-motion';

export const Security = () => {
  return (
    <section className="relative w-full h-[850px] select-none flex flex-row flex-wrap justify-center items-center overflow-hidden z-10 my-10">
      {/* Central Interactive Content Overlaid on Video */}
      <div className="w-auto h-auto absolute flex flex-col items-center justify-center z-10 pointer-events-auto">
        {/* Title above lock */}
        <div className="relative top-[-80px] sm:top-[-110px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[36px] sm:text-[45px] md:text-[50px] font-semibold text-center text-gray-200 tracking-tight font-display"
          >
            Performance{' '}
            <span className="magic text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-serif italic">
              &amp;
            </span>{' '}
            security
          </motion.h2>
        </div>

        {/* Interactive Padlock Icon with Animated Shackle */}
        <div className="w-auto h-auto flex flex-col group items-center cursor-pointer -mt-4 sm:-mt-8">
          <img
            className="w-[50px] translate-y-5 transition-all duration-300 group-hover:translate-y-11"
            src="/assets/lock-shackle.webp"
            width={50}
            height={50}
            alt="Security Lock Shackle"
          />
          <img
            className="w-[70px] z-10"
            src="/assets/Securty1-ebf991e1.webp"
            width={70}
            height={70}
            alt="Security Lock Body"
          />
        </div>

        {/* Small "Encryption" Pill Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="px-5 py-1 border my-5 border-[#7042f88b] bg-[#100d25]/60 backdrop-blur-md opacity-90 rounded-full shadow-[0_0_15px_rgba(145,94,255,0.3)]"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#dfd9ff] uppercase font-tech">
            Encryption
          </div>
        </motion.div>

        {/* Centered Description Below Lock */}
        <div className="relative top-[70px] sm:top-[100px] text-center text-gray-300 flex flex-col px-4 max-w-xl">
          <span className="text-[15px] sm:text-[17px] font-medium text-gray-300 leading-relaxed">
            The contents of your apps are end-to-end encrypted.
          </span>
          <span className="text-[14px] sm:text-[16px] text-gray-400 mt-1">
            Enterprise-grade performance and security built in.
          </span>
        </div>
      </div>

      {/* Realistic Security Video Background matching reference */}
      <div className="w-[1500px] h-[850px] z-0 flex flex-row items-center justify-center pointer-events-none opacity-80">
        <video
          className="w-full h-auto max-w-none"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/security.webm"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Security;