import { Command } from 'commander'
import { runCreate } from './commands/create.js'
import { runThink } from './commands/think.js'
import { runInit } from './commands/init.js'

const program = new Command()

program
  .name('cinematic-web')
  .description('Build cinematic landing pages with premium design presets')
  .version('0.1.0')

program
  .command('create [name]')
  .description('Scaffold a new cinematic landing page project')
  .action(async (name?: string) => {
    await runCreate(name)
  })

program
  .command('think')
  .description('Walk through the product-development pipeline (PRD → UX → MVP)')
  .action(async () => {
    await runThink()
  })

program
  .command('init')
  .description('Write CLAUDE.md into the current directory (for Claude Code users)')
  .action(async () => {
    await runInit()
  })

program.parse()
