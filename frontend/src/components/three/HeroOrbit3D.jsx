import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import { CanvasTexture } from 'three';

// Drei's <Text> (troika-three-text) generates its SDF font atlas on the
// GPU at mount time; combined with this scene's second live WebGL canvas
// it reliably stalled the GPU pipeline into a full context loss on some
// machines (confirmed: removing <Text> alone eliminated the context loss).
// A plain canvas-texture label is visually equivalent here and far cheaper.
function useLabelTexture(label, color) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    let fontSize = 72;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    do {
      ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
      fontSize -= 4;
    } while (ctx.measureText(label).width > canvas.width - 24 && fontSize > 20);
    ctx.fillStyle = color;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 2);
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [label, color]);
}

const COLORS = {
  primary: '#3b82f6',
  slate: '#94a3b8',
  amber: '#d97706',
  stone: '#a8a29e',
  neutral: '#a3a3a3',
};

// Mirrors the original tech-orbit rings: inner (languages), middle
// (libraries), outer (databases), far (tools) — but rendered as real 3D
// orbiting rings with independent tilt/speed instead of flat CSS circles.
const RINGS = [
  {
    radius: 2.2,
    tiltX: 0.22,
    speed: 0.18,
    items: [
      { label: 'PY', color: COLORS.primary },
      { label: 'JS', color: COLORS.slate },
      { label: 'C++', color: COLORS.amber },
      { label: 'HTML', color: COLORS.stone },
      { label: 'CSS', color: COLORS.neutral },
      { label: 'TS', color: COLORS.primary },
    ],
  },
  {
    radius: 2.85,
    tiltX: -0.16,
    speed: -0.14,
    items: [
      { label: 'TF', color: COLORS.amber },
      { label: 'NG', color: COLORS.slate },
      { label: 'RC', color: COLORS.stone },
      { label: 'LC', color: COLORS.neutral },
    ],
  },
  {
    radius: 3.4,
    tiltX: 0.34,
    speed: 0.1,
    items: [
      { label: 'SQL', color: COLORS.amber },
      { label: 'MDB', color: COLORS.stone },
    ],
  },
  {
    radius: 3.95,
    tiltX: -0.3,
    speed: 0.22,
    items: [
      { label: 'DC', color: COLORS.primary },
      { label: 'JR', color: COLORS.slate },
      { label: 'TR', color: COLORS.neutral },
    ],
  },
];

function OrbitNode({ radius, angleOffset, color, label }) {
  const texture = useLabelTexture(label, color);
  return (
    <group rotation={[0, angleOffset, 0]}>
      <group position={[radius, 0, 0]}>
        <Billboard>
          <mesh>
            <circleGeometry args={[0.34, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.16} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.32, 0.36, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.75} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.56, 0.28]} />
            <meshBasicMaterial map={texture} transparent depthWrite={false} />
          </mesh>
        </Billboard>
      </group>
    </group>
  );
}

function Ring({ radius, tiltX, speed, items, paused }) {
  const orbitRef = useRef(null);

  useFrame((_, delta) => {
    if (paused || !orbitRef.current) return;
    orbitRef.current.rotation.y += delta * speed;
  });

  return (
    <group rotation={[tiltX, 0, 0]}>
      <group ref={orbitRef}>
        {items.map((item, i) => (
          <OrbitNode
            key={item.label}
            radius={radius}
            angleOffset={(i / items.length) * Math.PI * 2}
            color={item.color}
            label={item.label}
          />
        ))}
      </group>
    </group>
  );
}

function Scene({ paused }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.15;
    const targetY = state.pointer.x * 0.25;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {RINGS.map((ring, i) => (
        <Ring key={i} {...ring} paused={paused} />
      ))}
    </group>
  );
}

const HeroOrbit3D = () => {
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setReady(true);
    setPaused(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (!ready) return null;

  return (
    <div className="absolute -inset-16 md:-inset-24 lg:-inset-28 pointer-events-none z-0">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 0, 9], fov: 45 }}
        >
          <Scene paused={paused} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroOrbit3D;
