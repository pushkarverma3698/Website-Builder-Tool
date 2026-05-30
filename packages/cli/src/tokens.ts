import { tokenReplace } from 'cinematic-core'
import type { ProjectSpec, Preset } from 'cinematic-core'

/**
 * Build the full token map by merging spec + preset tokens.
 * Used to replace {{...}} placeholders in template files.
 */
export function buildTokenMap(spec: ProjectSpec, preset: Preset): Record<string, unknown> {
  const brandSlug = spec.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return {
    brand: spec.brand,
    'brand-slug': brandSlug,
    purpose: spec.purpose,
    cta: spec.cta,
    notes: spec.notes,
    presetId: preset.id,

    // Hero lines — filled from preset pattern with brand content
    heroLine1: spec.purpose.split(' ').slice(0, 4).join(' '),
    heroLine2: spec.brand,

    // Value props
    valueProp0: spec.valueProps[0],
    valueProp1: spec.valueProps[1],
    valueProp2: spec.valueProps[2],

    // Manifesto — generated from purpose
    manifesto: `${spec.purpose} We believe the future belongs to those who move with precision, clarity, and intention.`,

    // Protocol steps — generated from value props
    protocolStep0Title: `Understand ${spec.valueProps[0]}`,
    protocolStep0Desc: `We begin with a deep analysis of your current state — mapping every signal, every gap, every opportunity hidden in your data.`,
    protocolStep1Title: `Activate ${spec.valueProps[1]}`,
    protocolStep1Desc: `Our system processes your inputs and delivers a tailored protocol built specifically for your context and objectives.`,
    protocolStep2Title: `Deliver ${spec.valueProps[2]}`,
    protocolStep2Desc: `Results are delivered in real time with full transparency — measurable, verifiable, and ready to act on.`,

    // Per-preset curated Unsplash photo ID (falls back to organic-tech default)
    unsplashPhotoId: preset.unsplashPhotoId ?? '1518770660439-4636190af475',

    // Preset tokens (flat)
    'preset.name': preset.name,
    'preset.id': preset.id,
    googleFonts: preset.googleFonts,

    // Palette
    'palette.primary': preset.palette.primary,
    'palette.accent': preset.palette.accent,
    'palette.background': preset.palette.background,
    'palette.dark': preset.palette.dark,

    // Typography
    'typography.heading0': preset.typography.heading[0] ?? '',
    'typography.heading1': preset.typography.heading[1] ?? '',
    'typography.drama': preset.typography.drama ?? '',
    'typography.data': preset.typography.data ?? '',
  }
}

/**
 * Apply token replacement to a string using spec + preset tokens.
 */
export function applyTokens(
  content: string,
  spec: ProjectSpec,
  preset: Preset
): string {
  return tokenReplace(content, buildTokenMap(spec, preset) as Record<string, unknown>)
}
