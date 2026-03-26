import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { ThreeElement } from '@react-three/fiber'

export const GlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1920, 1080),
    uColor: new THREE.Color('#aaddff'),
    uOpacity: 0.02,
  },

  // -------------------- VERTEX --------------------
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * mvPosition;
  }
  `,

  // -------------------- FRAGMENT --------------------
  `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  // -------------------- UTILS --------------------
  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
  }

  vec3 getIridescence(float fresnel, float time) {
    float phase = fresnel * 6.0 + time * 0.25;

    vec3 spectrum = vec3(
      sin(phase + 0.0),
      sin(phase + 2.094), // 120°
      sin(phase + 4.188)  // 240°
    );

    spectrum = spectrum * 0.5 + 0.5;

    // slightly compress highlights (more natural)
    spectrum = pow(spectrum, vec3(1.2));

    return mix(vec3(0.04), spectrum, 0.6);
  }

  void main() {
    vec2 uv = vUv;

    // -------------------- VIEW / FRESNEL --------------------
    float NdotV = dot(vNormal, vViewDir);
    float fresnel = pow(1.0 - NdotV, 2.5); // softer than 3.0

    // -------------------- PIXEL MATRIX --------------------
    vec2 gridScale = uResolution * 2.0;
    vec2 grid = fract(uv * gridScale);

    float gridMask = step(0.1, grid.x) * step(0.1, grid.y);

    // micro sparkle (reduced intensity + stability)
    vec2 cell = floor(uv * gridScale);
    float sparkleNoise = random(cell + floor(uTime * 1.5));
    float sparkleMask = step(0.9995, sparkleNoise);

    // -------------------- IRIDESCENCE --------------------
    vec3 specColor = getIridescence(fresnel, uTime);

    // -------------------- FINAL COMPOSITION --------------------
    vec3 color = uColor;

    // subtle structural shading
    color *= mix(0.92, 1.0, gridMask);

    // fresnel + iridescent reflection
    color += specColor * fresnel * 0.35;

    // micro sparkle (less aggressive)
    color += sparkleMask * 0.6;

    float alpha = uOpacity + fresnel * 0.35;

    gl_FragColor = vec4(color, alpha);
  }
  `
)

extend({ GlassMaterial })
