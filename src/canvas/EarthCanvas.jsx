import React, { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import realEarthData from '../data/realEarth.json';

// High-intensity radial star sprite for tech hub nodes and plexus points
function createStarNodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.45, 'rgba(56, 189, 248, 0.95)');
  gradient.addColorStop(0.75, 'rgba(37, 99, 235, 0.45)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

const RealNeonEarth = ({ onHoverCity, onLeaveCity }) => {
  const groupRef = useRef();
  const packetPointsRef = useRef();
  const starTexture = useMemo(() => createStarNodeTexture(), []);

  // 1. Continental Plexus Strings (Triangulated continental network matching Image 1)
  const plexusLinePositions = useMemo(() => {
    return new Float32Array(realEarthData.plexusLines);
  }, []);

  // 2. Continental Plexus Node Points (Glowing vertices on all continents)
  const plexusPointPositions = useMemo(() => {
    return new Float32Array(realEarthData.plexusPoints);
  }, []);

  // 3. Real World Coastlines buffer (Vivid electric cyan outer boundary)
  const coastPositions = useMemo(() => {
    return new Float32Array(realEarthData.coastline);
  }, []);

  // 4. Real World Country Borders buffer (Delicate national boundaries)
  const borderPositions = useMemo(() => {
    return new Float32Array(realEarthData.borders);
  }, []);

  // 5. Global Oceanic Coordinate Graticule Grid (Meridians & Parallels)
  // Guarantees ZERO blank spots across oceans (Pacific, Atlantic, Indian, Arctic)
  const { graticulePositions, equatorPositions } = useMemo(() => {
    const coords = [];
    const eqCoords = [];
    const radius = 2.016;

    // Latitude parallels every 15 degrees
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = (lat * Math.PI) / 180;
      const y = radius * Math.sin(phi);
      const r = radius * Math.cos(phi);
      const segments = 64;
      const target = lat === 0 ? eqCoords : coords;

      for (let s = 0; s < segments; s++) {
        const t1 = (s / segments) * Math.PI * 2;
        const t2 = ((s + 1) / segments) * Math.PI * 2;
        target.push(
          r * Math.cos(t1), y, r * Math.sin(t1),
          r * Math.cos(t2), y, r * Math.sin(t2)
        );
      }
    }

    // Longitude meridians every 15 degrees
    for (let lon = 0; lon < 360; lon += 15) {
      const theta = (lon * Math.PI) / 180;
      const segments = 48;
      const target = lon === 0 || lon === 180 ? eqCoords : coords;

      for (let s = 0; s < segments; s++) {
        const lat1 = -85 + (s / segments) * 170;
        const lat2 = -85 + ((s + 1) / segments) * 170;

        const p1 = (lat1 * Math.PI) / 180;
        const p2 = (lat2 * Math.PI) / 180;

        const y1 = radius * Math.sin(p1);
        const r1 = radius * Math.cos(p1);
        const y2 = radius * Math.sin(p2);
        const r2 = radius * Math.cos(p2);

        target.push(
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

  // 6. Oceanic Star Dust Particles ensuring fine digital texture across water bodies
  const oceanParticlePositions = useMemo(() => {
    const count = 480;
    const pos = new Float32Array(count * 3);
    const radius = 2.017;

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

  // 7. Tech Hub City Beacons
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

  // 8. Intercontinental Parabolic Cyber Flight Arcs
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

  // 9. Initial Energy Packets buffer for traveling photons along cyber arcs
  const packetPositions = useMemo(() => {
    return new Float32Array(realEarthData.arcs.length * 3);
  }, []);

  // Animation Loop: natural axial rotation + traveling energy packets
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0022;
    }

    if (packetPointsRef.current) {
      const arcs = realEarthData.arcs;
      const array = packetPointsRef.current.attributes.position.array;
      for (let i = 0; i < arcs.length; i++) {
        const pts = arcs[i].points;
        const totalPoints = pts.length / 3;
        const progress = (time * 0.45 + (i * 0.14)) % 1;
        const index = Math.floor(progress * (totalPoints - 1));
        const nextIndex = Math.min(index + 1, totalPoints - 1);
        const subT = (progress * (totalPoints - 1)) - index;

        const x = THREE.MathUtils.lerp(pts[index * 3], pts[nextIndex * 3], subT);
        const y = THREE.MathUtils.lerp(pts[index * 3 + 1], pts[nextIndex * 3 + 1], subT);
        const z = THREE.MathUtils.lerp(pts[index * 3 + 2], pts[nextIndex * 3 + 2], subT);

        array[i * 3] = x;
        array[i * 3 + 1] = y;
        array[i * 3 + 2] = z;
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
    // Natural 23.5 degree Earth axial tilt, initially framed on Americas, Atlantic & Europe
    <group ref={groupRef} rotation={[0.32, -0.65, 0.08]}>
      {/* Invisible raycast interaction sphere */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[2.14, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Deep Midnight Obsidian Core: provides solid 3D mass so continents stand out vividly */}
      <mesh>
        <sphereGeometry args={[1.98, 48, 48]} />
        <meshBasicMaterial
          color="#030514"
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Atmospheric Celestial Neon Rim Corona */}
      <mesh>
        <sphereGeometry args={[2.08, 40, 40]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Global Coordinate Graticule Grid (Meridians & Parallels) - guarantees NO blank holes anywhere */}
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
          color="#1e40af"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Highlighted Equator & Prime Meridian */}
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
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Oceanic Star Dust Mesh */}
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
          size={0.04}
          color="#60a5fa"
          map={starTexture}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* CONTINENTAL PLEXUS STRINGS (The dense triangulated glowing cyber mesh of continents from Image 1) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={plexusLinePositions.length / 3}
            array={plexusLinePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.82}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Real World Continent Coastlines (Vivid Electric Cyan Stroke) */}
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
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Real World Country Borders (Delicate Electric Blue) */}
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
          color="#60a5fa"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Intercontinental Parabolic Cyber Arcs / Flight Strings */}
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
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Continental Plexus Nodes (Glowing Cyan/White Stars across all landmasses) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={plexusPointPositions.length / 3}
            array={plexusPointPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#7dd3fc"
          map={starTexture}
          transparent
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Global Tech Hub Major City Beacon Stars */}
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
          size={0.13}
          map={starTexture}
          vertexColors
          transparent
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Animated Luminous Energy Packets gliding along cyber flight arcs */}
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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-[#03071e]/90 border border-[#38bdf8]/50 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-md flex items-center gap-2 pointer-events-none transition-[transform,opacity] duration-200 ease-out">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-white font-tech">
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
          {/* Smooth Click & Spin Controls: zoom disabled so mouse scroll moves the webpage naturally */}
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.7}
            enableDamping
            dampingFactor={0.05}
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
