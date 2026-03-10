uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Basic Fresnel effect
    vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0)); // Simplified view dir
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
    
    // Scanline effect
    float scanline = sin(vPosition.y * 100.0 + uTime * 5.0) * 0.1 + 0.9;
    
    vec3 finalColor = uColor * (fresnel + 0.5) * scanline;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
