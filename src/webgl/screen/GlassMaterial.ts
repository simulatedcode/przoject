import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { ThreeElement } from '@react-three/fiber'

/**
 * GlassMaterial
 * A high-end physical glass shader with a procedural pixel matrix.
 * Features:
 * - Micro-pixel light-scattering grid
 * - Thin-film interference (Iridescence)
 * - Angle-dependent highlights
 */
export const GlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1920, 1080),
    uColor: new THREE.Color('#aaddff'),
    uOpacity: 0.02,
  },
  // Vertex
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // Fragment
  `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
    
    // --- 💠 PIXEL MATRIX (The Structural "Touch") ---
    // A high-detail procedural grid that simulates the physical panel
    vec2 gridScale = uResolution * 2.0;
    vec2 grid = fract(uv * gridScale);
    float gridMask = step(0.1, grid.x) * step(0.1, grid.y);
    
    // Sub-pixel highlights (micro-reflections)
    float pixelSparkle = random(floor(uv * gridScale) + floor(uTime * 2.0));
    float sparkleMask = step(0.9997, pixelSparkle);

    // --- ✨ THIN-FILM INTERFERENCE (Iridescence) ---
    vec3 specColor = vec3(0.5, 0.8, 1.0);
    specColor.r += sin(fresnel * 10.0 + uTime * 0.5) * 0.1;
    specColor.g += cos(fresnel * 8.0 + uTime * 0.3) * 0.1;
    specColor.b += sin(fresnel * 12.0 + uTime * 0.7) * 0.1;

    // --- FINAL COMPOSITION ---
    vec3 color = uColor;
    
    // Apply grid darkening
    color *= mix(0.9, 1.0, gridMask);
    
    // Add specular highlights/fresnel
    color += specColor * fresnel * 0.5;
    
    // Add micro-sparkle for "realistic" substrate noise
    color += sparkleMask * 1.5;

    float alpha = uOpacity + fresnel * 0.4;
    
    gl_FragColor = vec4(color, alpha);
  }
  `
)

extend({ GlassMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      glassMaterial: ThreeElement<typeof GlassMaterial>
    }
  }
}
