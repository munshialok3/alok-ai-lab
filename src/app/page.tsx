'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Impact from '@/components/Impact'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import ResumeGateModal from '@/components/ResumeGateModal'

const Neural = dynamic(() => import('@/components/Neural'), { ssr: false })
const Cursor = dynamic(() => import('@/components/Cursor'),  { ssr: false })

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="mesh-bg" />
      <div className="grain" />
      <Neural />
      <Cursor />

      <Navbar onResumeRequest={() => setResumeOpen(true)} />

      <Hero onResumeRequest={() => setResumeOpen(true)} />
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

      <ResumeGateModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  )
}
