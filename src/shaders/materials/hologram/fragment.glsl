uniform float uTime;
uniform float uIntro;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;


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

    return mix(a,b,u.x)
        + (c-a)*u.y*(1.0-u.x)
        + (d-b)*u.x*u.y;
}


// ------------------------------------------------
// FRESNEL
// ------------------------------------------------

float getFresnel(vec3 normal, vec3 viewDir, float power){
    return pow(1.0 - max(dot(normal,viewDir),0.0), power);
}


// ------------------------------------------------
// TOON LIGHT
// ------------------------------------------------

float getToon(vec3 normal, vec3 lightDir){

    float diffuse = dot(normal,lightDir);

    return smoothstep(0.45,0.55,diffuse)*0.5 + 0.5;

}


// ------------------------------------------------
// ANALOG GRAIN
// ------------------------------------------------

float analogGrain(vec2 uv, float time){

    float g = hash(uv * 400.0 + time);
    g += hash(uv * 900.0 - time * 0.5);

    g *= 0.5;

    return (g - 0.5) * 0.03;
}


// ------------------------------------------------
// CRT SCANLINES
// ------------------------------------------------

float crtScanlines(float y, float time){

    float fine = sin(y * 280.0);
    float coarse = sin(y * 40.0 - time * 1.2);

    float combined = fine * 0.15 + coarse * 0.1;

    return 1.0 - combined;

}


// ------------------------------------------------
// ANALOG FLICKER
// ------------------------------------------------

float analogFlicker(float time){

    float flicker =
        sin(time * 35.0) * 0.01 +
        sin(time * 9.0) * 0.02;

    return 1.0 + flicker;

}


// ------------------------------------------------
// SIGNAL TEAR
// ------------------------------------------------

float signalTear(vec2 uv, float time){

    float band = step(0.96, noise(vec2(time * 2.0, uv.y * 3.0)));

    float offset =
        sin(uv.y * 90.0 + time * 30.0) *
        0.002 *
        band;

    return offset;

}


// ------------------------------------------------
// MAIN
// ------------------------------------------------

void main(){

    vec2 uv = vUv;


    // -----------------------------------------
    // lighting
    // -----------------------------------------

    vec3 lightDirection = normalize(vec3(5.0,5.0,5.0));

    float toon = getToon(vNormal, lightDirection);

    toon = mix(0.7,1.0,toon);


    // -----------------------------------------
    // fresnel (subtle)
    // -----------------------------------------

    vec3 viewDirection =
        normalize(cameraPosition - vWorldPosition);

    float fresnel =
        getFresnel(vNormal, viewDirection, 6.0) * 0.25;


    // -----------------------------------------
    // base color
    // -----------------------------------------

    vec3 baseColor =
        mix(uColor, vec3(1.0), 0.1) * toon;


    // -----------------------------------------
    // atmospheric ground blending
    // -----------------------------------------

    float groundFade =
        smoothstep(-0.15,0.45,vWorldPosition.y);

    float groundDark =
        mix(0.65,1.0,groundFade);


    // -----------------------------------------
    // distance fog
    // -----------------------------------------

    float dist =
        length(cameraPosition - vWorldPosition);

    float fog =
        smoothstep(8.0,28.0,dist);


    // -----------------------------------------
    // final color
    // -----------------------------------------

    vec3 finalColor = baseColor;

    finalColor *= groundDark;

    finalColor += fresnel * uColor * 0.25;

    finalColor = mix(finalColor, vec3(0.0), fog * 0.25);


    // -----------------------------------------
    // statue opacity
    // -----------------------------------------

    float alpha =
        mix(0.9,1.0,fresnel) * uIntro;


    gl_FragColor = vec4(finalColor, alpha);

}