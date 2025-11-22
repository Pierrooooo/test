"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface ThreeDModelProps {
  file?: string;
}

function Model({ file }: { file: string }) {
  const group = useRef<any>(null);
  const { scene } = useGLTF(file);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setAutoRotate(false);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // Réactiver la rotation auto après un délai
    setTimeout(() => setAutoRotate(true), 2000);
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    
    setRotation(prev => ({
      x: Math.max(-Math.PI/2, Math.min(Math.PI/2, prev.x + e.movementY * 0.01)),
      y: prev.y + e.movementX * 0.01
    }));
  };

  useFrame(() => {
    if (group.current) {
      if (autoRotate && !isDragging) {
        group.current.rotation.y += 0.0015;
      } else {
        group.current.rotation.x = rotation.x;
        group.current.rotation.y = rotation.y;
      }
    }
  });

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={1} 
      position={[-10, -150, -300]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    />
  );
}

export default function ThreeDModel({ file }: ThreeDModelProps) {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 45 }}
        onWheel={(e: any) => e.preventDefault()}
      >
        <ambientLight intensity={0.9} />
        <directionalLight intensity={0.9} position={[3, 3, 3]} />

        <Suspense fallback={null}>
          <Model file={`${file}`} />
        </Suspense>
      </Canvas>
    </div>
  );
}