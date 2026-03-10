uniform float uTime;
varying vec2 vUv;

// ------------------------------------------------
// HASH / NOISE
// ------------------------------------------------
float hash(vec2 p){
    p = fract(p * vec2(123.34,456.21));
    p += dot(p,p+45.32);
    return fract(p.x*p.y);
}

float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

// ------------------------------------------------
// ANALOG EFFECTS
// ------------------------------------------------
float analogGrain(vec2 uv, float time){
    float g = hash(uv * 400.0 + time);
    g += hash(uv * 900.0 - time * 0.5);
    return (g * 0.5 - 0.25) * 0.04;
}

float crtScanlines(float y, float time){
    float fine = sin(y * 420.0);
    float coarse = sin(y * 60.0 - time * 1.5);
    return 1.0 - (fine * 0.12 + coarse * 0.08);
}

float signalTear(vec2 uv, float time){
    float band = step(0.98, noise(vec2(time * 1.5, uv.y * 2.0)));
    return sin(uv.y * 120.0 + time * 40.0) * 0.0015 * band;
}

void main(){
    vec2 uv = vUv;
    
    // Global signal jitter
    uv.x += signalTear(vUv, uTime);
    
    // Effects
    float scanline = crtScanlines(vUv.y, uTime);
    float grain = analogGrain(uv, uTime);
    float flicker = 1.0 + (sin(uTime * 40.0) * 0.01 + sin(uTime * 12.0) * 0.015);
    
    // Rolling refresh bar
    float refresh = smoothstep(0.0, 0.02, abs(fract(uTime * 0.2) - vUv.y)) * 0.03;

    // Overlay color logic: 
    // We want this to be additive/multiplicative over the existing scene
    // So we start with "neutral/invisible" and add the artifacts
    vec4 color = vec4(0.0);
    
    // The scanline and flicker act as multipliers on the brightness of whatever is below
    // But since this is a separate canvas, we'll simulate it with black lines and white flicker
    float luminance = scanline * flicker;
    
    // Final composite logic for a transparent overlay
    color.rgb = vec3(grain);
    color.a = (1.0 - luminance) * 0.5 + abs(grain) * 2.0 + refresh;
    
    // Ensure it doesn't wash out everything, just adds texture
    color.a = clamp(color.a, 0.0, 0.4);

    gl_FragColor = color;
}
