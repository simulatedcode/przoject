uniform float uTime;
uniform float uIntro;
uniform float uPointSize;

attribute vec3 color;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPointColor;
varying float vLightIntensity;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPointColor = color;
    
    // Directional Light Sensitivity (Grit)
    vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
    vLightIntensity = max(0.0, dot(vNormal, lightDir));
    
    // Controlled Digital Jitter (Persistent Buzz)
    vec3 pos = position;
    float jitterTime = floor(uTime * 12.0); 
    float jitter = sin(jitterTime * 4.0 + position.y * 100.0) * 0.0006;
    pos.x += jitter;
    pos.z += jitter;
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size attenuation + Steady Light Sensitivity
    float sizeMix = mix(0.2, 1.0, vLightIntensity);
    gl_PointSize = uPointSize * (130.0 / -mvPosition.z) * uIntro * sizeMix;
}
