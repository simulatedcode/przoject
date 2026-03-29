import { Effect } from 'postprocessing'
import { Uniform, Vector2 } from 'three'

import fragmentShader from '@/shaders/screen/crt.frag'

const MODE_MAP = {
  BOOT: 0,
  ANALYSIS: 1,
  MEMORY: 2,
  COLLAPSE: 3,
}

export class CRTEffect extends Effect {
  constructor({ intensity = 0.1 } = {}) {
    super('CRTEffect', fragmentShader, {
      uniforms: new Map<string, Uniform<unknown>>([
        ['uTime', new Uniform(0)],
        ['uResolution', new Uniform(new Vector2(1, 1))],
        ['uMode', new Uniform(0)],
        ['uGlitch', new Uniform(0)],
        ['uIntensity', new Uniform(intensity)],
      ]),
    })
  }

  update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number): void {
    const timeUniform = this.uniforms.get('uTime')
    if (timeUniform) {
      timeUniform.value += deltaTime
    }
  }

  setMode(mode: keyof typeof MODE_MAP): void {
    const modeUniform = this.uniforms.get('uMode')
    if (modeUniform) {
      modeUniform.value = MODE_MAP[mode]
    }
  }

  setGlitch(glitch: number): void {
    const glitchUniform = this.uniforms.get('uGlitch')
    if (glitchUniform) {
      glitchUniform.value = glitch
    }
  }

  setResolution(width: number, height: number): void {
    const resolutionUniform = this.uniforms.get('uResolution')
    if (resolutionUniform) {
      resolutionUniform.value.set(width, height)
    }
  }

  setIntensity(intensity: number): void {
    const intensityUniform = this.uniforms.get('uIntensity')
    if (intensityUniform) {
      intensityUniform.value = intensity
    }
  }
}
