import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import vertexShader from '@/shaders/model.vert'
import fragmentShader from '@/shaders/model.frag'

export default function HelasModel() {
  const meshRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/helas.glb')

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#f7d08a') },
    },
    transparent: true,
    depthWrite: false, // Often better for holographic effects to avoid depth issues
    blending: THREE.AdditiveBlending, // Makes it look more like a hologram
  }), [])

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
    <group ref={meshRef} position={[0, 0, 2]} scale={0.1}>
      <primitive object={scene} />
      {/* Bottom glow splash on floor */}
      <pointLight
        position={[0, -1, 0]}
        intensity={20}
        distance={5}
        decay={2}
        color="#f7d08a"
      />
    </group>
  )
}

useGLTF.preload('/models/helas.glb')
