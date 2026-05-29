import fsExtra from 'fs-extra'
const { copySync } = fsExtra
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyTokens } from './tokens.js'
import type { ProjectSpec, Preset } from '@cinematic/core'

// Repo root: packages/cli/dist/cli.js → 4 levels up → repo root
const REPO_ROOT = resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..')

// File extensions that support token replacement
const TEXT_EXTENSIONS = new Set([
  '.html', '.css', '.js', '.jsx', '.ts', '.tsx',
  '.json', '.md', '.txt', '.env.example',
])

/**
 * Scaffold a new project directory from a template.
 * 1. Copy template files recursively
 * 2. Apply {{token}} replacement to all text files
 */
export async function scaffoldProject(
  outputDir: string,
  spec: ProjectSpec,
  preset: Preset
): Promise<void> {
  const templateName = preset.template === 'three-fiber' ? 'three-fiber' : 'base-react'
  const templateDir = join(REPO_ROOT, 'templates', templateName)

  // Copy all template files to output
  copySync(templateDir, outputDir, {
    overwrite: false,
    filter: (src) => {
      const rel = relative(templateDir, src)
      return !rel.startsWith('node_modules') && !rel.startsWith('dist')
    },
  })

  // Token-replace all text files
  replaceTokensInDir(outputDir, spec, preset)
}

function replaceTokensInDir(dir: string, spec: ProjectSpec, preset: Preset): void {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      replaceTokensInDir(fullPath, spec, preset)
    } else if (entry.isFile()) {
      const ext = '.' + (entry.name.split('.').pop() ?? '')
      if (!TEXT_EXTENSIONS.has(ext)) continue
      try {
        const original = readFileSync(fullPath, 'utf-8')
        const replaced = applyTokens(original, spec, preset)
        if (replaced !== original) {
          writeFileSync(fullPath, replaced, 'utf-8')
        }
      } catch {
        // Skip binary files that slipped through extension check
      }
    }
  }
}
