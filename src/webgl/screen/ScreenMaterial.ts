import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { ThreeElement } from '@react-three/fiber'

/**
 * ScreenMaterial
 * A world-class cinematic screen shader inspired by 'The Extraordinary Lab'.
 * Features:
 * - Dual-texture neural crossfading
 * - Scientific RGB subpixel simulation
 * - Dynamic technical scan-patterns
 * - High-frequency signal interference
 * - Holographic chromatic aberration
 */
export const ScreenMaterial = shaderMaterial(
  {
    uTextureA: null,
    uTextureB: null,
    uBlend: 0,
    uTime: 0,
    uResolution: new THREE.Vector2(1080, 1690),
    uBrightness: 0,
  },
  // Vertex
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment
  `
  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform float uBlend;
  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // --- UTILS ---
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  vec3 adjustSaturation(vec3 color, float saturation) {
    float grey = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return mix(vec3(grey), color, saturation);
  }

  vec3 ledDiode(vec2 uv, vec2 res) {
    vec2 gridScale = res;
    vec2 grid = fract(uv * gridScale);
    
    // Sub-pixel matrix (RGB layout)
    vec2 sub = fract(grid * vec2(3.0, 1.0));
    
    // Physical Diode Geometry
    float diodeDist = length(sub - 0.5);
    float diode = smoothstep(0.48, 0.4, diodeDist);
    float core = smoothstep(0.3, 0.05, diodeDist); 
    
    // Emissive Bleed (Bloom) - Reduced for sharpness
    float bleed = smoothstep(0.6, 0.2, diodeDist) * 0.2;

    vec3 mask = vec3(0.0);
    if (sub.x < 0.33) mask.r = diode + core + bleed;
    else if (sub.x < 0.66) mask.g = diode + core + bleed;
    else mask.b = diode + core + bleed;
    
    // Physical Panel Structure (Black Gaps) - Sharper edges
    float horizontalGap = smoothstep(0.0, 0.02, grid.x) * smoothstep(1.0, 0.98, grid.x);
    float verticalGap = smoothstep(0.0, 0.02, grid.y) * smoothstep(1.0, 0.98, grid.y);
    return mask * horizontalGap * verticalGap;
  }

  void main() {
    vec2 uv = vUv;
    
    // --- DISTORTION (Subtle) ---
    float dist = length(uv - 0.5);
    uv += (uv - 0.5) * dist * 0.02; 

    // --- TEXTURE SAMPLING ---
    // Sharpening: Sample neighbors and blend (Basic sharpening)
    vec3 colA = texture2D(uTextureA, uv).rgb;
    vec3 colB = texture2D(uTextureB, uv).rgb;
    
    // Optional: Sharpening logic (Laplacian-like)
    // float texel = 1.0 / 1024.0;
    // vec3 center = texture2D(uTextureA, uv).rgb;
    // vec3 left = texture2D(uTextureA, uv + vec2(-texel, 0.0)).rgb;
    // vec3 right = texture2D(uTextureA, uv + vec2(texel, 0.0)).rgb;
    // colA = center + (center - (left + right) * 0.5) * 0.5;

    // --- CHROMATIC ABERRATION (Reduced for Sharpness) ---
    float shift = 0.001 * dist * (1.1 + sin(uTime * 0.5));
    colA.r = texture2D(uTextureA, uv + vec2(shift, 0.0)).r;
    colA.b = texture2D(uTextureA, uv - vec2(shift, 0.0)).b;
    
    vec3 color = mix(colA, colB, uBlend);

    // --- 🔮 HOLOGRAPHIC ALPHA / GHOSTING ---
    // Higher floor for alpha to keep colors dominant
    float brightness = dot(color, vec3(0.299, 0.587, 0.114));
    float alpha = clamp(brightness * 2.0, 0.2, 0.95); 
    
    // --- DIGITAL GRAIN (Reduced) ---
    float grain = (random(uv + uTime) - 0.5) * 0.04;
    color += grain;

    // --- COLOR DOMINANCE (Saturation & Contrast) ---
    color = adjustSaturation(color, 1.3);
    color = (color - 0.5) * 1.1 + 0.5; // Simple contrast

    // --- PHYSICAL LED DIODE MASK ---
    // Increased resolution for higher detail
    vec3 led = ledDiode(uv, uResolution * 0.85); 
    color *= led * 1.8;

    // --- SCAN PATTERNS ---
    float scan = sin(uv.y * uResolution.y * 0.5) * 0.5 + 0.5;
    color *= mix(0.85, 1.0, scan);

    // Final Gain & Tonemapping
    color *= 1.5;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
  `
)

// Register the material with R3F
extend({ ScreenMaterial })

// Add type for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      screenMaterial: ThreeElement<typeof ScreenMaterial>
    }
  }
}
