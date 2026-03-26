import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

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
    uGlitch: 0,
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
  uniform float uGlitch;
  uniform float uBrightness;

  varying vec2 vUv;

  // --- UTILS ---
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // --- GLITCH EFFECT ---
  vec3 applyGlitch(vec2 uv, sampler2D texA, sampler2D texB, float blend, vec3 baseColor, float intensity) {
    if (intensity <= 0.0) return baseColor;
    
    // Horizontal tear/slice
    float tearY = random(vec2(floor(uTime * 30.0), 0.0));
    float tearMask = step(0.8, tearY) * step(abs(uv.y - tearY), 0.05);
    
    // Offset UV for tear
    vec2 glitchUv = uv;
    glitchUv.x += tearMask * (random(vec2(tearY, uTime)) - 0.5) * 0.3;
    
    // RGB split (chromatic aberration during glitch)
    float rgbSplit = intensity * 0.05;
    vec3 glitchColor;
    glitchColor.r = texture2D(texA, glitchUv + vec2(rgbSplit, 0.0)).r;
    glitchColor.g = texture2D(texB, glitchUv).g;
    glitchColor.b = texture2D(texA, glitchUv - vec2(rgbSplit, 0.0)).b;
    
    // Mix with original based on blend
    glitchColor = mix(glitchColor, baseColor, 0.3);
    
    // Noise bands
    float noiseBand = random(vec2(floor(uv.y * 50.0), floor(uTime * 20.0)));
    float bandMask = step(0.92, noiseBand) * intensity;
    glitchColor = mix(glitchColor, vec3(random(uv + uTime)), bandMask * 0.5);
    
    // Scan line disruption
    float scanDisrupt = sin(uv.y * uResolution.y * 10.0 + uTime * 100.0) * intensity * 0.3;
    glitchColor += scanDisrupt;
    
    return glitchColor;
  }

  vec3 adjustSaturation(vec3 color, float saturation) {
    float grey = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return mix(vec3(grey), color, saturation);
  }

  vec3 ledDiode(vec2 uv, vec2 res) {
    // Realistic 4K-like resolution (fewer, larger pixels)
    vec2 gridScale = res * 0.35;
    vec2 grid = fract(uv * gridScale);
    
    // Sub-pixel matrix (RGB layout)
    vec2 sub = fract(grid * vec2(3.0, 1.0));
    
    // --- PIXEL BEZEL (Realistic dark borders) ---
    float bezelWidth = 0.12;
    vec2 bezelDist = min(sub, 1.0 - sub);
    float bezel = smoothstep(0.0, bezelWidth, bezelDist.x) * smoothstep(0.0, bezelWidth, bezelDist.y);
    
    // Physical Diode Geometry with bezel
    float diodeDist = length(sub - 0.25);
    float diode = smoothstep(0.48, 0.4, diodeDist);
    float core = smoothstep(0.3, 0.05, diodeDist); 
    
    // --- SUBPIXEL CROSS-TALK (Edge bleeding) ---
    float edgeDist = min(sub.x, 1.0 - sub.x);
    float crossTalk = smoothstep(0.0, 0.15, edgeDist);
    float bleed = smoothstep(0.6, 0.2, diodeDist) * 0.25 * crossTalk;

    vec3 mask = vec3(0.0);
    if (sub.x < 0.33) mask.r = diode + core + bleed;
    else if (sub.x < 0.66) mask.g = diode + core + bleed;
    else mask.b = diode + core + bleed;
    
    mask *= bezel;
    
    // --- NON-UNIFORM BRIGHTNESS (Panel variation) ---
    vec2 pixelId = floor(uv * gridScale);
    float panelVariation = 0.45 + random(pixelId * 0.1) * 0.15;
    mask *= panelVariation;

    // --- PHYSICAL PANEL STRUCTURE (Black Gaps) ---
    float horizontalGap = smoothstep(0.0, 0.015, grid.x) * smoothstep(1.0, 0.985, grid.x);
    float verticalGap = smoothstep(0.0, 0.015, grid.y) * smoothstep(1.0, 0.985, grid.y);
    return mask * horizontalGap * verticalGap;
  }

  // --- ANGULAR RESPONSE (Viewing angle darkening) ---
  float angularResponse(vec2 uv) {
    // Pixels appear darker at oblique angles (simplified center-focused)
    float dist = length(uv - 0.5) * 2.0;
    // Slight darkening toward edges
    return mix(1.0, 0.94, dist * dist);
  }

  // --- MOIRÉ PATTERNS (Subtle interference) ---
  float moirePattern(vec2 uv, vec2 res) {
    float scale = res.y * 0.1;
    vec2 moireUv = uv * scale;
    float pattern = sin(moireUv.x + moireUv.y * 0.7) * cos(moireUv.y * 1.3);
    return 0.995 + pattern * 0.005;
  }

  // --- PIXEL GRID OVERLAY (From PixelOverlay.frag) ---
  vec3 applyPixelGrid(vec2 uv, vec2 res, vec3 color, float thickness, float opacity) {
    vec2 size = res * 0.12; // Coarser grid for realism
    vec2 fuv = fract(uv * size);
    
    float grid = 1.0;
    if (fuv.x < thickness || fuv.y < thickness) {
      grid = 0.25;
    }
    
    return mix(color, color * grid, opacity);
  }

  void main() {
    vec2 uv = vUv;
    
    // --- DISTORTION (Reduced for sharpness) ---
    float dist = length(uv - 0.5);
    uv += (uv - 0.5) * dist * 0.005; 

    // --- TEXTURE SAMPLING - Optimized single sample ---
    vec3 colA = texture2D(uTextureA, uv).rgb;
    vec3 colB = texture2D(uTextureB, uv).rgb;
    
    // Simple unsharp via center sampling only (faster)
    colA = colA * 1.1 - texture2D(uTextureA, uv * 1.001).rgb * 0.1;
    colB = colB * 1.1 - texture2D(uTextureB, uv * 1.001).rgb * 0.1;
    
    vec3 color = mix(colA, colB, uBlend);

    // --- GLITCH EFFECT (During transitions) ---
    color = applyGlitch(uv, uTextureA, uTextureB, uBlend, color, uGlitch);

    // --- 🔮 HOLOGRAPHIC ALPHA / GHOSTING ---
    float brightness = dot(color, vec3(0.299, 0.587, 0.114));
    float alpha = clamp(brightness * 2.0, 0.2, 0.95); 
    
    // --- DIGITAL GRAIN (Minimal for sharpness) ---
    float grain = (random(uv + uTime) - 0.5) * 0.01;
    color += grain;

    // --- COLOR DOMINANCE (Saturation & Contrast) ---
    color = adjustSaturation(color, 1.05);
    color = (color - 0.5) * 1.02 + 0.5;

    // --- PHYSICAL LED DIODE MASK ---
    vec3 led = ledDiode(uv, uResolution); 
    color *= led * 1.15;

    // --- PIXEL GRID OVERLAY ---
    color = applyPixelGrid(uv, uResolution, color, 0.08, 0.2);

    // --- APPLY ANGULAR RESPONSE ---
    float angleMod = angularResponse(uv);
    color *= angleMod;

    // --- APPLY MOIRÉ PATTERNS ---
    color *= moirePattern(uv, uResolution);

    // --- SCAN PATTERNS (Minimal) ---
    float scan = sin(uv.y * uResolution.y * 0.2) * 0.5 + 0.5;
    color *= mix(0.95, 1.0, scan);

    // Final Gain & Tonemapping
    color *= 1.15;
    color += uBrightness * 0.1;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
  `
)

// Register the material with R3F
extend({ ScreenMaterial })
