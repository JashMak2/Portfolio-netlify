import React, { useRef, useState, useCallback } from 'react';

/**
 * Pointer-driven perspective tilt wrapper. Wrap any card in this to give it
 * real 3D depth on hover: it rotates toward the cursor and shows a soft
 * light-glare sheen that tracks pointer position.
 */
const Tilt3D = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
}) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const handleMove = useCallback(
    (e) => {
      if (reducedMotion.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s linear',
      });

      if (glare) {
        setGlareStyle({
          opacity: 0.15,
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.6), transparent 60%)`,
        });
      }
    },
    [maxTilt, scale, glare]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({ opacity: 0, transition: 'opacity 0.4s ease' });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
          style={glareStyle}
        />
      )}
    </div>
  );
};

export default Tilt3D;
