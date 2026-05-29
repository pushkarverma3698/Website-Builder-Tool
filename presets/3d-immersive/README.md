# 3D Immersive — WebGL / Three.js

**Identity:** Full 3D canvas environment. The page IS a 3D world — scroll drives the camera.

## Stack
- React Three Fiber + Drei
- GSAP ScrollTrigger
- Lenis smooth scroll

## Build System
Full build instructions live in `prompts/3d-immersive/3d-website-builder.md`.

## Reference Build
See `examples/turicks-3d/` for a complete, working implementation (Turicks AI agent demo).

## Template
Uses `templates/three-fiber/` (parameterized from the reference build).

## Key Dependencies

| Package | Version |
|---------|---------|
| `@react-three/fiber` | ^8.0.0 |
| `@react-three/drei` | ^9.0.0 |
| `three` | ^0.163.0 |
| `gsap` | ^3.12.0 |
| `@studio-freight/lenis` | ^1.0.0 |

## Note
This preset uses the `three-fiber` template — not the standard `base-react` template. Token substitution is the same; the component architecture differs significantly from presets A–E.
