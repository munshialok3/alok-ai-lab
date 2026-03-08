'use client'

import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      <div className="mt-6 flex items-center gap-8 px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm">

        <span className="font-semibold tracking-wide">
          ALOK AI LAB
        </span>

        <a href="#about" className="hover:text-blue-400 transition">
          About
        </a>

        <a href="#timeline" className="hover:text-blue-400 transition">
          Journey
        </a>

        <a href="#projects" className="hover:text-blue-400 transition">
          Projects
        </a>

        <a href="#galaxy" className="hover:text-blue-400 transition">
          Galaxy
        </a>

        <a href="#systems" className="hover:text-blue-400 transition">
          Systems
        </a>

        <a href="#contact" className="hover:text-blue-400 transition">
          Contact
        </a>

      </div>
    </motion.nav>
  )
}