"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import * as THREE from "three";

function Model() {
    const { scene } = useGLTF("/models/helas.glb");
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (modelRef.current) {
            // Subtle float
            modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return <primitive ref={modelRef} object={scene} />;
}

export function Helas() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(canvasRef.current, {
                scrollTrigger: {
                    trigger: "section", // Target the Hero section
                    start: "top top",
                    end: "+=100dvh", // Finish slide after 1 viewport of scroll
                    scrub: true,
                },
                scale: 1,
                opacity: 0.8,
                y: -100,
            });
        }, canvasRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={canvasRef} className="helas pointer-events-none transition-opacity duration-1000">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#658567" />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Suspense fallback={null}>
                    <Center>
                        <Model />
                    </Center>
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.03}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/helas.glb");
