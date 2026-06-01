// ============================================================
// BHADOTT Studio — Stats Section FASE 3
// src/components/Stats.jsx — Glassmorphism + animações premium
// ============================================================

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Layers, Cpu, Globe, Rocket, Code2, Zap } from "lucide-react"

const stats = [
  {
    icon:   Rocket,
    value:  3,
    suffix: "+",
    label:  "Projetos Ativos",
    desc:   "Em desenvolvimento simultâneo",
    color:  "blue",
    glyph:  "01",
  },
  {
    icon:   Cpu,
    value:  9,
    suffix: "+",
    label:  "Tecnologias",
    desc:   "No stack ativo do estúdio",
    color:  "violet",
    glyph:  "02",
  },
  {
    icon:   Layers,
    value:  4,
    suffix: "",
    label:  "Áreas de Atuação",
    desc:   "Sistemas, IA, Games, Automação",
    color:  "blue",
    glyph:  "03",
  },
  {
    icon:   Globe,
    value:  100,
    suffix: "%",
    label:  "Remoto & Ativo",
    desc:   "Estúdio 100% distribuído",
    color:  "violet",
    glyph:  "04",
  },
]

const colorStyle = {
  blue: {
    icon:     "text-blue-400",
    iconBg:   "bg-blue-500/10 border-blue-500/20",
    value:    "from-blue-300 via-cyan-300 to-blue-400",
    border:   "border-blue-500/15",
    hoverBorder: "rgba(59,130,246,0.45)",
    glow:     "rgba(59,130,246,0.10)",
    topLine:  "rgba(59,130,246,0.55)",
    glyph:    "rgba(59,130,246,0.04)",
  },
  violet: {
    icon:     "text-violet-400",
    iconBg:   "bg-violet-500/10 border-violet-500/20",
    value:    "from-violet-300 via-purple-300 to-violet-400",
    border:   "border-violet-500/15",
    hoverBorder: "rgba(139,92,246,0.45)",
    glow:     "rgba(139,92,246,0.10)",
    topLine:  "rgba(139,92,246,0.55)",
    glyph:    "rgba(139,92,246,0.04)",
  },
}

// Hook de contador animado com easing
function useCounter(target, started, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const animate = (ts) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [started, target, duration])
  return count
}

function StatCard({ stat, index, started }) {
  const Icon  = stat.icon
  const s     = colorStyle[stat.color]
  const count = useCounter(stat.value, started, 1400 + index * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.11, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group relative p-6 sm:p-8 rounded-2xl border ${s.border} transition-all duration-400 overflow-hidden text-center cursor-default`}
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Glyph decorativo fundo */}
      <div
        className="absolute top-2 right-3 text-7xl font-black select-none pointer-events-none leading-none"
        style={{ color: s.glyph, fontFamily: "'Space Grotesk', sans-serif" }}
        aria-hidden="true"
      >
        {stat.glyph}
      </div>

      {/* Glow hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${s.glow}, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Top neon line */}
      <div
        className="absolute top-0 inset-x-0 h-px transition-opacity duration-400 rounded-t-2xl"
        style={{
          background: `linear-gradient(to right, transparent, ${s.topLine}, transparent)`,
          opacity: 0,
        }}
        ref={(el) => {
          if (el) {
            const parent = el.closest(".group")
            if (parent) {
              parent.addEventListener("mouseenter", () => { el.style.opacity = "1" })
              parent.addEventListener("mouseleave", () => { el.style.opacity = "0" })
            }
          }
        }}
        aria-hidden="true"
      />

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 inset-x-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${s.topLine.replace("0.55", "0.2")}, transparent)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className={`relative inline-flex p-3.5 rounded-xl border ${s.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className={s.icon} aria-hidden="true" />
      </div>

      {/* Número */}
      <div
        className={`relative text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${s.value} mb-2 tabular-nums leading-none`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        aria-label={`${count}${stat.suffix} ${stat.label}`}
      >
        {count}{stat.suffix}
      </div>

      <h3 className="relative text-white font-bold text-sm sm:text-base mb-1">{stat.label}</h3>
      <p className="relative text-slate-600 text-xs leading-relaxed">{stat.desc}</p>
    </motion.div>
  )
}

export default function Stats() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="stats" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.022] hidden sm:block pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.05), rgba(139,92,246,0.04), transparent)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            Números do Estúdio
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            BHADOTT em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Números
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 text-sm sm:text-base">
            Métricas reais do que construímos e operamos.
          </p>
        </motion.div>

        {/* Grid de stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
