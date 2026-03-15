'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls, PerformanceMonitor } from '@react-three/drei'

import SceneManager from '@/webgl/core/SceneManager'
import RenderPipeline from '@/webgl/core/RenderPipeline'

export default function CanvasRoot() {

  const [dpr, setDpr] = useState(1.5)
  const [performance, setPerformance] = useState(1)

  return (

    <Canvas
      camera={{
        fov: 40,
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

      {/* Orchestration */}
      <SceneManager />

      {/* Render Pipeline */}
      <RenderPipeline />

      {/* Atmosphere */}
      <color attach="background" args={['#0A0F10']} />
      <fog attach="fog" args={['#0A0F10', 5, 18]} />

      {/* DEBUG TOOLS */}
      <OrbitControls
        target={[0.0, 0.7, 0]}
        enablePan={true}
        minDistance={1}
        maxDistance={100}
        enableZoom={false}
      />

    </Canvas>

  )
}