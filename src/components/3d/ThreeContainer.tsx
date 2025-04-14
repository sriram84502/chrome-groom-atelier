
import { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  BakeShadows,
  useProgress,
  Html,
  OrbitControls
} from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';

interface ThreeContainerProps {
  children: ReactNode;
  className?: string;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  controls?: boolean;
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

// Error Fallback component
const ErrorFallback = ({ error }: { error: Error }) => {
  console.error("3D rendering error:", error);
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-red-500/20 p-4 rounded-md">
          <p className="text-xs text-red-500 mb-2">Failed to load 3D content</p>
          <p className="text-xs text-white/70">Please try refreshing the page</p>
        </div>
      </div>
    </Html>
  );
};

const ThreeScene = ({ 
  children, 
  environmentPreset, 
  controls = false 
}: { 
  children: ReactNode; 
  environmentPreset: ThreeContainerProps['environmentPreset'];
  controls?: boolean;
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      
      {/* Basic lighting setup */}
      <ambientLight intensity={0.7} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset={environmentPreset} background={false} />
      
      {/* Shadows */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4} 
      />
      
      {children}
      
      {controls && <OrbitControls enableZoom={false} enablePan={false} />}
      
      <BakeShadows />
    </Suspense>
  );
};

const ThreeContainer = ({ 
  children, 
  className = '',
  environmentPreset = 'studio',
  controls = false
}: ThreeContainerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas shadows dpr={[1, 1.5]}>
          <ThreeScene environmentPreset={environmentPreset} controls={controls}>
            {children}
          </ThreeScene>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ThreeContainer;
