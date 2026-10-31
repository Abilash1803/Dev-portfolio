import React from 'react';

export const BlackHole = () => {
  return (
    <div className="w-full h-[940px] shadow-lg shadow-[#030014]/50 absolute bg-cover flex flex-col overflow-hidden items-center justify-start px-[15px] pointer-events-none z-[-10]">
      <div className="w-[1250px] h-full z-[-10] absolute top-[-280px] flex flex-row items-start justify-center">
        <video
          className="w-full h-auto rotate-180"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/blackhole.webm"
        />
      </div>
    </div>
  );
};

export default BlackHole;
