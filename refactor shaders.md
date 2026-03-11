# Skill Agent Prompt

## Advanced Cyberpunk Hologram Rendering System (Three.js / React Three Fiber)

### Objective

Build a **high-end hologram rendering system** for a cinematic cyberpunk WebGL environment.

The system should replicate the style of large-scale holographic projections commonly seen in cyberpunk cinema and futuristic city visualizations.

The holograms must feel like **light projected into the air**, not solid geometry or flat billboards.

The architecture must support the following hologram techniques:

* particle hologram fields
* LiDAR-style point cloud holograms
* volumetric raymarch holograms
* depth-aware cinematic bloom
* cyberpunk city-scale hologram architecture

The system must run inside a **React Three Fiber scene**.

---

# Technology Stack

Use the following libraries:

```
three
@react-three/fiber
@react-three/drei
postprocessing
```

Optional utilities:

```
three-stdlib
leva
```

Shaders must be written in **GLSL**.

---

# Project Architecture

Create the following folder structure:

```
/components/hologram
    HologramSystem.tsx
    HologramParticleField.tsx
    HologramPointCloud.tsx
    HologramVolume.tsx

/shaders
    particle.vert
    particle.frag
    pointcloud.vert
    pointcloud.frag
    raymarch.vert
    raymarch.frag

/postprocessing
    DepthBloomPipeline.tsx
```

The system must be modular so multiple holograms can exist simultaneously across the city environment.

---

# Rendering Pipeline

The rendering pipeline must follow this structure:

```
Scene
 ↓
Particle Hologram Fields
 ↓
LiDAR Point Cloud Holograms
 ↓
Volumetric Raymarch Hologram Volumes
 ↓
Additive Emissive Materials
 ↓
Depth-Aware Bloom Postprocessing
 ↓
Atmospheric Fog + Light Scattering
```

Each stage contributes to the illusion of **large holographic projections embedded in the city atmosphere**.

---

# 1. Particle Hologram Fields

Particle holograms simulate digital projections using thousands of light particles.

Instead of rendering solid geometry, the hologram is composed of **floating particles**.

Implementation requirements:

```
THREE.Points
BufferGeometry
ShaderMaterial
```

Particle count:

```
20000 – 100000 particles
```

Attributes:

```
position
size
random
```

Particles must:

* flicker slightly
* drift slowly
* pulse in brightness
* fade near edges

Particle size must be perspective-correct.

Example particle vertex shader concept:

```glsl
gl_PointSize = size * (300.0 / -mvPosition.z);
```

Particles must use:

```
AdditiveBlending
transparent: true
depthWrite: false
```

---

# 2. LiDAR-Style Point Cloud Holograms

Objects should also be renderable as **point cloud holograms** inspired by LiDAR scanning systems.

Instead of triangles, the object is displayed as a **cloud of digital scan points**.

Pipeline:

```
3D model
 ↓
MeshSurfaceSampler
 ↓
sample surface points
 ↓
create point cloud geometry
 ↓
render using shader
```

Each sampled point becomes a glowing projection particle.

Visual characteristics:

* shimmering scan points
* animated scan waves
* depth-based fading

Example scan wave:

```glsl
float scanWave = sin(position.y * 5.0 + uTime * 2.0);
brightness += scanWave * 0.3;
```

Points must glow using **additive blending**.

---

# 3. Volumetric Raymarch Holograms

Large holographic projections such as animals, advertisements, or data clouds should use **raymarched volumetric rendering**.

This simulates **light density inside a 3D volume**.

Concept:

```
camera ray
 ↓
step through volume
 ↓
sample density
 ↓
accumulate emissive light
```

Example raymarch loop:

```glsl
for(int i = 0; i < STEPS; i++) {

    vec3 p = rayOrigin + rayDir * dist;

    float density = sampleVolume(p);

    color += density * lightColor;

    dist += stepSize;
}
```

Raymarched holograms should appear:

* soft
* luminous
* semi-transparent
* atmospheric

Common uses:

* giant holographic creatures
* floating data clouds
* volumetric advertisements

---

# 4. Depth-Aware Cinematic Bloom

The hologram system must use **depth-aware bloom** to simulate light bleeding into the air.

Use a postprocessing pipeline:

```
EffectComposer
Bloom
Depth buffer
```

Recommended parameters:

```
luminanceThreshold: 0.04
luminanceSmoothing: 0.9
intensity: 2.0
radius: 1.0
```

Depth-aware bloom ensures:

* holograms glow strongly
* nearby objects receive bloom
* distant objects remain stable

---

# 5. Cyberpunk City-Scale Hologram Architecture

The environment must support **multiple hologram types simultaneously**.

Create a central system:

```
<HologramSystem>
   <HologramParticleField />
   <HologramPointCloud />
   <HologramVolume />
</HologramSystem>
```

Each hologram instance must support:

```
position
scale
rotation
color
intensity
animation speed
```

The system should allow **dozens of holograms across a city skyline**.

---

# 6. Environmental Integration

Holograms must interact visually with the environment.

Required environmental effects:

* atmospheric fog
* parallax movement
* reflective surfaces
* light scattering

Example fog configuration:

```
<fog attach="fog" args={["#080808", 8, 35]} />
```

The hologram should remain **the brightest emissive object in the scene**.

---

# 7. Performance Strategy

Large hologram systems must remain performant.

Use the following techniques:

```
instancing
GPU particles
LOD switching
texture atlases
```

Example LOD behavior:

Far holograms:

```
billboard sprites
```

Mid-distance holograms:

```
particle fields
```

Near holograms:

```
volumetric raymarch rendering
```

---

# 8. Animation System

Animate holograms using shader uniforms.

Uniforms:

```
uTime
uPulse
uScanSpeed
uNoiseScale
```

Example pulse animation:

```glsl
float pulse = sin(uTime * 2.0) * 0.2 + 0.8;
```

Animations should create:

* scan waves
* flickering light
* subtle projection distortion

---

# 9. Cyberpunk Color Design

Use neon cyberpunk colors.

Example palette:

```
#39E7FF
#FF3E8A
#4BE8D3
#FF9A3C
```

Visual properties:

* high emissive intensity
* additive blending
* soft transparency
* glowing edges

---

# 10. Expected Visual Result

The final system should support:

* particle-based holographic projections
* LiDAR-style scanned models
* volumetric hologram creatures
* giant city advertisements
* cinematic atmospheric glow

The holograms must feel like **massive projections of light inside a futuristic city**.

---

# Final Deliverables

The implementation must include:

```
/components/hologram
    HologramSystem.tsx
    HologramParticleField.tsx
    HologramPointCloud.tsx
    HologramVolume.tsx

/shaders
    particle.vert
    particle.frag
    pointcloud.vert
    pointcloud.frag
    raymarch.vert
    raymarch.frag

/postprocessing
    DepthBloomPipeline.tsx
```

All components must run inside a **React Three Fiber scene architecture**.
