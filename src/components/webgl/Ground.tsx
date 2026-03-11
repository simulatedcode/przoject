'use client'

import { Grid, ContactShadows } from '@react-three/drei'

export default function Ground() {

    const gridConfig = {
        cellSize: 0.25,
        cellThickness: 0.8,
        cellColor: '#1B2B2C',
        sectionSize: 0.5,
        sectionThickness: 0.7,
        sectionColor: '#517E81',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }

    return (
        <group position={[0, -0.18, 0]}>
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
                position={[0, -1.99, 0]}
                opacity={0.6}
                scale={40}
                blur={2}
                far={10}
                resolution={1024}
            />
        </group>
    )

}