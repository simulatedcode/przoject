import { Vector3, Camera } from 'three'
import { WebGLState } from '@/store/useWebGLStore'

export class CameraController {
    private targetPos = new Vector3()

    update(
        camera: Camera,
        mouse: { x: number; y: number },
        scrollProgress: number,
        config: {
            x: number; y: number; z: number;
            tx: number; ty: number; tz: number;
            parallaxFactor: number;
        }
    ) {
        const { x, y, z, tx, ty, tz, parallaxFactor } = config

        // Base position
        this.targetPos.set(x, y, z)

        // Add subtle parallax
        this.targetPos.x += mouse.x * parallaxFactor
        this.targetPos.y += mouse.y * parallaxFactor

        // Simple scroll-driven zoom/depth
        this.targetPos.z -= scrollProgress * 1.5

        // Smoothly interpolate
        camera.position.lerp(this.targetPos, 0.05)
        camera.lookAt(new Vector3(tx, ty, tz))
    }
}
