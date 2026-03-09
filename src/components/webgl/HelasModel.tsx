import { useGLTF } from '@react-three/drei'

export default function HelasModel() {

  const { scene } = useGLTF('/models/helas.glb')

  return <primitive
    object={scene}
    scale={1}
    position={[0, 0, 0]} />

}

useGLTF.preload('/models/helas.glb')
