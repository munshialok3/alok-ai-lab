'use client'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Impact from '@/components/Impact'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import ResumeGateModal from '@/components/ResumeGateModal'
import ErrorBoundary from '@/components/ErrorBoundary'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'

const Neural = dynamic(() => import('@/components/Neural'), { ssr: false })

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
          <div className="mesh-bg" />
          <div className="grain" />
          <Suspense fallback={null}>
            <Neural />
          </Suspense>

          <ScrollDepthTracker />
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
      </MotionConfig>
    </ErrorBoundary>
  )
}
