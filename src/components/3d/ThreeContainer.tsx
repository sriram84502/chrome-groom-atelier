
import { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  BakeShadows,
  useProgress,
  Html
} from '@react-three/drei';

interface ThreeContainerProps {
  children: ReactNode;
  className?: string;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
}

// Loading component for 3D models
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-silver rounded-full border-t-transparent animate-spin mb-2"></div>
        <span className="text-xs text-brand-silver">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
};

const ThreeContainer = ({ 
  children, 
  className = '',
  environmentPreset = 'studio'
}: ThreeContainerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.7} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Rich environment map for better reflections */}
          <Environment preset={environmentPreset} background={false} />
          
          {/* Improved shadows */}
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256} 
          />
          
          {children}
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeContainer;
