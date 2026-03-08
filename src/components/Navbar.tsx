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

        <a className="hover:text-blue-400 transition cursor-pointer">
          Lab
        </a>

        <a className="hover:text-blue-400 transition cursor-pointer">
          Projects
        </a>

        <a className="hover:text-blue-400 transition cursor-pointer">
          About
        </a>

        <a className="hover:text-blue-400 transition cursor-pointer">
          Resume
        </a>

        <a className="hover:text-blue-400 transition cursor-pointer">
          Contact
        </a>

      </div>
    </motion.nav>
  )
}