uniform float uTime;
uniform float uIntro;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPointColor;
varying float vLightIntensity;

// ------------------------------------------------
// UTILS
// ------------------------------------------------

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// ------------------------------------------------
// MAIN
// ------------------------------------------------

void main() {
    // 1. Point Shape (Soft Circular Bloom - Calm)
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft bloom falloff
    float glow = 0.05 / dist - 0.1;
    glow = clamp(glow, 0.0, 1.0);
    
    // Sharp core for definition
    float core = smoothstep(0.5, 0.4, dist);
    float strength = max(core, glow * 0.4);

    // 2. Atmospheric Effects (Grit)
    float flickerTime = floor(uTime * 15.0); // Faster flicker
    float flicker = mix(0.92, 1.0, hash(vec2(flickerTime, 0.0)));
    
    // Structured Grit Scanlines
    float scanY = sin(vWorldPosition.y * 70.0 - uTime * 2.0) * 0.12 + 0.88;
    float scanX = sin(vWorldPosition.x * 35.0 + uTime * 1.0) * 0.05 + 0.95;
    
    // Persistent Data Transmission Noise (Horizontal)
    float noiseLine = hash(vec2(floor(vWorldPosition.y * 120.0), flickerTime));
    float transmission = step(0.97, noiseLine) * 0.25;

    // 3. Color Mapping (Amber -> Gold (Grit))
    vec3 deepAmber = vec3(0.88, 0.32, 0.12); // #E0521F
    vec3 goldenYellow = vec3(1.0, 0.75, 0.1);
    
    vec3 finalColor = mix(deepAmber, goldenYellow, vLightIntensity);
    
    // Fresnel Highlight
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.0);
    finalColor = mix(finalColor, vec3(1.0), fresnel * 0.4 * vLightIntensity);

    // Apply Grit Artifacts
    finalColor *= flicker;
    finalColor *= (scanY * scanX);
    finalColor += transmission;
    finalColor += (hash(vWorldPosition.xy * 200.0 + uTime) - 0.5) * 0.3; // Persistent Grain

    // 4. Opacity (Solid + Grit)
    float alpha = strength * uIntro;
    alpha *= mix(0.7, 0.98, fresnel + vLightIntensity * 1.5); 

    gl_FragColor = vec4(finalColor, alpha);
}