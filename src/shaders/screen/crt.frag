varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uResolution;

// 🎛 CONFIG
const float CHROMA_SHIFT = 0.0015;

// 🖥️ BARREL DISTORTION
vec2 curve(vec2 uv) {
    uv = uv * 2.0 - 1.0;

    vec2 offset = abs(uv.yx) / 3.0;
    uv += uv * offset * offset;

    return uv * 0.5 + 0.5;
}

void main() {
    vec2 uv = curve(vUv);

    // 🌑 Soft mask (instead of hard cut)
    float maskEdge = smoothstep(0.0, 0.02, uv.x) *
                     smoothstep(0.0, 0.02, uv.y) *
                     smoothstep(1.0, 0.98, uv.x) *
                     smoothstep(1.0, 0.98, uv.y);

    // 🎨 Chromatic aberration
    vec4 color;
    color.r = texture2D(tDiffuse, uv + vec2(CHROMA_SHIFT, 0.0)).r;
    color.g = texture2D(tDiffuse, uv).g;
    color.b = texture2D(tDiffuse, uv - vec2(CHROMA_SHIFT, 0.0)).b;
    color.a = texture2D(tDiffuse, uv).a;

    // 📼 Scanlines (more natural)
    float scanline = sin(uv.y * uResolution.y * 1.2 + uTime * 3.0) * 0.04;

    // 📺 RGB stripe mask (more CRT-like)
    float triad = mod(uv.x * uResolution.x, 3.0);
    vec3 mask = vec3(
        step(0.0, 1.0 - abs(triad - 0.0)),
        step(0.0, 1.0 - abs(triad - 1.0)),
        step(0.0, 1.0 - abs(triad - 2.0))
    ) * 0.04;

    // 🔦 Vignette
    float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vig = pow(40.0 * vig, 0.3);

    // ⚡ Flicker (slightly irregular)
    float flicker = 1.0 + 0.01 * sin(uTime * 15.0 + sin(uTime * 3.0));

    // 🌫 Glow center
    float glow = (1.0 - length(uv - 0.5)) * 0.05;

    // Combine
    color.rgb += scanline;
    color.rgb += mask;
    color.rgb *= vig;
    color.rgb *= flicker;
    color.rgb += glow;

    // Apply soft edge mask
    color.rgb *= maskEdge;

    gl_FragColor = color;
}
