import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';

export const Experience = () => {
  return (
    <section id="work" className="relative w-full py-20 z-10">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="sm:text-[14px] text-[12px] text-[#915EFF] font-tech uppercase tracking-widest font-semibold">
          WHAT I HAVE DONE SO FAR
        </p>
        <h2 className="text-white font-display font-black md:text-[54px] sm:text-[44px] xs:text-[34px] text-[28px] mt-1 tracking-tight">
          Work <span className="text-[#915EFF] purple-text-gradient">Experience.</span>
        </h2>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="mt-16 flex flex-col">
        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.45)">
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={experience.title + index}
              contentStyle={{
                background: '#1d1836',
                color: '#fff',
                boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.7)',
                borderRadius: '16px',
                border: '1px solid rgba(145, 94, 255, 0.3)',
                padding: '28px',
              }}
              contentArrowStyle={{ borderRight: '8px solid #1d1836' }}
              date={experience.date}
              dateClassName="text-white font-semibold text-[15px] sm:text-[16px] mx-3 my-auto drop-shadow-sm"
              iconStyle={{
                background: experience.iconBg || '#151030',
                color: '#fff',
                boxShadow: '0 0 20px rgba(145, 94, 255, 0.7)',
                border: '3px solid #915EFF',
                overflow: 'hidden',
              }}
              icon={
                <div className="flex justify-center items-center w-full h-full font-bold font-mono text-sm tracking-tighter text-[#00cea8]">
                  {experience.icon ? (
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[82%] h-[82%] object-contain rounded-full"
                    />
                  ) : (
                    experience.icon_initials
                  )}
                </div>
              }
            >
              <div>
                <h3 className="text-white text-[22px] font-bold tracking-tight">
                  {experience.title}
                </h3>
                <p
                  className="text-[#aaa6c3] text-[15px] font-semibold tracking-wide"
                  style={{ margin: '4px 0 0 0' }}
                >
                  {experience.company_name}
                </p>
              </div>

              <ul className="mt-5 list-disc ml-5 space-y-2.5">
                {experience.points.map((point, idx) => (
                  <li
                    key={`experience-point-${idx}`}
                    className="text-white-100 text-[14px] leading-relaxed tracking-wide pl-1"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  </section>
  );
};

export default Experience;
