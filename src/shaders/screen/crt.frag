uniform float uTime;
uniform vec2 uResolution;
uniform int uMode;
uniform float uGlitch;
uniform float uIntensity;

// 🖥️ BARREL DISTORTION
vec2 curve(vec2 uv, float intensity) {
    uv = uv * 2.0 - 1.0;
    vec2 offset = abs(uv.yx) / 3.0;
    uv += uv * offset * offset * intensity;
    return uv * 0.5 + 0.5;
}

// 🎰 Fast hash
float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float modeF = float(uMode);
    
    float distortionIntensity = mix(1.0, mix(0.2, mix(0.5, 1.5, step(2.0, modeF)), step(1.0, modeF)), step(0.5, modeF)) * uIntensity;

    vec2 distortedUv = curve(uv, distortionIntensity);

    float glitchAmount = uGlitch * 0.1 * uIntensity;
    glitchAmount += (0.02 * step(0.5, modeF) + 0.05 * step(2.5, modeF)) * random(vec2(uTime, 0.0)) * uIntensity;

    vec2 glitchUv = distortedUv;
    float randY = random(vec2(floor(uv.y * 20.0), uTime));
    if (randY < 0.1 * (uGlitch + 0.1)) {
        glitchUv.x += (random(vec2(uTime)) - 0.5) * glitchAmount;
    }

    float maskEdge = smoothstep(0.0, 0.02, uv.x) *
                     smoothstep(0.0, 0.02, uv.y) *
                     smoothstep(1.0, 0.98, uv.x) *
                     smoothstep(1.0, 0.98, uv.y);

    float chromaShift = (0.0015 + 0.0035 * step(2.5, modeF)) * uIntensity;
    
    vec4 color;
    vec2 offset = vec2(chromaShift, 0.0);
    color.r = texture2D(inputBuffer, glitchUv + offset).r;
    color.g = texture2D(inputBuffer, glitchUv).g;
    color.b = texture2D(inputBuffer, glitchUv - offset).b;
    color.a = color.g;

    float scanlineOpacity = (0.01 + 0.05 * step(0.5, modeF) * (1.0 - step(1.5, modeF)) + 0.01 * step(1.5, modeF)) * uIntensity;
    float sinTime3 = sin(uTime * 3.0);
    float scanline = sin(uv.y * uResolution.y * 1.2 + sinTime3) * scanlineOpacity;

    float triad = mod(uv.x * uResolution.x, 3.0);
    vec3 mask = vec3(
        step(0.0, 1.0 - abs(triad)),
        step(0.0, 1.0 - abs(triad - 1.0)),
        step(0.0, 1.0 - abs(triad - 2.0))
    ) * (0.04 + 0.02 * step(0.5, modeF)) * uIntensity;

    float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    float vigExp = mix(0.3, 0.2, step(1.5, modeF));
    vig = pow(40.0 * vig, vigExp);

    float flickerIntensity = (0.01 + 0.02 * step(0.5, modeF) - 0.01 * step(1.5, modeF) + 0.07 * step(2.5, modeF)) * uIntensity;
    float flickerSpeed = 15.0 - 10.0 * step(1.5, modeF);
    float flicker = 1.0 + flickerIntensity * sin(uTime * flickerSpeed + sinTime3);

    float glow = (1.0 - length(uv - 0.5)) * (0.05 + 0.03 * step(1.5, modeF)) * uIntensity;

    color.rgb += scanline;
    color.rgb += mask;
    color.rgb *= vig;
    color.rgb *= flicker;
    color.rgb += glow;

    if (uMode == 1) {
        float scanLinePos = mod(uTime * 0.2, 1.0);
        float line = smoothstep(0.002, 0.0, abs(uv.y - scanLinePos));
        color.rgb += line * 0.1;
    }

    if (uMode == 3) {
        color.rgb += random(uv + uTime) * 0.1;
    }

    color.rgb *= maskEdge;

    outputColor = color;
}
