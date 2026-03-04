"use client";

import { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CameraControlProps {
    setCameraData: (data: {
        polar: number;
        azimuthal: number;
        distance: number;
    }) => void;
}

export function CameraControl({ setCameraData }: CameraControlProps) {
    const controlsRef = useRef<any>(null);
    const { camera } = useThree();

    useEffect(() => {
        if (!controlsRef.current) return;

        const controls = controlsRef.current;

        // Base camera angles
        const basePolar = 1.45;
        const baseAzimuthal = -1.02;

        // Start camera slightly rotated (hero intro starting position)
        const startPolar = basePolar + 0.1;
        const startAzimuthal = baseAzimuthal - 0.8;

        controls.setPolarAngle(startPolar);
        controls.setAzimuthalAngle(startAzimuthal);
        controls.update();

        // -----------------------
        // 1️⃣ HERO INTRO ANIMATION
        // -----------------------
        gsap.to(controls, {
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
                const progress = this.progress();

                // Interpolate precisely from the starting orientation to the base requested coordinates
                const polar = startPolar + (basePolar - startPolar) * progress;
                const azimuth = startAzimuthal + (baseAzimuthal - startAzimuthal) * progress;

                controls.setPolarAngle(polar);
                controls.setAzimuthalAngle(azimuth);
                controls.update();
            }
        });

        // -----------------------
        // 2️⃣ SCROLL ROTATION
        // -----------------------
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: function (self) {
                const progress = self.progress;

                // Pick up exactly where the intro landed (basePolar) and gently drift
                // Restrict polar drift so it stays under maxPolarAngle (1.64)
                const scrollPolar = basePolar + progress * 3;
                const scrollAzimuth = baseAzimuthal + progress * 1.2;

                controls.setPolarAngle(scrollPolar);
                controls.setAzimuthalAngle(scrollAzimuth);
                controls.update();
            }
        });

    }, []);

    // Live debug readout
    useFrame(() => {
        if (!controlsRef.current) return;

        setCameraData({
            polar: controlsRef.current.getPolarAngle(),
            azimuthal: controlsRef.current.getAzimuthalAngle(),
            distance: controlsRef.current.getDistance(),
        });
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minPolarAngle={0}
            maxPolarAngle={1.64}
            target={[0, 0, 0]}
        />
    );
}