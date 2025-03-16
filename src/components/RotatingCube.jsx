import { useFrame } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';

// RotatingCube component
const RotatingCube = ({position, isControlEnabled, setPosition}) => {
  const meshRef = useRef(null);
  const controlsRef = useRef(null);
  const [moveDirectionX, setMoveDirectionX] = useState(1);  // 1 for right, -1 for left
  const [moveDirectionY, setMoveDirectionY] = useState(1);
  
  const handlePositionChange = () => {
    if (meshRef.current) {
      setPosition(meshRef.current.position.toArray());
    }
  };
  // This effect will update the position whenever the meshRef position changes
  useEffect(() => {
    if (meshRef.current) {
      handlePositionChange();  // Update position state manually whenever the mesh is moved by TransformControls
    }
  }, [meshRef.current?.position]);

  // Rotate the cube continuously
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // Rotate along X-axis
      meshRef.current.rotation.y += 0.01; // Rotate along Y-axis
    
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const maxX = 5; // 2 is half the cube's width (to avoid moving off-screen)
      const minX = -5;
      const maxY = 5; // 2 is half the cube's height (to avoid moving off-screen)
      const minY = -5;
      const moveXSpeed = .07
      const moveYSpeed = .07

      // Handle movement on the X-axis
      if (meshRef.current.position.x >= maxX && moveDirectionX === 1) {
        setMoveDirectionX(-1); // Change direction to left when right boundary is reached
      } else if (meshRef.current.position.x <= minX && moveDirectionX === -1) {
        setMoveDirectionX(1); // Change direction to right when left boundary is reached
      }
      meshRef.current.position.x += moveXSpeed * moveDirectionX;

      // Handle movement on the Y-axis
      if (meshRef.current.position.y >= maxY && moveDirectionY === 1) {
        setMoveDirectionY(-1); // Change direction to down when top boundary is reached
      } else if (meshRef.current.position.y <= minY && moveDirectionY === -1) {
        setMoveDirectionY(1); // Change direction to up when bottom boundary is reached
      }
      meshRef.current.position.y += moveYSpeed * moveDirectionY;
    }
  });
  
  
    

  return (
    <>
      <mesh position={position} ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>

      <TransformControls
        ref={controlsRef}
        object={meshRef.current}
        enabled={isControlEnabled}
        onChange={handlePositionChange}
      />
    </>
  );
};

export default RotatingCube;
