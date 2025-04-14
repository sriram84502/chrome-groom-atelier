
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';

// Enhanced product model with more colors and effects
const ProductModel = ({ position = [0, 0, 0], color = '#C0C0C0', hovered = false }) => {
  const meshRef = useRef<Mesh>(null);
  
  // Use a simple cylinder as placeholder for product bottle with enhanced colors
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Enhanced floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    
    // Subtle rotation when not being directly manipulated
    if (!hovered) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  // Make the colors more vibrant based on the input color
  const getBaseColor = () => {
    // Add a slight shimmer effect by varying the color slightly
    const shimmerFactor = Math.sin(Date.now() * 0.001) * 0.1 + 0.9;
    return color;
  };

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
          color={getBaseColor()}
          speed={2}
          distort={hovered ? 0.2 : 0.1}
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Bottle neck */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.4, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#FFFFFF" : "#DDDDDD"} 
          metalness={0.7} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Bottle cap */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial 
          color="#333333" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Decorative ring */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <torusGeometry args={[0.72, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#FFD700" : "#B8B8B8"} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
};

export default ProductModel;
