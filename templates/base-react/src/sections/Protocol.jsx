import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    number: '01',
    title: '{{protocolStep0Title}}',
    description: '{{protocolStep0Desc}}',
    tag: 'Intake',
  },
  {
    number: '02',
    title: '{{protocolStep1Title}}',
    description: '{{protocolStep1Desc}}',
    tag: 'Analysis',
  },
  {
    number: '03',
    title: '{{protocolStep2Title}}',
    description: '{{protocolStep2Desc}}',
    tag: 'Delivery',
  },
]

export default function Protocol() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const stickyContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current

      cards.forEach((card, i) => {
        if (i === 0) return // First card stays static on top

        // Cards below: scale + blur + fade as scroll brings them down
        gsap.to(cards.slice(0, i), {
          scale: 1 - (i * 0.04),
          filter: `blur(${i * 6}px)`,
          opacity: 1 - (i * 0.25),
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="protocol"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto mb-16">
        <p className="font-data text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
          The Protocol
        </p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--color-dark)' }}>
          How it works.
        </h2>
      </div>

      {/* Sticky stacking archive */}
      <div ref={stickyContainerRef} className="relative">
        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            className="sticky top-0 min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
            style={{ paddingTop: `${i * 2}rem` }}
          >
            <div
              className="w-full max-w-4xl rounded-3xl md:rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
              style={{
                background: i % 2 === 0 ? 'var(--color-dark)' : 'var(--color-primary)',
                minHeight: '60vh',
              }}
            >
              {/* Step number */}
              <span
                className="absolute top-8 right-10 font-data text-6xl md:text-8xl font-bold select-none"
                style={{ color: 'rgba(255,255,255,0.06)' }}
              >
                {step.number}
              </span>

              {/* Tag */}
              <span
                className="inline-block font-data text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-8"
                style={{
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                }}
              >
                {step.tag}
              </span>

              {/* Content */}
              <div className="max-w-xl">
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-heading text-white/50 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
