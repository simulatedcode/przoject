varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uResolution;

// 🖥️ BARREL DISTORTION (Curvature)
vec2 curve(vec2 uv) {
    uv = uv * 2.0 - 1.0;
    vec2 offset = abs(uv.yx) / 3.0; // Stronger distortion for the "real monitor" feel
    uv = uv + uv * offset * offset;
    uv = uv * 0.5 + 0.5;
    return uv;
}

void main() {
    vec2 uv = curve(vUv);
    
    // 🧱 MASK (outside curved area - made clean and transparent)
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    // 💿 CHROMATIC ABERRATION (Slight shift on curved edges)
    float dist = length(uv - 0.5);
    float shift = 0.002 * dist;
    
    vec4 color;
    color.r = texture2D(tDiffuse, uv + vec2(shift, 0.0)).r;
    color.g = texture2D(tDiffuse, uv).g;
    color.b = texture2D(tDiffuse, uv - vec2(shift, 0.0)).b;
    color.a = texture2D(tDiffuse, uv).a;
    
    // 📼 SCANLINES
    float scanline = sin(uv.y * 800.0 + uTime * 2.0) * 0.06;
    
    // 📺 RGB PHOSPHOR MASK
    float mask = sin(uv.x * uResolution.x * 2.0) * 0.03;
    
    // 🔦 VIGNETTE
    float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vig = pow(40.0 * vig, 0.25);
    
    // ⚡ FLICKER
    float flicker = 1.0 + 0.008 * sin(uTime * 15.0);
    
    // Combine
    color.rgb += scanline;
    color.rgb += mask;
    color.rgb *= vig;
    color.rgb *= flicker;
    
    // High-end CRT glow (bloom is added in pipeline, but we add subtle center glow here)
    float glow = (1.0 - length(uv - 0.5)) * 0.05;
    color.rgb += glow;

    gl_FragColor = color;
}
