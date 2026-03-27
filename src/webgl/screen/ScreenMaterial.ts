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
    // 🎞 textures
    uTextureA: null,
    uTextureB: null,

    // 🎬 playback
    uBlend: 0,
    uTime: 0,

    // 📺 resolution
    uResolution: new THREE.Vector2(1920, 1080),

    // 🔆 brightness
    uBrightness: 1.35,

    // ⚡ main glitch signal
    uGlitch: 0.0,

    // 🎛 legacy controls (still useful)
    uGlitchStrength: 0.8,
    uGlitchFrequency: 60.0,

    // 🔌 system signal (sync with glass etc.)
    uSignal: 0.0,

    // 🧨 DYSTOPIAN CHANNELS (IMPORTANT)
    uTear: 0.0,   // horizontal tearing
    uRGB: 0.1,    // RGB split
    uWarp: 0.0,   // screen distortion
    uNoise: 0.0,  // interference noise

    // 📼 future controls
    uScanDistort: 0.0,
    uBloom: 0.25,

    // 🎬 INTRO SEQUENCE
    uIntroProgress: 0.0,
    uFlash: 0.0,
    uDistortion: 0.0,
  },
  screenVertexShader,
  screenFragmentShader
)

extend({ ScreenMaterial })
