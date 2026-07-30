import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const PRIMARY = '#3b82f6';
const ACCENT = '#b98642';

const SHAPES = ['icosahedron', 'octahedron', 'torus', 'box'];

function makeGeometry(shape) {
  switch (shape) {
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />;
    case 'torus':
      return <torusGeometry args={[0.8, 0.28, 8, 24]} />;
    case 'box':
      return <boxGeometry args={[1.2, 1.2, 1.2]} />;
    default:
      return <icosahedronGeometry args={[1, 0]} />;
  }
}

function Field({ count, reducedMotion }) {
  const groupRef = useRef(null);
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const shape = SHAPES[i % SHAPES.length];
      arr.push({
        shape,
        position: [
          (Math.random() - 0.5) * 26,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 14 - 6,
        ],
        rotSpeed: [
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.1,
        ],
        floatSpeed: 0.2 + Math.random() * 0.4,
        floatOffset: Math.random() * Math.PI * 2,
        scale: 0.4 + Math.random() * 0.9,
        color: i % 3 === 0 ? ACCENT : PRIMARY,
      });
    }
    return arr;
  }, [count]);

  const meshRefs = useRef([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.12;
      const targetY = state.pointer.x * 0.18;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    }
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const n = nodes[i];
      mesh.rotation.x += delta * n.rotSpeed[0];
      mesh.rotation.y += delta * n.rotSpeed[1];
      mesh.rotation.z += delta * n.rotSpeed[2];
      mesh.position.y = n.position[1] + Math.sin(t * n.floatSpeed + n.floatOffset) * 1.2;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={n.position}
          scale={n.scale}
        >
          {makeGeometry(n.shape)}
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

const SceneBackground = () => {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [count, setCount] = useState(18);

  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const isMobile = window.innerWidth < 768;
    setCount(isMobile ? 9 : 18);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-70 dark:opacity-60"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <Field count={count} reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SceneBackground;
