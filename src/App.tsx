import React, { Suspense } from 'react';
import './App.css';
import { Canvas as r3fCanvas } from '@react-three/fiber';
import { Backdrop, Cloud, Loader, SpotLight, Stage } from '@react-three/drei';
import Logo from './components/Logo';
import CustomCamera from './components/CustomCamera';

const Canvas = r3fCanvas;

const Scene: React.FC = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Stage
          shadows
          castShadow
          receiveShadow
          adjustCamera
          intensity={1}
          environment="city"
          preset="rembrandt"
        >
          <SpotLight castShadow position={[0, 5, 0]} />
          <Logo />
          <Backdrop
            floor={0.5} // Stretches the floor segment, 0.25 by default
            segments={20} // Mesh-resolution, 20 by default
            scale={[100, 10, 10]}
            position={[0, 0, 0]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial color="#353540" />
          </Backdrop>
          <CustomCamera />
        </Stage>
        <Cloud opacity={0.3} />
      </Suspense>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Canvas style={{ width: '100vw', height: '100vh' }} shadows>
        <Scene />
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
