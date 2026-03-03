"use client";

import { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraControlProps {
    setCameraData: (data: { polar: number; azimuthal: number; distance: number }) => void;
}

export function CameraControl({ setCameraData }: CameraControlProps) {
    const controlsRef = useRef<any>(null);
    const { camera } = useThree();

    // Set initial camera position based on requested default spherical coordinates
    useEffect(() => {
        // radius ~10, polar 1.68 rad, azimuth -2.28 rad
        camera.position.setFromSphericalCoords(10.2, 1.18, -2.32);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useFrame(() => {
        if (controlsRef.current) {
            setCameraData({
                polar: controlsRef.current.getPolarAngle(),
                azimuthal: controlsRef.current.getAzimuthalAngle(),
                distance: controlsRef.current.getDistance(),
            });
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.08}
            minPolarAngle={0}
            maxPolarAngle={1.66} // Increased to allow the default polar angle of 1.68
            target={[0, 0, 0]}
        />
    );
}
