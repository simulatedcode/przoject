import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import vertexShader from '@/shaders/model.vert'
import fragmentShader from '@/shaders/model.frag'

export default function HelasModel() {
  const meshRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/helas.glb')

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#f7d08a') },
    },
    transparent: true,
  })

  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.material = material
      node.castShadow = true
      node.receiveShadow = true
    }
  })

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={0.12}
      position={[0, 0, 0]}
    />
  )
}

useGLTF.preload('/models/helas.glb')
