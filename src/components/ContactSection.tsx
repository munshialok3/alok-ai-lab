'use client'

import { motion } from "framer-motion"

export default function ContactSection() {

  return (

    <section id="contact" className="relative py-40 px-8 text-white">

      <div className="max-w-4xl mx-auto text-center">

        {/* HEADER */}

        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          Let’s Build Intelligent Systems
        </h2>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          If you're building products, exploring AI systems, or solving
          complex data problems — I’d love to connect and collaborate.
        </p>

        {/* ACTION BUTTONS */}

        <div className="mt-16 flex flex-wrap justify-center gap-6">

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://github.com/munshialok3"
            target="_blank"
            className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-md transition"
          >
            GitHub
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://www.linkedin.com/in/munshialok"
            target="_blank"
            className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-md transition"
          >
            LinkedIn
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:munshialok3@gmail.com"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
          >
            Email Me
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/alok_munshi_resume_2026.pdf"
            className="px-8 py-4 rounded-xl border border-white/30 hover:border-blue-400 transition"
          >
            Download Resume
          </motion.a>

        </div>

      </div>

    </section>

  )

}