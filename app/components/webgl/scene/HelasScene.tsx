"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import { CinematicLights } from "../environment/CinematicLights";
import { CinematicEffects } from "../effects/CinematicEffects";
import { CameraComposer } from "../camera/CameraComposer";
import type { CameraData } from "../camera/CameraRig";
import StudioFloor from "../environment/StudioFloor";
import { HelasModel } from "../models/HelasModel";
import { div } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

export function HelasScene() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [themeColor, setThemeColor] = useState("#6A957D");
    const [cameraData, setCameraData] = useState<CameraData>({
        polar: 1.55,
        azimuthal: -1.20,
        distance: 6,
        position: { x: 0, y: 0, z: 0 },
    });

    useEffect(() => {
        const rootStyle = getComputedStyle(document.documentElement);
        const color =
            rootStyle.getPropertyValue("--background").trim() || "#6A957D";
        setThemeColor(color);
    }, []);

    return (
        <div
            ref={canvasRef}
            className="helas pointer-events-none transition-opacity duration-1000"
        >
            <Canvas
                frameloop="always"
                shadows="soft"
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }}
                camera={{ fov: 35, near: 1, far: 100 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                <color attach="background" args={[themeColor]} />
                <fog attach="fog" args={[themeColor, 12, 60]} />

                <CinematicLights />

                <Suspense fallback={null}>
                    <group name="World">
                        {/* SCULPTURE RIG */}
                        <group
                            name="SculptureRig"
                            rotation={[0, 0, 0]}
                        >
                            <HelasModel />
                        </group>

                        {/* FLOOR */}
                        <StudioFloor color={themeColor} />
                    </group>

                    <CinematicEffects />
                </Suspense>

                <CameraComposer setCameraData={setCameraData} />
            </Canvas>

            {/* Debug overlay */}
            <div className="fixed top-10 left-10 z-50 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-color-200/80 pointer-events-none">
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Polar</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.polar.toFixed(4)}{" "}
                        <span className="opacity-30">rad</span>
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Azimuth</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.azimuthal.toFixed(4)}{" "}
                        <span className="opacity-30">rad</span>
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Zoom</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.distance.toFixed(2)}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Pos X</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.position.x.toFixed(2)}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Pos Y</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.position.y.toFixed(2)}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-16 opacity-50">Pos Z</span>
                    <span className="text-white mix-blend-difference">
                        {cameraData.position.z.toFixed(2)}
                    </span>
                </div>
                <div className="mt-2 h-px w-24 bg-linear-to-r from-white/20 to-transparent" />
            </div>
        </div>
    );
}
