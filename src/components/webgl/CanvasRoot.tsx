'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls, PerformanceMonitor } from '@react-three/drei'

import CameraRig from './camera/CameraRig'
import WorldLighting from './world/WorldLighting'
import Ground from './world/Ground'
import Model from './scene/Model'

export default function CanvasRoot() {

  const [dpr, setDpr] = useState(1.5)
  const [performance, setPerformance] = useState(1)

  return (

    <Canvas
      camera={{
        position: [0, 0.65, 6.5],
        fov: 30,
        near: 0.1,
        far: 100
      }}
      dpr={dpr}
      shadows
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto'
      }}
    >

      {/* Performance scaling */}
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
        onChange={({ factor }) => setPerformance(factor)}
      />

      {/* DEBUG CAMERA */}
      <OrbitControls
        target={[0.0, 0.7, 0]}
        enablePan={true}
        minDistance={1}
        maxDistance={100}
        enableZoom={false}
      />

      <CameraRig />

      {/* Atmosphere */}
      <color attach="background" args={['#0A0F10']} />
      <fog attach="fog" args={['#1B2B2C', 12, 24]} />

      {/* Global lighting */}
      <WorldLighting />

      {/* Scene assets */}
      <Suspense fallback={null}>
        <Ground />
        <Model />
      </Suspense>


    </Canvas>

  )
}