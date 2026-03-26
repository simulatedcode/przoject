import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'

/**
 * useScreenPlayback
 * Manages the timing and blending of screen textures with random glitch during transitions.
 */
export function useScreenPlayback(textures: THREE.Texture[], shaderRef: React.RefObject<any>) {
  const glitchDuration = 0.5 // seconds of glitch per transition
  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    const t = timer.getElapsed()
    const duration = 24 // Seconds per image

    const index = Math.floor(t / duration) % textures.length
    const nextIndex = (index + 1) % textures.length
    const blend = (t % duration) / duration

    // Check if we're in transition zone (start of new cycle)
    const cycleTime = t % duration
    const inGlitchZone = cycleTime < glitchDuration

    // Random glitch intensity based on transition timing
    let glitchIntensity = 0
    if (inGlitchZone) {
      // More intense at the very start, fades out
      const glitchFade = 0.5 - (cycleTime / glitchDuration)
      // Random glitch spikes
      glitchIntensity = glitchFade * glitchFade * (Math.random() > 0.7 ? 0.8 : 0.3)
    }

    if (!shaderRef.current) return

    shaderRef.current.uniforms.uTextureA.value = textures[index]
    shaderRef.current.uniforms.uTextureB.value = textures[nextIndex]
    shaderRef.current.uniforms.uBlend.value = blend
    shaderRef.current.uniforms.uTime.value = t
    shaderRef.current.uniforms.uGlitch.value = glitchIntensity

    shaderRef.current.uniforms.uBrightness.value = 0.8
  })
}
