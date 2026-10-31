import React, { useState, useEffect } from 'react';
import {
  Mail,
  ArrowUp,
  FileText,
  Briefcase,
  Code2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full relative z-10 border-t border-white/10 bg-[#050816] py-8 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/abilashb1803/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-[#00cea8] hover:border-[#00cea8] hover:scale-110 transition-all shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/abilashb1803"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-white hover:border-white hover:scale-110 transition-all shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:abilashbhojan1803@gmail.com"
            aria-label="Email Abilash"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-[#915EFF] hover:border-[#915EFF] hover:scale-110 transition-all shadow-sm"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Center Copyright & Attribution */}
        <div className="text-center">
          <p className="text-[#aaa6c3] text-[13px] sm:text-[14px]">
            &copy; 2026 Abilash B. All rights reserved.
          </p>
          <p className="text-[#aaa6c3]/60 text-[12px] mt-0.5">
            Designed &amp; developed by Abilash B
          </p>
        </div>

        {/* Right 3 Circular Action Badges (Portfolio, Resume, Dev) */}
        <div className="flex items-center gap-3">
          <a
            href="#projects"
            title="Portfolio Projects"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#aaa6c3] hover:text-[#915EFF] hover:border-[#915EFF] transition-all text-xs font-semibold shadow-xs"
          >
            <Briefcase className="w-3.5 h-3.5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            title="Download Resume"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#aaa6c3] hover:text-[#00cea8] hover:border-[#00cea8] transition-all text-xs font-semibold shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://dev.to"
            target="_blank"
            rel="noreferrer"
            title="Dev Articles"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#aaa6c3] hover:text-[#38bdf8] hover:border-[#38bdf8] transition-all text-xs font-semibold font-mono shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Floating Circular Teal Back-To-Top Button */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#00cea8] text-[#050816] flex items-center justify-center shadow-[0_0_20px_rgba(0,206,168,0.7)] hover:bg-[#00f5c8] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
