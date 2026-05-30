import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { ProjectSpecSchema } from 'cinematic-core'
import type { ProjectSpec } from 'cinematic-core'

const SPEC_FILENAME = 'cinematic.json'

/**
 * Load a ProjectSpec from cinematic.json in the given directory.
 * Returns null if the file doesn't exist or fails to parse.
 */
export function loadSpec(dir: string = process.cwd()): ProjectSpec | null {
  const path = resolve(dir, SPEC_FILENAME)
  if (!existsSync(path)) return null
  try {
    const raw = readFileSync(path, 'utf-8')
    const parsed = ProjectSpecSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

/**
 * Write a ProjectSpec to cinematic.json in the given directory.
 */
export function saveSpec(spec: ProjectSpec, dir: string = process.cwd()): void {
  const path = resolve(dir, SPEC_FILENAME)
  writeFileSync(path, JSON.stringify(spec, null, 2) + '\n', 'utf-8')
}
