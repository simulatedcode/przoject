import { Environment } from '@react-three/drei'

export default function WorldLighting() {

    return (
        <>
            <ambientLight intensity={0.25} />

            <directionalLight
                castShadow
                position={[4, 3, 2]}
                intensity={2.4}
                color="#9BBEC0"
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