import { useGLTF, Environment } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { ASSETS } from '../core/AssetLoader'

export default function Model() {

  const { scene } = useGLTF(ASSETS.models.hero)

  useEffect(() => {

    scene.traverse((child) => {

      if (!(child instanceof THREE.Mesh)) return

      child.castShadow = true
      child.receiveShadow = true

      if (!child.userData.__originalMaterials) {
        child.userData.__originalMaterials = Array.isArray(child.material)
          ? child.material
          : [child.material]
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      const processed = materials.map((material) => {

        if ((material as THREE.Material).userData?.__isCodexClone) {
          return material
        }

        const mat = material.clone()

        mat.userData = {
          ...mat.userData,
          __isCodexClone: true,
        }

        if (
          mat instanceof THREE.MeshStandardMaterial ||
          mat instanceof THREE.MeshPhysicalMaterial
        ) {

          // Correct color space
          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace
          }

          // Improve reflections
          mat.envMapIntensity = 6.2

          // Normal strength
          if (mat.normalMap) {
            mat.normalScale.set(1, 1)
          }

          // Natural material presets
          if (child.name === 'Body') {
            mat.roughness = 0.5
            mat.metalness = 0
          }

          if (child.name === 'MetalFrame') {
            mat.roughness = 0.2
            mat.metalness = 0.8
          }

          return mat
        }

        // Fallback → convert to PBR material
        const fallback = new THREE.MeshStandardMaterial({
          color: (material as any).color ?? new THREE.Color('#B3D4D6'),
          map: (material as any).map ?? null,
          roughness: 0.6,
          metalness: 0.0,
          transparent: material.transparent,
          opacity: material.opacity,
        })

        fallback.userData = {
          ...fallback.userData,
          __isCodexClone: true,
        }

        return fallback
      })

      child.material = processed.length === 1 ? processed[0] : processed
    })

    return () => {

      scene.traverse((child) => {

        if (!(child instanceof THREE.Mesh)) return

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material]

        const originals = child.userData.__originalMaterials as THREE.Material[] | undefined

        materials.forEach((material) => {
          if (material.userData?.__isCodexClone) {
            material.dispose()
          }
        })

        if (originals && originals.length > 0) {
          child.material = originals.length === 1 ? originals[0] : originals
        }

      })

    }

  }, [scene])

  return (
    <group position={[0, -0.001, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(ASSETS.models.hero)