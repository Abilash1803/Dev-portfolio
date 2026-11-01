import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projects } from '../data/projects';
import TiltCard from '../components/TiltCard';

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full py-20 z-10">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="sm:text-[14px] text-[12px] text-[#915EFF] font-tech uppercase tracking-widest font-semibold">
          PORTFOLIO SHOWCASE
        </p>
        <h2 className="text-white font-display font-black md:text-[54px] sm:text-[44px] xs:text-[34px] text-[28px] mt-1 tracking-tight">
          <span className="text-[#915EFF] purple-text-gradient">Projects.</span>
        </h2>
      </motion.div>

      {/* Intro Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-[#aaa6c3] text-[16px] sm:text-[18px] max-w-3xl leading-[30px]"
      >
        Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
      </motion.p>

      {/* 3-Column Staggered Grid (middle col offset down on desktop) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          // Staggered layout: middle column (index 1 and index 4) offset down by 36px on desktop
          const isMiddleCol = index % 3 === 1;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`w-full ${isMiddleCol ? 'lg:translate-y-9' : ''}`}
            >
              <TiltCard
                options={{ max: 15, scale: 1.02, speed: 450 }}
                className="bg-[#100d25] p-5 rounded-3xl w-full border border-white/10 hover:border-[#915EFF]/50 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_10px_35px_rgba(145,94,255,0.25)] transition-[border-color,box-shadow,transform] duration-300 ease-out flex flex-col justify-between h-full"
              >
                <div>
                  {/* Image Container with Top-Right Floating Action Buttons */}
                  <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-[#151030] group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Top Right Floating Action Icons */}
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      {/* GitHub Link */}
                      <a
                        href={project.source_code_link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-[#050816]/90 border border-white/20 hover:border-[#915EFF] flex items-center justify-center text-white backdrop-blur-md shadow-md transition-[transform,border-color,background-color] duration-150 ease-out hover:scale-110 active:scale-95 cursor-pointer"
                        title="View Source Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>

                      {/* Live Demo Link */}
                      {project.isLive && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 rounded-full bg-[#050816]/90 border border-white/20 hover:border-[#00cea8] flex items-center justify-center text-[#00cea8] backdrop-blur-md shadow-md transition-[transform,border-color,background-color] duration-150 ease-out hover:scale-110 active:scale-95 cursor-pointer"
                          title="Open Live Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="text-white font-display font-bold text-[22px] tracking-tight hover:text-[#915EFF] transition-colors">
                      {project.isLive ? (
                        <a href={project.live_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                          <span>{project.title}</span>
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="mt-2 text-[#aaa6c3] font-body text-[14px] leading-relaxed line-clamp-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-white/5 font-tech">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.id}-${tag.name}`}
                      className={`text-[12px] font-semibold tracking-wide ${tag.color}`}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default Projects;
