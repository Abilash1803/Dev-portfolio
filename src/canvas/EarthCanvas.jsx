import React, { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import globeData from '../data/globeNetwork.json';

// High-intensity neon star sprite texture for glowing nodes
function createNeonNodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.45, 'rgba(192, 132, 252, 0.9)');
  gradient.addColorStop(0.75, 'rgba(147, 51, 234, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const NeonPlexusGlobe = ({ hoverPointRef, isHoveredRef, onGlobePointerMove, onGlobePointerOut }) => {
  const groupRef = useRef();
  const pointGeoRef = useRef();
  const lineGeoRef = useRef();
  const hasActiveHoverRef = useRef(false);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const nodeTexture = useMemo(() => createNeonNodeTexture(), []);

  // Listen to window scroll to power the 3D cinematic scroll inertia
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      // Impart rotational momentum on scroll
      scrollVelocity.current += delta * 0.0035;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pre-calculate positions and glowing neon colors once for maximum 60+ FPS performance
  const {
    pts,
    lines,
    nodePositions,
    baseNodeColors,
    currentNodeColors,
    linePositions,
    baseLineColors,
    currentLineColors,
  } = useMemo(() => {
    const pList = globeData.points;
    const lList = globeData.lines;

    // 1. Node points buffer
    const pPos = new Float32Array(pList.length * 3);
    const bNodeCol = new Float32Array(pList.length * 3);
    const cNodeCol = new Float32Array(pList.length * 3);

    const cWhite = new THREE.Color('#ffffff');
    const cCyan = new THREE.Color('#38bdf8');
    const cNeonViolet = new THREE.Color('#c084fc');
    const cNeonPurple = new THREE.Color('#a855f7');
    const cDeepIndigo = new THREE.Color('#818cf8');

    for (let i = 0; i < pList.length; i++) {
      const p = pList[i];
      pPos[i * 3] = p.x;
      pPos[i * 3 + 1] = p.y;
      pPos[i * 3 + 2] = p.z;

      // Color nodes: hubs glow radiant white, land clusters glow neon violet, ocean nodes glow cyan/periwinkle
      let color;
      if (p.isHub) {
        color = cWhite;
      } else if (p.isLand) {
        color = i % 3 === 0 ? cNeonViolet : cNeonPurple;
      } else {
        color = i % 2 === 0 ? cCyan : cDeepIndigo;
      }

      bNodeCol[i * 3] = color.r;
      bNodeCol[i * 3 + 1] = color.g;
      bNodeCol[i * 3 + 2] = color.b;

      cNodeCol[i * 3] = color.r;
      cNodeCol[i * 3 + 1] = color.g;
      cNodeCol[i * 3 + 2] = color.b;
    }

    // 2. Line segments buffer
    const lPos = new Float32Array(lList.length * 6);
    const bLineCol = new Float32Array(lList.length * 6);
    const cLineCol = new Float32Array(lList.length * 6);

    for (let k = 0; k < lList.length; k++) {
      const [i, j, dist, isLand] = lList[k];
      const p1 = pList[i];
      const p2 = pList[j];

      lPos[k * 6] = p1.x;
      lPos[k * 6 + 1] = p1.y;
      lPos[k * 6 + 2] = p1.z;
      lPos[k * 6 + 3] = p2.x;
      lPos[k * 6 + 4] = p2.y;
      lPos[k * 6 + 5] = p2.z;

      // Distance falloff intensity
      const intensity = Math.max(0.38, 1 - (dist / 0.52));
      const col1 = p1.isHub ? cWhite : (isLand ? cNeonViolet : cDeepIndigo);
      const col2 = p2.isHub ? cWhite : (isLand ? cNeonPurple : cCyan);

      bLineCol[k * 6] = col1.r * intensity;
      bLineCol[k * 6 + 1] = col1.g * intensity;
      bLineCol[k * 6 + 2] = col1.b * intensity;
      bLineCol[k * 6 + 3] = col2.r * intensity;
      bLineCol[k * 6 + 4] = col2.g * intensity;
      bLineCol[k * 6 + 5] = col2.b * intensity;

      cLineCol[k * 6] = bLineCol[k * 6];
      cLineCol[k * 6 + 1] = bLineCol[k * 6 + 1];
      cLineCol[k * 6 + 2] = bLineCol[k * 6 + 2];
      cLineCol[k * 6 + 3] = bLineCol[k * 6 + 3];
      cLineCol[k * 6 + 4] = bLineCol[k * 6 + 4];
      cLineCol[k * 6 + 5] = bLineCol[k * 6 + 5];
    }

    return {
      pts: pList,
      lines: lList,
      nodePositions: pPos,
      baseNodeColors: bNodeCol,
      currentNodeColors: cNodeCol,
      linePositions: lPos,
      baseLineColors: bLineCol,
      currentLineColors: cLineCol,
    };
  }, []);

  // Frame loop: ambient orbital rotation + scroll-driven 3D cinematic rotation + hover glow
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Damped scroll momentum: smoothly glides back to 0 when scrolling halts
    scrollVelocity.current = THREE.MathUtils.damp(scrollVelocity.current, 0, 4.5, delta);

    // Continuous orbital rotation + scroll responsiveness
    groupRef.current.rotation.y += delta * 0.14 + scrollVelocity.current;

    // Subtle natural tilt animation responding to scroll velocity
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.22 + (scrollVelocity.current * 0.4),
      0.08
    );

    const isHovered = isHoveredRef.current;
    const localHoverPoint = hoverPointRef.current;

    if (isHovered && localHoverPoint && pointGeoRef.current && lineGeoRef.current) {
      hasActiveHoverRef.current = true;
      const hX = localHoverPoint.x;
      const hY = localHoverPoint.y;
      const hZ = localHoverPoint.z;
      const glowRadius = 0.72;
      const glowRadiusSq = glowRadius * glowRadius;

      // 1. Highlight Nodes in hover radius to brilliant pure white & cyan
      for (let i = 0; i < pts.length; i++) {
        const px = nodePositions[i * 3];
        const py = nodePositions[i * 3 + 1];
        const pz = nodePositions[i * 3 + 2];
        const dSq = (px - hX) * (px - hX) + (py - hY) * (py - hY) + (pz - hZ) * (pz - hZ);

        if (dSq < glowRadiusSq) {
          const factor = Math.pow(1 - Math.sqrt(dSq) / glowRadius, 1.2);
          currentNodeColors[i * 3] = THREE.MathUtils.lerp(baseNodeColors[i * 3], 1.0, factor);
          currentNodeColors[i * 3 + 1] = THREE.MathUtils.lerp(baseNodeColors[i * 3 + 1], 1.0, factor);
          currentNodeColors[i * 3 + 2] = THREE.MathUtils.lerp(baseNodeColors[i * 3 + 2], 1.0, factor);
        } else {
          currentNodeColors[i * 3] = baseNodeColors[i * 3];
          currentNodeColors[i * 3 + 1] = baseNodeColors[i * 3 + 1];
          currentNodeColors[i * 3 + 2] = baseNodeColors[i * 3 + 2];
        }
      }
      pointGeoRef.current.attributes.color.needsUpdate = true;

      // 2. Highlight Lines connecting in hover radius to vivid luminous white
      for (let k = 0; k < lines.length; k++) {
        const [i, j] = lines[k];
        const p1x = nodePositions[i * 3];
        const p1y = nodePositions[i * 3 + 1];
        const p1z = nodePositions[i * 3 + 2];
        const p2x = nodePositions[j * 3];
        const p2y = nodePositions[j * 3 + 1];
        const p2z = nodePositions[j * 3 + 2];

        const dSq1 = (p1x - hX) * (p1x - hX) + (p1y - hY) * (p1y - hY) + (p1z - hZ) * (p1z - hZ);
        const dSq2 = (p2x - hX) * (p2x - hX) + (p2y - hY) * (p2y - hY) + (p2z - hZ) * (p2z - hZ);

        if (dSq1 < glowRadiusSq || dSq2 < glowRadiusSq) {
          const f1 = dSq1 < glowRadiusSq ? Math.pow(1 - Math.sqrt(dSq1) / glowRadius, 1.1) : 0;
          const f2 = dSq2 < glowRadiusSq ? Math.pow(1 - Math.sqrt(dSq2) / glowRadius, 1.1) : 0;

          currentLineColors[k * 6] = THREE.MathUtils.lerp(baseLineColors[k * 6], 1.0, f1);
          currentLineColors[k * 6 + 1] = THREE.MathUtils.lerp(baseLineColors[k * 6 + 1], 1.0, f1);
          currentLineColors[k * 6 + 2] = THREE.MathUtils.lerp(baseLineColors[k * 6 + 2], 1.0, f1);

          currentLineColors[k * 6 + 3] = THREE.MathUtils.lerp(baseLineColors[k * 6 + 3], 1.0, f2);
          currentLineColors[k * 6 + 4] = THREE.MathUtils.lerp(baseLineColors[k * 6 + 4], 1.0, f2);
          currentLineColors[k * 6 + 5] = THREE.MathUtils.lerp(baseLineColors[k * 6 + 5], 1.0, f2);
        } else {
          currentLineColors[k * 6] = baseLineColors[k * 6];
          currentLineColors[k * 6 + 1] = baseLineColors[k * 6 + 1];
          currentLineColors[k * 6 + 2] = baseLineColors[k * 6 + 2];
          currentLineColors[k * 6 + 3] = baseLineColors[k * 6 + 3];
          currentLineColors[k * 6 + 4] = baseLineColors[k * 6 + 4];
          currentLineColors[k * 6 + 5] = baseLineColors[k * 6 + 5];
        }
      }
      lineGeoRef.current.attributes.color.needsUpdate = true;
    } else if (hasActiveHoverRef.current && pointGeoRef.current && lineGeoRef.current) {
      currentNodeColors.set(baseNodeColors);
      currentLineColors.set(baseLineColors);
      pointGeoRef.current.attributes.color.needsUpdate = true;
      lineGeoRef.current.attributes.color.needsUpdate = true;
      hasActiveHoverRef.current = false;
    }
  });

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    if (!groupRef.current) return;
    const localHit = groupRef.current.worldToLocal(e.point.clone());
    hoverPointRef.current = localHit;
    isHoveredRef.current = true;
    onGlobePointerMove(e.point.clone());
  }, [hoverPointRef, isHoveredRef, onGlobePointerMove]);

  const handlePointerOut = useCallback(() => {
    isHoveredRef.current = false;
    hoverPointRef.current = null;
    onGlobePointerOut();
  }, [hoverPointRef, isHoveredRef, onGlobePointerOut]);

  return (
    <group ref={groupRef} rotation={[0.22, -2.1, 0.08]}>
      {/* Invisible raycast interaction sphere capturing cursor movement */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[2.10, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Deep Space Translucent Core: provides rich 3D volumetric depth without obscuring internal neon strings */}
      <mesh>
        <sphereGeometry args={[1.92, 48, 48]} />
        <meshBasicMaterial
          color="#060218"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Neon Rim Glow */}
      <mesh>
        <sphereGeometry args={[2.08, 40, 40]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Interconnected Glowing Neon Lines / Strings */}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={currentLineColors.length / 3}
            array={currentLineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glowing Star / Coordinate Nodes */}
      <points>
        <bufferGeometry ref={pointGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={currentNodeColors.length / 3}
            array={currentNodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.10}
          map={nodeTexture}
          vertexColors
          transparent
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export const EarthCanvas = () => {
  const hoverPointRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [hoverPosWorld, setHoverPosWorld] = useState(null);

  const handleGlobePointerMove = useCallback((pos) => {
    setHoverPosWorld(pos);
  }, []);

  const handleGlobePointerOut = useCallback(() => {
    setHoverPosWorld(null);
  }, []);

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 6.6],
      }}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 + 0.35}
          minPolarAngle={Math.PI / 2 - 0.35}
        />
        <NeonPlexusGlobe
          hoverPointRef={hoverPointRef}
          isHoveredRef={isHoveredRef}
          onGlobePointerMove={handleGlobePointerMove}
          onGlobePointerOut={handleGlobePointerOut}
        />

        {/* Soft natural point light focused on hover location (no flat geometry disc) */}
        {hoverPosWorld && (
          <pointLight
            position={[hoverPosWorld.x, hoverPosWorld.y, hoverPosWorld.z]}
            intensity={3.5}
            distance={2.2}
            color="#e0e7ff"
          />
        )}

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
