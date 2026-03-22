# AGENTS.md

This file provides guidelines and instructions for agentic coding assistants operating in this repository.

## Project Overview

This is a Next.js 16 + React 19 WebGL project featuring:
- 3D rendering with React Three Fiber/Drei
- Scroll-driven animations with GSAP and Lenis
- State management with Zustand
- Tailwind CSS v4 styling

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Production
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint (eslint-config-next with types)
```

### Running a Single Test

No test framework is currently configured. If adding tests, use:
```bash
# Vitest (recommended for this stack)
npx vitest run src/specific/test.file.ts

# Jest
npx jest src/specific/test.file.ts
```

## Code Style Guidelines

### General Conventions

- **Language**: TypeScript (strict mode enabled)
- **File Extensions**: `.tsx` for React components, `.ts` for utilities/types
- **Path Alias**: Use `@/*` to import from `./src/*`
- **Component Pattern**: Client components use `'use client'` directive

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CameraRig.tsx`, `HeroText.tsx` |
| Utilities/Hooks | camelCase | `useScrollRig.ts`, `gsap.ts` |
| State stores | camelCase | `useWebGLStore.ts` |
| Types/Interfaces | PascalCase | `WebGLState`, `AssetRegistry` |
| CSS Classes | kebab-case | `hero-wrap`, `scroll-container` |
| CSS Variables | kebab-case | `--primary-500`, `--bg-main` |

### TypeScript

- Use explicit TypeScript types; avoid `any`
- Prefer interfaces for object shapes
- Use type imports for types only: `import type { SomeType } from 'module'`
- Store state interfaces define both shape and methods:

```typescript
export interface WebGLState {
    progress: number
    setProgress: (progress: number) => void
    // ...
}
```

### React Components

- Default export for page/component files
- Named exports for utility hooks and classes
- Use `use client` directive for all client-side components
- Prefer `useMemo` and `useCallback` for expensive computations and callbacks
- Wrap async operations in `useEffect` with proper cleanup

### Imports

- Group imports: 1) React, 2) external libs, 3) internal ( `@/` ), 4) relative
- Use `import` for side-effects and values, `import type` for types only
- Use path aliases (`@/`) for src imports

### CSS/Tailwind

- Tailwind CSS v4 with `@import "tailwindcss"`
- Define custom properties in `:root` for theming
- Use `@theme inline` to expose CSS vars to Tailwind
- Use arbitrary values sparingly; prefer custom properties
- Utility classes for layout/styling; CSS variables for theming

### State Management (Zustand)

- Single store file: `src/store/useWebGLStore.ts`
- Define interface with all state and methods
- Use `create<InterfaceName>` for type safety
- Select specific state slices: `useStore((s) => s.property)`

### WebGL/Three.js

- Use `@react-three/fiber` for React integration
- Leva for runtime parameter controls during development
- Preload assets with `useGLTF.preload()` and `useTexture.preload()`
- Use `useFrame` for animation loops
- Use `Suspense` with `fallback={null}` for async loading

### Error Handling

- Wrap WebGL operations in try/catch with fallback values
- Check for null/undefined in refs before operations
- Handle SSR safely: check `typeof window !== 'undefined'`
- Use `prefer-reduced-motion` media query for animations

### Formatting

- 4-space indentation
- Single quotes for JSX attributes and string literals
- Trailing commas in multi-line objects/arrays
- No semicolons in JS/TS files
- Max line length: 120 characters (soft)
