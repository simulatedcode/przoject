# Hero Section Creation Guide

## Portfolio Website Next.js + GSAP

Overview
This document defines the step by step process to create a fullscreen hero section for a portfolio website. The hero must be immersive, minimal, and performance focused.

1. Define Objective

The hero section must:

* Introduce the artist or studio clearly.
* Create strong visual impact in the first 5 seconds.
* Support motion without sacrificing performance.
* Work smoothly on desktop and mobile.

2. Define Structure

Create a fullscreen section.

Structure hierarchy:

section.hero

* div.hero_wrapper

  * div.hero_background
  * div.hero_content

Requirements:

* hero height: 100vh
* overflow-x: hidden
* hero_wrapper: position relative
* hero_background: position absolute, full width and height
* hero_content: position relative, above background

3. Define Layout Rules

* Center content vertically and horizontally.
* Limit text width for readability.
* Use clamp() for responsive typography.
* Maintain strong contrast between text and background.

Example layout logic:

* Headline large and dominant.
* Supporting text smaller.
* Optional small label above headline.

4. Typography System

Headline rules:

* Responsive size using clamp.
* Bold weight.
* Tight line height.

Subtext rules:

* Smaller size.
* Controlled max-width.
* Balanced spacing below headline.

5. Background Layer

Option A. Minimal animated background

* Use gradient or texture.
* Add subtle scale or rotation animation.
* Keep animation duration slow, 8 to 15 seconds loop.
* Avoid heavy filters.

Option B. Three.js background

* Use a lightweight 3D object.
* Keep polygon count low.
* Slow continuous rotation.
* Disable complex interaction on mobile.

6. Entrance Animation

Use GSAP for controlled entrance.

Animation sequence:

* Headline moves from y 40px to 0.
* Opacity from 0 to 1.
* Stagger lines slightly.
* Duration under 1.2 seconds.
* Ease should feel smooth and controlled.

Animation must run once on initial load.

7. Scroll Interaction

Use ScrollTrigger carefully.

Scroll behavior:

* Fade headline slightly on scroll.
* Scale background subtly.
* Avoid strong parallax shifts.
* Do not break natural scrolling.

No aggressive pinning for hero unless concept demands it.

8. Performance Strategy

* Lazy load heavy 3D or video.
* Avoid layout shifts.
* Test on mid-range mobile device.
* Keep animation GPU friendly.

Target:

* Smooth 60fps scrolling.
* Good Lighthouse performance score.

9. Accessibility

* Use semantic h1 for headline.
* Ensure readable contrast.
* Respect prefers-reduced-motion.
* Text must remain visible without animation.

10. Brand Integration

Hero must reflect identity.

For an artist or studio:

* Add subtle texture referencing process.
* Keep composition clean.
* Avoid visual noise.
* Ensure name or studio identity is clearly readable.

Completion Checklist

Before finalizing hero section:

* Layout stable.
* Animations smooth.
* Mobile responsive.
* No console errors.
* No scroll glitches.
* Identity clearly communicated.
