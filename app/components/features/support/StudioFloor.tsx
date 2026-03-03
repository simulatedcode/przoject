"use client";

import { ReactNode } from "react";
import { Grid, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface StudioFloorProps {
    color?: string;
    size?: number;
    gridSize?: number;
    showGrid?: boolean;
    children?: ReactNode;
}

export default function StudioFloor({
    color = "#84A990",
    size = 140,
    gridSize = 200,
    showGrid = true,
    children,
}: StudioFloorProps) {
    return (
        <group position={[0, -0.998, 0]}>
            {/* Base Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[size, size]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.8}
                    metalness={0.1}
                    envMapIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Infinite Grid */}
            {showGrid && (
                <Grid
                    position={[0, 0.01, 0]}
                    args={[gridSize, gridSize]}
                    cellColor={color}
                    sectionColor={color}
                    fadeDistance={50}
                    fadeStrength={1}
                    sectionThickness={0.8}
                    cellThickness={0.4}
                    infiniteGrid
                />
            )}

            {/* Soft Contact Shadows */}
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.065}
                scale={12}
                blur={8}
                far={2}
                resolution={512}
                color={color}
            />

            {children}
        </group>
    );
}