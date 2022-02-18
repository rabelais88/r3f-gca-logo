import * as T from 'three';
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useControl } from 'react-three-gui';
import { Cloud, PresentationControls } from '@react-three/drei';

const Logo: React.FC = () => {
  const svgData = useLoader(SVGLoader, '/gca-symbol.svg');
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);

  const posX = useControl('logo - posX', {
    type: 'number',
    value: -0.65,
    min: -100,
    max: 100,
  });
  const posY = useControl('logo - posY', {
    type: 'number',
    value: 1,
    max: 100,
  });
  const posZ = useControl('logo - posZ', { type: 'number', max: 100 });
  return (
    <PresentationControls polar={[0, 0]}>
      <group>
        <mesh
          scale={0.001}
          position={[posX, posY, posZ]}
          receiveShadow
          castShadow
        >
          {shapes.map((s, i) => (
            <extrudeBufferGeometry
              key={i}
              args={[
                s,
                {
                  depth: 200,
                  bevelEnabled: false,
                  steps: 30,
                },
              ]}
            />
          ))}
          <meshPhongMaterial color="red" side={T.DoubleSide} />
        </mesh>
      </group>
    </PresentationControls>
  );
};

export default Logo;
