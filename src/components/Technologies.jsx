// ============================================================
// BHADOTT Studio — Technologies Section FASE 3
// src/components/Technologies.jsx — Visual Premium
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// ── Dados das tecnologias ─────────────────────────────────
const mainTechs = [
  { name: "React",         letter: "⚛",  color: "#61dafb", glow: "rgba(97,218,251,0.2)",  desc: "UI / Frontend"        },
  { name: "Node.js",       letter: "⬡",  color: "#68a063", glow: "rgba(104,160,99,0.2)",  desc: "Backend / API"        },
  { name: "Godot",         letter: "◆",  color: "#478cbf", glow: "rgba(71,140,191,0.2)",  desc: "Game Dev 2D/3D"       },
  { name: "Unreal Engine", letter: "▲",  color: "#a0a0a0", glow: "rgba(160,160,160,0.2)", desc: "AAA & 3D Premium"     },
  { name: "Electron",      letter: "◈",  color: "#9feaf9", glow: "rgba(159,234,249,0.2)", desc: "Desktop Apps"         },
  { name: "MySQL",         letter: "▦",  color: "#4479a1", glow: "rgba(68,121,161,0.2)",  desc: "Banco de Dados"       },
]

const secondaryTechs = [
  { name: "Vite",    color: "#646cff" },
  { name: "Blender", color: "#ea7600" },
  { name: "GitHub",  color: "#e6edf3" },
  { name: "Python",  color: "#ffd43b" },
  { name: "SQLite",  color: "#003b57" },
  { name: "Tailwind",color: "#38bdf8" },
  { name: "React Native", color: "#61dafb" },
  { name: "GDScript",color: "#478cbf" },
]

// ── Card de tecnologia principal ──────────────────────────
function TechCard({ tech, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative p-5 sm:p-6 rounded-2xl transition-all duration-350 overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Glow hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 10%, ${tech.glow}, transparent 70%)` }}
        aria-hidden="true"
      />
      {/* Top line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${tech.color}80, transparent)` }}
        aria-hidden="true"
      />
      {/* Shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)" }}
        aria-hidden="true"
      />

      {/* Ícone letter */}
      <div
        className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
        style={{
          background: `${tech.color}14`,
          border: `1px solid ${tech.color}30`,
          color: tech.color,
          textShadow: `0 0 12px ${tech.color}60`,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {tech.letter}
      </div>

      <h3
        className="relative text-white font-bold text-sm sm:text-base mb-1 leading-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {tech.name}
      </h3>
      <p className="relative text-slate-600 text-xs">{tech.desc}</p>

      {/* Dot indicador */}
      <div
        className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

// ── Ticker de tecnologias secundárias ─────────────────────
function TechTicker({ isInView }) {
  const doubled = [...secondaryTechs, ...secondaryTechs]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative overflow-hidden mt-8"
      aria-hidden="true"
    >
      {/* Fade laterais */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #020617, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #020617, transparent)" }} />

      <div className="flex animate-ticker gap-4" style={{ width: "max-content" }}>
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${tech.color}22`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: tech.color, boxShadow: `0 0 5px ${tech.color}` }} />
            <span className="text-slate-400 text-xs font-medium whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Technologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="tecnologias" className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #020617, #030e1d, #020617)" }}
        aria-hidden="true"
      />

      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06), rgba(59,130,246,0.04), transparent)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            Stack Técnica
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tecnologias que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              dominamos
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Ferramentas escolhidas com critério — cada uma resolvendo um problema específico no stack.
          </p>
        </motion.div>

        {/* Grid principal — 3 cols mobile adaptativo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-4">
          {mainTechs.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Ticker de techs secundárias */}
        <TechTicker isInView={isInView} />

        {/* Nota */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-slate-700 text-xs mt-8 tracking-wide uppercase"
        >
          Stack em constante evolução — sempre aprendendo novas ferramentas
        </motion.p>
      </div>
    </section>
  )
}
