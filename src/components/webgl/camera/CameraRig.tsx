'use client'

import { useRef } from "react"
import { Group, Vector3 } from "three"
import { useThree, useFrame } from "@react-three/fiber"

export default function CameraRig() {

    const rig = useRef<Group>(null)
    const { camera } = useThree()
    const target = useRef(new Vector3(0.1, 0.7, 0))

    useFrame(() => {

        if (!rig.current) return

        camera.position.lerp(rig.current.position, 0.05)

        camera.lookAt(target.current)

    })

    return (
        <group ref={rig} position={[0, 0.65, 6.5]} />
    )
}