'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HelasModel from './HelasModel'

export default function CanvasRoot() {

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 35,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <Suspense fallback={null}>

        <ambientLight intensity={0.45} />
        <directionalLight position={[8, 5, 2]} />
        <HelasModel />

      </Suspense>

    </Canvas >
  )
}
