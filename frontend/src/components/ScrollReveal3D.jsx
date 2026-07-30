import React, { useEffect, useRef, useState } from 'react';

/**
 * Wraps a section and gives it a subtle 3D "swoop in" entrance the first
 * time it scrolls into view: fades in while rotating back from a slight
 * perspective tilt and rising up out of depth.
 */
const ScrollReveal3D = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = reducedMotion
    ? undefined
    : {
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        transform: visible
          ? 'perspective(1200px) rotateX(0deg) translateY(0) translateZ(0)'
          : 'perspective(1200px) rotateX(10deg) translateY(48px) translateZ(-80px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out',
        willChange: 'transform, opacity',
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal3D;
