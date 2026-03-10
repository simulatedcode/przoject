float getToon(vec3 normal, vec3 lightDir) {
    float diffuse = dot(normal, lightDir);
    return smoothstep(0.45, 0.55, diffuse) * 0.5 + 0.5;
}

#pragma glslify: export(getToon)
