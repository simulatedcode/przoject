import { useGLTF } from '@react-three/drei'

export const ASSETS = {
  models: {
    hero: '/models/helas_final.gltf',
  },
}

export const preloadAssets = () => {
  useGLTF.preload(ASSETS.models.hero)
}
