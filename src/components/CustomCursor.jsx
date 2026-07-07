import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Position and rotation values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const rotateVal = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 30, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorRotate = useSpring(rotateVal, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // Check if device is mobile/tablet (avoid custom cursor on touch screens)
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    let lastX = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime || 1;
      const dx = e.clientX - lastX;
      // Calculate angular velocity based on mouse delta X over time
      const vx = (dx / dt) * 12; 
      
      // Update cursor coordinates (no offset because the tip of the SVG pen is at top-left 0,0)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Tilt the pen based on movement speed (clamp between -35deg and 35deg)
      const targetRotation = Math.max(-35, Math.min(35, vx));
      rotateVal.set(targetRotation);

      lastX = e.clientX;
      lastTime = now;

      // Check if mouse is hovering over readable text elements
      const target = e.target;
      if (!target) return;

      const isOverText = target.closest(
        '.font-serif-body, .font-serif-title, .news-headline, .news-desc, ' +
        '.movie-title, .movie-overview, .song-title, .song-artist, ' +
        '.meme-text-title, .meme-text-desc, p, h1, h2, h3, h4, h5, h6'
      );
      const isOverInteractive = target.closest('a, button, select, input, .btn-play-preview, .btn-back, [role="button"]');

      if (isOverText && !isOverInteractive) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isMobile, mouseX, mouseY, rotateVal]);

  if (isMobile || !isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        pointerEvents: 'none',
        zIndex: 99999,
        x: cursorX,
        y: cursorY,
        rotate: cursorRotate,
        transformOrigin: '0px 0px', // rotate around the tip of the pen (hotspot)
      }}
    >
      {/* Fountain Pen Quill SVG - Tip starts exactly at 0,0 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.15))' }}
      >
        {/* Fountain pen nib metal part */}
        <path
          d="M0 0 L8 18 C9 20 11 21 13 21 L20 14 C20 12 19 10 17 9 L0 0 Z"
          fill="#1a1a1a"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
        {/* Wooden/Plastic shaft of the pen */}
        <path
          d="M20 14 L32 26 C33 27 33 29 32 30 C31 31 29 31 28 30 L17 9 Z"
          fill="#5c3a21"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
        {/* Ink breather hole */}
        <circle cx="9" cy="9" r="1.5" fill="#f7f4eb" />
        {/* Ink slit down to the nib tip */}
        <line x1="0" y1="0" x2="9" y2="9" stroke="#f7f4eb" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}
