import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const FloatingIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.2, 1]} position={[2.5, 0.5, -1]}>
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.4}
          transparent
          opacity={0.8}
          roughness={0}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1, 0.35, 16, 32]} position={[-3, -0.5, -2]}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={2}
          distort={0.3}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
};

const FloatingBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={2.5}>
      <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={[-1.5, 2, -1.5]}>
        <MeshWobbleMaterial
          color="#8b5cf6"
          speed={2}
          factor={0.6}
          transparent
          opacity={0.6}
          roughness={0}
          metalness={0.7}
        />
      </Box>
    </Float>
  );
};

const GlowSphere = () => {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
      <Sphere args={[0.6, 32, 32]} position={[3, -1.5, -3]}>
        <MeshDistortMaterial
          color="#ec4899"
          speed={4}
          distort={0.5}
          transparent
          opacity={0.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const FloatingScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#8b5cf6" />
        
        <FloatingIcosahedron />
        <FloatingTorus />
        <FloatingBox />
        <GlowSphere />
        <Particles />
      </Canvas>
    </div>
  );
};

export default FloatingScene;
