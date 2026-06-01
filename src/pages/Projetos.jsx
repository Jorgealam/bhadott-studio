// ============================================================
// BHADOTT Studio — Projetos Page
// src/pages/Projetos.jsx
// ============================================================

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Filter, Code2, Layers, Cpu } from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"
import { projectsData, statusColors } from "../data/projectsData"

// Ícones por categoria
const iconSvgs = {
  Tractor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/>
      <circle cx="9" cy="18" r="3"/><circle cx="20" cy="18" r="3"/>
      <path d="M9 15v-3h3l4 4"/>
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="2" y="6" width="14" height="12" rx="2"/>
      <path d="m22 8-6 4 6 4V8z"/>
    </svg>
  ),
  Gamepad2: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
      <circle cx="15" cy="12" r="1"/><circle cx="18" cy="9" r="1"/>
      <rect x="2" y="6" width="20" height="12" rx="5"/>
    </svg>
  ),
  Wrench: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
}

const categories = [
  { id: "All",       label: "Todos"    },
  { id: "SaaS",      label: "SaaS"     },
  { id: "AI",        label: "IA"       },
  { id: "Games",     label: "Games"    },
  { id: "Tools",     label: "Ferramentas" },
  { id: "Education", label: "Educação" },
]

export default function Projetos() {
  const [activeFilter, setActiveFilter] = useState("All")
  const navigate = useNavigate()
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-40px" })

  const filtered = projectsData.filter((p) => {
    if (activeFilter === "All")       return true
    if (activeFilter === "SaaS")      return p.category.includes("SaaS")
    if (activeFilter === "AI")        return p.category.includes("AI")
    if (activeFilter === "Games")     return p.category.includes("Games")
    if (activeFilter === "Tools")     return p.category.includes("Tools")
    if (activeFilter === "Education") return p.category.includes("Education")
    return true
  })

  return (
    <PageLayout backLabel="Voltar para Home" backTo="/">
      <PageHero
        badge="Nossos Projetos"
        title="Projetos em"
        titleGrad="Desenvolvimento"
        subtitle="Cinco iniciativas digitais do BHADOTT Studio — de AgroTech a Games, IA e muito mais."
      />

      <GlowDivider color="blue" />

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        <div ref={gridRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
            role="group"
            aria-label="Filtrar projetos por categoria"
          >
            <Filter size={14} className="text-slate-600 self-center mr-1 hidden sm:block" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus-ring"
                style={{
                  background: activeFilter === cat.id ? "linear-gradient(135deg, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeFilter === cat.id ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  color: activeFilter === cat.id ? "#fff" : "#64748b",
                  boxShadow: activeFilter === cat.id ? "0 0 16px rgba(59,130,246,0.3)" : "none",
                }}
                aria-pressed={activeFilter === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Project cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((project, i) => {
              const Icon = iconSvgs[project.icon]
              const sc = statusColors[project.statusColor]
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className={`group relative p-6 sm:p-7 rounded-2xl border ${project.border} transition-all duration-350 overflow-hidden flex flex-col`}
                  style={{
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                  onClick={() => navigate(`/projetos/${project.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/projetos/${project.slug}`)}
                  aria-label={`Ver detalhes de ${project.name}`}
                >
                  {/* Gradient overlay sutil */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none`} aria-hidden="true" />
                  {/* Shine diagonal hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }} aria-hidden="true" />
                  {/* Glow border hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}55, 0 0 30px ${project.accentColor}15` }} aria-hidden="true" />
                  {/* Top accent line */}
                  <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}80, transparent)` }} aria-hidden="true" />

                  {/* Top row: icon + status */}
                  <div className="relative flex items-start justify-between mb-5">
                    <div
                      className="p-3 rounded-xl border border-white/10 text-white group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${project.accentColor}18` }}
                    >
                      {Icon ? <Icon /> : <Layers size={20} />}
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Category + Name + Description */}
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{project.category}</p>
                  <h2
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                  {/* Tech stack chips */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#94a3b8",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#64748b",
                          }}
                        >
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Botão Saiba Mais */}
                  <div
                    className="relative flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                    style={{ color: project.accentColor }}
                  >
                    <Code2 size={13} aria-hidden="true" />
                    Saiba Mais
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-200" aria-hidden="true" />
                  </div>
                </motion.article>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-600">
              Nenhum projeto nesta categoria ainda.
            </div>
          )}
        </div>
      </section>

      <section className="relative py-16 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-base mb-6">
            Interessado em colaborar ou acompanhar o desenvolvimento?
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contato")}
            className="px-8 py-3.5 font-bold text-white rounded-xl text-sm"
            style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
          >
            Entrar em Contato
          </motion.button>
        </div>
      </section>
    </PageLayout>
  )
}
