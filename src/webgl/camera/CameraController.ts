import { Vector3, Camera } from 'three'

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

        // Adaptive FOV for mobile (portrait)
        if ('aspect' in camera) {
            const aspect = (camera as any).aspect
            const isMobile = aspect < 1.0
            const baseFov = 40
            const mobileFov = 60

            // Smoothly interpolate FOV if it was a perspective camera
            const targetFov = isMobile ? mobileFov : baseFov
            if ((camera as any).fov !== undefined) {
                (camera as any).fov += (targetFov - (camera as any).fov) * 0.05
                    ; (camera as any).updateProjectionMatrix()
            }
        }
    }
}
