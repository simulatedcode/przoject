varying vec2 vUv;
varying vec3 vViewDir;
varying vec3 vWorldNormal;

uniform float uCurveRadius;
uniform float uCurveAmount;
uniform float uTension;

void main() {
  vUv = uv;

  vec3 pos = position;

  // ===== LED CURVATURE =====
  float xNorm = pos.x / (uCurveRadius);
  float edgeFactor = pow(abs(xNorm), 1.5);

  float theta = xNorm * uCurveAmount;

  float bendX = uCurveRadius * sin(theta);
  float bendZ = uCurveRadius * (1.0 - cos(theta));

  pos.x = mix(pos.x, bendX, edgeFactor);
  pos.z += bendZ * edgeFactor;
  pos.z += edgeFactor * uTension;

  // ===== WORLD SPACE =====
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);

  // ✅ view direction (for fresnel/reflection)
  vViewDir = normalize(cameraPosition - worldPos.xyz);

  // ✅ correct normal in world space
  vec3 objectNormal = normal;

  // transform normal with model matrix
  vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);

  // ===== FINAL POSITION =====
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
