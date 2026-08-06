// ============================================================
// BHADOTT Studio — Roadmap Section FASE 3
// src/components/Roadmap.jsx — Timeline Neon Premium
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  CheckCircle2, Loader2, Circle, Rocket,
  Building2, Gamepad2, Bot, Smartphone, Layers, ShoppingBag
} from "lucide-react"

const phases = [
  {
    phase: "Atual — 2025/2026",
    status: "active",
    color: "blue",
    items: [
      { icon: Building2,  label: "BHADOTT Studio",         desc: "Estruturação do estúdio e identidade da marca.",  status: "done"   },
      { icon: Layers,     label: "BHADOTT Agro Solutions", desc: "Sistema de gestão agrícola para produtores.",      status: "active" },
      { icon: Rocket,     label: "BHADOTT Control Center", desc: "Plataforma de produtividade e IA local.",          status: "active" },
      { icon: Gamepad2,   label: "Neon Survivor",          desc: "Jogo roguelite de sobrevivência em Godot.",        status: "active" },
    ],
  },
  {
    phase: "Futuro — 2026+",
    status: "pending",
    color: "violet",
    items: [
      { icon: Bot,         label: "BHADOTT AI",          desc: "Divisão dedicada a soluções de IA generativa.",       status: "pending" },
      { icon: Smartphone,  label: "Aplicativos Mobile",  desc: "Apps nativos iOS e Android para nossos sistemas.",    status: "pending" },
      { icon: Layers,      label: "Ferramentas SaaS",    desc: "Micro-produtos SaaS baseados em ferramentas internas.", status: "pending" },
      { icon: ShoppingBag, label: "Marketplace Digital", desc: "Plataforma para distribuição de produtos digitais.",  status: "pending" },
    ],
  },
]

const statusConfig = {
  done: {
    icon:   <CheckCircle2 size={14} className="text-blue-400" />,
    label:  "Concluído",
    ring:   "rgba(59,130,246,0.3)",
    bg:     "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    line:   "rgba(59,130,246,0.25)",
  },
  active: {
    icon:   <Loader2 size={14} className="text-violet-400 animate-spin" />,
    label:  "Em Andamento",
    ring:   "rgba(139,92,246,0.3)",
    bg:     "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.35)",
    line:   "rgba(139,92,246,0.2)",
  },
  pending: {
    icon:   <Circle size={14} className="text-slate-700" />,
    label:  "Planejado",
    ring:   "rgba(255,255,255,0.06)",
    bg:     "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)",
    line:   "rgba(255,255,255,0.04)",
  },
}

const phaseConfig = {
  blue: {
    dot:       "#60a5fa",
    dotGlow:   "0 0 12px rgba(59,130,246,0.7)",
    badge:     "bg-blue-500/10 border-blue-500/25 text-blue-400",
    cardBorder:"border-blue-500/18",
    topLine:   "rgba(59,130,246,0.5)",
    glow:      "rgba(59,130,246,0.05)",
  },
  violet: {
    dot:       "#a78bfa",
    dotGlow:   "0 0 12px rgba(139,92,246,0.7)",
    badge:     "bg-violet-500/10 border-violet-500/25 text-violet-400",
    cardBorder:"border-violet-500/18",
    topLine:   "rgba(139,92,246,0.5)",
    glow:      "rgba(139,92,246,0.05)",
  },
}

function TimelineItem({ item, phaseIndex, itemIndex, isInView, isLast, phaseColor }) {
  const Icon = item.icon
  const sc = statusConfig[item.status]
  const pc = phaseConfig[phaseColor]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: phaseIndex * 0.18 + itemIndex * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 group"
    >
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot container com pulse ring */}
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ background: sc.bg, border: `1px solid ${sc.border}` }}
          >
            {sc.icon}
          </div>
          {/* Pulse ring para active */}
          {item.status === "active" && (
            <div
              className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
              style={{ border: `1px solid ${sc.ring}` }}
              aria-hidden="true"
            />
          )}
          {/* Pulse ring para done */}
          {item.status === "done" && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: `0 0 8px rgba(59,130,246,0.3)` }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Linha vertical */}
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[28px] mt-1"
            style={{
              background: item.status === "done"
                ? `linear-gradient(to bottom, ${sc.line}, ${sc.line}80)`
                : `linear-gradient(to bottom, ${sc.line}, rgba(255,255,255,0.02))`,
            }}
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className={`pb-${isLast ? "0" : "6"} min-w-0 pt-1.5`}>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Icon size={12} className="text-slate-600 flex-shrink-0" aria-hidden="true" />
          <span
            className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item.label}
          </span>
          <span
            className="hidden sm:inline px-2 py-0.5 text-[10px] font-semibold rounded-full border"
            style={{ background: sc.bg, borderColor: sc.border, color: item.status === "done" ? "#60a5fa" : item.status === "active" ? "#a78bfa" : "#475569" }}
          >
            {sc.label}
          </span>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed pl-5">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="roadmap" className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #020617, #040d1e, #020617)" }}
        aria-hidden="true"
      />

      {/* Glows */}
      <div
        className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            Roadmap
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Onde estamos &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              para onde vamos
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Transparência total sobre o que está sendo construído agora e o que está planejado.
          </p>
        </motion.div>

        {/* Phases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {phases.map((phase, pi) => {
            const pc = phaseConfig[phase.color]
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: pi * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative p-6 sm:p-7 rounded-2xl border ${pc.cardBorder} overflow-hidden`}
                style={{
                  background: "rgba(255,255,255,0.022)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {/* Card glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${pc.glow}, transparent 65%)` }}
                  aria-hidden="true"
                />
                {/* Top line */}
                <div
                  className="absolute top-0 inset-x-0 h-px rounded-t-2xl pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, ${pc.topLine}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Phase header */}
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: pc.dot, boxShadow: pc.dotGlow }}
                    />
                    {phase.status === "active" && (
                      <div
                        className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
                        style={{ border: `1px solid ${pc.dot}`, width: "200%", height: "200%", top: "-50%", left: "-50%" }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3
                    className="text-white font-black text-base sm:text-lg"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {phase.phase}
                  </h3>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${pc.badge}`}>
                    {phase.status === "active" ? "Ativo" : "Planejado"}
                  </span>
                </div>

                {/* Timeline items */}
                <div className="relative space-y-0">
                  {phase.items.map((item, ii) => (
                    <TimelineItem
                      key={item.label}
                      item={item}
                      phaseIndex={pi}
                      itemIndex={ii}
                      isInView={isInView}
                      isLast={ii === phase.items.length - 1}
                      phaseColor={phase.color}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/5"
        >
          {Object.entries(statusConfig).map(([key, sc]) => (
            <div key={key} className="flex items-center gap-2 text-slate-600 text-xs">
              {sc.icon}
              <span>{sc.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
