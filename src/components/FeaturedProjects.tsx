'use client'

import { motion } from "framer-motion"

const projects = [
  {
    title: "AI Marketing Analyst",
    description:
      "An AI system that analyzes marketing performance data to surface insights, patterns, and decision signals for growth teams.",
  },
  {
    title: "SQL Intelligence Engine",
    description:
      "A tool that explains complex SQL queries, helping teams understand data transformations and optimize analytical workflows.",
  },
  {
    title: "AI Decision Simulator",
    description:
      "A simulation engine that models scenarios and evaluates potential outcomes to support strategic decision making.",
  },
  {
    title: "AI Resume Roaster",
    description:
      "An AI-powered evaluator that critiques resumes and provides structured feedback for improving clarity and impact.",
  },
  {
    title: "AI Startup Analyzer",
    description:
      "A system that analyzes startup business models and generates insights about strategy, market positioning, and risk.",
  },
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-40 px-8 text-white">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Featured Projects
          </h2>

          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            Intelligent systems and tools designed to transform data,
            automate insight generation, and support better decisions.
          </p>

        </div>

        {/* PROJECT GRID */}

        <div className="grid md:grid-cols-2 gap-10">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition"
            >

              <h3 className="text-2xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6 text-blue-400 text-sm font-semibold cursor-pointer hover:underline">
                View Project →
              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}