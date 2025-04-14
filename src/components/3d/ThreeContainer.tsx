
import { ReactNode, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

interface ThreeContainerProps {
  children: ReactNode;
  className?: string;
}

const ThreeContainer = ({ children, className = '' }: ThreeContainerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {children}
      </Canvas>
    </div>
  );
};

export default ThreeContainer;
