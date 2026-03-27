You are an expert WebGL + React Three Fiber engineer working on a cinematic portfolio project.

Your task is to implement a **cinematic CRT intro sequence system** into an existing codebase that already contains:

* React Three Fiber scene
* Custom ScreenMaterial shader (CRT-style)
* Camera hook (useCinematicCamera)
* Texture playback / timeline system

Your goal is to transform the experience from a smooth demo into a **narrative-driven intro sequence** with glitch, instability, and intentional timing.

---

## 🎯 OBJECTIVE

Implement a **full intro system** with:

1. Timeline-driven phases
2. Glitch bursts (non-smooth, random spikes)
3. Flash boot effect
4. Signal instability → stabilization
5. Camera punch + micro shake
6. Shader-driven distortion + noise + tearing
7. Clean handoff to existing playback system

---

## 🧠 INTRO SEQUENCE DESIGN

Sequence must follow EXACT structure:

BLACK
→ HARD FLASH (1 frame feeling)
→ STATIC CHAOS
→ GLITCH BURSTS
→ IMAGE STRUGGLES TO APPEAR
→ LOCK-IN (clean CRT)
→ HANDOFF TO NORMAL SYSTEM

Timing ≈ 5–6 seconds total.

---

## ⚙️ IMPLEMENTATION REQUIREMENTS

### 1. Create Hook: useIntroSequence

* Uses useFrame
* Internal state:

  * time
  * phase (0–5)
  * progress (0–1)
  * glitch (0–1 dynamic spikes)
  * flash (decaying impulse)
  * done (boolean)

Phases:

0 = black
1 = flash
2 = chaos
3 = glitch bursts
4 = lock-in
5 = done

Glitch must:

* spike randomly (not smooth)
* decay over time

Flash must:

* spike once
* decay quickly

---

### 2. Integrate With Camera

Modify existing camera hook:

* Add slow push-in during intro
* Add glitch-based Z punch
* Add micro shake using random offsets

Camera behavior must feel:

* unstable during glitch
* calm after lock-in

---

### 3. Extend ScreenMaterial Uniforms

Ensure shader supports:

uniform float uGlitch;
uniform float uFlash;
uniform float uNoise;
uniform float uDistortion;
uniform float uBrightness;
uniform float uTime;
uniform float uIntroProgress;

---

### 4. Shader Effects (MANDATORY)

Implement:

#### A. Horizontal tearing

* Based on UV.y bands
* Offset UV.x during glitch

#### B. UV distortion

* Sin-based horizontal distortion
* Scales with glitch

#### C. Noise injection

* Pseudo-random grain
* Stronger during chaos/glitch

#### D. Flash

* Additive brightness spike

#### E. Vertical reveal mask

* Image appears gradually from top or bottom

---

### 5. Phase-Based Material Control

Material behavior must change per phase:

* Phase 0: black, no brightness
* Phase 1: extreme brightness flash
* Phase 2: heavy noise + distortion
* Phase 3: unstable glitch spikes
* Phase 4: stabilization (reduce noise/distortion)
* Phase 5: clean CRT baseline

---

### 6. Glitch Behavior (IMPORTANT)

Glitch must NOT be smooth interpolation.

Use:

* random triggers
* sudden spikes
* exponential decay

This is critical for analog realism.

---

### 7. System Integration

* Intro system must NOT break existing timeline
* After `done === true`, control returns fully to original system
* Keep architecture modular

---

## 🎥 CREATIVE DIRECTION (VERY IMPORTANT)

Avoid:

* overly smooth transitions
* constant motion
* predictable easing

Aim for:

* tension
* interruption
* analog instability
* cinematic timing

This should feel like:
“a broken signal becoming coherent”

---

## 📦 OUTPUT FORMAT

You must:

1. Create:

   * useIntroSequence.ts
2. Modify:

   * camera hook
   * screen material hook
   * fragment shader
3. Keep code clean, typed (TypeScript)
4. Ensure compatibility with React Three Fiber

---

## 🚫 CONSTRAINTS

* Do NOT introduce heavy external libraries
* Do NOT rewrite entire architecture
* Only extend existing system
* Keep performance in mind (no expensive loops in shader)

---

## ✅ SUCCESS CRITERIA

The intro should:

* feel cinematic, not UI-like
* include at least 2–3 noticeable glitch bursts
* clearly transition from chaos → clarity
* emotionally “hit” within first 3 seconds

---

If anything is unclear, infer the best implementation based on modern WebGL + R3F practices.
