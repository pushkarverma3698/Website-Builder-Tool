import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Card 1: Diagnostic Shuffler ──────────────────────────────────────────────
function DiagnosticShuffler({ title, description }) {
  const ITEMS = [
    { label: 'Analyzing', value: '98.7%', color: 'var(--color-accent)' },
    { label: 'Processing', value: '< 2ms', color: 'var(--color-primary)' },
    { label: 'Verified', value: '✓ Pass', color: '#22c55e' },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ITEMS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-48 flex flex-col justify-end mb-6">
      {ITEMS.map((item, i) => {
        const offset = i - active
        const isVisible = Math.abs(offset) <= 1
        return (
          <div
            key={item.label}
            className="absolute w-full transition-all duration-700"
            style={{
              transform: `translateY(${offset * 52}px) scale(${i === active ? 1 : 0.94})`,
              opacity: i === active ? 1 : isVisible ? 0.45 : 0,
              zIndex: i === active ? 10 : 5 - Math.abs(offset),
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 rounded-2xl font-data text-sm"
              style={{
                background: i === active ? 'var(--color-dark)' : 'var(--color-primary)/10',
                border: `1px solid ${i === active ? item.color : 'transparent'}`,
              }}
            >
              <span className="text-white/60">{item.label}</span>
              <span style={{ color: item.color }} className="font-bold">{item.value}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Card 2: Telemetry Typewriter ──────────────────────────────────────────────
const TELEMETRY_LINES = [
  '> Initializing protocol...',
  '> Data stream: active',
  '> Running analysis...',
  '> Signal strength: 99.2%',
  '> All systems nominal',
  '> Ready.',
]

function TelemetryTypewriter({ title, description }) {
  const [lines, setLines] = useState([])
  const [charIdx, setCharIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorId = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(cursorId)
  }, [])

  useEffect(() => {
    if (lineIdx >= TELEMETRY_LINES.length) return
    const current = TELEMETRY_LINES[lineIdx] ?? ''
    if (charIdx < current.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 42)
      return () => clearTimeout(id)
    } else {
      const id = setTimeout(() => {
        setLines((l) => [...l, current])
        setCharIdx(0)
        setLineIdx((l) => l + 1)
      }, 400)
      return () => clearTimeout(id)
    }
  }, [charIdx, lineIdx])

  const currentLine = TELEMETRY_LINES[lineIdx] ?? ''

  return (
    <div
      className="h-48 overflow-hidden rounded-2xl p-4 mb-6 font-data text-xs leading-6"
      style={{ background: 'var(--color-dark)' }}
    >
      {lines.map((l, i) => (
        <div key={i} className="text-white/40">{l}</div>
      ))}
      {lineIdx < TELEMETRY_LINES.length && (
        <div className="text-white/90">
          {currentLine.slice(0, charIdx)}
          <span
            className="inline-block w-1.5 h-4 ml-0.5 align-middle"
            style={{
              background: 'var(--color-accent)',
              opacity: showCursor ? 1 : 0,
            }}
          />
        </div>
      )}
    </div>
  )
}

// ─── Card 3: Cursor Protocol Scheduler ────────────────────────────────────────
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const HOURS = ['9', '11', '13', '15', '17']

function ProtocolScheduler({ title, description }) {
  const [cursor, setCursor] = useState({ col: 0, row: 0 })

  useEffect(() => {
    const id = setInterval(() => {
      setCursor({
        col: Math.floor(Math.random() * DAYS.length),
        row: Math.floor(Math.random() * HOURS.length),
      })
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-48 mb-6 flex flex-col justify-center">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${DAYS.length}, 1fr)` }}>
        {DAYS.map((d, ci) => (
          <div key={ci} className="font-data text-xs text-center text-white/30 pb-1">{d}</div>
        ))}
        {HOURS.flatMap((h, ri) =>
          DAYS.map((_, ci) => {
            const isActive = cursor.col === ci && cursor.row === ri
            return (
              <div
                key={`${ri}-${ci}`}
                className="rounded-md h-6 transition-all duration-500"
                style={{
                  background: isActive
                    ? 'var(--color-accent)'
                    : (ri + ci) % 3 === 0
                    ? 'var(--color-primary)/30'
                    : 'var(--color-dark)/30',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 12px var(--color-accent)' : 'none',
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

// ─── Main Features Section ─────────────────────────────────────────────────────
const CARD_COMPONENTS = [DiagnosticShuffler, TelemetryTypewriter, ProtocolScheduler]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const VALUE_PROPS = [
    { title: '{{valueProp0}}', description: 'Precision diagnostics that surface signal from noise, delivering actionable insights in real time.' },
    { title: '{{valueProp1}}', description: 'Live telemetry stream keeping you informed at every step with zero latency.' },
    { title: '{{valueProp2}}', description: 'Intelligent scheduling that optimizes your workflow and eliminates friction.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 md:py-32 px-8 md:px-16 lg:px-24"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-data text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
          Capabilities
        </p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16 tracking-tight" style={{ color: 'var(--color-dark)' }}>
          Built for precision.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((prop, i) => {
            const CardWidget = CARD_COMPONENTS[i]
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                className="rounded-3xl p-6 flex flex-col"
                style={{
                  background: i === 1 ? 'var(--color-primary)' : 'var(--color-dark)',
                }}
              >
                <CardWidget title={prop.title} description={prop.description} />
                <div className="mt-auto">
                  <h3 className="font-heading font-bold text-lg text-white mb-2 tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="font-heading text-sm text-white/50 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
