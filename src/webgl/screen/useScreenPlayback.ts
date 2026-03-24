import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * useScreenPlayback
 * Manages the timing and blending of screen textures for a cinematic crossfade effect.
 */
export function useScreenPlayback(textures: THREE.Texture[], shaderRef: React.RefObject<any>) {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const duration = 16 // Seconds per image

    const index = Math.floor(t / duration) % textures.length
    const nextIndex = (index + 1) % textures.length
    const blend = (t % duration) / duration

    if (!shaderRef.current) return

    shaderRef.current.uniforms.uTextureA.value = textures[index]
    shaderRef.current.uniforms.uTextureB.value = textures[nextIndex]
    shaderRef.current.uniforms.uBlend.value = blend
    shaderRef.current.uniforms.uTime.value = t

    // Approximate brightness for dynamic lighting
    shaderRef.current.uniforms.uBrightness.value = 1.0
  })
}
