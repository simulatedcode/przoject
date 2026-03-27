precision highp float;
precision highp sampler2D;

uniform sampler2D uTextureA;
uniform sampler2D uTextureB;

uniform float uBlend;
uniform float uTime;
uniform vec2 uResolution;

uniform float uGlitch;
uniform float uBrightness;

uniform float uGlitchStrength;
uniform float uGlitchFrequency;

// 🔥 NEW: control LED size
uniform float uLedScale;

varying vec2 vUv;

#define random(st) fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123)

//
// 🧠 memory field
//
float memoryField(vec2 uv) {
  vec2 grid = floor(uv * vec2(10.0, 6.0));
  float n = random(grid);
  return smoothstep(0.2, 0.8, n);
}

//
// 🌫 drift
//
vec2 drift(vec2 uv) {
  float t = uTime * 0.3;
  uv += vec2(
    sin(t + uv.y * 6.0),
    cos(t + uv.x * 4.0)
  ) * 0.0015;
  return uv;
}

//
// 👻 persistence
//
vec3 persistence(vec2 uv) {
  vec2 shift = vec2(0.002 * sin(uTime * 0.8), 0.0);

  vec3 pastA = texture(uTextureA, uv - shift).rgb;
  vec3 pastB = texture(uTextureB, uv - shift).rgb;

  return mix(pastA, pastB, uBlend);
}

//
// ✨ spectral
//
vec3 spectral(vec2 uv) {
  float offset = 0.002 + uGlitch * 0.004;

  vec3 col;
  col.r = mix(texture(uTextureA, uv + vec2(offset, 0.0)).r, texture(uTextureB, uv + vec2(offset, 0.0)).r, uBlend);
  col.g = mix(texture(uTextureA, uv).g, texture(uTextureB, uv).g, uBlend);
  col.b = mix(texture(uTextureA, uv - vec2(offset, 0.0)).b, texture(uTextureB, uv - vec2(offset, 0.0)).b, uBlend);

  return col;
}

//
// 📺 scanlines
//
float scanlines(vec2 uv) {
  return 0.97 + 0.03 * sin(uv.y * uResolution.y * 0.9);
}

//
// 🌫 bloom
//
vec3 bloom(vec3 color) {
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float glow = smoothstep(0.4, 1.0, luma);
  return color + color * glow * 0.25;
}

//
// 🎥 tone mapping
//
vec3 tone(vec3 color) {
  return color / (1.0 + color);
}

// Define the palette as a constant outside the function for better performance.
const vec3 LED_PALETTE[3] = vec3[](
    vec3(1.0, 0.0, 0.0), // Red
    vec3(0.0, 1.0, 0.0), // Green
    vec3(0.0, 0.0, 1.0)  // Blue
);

vec3 phosphorMask(vec2 uv, vec2 res, vec3 color) {
    // 1. INPUT GAMMA: If input is sRGB, convert to linear for accurate math
    color = pow(color, vec3(2.2)); 

    float scale = min(res.x, res.y) * uLedScale;
    vec2 gridUV = uv * scale;
    vec2 cell   = fract(gridUV);

    // 2. STABLE INDEXING: Use an integer for the array index
    int index = int(clamp(floor(cell.x * 3.0), 0.0, 2.0));
    vec3 subColor = LED_PALETTE[index];

    vec2 sub = fract(cell * vec2(3.0, 1.0));
    float d  = length(sub - 0.5);

    // 3. ANTI-ALIASING: Use fwidth to soften edges and reduce moiré shimmer
    float delta = fwidth(d);
    float ledDot  = smoothstep(0.35 + delta, 0.35 - delta, d);
    float ledGlow = smoothstep(0.8, 0.2, d);

    float brightness = dot(color, subColor);
    // Adjusting power for the mask weight
    brightness = pow(brightness, 0.8);

    vec3 emission = subColor * brightness * (ledDot + ledGlow * 0.25);
    
    // 4. AMBIENT BOOST: Prevents the screen from going completely black
    vec3 ambient  = color * 0.15; 

    vec3 result = ambient + emission;

    // 5. OUTPUT GAMMA: Convert back to sRGB for display
    return pow(result, vec3(1.0 / 2.2));
}

//
// 🎬 MAIN
//
void main() {
  vec2 uv = vUv;

  uv = drift(uv);

  float dist = length(uv - 0.5);
  float field = memoryField(uv);

  vec3 colA = texture(uTextureA, uv).rgb;
  vec3 colB = texture(uTextureB, uv).rgb;

  vec3 present = mix(colA, colB, uBlend);
  vec3 past = persistence(uv);

  vec3 memoryMix = mix(present, past, field * (1.0 - uBlend));
  vec3 color = mix(memoryMix, spectral(uv), 0.4);

  color = mix(color, past, 0.15);
  color = mix(color, vec3(dot(color, vec3(0.333))), 0.08);

  color *= scanlines(uv);

  // 🔥 APPLY LCD BEFORE BLOOM
  color = phosphorMask(uv, uResolution, color);

  color = bloom(color);
  color = tone(color);

  color *= uBrightness;

  float vignette = smoothstep(0.95, 0.65, dist);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}