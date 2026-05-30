import { existsSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import { listPresets, getPreset } from '@cinematic/core'
import type { ProjectSpec } from '@cinematic/core'
import { loadSpec, saveSpec } from '../spec.js'
import { scaffoldProject } from '../scaffold.js'

// Assets dir: dist/cli.js → packages/cli/ → assets/ (copied at build time by copy-assets.mjs)
const ASSETS_DIR = resolve(fileURLToPath(import.meta.url), '..', '..', 'assets')
const PRESETS_DIR = join(ASSETS_DIR, 'presets')

export async function runCreate(name?: string): Promise<void> {
  p.intro(`${pc.bgCyan(pc.black(' cinematic-web '))} ${pc.dim('create')}`)

  // --- Determine project directory ---
  let projectName = name
  if (!projectName) {
    const input = await p.text({
      message: 'Project name',
      placeholder: 'my-landing-page',
      validate: (v) => (v.trim().length === 0 ? 'Project name is required' : undefined),
    })
    if (p.isCancel(input)) { p.cancel('Cancelled.'); process.exit(0) }
    projectName = (input as string).trim()
  }

  const outputDir = resolve(process.cwd(), projectName)
  if (existsSync(outputDir)) {
    p.cancel(`Directory ${pc.cyan(projectName)} already exists.`)
    process.exit(1)
  }

  // --- Check for existing cinematic.json (pre-filled by `think`) ---
  const existingSpec = loadSpec(process.cwd())
  const presets = listPresets(PRESETS_DIR)

  if (presets.length === 0) {
    p.cancel('No presets found. Make sure you\'re running from the cinematic-web repo root or install the package.')
    process.exit(1)
  }

  // --- 6 questions ---
  const brand = await p.text({
    message: 'Brand name and one-line purpose?',
    placeholder: 'Nura Health — precision longevity medicine',
    initialValue: existingSpec ? `${existingSpec.brand} — ${existingSpec.purpose}` : '',
    validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
  })
  if (p.isCancel(brand)) { p.cancel('Cancelled.'); process.exit(0) }

  // Parse "Brand — purpose" or just brand name
  const brandStr = brand as string
  const dashIdx = brandStr.indexOf(' — ')
  const parsedBrand = dashIdx > -1 ? brandStr.slice(0, dashIdx).trim() : brandStr.trim()
  const parsedPurpose = dashIdx > -1 ? brandStr.slice(dashIdx + 3).trim() : ''

  let purpose = parsedPurpose
  if (!purpose) {
    const purposeInput = await p.text({
      message: 'One-line purpose?',
      placeholder: 'Precision longevity medicine powered by biological data.',
      validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
    })
    if (p.isCancel(purposeInput)) { p.cancel('Cancelled.'); process.exit(0) }
    purpose = (purposeInput as string).trim()
  }

  const presetChoice = await p.select({
    message: 'Pick an aesthetic direction',
    options: presets.map((preset) => ({
      value: preset.id,
      label: `${preset.name} — ${preset.label}`,
      hint: preset.identity,
    })),
    initialValue: existingSpec?.presetId ?? presets[0]?.id,
  })
  if (p.isCancel(presetChoice)) { p.cancel('Cancelled.'); process.exit(0) }

  const vp0 = await p.text({
    message: 'Value proposition 1 of 3',
    placeholder: 'Telemetry',
    initialValue: existingSpec?.valueProps[0] ?? '',
    validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
  })
  if (p.isCancel(vp0)) { p.cancel('Cancelled.'); process.exit(0) }

  const vp1 = await p.text({
    message: 'Value proposition 2 of 3',
    placeholder: 'Protocol',
    initialValue: existingSpec?.valueProps[1] ?? '',
    validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
  })
  if (p.isCancel(vp1)) { p.cancel('Cancelled.'); process.exit(0) }

  const vp2 = await p.text({
    message: 'Value proposition 3 of 3',
    placeholder: 'Outcomes',
    initialValue: existingSpec?.valueProps[2] ?? '',
    validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
  })
  if (p.isCancel(vp2)) { p.cancel('Cancelled.'); process.exit(0) }

  const cta = await p.text({
    message: 'Primary CTA text?',
    placeholder: 'Book a consultation',
    initialValue: existingSpec?.cta ?? '',
    validate: (v) => (v.trim().length === 0 ? 'Required' : undefined),
  })
  if (p.isCancel(cta)) { p.cancel('Cancelled.'); process.exit(0) }

  const notes = await p.text({
    message: 'Special requests or custom features? (optional)',
    placeholder: 'Add a 3D hero, custom animations...',
    initialValue: existingSpec?.notes ?? '',
  })
  if (p.isCancel(notes)) { p.cancel('Cancelled.'); process.exit(0) }

  // --- Build spec ---
  const spec: ProjectSpec = {
    brand: parsedBrand,
    purpose,
    presetId: presetChoice as string,
    valueProps: [
      (vp0 as string).trim(),
      (vp1 as string).trim(),
      (vp2 as string).trim(),
    ],
    cta: (cta as string).trim(),
    notes: ((notes as string) ?? '').trim(),
  }

  const preset = getPreset(spec.presetId, PRESETS_DIR)
  if (!preset) {
    p.cancel(`Preset "${spec.presetId}" not found.`)
    process.exit(1)
  }

  // --- Scaffold ---
  const spinner = p.spinner()
  spinner.start(`Scaffolding ${pc.cyan(parsedBrand)} with ${pc.cyan(preset.name)}...`)

  mkdirSync(outputDir, { recursive: true })

  try {
    await scaffoldProject(outputDir, spec, preset)
    // Write cinematic.json into the new project
    saveSpec(spec, outputDir)
    spinner.stop(`${pc.green('✓')} Scaffolded ${pc.cyan(projectName)}`)
  } catch (err) {
    spinner.stop(`${pc.red('✗')} Scaffold failed`)
    throw err
  }

  // --- Done ---
  p.note(
    [
      `cd ${projectName}`,
      'npm install',
      'npm run dev',
    ].join('\n'),
    'Next steps'
  )

  if (preset.id === '3d-immersive') {
    p.note(
      `You selected the 3D Immersive preset.\nFull build instructions: ${pc.cyan('prompts/3d-immersive/3d-website-builder.md')}`,
      '3D Notes'
    )
  }

  p.outro(`${pc.green('Done!')} Your cinematic site is ready at ${pc.cyan(projectName)}/`)
}
