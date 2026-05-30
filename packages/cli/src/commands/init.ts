import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'
import pc from 'picocolors'

// Assets dir: dist/cli.js → packages/cli/ → assets/ (copied at build time by copy-assets.mjs)
const ASSETS_DIR = resolve(fileURLToPath(import.meta.url), '..', '..', 'assets')
const SOURCE_CLAUDE_MD = join(ASSETS_DIR, 'CLAUDE.md')

export async function runInit(): Promise<void> {
  p.intro(`${pc.bgCyan(pc.black(' cinematic-web '))} ${pc.dim('init')}`)

  const cwd = process.cwd()
  const dest = join(cwd, 'CLAUDE.md')

  if (!existsSync(SOURCE_CLAUDE_MD)) {
    p.cancel(`Source CLAUDE.md not found at ${pc.cyan(SOURCE_CLAUDE_MD)}\nAre you running from inside the cinematic-web repo?`)
    process.exit(1)
  }

  if (existsSync(dest)) {
    const overwrite = await p.confirm({
      message: `${pc.cyan('CLAUDE.md')} already exists in this directory. Overwrite?`,
      initialValue: false,
    })
    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel('Aborted — existing CLAUDE.md preserved.')
      process.exit(0)
    }
  }

  const content = readFileSync(SOURCE_CLAUDE_MD, 'utf-8')
  writeFileSync(dest, content, 'utf-8')

  p.note(
    [
      `${pc.green('✓')} Wrote CLAUDE.md to ${pc.cyan(cwd)}`,
      '',
      'Load it into Claude Code with:',
      `  ${pc.cyan('claude')} — CLAUDE.md auto-loads when you open this directory`,
      '',
      'Or reference it explicitly:',
      `  ${pc.cyan('/load CLAUDE.md')} inside a Claude session`,
    ].join('\n'),
    'CLAUDE.md installed'
  )

  p.outro(`${pc.green('Done!')} Open this directory in Claude Code to start building cinematically.`)
}
