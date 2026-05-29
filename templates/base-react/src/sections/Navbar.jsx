import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = ['About', 'Features', 'Protocol', 'Pricing']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 ${
        scrolled
          ? 'bg-[color:var(--color-background)]/60 backdrop-blur-xl border border-[color:var(--color-primary)]/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <a
          href="#"
          className={`font-heading font-bold text-sm tracking-tight interactive-lift transition-colors duration-300 ${
            scrolled ? 'text-[color:var(--color-dark)]' : 'text-white'
          }`}
        >
          {{brand}}
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`font-heading text-sm font-medium interactive-lift transition-colors duration-300 ${
                scrolled
                  ? 'text-[color:var(--color-dark)]/70 hover:text-[color:var(--color-dark)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#pricing"
          className="btn-magnetic relative hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold font-heading text-white overflow-hidden"
          style={{ background: 'var(--color-accent)' }}
        >
          <span className="btn-fill" style={{ background: 'var(--color-primary)' }} />
          <span className="relative z-10">{{cta}}</span>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-1 transition-colors duration-300 ${
            scrolled ? 'text-[color:var(--color-dark)]' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-sm font-medium text-[color:var(--color-dark)] interactive-lift"
            >
              {link}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="btn-magnetic relative inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold font-heading text-white overflow-hidden mt-2"
            style={{ background: 'var(--color-accent)' }}
          >
            <span className="btn-fill" style={{ background: 'var(--color-primary)' }} />
            <span className="relative z-10">{{cta}}</span>
          </a>
        </div>
      )}
    </nav>
  )
}
