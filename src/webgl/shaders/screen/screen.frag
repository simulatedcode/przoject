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

varying vec2 vUv;

#define random(st) fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123)

//
// 🧠 memory field (soft fragmented zones)
//
float memoryField(vec2 uv) {
  vec2 grid = floor(uv * vec2(10.0, 6.0));
  float n = random(grid);
  return smoothstep(0.2, 0.8, n);
}

//
// 🌫 subtle drift (emotional, not wavy)
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
// 👻 memory persistence
//
vec3 persistence(vec2 uv) {
  vec2 shift = vec2(0.002 * sin(uTime * 0.8), 0.0);

  vec3 pastA = texture(uTextureA, uv - shift).rgb;
  vec3 pastB = texture(uTextureB, uv - shift).rgb;

  return mix(pastA, pastB, uBlend);
}

//
// ✨ soft spectral (hologram-like)
//
vec3 spectral(vec2 uv) {
  float offset = 0.002 + uGlitch * 0.004;

  vec3 col;
  col.r = mix(
    texture(uTextureA, uv + vec2(offset, 0.0)).r,
    texture(uTextureB, uv + vec2(offset, 0.0)).r,
    uBlend
  );
  col.g = mix(
    texture(uTextureA, uv).g,
    texture(uTextureB, uv).g,
    uBlend
  );
  col.b = mix(
    texture(uTextureA, uv - vec2(offset, 0.0)).b,
    texture(uTextureB, uv - vec2(offset, 0.0)).b,
    uBlend
  );

  return col;
}

//
// 📺 soft scanlines
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

//
// 📺 subtle phosphor (highlight-only, cinematic)
//
vec3 phosphorMask(vec2 uv, vec2 res, vec3 color) {
  vec2 gridScale = res * 0.38;
  vec2 grid = fract(uv * gridScale);
  vec2 sub = fract(grid * vec2(3.0, 1.0));

  float d = length((sub - 0.5) * vec2(1.0, 1.2));
  float diode = smoothstep(0.65, 0.4, d);

  vec3 mask = vec3(1.0);
  if (sub.x < 0.33) mask = vec3(1.0, 0.96, 0.96);
  else if (sub.x < 0.66) mask = vec3(0.96, 1.0, 0.96);
  else mask = vec3(1.0, 0.96, 0.96);

  vec3 phosphor = mix(vec3(1.0), mask * diode, 0.2);

  // ✨ only visible in highlights
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float highlight = smoothstep(0.4, 1.0, luma);

  return mix(color, color * phosphor, highlight * 0.50);
}

//
// 🎬 MAIN
//
void main() {
  vec2 uv = vUv;

  // 🌫 drift
  uv = drift(uv);

  float dist = length(uv - 0.5);

  // 🧠 memory zones
  float field = memoryField(uv);

  // base textures
  vec3 colA = texture(uTextureA, uv).rgb;
  vec3 colB = texture(uTextureB, uv).rgb;

  // present vs past
  vec3 present = mix(colA, colB, uBlend);
  vec3 past = persistence(uv);

  // 🧠 memory invasion
  vec3 memoryMix = mix(present, past, field * (1.0 - uBlend));

  // ✨ spectral softness
  vec3 color = mix(memoryMix, spectral(uv), 0.4);

  // 👻 extra ghost layer
  color = mix(color, past, 0.15);

  // 🌫 slight desaturation (anime feel)
  color = mix(color, vec3(dot(color, vec3(0.333))), 0.08);

  // 📺 scanlines
  color *= scanlines(uv);

  // 🌫 bloom + tone
  color = bloom(color);
  color = tone(color);

  // 📺 subtle phosphor (after lighting)
  color = phosphorMask(uv, uResolution, color);

  // 🔆 brightness
  color *= uBrightness;

  // 🎯 vignette
  float vignette = smoothstep(0.95, 0.65, dist);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
