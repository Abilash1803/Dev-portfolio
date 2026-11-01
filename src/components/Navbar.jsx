import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <nav
      className={`w-full h-[65px] fixed shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? 'scrolled bg-[#050816]/80' : ''
      }`}
    >
      <div className="w-full max-w-[1232px] h-full flex items-center justify-between m-auto px-[10px] sm:px-[20px] md:px-[40px] xl:px-0">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-1 group"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#915EFF] to-[#00cea8] p-[1.5px] shadow-[0_0_15px_rgba(145,94,255,0.4)] group-hover:scale-105 transition-transform mr-1">
            <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-lg text-white font-mono tracking-tighter">AB</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-white text-[19px] font-display font-bold tracking-tight">
              Abilash B
            </span>
            <span className="text-[#aaa6c3] text-[11px] font-tech font-medium tracking-widest uppercase hidden sm:block">
              Full Stack Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="list-none hidden md:flex flex-row gap-9">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 'text-white font-semibold' : 'text-[#aaa6c3]'
              } hover:text-white text-[15px] font-tech font-medium tracking-wider cursor-pointer transition-colors relative group uppercase`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Toggle (Visible on < 768px, matching desktop md:flex) */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label="Toggle menu"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform duration-150"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <X className="w-6 h-6 text-[#915EFF]" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Dropdown Menu with physical origin-top-right expansion */}
          <div
            className={`${
              !toggle ? 'hidden opacity-0 scale-95' : 'flex opacity-100 scale-100'
            } p-6 bg-[#100d25]/95 border border-white/15 backdrop-blur-xl absolute top-20 right-6 mx-4 my-2 min-w-[210px] z-50 rounded-2xl shadow-2xl origin-top-right transition-[opacity,transform] duration-200 ease-out flex-col gap-4`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? 'text-white font-bold' : 'text-[#aaa6c3]'
                  } font-tech text-[16px] cursor-pointer hover:text-white active:translate-x-1 transition-[color,transform] duration-150`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
