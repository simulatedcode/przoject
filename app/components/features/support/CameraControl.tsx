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

        // Start camera slightly rotated (hero intro position)
        controls.setPolarAngle(basePolar);
        controls.setAzimuthalAngle(baseAzimuthal);
        controls.update();

        // -----------------------
        // 1️⃣ HERO INTRO ANIMATION
        // -----------------------
        gsap.to(controls, {
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
                const progress = this.progress();

                const azimuth =
                    baseAzimuthal - 1.45 + progress * 1.5;

                controls.setAzimuthalAngle(azimuth);
                controls.update();
            }
        });

        // -----------------------
        // 2️⃣ SCROLL ROTATION
        // -----------------------
        gsap.to(controls, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
            onUpdate: function () {
                const progress = this.progress();

                const azimuth =
                    baseAzimuthal + progress * 1.2;

                controls.setAzimuthalAngle(azimuth);
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