/**
 * verify-scaffold.ts
 * Direct scaffold verification — bypasses interactive CLI prompts.
 * Usage: npx tsx scripts/verify-scaffold.ts [presetId]
 */

import { existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scaffoldProject } from '../packages/cli/src/scaffold.js'
import { getPreset } from '../packages/core/src/index.js'
import type { ProjectSpec } from '../packages/core/src/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

const presetId = process.argv[2] ?? '3d-immersive'
const outName = `_verify-${presetId}`
const outDir = resolve(REPO_ROOT, outName)

async function main() {
  const preset = getPreset(presetId)
  if (!preset) {
    console.error(`ERROR: preset "${presetId}" not found`)
    process.exit(1)
  }

  const spec: ProjectSpec = {
    brand: 'Apex Labs',
    purpose: 'AI-native infrastructure for the next generation of software.',
    presetId,
    valueProps: ['Intelligence', 'Velocity', 'Reliability'],
    cta: 'Request Early Access',
    notes: '',
  }

  // Clean previous run
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true })

  console.log(`\nScaffolding "${spec.brand}" with preset "${presetId}" → ${outName}/`)
  mkdirSync(outDir, { recursive: true })

  try {
    await scaffoldProject(outDir, spec, preset)
    console.log('✓ Scaffold complete\n')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('✗ Scaffold failed:', msg)
    if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true })
    process.exit(1)
  }

  // Required files differ by template
  const baseRequired = [
    'package.json',
    'index.html',
    'vite.config.js',
    'tailwind.config.js',
    'src/App.jsx',
    'src/main.jsx',
    'src/index.css',
  ]

  const threeFiberRequired = [
    ...baseRequired,
    'src/context/SceneContext.jsx',
    'src/components/Scene.jsx',
    'src/components/CameraRig.jsx',
    'src/components/NetworkGraph.jsx',
    'src/components/ParticleSystem.jsx',
    'src/components/SocialProofBillboards.jsx',
    'src/sections/Navbar.jsx',
    'src/sections/Hero.jsx',
    'src/sections/HowItWorks.jsx',
    'src/sections/SocialProof.jsx',
    'src/sections/CTA.jsx',
    'src/sections/ValueProps.jsx',
  ]

  const requiredFiles = preset.template === 'three-fiber' ? threeFiberRequired : baseRequired

  let allOk = true
  for (const f of requiredFiles) {
    const p = resolve(outDir, f)
    if (!existsSync(p)) {
      console.error(`  MISSING: ${f}`)
      allOk = false
    } else {
      console.log(`  ✓ ${f}`)
    }
  }

  if (!allOk) {
    console.error('\n✗ Missing required files — check scaffold output above')
    rmSync(outDir, { recursive: true, force: true })
    process.exit(1)
  }

  // Verify token replacement — no {{...}} should remain
  const tokenPattern = /\{\{[^}]+\}\}/g
  let tokenLeaks = 0

  for (const f of requiredFiles) {
    const content = readFileSync(resolve(outDir, f), 'utf-8')
    const leaks = content.match(tokenPattern)
    if (leaks) {
      const unique = [...new Set(leaks)]
      console.error(`  TOKEN LEAK in ${f}: ${unique.join(', ')}`)
      tokenLeaks++
    }
  }

  if (tokenLeaks > 0) {
    console.error(`\n✗ ${tokenLeaks} file(s) have unreplaced tokens`)
    rmSync(outDir, { recursive: true, force: true })
    process.exit(1)
  }

  console.log('\n✓ All files present')
  console.log('✓ No token leaks')
  console.log('\nCleaning up...')
  rmSync(outDir, { recursive: true, force: true })
  console.log('✓ Done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
