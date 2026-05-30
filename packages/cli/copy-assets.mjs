/**
 * copy-assets.mjs
 * Copies repo-level assets (CLAUDE.md, presets/, templates/, prompts/)
 * into packages/cli/assets/ so they're bundled into the npm package.
 *
 * Run before tsup build:  node copy-assets.mjs && tsup
 *
 * The assets/ directory is gitignored (generated at build time)
 * but included in the npm package via the "files" field in package.json.
 */

import { cpSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..', '..')
const ASSETS_DIR = join(__dirname, 'assets')

function copy(src, dest) {
  if (!existsSync(src)) {
    console.warn(`  ⚠ Skipping (not found): ${src}`)
    return
  }
  cpSync(src, dest, {
    recursive: true,
    filter: (s) => {
      // Exclude node_modules and build outputs from templates
      return !s.includes('/node_modules/') && !s.includes('/dist/')
    },
  })
  console.log(`  ✓ ${dest.replace(__dirname + '/', '')}`)
}

console.log('Copying assets into packages/cli/assets/ …\n')

mkdirSync(ASSETS_DIR, { recursive: true })

// CLAUDE.md — used by `cinematic-web init`
copy(join(REPO_ROOT, 'CLAUDE.md'), join(ASSETS_DIR, 'CLAUDE.md'))

// presets/ — used by @cinematic/core preset registry
copy(join(REPO_ROOT, 'presets'), join(ASSETS_DIR, 'presets'))

// templates/ — used by scaffold (create command)
copy(join(REPO_ROOT, 'templates'), join(ASSETS_DIR, 'templates'))

// prompts/product-development/ — used by `cinematic-web think`
mkdirSync(join(ASSETS_DIR, 'prompts'), { recursive: true })
copy(
  join(REPO_ROOT, 'prompts', 'product-development'),
  join(ASSETS_DIR, 'prompts', 'product-development')
)

console.log('\n✓ Assets ready\n')
