"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useTexture, Plane } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import * as THREE from "three";

import { CinematicLights } from "./support/CinematicLights";
import { CinematicEffects } from "./support/CinematicEffects";
import { CameraControl } from "./support/CameraControl";
import StudioFloor from "./support/StudioFloor";

function Model({ isLoaded, ...props }: any) {
    const { scene } = useGLTF("/models/helas.glb");
    const texture = useTexture("/images/textur_metal.jpg");

    useEffect(() => {
        if (!texture || !scene) return;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Apply immediately solid material
        scene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                child.material = new THREE.MeshPhysicalMaterial({
                    map: texture,
                    color: new THREE.Color("#ffffff"),
                    metalness: 0.8,
                    roughness: 0.3,
                    iridescence: 4.8,
                    iridescenceIOR: 2.3,
                    iridescenceThicknessRange: [100, 400],
                    transmission: 1,
                    thickness: 1,
                    ior: 2.5,
                    sheen: 1,
                    sheenRoughness: 0.5,
                    clearcoat: 0.5,
                    clearcoatRoughness: 0.2,
                });
            }
        });

    }, [scene, texture]);

    return <primitive object={scene} {...props} />;
}

function TiltGroup({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        const group = groupRef.current;
        if (!group) return;

        group.rotation.set(0.08, 0.08, 0.0);

        const ctx = gsap.context(() => {
            gsap.to(group.rotation, {
                y: 0.9,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return <group ref={groupRef}>{children}</group>;
}



export function Helas() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [themeColor, setThemeColor] = useState("#9FBCAA");
    const [cameraData, setCameraData] = useState({ polar: 1.45 + 0.1, azimuthal: -1.02 + 0.1, distance: 10.2 });

    useEffect(() => {
        const rootStyle = getComputedStyle(document.documentElement);
        const color = rootStyle.getPropertyValue('--background').trim() || "#9FBCAA";
        setThemeColor(color);
    }, []);

    return (
        <div ref={canvasRef} className="helas pointer-events-none transition-opacity duration-1000">
            <Canvas shadows camera={{ position: [0, 2, 10], fov: 35 }}>
                <color attach="background" args={[themeColor]} />
                <fog attach="fog" args={[themeColor, 15, 60]} />

                <CinematicLights />

                <Suspense fallback={null}>
                    <TiltGroup>
                        <Model />
                        <StudioFloor color={themeColor} />
                    </TiltGroup>

                    <CinematicEffects />
                </Suspense>

                <CameraControl setCameraData={setCameraData} />
            </Canvas>
            <div className="fixed top-10 left-10 z-50 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#84A990]/80 pointer-events-none">
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Polar</span>
                    <span className="text-white mix-blend-difference">{cameraData.polar.toFixed(4)} <span className="opacity-30">rad</span></span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Azimuth</span>
                    <span className="text-white mix-blend-difference">{cameraData.azimuthal.toFixed(4)} <span className="opacity-30">rad</span></span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Zoom</span>
                    <span className="text-white mix-blend-difference">{cameraData.distance.toFixed(2)}</span>
                </div>
                <div className="mt-2 h-px w-24 bg-linear-to-r from-white/20 to-transparent" />
            </div>
        </div>
    );
}

useGLTF.preload("/models/helas.glb");
useTexture.preload("/images/textur_metal.jpg");
