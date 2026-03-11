import { Environment } from '@react-three/drei'

export default function WorldLighting() {

    return (
        <>
            <ambientLight intensity={0.25} />

            <directionalLight
                castShadow
                position={[4, 6, 5]}
                intensity={0.8}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <Environment
                preset="night"
                environmentIntensity={0.35}
            />
        </>
    )
}