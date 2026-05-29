import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Unsplash image matching preset imageMood
const HERO_IMAGE = 'https://images.unsplash.com/photo-{{unsplashPhotoId}}?auto=format&fit=crop&w=1920&q=80'

export default function Hero() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(line1Ref.current, { y: 40, opacity: 0, duration: 1 })
        .from(line2Ref.current, { y: 40, opacity: 0, duration: 1.1 }, '-=0.6')
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.5')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full"
      style={{ height: '100dvh' }}
    >
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, var(--color-primary) 0%, var(--color-dark) 30%, transparent 70%)',
          opacity: 0.85,
        }}
        aria-hidden="true"
      />

      {/* Content — bottom-left third */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-5xl">
        {/* Line 1: bold sans */}
        <p
          ref={line1Ref}
          className="font-heading font-bold text-white/80 text-xl md:text-2xl lg:text-3xl tracking-tight mb-2"
        >
          {{heroLine1}}
        </p>

        {/* Line 2: massive serif italic */}
        <h1
          ref={line2Ref}
          className="font-drama text-white leading-none mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontStyle: 'italic',
          }}
        >
          {{heroLine2}}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-heading text-white/60 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
        >
          {{purpose}}
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <a
            href="#features"
            className="btn-magnetic relative inline-flex items-center px-8 py-4 rounded-full text-base font-semibold font-heading text-white overflow-hidden"
            style={{ background: 'var(--color-accent)' }}
          >
            <span
              className="btn-fill"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
            <span className="relative z-10">{{cta}}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
