import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

const TIERS = [
  {
    name: 'Essential',
    price: '$0',
    period: 'forever',
    description: 'Start your journey. No commitments.',
    features: ['Core access', 'Basic analytics', 'Community support', '1 active project'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'For practitioners who demand precision.',
    features: ['Everything in Essential', 'Advanced analytics', 'Priority support', 'Unlimited projects', 'API access'],
    cta: '{{cta}}',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'Tailored solutions for organizations.',
    features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom integrations', 'White-label option'],
    cta: 'Talk to us',
    highlighted: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 px-8 md:px-16 lg:px-24"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-data text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
          Membership
        </p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16 tracking-tight" style={{ color: 'var(--color-dark)' }}>
          Choose your tier.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {TIERS.map((tier, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`rounded-3xl p-8 flex flex-col relative overflow-hidden ${
                tier.highlighted ? 'md:-mt-4 md:-mb-4' : ''
              }`}
              style={{
                background: tier.highlighted ? 'var(--color-primary)' : 'var(--color-dark)',
                border: tier.highlighted ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {tier.highlighted && (
                <div
                  className="absolute top-4 right-4 font-data text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-accent)', color: 'white' }}
                >
                  Popular
                </div>
              )}

              <p className="font-data text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
                {tier.name}
              </p>
              <div className="mb-2">
                <span className="font-heading font-bold text-4xl text-white">{tier.price}</span>
                <span className="font-data text-sm text-white/40 ml-2">/ {tier.period}</span>
              </div>
              <p className="font-heading text-sm text-white/50 mb-8 leading-relaxed">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <Check size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    <span className="font-heading text-sm text-white/70">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="btn-magnetic relative flex items-center justify-center w-full py-3 rounded-2xl text-sm font-semibold font-heading overflow-hidden"
                style={{
                  background: tier.highlighted ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                  color: 'white',
                }}
              >
                <span
                  className="btn-fill"
                  style={{ background: tier.highlighted ? 'rgba(255,255,255,0.15)' : 'var(--color-accent)' }}
                />
                <span className="relative z-10">{tier.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
