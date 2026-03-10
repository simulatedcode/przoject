'use client'

import { useRef } from "react"
import { Group } from "three"
import { useThree, useFrame } from "@react-three/fiber"

export default function CameraRig() {

    const rig = useRef<Group | null>(null)
    const { camera } = useThree()

    useFrame(() => {

        if (!rig.current) return

        camera.position.lerp(rig.current.position, 0.08)

        camera.lookAt(0, 0, 0)

    })

    return (
        <group ref={rig} position={[0, 1, 4]} />
    )
}