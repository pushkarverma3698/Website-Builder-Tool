import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve the monorepo root from the bundled dist file.
// packages/core/dist/index.js → 4 levels up → repo root
const REPO_ROOT = resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..')

/**
 * A fully parsed preset.json — design tokens for one aesthetic direction.
 */
export interface Preset {
  id: string
  name: string
  label: string
  template: 'base-react' | 'three-fiber'
  identity: string
  palette: {
    primary: string
    accent: string
    background: string
    dark: string
    primaryLabel: string
    accentLabel: string
    backgroundLabel: string
    darkLabel: string
  }
  typography: {
    heading: string[]
    drama?: string
    body?: string
    data?: string
    headingTracking?: string
    dramaStyle?: string
    microCopy?: string
  }
  googleFonts: string
  imageMood: string
  unsplashQuery: string
  unsplashPhotoId?: string
  heroLinePattern: {
    part1: string
    part1Style: string
    part2: string
    part2Style: string
  }
  dependencies?: Record<string, string>
  promptFile?: string
  notes?: string
}

let _registry: Map<string, Preset> | null = null

/**
 * Load all presets from the `presets/` directory.
 * Results are cached after the first call.
 */
export function loadPresetRegistry(presetsDir?: string): Map<string, Preset> {
  if (_registry !== null) return _registry

  const dir = presetsDir ?? join(REPO_ROOT, 'presets')
  _registry = new Map()

  if (!existsSync(dir)) {
    return _registry
  }

  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const jsonPath = join(dir, entry.name, 'preset.json')
    if (!existsSync(jsonPath)) continue

    try {
      const raw = readFileSync(jsonPath, 'utf-8')
      const preset = JSON.parse(raw) as Preset
      _registry.set(preset.id, preset)
    } catch {
      // Skip malformed preset.json silently — CLI will warn separately
    }
  }

  return _registry
}

/**
 * Get a single preset by ID. Returns undefined if not found.
 */
export function getPreset(id: string, presetsDir?: string): Preset | undefined {
  return loadPresetRegistry(presetsDir).get(id)
}

/**
 * Get all presets as an array, sorted by id for deterministic output.
 */
export function listPresets(presetsDir?: string): Preset[] {
  return [...loadPresetRegistry(presetsDir).values()].sort((a, b) =>
    a.id.localeCompare(b.id)
  )
}

/** Clear the in-memory cache (useful in tests). */
export function clearPresetCache(): void {
  _registry = null
}
