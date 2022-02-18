import React, { Suspense } from 'react';
import './App.css';
import { Canvas as r3fCanvas } from '@react-three/fiber';
import {
  Backdrop,
  Cloud,
  PerspectiveCamera,
  SpotLight,
  Stage,
} from '@react-three/drei';
import Logo from './components/Logo';
import { Controls, withControls } from 'react-three-gui';
import CustomCamera from './components/CustomCamera';

const Canvas = withControls(r3fCanvas);

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Controls.Provider>
        <Canvas style={{ width: '100vw', height: '100vh' }} shadows>
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
            <Cloud />
          </Suspense>
        </Canvas>
        <Controls />
      </Controls.Provider>
    </div>
  );
}

export default App;
