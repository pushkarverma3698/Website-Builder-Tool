/**
 * token-replace — simple mustache-style `{{x.y}}` substitution.
 *
 * Resolves dotted paths against a flat or nested object.
 * Unknown tokens are left as-is (no silent erasure).
 *
 * @example
 * tokenReplace('Hello {{brand}}!', { brand: 'Nura Health' })
 * // → 'Hello Nura Health!'
 *
 * tokenReplace('Color: {{palette.primary}}', { palette: { primary: '#2E4036' } })
 * // → 'Color: #2E4036'
 */
export function tokenReplace(content: string, data: Record<string, unknown>): string {
  return content.replace(/\{\{([\w.]+)\}\}/g, (match, path: string) => {
    const value = resolvePath(data, path)
    if (value === undefined || value === null) return match
    return String(value)
  })
}

function resolvePath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }
  return current
}
