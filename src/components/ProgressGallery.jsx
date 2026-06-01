// ============================================================
// BHADOTT Studio — Progress Gallery Section
// src/components/ProgressGallery.jsx
// Galeria de progresso dos projetos (preparada para screenshots)
// ============================================================

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Image, Monitor, Gamepad2, Cpu, Plus } from "lucide-react"

// Categorias de galeria
const categories = ["Todos", "Sistemas", "Jogos", "UI/UX"]

// Itens da galeria — substitua imageUrl por caminhos reais quando disponíveis
const galleryItems = [
  {
    id: 1,
    title: "EasyAgro — Dashboard Principal",
    project: "EasyAgro Solutions",
    category: "Sistemas",
    status: "preview",
    icon: Monitor,
    color: "green",
    imageUrl: null, // substitua por: "/screenshots/easyagro-dashboard.png"
    desc: "Painel de controle central da propriedade rural.",
  },
  {
    id: 2,
    title: "EasyAgro — Módulo Financeiro",
    project: "EasyAgro Solutions",
    category: "Sistemas",
    status: "preview",
    icon: Monitor,
    color: "green",
    imageUrl: null,
    desc: "Controle de receitas, despesas e relatórios.",
  },
  {
    id: 3,
    title: "Control Center — Painel Principal",
    project: "BHADOTT Control Center",
    category: "Sistemas",
    status: "preview",
    icon: Cpu,
    color: "violet",
    imageUrl: null,
    desc: "Hub central de gestão de projetos e builds.",
  },
  {
    id: 4,
    title: "Neon Survivor — Gameplay",
    project: "Neon Survivor",
    category: "Jogos",
    status: "preview",
    icon: Gamepad2,
    color: "purple",
    imageUrl: null,
    desc: "Cena de gameplay com shaders neon ativos.",
  },
  {
    id: 5,
    title: "Neon Survivor — Menu Principal",
    project: "Neon Survivor",
    category: "Jogos",
    status: "preview",
    icon: Gamepad2,
    color: "purple",
    imageUrl: null,
    desc: "Interface principal do jogo com estética cyberpunk.",
  },
  {
    id: 6,
    title: "BHADOTT Studio — Site",
    project: "Identidade Visual",
    category: "UI/UX",
    status: "live",
    icon: Image,
    color: "blue",
    imageUrl: null,
    desc: "Interface premium do site institucional do estúdio.",
  },
]

const colorStyle = {
  blue:   { bg: "rgba(59,130,246,0.06)",  border: "rgba(59,130,246,0.2)",  text: "#60a5fa",  glow: "rgba(59,130,246,0.12)"  },
  violet: { bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.2)", text: "#a78bfa", glow: "rgba(139,92,246,0.12)" },
  green:  { bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.2)",  text: "#4ade80",  glow: "rgba(34,197,94,0.12)"  },
  purple: { bg: "rgba(168,85,247,0.06)", border: "rgba(168,85,247,0.2)", text: "#d946ef",  glow: "rgba(168,85,247,0.12)" },
}

function GalleryCard({ item, index, isInView }) {
  const Icon = item.icon
  const s    = colorStyle[item.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl overflow-hidden border transition-all duration-300"
      style={{ background: s.bg, borderColor: s.border }}
    >
      {/* Preview area */}
      <div
        className="relative aspect-video flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(2,6,23,0.8)" }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder quando não há screenshot */
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${s.glow}`, border: `1px solid ${s.border}` }}
            >
              <Icon size={24} style={{ color: s.text }} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: s.text }}>
                Screenshot em breve
              </p>
              <p className="text-slate-700 text-xs mt-0.5">{item.project}</p>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2 py-0.5 text-xs font-semibold rounded-full"
            style={{
              background: item.status === "live" ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
              border: item.status === "live" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)",
              color: item.status === "live" ? "#4ade80" : "#64748b",
            }}
          >
            {item.status === "live" ? "● Live" : "Preview"}
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: s.text }}>
          {item.category} · {item.project}
        </p>
        <h3 className="text-white font-semibold text-sm mb-1 leading-snug">{item.title}</h3>
        <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ProgressGallery() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const filtered = activeFilter === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <section id="galeria" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-14"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            Galeria de Progresso
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            O que estamos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              construindo
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Acompanhe o progresso visual dos projetos em desenvolvimento — interfaces, jogos e sistemas.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="group"
          aria-label="Filtrar galeria"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus-ring"
              style={{
                background: activeFilter === cat ? "linear-gradient(135deg, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeFilter === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
                color: activeFilter === cat ? "#fff" : "#64748b",
                boxShadow: activeFilter === cat ? "0 0 16px rgba(59,130,246,0.3)" : "none",
              }}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Add screenshots note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 p-4 rounded-xl border border-white/5 text-center"
          style={{ background: "rgba(59,130,246,0.02)" }}
        >
          <div className="flex items-center justify-center gap-2 text-slate-700 text-xs">
            <Plus size={12} aria-hidden="true" />
            <span>
              Screenshots reais serão adicionados conforme o desenvolvimento avança.
              Defina <code className="font-mono text-slate-600">imageUrl</code> em{" "}
              <code className="font-mono text-slate-600">ProgressGallery.jsx</code> para exibir imagens reais.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
