import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.07;
      group.current.rotation.x = Math.sin(t * 0.12) * 0.1;
    }
    if (group2.current) {
      group2.current.rotation.y = -t * 0.05;
      group2.current.rotation.z = Math.sin(t * 0.08) * 0.06;
    }
  });

  const shapes = useMemo(
    () => [
      { pos: [-3.0, 1.5, -1.0] as [number, number, number], scale: 0.55, color: "#3b82f6", type: 0 },
      { pos: [2.8, -1.1, -1.6] as [number, number, number], scale: 0.42, color: "#60a5fa", type: 1 },
      { pos: [2.2, 1.7, -2.0] as [number, number, number], scale: 0.32, color: "#93c5fd", type: 2 },
      { pos: [-2.2, -1.6, -1.3] as [number, number, number], scale: 0.38, color: "#2563eb", type: 0 },
      { pos: [0.3, 0.4, -2.6] as [number, number, number], scale: 0.6, color: "#1d4ed8", type: 1 },
      { pos: [-1.4, 2.1, -1.8] as [number, number, number], scale: 0.24, color: "#38bdf8", type: 2 },
      { pos: [1.6, -1.9, -0.9] as [number, number, number], scale: 0.28, color: "#818cf8", type: 0 },
      { pos: [-2.6, 0.2, -2.4] as [number, number, number], scale: 0.2, color: "#67e8f9", type: 1 },
      { pos: [3.0, 0.8, -2.8] as [number, number, number], scale: 0.22, color: "#a5b4fc", type: 2 },
    ],
    []
  );

  const rings = useMemo(
    () => [
      { pos: [0, 0, -3.2] as [number, number, number], scale: 1.8, color: "#1e40af" },
      { pos: [-1.5, 1.0, -3.5] as [number, number, number], scale: 1.1, color: "#312e81" },
    ],
    []
  );

  return (
    <>
      <group ref={group}>
        {shapes.map((s, i) => (
          <Float key={i} speed={1.1 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.65}>
            <mesh position={s.pos} scale={s.scale}>
              {s.type === 0 && <icosahedronGeometry args={[1, 0]} />}
              {s.type === 1 && <octahedronGeometry args={[1, 0]} />}
              {s.type === 2 && <torusGeometry args={[0.7, 0.22, 16, 48]} />}
              <MeshDistortMaterial
                color={s.color}
                roughness={0.12}
                metalness={0.9}
                distort={0.35}
                speed={2}
                transparent
                opacity={0.85}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <group ref={group2}>
        {rings.map((r, i) => (
          <Float key={`r${i}`} speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh position={r.pos} scale={r.scale} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1, 0.03, 16, 100]} />
              <meshBasicMaterial color={r.color} transparent opacity={0.35} />
            </mesh>
          </Float>
        ))}
      </group>

      <Sphere args={[2.4, 32, 32]} position={[0, 0, -3.8]}>
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.08} />
      </Sphere>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 4, 2]} intensity={1} />
          <pointLight position={[-3, 2, 1]} intensity={0.5} color="#60a5fa" />
          <pointLight position={[3, -1, 2]} intensity={0.3} color="#818cf8" />
          <Stars radius={80} depth={40} count={1200} factor={3} saturation={0.3} fade speed={0.6} />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
