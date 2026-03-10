'use client'

import { Grid, ContactShadows } from '@react-three/drei'

export default function Ground() {

    const gridConfig = {
        cellSize: 0.1,
        cellThickness: 0.8,
        cellColor: '#1B2B2C',
        sectionSize: 0.5,
        sectionThickness: 0.7,
        sectionColor: '#517E81',
        fadeDistance: 30,
        fadeStrength: 1.2,
        followCamera: false,
        infiniteGrid: true
    }

    return (
        <group position={[0, -0.01, 0]}>
            <Grid
                args={[100, 100]}
                {...gridConfig}
                rotation={[0, 0, 0]}
            />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.4} />
            </mesh>
            <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.65}
                scale={10}
                blur={2.5}
                far={1}
                color="#000000"
            />
        </group>
    )

}