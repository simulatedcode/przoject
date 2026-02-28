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

    useEffect(() => {
        if (texture && scene) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            scene.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
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

    useEffect(() => {
        if (isLoaded && groupRef.current) {
            gsap.fromTo(
                groupRef.current.position,
                { y: -4 },
                { y: 0, duration: 3, ease: "sine.out" }
            );
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
                transparent
                opacity={opacity}
                depthWrite={false}
                fog={false}
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
            <Noise premultiply opacity={0.08} />
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

    useEffect(() => {
        if (isLoaded && assetsReady && orbitRef.current) {
            orbitRef.current.minDistance = 0;
            orbitRef.current.maxDistance = 1000;
            orbitRef.current.setPolarAngle(Math.PI / 4);
            orbitRef.current.setAzimuthalAngle(Math.PI / -4);

            const controlsProxy = {
                distance: 35,
                polar: Math.PI / 4,
                azimuth: Math.PI / -4
            };

            const tl = gsap.timeline({
                delay: 0.3,
                onUpdate: () => {
                    if (!orbitRef.current) return;
                    orbitRef.current.minDistance = controlsProxy.distance;
                    orbitRef.current.maxDistance = controlsProxy.distance;
                    orbitRef.current.setPolarAngle(controlsProxy.polar);
                    orbitRef.current.setAzimuthalAngle(controlsProxy.azimuth);
                    orbitRef.current.update();
                },
                onComplete: () => {
                    if (!orbitRef.current) return;
                    orbitRef.current.minDistance = 5;
                    orbitRef.current.maxDistance = 30;
                    setEntranceDone(true);
                }
            });

            tl.to(controlsProxy, { distance: 9.74, duration: 3.5, ease: "sine.out" }, 0);
            tl.to(controlsProxy, { polar: 1.5543, azimuth: -1.5458, duration: 3, ease: "sine.inOut" }, 0);
        }
    }, [isLoaded, assetsReady, orbitRef]);

    return { entranceDone, assetsReady };
}

function CameraController({ orbitRef, entranceDone, scrollProgress, isInteracting }: { orbitRef: any, entranceDone: boolean, scrollProgress: number, isInteracting: boolean }) {
    useFrame(() => {
        if (!entranceDone || !orbitRef.current || isInteracting) return;


        const landingPolar = 1.48;
        const neutralPolar = 1.57;
        const peakTiltPolar = 1.65;
        const startAzimuth = -1.5458;
        const finalAzimuth = 0.001;

        let basePolar;
        let baseAzimuth;

        if (scrollProgress < 0.8) {
            const p = scrollProgress / 0.8;
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = landingPolar + (neutralPolar - landingPolar) * easedP;
            baseAzimuth = startAzimuth + (finalAzimuth - startAzimuth) * easedP;
        } else {
            const p = (scrollProgress - 0.8) / 0.2;
            const easedP = (1 - Math.cos(p * Math.PI)) / 2;
            basePolar = neutralPolar + (peakTiltPolar - neutralPolar) * easedP;
            baseAzimuth = finalAzimuth;
        }

        orbitRef.current.target.x = THREE.MathUtils.lerp(orbitRef.current.target.x, 0, 0.12);
        orbitRef.current.target.y = THREE.MathUtils.lerp(orbitRef.current.target.y, 0, 0.12);

        let targetPolar = basePolar;
        let targetAzimuth = baseAzimuth;

        targetPolar = THREE.MathUtils.clamp(targetPolar, 0.01, 2.4);

        const currentPolar = orbitRef.current.getPolarAngle();
        const currentAzimuth = orbitRef.current.getAzimuthalAngle();

        orbitRef.current.setPolarAngle(THREE.MathUtils.lerp(currentPolar, targetPolar, 0.08));
        orbitRef.current.setAzimuthalAngle(THREE.MathUtils.lerp(currentAzimuth, targetAzimuth, 0.08));

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
                    dampingFactor={0.05}
                    minPolarAngle={0}
                    maxPolarAngle={2.4}
                    target={[0, 0, 0]}
                    onChange={handleOrbitChange}
                    onStart={() => setIsInteracting(true)}
                    onEnd={() => setIsInteracting(false)}
                />
            </Canvas>
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
        </div>
    );
}

useGLTF.preload("/models/helas.glb");
useTexture.preload("/images/textur_metal.jpg");
useTexture.preload("/images/cloud.png");
