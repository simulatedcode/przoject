import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'
import { ShaderMaterial } from 'three'

export function useScreenPlayback(
  textures: THREE.Texture[],
  shaderRef: React.RefObject<ShaderMaterial | null>,
  enabled: boolean = true
) {
  const timer = useMemo(() => new THREE.Timer(), [])

  const system = {
    duration: 8,
    transition: 1.2,
    strength: 1.2,
  }

  useFrame(() => {
    if (!enabled) return

    timer.update()
    const t = timer.getElapsed()

    const index = Math.floor(t / system.duration) % textures.length
    const nextIndex = (index + 1) % textures.length

    const cycleTime = t % system.duration
    const progress = cycleTime / system.duration

    //
    // 🎬 FAST, CLEAN TRANSITION
    //
    const blend = THREE.MathUtils.smoothstep(progress, 0.0, 1.0)

    //
    // ⚡ HOLOGRAM GLITCH (SHARP SIGNAL)
    //
    let glitchIntensity = 0

    if (cycleTime < system.transition) {
      const p = cycleTime / system.transition

      const envelope = Math.pow(1.0 - p, 3.0)

      const pulse =
        (Math.sin(t * 80.0) > 0.7 ? 1 : 0) +
        (Math.sin(t * 120.0) > 0.8 ? 1 : 0)

      const jitter = Math.sin(t * 200.0) * 0.2

      const signal = pulse * 0.8 + jitter

      glitchIntensity = envelope * signal * system.strength
    }
    //
    // 🔥 OPTIONAL: add tiny residual flicker (feels alive)
    //
    glitchIntensity += Math.sin(t * 30.0) * 0.03

    if (!shaderRef.current) return

    const uniforms = shaderRef.current.uniforms

    uniforms.uTextureA.value = textures[index]
    uniforms.uTextureB.value = textures[nextIndex]

    uniforms.uBlend.value = blend
    uniforms.uTime.value = t

    // ⚡ glitch system
    uniforms.uGlitch.value = glitchIntensity
    uniforms.uSignal.value = glitchIntensity

    if (uniforms.uGlitchStrength)
      uniforms.uGlitchStrength.value = 1.0

    if (uniforms.uGlitchFrequency)
      uniforms.uGlitchFrequency.value = 80.0

    // 🔆 hologram looks better slightly brighter
    uniforms.uBrightness.value = 1.4
  })
}
