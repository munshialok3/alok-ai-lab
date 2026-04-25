import Cursor from '@/components/Cursor'
import NeuralCanvas from '@/components/NeuralCanvas'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main style={{ position:'relative', minHeight:'100vh', overflowX:'hidden' }}>
      {/* Fixed background layers */}
      <div className="mesh" />
      <NeuralCanvas />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <Hero />

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
