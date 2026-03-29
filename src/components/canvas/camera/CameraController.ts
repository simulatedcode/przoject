import { Vector3, Camera, PerspectiveCamera } from 'three'
import type { Phase, IntroState, WebGLState } from '@/store/useWebGLStore'

export interface CameraConfig {
  x: number; y: number; z: number;
  tx: number; ty: number; tz: number;
  parallaxFactor: number;
}

export class CameraController {
  private targetPos = new Vector3()
  private shakeOffset = new Vector3()

  update(
    camera: Camera,
    mouse: { x: number; y: number },
    scrollProgress: number,
    config: CameraConfig,
    introState: IntroState,
    mode: WebGLState['mode'],
    phase: Phase
  ) {
    const { x, y, z, tx, ty, tz, parallaxFactor } = config

    this.targetPos.set(x, y, z)

    if (phase !== 'landing') {
      const pushIn = introState.progress * 2.0
      const glitchPunch = introState.glitch * (Math.random() * 0.5 + 0.5) * 0.8

      const isHighIntensity = mode === 'BOOT' || mode === 'LANDSCAPE_ANALYSIS'
      
      const microShake = isHighIntensity ?
        (Math.random() - 0.5) * 0.03 * (1 - introState.progress) :
        0

      this.shakeOffset.x = (Math.random() - 0.5) * introState.glitch * 0.1 + microShake
      this.shakeOffset.y = (Math.random() - 0.5) * introState.glitch * 0.08 + microShake
      this.shakeOffset.z = -pushIn - glitchPunch

      this.targetPos.add(this.shakeOffset)
    } else {
      this.shakeOffset.lerp(new Vector3(0, 0, 0), 0.1)
      this.targetPos.add(this.shakeOffset)
    }

    this.targetPos.x += mouse.x * parallaxFactor
    this.targetPos.y += mouse.y * parallaxFactor

    this.targetPos.z -= scrollProgress * 1.5

    camera.position.lerp(this.targetPos, 0.05)
    camera.lookAt(new Vector3(tx, ty, tz))

    if ('aspect' in camera && 'fov' in camera) {
      const perspCam = camera as PerspectiveCamera
      const aspect = perspCam.aspect
      const isMobile = aspect < 1.0
      const baseFov = 35
      const mobileFov = 60

      const targetFov = isMobile ? mobileFov : baseFov
      if (perspCam.fov !== undefined) {
        perspCam.fov += (targetFov - perspCam.fov) * 0.05
        perspCam.updateProjectionMatrix()
      }
    }
  }
}
