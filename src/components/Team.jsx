// ============================================================
// BHADOTT Studio — Team Section FASE 4
// src/components/Team.jsx — Solo card + glassmorphism + PT-BR
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
    <section id="equipe" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
      <div
        className="absolute top-0 right-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            A Equipe
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Quem está{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              construindo
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Estúdio independente em crescimento ativo — construído por uma pessoa com visão de produto.
          </p>
        </motion.div>

        {/* Layout: card principal + vagas lado a lado em desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start justify-center max-w-5xl mx-auto">

          {/* ── Card principal — Jorge Alam ── */}
          {jorge && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative w-full lg:w-80 flex-shrink-0 rounded-3xl overflow-hidden transition-all duration-400 text-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${jorge.accentColor.replace("0.3", "0.22")}`,
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${jorge.accentColor.replace("0.3","0.10")}, transparent 65%)` }}
                aria-hidden="true"
              />
              {/* Top line sempre visível */}
              <div
                className="absolute top-0 inset-x-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${jorge.accentColor.replace("0.3","0.6")}, transparent)` }}
                aria-hidden="true"
              />
              {/* Shine hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)" }}
                aria-hidden="true"
              />

              <div className="relative p-8 sm:p-10">
                {/* Badge Founder */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    color: "#60a5fa",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Founder
                </div>

                {/* Avatar */}
                <div className="relative mx-auto mb-6 w-24 h-24">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    className="w-full h-full rounded-full flex items-center justify-center text-3xl font-black text-white cursor-default"
                    style={{
                      background: `linear-gradient(135deg, ${jorge.gradientFrom}, ${jorge.gradientTo})`,
                      boxShadow: `0 0 32px ${jorge.accentColor.replace("0.3","0.4")}, 0 0 60px ${jorge.accentColor.replace("0.3","0.15")}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {jorge.initials}
                  </motion.div>
                  {/* Online dot */}
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2"
                    style={{ borderColor: "#020617", boxShadow: "0 0 8px rgba(74,222,128,0.7)" }}
                  />
                  {/* Glow blur */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-55 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${jorge.gradientFrom}, ${jorge.gradientTo})` }}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  className="text-white font-black text-xl mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {jorge.name}
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: jorge.gradientFrom }}>
                  {jorge.role}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-7 px-1">
                  {jorge.description}
                </p>

                {/* Redes sociais */}
                <div className="flex justify-center gap-2.5 mb-6">
                  {[
                    { key: "github",    icon: Github,    label: "GitHub",    hover: "hover:text-slate-200 hover:border-white/30 hover:bg-white/8"  },
                    { key: "instagram", icon: Instagram, label: "Instagram", hover: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/8" },
                    { key: "youtube",   icon: Youtube,   label: "YouTube",   hover: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8"  },
                  ].map(({ key, icon: Icon, label, hover }) =>
                    jorge.social[key] ? (
                      <motion.a
                        key={key}
                        href={jorge.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2.5 rounded-xl border border-white/8 text-slate-500 transition-all touch-target flex items-center justify-center focus-ring ${hover}`}
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        aria-label={`${label} — ${jorge.name}`}
                      >
                        <Icon size={15} aria-hidden="true" />
                      </motion.a>
                    ) : null
                  )}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/contato")}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 font-bold text-white rounded-xl text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                    boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                  }}
                >
                  Entrar em Contato
                  <ArrowRight size={14} aria-hidden="true" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Direita: vagas + nota ── */}
          <div className="flex-1 space-y-5">

            {/* Nota sobre o estúdio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: "rgba(59,130,246,0.04)",
                border: "1px solid rgba(59,130,246,0.12)",
              }}
            >
              <p
                className="text-white font-bold text-sm mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                🏗️ Estúdio em construção ativa
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                A BHADOTT Studio é um projeto independente em evolução contínua. Os projetos
                são construídos de forma progressiva, com publicação aberta no GitHub Pages e
                portfólio em constante atualização.
              </p>
            </motion.div>

            {/* Vagas abertas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3 px-1">
                Vagas futuras
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {teamPlaceholders.map((p, i) => {
                  const Icon = placeholderIconMap[p.icon] || Plus
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className={`group p-4 rounded-2xl bg-gradient-to-br ${p.gradient} border border-white/6 text-center transition-all duration-300 hover:border-white/12`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/4 border border-dashed border-white/15 flex items-center justify-center mx-auto mb-2.5 group-hover:border-white/25 transition-colors">
                        <Icon size={16} className="text-slate-500 group-hover:text-slate-400 transition-colors" aria-hidden="true" />
                      </div>
                      <div className="text-white font-semibold text-xs mb-1">{p.role}</div>
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-700">
                        <Plus size={8} aria-hidden="true" />
                        Em breve
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* CTA para fazer parte */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <p className="text-white text-sm font-semibold">Quer fazer parte?</p>
                <p className="text-slate-500 text-xs mt-0.5">Entre em contato e apresente sua proposta.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contato")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ml-4"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  color: "#a78bfa",
                }}
              >
                Fale comigo
                <ArrowRight size={12} aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
