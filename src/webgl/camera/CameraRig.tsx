'use client'

import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useWebGLStore } from '@/store/useWebGLStore'
import { CameraController } from './CameraController'

export default function CameraRig() {

    const { camera } = useThree()
    const scrollProgress = useWebGLStore((state: any) => state.scrollProgress)
    const controller = useMemo(() => new CameraController(), [])

    const config = useControls('Camera', {
        x: { value: 0, min: -10, max: 10, step: 0.01 },
        y: { value: 0.65, min: -5, max: 5, step: 0.01 },
        z: { value: 3, min: 1, max: 20, step: 0.01 },

        tx: { value: 0.1, min: -5, max: 5, step: 0.01 },
        ty: { value: 0.65, min: -5, max: 5, step: 0.01 },
        tz: { value: 0, min: -5, max: 5, step: 0.01 },

        parallaxFactor: { value: 0.35, min: 0, max: 2, step: 0.01 },
    })

    useFrame((state) => {
        controller.update(camera, state.mouse, scrollProgress, config)
    })

    return null
}