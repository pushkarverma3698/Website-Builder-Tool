# 3D Web Development Resources

> Curated resources for building immersive 3D websites. Sourced from [devanshutak25/3d-resources](https://github.com/devanshutak25/3d-resources) and focused specifically on web use cases.

---

## Core Libraries for 3D Web

| Library | Use Case | Link |
|---------|----------|------|
| Three.js | Core WebGL renderer | https://threejs.org |
| React Three Fiber | React renderer for Three.js | https://docs.pmnd.rs/react-three-fiber |
| @react-three/drei | Useful R3F abstractions | https://github.com/pmndrs/drei |
| @react-three/postprocessing | Visual effects (bloom, DOF) | https://github.com/pmndrs/react-postprocessing |
| @react-three/rapier | Physics engine | https://github.com/pmndrs/react-three-rapier |
| Lenis | Smooth scroll + scroll driver | https://lenis.darkroom.engineering |
| GSAP + ScrollTrigger | Animation + scroll sync | https://greensock.com/scrolltrigger |
| Theatre.js | Visual animation editor | https://www.theatrejs.com |
| Spline | 3D design → embed | https://spline.design |

---

## Free 3D Assets for Web

### GLTF/GLB Models (web-optimized)
- **Sketchfab** — https://sketchfab.com/features/free-3d-models (free tier, download as GLTF)
- **Poly Haven** — https://polyhaven.com/models (CC0, production-ready)
- **KhronosGroup Samples** — https://github.com/KhronosGroup/glTF-Sample-Models
- **Quaternius** — https://quaternius.com (low-poly, game-ready, CC0)

### HDRIs (environment lighting)
- **Poly Haven HDRIs** — https://polyhaven.com/hdris (CC0, free)
- **HDRI Haven** — https://hdrihaven.com

### Textures (PBR)
- **Poly Haven Textures** — https://polyhaven.com/textures (CC0)
- **ambientCG** — https://ambientcg.com (CC0 PBR materials)
- **3dtextures.me** — https://3dtextures.me (free PBR)

---

## Shader & Visual Effects

- **Shadertoy** — https://shadertoy.com (GLSL inspiration)
- **lygia shader library** — https://lygia.xyz (reusable GLSL functions)
- **Three.js examples** — https://threejs.org/examples (official demos with source)
- **Bruno Simon's Three.js Journey** — https://threejs-journey.com (best course)

---

## Inspiration & References

- **Awwwards** 3D sites — https://www.awwwards.com/websites/three-js
- **Bruno Simon portfolio** — https://bruno-simon.com (the gold standard)
- **Lusion** — https://lusion.co
- **Active Theory** — https://activetheory.net
- **Immersive Garden** — https://immersive-g.com

---

## Tools for Optimization

| Tool | Purpose |
|------|---------|
| gltf-transform | Compress/optimize GLTF files |
| draco3dgltf | Geometry compression |
| @gltf-transform/cli | CLI for batch optimization |
| Basis Universal | KTX2 texture compression |
| meshopt | Mesh optimizer |

```bash
# Optimize a GLTF for web
npx gltf-transform optimize model.glb model-opt.glb --compress draco
```

---

## Attribution

3D resources list curated from [devanshutak25/3d-resources](https://github.com/devanshutak25/3d-resources) (CC0 License). Full list at https://3d.devanshutak.xyz
