'use client'

import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CinemaEnvironment
 * A presentation hall environment matching the technical 'Truss' aesthetic.
 * Features:
 * - Raised black stage
 * - Technical overhead truss system
 * - Audience silhouettes
 * - Foreground seating
 */
export default function CinemaEnvironment() {
  return (
    <group>


      {/* 🔦 CINEMATIC LIGHTING: Theatrical spotlights */}
      <group position={[0, 11.5, -8]}>
        <spotLight
          position={[-10, 0, 0]}
          angle={0.4}
          penumbra={1}
          intensity={10}
          castShadow
          color="#D3E3E4"
          target-position={[-5, 0, -12]}
        />
        <spotLight
          position={[10, 0, 0]}
          angle={0.4}
          penumbra={1}
          intensity={10}
          castShadow
          color="#D3E3E4"
          target-position={[5, 0, -12]}
        />
        <spotLight
          position={[0, 0, 2]}
          angle={0.6}
          penumbra={1}
          intensity={10}
          color="#D3E3E4"
          target-position={[0, 0, -10]}
        />
      </group>
    </group>
  )
}
