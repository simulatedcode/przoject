'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HelasModel from './HelasModel'
import Ground from './Ground'
import CameraRig from './CameraRig'

export default function CanvasRoot() {

  return (
    <Canvas
      camera={{
        position: [1, 2, 10],
        fov: 35,
        near: 0.01,
        far: 200
      }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      shadows
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#111111']} />

        <fog attach="fog" args={['#111111', 10, 50]} />

        <ambientLight intensity={0.1} />
        <directionalLight
          castShadow
          position={[15, 2, 5]}
          intensity={5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <CameraRig />
        <Ground />
        <HelasModel />

      </Suspense>

    </Canvas >
  )
}
