'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

import Comet from "@/components/Comet"
import Nebula from "@/components/Nebula"
import NeuralBeam from "@/components/NeuralBeam"
import GalaxyCamera from "@/components/GalaxyCamera"
import Starfield from "@/components/Starfield"
import AICore from "@/components/AICore"

function Orbit({ radius }: { radius: number }) {

  const points: THREE.Vector3[] = []

  for (let i = 0; i <= 128; i++) {

    const angle = (i / 128) * Math.PI * 2

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    )

  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#1e3a8a" transparent opacity={0.08} />
    </line>
  )
}

function Planet({ radius, speed, size, color, project, setActive }: any) {

  const group = useRef<THREE.Group>(null!)
  const mesh = useRef<THREE.Mesh>(null!)
  const atmosphere = useRef<THREE.Mesh>(null!)

  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    if (group.current) {
      group.current.rotation.y = t * speed
    }

    if (mesh.current) {
      mesh.current.rotation.y += 0.01
      mesh.current.scale.setScalar(hovered ? 1.35 : 1)
    }

    if (atmosphere.current) {
      atmosphere.current.rotation.y += 0.002
    }

  })

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>

      <mesh
        ref={mesh}
        position={[radius, 0, 0]}
        onClick={() => setActive(project)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >

        <sphereGeometry args={[size, 64, 64]} />

        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.1}
        />

      </mesh>

      <mesh
        ref={atmosphere}
        position={[radius, 0, 0]}
        scale={1.6}
      >

        <sphereGeometry args={[size, 64, 64]} />

        <meshBasicMaterial
          color="#4f9cff"
          transparent
          opacity={0.08}
        />

      </mesh>

    </group>
  )
}

export default function ProjectGalaxy() {

  const [activeProject, setActiveProject] = useState<any>(null)

  const projects = [

    { name: "AI Marketing Analyst", description: "AI system analyzing marketing performance." },
    { name: "SQL Intelligence Engine", description: "AI explaining complex SQL queries." },
    { name: "AI Decision Simulator", description: "Simulate complex decisions using AI." },
    { name: "AI Resume Roaster", description: "AI that brutally critiques resumes." },
    { name: "AI Startup Analyzer", description: "Analyze startup business models." }

  ]

  return (
    <section className="h-screen w-full flex items-center justify-center text-white relative">

      {activeProject && (

        <div className="absolute z-20 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 w-80 text-center">

          <h3 className="text-2xl font-bold">{activeProject.name}</h3>

          <p className="mt-3 text-gray-300">
            {activeProject.description}
          </p>

          <button
            onClick={() => setActiveProject(null)}
            className="mt-4 text-sm text-gray-400"
          >
            Close
          </button>

        </div>

      )}

      <div className="absolute top-24 text-center z-10">

        <h2 className="text-5xl font-bold">
          Project Galaxy
        </h2>

        <p className="mt-4 text-gray-400">
          Explore AI systems and projects
        </p>

      </div>

      <Canvas camera={{ position: [0, 7, 20], fov: 60 }}>

        <GalaxyCamera />

        {/* Atmosphere */}

        <fog attach="fog" args={['#020617', 20, 120]} />

        {/* Lighting */}

        <ambientLight intensity={0.3} />

        <directionalLight
          position={[8, 10, 5]}
          intensity={2}
        />

        <pointLight
          position={[0, 0, 0]}
          intensity={3}
          color="#4f9cff"
        />

        {/* Background */}

        <Nebula />
        <Starfield />

        {/* AI Core */}

        <AICore />

        {/* Comets */}

        <Comet />
        <Comet />
        <Comet />

        {/* Orbits */}

        <Orbit radius={4} />
        <Orbit radius={7} />
        <Orbit radius={10} />
        <Orbit radius={13} />
        <Orbit radius={16} />

        {/* Planets */}

        <Planet radius={4} speed={0.5} size={0.55} color="#9333ea" project={projects[0]} setActive={setActiveProject}/>
        <Planet radius={7} speed={0.35} size={0.7} color="#22c55e" project={projects[1]} setActive={setActiveProject}/>
        <Planet radius={10} speed={0.25} size={0.8} color="#f59e0b" project={projects[2]} setActive={setActiveProject}/>
        <Planet radius={13} speed={0.18} size={0.9} color="#ef4444" project={projects[3]} setActive={setActiveProject}/>
        <Planet radius={16} speed={0.12} size={1.1} color="#3b82f6" project={projects[4]} setActive={setActiveProject}/>

        {/* Neural Network */}

        <NeuralBeam start={[4,0,0]} end={[7,0,0]} />
        <NeuralBeam start={[7,0,0]} end={[10,0,0]} />
        <NeuralBeam start={[10,0,0]} end={[13,0,0]} />
        <NeuralBeam start={[13,0,0]} end={[16,0,0]} />

      </Canvas>

    </section>
  )
}