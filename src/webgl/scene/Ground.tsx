'use client'

import { Grid } from '@react-three/drei'

export default function Ground() {

    const gridConfig = {
        cellSize: 0.25,
        cellThickness: 0.6,
        cellColor: '#2D4748',
        sectionSize: 0.5,
        sectionThickness: 0.8,
        sectionColor: '#1B2B2C',
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

            {/* Shadow receiver plane for real light shadows */}
            <mesh
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[100, 100]} />
                <shadowMaterial
                    transparent
                    opacity={0.45}
                    polygonOffsetFactor={1}
                    polygonOffsetUnits={1}
                />
            </mesh>

        </group>
    )
}
