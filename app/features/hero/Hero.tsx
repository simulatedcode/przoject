"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, ContactShadows, Stars, Grid, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
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
    const groupRef = useRef<THREE.Group>(null!);
    const materialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);

    // Apply hologram starting material to all meshes
    useEffect(() => {
        if (texture && scene) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            materialsRef.current = [];

            scene.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Start as hologram: transparent, glowing, no texture map yet
                    const mat = new THREE.MeshPhysicalMaterial({
                        color: new THREE.Color("#84A990"),
                        emissive: new THREE.Color("#84A990"),
                        emissiveIntensity: 2.0,
                        metalness: 0.0,
                        roughness: 1.0,
                        transmission: 1.0,
                        thickness: 0.5,
                        transparent: true,
                        opacity: 0.5,
                        wireframe: false,
                        ior: 1.5,
                        iridescence: 0.0,
                        iridescenceIOR: 1.5,
                        iridescenceThicknessRange: [100, 800],
                        attenuationDistance: 1.0,
                        attenuationColor: new THREE.Color(THEME_COLOR),
                    });

                    child.material = mat;
                    materialsRef.current.push(mat);
                }
            });
        }
    }, [scene, texture]);

    // On load: rise + scale + hologram → solid transition
    useEffect(() => {
        if (isLoaded && groupRef.current && materialsRef.current.length > 0) {
            // Rise and scale in — delayed so camera arrives first
            gsap.fromTo(
                groupRef.current.position,
                { y: -1.5 },
                { y: 0, duration: 3.5, delay: 1.0, ease: "power2.out" }
            );
            gsap.fromTo(
                groupRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 3.5, delay: 1.0, ease: "expo.out" }
            );

            // Hologram → solid: tween material properties via proxy
            const proxy = {
                emissiveIntensity: 2.0,
                metalness: 0.0,
                roughness: 1.0,
                transmission: 1.0,
                opacity: 0.05,
                iridescence: 0.0,
            };

            gsap.to(proxy, {
                emissiveIntensity: 0.0,
                metalness: 1.0,
                roughness: 0.2,
                transmission: 0.9,
                opacity: 1.0,
                iridescence: 4.0,
                duration: 4.0,
                delay: 1.5,          // camera arrives → beat of silence → model solidifies
                ease: "power1.inOut",
                onUpdate: () => {
                    materialsRef.current.forEach((mat) => {
                        mat.emissiveIntensity = proxy.emissiveIntensity;
                        mat.metalness = proxy.metalness;
                        mat.roughness = proxy.roughness;
                        mat.transmission = proxy.transmission;
                        mat.opacity = proxy.opacity;
                        mat.iridescence = proxy.iridescence;
                        // Swap in texture and final color once mostly solid
                        if (proxy.opacity > 0.85 && mat.map !== texture) {
                            mat.map = texture;
                            mat.color.set(THEME_COLOR);
                            mat.emissive.set("#000000");
                            mat.ior = 2.5;
                            mat.needsUpdate = true;
                        }
                    });
                },
            });
        }
    }, [isLoaded, texture]);

    return (
        <group ref={groupRef} position={[0, -4, 0]} scale={0}>
            <primitive object={scene} {...props} />
        </group>
    );
}


function StudioFloor({ isLoaded, children }: any) {
    return (
        <group position={[0, -0.998, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial
                    color={THEME_COLOR}
                    roughness={0.8}
                    metalness={0.1}
                    envMapIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
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
            <ContactShadows
                position={[0, 0, 0]}
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
    const opacity = Math.min(0.6, Math.max(0, (scrollProgress - 0.35) * 3));
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            const targetX = state.mouse.x * 4;
            const targetY = 3.2 + scrollProgress * 0.5 + state.mouse.y * 2;
            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.14);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.14);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0.08, -28]} scale={[38, 38 * (361 / 1143), 1]}>
            <planeGeometry />
            <meshBasicMaterial
                map={texture}
                color="#84A990"
                transparent
                opacity={opacity}
                depthWrite={false}
                fog={true}
            />
        </mesh>
    );
}

function CinematicLights() {
    return (
        <>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 4, 15]} color="#D5E2D9" intensity={3} distance={20} decay={2} />
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
            <directionalLight position={[20, 10, -10]} intensity={0.5} color="#D5E2D9" />
        </>
    );
}

function CinematicEffects() {
    return (
        <EffectComposer enableNormalPass multisampling={4}>
            <Bloom blendFunction={BlendFunction.ADD} intensity={1.2} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur={true} />
            <Noise premultiply opacity={0.5 * 2} />
        </EffectComposer>
    );
}


/**
 * Manages the camera's entrance animation path
 */
function useHeroEntrance(isLoaded: boolean, orbitRef: any) {
    const [entranceDone, setEntranceDone] = useState(false);
    const { active, progress } = useProgress();
    const assetsReady = !active && progress === 100;

    const playEntrance = (orbit: any) => {
        orbit.minDistance = 0;
        orbit.maxDistance = 1000;
        orbit.setPolarAngle(Math.PI / 6);
        orbit.setAzimuthalAngle(Math.PI / -4);

        const controlsProxy = {
            distance: 75,
            polar: Math.PI / 6,
            azimuth: Math.PI / -4
        };

        const tl = gsap.timeline({
            delay: 1.0,
            onUpdate: () => {
                if (!orbit) return;
                orbit.minDistance = controlsProxy.distance;
                orbit.maxDistance = controlsProxy.distance;
                orbit.setPolarAngle(controlsProxy.polar);
                orbit.setAzimuthalAngle(controlsProxy.azimuth);
                orbit.update();
            },
            onComplete: () => {
                if (!orbit) return;
                orbit.minDistance = 8;
                orbit.maxDistance = 32;
                setEntranceDone(true);
            }
        });

        // Beat 1 (0s):     silence — nothing moves yet
        // Beat 2 (1.0s):   slow zoom + orbit to landing position
        // Beat 3 (1.0s+):  model rises and materializes from hologram
        tl.to(controlsProxy, { distance: 9.74, duration: 3.5, ease: "power2.out" }, 0);
        tl.to(controlsProxy, { polar: 1.5643, azimuth: -1.5558, duration: 3.5, ease: "power1.inOut" }, 0);
    };

    useEffect(() => {
        if (isLoaded && assetsReady && orbitRef.current) {
            playEntrance(orbitRef.current);
        }
    }, [isLoaded, assetsReady, orbitRef]);

    // Press R to replay entrance for preview
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "r" || e.key === "R") {
                if (orbitRef.current) playEntrance(orbitRef.current);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [orbitRef]);

    return { entranceDone, assetsReady };
}

