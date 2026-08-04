import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture } from 'three';

// Soft round point sprite (radial gradient) so dots read as glowing points
// rather than the default hard square Points look.
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

// A field of small points the camera flies through as the page scrolls —
// scroll progress (0..1 across the full document) drives how far the
// camera has traveled into the field, so dots grow and rush past exactly
// in sync with scrolling instead of on their own timer.
function DotField({ count, depth, radius, reducedMotion }) {
  const texture = useDotTexture();
  const scrollProgress = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.sqrt(Math.random());
      const angle = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r * 0.62;
      arr[i * 3 + 2] = -Math.random() * depth;
    }
    return arr;
  }, [count, depth, radius]);

  useEffect(() => {
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.current = Math.min(1, window.scrollY / max);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    // Directly tied to scroll position, no easing lag — the field holds
    // perfectly still the instant scrolling stops instead of drifting on.
    const travel = depth * 0.86;
    state.camera.position.z = 6 - scrollProgress.current * travel;
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
          color="#ffffff"
        />
      </points>
    </group>
  );
}

const SceneBackground = () => {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [count, setCount] = useState(1600);

  useEffect(() => {
    setReady(true);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const isMobile = window.innerWidth < 768;
    setCount(isMobile ? 700 : 1600);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ transform: 'translateZ(0)', willChange: 'transform', isolation: 'isolate' }}
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 6], fov: 60 }}
        >
          <DotField count={count} depth={70} radius={9} reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SceneBackground;
