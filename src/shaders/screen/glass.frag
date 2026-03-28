uniform float uTime;
uniform vec2 uResolution;

uniform vec3 uColor;
uniform float uOpacity;
uniform float uThickness;
uniform float uIOR;
uniform float uRoughness;
uniform float uMetallic;

// 🔌 NEW: sync from screen
uniform float uSignal;      // glitch/signal strength
uniform float uBrightness;  // screen brightness

varying vec3 vViewDir;
varying vec3 vWorldNormal;

void main() {

  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(vViewDir);

  float NdotV = max(dot(N, V), 0.0);

  //
  // 🎯 Better fresnel (more realistic curve)
  //
  float fresnel = pow(1.0 - NdotV, 5.0);

  //
  // 🪞 Subtle refraction distortion (based on view angle)
  //
  vec2 distortion = N.xy * (0.02 + uSignal * 0.01);

  //
  // ⚡ CRT light interaction (VERY important)
  //
  float lightResponse = mix(0.2, 0.6, uBrightness);
  float signalPulse = 0.02 * sin(uTime * 20.0) * uSignal;

  //
  // 🎨 Base color (glass tint)
  //
  vec3 color = uColor * 0.08;

  //
  // 💡 Screen reflection (fake but convincing)
  //
  color += fresnel * (0.25 + lightResponse);

  //
  // ⚡ subtle CRT flicker reflection
  //
  color += signalPulse;

  //
  // 🌫 thickness absorption (fake but nice)
  //
  color *= mix(1.0, 0.85, uThickness);

  //
  // 🎯 alpha (more physically plausible)
  //
  float alpha = uOpacity;

  // fresnel makes edges stronger
  alpha += fresnel * 0.35;

  // signal affects clarity slightly
  alpha += uSignal * 0.05;

  alpha = clamp(alpha, 0.05, 0.75);

  gl_FragColor = vec4(color, alpha);
}
