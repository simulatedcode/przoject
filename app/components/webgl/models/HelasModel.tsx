"use client";

import { JSX, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function HelasModel(props: JSX.IntrinsicElements["group"]) {
    const { scene } = useGLTF("/models/helas.glb");
    const texture = useTexture("/images/textur_metal.jpg");

    useEffect(() => {
        if (!texture || !scene) return;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Apply immediately solid material
        scene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                child.material = new THREE.MeshPhysicalMaterial({
                    map: texture,

                    // Slightly cool industrial tone
                    color: new THREE.Color("#c9cccf"),

                    // Not fully chrome
                    metalness: 0.85,
                    roughness: 0.48,

                    // Subtle thin film aging
                    iridescence: 0.9,
                    iridescenceIOR: 1.35,
                    iridescenceThicknessRange: [200, 450],

                    // No glass behavior
                    transmission: 0,
                    thickness: 0,
                    ior: 1.45,

                    // Soft surface bloom feel
                    sheen: 0.35,
                    sheenRoughness: 0.85,

                    // Gentle surface polish
                    clearcoat: 0.25,
                    clearcoatRoughness: 0.5,
                });
            }
        });
    }, [scene, texture]);

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/helas.glb");
useTexture.preload("/images/textur_metal.jpg");
