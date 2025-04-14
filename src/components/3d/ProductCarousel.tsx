
import { useState, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import ProductModel from './ProductModel';

const products = [
  { id: 1, position: [-2.5, 0, 0], color: '#8AC7DB' },  // Light blue for face wash
  { id: 2, position: [-1.25, 0, 0], color: '#FF6B6B' }, // Coral for serum
  { id: 3, position: [0, 0, 0], color: '#4E937A' },     // Sea green for moisturizer
  { id: 4, position: [1.25, 0, 0], color: '#FFB347' },  // Orange for beard oil
  { id: 5, position: [2.5, 0, 0], color: '#B19CD9' },   // Lavender for shampoo
];

const ProductCarousel = ({ selectProduct }: { selectProduct: (id: number) => void }) => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState(0);
  const { viewport, mouse } = useThree();
  const isMobile = viewport.width < 5;
  const lastMouseX = useRef(0);
  const isDragging = useRef(false);
  
  // Enhanced spring animation
  const { rotation } = useSpring({
    rotation: targetRotation,
    config: { mass: 5, tension: 350, friction: 40 }
  });

  const handleProductClick = (id: number) => {
    setActiveProduct(id);
    selectProduct(id);
    
    // Calculate rotation to center the selected product
    const productIndex = products.findIndex(p => p.id === id);
    const targetAngle = (productIndex - Math.floor(products.length / 2)) * (Math.PI / 8);
    setTargetRotation(-targetAngle);
  };

  // Handle mouse drag for interactive rotation
  useEffect(() => {
    const handleMouseDown = () => {
      isDragging.current = true;
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Mouse drag rotation
    if (isDragging.current && !activeProduct) {
      const deltaX = mouse.x - lastMouseX.current;
      if (groupRef.current) {
        groupRef.current.rotation.y += deltaX * 2;
        setTargetRotation(groupRef.current.rotation.y);
      }
    }
    
    lastMouseX.current = mouse.x;
    
    // Apply spring animation or auto-rotate
    if (activeProduct) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation.get(),
        0.1
      );
    } else {
      // Auto-rotate when no product is selected
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <animated.group ref={groupRef}>
      {products.map((product) => (
        <group 
          key={product.id} 
          onClick={() => handleProductClick(product.id)}
          position={[
            isMobile ? product.position[0] * 0.5 : product.position[0],
            product.position[1],
            product.position[2]
          ]}
        >
          <ProductModel 
            position={[0, 0, 0]}
            color={product.color}
            hovered={activeProduct === product.id}
          />
        </group>
      ))}
    </animated.group>
  );
};

export default ProductCarousel;
