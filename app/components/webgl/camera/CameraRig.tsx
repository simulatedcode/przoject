"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { sphericalToCartesian } from "@/app/lib/math/sphericalToCartesian";
import { CameraState } from "./CameraState";

export interface CameraData {
    polar: number;
    azimuthal: number;
    distance: number;
    position: { x: number; y: number; z: number };
}

interface CameraRigProps {
    setCameraData: (data: CameraData) => void;
}

/**
 * CameraRig takes the calculated physical properties from `CameraState`
 * and directly applies them to the Three.js camera.
 */
export function CameraRig({ setCameraData }: CameraRigProps) {
    const { camera } = useThree();

    useFrame(() => {
        // Read values from shared state
        const { distance, polar, azimuthal, polarOffset, azimuthalOffset, tiltZ } = CameraState;

        // Apply Cartesian coordinates based on aggregated Spherical math
        const { x, y, z } = sphericalToCartesian(
            distance,
            polar + polarOffset,
            azimuthal + azimuthalOffset
        );
        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);

        // Apply dynamic "Dutch angle" tilt based on momentum
        camera.rotation.z = tiltZ;

        // Propagate data up for UI readout
        setCameraData({
            polar,
            azimuthal,
            distance,
            position: { x, y, z },
        });
    });

    return null; // Logic-only component
}
