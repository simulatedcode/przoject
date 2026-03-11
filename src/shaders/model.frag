uniform float uTime;
uniform float uIntro;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    // 1. Toon Shading (Cell Shading)
    vec3 lightDirection = normalize(vec3(5.0, 5.0, 5.0));
    float diffuse = dot(vNormal, lightDirection);
    
    // Discretize the lighting for toon look
    float toon = smoothstep(0.45, 0.55, diffuse) * 0.5 + 0.5;
    
    // 2. Enhanced Fresnel (for glowy edges)
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.0);
    
    // 3. Scanline effect
    float scanline = sin(vWorldPosition.y * 50.0 - uTime * 4.0) * 0.1 + 0.9;
    
    // 4. Glitch / Flicker effect
    // Minimize flicker during intro
    float flickerAmount = mix(0.01, 0.05, uIntro);
    float flicker = sin(uTime * 20.0) * flickerAmount + (1.0 - flickerAmount);
    
    // Combine everything
    vec3 baseColor = uColor * toon;
    vec3 emissive = uColor * fresnel * (1.25+ uIntro * 1.0); // Grow edge glow
    vec3 finalColor = (baseColor + emissive) * (0.25 + uIntro * 1.0); // Overall intensity fade
    finalColor *= scanline * flicker;
    
    // Smooth digital-in alpha
    float alpha = mix(0.5, 1.0, fresnel) * uIntro;
    
    gl_FragColor = vec4(finalColor, alpha);
}
