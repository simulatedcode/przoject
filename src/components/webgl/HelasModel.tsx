import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import HolographicMaterial from './materials/HolographicMaterial'

export default function HelasModel() {
  const meshRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/helas.glb')

  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 2]} scale={0.1}>
      <primitive object={scene}>
        <HolographicMaterial color="#f7d08a" />
      </primitive>

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
