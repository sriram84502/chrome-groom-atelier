
import { useState, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import ProductModel from './ProductModel';

const products = [
  { id: 1, position: [-2.5, 0, 0], color: '#8AC7DB' },  // Light blue for face wash
  { id: 2, position: [-1.25, 0, 0], color: '#C0C0C0' }, // Silver for serum
  { id: 3, position: [0, 0, 0], color: '#385170' },     // Navy for moisturizer
  { id: 4, position: [1.25, 0, 0], color: '#5D8AA8' },  // Steel blue for beard oil
  { id: 5, position: [2.5, 0, 0], color: '#71797E' },   // Gunmetal for shampoo
];

const ProductCarousel = ({ selectProduct }: { selectProduct: (id: number) => void }) => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const groupRef = useRef<any>(null);
  const targetRotation = useRef(0);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  // Fix: Simplify the animation setup
  const { rotationY } = useSpring({
    rotationY: targetRotation.current,
    config: { mass: 5, tension: 350, friction: 40 }
  });

  const handleProductClick = (id: number) => {
    setActiveProduct(id);
    selectProduct(id);
    
    // Calculate rotation to center the selected product
    const productIndex = products.findIndex(p => p.id === id);
    const targetAngle = (productIndex - Math.floor(products.length / 2)) * (Math.PI / 8);
    targetRotation.current = -targetAngle;
  };

  useFrame((state, delta) => {
    if (!groupRef.current || activeProduct) return;
    
    // Auto-rotate when no product is selected
    groupRef.current.rotation.y += delta * 0.15;
  });

  useEffect(() => {
    // Reset rotation when deselecting a product
    if (activeProduct === null && groupRef.current) {
      targetRotation.current = groupRef.current.rotation.y;
    }
  }, [activeProduct]);

  return (
    // Fix: Use a regular group with ref instead of animated.group
    <group ref={groupRef}>
      {products.map((product) => (
        <group 
          key={product.id} 
          onClick={() => handleProductClick(product.id)}
          // Apply animation directly to each product group
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
    </group>
  );
};

export default ProductCarousel;
