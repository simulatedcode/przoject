import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Model() {

  const { scene } = useGLTF('/models/helas.glb')

  useEffect(() => {

    scene.traverse((child) => {

      if (!(child instanceof THREE.Mesh)) return

      child.castShadow = true
      child.receiveShadow = true

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      const processed = materials.map((material) => {

        // Clone material to avoid modifying shared instances
        const mat = material.clone()

        if (
          mat instanceof THREE.MeshStandardMaterial ||
          mat instanceof THREE.MeshPhysicalMaterial
        ) {

          if (child.name === 'Body') {
            mat.roughness = 0.25
          }

          if (child.name === 'MetalFrame') {
            mat.metalness = 0.08
          }

          return mat
        }

        // Fallback: convert unsupported materials to PBR
        return new THREE.MeshStandardMaterial({
          color: (material as any).color ?? new THREE.Color('#D35E3A'),
          map: (material as any).map ?? null,
          transparent: material.transparent,
          opacity: material.opacity,
        })

      })

      child.material = processed.length === 1 ? processed[0] : processed

    })

  }, [scene])

  return (
    <group scale={0.12}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/helas.glb')