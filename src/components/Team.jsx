// ============================================================
// BHADOTT Studio - Team Section FASE 4
// src/components/Team.jsx - Solo card + glassmorphism + PT-BR
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Box, Github, Instagram, Youtube, Plus, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { teamMain, teamPlaceholders } from "../data/team"

const placeholderIconMap = { Code2, Box }

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const navigate = useNavigate()
  const jorge = teamMain[0]

  return (
    <section id="equipe" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
      <div
        className="absolute right-1/3 top-0 h-96 w-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="section-badge border border-violet-500/20 bg-violet-500/8 text-violet-400">
            Equipe BHADOTT
          </span>
          <h2
            className="mb-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Pessoas e ideias{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              construindo
            </span>
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-base text-slate-400 sm:text-lg">
            Pessoas e ideias construindo o futuro digital da BHADOTT.
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col items-start justify-center gap-8 lg:flex-row lg:gap-10">
          {jorge && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative w-full flex-shrink-0 overflow-hidden rounded-3xl text-center transition-all duration-400 lg:w-80"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${jorge.accentColor.replace("0.3", "0.22")}`,
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 0%, ${jorge.accentColor.replace("0.3", "0.10")}, transparent 65%)` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${jorge.accentColor.replace("0.3", "0.6")}, transparent)` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)" }}
                aria-hidden="true"
              />

              <div className="relative p-8 sm:p-10">
                <div
                  className="mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    color: "#60a5fa",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Fundador
                </div>

                <div className="relative mx-auto mb-6 h-24 w-24">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    className="flex h-full w-full cursor-default items-center justify-center rounded-full text-3xl font-black text-white"
                    style={{
                      background: `linear-gradient(135deg, ${jorge.gradientFrom}, ${jorge.gradientTo})`,
                      boxShadow: `0 0 32px ${jorge.accentColor.replace("0.3", "0.4")}, 0 0 60px ${jorge.accentColor.replace("0.3", "0.15")}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {jorge.initials}
                  </motion.div>
                  <div
                    className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 bg-green-400"
                    style={{ borderColor: "#020617", boxShadow: "0 0 8px rgba(74,222,128,0.7)" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-30 blur-xl transition-opacity group-hover:opacity-55"
                    style={{ background: `linear-gradient(135deg, ${jorge.gradientFrom}, ${jorge.gradientTo})` }}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  className="mb-1 text-xl font-black text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {jorge.name}
                </h3>
                <p className="mb-4 text-sm font-semibold" style={{ color: jorge.gradientFrom }}>
                  {jorge.role}
                </p>
                <p className="mb-7 px-1 text-sm leading-relaxed text-slate-400">
                  {jorge.description}
                </p>

                <div className="mb-6 flex justify-center gap-2.5">
                  {[
                    { key: "github", icon: Github, label: "GitHub", hover: "hover:text-slate-200 hover:border-white/30 hover:bg-white/8" },
                    { key: "instagram", icon: Instagram, label: "Instagram", hover: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/8" },
                    { key: "youtube", icon: Youtube, label: "YouTube", hover: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8" },
                  ].map(({ key, icon: Icon, label, hover }) =>
                    jorge.social[key] ? (
                      <motion.a
                        key={key}
                        href={jorge.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`focus-ring touch-target flex items-center justify-center rounded-xl border border-white/8 p-2.5 text-slate-500 transition-all ${hover}`}
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        aria-label={`${label} - ${jorge.name}`}
                      >
                        <Icon size={15} aria-hidden="true" />
                      </motion.a>
                    ) : null
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/contato")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                    boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                  }}
                >
                  Entrar em contato
                  <ArrowRight size={14} aria-hidden="true" />
                </motion.button>
              </div>
            </motion.div>
          )}

          <div className="flex-1 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: "rgba(59,130,246,0.04)",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
            >
              <p
                className="mb-2 text-sm font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                BHADOTT Studio
              </p>
              <p className="text-sm leading-relaxed text-slate-400">
                BHADOTT Studio é um ecossistema de criação digital focado em sistemas,
                automações, IA local, jogos, conteúdo, design e ferramentas para desenvolvimento.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
                Colaborações futuras
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {teamPlaceholders.map((item, index) => {
                  const Icon = placeholderIconMap[item.icon] || Plus
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.35 + index * 0.08, duration: 0.5 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className={`group rounded-2xl border border-white/6 bg-gradient-to-br ${item.gradient} p-4 transition-all duration-300 hover:border-white/12`}
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/15 bg-white/4 transition-colors group-hover:border-white/25">
                        <Icon size={16} className="text-slate-500 transition-colors group-hover:text-slate-400" aria-hidden="true" />
                      </div>
                      <div className="mb-1 text-sm font-semibold text-white">{item.role}</div>
                      <p className="text-xs leading-relaxed text-slate-400">{item.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded-2xl p-4 sm:p-5"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="mb-2 text-sm font-semibold text-white">Como a equipe pode evoluir</p>
              <p className="text-xs leading-relaxed text-slate-500">
                A BHADOTT poderá contar com parceiros técnicos, designers, editores e
                desenvolvedores conforme os projetos evoluírem.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
