'use client'

import { Canvas } from '@react-three/fiber'
import { useState, useMemo } from 'react'
import { Environment, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

import SceneManager from '@/webgl/core/SceneManager'
import RenderPipeline from '@/webgl/core/RenderPipeline'
import { MouseTracker } from '@/hooks/useMousePosition'

export default function CanvasRoot() {

  const [dpr, setDpr] = useState(1.5)

  const glConfig = useMemo(() => ({
    antialias: false,
    powerPreference: 'high-performance' as WebGLPowerPreference,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.25,
    alpha: true,
    stencil: false,
    depth: true,
    failIfMajorPerformanceCaveat: false,
  }), [])

  return (

    <Canvas
      camera={{
        fov: 35,
        near: 0.1,
        far: 100
      }}
      dpr={dpr}
      shadows={{ type: THREE.PCFShadowMap }}
      gl={glConfig}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >

      {/* Performance scaling */}
      <PerformanceMonitor
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))}
        onDecline={() => setDpr(1)}
        flipflops={3}
      />

      {/* Orchestration */}
      <MouseTracker />
      <SceneManager />

      {/* Render Pipeline */}
      <RenderPipeline />

      {/* Atmosphere */}
      <color attach="background" args={['#050608']} />
      <fog attach="fog" args={['#050608', 10, 30]} />
      <Environment preset="studio" />

    </Canvas>

  )
}
