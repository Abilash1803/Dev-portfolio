import React, { useRef, useState } from 'react';

export const TiltCard = ({ children, className = '', options = {}, ...props }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const maxTilt = options.max || 25;
  const perspective = options.perspective || 1000;
  const scale = options.scale || 1.03;
  const speed = options.speed || 400;

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return;
    if (!cardRef.current) return;
    if (!isHovered) setIsHovered(true);

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 100ms ease-out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${isHovered ? 'will-change-transform' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;
