import { useGLTF, useTexture } from '@react-three/drei'

interface AssetRegistry {
  models: Record<string, string>
  textures: Record<string, string>
}

export const ASSETS: AssetRegistry = {
  models: {
    hero: '/models/scene.gltf',
  },
  textures: {
    // Add textures here as needed
  }
}

export const preloadAssets = () => {
  // Preload Models
  Object.values(ASSETS.models).forEach((path) => {
    useGLTF.preload(path)
  })

  // Preload Textures
  Object.values(ASSETS.textures).forEach((path) => {
    useTexture.preload(path)
  })
}
