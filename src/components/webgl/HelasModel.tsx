import { useRef, useLayoutEffect, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/utils/gsap'

// @ts-ignore
import vertexShader from '../../shaders/materials/hologram/vertex.glsl'
// @ts-ignore
import fragmentShader from '../../shaders/materials/hologram/fragment.glsl'

export default function HelasModel() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/helas.glb')

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uColor: { value: new THREE.Color('#E0521F') }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
  }, [])

  useLayoutEffect(() => {
    scene.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true
        node.receiveShadow = true
        node.material = material
      }
    })
  }, [scene, material])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  useEffect(() => {
    gsap.to(material.uniforms.uIntro, {
      value: 1,
      duration: 2.5,
      ease: 'power3.out'
    })
  }, [material])

  return (
    <group ref={groupRef} position={[0, -0.0018, 2]} scale={0.1}>
      <primitive object={scene} />

      {/* Bottom glow splash on floor */}
      <pointLight
        position={[0, 0.5, 4]}
        intensity={25}
        distance={10}
        decay={2}
        color="#E0521F"
      />
    </group>
  )
}

useGLTF.preload('/models/helas.glb')
