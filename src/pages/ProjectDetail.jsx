// ============================================================
// BHADOTT Studio — Project Detail Page FASE 4
// src/pages/ProjectDetail.jsx — PT-BR + CTAs reais
// ============================================================

import { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import {
  CheckCircle2, Circle, Loader2, ArrowRight,
  Github, ExternalLink, MessageCircle, ChevronLeft, Zap
} from "lucide-react"
import PageLayout, { GlowDivider } from "../components/PageLayout"
import { getProjectBySlug, statusColors } from "../data/projectsData"

const WHATSAPP_BASE = "https://wa.me/5500000000000"

function TimelineStep({ phase, status, index, isInView, isLast }) {
  const icon =
    status === "done"   ? <CheckCircle2 size={15} className="text-blue-400" /> :
    status === "active" ? <Loader2 size={15} className="text-violet-400 animate-spin" /> :
                          <Circle size={15} className="text-slate-700" />

  const label =
    status === "done"   ? "Concluído"      :
    status === "active" ? "Em Andamento"   : "Planejado"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.45 }}
      className="flex items-stretch gap-4 group"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background:
              status === "done"   ? "rgba(59,130,246,0.12)" :
              status === "active" ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${
              status === "done"   ? "rgba(59,130,246,0.35)" :
              status === "active" ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.07)"
            }`,
          }}
        >
          {icon}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[24px] mt-1"
            style={{ background: status === "done" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)" }}
          />
        )}
      </div>
      <div className={`pb-${isLast ? "0" : "6"} pt-1.5`}>
        <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">{phase}</p>
        <p
          className="text-xs mt-0.5 font-medium"
          style={{
            color: status === "done"   ? "#60a5fa"
                 : status === "active" ? "#a78bfa" : "#334155",
          }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const project   = getProjectBySlug(slug)

  const featuresRef = useRef(null)
  const timelineRef = useRef(null)
  const ctaRef      = useRef(null)
  const featInView  = useInView(featuresRef, { once: true, margin: "-40px" })
  const timeInView  = useInView(timelineRef,  { once: true, margin: "-40px" })
  const ctaInView   = useInView(ctaRef,       { once: true, margin: "-40px" })

  if (!project) {
    return (
      <PageLayout backLabel="Todos os Projetos" backTo="/projetos">
        <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
          <div>
            <p className="text-6xl font-black text-slate-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>404</p>
            <p className="text-slate-500 mb-6">Projeto não encontrado.</p>
            <button
              onClick={() => navigate("/projetos")}
              className="px-6 py-3 font-bold text-white rounded-xl text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
            >
              Ver todos os projetos
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const sc  = statusColors[project.statusColor]
  const cta = project.cta || {}
  const whatsappHref = cta.primary?.href || `${WHATSAPP_BASE}?text=Olá!%20Tenho%20interesse%20no%20projeto%20${encodeURIComponent(project.name)}.`

  return (
    <PageLayout showBack={false}>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        {/* Glow accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accentColor}12 0%, transparent 70%)` }}
          aria-hidden="true"
        />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.018] hidden sm:block pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Voltar */}
          <motion.button
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: -3 }}
            onClick={() => navigate("/projetos")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-400 transition-colors text-sm mb-10 group focus-ring rounded"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Todos os Projetos
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider"
                style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)", color: "#60a5fa" }}
              >
                {project.category}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                {project.status}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.name}
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-5 font-medium italic">{project.tagline}</p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl mb-10">
              {project.longDescription}
            </p>

            {/* ── CTAs do projeto ── */}
            <div className="flex flex-wrap gap-3">
              {/* WhatsApp / CTA primário */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl text-sm focus-ring"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
              >
                <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                <MessageCircle size={15} className="relative" aria-hidden="true" />
                <span className="relative">Falar sobre o projeto</span>
              </motion.a>

              {/* GitHub se disponível */}
              {(project.links?.github || cta.github) && (
                <motion.a
                  href={project.links?.github || cta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-all focus-ring"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Github size={15} aria-hidden="true" />
                  Ver no GitHub
                </motion.a>
              )}

              {/* Demo se disponível */}
              {project.links?.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-all focus-ring"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Ver Demo
                </motion.a>
              )}

              {/* Badge "Em desenvolvimento" se não tiver demo/github */}
              {!project.links?.demo && !project.links?.github && !cta.github && (
                <div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold"
                  style={{
                    background: `${project.accentColor}12`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                >
                  <Zap size={12} aria-hidden="true" />
                  Em Desenvolvimento Ativo
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <GlowDivider color="mixed" />

      {/* ── Features + Timeline ── */}
      <section className="relative py-16 sm:py-20">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #020617, #030d1c, #020617)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Features */}
            <div ref={featuresRef}>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Funcionalidades
              </motion.h2>
              <ul className="space-y-3 mb-8">
                {project.features.map((feat, i) => (
                  <motion.li
                    key={feat}
                    initial={{ opacity: 0, x: -16 }}
                    animate={featInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accentColor }} />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{feat}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.45 }}
              >
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">
                  Stack Técnica
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Timeline */}
            <div ref={timelineRef}>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={timeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Roadmap de Desenvolvimento
              </motion.h2>
              <div>
                {project.timeline.map((step, i) => (
                  <TimelineStep
                    key={step.phase}
                    phase={step.phase}
                    status={step.status}
                    index={i}
                    isInView={timeInView}
                    isLast={i === project.timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      {/* ── CTA final ── */}
      <section className="relative py-20 sm:py-24 text-center overflow-hidden" ref={ctaRef}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${project.accentColor}10, rgba(59,130,246,0.05), transparent)` }}
          aria-hidden="true"
        />
        <div className="relative max-w-2xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Quer saber mais sobre{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${project.accentColor}, #a78bfa)` }}
            >
              {project.name}?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-slate-400 mb-8"
          >
            Entre em contato para discutir parcerias, acompanhar o desenvolvimento ou tirar dúvidas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-white rounded-xl text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <MessageCircle size={16} className="relative" aria-hidden="true" />
              <span className="relative">Falar no WhatsApp</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/projetos")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Todos os Projetos
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  )
}
