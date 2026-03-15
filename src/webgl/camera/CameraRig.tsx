'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Vector3 } from 'three'
import { useWebGLStore } from '@/store/useWebGLStore'

export default function CameraRig() {

    const { camera } = useThree()
    const scrollProgress = useWebGLStore((state) => state.scrollProgress)

    const { x, y, z, tx, ty, tz, parallaxFactor } = useControls('Camera', {
        x: { value: 0, min: -10, max: 10, step: 0.01 },
        y: { value: 0.65, min: -5, max: 5, step: 0.01 },
        z: { value: 6.5, min: 1, max: 20, step: 0.01 },

        tx: { value: 0.1, min: -5, max: 5, step: 0.01 },
        ty: { value: 0.7, min: -5, max: 5, step: 0.01 },
        tz: { value: 0, min: -5, max: 5, step: 0.01 },

        parallaxFactor: { value: 0.35, min: 0, max: 2, step: 0.01 },
    })

    const targetPos = new Vector3()

    useFrame((state) => {
        const { mouse } = state

        // Base position
        targetPos.set(x, y, z)

        // Add subtle parallax
        targetPos.x += mouse.x * parallaxFactor
        targetPos.y += mouse.y * parallaxFactor

        // Simple scroll-driven zoom/depth
        targetPos.z -= scrollProgress * 1.5

        // Smoothly interpolate
        camera.position.lerp(targetPos, 0.05)
        camera.lookAt(new Vector3(tx, ty, tz))
    })

    return null
}