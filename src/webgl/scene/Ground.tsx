'use client'

import { Grid, MeshReflectorMaterial } from '@react-three/drei'

export default function Ground() {

  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: '#2D4748',
    sectionSize: 2,
    sectionThickness: 0.6,
    sectionColor: '#1B2B2C',
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return (
    <group>

      <Grid {...gridConfig} position={[0, 0, 0]} />

      {/* 🔮 REFLECTIVE SURFACE: The foundation of the visual depth */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151515"
          metalness={0.8}
          mirror={0.8}
        />
      </mesh>

      {/* shadow catcher */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.0015, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.025} />
      </mesh>

    </group>)
}
