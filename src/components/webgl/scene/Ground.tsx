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
        <group position={[0, -0.01, 0]}>
            <Grid
                args={[100, 100]}
                {...gridConfig}
                rotation={[0, 0, 0]}
            />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.6} />
            </mesh>
            {/* Light absorption layer */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.019, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="#070a0b"
                    roughness={0.95}
                    metalness={0.01}
                    transparent
                    opacity={0.15}
                />
            </mesh>
            <ContactShadows
                position={[0, -0.1, 0]}
                opacity={1}
                scale={20}
                blur={2}
                far={10}
                resolution={1024}
            />
        </group>
    )

}