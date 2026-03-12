import { Environment } from '@react-three/drei'

export default function WorldLighting() {

    return (
        <>
            {/* soft ambient base */}
            <ambientLight intensity={0.35} />

            <directionalLight
                castShadow
                position={[3, 4, 2]}
                intensity={0.6}
                color="#95C3C6"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0002}
            />

            {/* HDR reflections */}
            <Environment
                preset="city"
                environmentIntensity={0.04}
            />

            {/* KEY LIGHT */}
            <spotLight
                castShadow
                position={[3.5, 3, 2]}
                intensity={2}
                angle={0.42}
                penumbra={0.8}
                decay={2}
                color="#95C3C6"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />

            {/* FRONT FILL LIGHT */}
            <pointLight
                position={[0, 1.8, 3]}
                intensity={0.7}
                distance={8}
                decay={2}
                color="#7FD6E5"
            />

            {/* RIM LIGHT */}
            <spotLight
                position={[-2.4, 1.8, -2.6]}
                intensity={0.6}
                angle={0.55}
                penumbra={1}
                decay={2}
                color="#D35E3A"
            />

            {/* FLOOR BOUNCE */}
            <pointLight
                position={[0, -0.8, 0.7]}
                intensity={0.18}
                distance={3}
                decay={2}
                color="#AA4527"
            />

        </>
    )
}