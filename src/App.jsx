import { Canvas } from '@react-three/fiber';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import RotatingCube from './components/RotatingCube';  // Import the RotatingCube component

export default function App() {
  const [isControlEnabled, setControlEnabled] = useState(true);
  const [position, setPosition] = useState([2, 1, -3]);

  

  return (
    <div className='w-screen h-screen bg-gray-100 flex justify-center items-center'>
      <Canvas>
        {/* Use the RotatingCube component */}
        <RotatingCube
          position={position}
          isControlEnabled={isControlEnabled}
          setPosition={setPosition}
        />

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>

      {/* Display the position */}
      <div className="absolute top-4 left-4 text-white bg-black p-2">
        <p>Position: {`X: ${position[0].toFixed(2)}, Y: ${position[1].toFixed(2)}, Z: ${position[2].toFixed(2)}`}</p>
      </div>
    </div>
  );
}
