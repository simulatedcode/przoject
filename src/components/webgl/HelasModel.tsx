import { useGLTF } from '@react-three/drei'

export default function HelasModel() {

  const { scene } = useGLTF('/models/helas.glb')

  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
    }
  })

  return <primitive
    object={scene}
    scale={0.1}
    position={[0, 0, 0]} />

}

useGLTF.preload('/models/helas.glb')
