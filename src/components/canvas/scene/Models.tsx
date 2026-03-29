'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'
import { ASSETS } from '../core/AssetLoader'

export default function Model() {
  const { scene } = useGLTF(ASSETS.models.hero)

  const pcdData = useMemo(() => {
    return new Promise<{ positions: THREE.Vector3[]; colors: THREE.Color[] }>(
      (resolve, reject) => {
        const loader = new PCDLoader()
        loader.load(
          '/models/sample.pcd',
          (points) => {
            const positions: THREE.Vector3[] = []
            const colors: THREE.Color[] = []
            const posAttr = points.geometry.getAttribute('position')
            const colAttr = points.geometry.getAttribute('color')

            if (posAttr) {
              for (let i = 0; i < posAttr.count; i++) {
                positions.push(
                  new THREE.Vector3(
                    posAttr.getX(i),
                    posAttr.getY(i),
                    posAttr.getZ(i)
                  )
                )
                if (colAttr) {
                  colors.push(
                    new THREE.Color(colAttr.getX(i), colAttr.getY(i), colAttr.getZ(i))
                  )
                } else {
                  colors.push(new THREE.Color('#9BBEC0'))
                }
              }
            }

            resolve({ positions, colors })
          },
          undefined,
          (error) => {
            console.error('Error loading PCD:', error)
            reject(error)
          }
        )
      }
    )
  }, [])

  useEffect(() => {
    let pcdPoints: { positions: THREE.Vector3[]; colors: THREE.Color[] } | null = null

    const processPCD = async () => {
      try {
        pcdPoints = await pcdData
      } catch (e) {
        console.error('Failed to load PCD:', e)
      }
    }

    processPCD()

    const processScene = () => {
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return

        child.castShadow = true
        child.receiveShadow = false

        if (child.name === 'Body' && pcdPoints && pcdPoints.positions.length > 0) {
          const geometry = child.geometry.clone()
          const boundingBox = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute('position'))
          const size = new THREE.Vector3()
          boundingBox.getSize(size)

          const textureSize = 256
          const displacementData = new Float32Array(textureSize * textureSize)
          const colorData = new Uint8Array(textureSize * textureSize * 4)

          pcdPoints.positions.forEach((point) => {
            const uvX = Math.floor(
              ((point.x - boundingBox.min.x) / size.x) * textureSize
            )
            const uvY = Math.floor(
              ((point.y - boundingBox.min.y) / size.y) * textureSize
            )

            if (uvX >= 0 && uvX < textureSize && uvY >= 0 && uvY < textureSize) {
              const idx = uvY * textureSize + uvX
              displacementData[idx] = (point.z - boundingBox.min.z) / size.z

              const color = pcdPoints!.colors[pcdPoints!.positions.indexOf(point)]
              const colorIdx = idx * 4
              colorData[colorIdx] = Math.floor(color.r * 255)
              colorData[colorIdx + 1] = Math.floor(color.g * 255)
              colorData[colorIdx + 2] = Math.floor(color.b * 255)
              colorData[colorIdx + 3] = 255
            }
          })

          const displacementTexture = new THREE.DataTexture(
            displacementData,
            textureSize,
            textureSize,
            THREE.RedFormat,
            THREE.FloatType
          )
          displacementTexture.needsUpdate = true

          const colorTexture = new THREE.DataTexture(
            colorData,
            textureSize,
            textureSize,
            THREE.RGBAFormat
          )
          colorTexture.needsUpdate = true

          const material = new THREE.MeshStandardMaterial({
            displacementMap: displacementTexture,
            displacementScale: 0.1,
            map: colorTexture,
            transparent: true,
            color: new THREE.Color('#ffffff'),
            roughness: 1.0,
            metalness: 0.0,
          })

          child.material = material

          return
        }

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

            if (child.name === 'MetalFrame') {
              mat.roughness = 1.4
              mat.metalness = 0.08
            }

            return mat
          }

          const fallback = new THREE.MeshStandardMaterial({
            color:
              (material as THREE.MeshStandardMaterial).color ??
              new THREE.Color('#9BBEC0'),
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
    }

    const timeout = setTimeout(processScene, 100)

    return () => clearTimeout(timeout)
  }, [scene, pcdData])

  return (
    <group position={[0, -0.0019, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(ASSETS.models.hero)
