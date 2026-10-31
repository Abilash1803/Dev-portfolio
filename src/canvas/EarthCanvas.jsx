import React, { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import realEarthData from '../data/realEarth.json';

// High-intensity radial star sprite for tech hub nodes and pulse beacons
function createStarNodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.45, 'rgba(56, 189, 248, 0.9)');
  gradient.addColorStop(0.75, 'rgba(168, 85, 247, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

const RealNeonEarth = ({ onHoverCity, onLeaveCity }) => {
  const groupRef = useRef();
  const packetPointsRef = useRef();
  const starTexture = useMemo(() => createStarNodeTexture(), []);

  // 1. Coastlines geometry buffer (Exact real-world continents)
  const coastPositions = useMemo(() => {
    return new Float32Array(realEarthData.coastline);
  }, []);

  // 2. Country borders geometry buffer (Exact real-world national boundaries)
  const borderPositions = useMemo(() => {
    return new Float32Array(realEarthData.borders);
  }, []);

  // 3. Tech Hub City Beacons
  const { hubPositions, hubColors } = useMemo(() => {
    const hubs = realEarthData.hubs;
    const pos = new Float32Array(hubs.length * 3);
    const col = new Float32Array(hubs.length * 3);

    const cWhite = new THREE.Color('#ffffff');
    const cCyan = new THREE.Color('#38bdf8');

    for (let i = 0; i < hubs.length; i++) {
      const h = hubs[i];
      pos[i * 3] = h.x;
      pos[i * 3 + 1] = h.y;
      pos[i * 3 + 2] = h.z;

      const c = h.tier === 1 ? cWhite : cCyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { hubPositions: pos, hubColors: col };
  }, []);

  // 4. Parabolic Cyber Arcs buffer
  const arcPositions = useMemo(() => {
    const allArcCoords = [];
    realEarthData.arcs.forEach((arc) => {
      const pts = arc.points;
      for (let i = 0; i < pts.length - 3; i += 3) {
        allArcCoords.push(
          pts[i], pts[i + 1], pts[i + 2],
          pts[i + 3], pts[i + 4], pts[i + 5]
        );
      }
    });
    return new Float32Array(allArcCoords);
  }, []);

  // 5. Animated Energy Packets traveling along the cyber arcs
  const packetPositions = useMemo(() => {
    const count = realEarthData.arcs.length;
    return new Float32Array(count * 3);
  }, []);

  // Animation Loop: natural axial rotation + traveling energy packets
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Natural axial drift
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0022;
    }

    // Update positions of energy packets moving along the parabolic arcs
    if (packetPointsRef.current) {
      const arcs = realEarthData.arcs;
      for (let i = 0; i < arcs.length; i++) {
        const pts = arcs[i].points;
        const totalPoints = pts.length / 3;
        // Staggered speed and phase for each arc
        const progress = (time * 0.45 + (i * 0.17)) % 1;
        const index = Math.floor(progress * (totalPoints - 1));
        const nextIndex = Math.min(index + 1, totalPoints - 1);
        const subT = (progress * (totalPoints - 1)) - index;

        const x = THREE.MathUtils.lerp(pts[index * 3], pts[nextIndex * 3], subT);
        const y = THREE.MathUtils.lerp(pts[index * 3 + 1], pts[nextIndex * 3 + 1], subT);
        const z = THREE.MathUtils.lerp(pts[index * 3 + 2], pts[nextIndex * 3 + 2], subT);

        packetPositions[i * 3] = x;
        packetPositions[i * 3 + 1] = y;
        packetPositions[i * 3 + 2] = z;
      }
      packetPointsRef.current.attributes.position.needsUpdate = true;
    }
  });

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    if (!groupRef.current) return;
    const localHit = groupRef.current.worldToLocal(e.point.clone());
    const hubs = realEarthData.hubs;

    let closest = null;
    let minDist = 0.45;
    for (let i = 0; i < hubs.length; i++) {
      const h = hubs[i];
      const dx = h.x - localHit.x;
      const dy = h.y - localHit.y;
      const dz = h.z - localHit.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        closest = h;
      }
    }

    if (closest) {
      onHoverCity(closest.name);
    } else {
      onLeaveCity();
    }
  }, [onHoverCity, onLeaveCity]);

  const handlePointerOut = useCallback(() => {
    onLeaveCity();
  }, [onLeaveCity]);

  return (
    // Natural 23.5 degree Earth axial tilt, initially framed on Europe, Africa & Indian Ocean
    <group ref={groupRef} rotation={[0.35, -1.8, 0.08]}>
      {/* Invisible raycast interaction sphere */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Dark Cosmic Core: Occludes far-side lines to provide crisp 3D continental contrast */}
      <mesh>
        <sphereGeometry args={[1.99, 48, 48]} />
        <meshBasicMaterial
          color="#040014"
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Atmospheric Neon Rim Corona */}
      <mesh>
        <sphereGeometry args={[2.08, 40, 40]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 1. Real World Continent Coastlines (Vivid Neon Cyan) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={coastPositions.length / 3}
            array={coastPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 2. Real World Country Borders (Delicate Neon Violet) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={borderPositions.length / 3}
            array={borderPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.52}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Global Parabolic Cyber Arcs / Strings */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={arcPositions.length / 3}
            array={arcPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 4. Global Tech Hub Beacon Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={hubPositions.length / 3}
            array={hubPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={hubColors.length / 3}
            array={hubColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          map={starTexture}
          vertexColors
          transparent
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 5. Animated Luminous Energy Packets gliding along cyber arcs */}
      <points>
        <bufferGeometry ref={packetPointsRef}>
          <bufferAttribute
            attach="attributes-position"
            count={packetPositions.length / 3}
            array={packetPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#ffffff"
          map={starTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export const EarthCanvas = () => {
  const [hoveredCity, setHoveredCity] = useState(null);

  const handleHoverCity = useCallback((cityName) => {
    setHoveredCity(cityName);
  }, []);

  const handleLeaveCity = useCallback(() => {
    setHoveredCity(null);
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* City Hover Tooltip Badge */}
      {hoveredCity && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-[#0a071e]/90 border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md flex items-center gap-2 pointer-events-none transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-white">
            {hoveredCity}
          </span>
        </div>
      )}

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
          {/* Smooth Click & Spin Controls with Momentum Inertia */}
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.7}
            enableDamping
            dampingFactor={0.06}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2 + 0.35}
            minPolarAngle={Math.PI / 2 - 0.35}
          />

          <RealNeonEarth
            onHoverCity={handleHoverCity}
            onLeaveCity={handleLeaveCity}
          />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
