'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Vector3 } from 'three'

export default function CameraRig() {

    const { camera } = useThree()

    const { x, y, z, tx, ty, tz } = useControls('Camera', {
        x: { value: 0, min: -10, max: 10, step: 0.01 },
        y: { value: 0.65, min: -5, max: 5, step: 0.01 },
        z: { value: 6.5, min: 1, max: 20, step: 0.01 },

        tx: { value: 0.1, min: -5, max: 5, step: 0.01 },
        ty: { value: 0.7, min: -5, max: 5, step: 0.01 },
        tz: { value: 0, min: -5, max: 5, step: 0.01 },
    })

    useFrame(() => {

        camera.position.set(x, y, z)
        camera.lookAt(new Vector3(tx, ty, tz))

    })

    return null
}