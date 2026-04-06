import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

/* ──────────────────────────────────────────────────────
   Performance guard — skip WebGL on mobile / low-end
   ────────────────────────────────────────────────────── */
const useCanRender3D = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) { setCanRender(false); return; }

    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) { setCanRender(false); return; }
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
      const isSoftware = /swiftshader|llvmpipe|softpipe/i.test(renderer);
      setCanRender(!isSoftware);
    } catch {
      setCanRender(false);
    }
  }, []);

  return canRender;
};

/* ── Reusable glass material (MeshPhysicalMaterial — single pass, GPU friendly) ── */
const GlassMaterial = ({ color, opacity = 0.35 }) => (
  <meshPhysicalMaterial
    color={color}
    roughness={0.05}
    metalness={0.0}
    transmission={0.92}
    thickness={0.5}
    ior={1.45}
    transparent
    opacity={opacity}
    envMapIntensity={0.6}
  />
);

/* ── Floating glass torus ── */
const GlassTorus = ({ position, scale = 1, speed = 0.3, color = '#6BA4D4' }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * speed * 0.5) * 0.3;
    ref.current.rotation.y += speed * 0.003;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2} floatingRange={[-0.2, 0.2]}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <GlassMaterial color={color} />
      </mesh>
    </Float>
  );
};

/* ── Floating glass sphere ── */
const GlassSphere = ({ position, scale = 1, speed = 0.2, color = '#E8956A' }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed) * 0.3;
  });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.05}
          transparent
          opacity={0.3}
          envMapIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

/* ── Floating icosahedron ── */
const GlassIcosahedron = ({ position, scale = 1, speed = 0.4, color = '#6BA4D4' }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x += speed * 0.002;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * speed * 0.3) * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <GlassMaterial color={color} opacity={0.28} />
      </mesh>
    </Float>
  );
};

/* ── Thin wireframe accent rings (adds parallax depth cheaply) ── */
const WireRing = ({ position, scale = 1, speed = 0.15, color = '#C3DFF3' }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * speed;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * speed * 0.7) * 0.4;
  });
  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </Float>
  );
};

/* ── Soft light particles ── */
const Particles = ({ count = 60 }) => {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.015;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.1;
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#6BA4D4" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
};

/* ── Cap pixel ratio for battery / heat ── */
const AdaptivePerformance = () => {
  const { gl } = useThree();
  useEffect(() => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); }, [gl]);
  return null;
};

/* ── Main Scene ── */
const SceneContent = () => (
  <>
    <AdaptivePerformance />

    {/* Lighting */}
    <ambientLight intensity={0.7} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
    <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#E8956A" />
    <pointLight position={[0, 0, 4]} intensity={0.5} color="#6BA4D4" />

    {/* Environment for glass reflections */}
    <Environment preset="city" environmentIntensity={0.3} />

    {/* Glass objects — framing hero content */}
    <GlassTorus position={[3.5, 1.5, -1]} scale={0.8} speed={0.3} color="#6BA4D4" />
    <GlassTorus position={[-4.2, -1.2, -2.5]} scale={0.5} speed={0.2} color="#C3DFF3" />
    <GlassSphere position={[4.2, -2, -1.5]} scale={0.65} speed={0.15} color="#E8956A" />
    <GlassSphere position={[-3.5, 2.5, -3]} scale={0.4} speed={0.25} color="#F0B690" />
    <GlassIcosahedron position={[-2, -2.5, -1]} scale={0.55} speed={0.35} color="#87BFE7" />
    <GlassIcosahedron position={[2.2, 3, -2.5]} scale={0.35} speed={0.4} color="#6BA4D4" />

    {/* Wireframe accent rings for parallax depth */}
    <WireRing position={[-1, 0.5, -4]} scale={1.2} speed={0.1} color="#C3DFF3" />
    <WireRing position={[3, -1, -5]} scale={0.8} speed={0.08} color="#E8956A" />

    {/* Ambient particles */}
    <Particles count={60} />
  </>
);

/* ── Exported Canvas with performance guard ── */
const Scene3D = ({ className = '', style = {} }) => {
  const canRender = useCanRender3D();

  // On mobile / low-end → render nothing (CSS gradient orbs remain as fallback in Hero)
  if (!canRender) return null;

  return (
    <div className={`pointer-events-none ${className}`} style={style}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
