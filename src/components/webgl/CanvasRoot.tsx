'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, Scanline } from '@react-three/postprocessing'
import HelasModel from './HelasModel'
import Ground from './Ground'
import CameraRig from './CameraRig'

export default function CanvasRoot() {

  return (
    <Canvas
      camera={{
        position: [1, 2, 15],
        fov: 35,
        near: 0.01,
        far: 1000
      }}
      dpr={[1, 2]} // Increased dpr for better quality with postprocessing
      frameloop="always"
      gl={{
        antialias: true, // Post-processing usually handles antialiasing or doesn't need it as much
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
      <Suspense fallback={null}>
        <color attach="background" args={['#111111']} />
        <fog attach="fog" args={['#111111', 10, 50]} />

        <ambientLight intensity={2.5} />
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

        <EffectComposer enableNormalPass>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Noise opacity={0.05} />
          <Scanline opacity={0.1} density={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={0.68} />
          <ChromaticAberration
            offset={[0.0001, 0.0008]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>

      </Suspense>

    </Canvas >
  )
}
