'use client'

export default function SkillNetwork() {

  return (
    <section className="relative py-40 px-8 text-white">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            About Me
          </h2>

          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            I design intelligent systems that combine data infrastructure,
            automation, and AI-driven decision frameworks to transform complex
            information into actionable insight.
          </p>

        </div>

        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              AI Systems Architecture
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Designing systems where data pipelines, models and automation
              interact to generate insights and decisions.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              Data Infrastructure & Analytics
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Building scalable SQL-driven data layers that transform complex
              datasets into decision-ready signals.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              Automation & Decision Tools
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Creating AI-powered systems that simulate outcomes, analyze
              inputs, and support smarter decisions.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}