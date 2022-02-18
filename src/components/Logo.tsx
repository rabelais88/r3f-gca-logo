import * as T from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
// import { useControl } from 'react-three-gui';
import { PresentationControls } from '@react-three/drei';

interface IState {
  idle: boolean;
}
const state: IState = {
  idle: true,
};

const Logo: React.FC = () => {
  const svgData = useLoader(SVGLoader, '/gca-symbol.svg');
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);
  const refControl = useRef(null);
  // const posX = useControl('logo - posX', {
  //   type: 'number',
  //   value: -0.65,
  //   min: -100,
  //   max: 100,
  // });
  // const posY = useControl('logo - posY', {
  //   type: 'number',
  //   value: 1,
  //   max: 100,
  // });
  // const posZ = useControl('logo - posZ', { type: 'number', max: 100 });
  const [posX, posY, posZ] = [-0.65, 1, 0];
  const r = refControl as unknown as React.RefObject<T.Group>;
  useFrame((s, delta) => {
    if (r?.current && state.idle) {
      const rc = r?.current;
    }
  });
  return (
    <PresentationControls polar={[0, 0]} global>
      <group position={[posX, posY, posZ]} ref={refControl}>
        <mesh
          onPointerEnter={() => (state.idle = false)}
          onPointerLeave={() => (state.idle = true)}
          scale={0.001}
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
