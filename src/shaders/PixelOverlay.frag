uniform float uPixelSize;
uniform float uGridThickness;
uniform float uOpacity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 res = resolution;
  vec2 size = res / uPixelSize;
  
  // Pixelate UVs
  vec2 puv = floor(uv * size) / size;
  
  // Get pixelated color
  vec4 color = texture2D(inputBuffer, puv);
  
  // Grid lines
  vec2 fuv = fract(uv * size);
  float grid = 1.0;
  
  float edge = uGridThickness;
  if (fuv.x < edge || fuv.y < edge) {
    grid = 0.0;
  }
  
  // Combine
  vec3 finalColor = color.rgb * grid;
  
  // Blend with original base on opacity
  outputColor = mix(inputColor, vec4(finalColor, color.a), uOpacity);
}