function CameraController({ orbitRef, entranceDone, scrollProgress, isInteracting }: { orbitRef: any, entranceDone: boolean, scrollProgress: number, isInteracting: boolean }) {
    const accRef = useRef(0);
    const cursorPolarRef = useRef(0);
    const cursorAzimuthRef = useRef(0);
    // Global mouse — bypasses z-index layering that blocks state.mouse
    const mouseNDC = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            // Normalize to -1..1 range (x: left→right, y: top→bottom inverted)
            mouseNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseNDC.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    useFrame((_, delta) => {
        accRef.current += delta;
        if (accRef.current < 1 / 30) return;
        accRef.current %= 1 / 30;

        if (!entranceDone || !orbitRef.current || isInteracting) return;

        const landingPolar = 1.468;
        const neutralPolar = 1.576;
        const peakTiltPolar = 1.62;
        const startAzimuth = -1.1458;
        const finalAzimuth = 0.001;

        let basePolar;
        let baseAzimuth;

        if (scrollProgress < 0.2) {
            const p = Math.min(1, scrollProgress / 0.2);
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = landingPolar + (neutralPolar - landingPolar) * easedP;
            baseAzimuth = startAzimuth + (finalAzimuth - startAzimuth) * easedP;
        } else {
            const p = Math.min(1, (scrollProgress - 0.2) / 0.4);
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = neutralPolar + (peakTiltPolar - neutralPolar) * easedP;
            baseAzimuth = finalAzimuth;
        }

        const POLAR_RANGE = 0.052;
        const AZIMUTH_RANGE = 0.06;
        const CURSOR_SMOOTH = 0.1;

        const targetCursorPolar = -mouseNDC.current.y * POLAR_RANGE;
        const targetCursorAzimuth = -mouseNDC.current.x * AZIMUTH_RANGE;

        cursorPolarRef.current = THREE.MathUtils.lerp(cursorPolarRef.current, targetCursorPolar, CURSOR_SMOOTH);
        cursorAzimuthRef.current = THREE.MathUtils.lerp(cursorAzimuthRef.current, targetCursorAzimuth, CURSOR_SMOOTH);

        orbitRef.current.target.x = THREE.MathUtils.lerp(orbitRef.current.target.x, 0, 0.12);
        orbitRef.current.target.y = THREE.MathUtils.lerp(orbitRef.current.target.y, 0, 0.12);

        const targetPolar = THREE.MathUtils.clamp(basePolar + cursorPolarRef.current, 0.01, 2);
        const targetAzimuth = baseAzimuth + cursorAzimuthRef.current;

        orbitRef.current.setPolarAngle(targetPolar);
        orbitRef.current.setAzimuthalAngle(targetAzimuth);

        orbitRef.current.update();
    });

    return null;
}


export default function Hero({ isLoaded }: { isLoaded: boolean }) {
    const orbitRef = useRef<any>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [cameraData, setCameraData] = useState({ polar: 0, azimuthal: 0, distance: 0 });
    const [isInteracting, setIsInteracting] = useState(false);
    const hasInitialized = useRef(false);

    const { entranceDone, assetsReady } = useHeroEntrance(isLoaded, orbitRef);


    useGSAP(() => {
        // Span hero-trigger + pin-spacer so scrollProgress stays alive
        // during the physical slide, camera tilt continues to progress 1.0
        ScrollTrigger.create({
            trigger: "#hero-trigger",
            start: "top top",
            endTrigger: "#pin-spacer",
            end: "bottom top",
            scrub: true,
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
            <Canvas shadows camera={{ position: [20, 10, 40], fov: 35 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
                <color attach="background" args={[THEME_COLOR]} />
                <fog attach="fog" args={[THEME_COLOR, 15, 60]} />

                <CinematicLights />

                <Suspense fallback={null}>
                    <Stars radius={150} depth={80} count={5000} factor={4} saturation={0} fade speed={0.1} />
                    <Stars radius={60} depth={30} count={1500} factor={2} saturation={0} fade speed={0.05} />
                    <HelasModel scale={1} isLoaded={isLoaded} />
                    <StudioFloor isLoaded={isLoaded} />
                    <CloudBackground scrollProgress={scrollProgress} />
                    <CameraController orbitRef={orbitRef} entranceDone={entranceDone} scrollProgress={scrollProgress} isInteracting={isInteracting} />
                    <CinematicEffects />
                </Suspense>
                <OrbitControls
                    ref={orbitRef}
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.08}
                    minPolarAngle={0}
                    maxPolarAngle={2}
                    target={[0, 0, 0]}
                    onChange={handleOrbitChange}
                    onStart={() => setIsInteracting(true)}
                    onEnd={() => setIsInteracting(false)}
                />
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
useTexture.preload("/images/cloud.png");
