/**
 * verify-scaffold.mjs
 * Direct scaffold verification — bypasses interactive CLI prompts.
 * Imports directly from built dist files to avoid ESM/CJS resolution issues.
 * Usage: node scripts/verify-scaffold.mjs [presetId]
 */

import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync, readdirSync, cpSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

// Import core from built dist using explicit file URL
const coreDist = new URL(`../packages/core/dist/index.js`, import.meta.url)
const { getPreset, tokenReplace } = await import(coreDist)

const presetId = process.argv[2] ?? '3d-immersive'
const outName = `_verify-${presetId}`
const outDir = resolve(REPO_ROOT, outName)

async function main() {
  const preset = getPreset(presetId)
  if (!preset) {
    console.error(`ERROR: preset "${presetId}" not found`)
    process.exit(1)
  }

  const spec = {
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

  // --- Inline scaffold logic (mirrors packages/cli/src/scaffold.ts) ---
  const templateName = preset.template === 'three-fiber' ? 'three-fiber' : 'base-react'
  const templateDir = join(REPO_ROOT, 'templates', templateName)

  if (!existsSync(templateDir)) {
    console.error(`ERROR: template dir not found: ${templateDir}`)
    process.exit(1)
  }

  // Recursive copy using Node.js built-in cpSync (v16+)
  cpSync(templateDir, outDir, {
    recursive: true,
    filter: (src) => {
      const rel = relative(templateDir, src)
      return !rel.startsWith('node_modules') && !rel.startsWith('dist')
    },
  })

  // Token map (mirrors packages/cli/src/tokens.ts)
  const brandSlug = spec.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const tokenMap = {
    brand: spec.brand,
    'brand-slug': brandSlug,
    purpose: spec.purpose,
    cta: spec.cta,
    notes: spec.notes,
    presetId: preset.id,
    heroLine1: spec.purpose.split(' ').slice(0, 4).join(' '),
    heroLine2: spec.brand,
    valueProp0: spec.valueProps[0],
    valueProp1: spec.valueProps[1],
    valueProp2: spec.valueProps[2],
    manifesto: `${spec.purpose} We believe the future belongs to those who move with precision, clarity, and intention.`,
    protocolStep0Title: `Understand ${spec.valueProps[0]}`,
    protocolStep0Desc: `We begin with a deep analysis of your current state — mapping every signal, every gap, every opportunity hidden in your data.`,
    protocolStep1Title: `Activate ${spec.valueProps[1]}`,
    protocolStep1Desc: `Our system processes your inputs and delivers a tailored protocol built specifically for your context and objectives.`,
    protocolStep2Title: `Deliver ${spec.valueProps[2]}`,
    protocolStep2Desc: `Results are delivered in real time with full transparency — measurable, verifiable, and ready to act on.`,
    unsplashPhotoId: '1518770660439-4636190af475',
    'preset.name': preset.name,
    'preset.id': preset.id,
    googleFonts: preset.googleFonts,
    'palette.primary': preset.palette.primary,
    'palette.accent': preset.palette.accent,
    'palette.background': preset.palette.background,
    'palette.dark': preset.palette.dark,
    'typography.heading0': preset.typography.heading[0] ?? '',
    'typography.heading1': preset.typography.heading[1] ?? '',
    'typography.drama': preset.typography.drama ?? '',
    'typography.data': preset.typography.data ?? '',
  }

  // Token replacement
  const TEXT_EXTS = new Set(['.html', '.css', '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.txt'])
  function replaceTokensInDir(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        replaceTokensInDir(fullPath)
      } else if (entry.isFile()) {
        const ext = '.' + (entry.name.split('.').pop() ?? '')
        if (!TEXT_EXTS.has(ext)) continue
        try {
          const original = readFileSync(fullPath, 'utf-8')
          const replaced = tokenReplace(original, tokenMap)
          if (replaced !== original) writeFileSync(fullPath, replaced, 'utf-8')
        } catch { /* skip binary */ }
      }
    }
  }

  replaceTokensInDir(outDir)
  console.log('✓ Scaffold complete\n')

  // --- Verify required files ---
  const baseRequired = [
    'package.json', 'index.html', 'vite.config.js', 'tailwind.config.js',
    'src/App.jsx', 'src/main.jsx', 'src/index.css',
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
    if (!existsSync(resolve(outDir, f))) {
      console.error(`  MISSING: ${f}`)
      allOk = false
    } else {
      console.log(`  ✓ ${f}`)
    }
  }

  if (!allOk) {
    console.error('\n✗ Missing required files')
    rmSync(outDir, { recursive: true, force: true })
    process.exit(1)
  }

  // --- Check for token leaks ---
  // Only flag real template tokens (identifiers, not JSX object literals like {{ key: val }})
  const tokenPattern = /\{\{[\w.\-]+\}\}/g
  let tokenLeaks = 0

  for (const f of requiredFiles) {
    const content = readFileSync(resolve(outDir, f), 'utf-8')
    const leaks = content.match(tokenPattern)
    if (leaks) {
      const unique = [...new Set(leaks)]
      console.error(`\n  TOKEN LEAK in ${f}: ${unique.join(', ')}`)
      tokenLeaks++
    }
  }

  if (tokenLeaks > 0) {
    console.error(`\n✗ ${tokenLeaks} file(s) have unreplaced tokens`)
    console.log(`Scaffolded dir left at: ${outDir}  (not cleaned — inspect manually)`)
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
