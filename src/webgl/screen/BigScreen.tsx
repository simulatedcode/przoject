'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { ScreenMaterial } from './ScreenMaterial'
import { GlassMaterial } from './GlassMaterial'
import { useScreenPlayback } from './useScreenPlayback'
import { extend } from '@react-three/fiber'

// Ensure ScreenMaterial and GlassMaterial are registered with R3F
extend({ ScreenMaterial, GlassMaterial })

const IMAGES = [
  '/images/panorama.png',
  '/images/ohm.png',
  'images/helas.png'
]

// 🛠️ CONFIG: 2044 Panoramic Proportions
// WIDTH and HEIGHT are now calculated dynamically from texture aspect ratio.

/**
 * BigScreen (2044 Frameless Edition)
 * A floating, zero-bezel holographic display.
 * Eliminated all legacy physical housing to achieve a pure light-emission aesthetic.
 */
export default function BigScreen() {
  const shaderRef = useRef<any>(null)
  const glassRef = useRef<any>(null)
  const lightRef = useRef<THREE.RectAreaLight>(null)

  // Load textures
  const textures = useTexture(IMAGES)

  // 🛠️ CONFIG: Calculate Dynamic Panoramic Proportions
  const { size, viewport } = useThree()
  const aspect = size.width / size.height
  const isMobile = aspect < 1.0

  const firstTexture = textures[0] as THREE.Texture
  const { width, height } = (firstTexture.image as any) || { width: 1920, height: 1080 }
  const textureRatio = width / height

  // Scale based on device
  const BASE_HEIGHT = isMobile ? 4.5 : 7.5
  const dynamicWidth = BASE_HEIGHT * textureRatio
  const dynamicHeight = BASE_HEIGHT

  // Ensure SRGB color space
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
    })
  }, [textures])

  // Connect playback system
  useScreenPlayback(textures, shaderRef)

  // Dynamic light emission & Uniform updates
  useFrame((state) => {
    if (!shaderRef.current || !lightRef.current) return
    const brightness = shaderRef.current.uniforms.uBrightness.value || 0.8
    lightRef.current.intensity = 2.0 + brightness * 1.0

    if (glassRef.current) {
      glassRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <group position={[0, 3.8, -16]}>
      {/* 🔮 THE CORE: Floating Digital Surface */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[dynamicWidth, dynamicHeight]} />
        {/* @ts-ignore */}
        <screenMaterial
          ref={shaderRef}
          transparent
          uResolution={[1280, 720]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🌫️ VOLUMETRIC HAZE: Simulates light catching on air particles */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[dynamicWidth * 1.05, dynamicHeight * 1.05]} />
        <meshBasicMaterial
          transparent
          opacity={0.04}
          color="#aaccff"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 💠 HOLO-GLASS: Realistic pixel-substrate glass */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[dynamicWidth + 0.05, dynamicHeight + 0.05]} />
        {/* @ts-ignore */}
        <glassMaterial
          ref={glassRef}
          transparent
          uColor="#ccddff"
          uOpacity={0.08}
          uResolution={[1280, 720]}
        />
      </mesh>

      {/* 🔦 ATMOSPHERIC EMITTER: The screen defines the world */}
      <rectAreaLight
        ref={lightRef}
        position={[0, 0, 0.5]}
        width={dynamicWidth}
        height={dynamicHeight}
        intensity={35}
        color="#ffffff"
      />

      {/* ✨ SUBTLE CORNER ANCHORS: Minimalist tech cues */}
      <group>
        {/* Top Left */}
        <mesh position={[-dynamicWidth / 2, dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-dynamicWidth / 2, dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.02, 0.5, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>

        {/* Bottom Right */}
        <mesh position={[dynamicWidth / 2, -dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[dynamicWidth / 2, -dynamicHeight / 2, 0.01]}>
          <boxGeometry args={[0.02, 0.5, 0.05]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}

// Preload
useTexture.preload(IMAGES)
