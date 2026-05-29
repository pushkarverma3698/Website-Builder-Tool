import { z } from 'zod'

/**
 * ProjectSpec — the single source of truth for a cinematic-web project.
 * Written to cinematic.json at the project root by `cinematic-web create` and `cinematic-web think`.
 */
export const ProjectSpecSchema = z.object({
  /** Human-readable brand name. E.g. "Nura Health" */
  brand: z.string().min(1),

  /** One-line purpose statement. E.g. "Precision longevity medicine powered by biological data." */
  purpose: z.string().min(1),

  /** ID of the selected design preset. Must match a folder in presets/. */
  presetId: z.string().min(1),

  /** Three key value propositions — become Feature card copy. */
  valueProps: z.tuple([z.string(), z.string(), z.string()]),

  /** Primary call-to-action text. E.g. "Book a consultation" */
  cta: z.string().min(1),

  /** Free-text special requests / custom features. */
  notes: z.string().default(''),

  /** Stream B: paths to generated product documents (optional). */
  prd: z.object({ path: z.string() }).optional(),
  ux: z.object({ path: z.string() }).optional(),
  mvp: z.object({ path: z.string() }).optional(),

  /** Reference website URL provided by user (content context only, not design). */
  referenceUrl: z.string().url().optional(),
})

export type ProjectSpec = z.infer<typeof ProjectSpecSchema>
