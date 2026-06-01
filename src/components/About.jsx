// ============================================================
// BHADOTT Studio — About Section FASE 3
// src/components/About.jsx — Glassmorphism + PT-BR
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Wifi, Package, Cpu, TrendingUp } from "lucide-react"

const pillars = [
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Soluções criativas unindo tecnologia de ponta com necessidades reais do mercado e engenhosidade brasileira.",
    color: "blue",
  },
  {
    icon: Wifi,
    title: "Remoto First",
    description: "Estúdio independente operando de forma distribuída com ferramentas globais e entrega digital.",
    color: "violet",
  },
  {
    icon: Package,
    title: "Produtos Reais",
    description: "Foco em construir produtos que resolvem problemas concretos, com roadmap definido e execução.",
    color: "blue",
  },
  {
    icon: Cpu,
    title: "IA Integrada",
    description: "Inteligência artificial em todas as camadas — da automação à experiência do usuário final.",
    color: "violet",
  },
  {
    icon: TrendingUp,
    title: "Escalável",
    description: "Arquitetura pensada para crescer junto com o negócio — sem refatorações constantes ou dívida técnica.",
    color: "blue",
  },
]

const colorMap = {
  blue: {
    border:   "border-blue-500/18",
    hoverBorder: "rgba(59,130,246,0.45)",
    icon:     "text-blue-400",
    iconBg:   "bg-blue-500/10 border-blue-500/20",
    glow:     "rgba(59,130,246,0.09)",
    topLine:  "rgba(59,130,246,0.5)",
  },
  violet: {
    border:   "border-violet-500/18",
    hoverBorder: "rgba(139,92,246,0.45)",
    icon:     "text-violet-400",
    iconBg:   "bg-violet-500/10 border-violet-500/20",
    glow:     "rgba(139,92,246,0.09)",
    topLine:  "rgba(139,92,246,0.5)",
  },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="sobre" className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #020617, #030d1a, #020617)" }}
        aria-hidden="true"
      />

      {/* Glows decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            Sobre o Estúdio
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Sobre o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              BHADOTT
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed px-2">
            <span className="text-blue-400 font-semibold">BHADOTT Studio</span> é um estúdio de tecnologia criativa
            focado em games, IA e experiências digitais premium. De sistemas e apps a mundos 3D imersivos —
            construímos projetos ambiciosos com identidade forte, feitos no Brasil com visão global.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {pillars.map((pillar, i) => {
            const c = colorMap[pillar.color]
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative p-5 sm:p-6 rounded-2xl border ${c.border} transition-all duration-350 overflow-hidden cursor-default`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 40% 0%, ${c.glow}, transparent 70%)` }}
                  aria-hidden="true"
                />
                {/* Top accent */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl"
                  style={{ background: `linear-gradient(to right, transparent, ${c.topLine}, transparent)` }}
                  aria-hidden="true"
                />
                {/* Shine diagonal */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }}
                  aria-hidden="true"
                />

                <div className={`relative inline-flex p-3 rounded-xl border ${c.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={c.icon} aria-hidden="true" />
                </div>
                <h3
                  className="relative text-white font-bold text-sm sm:text-base mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="relative text-slate-500 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
