'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { ASSETS } from '../core/AssetLoader'

export default function Model() {

  const { scene } = useGLTF(ASSETS.models.hero)

  useEffect(() => {

    scene.traverse((child) => {

      if (!(child instanceof THREE.Mesh)) return

      child.castShadow = true
      child.receiveShadow = false

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

          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace
          }

          mat.envMapIntensity = 7.2

          if (mat.normalMap) {
            mat.normalScale.set(2, 1)
          }

          if (child.name === 'Body') {
            mat.roughness = 1.5
            mat.metalness = 1
          }

          if (child.name === 'MetalFrame') {
            mat.roughness = 1.2
            mat.metalness = 1.08
          }

          return mat
        }

        const fallback = new THREE.MeshStandardMaterial({
          color: (material as THREE.MeshStandardMaterial).color ?? new THREE.Color('#B4D4D6'),
          map: (material as THREE.MeshStandardMaterial).map ?? null,
          roughness: 1.6,
          metalness: 1.0,
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

  }, [scene])

  return (
    <group position={[0, -0.001, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(ASSETS.models.hero)
