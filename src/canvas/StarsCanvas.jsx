import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';

function inSphere(arr, radius = 1.2) {
  for (let a = 0; a < arr.length; a += 3) {
    const l = Math.cbrt(Math.random());
    let o = Math.random() * 2 - 1;
    let c = Math.random() * 2 - 1;
    let d = Math.random() * 2 - 1;
    const f = Math.sqrt(o * o + c * c + d * d);
    if (f === 0) continue;
    o = (l * o) / f;
    c = (l * c) / f;
    d = (l * d) / f;
    arr[a] = o * radius;
    arr[a + 1] = c * radius;
    arr[a + 2] = d * radius;
  }
  return arr;
}

const StarField = () => {
  const ref = useRef();
  const [sphere] = useState(() => inSphere(new Float32Array(6000), 1.2));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#0f766e"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[-2]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
