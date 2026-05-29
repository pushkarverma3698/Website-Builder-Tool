import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MANIFESTO_WORDS = `{{manifesto}}`.split(' ')

export default function Philosophy() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        opacity: 0.1,
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1.5,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: 'var(--color-dark)' }}
    >
      {/* Parallax texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-data text-xs tracking-widest uppercase mb-12" style={{ color: 'var(--color-accent)' }}>
          Philosophy
        </p>
        <p
          className="font-drama text-3xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: 'var(--color-background)', fontStyle: 'italic' }}
        >
          {MANIFESTO_WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
