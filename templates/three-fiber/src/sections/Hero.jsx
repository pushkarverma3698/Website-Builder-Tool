import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero({ style }) {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="scene-section" style={style}>
      <div
        ref={ref}
        className="max-w-3xl px-8"
        style={{ marginLeft: 'min(-10vw, -40px)' }}
      >
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
          {{preset.name}}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-6">
          {{heroLine1}}<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, {{palette.accent}} 0%, #22D3EE 100%)' }}
          >
            {{heroLine2}}
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          {{purpose}}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="text-white font-semibold px-8 py-4 rounded-full transition-all duration-200"
            style={{ background: '{{palette.accent}}', boxShadow: '0 0 30px {{palette.accent}}66' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}
          >
            {{cta}}
          </a>
          <a
            href="#"
            className="text-gray-400 font-medium px-8 py-4 rounded-full border border-gray-700 hover:text-white transition-all duration-200"
            style={{ '--tw-border-opacity': 1 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '{{palette.accent}}' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '' }}
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  )
}
