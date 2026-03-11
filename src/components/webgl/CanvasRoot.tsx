'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { PerformanceMonitor } from '@react-three/drei'

import CameraRig from './camera/CameraRig'
import WorldLighting from './world/WorldLighting'
import Ground from './scene/Ground'
import HelasModel from './scene/HelasModel'
import PostProcessing from './post/PostProcessing'

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
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >

      {/* Performance scaling */}
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
        onChange={({ factor }) => setPerformance(factor)}
      />

      <Suspense fallback={null}>

        {/* Scene atmosphere */}
        <color attach="background" args={['#0A0F10']} />
        <fog attach="fog" args={['#0A0F10', 8, 35]} />

        {/* Camera controller */}
        <CameraRig />

        {/* Global world lighting */}
        <WorldLighting />

        {/* Scene objects */}
        <Ground />
        <HelasModel />

        {/* Post effects */}
        <PostProcessing performance={performance} />

      </Suspense>

    </Canvas>
  )
}