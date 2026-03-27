import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import screenVertexShader from '@/webgl/shaders/screen/screen.vert?raw'
import screenFragmentShader from '@/webgl/shaders/screen/screen.frag?raw'

/**
 * ScreenMaterial
 * Film-grade CRT / dystopian glitch display system.
 */
export const ScreenMaterial = shaderMaterial(
  {

    uLedScale: 0.25,

    // 🎞 textures
    uTextureA: null,
    uTextureB: null,

    // 🎬 playback
    uBlend: 0,
    uTime: 1,

    // 📺 resolution
    uResolution: new THREE.Vector2(1920, 1080),

    // 🔆 brightness
    uBrightness: 1.35,

    // ⚡ main glitch signal
    uGlitch: 0.5,

    // 🎛 legacy controls (still useful)
    uGlitchStrength: 0.8,
    uGlitchFrequency: 60.0,

    // 🔌 system signal (sync with glass etc.)
    uSignal: 0.2,

    // 🧨 DYSTOPIAN CHANNELS (IMPORTANT)
    uTear: 0.08,   // horizontal tearing
    uRGB: 0.5,    // RGB split
    uWarp: 0.02,   // screen distortion
    uNoise: 0.05,  // interference noise

    // 📼 future controls
    uScanDistort: 0.25,
    uBloom: 0.25,

    // 🎬 INTRO SEQUENCE
    uIntroProgress: 0.1,
    uFlash: 0.05,
    uDistortion: 0.02,
  },
  screenVertexShader,
  screenFragmentShader
)

extend({ ScreenMaterial })
