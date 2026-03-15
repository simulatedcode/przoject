Act as a senior real-time rendering engineer from a AAA interactive studio (Active Theory, Resn, Immersive Garden).

Analyze this repository and design a migration plan to transform it into a **production-grade WebGL architecture**.

Repository:
https://github.com/simulatedcode/przoject

Tech stack:

* Next.js (App Router)
* React Three Fiber
* Three.js
* TypeScript
* TailwindCSS
* GSAP
* Lenis
* Postprocessing

Goal:
Refactor the project into a **modular AAA WebGL structure** used in professional interactive websites.

Tasks:

1. Analyze the current repository structure and identify architectural problems.

2. Design a clean WebGL architecture separating:

   * UI layer
   * WebGL engine
   * scene systems
   * materials
   * shaders
   * postprocessing

3. Convert shaders embedded in `.tsx` files into modular GLSL files:

```
shaders/
  effect.vert
  effect.frag
```

4. Design a scalable folder structure:

```
src/
  webgl/
    core/
    camera/
    lighting/
    world/
    materials/
    shaders/
    effects/
    systems/
    utils/
  ui/
  hooks/
```

5. Create a clean rendering pipeline:

Renderer
→ SceneManager
→ World
→ PostProcessing

6. Refactor scene logic into reusable systems:

* CameraRig
* LightingSystem
* Environment
* Models

7. Provide examples for:

* GLSL shader integration
* ShaderMaterial setup
* Postprocessing pipeline
* Lighting architecture

Constraints:

* Maintain React Three Fiber compatibility
* Use external GLSL shader files
* Follow production WebGL architecture
* Optimize for real-time performance

Output:

* Proposed folder structure
* Migration strategy
* Example refactored files
* Best practices for AAA WebGL projects


Analyze the entire repository structure before generating the migration plan.
Read all WebGL related files including:
- CanvasRoot
- CameraRig
- Lighting systems
- Model loaders
- Postprocessing effects