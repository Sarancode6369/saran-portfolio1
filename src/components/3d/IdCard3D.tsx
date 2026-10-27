import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function CardMesh({ flipped }: { flipped: boolean }) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture("/assets/profile.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = flipped ? Math.PI : 0;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target, delta * 3.5);
  });

  return (
    <group ref={group}>
      {/* Card body */}
      <RoundedBox args={[2.4, 3.5, 0.1]} radius={0.1} smoothness={6}>
        <meshStandardMaterial color="#0c0c10" metalness={0.7} roughness={0.25} />
      </RoundedBox>

      {/* Front face */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[2.25, 3.35]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>

      {/* Photo */}
      <mesh position={[0, 0.85, 0.06]}>
        <circleGeometry args={[0.58, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh position={[0, 0.85, 0.058]}>
        <ringGeometry args={[0.58, 0.64, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.85} />
      </mesh>

      {/* Blue accent line */}
      <mesh position={[0, 0.15, 0.06]}>
        <planeGeometry args={[1.6, 0.015]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Scene({ flipped }: { flipped: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#3b82f6" />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <CardMesh flipped={flipped} />
      </Float>
      <Environment preset="city" />
    </>
  );
}

export default function IdCard3D() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* 3D Canvas */}
      <div
        className="w-full h-[380px] md:h-[440px] cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Flip 3D ID card"
      >
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 32 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene flipped={flipped} />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML overlay text that flips with state */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-[78%] h-[72%] transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front text */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h3 className="text-xl font-semibold text-white tracking-tight">Saran V</h3>
            <p className="text-sm text-blue-400 mt-1">Junior Full Stack Developer</p>
            <p className="text-xs text-white/50 mt-3">B.Tech Information Technology</p>
            <p className="text-[11px] text-white/40 mt-0.5">J.J. College of Engg. & Tech.</p>
            <div className="flex gap-3 mt-3">
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60">
                Grad 2026
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60">
                CGPA 7.90
              </span>
            </div>
            <p className="text-[10px] text-white/25 mt-4 tracking-wider uppercase">Click to flip</p>
          </div>

          {/* Back text */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-blue-400/80 mb-1">Contact</p>
            <p className="text-sm text-white/80">saran6369v@gmail.com</p>
            <p className="text-sm text-white/55">LinkedIn Profile</p>
            <p className="text-sm text-white/55">GitHub · Sarancode6369</p>
            <p className="text-sm text-white/55">HackerRank Profile</p>
            <p className="text-xs text-white/40 mt-2">Tamil Nadu, India</p>
            <p className="text-[10px] text-white/25 mt-3 tracking-wider uppercase">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}
