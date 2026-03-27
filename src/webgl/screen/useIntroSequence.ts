import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ShaderMaterial } from 'three'

export interface IntroState {
  phase: number
  progress: number
  glitch: number
  flash: number
  noise: number
  distortion: number
  brightness: number
  time: number
  done: boolean
}

const PHASE_DURATIONS = [
  0.0,
  0.15,
  1.2,
  2.0,
  1.5,
  0.0,
]

const PHASE_TIMES = PHASE_DURATIONS.reduce((acc, dur, i) => {
  acc[i] = dur + (acc[i - 1] || 0)
  return acc
}, [] as number[])

const TOTAL_DURATION = PHASE_TIMES[4]

function randomGlitch(): number {
  return Math.random() > 0.92 ? Math.random() * 0.8 + 0.2 : 0
}

export function useIntroSequence(shaderRef: React.RefObject<ShaderMaterial | null>) {
  const state = useRef<IntroState>({
    phase: 0,
    progress: 0,
    glitch: 0,
    flash: 0,
    noise: 0,
    distortion: 0,
    brightness: 0,
    time: 0,
    done: false,
  })

  const glitchDecay = useRef(0)
  const glitchTarget = useRef(0)
  const flashSpiked = useRef(false)

  const getPhaseFromTime = useCallback((t: number): number => {
    if (t >= PHASE_TIMES[4]) return 5
    if (t >= PHASE_TIMES[3]) return 4
    if (t >= PHASE_TIMES[2]) return 3
    if (t >= PHASE_TIMES[1]) return 2
    if (t >= PHASE_TIMES[0]) return 1
    return 0
  }, [])

  useFrame((_, delta) => {
    const s = state.current

    if (s.done) return

    s.time += delta

    const newPhase = getPhaseFromTime(s.time)

    if (newPhase !== s.phase) {
      s.phase = newPhase
    }

    s.progress = Math.min(1, s.time / TOTAL_DURATION)

    switch (s.phase) {
      case 0:
        s.brightness = 0
        s.glitch = 0
        s.flash = 0
        s.noise = 0
        s.distortion = 0
        break

      case 1:
        if (!flashSpiked.current) {
          s.flash = 1.0
          flashSpiked.current = true
        }
        s.flash *= 0.85
        s.brightness = s.flash * 3.0
        s.glitch = 0
        s.noise = 0.1
        break

      case 2:
        s.flash *= 0.9
        s.brightness = 0.3 + Math.random() * 0.4
        s.noise = 0.6 + Math.random() * 0.3
        s.distortion = 0.3 + Math.random() * 0.2
        glitchTarget.current = randomGlitch()
        glitchDecay.current = 0.95
        s.glitch = glitchTarget.current
        break

      case 3:
        glitchTarget.current = randomGlitch()
        if (glitchTarget.current > s.glitch) {
          s.glitch = glitchTarget.current
          glitchDecay.current = 0.92
        }
        s.glitch *= glitchDecay.current

        s.noise = THREE.MathUtils.lerp(s.noise, 0.3, 0.05)
        s.distortion = THREE.MathUtils.lerp(s.distortion, 0.15, 0.05)
        s.brightness = THREE.MathUtils.lerp(s.brightness, 1.0, 0.03)
        break

      case 4:
        s.glitch *= 0.9
        s.noise = THREE.MathUtils.lerp(s.noise, 0.1, 0.08)
        s.distortion = THREE.MathUtils.lerp(s.distortion, 0.02, 0.1)
        s.brightness = THREE.MathUtils.lerp(s.brightness, 1.35, 0.05)

        if (s.time >= PHASE_TIMES[4] - 0.1) {
          s.done = true
        }
        break

      case 5:
        s.glitch = 0
        s.noise = 0.05
        s.distortion = 0
        s.brightness = 1.35
        s.done = true
        break
    }

    if (!shaderRef.current) return

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
