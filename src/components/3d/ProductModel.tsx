
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced product model with more colors and interactive features
const ProductModel = ({ position = [0, 0, 0], color = '#C0C0C0', hovered = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();
  
  // Create gradient colors for more vibrant appearance
  const topColor = hovered ? new THREE.Color(color).offsetHSL(0, 0.2, 0.2) : new THREE.Color(color);
  const bottomColor = hovered ? new THREE.Color(color).offsetHSL(0, -0.1, -0.1) : new THREE.Color(color).offsetHSL(0, 0, -0.3);
  
  // Mouse interaction effect
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Enhanced floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    
    // Mouse-based rotation and movement
    if (hovered) {
      // More reactive mouse movement
      const mouseX = (mouse.x * viewport.width) / 10;
      const mouseY = (mouse.y * viewport.height) / 10;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouseY * 0.1,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouseX * 0.1 + state.clock.elapsedTime * 0.1,
        0.05
      );
    } else {
      // Subtle rotation when not being directly manipulated
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      <Float 
        speed={hovered ? 3 : 1.5} 
        rotationIntensity={hovered ? 0.3 : 0.1} 
        floatIntensity={hovered ? 0.3 : 0.1}
      >
        {/* Main bottle body with gradient material */}
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
            toneMapped={false}
          />
        </mesh>
        
        {/* Bottle neck with shimmer effect */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.4, 32]} />
          <meshPhysicalMaterial 
            color={hovered ? "#FFFFFF" : "#DDDDDD"} 
            metalness={0.7} 
            roughness={0.3}
            clearcoat={1}
            reflectivity={1}
            iridescence={0.3}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 800]}
          />
        </mesh>
        
        {/* Bottle cap with improved materials */}
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
        
        {/* Decorative ring with animated glow */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <torusGeometry args={[0.72, 0.05, 16, 32]} />
          <meshPhysicalMaterial 
            color={hovered ? "#FFD700" : "#B8B8B8"} 
            metalness={0.9} 
            roughness={0.1}
            emissive={hovered ? new THREE.Color(color) : new THREE.Color("#000000")}
            emissiveIntensity={hovered ? 0.5 : 0}
            toneMapped={false}
          />
        </mesh>
        
        {/* Add decorative elements */}
        {hovered && (
          <mesh position={[0, -0.8, 0]} castShadow>
            <ringGeometry args={[0.65, 0.75, 32]} />
            <meshPhysicalMaterial 
              color={topColor} 
              metalness={0.9}
              roughness={0.1}
              emissive={topColor}
              emissiveIntensity={0.3}
              toneMapped={false}
            />
          </mesh>
        )}
      </Float>
    </group>
  );
};

export default ProductModel;
