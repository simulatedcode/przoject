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
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.6}
                    metalness={0.8}
                    clearcoat={0.2}
                    clearcoatRoughness={0.6}
                    envMapIntensity={0.5}
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
                    fadeStrength={0.6}
                    sectionThickness={0.6}
                    cellThickness={0.4}
                    infiniteGrid
                />
            )}

            {/* Soft Contact Shadows */}
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.08}
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
