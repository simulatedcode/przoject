'use client'

import { Environment } from '@react-three/drei'

export default function LightingSystem() {
    return (
        <>
            {/* Ambient base */}
            <ambientLight intensity={0.2} />

            {/* Directional sunlight (global shadows) */}
            <directionalLight
                castShadow
                position={[-6, 0, 0]}
                intensity={6.2}
                color="#FF8C37"
                shadow-darkness={8}

                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}

                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-near={1}
                shadow-camera-far={20}
                shadow-radius={2}
                shadow-bias={-0.00025}
            />

            {/* HDR reflections */}
            <Environment
                preset="city"
                environmentIntensity={0.08}
            />

            {/* KEY LIGHT (primary sculpting light) */}
            <spotLight
                position={[-3.5, 3, 2]}
                intensity={4.8}
                angle={0.42}
                penumbra={0.9}
                decay={2}
                color="#FFAA5E"

                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={4}
                shadow-bias={-0.00025}
            />

            {/* FRONT FILL (soft texture visibility) */}
            <pointLight
                position={[-4, 2, 3]}
                intensity={0.2}
                distance={8}
                decay={2}
                color="#43C6C9"
            />

            {/* RIM LIGHT (silhouette highlight) */}
            <spotLight
                position={[-2.4, 2.8, -2.6]}
                intensity={8.5}
                angle={0.55}
                penumbra={1}
                decay={2}
                color="#00EEFF"
            />

            {/* FLOOR BOUNCE LIGHT */}
            <pointLight
                position={[0, -0.8, 0.7]}
                intensity={2.2}
                distance={3}
                decay={2}
                color="#FF4D00"
            />
        </>
    )
}