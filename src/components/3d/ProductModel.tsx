
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Product model with simplified props and animations
const ProductModel = ({ 
  position = [0, 0, 0], 
  color = '#C0C0C0', 
  hovered = false 
}: {
  position: [number, number, number];
  color: string;
  hovered: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Simple animation without relying on mouse position
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Basic floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    
    // Simple rotation
    if (hovered) {
      // Faster rotation when hovered
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    } else {
      // Slower rotation when not hovered
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      {/* Main bottle body */}
      <mesh 
        ref={meshRef} 
        castShadow 
        receiveShadow
        scale={hovered ? 1.1 : 1}
      >
        <cylinderGeometry args={[0.7, 0.6, 2.2, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={hovered ? 0.2 : 0.1}
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={1.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      
      {/* Bottle neck */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? "#FFFFFF" : "#DDDDDD"} 
          metalness={0.7} 
          roughness={0.3}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>
      
      {/* Bottle cap */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshPhysicalMaterial 
          color="#333333" 
          metalness={0.8} 
          roughness={0.2}
          clearcoat={0.5}
          reflectivity={0.8}
        />
      </mesh>
      
      {/* Decorative ring */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <torusGeometry args={[0.72, 0.05, 16, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? "#FFD700" : "#B8B8B8"} 
          metalness={0.9} 
          roughness={0.1}
          emissive={hovered ? new THREE.Color(color) : new THREE.Color("#000000")}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Optional decorative element when hovered */}
      {hovered && (
        <mesh position={[0, -0.8, 0]} castShadow>
          <ringGeometry args={[0.65, 0.75, 32]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.9}
            roughness={0.1}
            emissive={new THREE.Color(color)}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

export default ProductModel;
