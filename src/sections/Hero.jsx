import React from 'react';
import HeroOrbitGrid from '../components/HeroOrbitGrid';

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen lg:h-screen mx-auto overflow-hidden flex items-center justify-center pt-20 sm:pt-24 lg:pt-16 pb-12 lg:pb-0">
      {/* Hero Content Container matching exact reference */}
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Left Column: Greeting, Name, Description, Pill */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 lg:space-y-12 text-left lg:pr-12 mt-2 sm:mt-6 lg:mt-0">
          <div className="flex items-start space-x-4 lg:space-x-6">
            {/* Vertical Accent Bar with Glowing Dot */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 shadow-[0_0_15px_#915EFF]" />
              <div className="w-1 h-[210px] xs:h-[250px] sm:h-[320px] lg:h-[400px] bg-gradient-to-b from-purple-500 to-transparent" />
            </div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Name Heading: Hi, I'm Abilash B */}
              <h1 className="font-display font-black text-white lg:text-[76px] sm:text-[58px] xs:text-[46px] text-[34px] lg:leading-[90px] tracking-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_25px_rgba(145,94,255,0.4)] whitespace-nowrap">
                  Abilash B
                </span>
              </h1>

              {/* Subtitle / Bio */}
              <p className="text-[#dfd9ff] font-body font-normal lg:text-[21px] sm:text-[19px] xs:text-[17px] text-[15px] lg:leading-[34px] leading-relaxed max-w-xl tracking-normal">
                I build bridges between imagination and reality.{' '}
                <br className="hidden sm:block" />
                My full stack development skills bring holistic solutions to complex digital problems.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Radar Orbit Grid with Abilash's Known Tech Stacks */}
        <div className="w-full lg:w-1/2 mt-4 sm:mt-6 lg:mt-0 flex items-center justify-center">
          <HeroOrbitGrid />
        </div>
      </div>
    </section>
  );
};

export default Hero;
