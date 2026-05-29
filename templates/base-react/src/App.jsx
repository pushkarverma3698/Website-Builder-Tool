import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Features from './sections/Features.jsx'
import Philosophy from './sections/Philosophy.jsx'
import Protocol from './sections/Protocol.jsx'
import Pricing from './sections/Pricing.jsx'
import Footer from './sections/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on font/image load
    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => window.removeEventListener('load', () => ScrollTrigger.refresh())
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  )
}
