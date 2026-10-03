import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The hero's 3D centerpiece.
 *
 * A single distorted form lit by sage and apricot, turning slowly and leaning
 * toward the cursor. It is deliberately one object: a crowd of floating shapes
 * reads as a template, where one well-lit form reads as a decision.
 *
 * Everything here is gated — see `useCanRender3D`. Anything that fails the
 * gate gets the CSS fallback in HeroSection instead, which is designed to
 * stand on its own rather than look like a missing feature.
 */

const SAGE = '#7E9C7F';
const SAGE_LIGHT = '#A3C4A4';
const APRICOT = '#E8763A';

/* ── The form ──────────────────────────────────────────────────── */

const Centerpiece = () => {
  const mesh = useRef();
  const target = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useFrame(({ clock, pointer }, delta) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;

    // Pointer is -1..1; ease toward it so the form never snaps.
    target.current.lerp(pointer, Math.min(1, delta * 2.2));

    mesh.current.rotation.y = t * 0.12 + target.current.x * 0.35;
    mesh.current.rotation.x = Math.sin(t * 0.18) * 0.12 - target.current.y * 0.25;
    mesh.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  // Scale with the viewport so the composition holds from 1024 to ultrawide.
  const scale = useMemo(() => Math.min(1.35, Math.max(0.85, viewport.width / 9)), [viewport.width]);

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.5} floatingRange={[-0.08, 0.08]}>
      <mesh ref={mesh} scale={scale} position={[1.5, 0.1, 0]}>
        <icosahedronGeometry args={[1.5, 64]} />
        <MeshDistortMaterial
          color={SAGE}
          distort={0.36}
          speed={1.3}
          roughness={0.26}
          metalness={0.35}
          envMapIntensity={1.8}
        />
      </mesh>
    </Float>
  );
};

/* A thin wireframe shell, offset and counter-rotating, to give the form scale. */
const Shell = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = -clock.elapsedTime * 0.07;
    ref.current.rotation.z = clock.elapsedTime * 0.04;
  });
  return (
    <mesh ref={ref} scale={2.9} position={[1.5, 0.1, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={SAGE_LIGHT} wireframe transparent opacity={0.12} />
    </mesh>
  );
};

/* ── Scene ─────────────────────────────────────────────────────── */

const HeroCanvas = ({ className = '' }) => (
  <Canvas
    className={className}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    camera={{ position: [0, 0, 6], fov: 42 }}
    // The hero is decorative; the page's meaning does not depend on it.
    aria-hidden
    role="presentation"
  >
    <color attach="background" args={['#14110E']} />
    <fog attach="fog" args={['#14110E', 6, 14]} />

    <ambientLight intensity={0.5} />
    {/* Key from upper-left so the lit face turns toward the headline */}
    <directionalLight position={[-2, 4, 5]} intensity={2.6} color={SAGE_LIGHT} />
    {/* Warm rim along the lower-right edge — the apricot in the palette */}
    <pointLight position={[5, -2.5, 2]} intensity={60} distance={16} color={APRICOT} />
    <pointLight position={[-3, -2, 3]} intensity={26} distance={14} color="#E3A93F" />
    {/* Cool fill keeps the shadow side from going flat black */}
    <pointLight position={[0, 3, -4]} intensity={30} distance={16} color={SAGE} />

    <Centerpiece />
    <Shell />

    {/* Lightformers do the reflective work that makes the surface read as a
        material rather than flat shading. */}
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={3.2} color={SAGE_LIGHT} position={[-2, 4, 3]} scale={[8, 5, 1]} />
      <Lightformer form="circle" intensity={5} color={APRICOT} position={[5, -2, 2]} scale={4} />
      <Lightformer form="rect" intensity={2} color="#F4EFE7" position={[-4, 1, 3]} scale={[3, 6, 1]} />
      <Lightformer form="circle" intensity={2.4} color="#E3A93F" position={[0, -4, 1]} scale={3} />
    </Environment>
  </Canvas>
);

export default HeroCanvas;
