'use client'

export default function SkillNetwork() {

  return (

    <section id="about" className="relative py-40 px-8 text-white">

      <div className="max-w-6xl mx-auto">

        {/* ABOUT HEADER */}

        <div className="text-center mb-24">

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            About
          </h2>

          <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I design intelligent systems that turn complex data into decisions.
            My work sits at the intersection of <span className="text-white">data infrastructure</span>,
            <span className="text-white"> AI systems</span>, and
            <span className="text-white"> automation</span> — building tools that help organizations
            understand information, simulate outcomes, and make better decisions.
          </p>

        </div>

        {/* CAPABILITY CARDS */}

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              AI Systems Architecture
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Designing systems where data pipelines, models and automation
              interact to generate insights and decisions at scale.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              Data Infrastructure & Analytics
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Building scalable SQL-driven data layers that transform complex
              datasets into decision-ready signals and analytics systems.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">

            <h3 className="text-xl font-semibold">
              Automation & Decision Tools
            </h3>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Creating AI-powered tools that simulate outcomes, analyze
              inputs, and support faster and smarter decisions.
            </p>

          </div>

        </div>

      </div>

    </section>

  )

}