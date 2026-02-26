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
                { y: 0, duration: 3, ease: "expo.out" }
            );

            // "The Materialize" - Scale up from nothing
            gsap.fromTo(
                groupRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 2.5, ease: "power3.out" }
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
        <group position={[0, -0.993, 0]}>
            {/* 1️⃣ Matte Floor Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={floorRef}>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial
                    color={THEME_COLOR}
                    roughness={0.8}
                    metalness={0.1}
                    envMapIntensity={0.2}
                />
            </mesh>

            {/* 2️⃣ Visible Grid Lines - Subtle dark variations of theme */}
            <Grid
                position={[0, 0.005, 0]}
                args={[100, 100]}
                cellColor={THEME_COLOR}
                sectionColor={THEME_COLOR}
                fadeDistance={50}
                fadeStrength={1}
                sectionThickness={0.8}
                cellThickness={0.4}
                infiniteGrid
            />

            {/* 3️⃣ Soft Contact Shadows - Tinted with theme for better blending */}
            <ContactShadows
                position={[0, 0.01, 0]}
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

function FloatingDebris({ count = 40 }) {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -5 + Math.random() * 10;
            const yFactor = -5 + Math.random() * 10;
            const zFactor = -5 + Math.random() * 10;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.002, 0]} />
            <meshStandardMaterial color="#84A990" roughness={0.08} metalness={0.03} />
        </instancedMesh>
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

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
    const orbitRef = useRef<any>(null);
    const [entranceDone, setEntranceDone] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        // Entrance takes ~3s. We'll wait 3s before allowing scroll to take over.
        const timer = setTimeout(() => {
            setEntranceDone(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const hasInitialized = useRef(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            onUpdate: (self) => {
                setScrollProgress(self.progress);
                if (orbitRef.current && entranceDone) {
                    const minAngle = 0;
                    const maxAngle = Math.PI / 2;
                    const currentAngle = minAngle + (maxAngle - minAngle) * self.progress;

                    orbitRef.current.setPolarAngle(currentAngle);

                    if (!hasInitialized.current) {
                        orbitRef.current.enableDamping = true;
                        orbitRef.current.update();
                        hasInitialized.current = true;
                    }
                }
            }
        });
    }, [entranceDone]);

    return (
        <div className="absolute inset-0 w-full h-full -z-10 pointer-events-auto">
            <Canvas shadows camera={{ position: [0, 8, 0.01], fov: 45 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
                <color attach="background" args={[THEME_COLOR]} />
                <fog attach="fog" args={[THEME_COLOR, 15, 50]} />

                {/* High Contrast Studio Lighting */}
                <ambientLight intensity={0.05} />

                {/* Front Shine Accent - Reduced to preserve side-light drama */}
                <pointLight
                    position={[0, 4, 15]}
                    color="#D5E2D9"
                    intensity={3}
                    distance={50}
                    decay={2}
                />

                {/* 
                  Side Directional Light for long cinematic shadows pointing left.
                */}
                <directionalLight
                    position={[20, 5, -2]}
                    color="#84A990"
                    intensity={2}
                    castShadow
                    shadow-mapSize={[4096, 4096]}
                    shadow-bias={-0.0005}
                    shadow-normalBias={0.05}
                >
                    <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 100]} />
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
                    <FloatingDebris />
                    <CloudBackground scrollProgress={scrollProgress} />

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
                    maxPolarAngle={Math.PI / 2}
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div >
    );
}

useGLTF.preload("/models/helas.glb");
useTexture.preload("/images/textur_metal.jpg");
useTexture.preload("/images/cloud.png");
