import { Vector3, Camera } from 'three'

export interface CameraConfig {
    x: number; y: number; z: number;
    tx: number; ty: number; tz: number;
    parallaxFactor: number;
}

export interface IntroCameraState {
    phase: number
    progress: number
    glitch: number
    done: boolean
}

export class CameraController {
    private targetPos = new Vector3()
    private shakeOffset = new Vector3()

    update(
        camera: Camera,
        mouse: { x: number; y: number },
        scrollProgress: number,
        config: CameraConfig,
        introState?: IntroCameraState
    ) {
        const { x, y, z, tx, ty, tz, parallaxFactor } = config

        this.targetPos.set(x, y, z)

        if (introState && !introState.done) {
            const pushIn = introState.progress * 2.0
            const glitchPunch = introState.glitch * (Math.random() * 0.5 + 0.5) * 0.8
            
            const microShake = introState.phase <= 3 ? 
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

        if ('aspect' in camera) {
            const aspect = (camera as any).aspect
            const isMobile = aspect < 1.0
            const baseFov = 40
            const mobileFov = 60

            const targetFov = isMobile ? mobileFov : baseFov
            if ((camera as any).fov !== undefined) {
                (camera as any).fov += (targetFov - (camera as any).fov) * 0.05
                    ; (camera as any).updateProjectionMatrix()
            }
        }
    }
}
