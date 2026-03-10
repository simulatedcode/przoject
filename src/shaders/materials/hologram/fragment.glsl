uniform float uTime;
uniform float uIntro;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

#pragma glslify: getFresnel = import(../../includes/fresnel.glsl)
#pragma glslify: getScanline = import(../../includes/scanlines.glsl)
#pragma glslify: getToon = import(../../includes/toon.glsl)

void main() {
    // 1. Toon Shading (Cell Shading)
    vec3 lightDirection = normalize(vec3(5.0, 5.0, 5.0));
    float toon = getToon(vNormal, lightDirection);
    
    // 2. Enhanced Fresnel (for glowy edges)
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = getFresnel(vNormal, viewDirection, 3.0);
    
    // 3. Scanline effect
    float scanline = getScanline(vWorldPosition.y, uTime, 4.0, 50.0);
    
    // 4. Glitch / Flicker effect
    float flickerAmount = mix(0.01, 0.05, uIntro);
    float flicker = sin(uTime * 20.0) * flickerAmount + (1.0 - flickerAmount);
    
    // Combine everything
    vec3 baseColor = uColor * toon;
    vec3 emissive = uColor * fresnel * (1.5 + uIntro * 1.0);
    vec3 finalColor = (baseColor + emissive) * (0.5 + uIntro * 1.0);
    finalColor *= scanline * flicker;
    
    // Smooth digital-in alpha
    float alpha = mix(0.7, 1.0, fresnel) * uIntro;
    
    gl_FragColor = vec4(finalColor, alpha);
}
