'use client'

import { motion } from "framer-motion"

const steps = [
  {
    title: "IIT Kharagpur",
    description:
      "Built strong foundations in systems thinking, analytics, and problem solving.",
  },
  {
    title: "OYO",
    description:
      "Early exposure to high-growth tech environments and large-scale product operations.",
  },
  {
    title: "American Express",
    description:
      "Worked on data analytics and financial systems driving insight-driven decision making.",
  },
  {
    title: "Zomato",
    description:
      "Designed marketing analytics systems and data infrastructure powering growth decisions.",
  },
  {
    title: "AI Lab",
    description:
      "Building intelligent systems, automation tools, and decision frameworks powered by AI.",
  },
]

export default function CareerTimeline() {
  return (
    <section id="timeline" className="relative py-40 px-8 text-white">

      <div className="max-w-6xl mx-auto text-center">

        {/* HEADER */}

        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          Journey
        </h2>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          A path shaped by data systems, analytics infrastructure,
          and building intelligent tools.
        </p>

        {/* TIMELINE */}

        <div className="mt-24 grid md:grid-cols-5 gap-8">

          {steps.map((step, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-400/40 transition"
            >

              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}