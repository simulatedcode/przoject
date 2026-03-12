'use client'

import { Grid, ContactShadows } from '@react-three/drei'

export default function Ground() {

    const gridConfig = {
        cellSize: 0.25,
        cellThickness: 0.7,
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
        <group>

            {/* Grid */}
            <Grid
                args={[100, 100]}
                {...gridConfig}
                position={[0, 0, 0]}
            />

            {/* Shadow receiver slightly below */}
            <mesh
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.6} />
            </mesh>

            {/* Contact shadow lowest */}
            <ContactShadows
                position={[0, -0.019, 0]}
                opacity={0.8}
                scale={20}
                blur={2}
                far={10}
                resolution={1024}
            />

        </group>
    )
}