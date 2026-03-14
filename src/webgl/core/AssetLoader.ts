import { useGLTF } from '@react-three/drei'

export const ASSETS = {
  models: {
    hero: '/models/h3las.glb',
  },
}

export const preloadAssets = () => {
  useGLTF.preload(ASSETS.models.hero)
}
