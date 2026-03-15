'use client'


export default function LightingSystem() {
    return (
        <>
            <ambientLight intensity={0.45} color="#E3694A" />

            <directionalLight
                castShadow
                position={[-10, 2, 0]}
                intensity={6.0}
                color="#9AC0C1"

                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}

                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-near={1}
                shadow-camera-far={20}

                shadow-radius={4}
                shadow-bias={-0.0003}
            />

            <spotLight
                position={[-6, 2, 2]}
                intensity={5.2}
                angle={0.42}
                penumbra={1}
                decay={2}
                color="#DD4822"

                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}

                shadow-radius={6}
                shadow-bias={-0.0002}
            />

            {/* RIM LIGHT (edge highlight from back left) */}
            <spotLight
                position={[6, 3, -3]}
                intensity={6}
                angle={0.6}
                penumbra={1}
                decay={2}
                color="#00EEFF"
            />

            {/* FLOOR BOUNCE (warm ground reflection) */}
            <pointLight
                position={[0, -0.7, 0.8]}
                intensity={1.6}
                distance={3}
                decay={2}
                color="#772C1A"
            />
        </>
    )
}