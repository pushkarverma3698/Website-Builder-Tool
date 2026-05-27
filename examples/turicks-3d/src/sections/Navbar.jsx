import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: -40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={ref}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-6 py-3 rounded-full"
      style={{
        background: 'rgba(10,10,20,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(123,97,255,0.2)',
      }}
    >
      <span className="text-white font-bold tracking-wider text-sm">TURICKS</span>
      <div className="hidden md:flex gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors duration-200">How it works</a>
        <a href="#" className="hover:text-white transition-colors duration-200">Pricing</a>
      </div>
      <a
        href="#"
        className="bg-purple text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
        style={{ boxShadow: '0 0 20px rgba(123,97,255,0.3)' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.backgroundColor = '#A78BFA' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#7B61FF' }}
      >
        Get started
      </a>
    </nav>
  )
}
