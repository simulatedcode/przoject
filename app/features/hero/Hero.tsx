"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, ContactShadows, Stars, Grid } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const THEME_COLOR = "#1D2A22";

function HelasModel({ isLoaded, ...props }: any) {
    const { scene } = useGLTF("/models/helas.glb");
    const texture = useTexture("/images/textur_metal.jpg");
    const groupRef = useRef<any>(null);

    useEffect(() => {
        if (texture && scene) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            scene.traverse((child: any) => {
                if (child.isMesh) {
                    // Enable both casting and receiving shadows for self-shadowing accuracy
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Maintain standard custom physical material parameters
                    child.material = new THREE.MeshPhysicalMaterial({
                        map: texture,
                        color: new THREE.Color(THEME_COLOR),
                        metalness: 1.0,
                        roughness: 0.2,
                        iridescence: 4.0,
                        iridescenceIOR: 1.5,
                        iridescenceThicknessRange: [100, 800],
                        ior: 2.5,
                        transmission: 1.0,
                        thickness: 1.0,
                        attenuationDistance: 1.0,
                        attenuationColor: new THREE.Color(THEME_COLOR),
                    });
                }
            });
        }
    }, [scene, texture]);

    // Solarpunk materialization effect
    useEffect(() => {
        if (isLoaded && groupRef.current) {
            // "The Ascension" - Fly up from below the floor
            gsap.fromTo(
                groupRef.current.position,
                { y: -4 },
                { y: 0, duration: 3, ease: "sine.out" }
            );

            // "The Materialize" - Scale up from nothing
            gsap.fromTo(
                groupRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 2.5, ease: "sine.out" }
            );
        }
    }, [isLoaded]);

    return (
        <group ref={groupRef} position={[0, -4, 0]} scale={0}>
            <primitive object={scene} {...props} />
        </group>
    );
}

// Minimalistic Studio Floor with soft contact shadows and visible grid
function StudioFloor({ isLoaded, children }: any) {
    const floorRef = useRef<any>(null);

    return (
        <group position={[0, -0.998, 0]}>
            {/* 1️⃣ Matte Floor Surface - Double Sided to prevent culling during tilt */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={floorRef} position={[0, 0, 0]}>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial
                    color={THEME_COLOR}
                    roughness={0.8}
                    metalness={0.1}
                    envMapIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* 2️⃣ Visible Grid Lines - Slightly offset to prevent Z-fighting */}
            <Grid
                position={[0, 0.01, 0]}
                args={[100, 100]}
                cellColor={THEME_COLOR}
                sectionColor={THEME_COLOR}
                fadeDistance={50}
                fadeStrength={1}
                sectionThickness={0.8}
                cellThickness={0.4}
                infiniteGrid
            />

            {/* 3️⃣ Soft Contact Shadows - Slightly above Grid */}
            <ContactShadows
                position={[0, 0.02, 0]}
                opacity={0.065}
                scale={12}
                blur={8}
                far={2}
                resolution={512}
                color={THEME_COLOR}
            />
            {children}
        </group>
    );
}

function CloudBackground({ scrollProgress }: { scrollProgress: number }) {
    const texture = useTexture("/images/cloud.png");
    const opacity = Math.min(0.6, Math.max(0, (scrollProgress - 0.8) * 2));
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            // High-depth parallax: Clouds are far away, so they move slowly
            const targetX = state.mouse.x * 4;
            const targetY = 3.2 + scrollProgress * 0.5 + state.mouse.y * 2;

            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0.08, -28]} scale={[38, 38 * (361 / 1143), 1]}>
            <planeGeometry />
            <meshBasicMaterial
                map={texture}
                color="#84A990"
                blendColor={THEME_COLOR}
                blendEquation={THREE.AddEquation}
                transparent
                opacity={opacity}
                depthWrite={false}
                fog={false}
            />
        </mesh>
    );
}

