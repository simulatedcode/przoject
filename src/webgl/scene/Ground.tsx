'use client'

import { Grid } from '@react-three/drei'

export default function Ground() {

  const gridConfig = {
    cellSize: 0.25,
    cellThickness: 0.6,
    cellColor: '#2D4748',
    sectionSize: 0.5,
    sectionThickness: 0.8,
    sectionColor: '#1B2B2C',
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return (
    <group>

      <Grid {...gridConfig} position={[0, 0, 0]} />

      {/* subtle base surface */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0a0f10"
          roughness={0.9}
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
