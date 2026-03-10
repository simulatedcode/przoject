float getScanline(float y, float time, float speed, float density) {
    return sin(y * density - time * speed) * 0.1 + 0.9;
}

#pragma glslify: export(getScanline)
