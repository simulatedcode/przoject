float getScanline(float y, float time, float speed, float density) {
    float line = sin(y * density - time * speed);
    return line * 0.1 + 0.9;
}

float getJitteredScanline(float y, float time, float noiseVal) {
    float scanline = sin(y * 150.0 - time * 10.0 + noiseVal * 2.0);
    return smoothstep(0.0, 0.1, scanline) * 0.2 + 0.8;
}

#pragma glslify: export(getScanline)
#pragma glslify: export(getJitteredScanline)
