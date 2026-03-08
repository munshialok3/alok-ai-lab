'use client'

import { motion } from "framer-motion"

const steps = [
  {
    title: "Data",
    description:
      "Raw information from products, users, and systems that forms the foundation of intelligent decision making.",
  },
  {
    title: "Infrastructure",
    description:
      "Scalable data pipelines and analytical systems that transform raw data into structured signals.",
  },
  {
    title: "Intelligence",
    description:
      "AI models and analytical frameworks that interpret patterns and generate meaningful insights.",
  },
  {
    title: "Decision",
    description:
      "Automation and decision systems that convert insight into action for products and organizations.",
  },
]

export default function SystemsThinking() {

  return (

    <section id="systems" className="relative py-40 px-8 text-white">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Systems Thinking
          </h2>

          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            Building intelligent systems requires connecting data,
            infrastructure, and AI into coherent decision frameworks.
          </p>

        </div>

        {/* FLOW */}

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition"
            >

              <h3 className="text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-relaxed">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  )

}