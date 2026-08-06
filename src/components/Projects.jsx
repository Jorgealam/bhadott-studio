// ============================================================
// BHADOTT Studio — Projects Section FASE 3
// src/components/Projects.jsx — Glassmorphism + PT-BR
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { featuredProjects, statusColors } from "../data/projectsData"

const iconSvgs = {
  BhadottAgro: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/>
      <circle cx="9" cy="18" r="3"/><circle cx="20" cy="18" r="3"/>
      <path d="M9 15v-3h3l4 4"/>
    </svg>
  ),
  Control: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M6 8h4M6 11h3"/>
      <circle cx="16" cy="9" r="2"/>
    </svg>
  ),
  Game: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
      <circle cx="15" cy="12" r="1"/><circle cx="18" cy="9" r="1"/>
      <rect x="2" y="6" width="20" height="12" rx="5"/>
    </svg>
  ),
}

function getIcon(slug) {
  if (slug.includes("bhadott-agro") || slug.includes("easyagro")) return iconSvgs.BhadottAgro
  if (slug.includes("control"))  return iconSvgs.Control
  return iconSvgs.Game
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const navigate = useNavigate()

  return (
    <section id="projetos" className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #020617, #040d21, #020617)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
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
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            Nossos Projetos
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Projetos em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Desenvolvimento
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Produtos digitais construídos com foco em qualidade, escalabilidade e inovação real.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredProjects.map((project, i) => {
            const Icon = getIcon(project.slug)
            const sc = statusColors[project.statusColor]

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/projetos/${project.slug}`)}
                className={`group relative p-6 sm:p-7 rounded-2xl border ${project.border} transition-all duration-350 overflow-hidden flex flex-col cursor-pointer`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/projetos/${project.slug}`)}
                aria-label={`Ver detalhes de ${project.name}`}
              >
                {/* Gradient overlay sutil */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-br ${project.gradient} pointer-events-none`}
                  aria-hidden="true"
                />

                {/* Shine diagonal hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
                  aria-hidden="true"
                />

                {/* Glow border hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}55, 0 0 32px ${project.accentColor}18` }}
                  aria-hidden="true"
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}80, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon + Status */}
                <div className="relative flex items-start justify-between mb-5">
                  <div
                    className="p-3 rounded-xl border border-white/10 text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${project.accentColor}18` }}
                  >
                    <Icon />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                    {project.status}
                  </span>
                </div>

                {/* Category + Name */}
                <p className="relative text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{project.category}</p>
                <h3
                  className="relative text-white font-bold text-lg sm:text-xl mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.name}
                </h3>

                {/* Tagline */}
                <p className="relative text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack chips */}
                {project.techStack && (
                  <div className="relative flex flex-wrap gap-1.5 mb-5">
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
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#475569" }}
                      >
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="relative flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: project.accentColor }}>
                  <ExternalLink size={13} aria-hidden="true" />
                  Saiba Mais
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-200" aria-hidden="true" />
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* CTA Ver Todos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/projetos")}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-bold text-white rounded-xl text-sm transition-all"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#a78bfa",
            }}
          >
            Ver todos os projetos
            <ArrowRight size={15} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
