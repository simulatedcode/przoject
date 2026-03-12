import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Model() {

  const { scene } = useGLTF('/models/helas.glb')

  useEffect(() => {

    scene.traverse((child) => {

      if (child instanceof THREE.Mesh) {

        child.castShadow = true
        child.receiveShadow = true

        if (child.material instanceof THREE.MeshStandardMaterial) {

          child.material.roughness = 0.55
          child.material.metalness = 0.05

        }

      }

    })

  }, [scene])

  return (

    <group position={[0, 0, 0]} scale={0.14}>

      <primitive object={scene} />

      {/* Key Light */}
      <spotLight
        position={[0, 3, 2]}
        intensity={2.4}
        angle={0.45}
        penumbra={0.7}
        decay={2}
        color="#6EA1A4"
      />

      {/* Rim Light */}
      <spotLight
        position={[-2.2, 1.6, -2.4]}
        intensity={0.1}
        angle={0.5}
        penumbra={1}
        decay={2}
        color="#6EA1A4"
      />

      {/* Fill Light */}
      <pointLight
        position={[-1.2, 0.6, 1.4]}
        intensity={0.022}
        distance={6}
        decay={2}
        color="#67260E"
      />

      {/* Core Glow */}
      <pointLight
        position={[0, 0.8, 0.3]}
        intensity={0.035}
        distance={4}
        decay={2}
        color="#BE461A"
      />

      {/* FLOOR BOUNCE (subtle cinematic reflection) */}
      <pointLight
        position={[0, -0.7, 0.6]}
        intensity={0.035}
        distance={3}
        decay={2}
        color="#BE461A"
      />

    </group>

  )

}

useGLTF.preload('/models/helas.glb')