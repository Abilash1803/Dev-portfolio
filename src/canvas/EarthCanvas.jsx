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
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.9)');
  gradient.addColorStop(0.8, 'rgba(168, 85, 247, 0.35)');
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

  // 3. Global Oceanic Coordinate Graticule Grid (Meridians & Parallels)
  // Guarantees zero blank spots anywhere on Earth (e.g. across Pacific & Atlantic oceans)
  const { graticulePositions, equatorPositions } = useMemo(() => {
    const coords = [];
    const eqCoords = [];
    const radius = 2.015;

    // Latitude circles (parallels) every 15 degrees
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = (lat * Math.PI) / 180;
      const y = radius * Math.sin(phi);
      const r = radius * Math.cos(phi);
      const segments = 64;
      const targetArray = lat === 0 ? eqCoords : coords;

      for (let s = 0; s < segments; s++) {
        const t1 = (s / segments) * Math.PI * 2;
        const t2 = ((s + 1) / segments) * Math.PI * 2;
        targetArray.push(
          r * Math.cos(t1), y, r * Math.sin(t1),
          r * Math.cos(t2), y, r * Math.sin(t2)
        );
      }
    }

    // Longitude circles (meridians) every 15 degrees
    for (let lon = 0; lon < 360; lon += 15) {
      const theta = (lon * Math.PI) / 180;
      const segments = 48;
      const targetArray = lon === 0 || lon === 180 ? eqCoords : coords;

      for (let s = 0; s < segments; s++) {
        const lat1 = -85 + (s / segments) * 170;
        const lat2 = -85 + ((s + 1) / segments) * 170;

        const p1 = (lat1 * Math.PI) / 180;
        const p2 = (lat2 * Math.PI) / 180;

        const y1 = radius * Math.sin(p1);
        const r1 = radius * Math.cos(p1);
        const y2 = radius * Math.sin(p2);
        const r2 = radius * Math.cos(p2);

        targetArray.push(
          r1 * Math.cos(theta), y1, r1 * Math.sin(theta),
          r2 * Math.cos(theta), y2, r2 * Math.sin(theta)
        );
      }
    }

    return {
      graticulePositions: new Float32Array(coords),
      equatorPositions: new Float32Array(eqCoords),
    };
  }, []);

  // 4. Uniform Oceanic Star Particles ensuring texture throughout water bodies
  const oceanParticlePositions = useMemo(() => {
    const count = 420;
    const pos = new Float32Array(count * 3);
    const radius = 2.016;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.3999632;
      pos[i * 3] = Math.cos(phi) * radiusAtY * radius;
      pos[i * 3 + 1] = y * radius;
      pos[i * 3 + 2] = Math.sin(phi) * radiusAtY * radius;
    }

    return pos;
  }, []);

  // 5. Tech Hub City Beacons
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

  // 6. Parabolic Cyber Arcs buffer
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

  // 7. Animated Energy Packets traveling along the cyber arcs
  const packetPositions = useMemo(() => {
    const count = realEarthData.arcs.length;
    return new Float32Array(count * 3);
  }, []);

  // Animation Loop: natural axial rotation + traveling energy packets
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Natural gentle axial drift
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0024;
    }

    // Update positions of energy packets moving along the parabolic arcs
    if (packetPointsRef.current) {
      const arcs = realEarthData.arcs;
      for (let i = 0; i < arcs.length; i++) {
        const pts = arcs[i].points;
        const totalPoints = pts.length / 3;
        const progress = (time * 0.42 + (i * 0.15)) % 1;
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
        <sphereGeometry args={[2.14, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Deep Space Translucent Core: provides 3D depth while allowing far-side grid lines to glow through softly */}
      <mesh>
        <sphereGeometry args={[1.98, 48, 48]} />
        <meshBasicMaterial
          color="#06021c"
          transparent
          opacity={0.65}
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

      {/* 1. Global Coordinate Graticule Grid (Meridians & Parallels) - guarantees no blank oceanic holes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={graticulePositions.length / 3}
            array={graticulePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 2. Highlighted Equator & Prime Meridian */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={equatorPositions.length / 3}
            array={equatorPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Oceanic Particle Dust Mesh */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={oceanParticlePositions.length / 3}
            array={oceanParticlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#818cf8"
          map={starTexture}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 4. Real World Continent Coastlines (Vivid Neon Cyan) */}
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

      {/* 5. Real World Country Borders (Delicate Neon Violet) */}
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
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 6. Global Parabolic Cyber Arcs / Strings */}
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
          opacity={0.68}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 7. Global Tech Hub Beacon Stars */}
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

      {/* 8. Animated Luminous Energy Packets gliding along cyber arcs */}
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
