"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import * as THREE from "three";

function Model() {
    const { scene } = useGLTF("/models/helas.glb");
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame((state) => {
        if (!modelRef.current) return;

        // Target rotation based on mouse position (-1 to 1)
        const targetX = state.mouse.y * 0.08; // Tilt up/down
        const targetY = state.mouse.x * 0.08; // Tilt left/right

        // Smoothly interpolate current rotation to target
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
            modelRef.current.rotation.x,
            targetX,
            0.1
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
            modelRef.current.rotation.y,
            targetY,
            0.1
        );
    });

    return <primitive ref={modelRef} object={scene} />;
}

function Ground() {
    const groundRef = useRef<THREE.Mesh>(null);

    return (
        <mesh
            ref={groundRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.01, 0]}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
                color="#658567"
                roughness={0.9}
                metalness={0.1}
            />
        </mesh>
    );
}

export function Helas() {
    const canvasRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={canvasRef} className="helas pointer-events-none transition-opacity duration-1000">
            <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
                <ambientLight intensity={0.8} />

                <directionalLight
                    position={[10, 5, 10]}
                    intensity={1.5}
                    castShadow
                />
                <ContactShadows
                    position={[0, -1, 0]}
                    opacity={0.05}
                    scale={4}
                    blur={2}
                />

                <Suspense fallback={null}>
                    <Center>
                        <Model />
                    </Center>

                    <Ground />

                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/helas.glb");
