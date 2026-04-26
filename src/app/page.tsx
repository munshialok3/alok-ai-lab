import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Impact from '@/components/Impact'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

const Neural = dynamic(() => import('@/components/Neural'), { ssr: false })
const Cursor = dynamic(() => import('@/components/Cursor'),  { ssr: false })

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="mesh-bg" />
      <div className="grain" />
      <Neural />
      <Cursor />

      <Navbar />

      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Impact />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Journey />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Contact />
    </main>
  )
}
