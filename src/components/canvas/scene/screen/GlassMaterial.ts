import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import glassVertexShader from '@/shaders/screen/glass.vert?raw'
import glassFragmentShader from '@/shaders/screen/glass.frag?raw'

/**
 * GlassMaterial
 * Cinematic glass synced with CRT signal + light response.
 */
export const GlassMaterial = shaderMaterial(
  {
    // ⏱ time
    uTime: 0,

    // 📐 curve bending
    uCurveRadius: 12.0,
    uCurveAmount: 2.5,
    uTension: 0.3,

    // 📺 match screen resolution (IMPORTANT)
    uResolution: new THREE.Vector2(1920, 1080),

    // 🎨 base
    uColor: new THREE.Color('#aaddff'),
    uOpacity: 0.08,

    // 🧪 physical params
    uThickness: 0.5,
    uIOR: 1.52,
    uRoughness: 0.15,
    uMetallic: 0.02,

    // 🔌 NEW: sync with screen system
    uSignal: 0.1,        // glitch / signal strength
    uBrightness: 1.35,   // screen brightness
  },
  glassVertexShader,
  glassFragmentShader
)

extend({ GlassMaterial })
