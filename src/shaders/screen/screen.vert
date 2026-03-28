varying vec2 vUv;

uniform float uCurveRadius;
uniform float uCurveAmount;
uniform float uTension;

void main() {
  vUv = uv;

  vec3 pos = position;

  // normalize X across screen width (-1 to 1)
  float xNorm = pos.x / (uCurveRadius);

  // falloff → flat center, curved edges
  float edgeFactor = pow(abs(xNorm), 1.5);

  // curvature angle
  float theta = xNorm * uCurveAmount;

  // cylindrical base
  float bendX = uCurveRadius * sin(theta);
  float bendZ = uCurveRadius * (1.0 - cos(theta));

  // mix flat + curved (LED wall behavior)
  pos.x = mix(pos.x, bendX, edgeFactor);
  pos.z += bendZ * edgeFactor;

  // subtle forward tension (IMAX feel)
  pos.z += edgeFactor * uTension;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
