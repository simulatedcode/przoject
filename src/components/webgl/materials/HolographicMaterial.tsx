'use client'

import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { gsap } from '@/utils/gsap'

// @ts-ignore
import vertexShader from '../../../shaders/materials/hologram/vertex.glsl'
// @ts-ignore
import fragmentShader from '../../../shaders/materials/hologram/fragment.glsl'

interface HolographicMaterialProps {
    color?: string | THREE.Color
    opacity?: number
}

export default function HolographicMaterial({
    color = '#f7d08a',
    opacity = 0.7
}: HolographicMaterialProps) {

    const material = useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uIntro: { value: 0 },
            uColor: { value: new THREE.Color(color) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
    }), [color])

    useEffect(() => {
        gsap.to(material.uniforms.uIntro, {
            value: 1,
            duration: 1.5,
            ease: "power2.out"
        })
    }, [material])

    useFrame((state) => {
        material.uniforms.uTime.value = state.clock.getElapsedTime()
    })

    return <primitive object={material} attach="material" />
}
