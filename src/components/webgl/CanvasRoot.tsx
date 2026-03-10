'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline } from '@react-three/postprocessing'
import { PerformanceMonitor } from '@react-three/drei'
import HelasModel from './HelasModel'
import Ground from './Ground'
import CameraRig from './CameraRig'

export default function CanvasRoot() {
  const [dpr, setDpr] = useState(1.5)
  const [performance, setPerformance] = useState(1) // 0 to 1 scaling factor

  return (
    <Canvas
      camera={{
        position: [1, 2, 15],
        fov: 35,
        near: 0.01,
        far: 1000
      }}
      dpr={dpr}
      frameloop="always"
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true
      }}
      shadows
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
        onChange={({ factor }) => setPerformance(factor)}
      />

      <Suspense fallback={null}>
        <color attach="background" args={['#0A0F10']} />
        <fog attach="fog" args={['#0A0F10', 10, 50]} />

        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[15, 2, 5]}
          intensity={8}
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

        <EffectComposer enableNormalPass={performance > 0.5}>
          <Bloom
            intensity={0.8 * performance}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur={performance > 0.5}
          />
          <Noise opacity={0.05 * performance} />
          <Scanline opacity={0.1 * performance} density={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={0.68} />
          <ChromaticAberration
            offset={[0.0018 * performance, 0.0018 * performance]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>

      </Suspense>

    </Canvas >
  )
}
