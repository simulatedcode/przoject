'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { ScreenMaterial } from './ScreenMaterial'
import { GlassMaterial } from './GlassMaterial'
import { useScreenPlayback } from './useScreenPlayback'
import { useScreenIntro } from './useScreenIntro'
import { useWebGLStore } from '@/store/useWebGLStore'
import { extend } from '@react-three/fiber'

extend({ ScreenMaterial, GlassMaterial })

const IMAGES = [
  '/images/panorama.png',
  '/images/ohm.png',
  '/images/helas.png'
]

export default function BigScreen() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null)
  const glassRef = useRef<THREE.ShaderMaterial | null>(null)
  const lightRef = useRef<THREE.RectAreaLight>(null)

  const textures = useTexture(IMAGES)

  const { size } = useThree()
  const aspect = size.width / size.height
  const isMobile = aspect < 1.0

  const firstTexture = textures[0] as THREE.Texture
  const { width, height } = (firstTexture.image as HTMLImageElement) || { width: 3840, height: 1100 }
  const textureRatio = width / height

  const BASE_HEIGHT = isMobile ? 4.5 : 7.5
  const dynamicWidth = BASE_HEIGHT * textureRatio
  const dynamicHeight = BASE_HEIGHT

  // ✅ physically correct curvature scale
  const curveRadius = dynamicWidth * 1.2
  const curveAmount = dynamicWidth / curveRadius // auto consistent
  const tension = 0.5

  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.ClampToEdgeWrapping
      tex.wrapT = THREE.ClampToEdgeWrapping
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
    })
  }, [textures])

  const introState = useScreenIntro(shaderRef)

  const phase = useWebGLStore((s) => s.phase)
  const [playbackEnabled, setPlaybackEnabled] = useState(false)

  useFrame(() => {
    if (phase === 'landing' && !playbackEnabled) {
      setPlaybackEnabled(true)
    }
  })

  useScreenPlayback(textures, shaderRef, playbackEnabled)

  const timer = useMemo(() => new THREE.Timer(), [])

  useFrame(() => {
    timer.update()
    if (!shaderRef.current || !lightRef.current) return

    const brightness = shaderRef.current.uniforms.uBrightness.value || 1.8
    lightRef.current.intensity = 2.0 + brightness

    if (glassRef.current) {
      glassRef.current.uniforms.uTime.value = timer.getElapsed()
    }
  })

  return (
    <group position={[0, 3.8, -16]}>
      {/* SCREEN */}
      <mesh>
        {/* ✅ HIGH subdivision (CRITICAL) */}
        <planeGeometry args={[dynamicWidth, dynamicHeight, 256, 128]} />
        <screenMaterial
          ref={shaderRef}
          transparent
          uResolution={[1920, 1080]}
          uCurveRadius={curveRadius}
          uCurveAmount={curveAmount}
          uTension={tension}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* GLOW */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[dynamicWidth * 1.05, dynamicHeight * 1.05, 64, 32]} />
        <meshBasicMaterial
          transparent
          opacity={0.04}
          color="#aaccff"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* GLASS */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[dynamicWidth + 0.05, dynamicHeight + 0.05, 128, 64]} />
        <glassMaterial
          ref={glassRef}
          transparent
          uColor="#ccddff"
          uOpacity={0.08}
          uResolution={[1920, 1080]}
          uCurveRadius={curveRadius}
          uCurveAmount={curveAmount}
          uTension={tension}
        />
      </mesh>

      {/* LIGHT */}
      <rectAreaLight
        ref={lightRef}
        position={[0, 0, 0.5]}
        width={dynamicWidth}
        height={dynamicHeight}
        intensity={35}
        color="#ffffff"
      />
    </group>
  )
}
