import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function HelasModel() {

  const { scene } = useGLTF('/models/helas.glb')

  useEffect(() => {

    scene.traverse((child) => {

      if (child instanceof THREE.Mesh) {

        child.castShadow = true
        child.receiveShadow = true

        if (child.material instanceof THREE.MeshStandardMaterial) {

          child.material.roughness = 0.45
          child.material.metalness = 0.1

        }

      }

    })

  }, [scene])

  return (

    <group position={[0, 0, 0]} scale={0.14}>

      <primitive object={scene} />

      {/* Key Light */}
      <spotLight
        position={[1.6, 1.4, 2.2]}
        intensity={2.2}
        angle={0.45}
        penumbra={0.6}
        decay={2}
        color="#E0521F"
        castShadow
      />

      {/* Rim Light */}
      <spotLight
        position={[-1.8, 1.2, -2]}
        intensity={1.5}
        angle={0.55}
        penumbra={1}
        decay={2}
        color="#6EA1A4"
      />

      {/* Fill Light */}
      <pointLight
        position={[-1.2, 0.6, 1.4]}
        intensity={0.4}
        distance={4}
        decay={2}
        color="#EB906F"
      />

      {/* Core Glow */}
      <pointLight
        position={[0, 0.8, 0.3]}
        intensity={0.25}
        distance={2}
        decay={2}
        color="#EB906F"
      />

    </group>

  )

}

useGLTF.preload('/models/helas.glb')