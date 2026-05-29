import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FOOTER_LINKS = {
  Product: ['Features', 'Protocol', 'Pricing', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  const footerRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulsing status dot
      gsap.to(dotRef.current, {
        opacity: 0.3,
        duration: 1.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="rounded-t-[4rem] px-8 md:px-16 lg:px-24 pt-16 pb-12"
      style={{ background: 'var(--color-dark)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-heading font-bold text-white text-xl mb-3 tracking-tight">
              {{brand}}
            </p>
            <p className="font-heading text-sm text-white/40 leading-relaxed">
              {{purpose}}
            </p>

            {/* System status */}
            <div className="flex items-center gap-2 mt-6">
              <span
                ref={dotRef}
                className="w-2 h-2 rounded-full"
                style={{ background: '#22c55e' }}
              />
              <span className="font-data text-xs text-white/40 tracking-wide">
                System Operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="font-data text-xs tracking-widest uppercase text-white/30 mb-4">
                  {group}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-heading text-sm text-white/50 hover:text-white interactive-lift transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-data text-xs text-white/25">
            © {new Date().getFullYear()} {{brand}}. All rights reserved.
          </p>
          <p className="font-data text-xs text-white/20">
            Built with{' '}
            <a
              href="https://github.com/pushkar-verma/cinematic-web"
              className="text-white/40 hover:text-white/60 interactive-lift transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              cinematic-web
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
