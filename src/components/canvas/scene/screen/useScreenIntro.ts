import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ShaderMaterial } from 'three'
import { useWebGLStore } from '@/store/useWebGLStore'

export interface IntroState {
  mode: 'BOOT' | 'LANDSCAPE_ANALYSIS' | 'SUBJECT_DETECTION' | 'MEMORY_RECONSTRUCTION' | 'SYSTEM_COLLAPSE'
  progress: number
  glitch: number
  flash: number
  noise: number
  distortion: number
  brightness: number
  time: number
}

function randomGlitch(): number {
  return Math.random() > 0.92 ? Math.random() * 0.8 + 0.2 : 0
}

export function useScreenIntro(shaderRef: React.RefObject<ShaderMaterial | null>) {
  const mode = useWebGLStore((s) => s.mode)
  const phase = useWebGLStore((s) => s.phase)
  const setIntroState = useWebGLStore((s) => s.setIntroState)

  const state = useRef<IntroState>({
    mode: 'BOOT',
    progress: 0,
    glitch: 0,
    flash: 0,
    noise: 0,
    distortion: 0,
    brightness: 0,
    time: 0,
  })

  const glitchDecay = useRef(0)
  const glitchTarget = useRef(0)
  const flashSpiked = useRef(false)

  useFrame((_, delta) => {
    const s = state.current

    s.time += delta

    // React to global mode changes
    if (mode !== s.mode) {
      s.mode = mode as IntroState['mode']
    }

    // Sync intro state to store for camera/visuals
    setIntroState({
      progress: s.progress,
      glitch: s.glitch,
      flash: s.flash,
    })

    switch (s.mode) {
      case 'BOOT':
        if (!flashSpiked.current) {
          s.flash = 1.0
          flashSpiked.current = true
        }
        s.flash *= 0.01
        s.brightness = s.flash * 2.0
        s.glitch = 0
        s.noise = 0.1
        break

      case 'LANDSCAPE_ANALYSIS':
        s.flash *= 0.9
        s.brightness = 0.3 + Math.random() * 0.4
        s.noise = 0.6 + Math.random() * 0.3
        s.distortion = 0.3 + Math.random() * 0.2
        glitchTarget.current = randomGlitch()
        glitchDecay.current = 0.95
        s.glitch = glitchTarget.current
        break

      case 'SUBJECT_DETECTION':
        glitchTarget.current = randomGlitch()
        if (glitchTarget.current > s.glitch) {
          s.glitch = glitchTarget.current
          glitchDecay.current = 0.92
        }
        s.glitch *= glitchDecay.current

        s.noise = THREE.MathUtils.lerp(s.noise, 0.3, 0.25)
        s.distortion = THREE.MathUtils.lerp(s.distortion, 0.15, 0.25)
        s.brightness = THREE.MathUtils.lerp(s.brightness, 1.0, 0.3)
        break

      case 'MEMORY_RECONSTRUCTION':
        s.glitch *= 0.9
        s.noise = THREE.MathUtils.lerp(s.noise, 0.1, 0.3)
        s.distortion = THREE.MathUtils.lerp(s.distortion, 0.02, 0.4)
        s.brightness = THREE.MathUtils.lerp(s.brightness, 1.35, 0.2)
        break

      case 'SYSTEM_COLLAPSE':
        s.brightness = THREE.MathUtils.lerp(s.brightness, 0.0, 0.1)
        s.glitch = THREE.MathUtils.lerp(s.glitch, 2.0, 0.05)
        break
    }


    if (!shaderRef.current || phase === 'landing') return

    const uniforms = shaderRef.current.uniforms

    if (uniforms.uIntroProgress !== undefined) {
      uniforms.uIntroProgress.value = s.progress
    }
    if (uniforms.uGlitch !== undefined) {
      uniforms.uGlitch.value = s.glitch
    }
    if (uniforms.uFlash !== undefined) {
      uniforms.uFlash.value = s.flash
    }
    if (uniforms.uNoise !== undefined) {
      uniforms.uNoise.value = s.noise
    }
    if (uniforms.uDistortion !== undefined) {
      uniforms.uDistortion.value = s.distortion
    }
    if (uniforms.uBrightness !== undefined) {
      uniforms.uBrightness.value = s.brightness
    }
    if (uniforms.uTime !== undefined) {
      uniforms.uTime.value = s.time
    }
  })

  return state
}
