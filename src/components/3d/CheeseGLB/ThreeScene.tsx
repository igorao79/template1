"use client";

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

interface ThreeSceneProps {
  scrollY?: number;
}

// Simple cheese model component
const CheeseModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#F5CB5C' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[1, 1, 0.5, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.5} 
        metalness={0.2} 
        emissive={hovered ? '#E8871E' : '#000000'} 
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
};

// Swiss cheese with holes
const SwissCheeseModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 32]} />
        <meshStandardMaterial 
          color="#F5CB5C" 
          roughness={0.5} 
          metalness={0.2} 
          emissive={hovered ? '#E8871E' : '#000000'} 
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Holes */}
      {[
        { pos: [0.5, 0, 0.1] as [number, number, number], scale: 0.2 },
        { pos: [-0.3, 0, -0.1] as [number, number, number], scale: 0.15 },
        { pos: [0, 0, 0.3] as [number, number, number], scale: 0.25 },
        { pos: [-0.5, 0, 0.2] as [number, number, number], scale: 0.18 },
        { pos: [0.2, 0, -0.3] as [number, number, number], scale: 0.22 },
      ].map((hole, index) => (
        <mesh key={index} position={hole.pos} scale={hole.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#F5CB5C" opacity={0} transparent />
        </mesh>
      ))}
    </group>
  );
};

// Cheese wedge
const CheeseWedgeModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <coneGeometry args={[1, 1, 3]} />
      <meshStandardMaterial 
        color="#F5CB5C" 
        roughness={0.5} 
        metalness={0.2} 
        emissive={hovered ? '#E8871E' : '#000000'} 
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
};

// Scene component that includes multiple cheese models
const ThreeScene = ({ scrollY = 0 }: ThreeSceneProps) => {
  const cheesePositions = [
    { component: CheeseModel, position: [-2, 0, 0], rotation: [0.5, 0, 0], scale: 1, color: '#F5CB5C' },
    { component: SwissCheeseModel, position: [0, 0, 0], rotation: [0.2, 0, 0], scale: 1 },
    { component: CheeseWedgeModel, position: [2, 0, 0], rotation: [0, 0, 0], scale: 1 },
  ];

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E8871E" />
      
      <group position={[0, 0, 0]} rotation={[0, scrollY * 0.01, 0] as any}>
        {cheesePositions.map((cheese, index) => (
          <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {cheese.component === CheeseModel ? (
              <CheeseModel 
                position={cheese.position} 
                rotation={cheese.rotation} 
                scale={cheese.scale} 
                color={cheese.color} 
              />
            ) : cheese.component === SwissCheeseModel ? (
              <SwissCheeseModel 
                position={cheese.position} 
                rotation={cheese.rotation} 
                scale={cheese.scale} 
              />
            ) : (
              <CheeseWedgeModel 
                position={cheese.position} 
                rotation={cheese.rotation} 
                scale={cheese.scale} 
              />
            )}
          </Float>
        ))}
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default ThreeScene; 