function CameraController({ orbitRef, entranceDone, scrollProgress }: { orbitRef: any, entranceDone: boolean, scrollProgress: number }) {
    const mouse = useRef(new THREE.Vector2(0, 0));
    // Ref for smoothed mouse to implement weighted inertia
    const smoothMouse = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalized coordinates (-1 to 1)
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(() => {
        if (!entranceDone || !orbitRef.current) return;

        // Update Smooth Mouse with higher responsiveness (shorter lead/lag)
        smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.current.x, 0.8);
        smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.current.y, 0.8);

        // 1. Calculate Base Angles from Scroll progress
        // Transition path: Main Sweep (Phase 1) then Transition Tilt (Phase 2 at 80%)
        const landingPolar = 1.48;    // Higher start (closer to eye level)
        const neutralPolar = 1.57;    // Frontal leveling
        const peakTiltPolar = 1.65;   // Very subtle tilt down (Axis-Y) for natural feel

        const startAzimuth = -1.5458;
        const finalAzimuth = 0.001;

        let basePolar;
        let baseAzimuth;

        // Phase 1 (0.0 to 0.8): Sweep Azimuth around and level the Polar angle
        if (scrollProgress < 0.8) {
            const p = scrollProgress / 0.8;
            // Use sin easing for more natural phase start/stop
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = landingPolar + (neutralPolar - landingPolar) * easedP;
            baseAzimuth = startAzimuth + (finalAzimuth - startAzimuth) * easedP;
        }
        // Phase 2 (0.8 to 1.0): Subtle transition tilt down
        else {
            const p = (scrollProgress - 0.8) / 0.2;
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = neutralPolar + (peakTiltPolar - neutralPolar) * easedP;
            baseAzimuth = finalAzimuth; // Keep facing front
        }

        // 2. Calculate Parallax Offsets using Smoothed Mouse
        // Angular Tilt (Subtle but weighted)
        const polarOffset = -smoothMouse.current.y * 0.06;
        const azimuthOffset = smoothMouse.current.x * 0.08;

        // 3. Positional Multi-axis Parallax (The "Natural" Key)
        // Shifting the target itself creates a deeper 3D parallax feel
        const targetX = smoothMouse.current.x * 0.4;
        const targetY = smoothMouse.current.y * 0.3;

        orbitRef.current.target.x = THREE.MathUtils.lerp(orbitRef.current.target.x, targetX, 0.04);
        orbitRef.current.target.y = THREE.MathUtils.lerp(orbitRef.current.target.y, targetY, 0.04);

        // 4. Combine Base + Offset
        let targetPolar = basePolar + polarOffset;
        let targetAzimuth = baseAzimuth + azimuthOffset;

        // 4. Safety Constraints
        targetPolar = THREE.MathUtils.clamp(targetPolar, 0.01, 2.4); // Headroom for 1.88 tilt + 0.25 parallax

        // 5. Smoothly LERP the values for high-end feel
        const currentPolar = orbitRef.current.getPolarAngle();
        const currentAzimuth = orbitRef.current.getAzimuthalAngle();

        orbitRef.current.setPolarAngle(THREE.MathUtils.lerp(currentPolar, targetPolar, 0.08));
        orbitRef.current.setAzimuthalAngle(THREE.MathUtils.lerp(currentAzimuth, targetAzimuth, 0.08));

        // Required to reflect changes
        orbitRef.current.update();
    });

    return null;
}

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
    const orbitRef = useRef<any>(null);
    const [entranceDone, setEntranceDone] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [cameraData, setCameraData] = useState({ polar: 0, azimuthal: 0, distance: 0 });

    useEffect(() => {
        if (isLoaded && orbitRef.current) {
            // First, set the camera to a "far" starting point
            orbitRef.current.minDistance = 0;
            orbitRef.current.maxDistance = 1000;

            // Initial chaotic side view
            orbitRef.current.setPolarAngle(Math.PI / 4);
            orbitRef.current.setAzimuthalAngle(Math.PI / -4);

            // Proxy object for GSAP to animate OrbitControls properties
            const controlsProxy = {
                distance: 35,
                polar: Math.PI / 4,
                azimuth: Math.PI / -4
            };

            // Cinematic Entrance Animation
            const tl = gsap.timeline({
                delay: 0.3,
                onUpdate: () => {
                    orbitRef.current.minDistance = controlsProxy.distance;
                    orbitRef.current.maxDistance = controlsProxy.distance;
                    orbitRef.current.setPolarAngle(controlsProxy.polar);
                    orbitRef.current.setAzimuthalAngle(controlsProxy.azimuth);
                    orbitRef.current.update();
                },
                onComplete: () => {
                    // Unlock distances and mark entrance as done
                    orbitRef.current.minDistance = 5;
                    orbitRef.current.maxDistance = 30;
                    setEntranceDone(true);
                }
            });

            // Fast Zoom-in (Distance settles first)
            tl.to(controlsProxy, {
                distance: 9.74,
                duration: 3.5,
                ease: "sine.out"
            }, 0);

            // Slow Sweeping Rotation (Sweep continues longer)
            tl.to(controlsProxy, {
                polar: 1.5543,
                azimuth: -1.5458,
                duration: 3,
                ease: "sine.inOut"
            }, 0);
        }
    }, [isLoaded]);

    const hasInitialized = useRef(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: "#hero-trigger",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            onUpdate: (self) => {
                setScrollProgress(self.progress);
                if (orbitRef.current && entranceDone && !hasInitialized.current) {
                    orbitRef.current.enableDamping = true;
                    orbitRef.current.update();
                    hasInitialized.current = true;
                }
            }
        });
    }, [entranceDone]);

    const handleOrbitChange = () => {
        if (orbitRef.current) {
            setCameraData({
                polar: orbitRef.current.getPolarAngle(),
                azimuthal: orbitRef.current.getAzimuthalAngle(),
                distance: orbitRef.current.getDistance()
            });
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full -z-10 pointer-events-auto">
            <Canvas shadows camera={{ position: [20, 10, 40], fov: 45 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
                <color attach="background" args={[THEME_COLOR]} />
                <fog attach="fog" args={[THEME_COLOR, 15, 60]} />

                {/* High Contrast Studio Lighting */}
                <ambientLight intensity={0.05} />

                {/* Front Shine Accent - Reduced to preserve side-light drama */}
                <pointLight
                    position={[0, 4, 15]}
                    color="#D5E2D9"
                    intensity={3}
                    distance={20}
                    decay={2}
                />

                {/* 
                  Side Directional Light for long cinematic shadows. 
                  Positioned to create the high-contrast silhouette from the screenshot.
                */}
                <directionalLight
                    position={[38, 8, 0.5]}
                    color="#84A990"
                    intensity={2.5}
                    castShadow
                    shadow-mapSize={[4096, 4096]}
                    shadow-bias={-0.0001}
                    shadow-normalBias={0.05}
                >
                    <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 0.1, 100]} />
                </directionalLight>

                {/* Fill light: Rim light to accent the right side from behind */}
                <directionalLight position={[20, 10, -10]} intensity={0.5} color="#D5E2D9" />

                <Suspense fallback={null}>
                    <Stars
                        radius={150}
                        depth={80}
                        count={5000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.1}
                    />
                    <Stars
                        radius={60}
                        depth={30}
                        count={1500}
                        factor={2}
                        saturation={0}
                        fade
                        speed={0.05}
                    />
                    <HelasModel scale={1} isLoaded={isLoaded} />


                    <StudioFloor isLoaded={isLoaded} />
                    <CloudBackground scrollProgress={scrollProgress} />
                    <CameraController orbitRef={orbitRef} entranceDone={entranceDone} scrollProgress={scrollProgress} />

                    {/* Cinematic Post-Processing Pipeline */}
                    <EffectComposer enableNormalPass multisampling={4}>
                        {/* 
                          Bloom adds the glowing sci-fi halo to purely emissive or highly reflective metal parts 
                          Threshold=1 means only the absolute purely bright pixels will glow 
                        */}
                        <Bloom
                            blendFunction={BlendFunction.ADD}
                            intensity={1.2} // Subtlety is key for premium feel
                            luminanceThreshold={0.5} // Only glow on extreme highlights
                            luminanceSmoothing={0.9}
                            mipmapBlur={true} // Expensive but creates buttery smooth optical glow instead of cheap gaussian blur
                        />
                        <Noise
                            premultiply // Apply noise before color transformation
                            opacity={0.08} // Restored to cinematic range
                        />
                    </EffectComposer>
                </Suspense>

                {/* 
                  maxPolarAngle stops user from rotating the camera beneath the ground plane
                  (Math.PI / 2 radians = 90 degrees = horizon line constraint) 
                  target focuses the camera up the Y-axis at the model's body instead of the floor.
                */}
                {/* 
                  minPolarAngle and maxPolarAngle constraints bound the programmatic scrolling.
                  target focuses the camera perfectly at [0,0,0] where the model's center sits.
                */}
                <OrbitControls
                    ref={orbitRef}
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true} // Add physics-based momentum decay to the rotation
                    dampingFactor={0.05} // Smoothly slows down the camera movement
                    minPolarAngle={0}
                    maxPolarAngle={2.4}
                    target={[0, 0, 0]}
                    onChange={handleOrbitChange}
                />
            </Canvas>

            {/* Camera Info HUD Overlay */}
            <div className="fixed bottom-10 left-10 z-50 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#84A990]/80 pointer-events-none">
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
        </div >
    );
}

useGLTF.preload("/models/helas.glb");
useTexture.preload("/images/textur_metal.jpg");
useTexture.preload("/images/cloud.png");
