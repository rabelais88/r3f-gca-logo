import * as T from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import state from '../state';
import { useGesture } from '@use-gesture/react';
import { useEffect } from 'react';

const Logo: React.FC = () => {
  const svgData = useLoader(SVGLoader, '/gca-symbol.svg');
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);
  const refControl = useRef(null);
  const r = refControl as unknown as React.RefObject<T.Group>;
  useFrame((s, delta) => {
    if (r?.current && state.idle) {
      const rc = r?.current;
      rc.rotation.reorder('YXZ');
      rc.rotateY(0.01);
    }
  });

  useGesture(
    {
      onDragStart: () => {
        state.idle = false;
        document.body.style.cursor = 'grabbing';
      },
      onDrag: (state) => {
        const [x, y] = state.delta;
        const rc = r?.current;
        if (rc) {
          rc.rotation.reorder('YXZ');
          rc.rotateY(x * 0.01);
        }
      },
      onDragEnd: () => {
        state.idle = true;
        document.body.style.cursor = 'grab';
      },
    },
    { target: window }
  );
  useEffect(() => {
    if (document?.body?.style) {
      document.body.style.cursor = 'grab';
    }
  }, []);

  return (
    <group position={[0, 1, 0]} ref={refControl}>
      {/* <axesHelper /> */}
      <mesh scale={0.001} receiveShadow castShadow position={[-0.7, 0, -0.1]}>
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
  );
};

export default Logo;
