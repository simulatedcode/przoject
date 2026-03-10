'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// @ts-ignore
import vhsShader from '../../shaders/vhs.glsl'

function OverlayPlane() {
    const meshRef = useRef<THREE.Mesh>(null!)

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: vhsShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
        })
    }, [])

    useFrame((state) => {
        material.uniforms.uTime.value = state.clock.getElapsedTime()
    })

    return (
        <mesh ref={meshRef} frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
        </mesh>
    )
}

export default function VhsOverlay() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            pointerEvents: 'none',
            mixBlendMode: 'screen'
        }}>
            <Canvas
                gl={{ alpha: true }}
                camera={{ position: [0, 0, 1] }}
            >
                <OverlayPlane />
            </Canvas>
        </div>
    )
}
