import { Environment, useGLTF } from '@react-three/drei'

export default function HelasModel() {
  const { scene } = useGLTF('/models/helas.glb')

  return (
    <group position={[0, -0.0019, 2]} scale={0.1}>
      <primitive object={scene} />

      {/* Front glow (from top) */}
      <pointLight
        position={[4, -3, 8]}
        intensity={8}
        decay={2}
        color="#E0521F"
      />

      {/* Back rim light (middle behind model) */}
      <spotLight
        position={[-4, 3, 3]}
        intensity={3.8}
        angle={0.5} penumbra={1}
        decay={2}
        color="#66d9ff"
      />

      {/* Right side fill light (slightly lower) */}
      <spotLight
        position={[0, 3, -8]}
        intensity={1.8}
        angle={0.5} penumbra={1}
        decay={2}
        color="#EB906F"
      />

    </group>
  )
}

useGLTF.preload('/models/helas.glb')