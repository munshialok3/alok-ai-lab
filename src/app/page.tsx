'use client'

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import NeuralBackground from "@/components/NeuralBackground"
import CursorGlow from "@/components/CursorGlow"
import SkillNetwork from "@/components/SkillNetwork"
import { TypeAnimation } from 'react-type-animation'
import ProjectGalaxy from "@/components/ProjectGalaxy"
import CareerTimeline from "@/components/CareerTimeline"
import FeaturedProjects from "@/components/FeaturedProjects"
import SystemsThinking from "@/components/SystemsThinking"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      <Navbar />
      <CursorGlow />
      <NeuralBackground />

      {/* HERO SECTION */}

      <section className="min-h-screen flex items-center justify-center">

        <div className="relative z-10 text-center px-6">

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-8xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(90deg,#ffffff,#4f9cff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            ALOK AI LAB
          </motion.h1>

          <div className="mt-8 text-xl md:text-2xl text-gray-300 h-16">

            <TypeAnimation
              sequence={[
                "Building intelligent systems",
                2000,
                "Designing AI infrastructure",
                2000,
                "Creating tools that shape decisions",
                2000,
                "Exploring the frontier of AI",
                2000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex gap-6 justify-center"
          >

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-110 transition text-white font-semibold shadow-lg shadow-blue-500/40">
              Explore Lab
            </button>

            <button className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white hover:text-black transition font-semibold">
              View Projects
            </button>

          </motion.div>

        </div>

      </section>

      {/* SKILL NETWORK SECTION */}

      <SkillNetwork />
      <CareerTimeline />
      <FeaturedProjects />
      <ProjectGalaxy />
      <SystemsThinking />
      <ContactSection />

    </main>
  )
}