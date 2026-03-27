varying vec3 vViewDir;
varying vec3 vWorldNormal;

void main() {
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

  gl_Position = projectionMatrix * mvPosition;
}