import React from 'react';
import HeroOrbitGrid from '../components/HeroOrbitGrid';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden flex items-center justify-center pt-16">
      {/* Hero Content Container matching exact reference */}
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Left Column: Greeting, Name, Description, Pill */}
        <div className="w-full lg:w-1/2 space-y-8 lg:space-y-12 text-left lg:pr-12 mt-[120px] lg:mt-0">
          <div className="flex items-start space-x-4 lg:space-x-6">
            {/* Vertical Accent Bar with Glowing Dot */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 shadow-[0_0_15px_#915EFF]" />
              <div className="w-1 h-[280px] sm:h-[340px] lg:h-[400px] bg-gradient-to-b from-purple-500 to-transparent" />
            </div>

            <div className="space-y-4 lg:space-y-6">
              {/* Name Heading: Hi, I'm Abilash B */}
              <h1 className="font-black text-white lg:text-[74px] sm:text-[56px] xs:text-[46px] text-[36px] lg:leading-[88px] tracking-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_25px_rgba(145,94,255,0.4)] whitespace-nowrap">
                  Abilash B
                </span>
              </h1>

              {/* Subtitle / Bio */}
              <p className="text-[#dfd9ff] font-medium lg:text-[24px] sm:text-[20px] xs:text-[17px] text-[15px] lg:leading-[36px] leading-relaxed max-w-xl">
                I build bridges between imagination and reality.{' '}
                <br className="hidden sm:block" />
                My full stack development skills bring holistic solutions to complex digital problems.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Radar Orbit Grid with Abilash's Known Tech Stacks */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex items-center justify-center">
          <HeroOrbitGrid />
        </div>
      </div>
    </section>
  );
};

export default Hero;
