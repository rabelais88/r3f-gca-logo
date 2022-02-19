import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const CustomCamera = () => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.set(0, 1.9447744481342757, 1.0542143990714377);
  });
  return null;
};

export default CustomCamera;
