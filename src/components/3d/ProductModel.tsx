
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, MeshDistortMaterial } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { motion } from 'framer-motion-3d';

// Mock product model since we don't have actual 3D models
// In a real scenario, you'd import actual 3D models
const ProductModel = ({ position = [0, 0, 0], color = '#C0C0C0', hovered = false }) => {
  const meshRef = useRef<Mesh>(null);
  
  // Use a simple cylinder as placeholder for product bottle
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    
    // Subtle rotation when not being directly manipulated
    if (!hovered) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <motion.group
      position={new Vector3(position[0], position[1], position[2])}
      animate={{
        scale: hovered ? 1.1 : 1,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 2, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={5}
          distort={hovered ? 0.2 : 0.1}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      {/* Bottle cap */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
    </motion.group>
  );
};

export default ProductModel;
