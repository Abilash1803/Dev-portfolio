import React, { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import globeData from '../data/globeNetwork.json';

// Luminous soft star sprite texture for nodes
function createNeonNodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.25, '#ffffff');
  gradient.addColorStop(0.55, 'rgba(196, 181, 253, 0.9)');
  gradient.addColorStop(0.85, 'rgba(129, 140, 248, 0.25)');
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
  const nodeTexture = useMemo(() => createNeonNodeTexture(), []);

  // Pre-calculate positions and clean, crisp base colors
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
    const cLavender = new THREE.Color('#c4b5fd');
    const cPeriwinkle = new THREE.Color('#818cf8');

    for (let i = 0; i < pList.length; i++) {
      const p = pList[i];
      pPos[i * 3] = p.x;
      pPos[i * 3 + 1] = p.y;
      pPos[i * 3 + 2] = p.z;

      const col = p.isHub ? cWhite : (p.isLand ? cLavender : cPeriwinkle);

      bNodeCol[i * 3] = col.r;
      bNodeCol[i * 3 + 1] = col.g;
      bNodeCol[i * 3 + 2] = col.b;

      cNodeCol[i * 3] = bNodeCol[i * 3];
      cNodeCol[i * 3 + 1] = bNodeCol[i * 3 + 1];
      cNodeCol[i * 3 + 2] = bNodeCol[i * 3 + 2];
    }

    // 2. Line segments buffer
    const lPos = new Float32Array(lList.length * 6);
    const bLineCol = new Float32Array(lList.length * 6);
    const cLineCol = new Float32Array(lList.length * 6);

    // Balanced color palette preventing blowout
    const cLandLine = new THREE.Color('#a5b4fc');
    const cOceanLine = new THREE.Color('#6366f1');
    const cChordLine = new THREE.Color('#4338ca');

    for (let k = 0; k < lList.length; k++) {
      const [i, j, , isChord] = lList[k];
      const p1 = pList[i];
      const p2 = pList[j];

      lPos[k * 6] = p1.x;
      lPos[k * 6 + 1] = p1.y;
      lPos[k * 6 + 2] = p1.z;
      lPos[k * 6 + 3] = p2.x;
      lPos[k * 6 + 4] = p2.y;
      lPos[k * 6 + 5] = p2.z;

      let col = isChord ? cChordLine : (p1.isLand && p2.isLand ? cLandLine : cOceanLine);
      const intensity = isChord ? 0.45 : (p1.isLand && p2.isLand ? 0.95 : 0.7);

      bLineCol[k * 6] = col.r * intensity;
      bLineCol[k * 6 + 1] = col.g * intensity;
      bLineCol[k * 6 + 2] = col.b * intensity;
      bLineCol[k * 6 + 3] = col.r * intensity;
      bLineCol[k * 6 + 4] = col.g * intensity;
      bLineCol[k * 6 + 5] = col.b * intensity;

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

  // Update loop: orbital rotation + interactive real-time mouse hover glow
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Ambient orbital rotation
    groupRef.current.rotation.y += delta * 0.12;

    const isHovered = isHoveredRef.current;
    const localHoverPoint = hoverPointRef.current;

    if (isHovered && localHoverPoint && pointGeoRef.current && lineGeoRef.current) {
      hasActiveHoverRef.current = true;
      const hX = localHoverPoint.x;
      const hY = localHoverPoint.y;
      const hZ = localHoverPoint.z;
      const glowRadius = 0.75;
      const glowRadiusSq = glowRadius * glowRadius;

      // 1. Highlight Nodes in hover radius to solid bright white
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

      // 2. Highlight Lines connecting in hover radius to pure bright white
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
      // Cleanly reset back to luminous base colors when cursor leaves
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
    <group ref={groupRef} rotation={[0.2, 0, 0.05]}>
      {/* Invisible raycast surface sphere capturing pointer movement */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[2.14, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Dark Cosmic Core providing occlusion depth & preventing white blowout */}
      <mesh>
        <sphereGeometry args={[1.96, 48, 48]} />
        <meshBasicMaterial
          color="#040212"
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle outer atmospheric rim aura */}
      <mesh>
        <sphereGeometry args={[2.08, 48, 48]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Luminous Connecting Lines & Interior Chords */}
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
          opacity={0.72}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Star / Node Points across the entire sphere */}
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
          size={0.038}
          map={nodeTexture}
          vertexColors
          transparent
          alphaTest={0.01}
          blending={THREE.NormalBlending}
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
        position: [0, 0, 6.4],
      }}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.7}
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

        {/* Dynamic bright beacon flare directly where mouse hovers */}
        {hoverPosWorld && (
          <group position={[hoverPosWorld.x, hoverPosWorld.y, hoverPosWorld.z]}>
            <mesh>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
            </mesh>
            <mesh>
              <ringGeometry args={[0.06, 0.18, 24]} />
              <meshBasicMaterial
                color="#c084fc"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        )}

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
