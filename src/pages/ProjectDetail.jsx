// ============================================================
// BHADOTT Studio — Project Detail Page
// src/pages/ProjectDetail.jsx
// Rota: /projetos/:slug
// ============================================================

import { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import {
  CheckCircle2, Circle, Loader2, ArrowRight,
  Github, ExternalLink, MessageCircle, ChevronLeft
} from "lucide-react"
import PageLayout, { GlowDivider } from "../components/PageLayout"
import { getProjectBySlug, statusColors } from "../data/projectsData"

function TimelineStep({ phase, status, index, isInView }) {
  const icon =
    status === "done"    ? <CheckCircle2 size={16} className="text-blue-400" /> :
    status === "active"  ? <Loader2 size={16} className="text-violet-400 animate-spin" /> :
                           <Circle size={16} className="text-slate-700" />

  const label =
    status === "done"   ? "Completed" :
    status === "active" ? "In Progress" : "Upcoming"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      className="flex items-stretch gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background:
              status === "done"   ? "rgba(59,130,246,0.12)" :
              status === "active" ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${
              status === "done"   ? "rgba(59,130,246,0.3)" :
              status === "active" ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)"
            }`,
          }}
        >
          {icon}
        </div>
        <div className="w-px flex-1 min-h-[28px]"
          style={{ background: status === "done" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)" }} />
      </div>
      <div className="pb-7">
        <p className="text-white font-semibold text-sm">{phase}</p>
        <p className="text-slate-600 text-xs mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  const featuresRef  = useRef(null)
  const timelineRef  = useRef(null)
  const featInView   = useInView(featuresRef, { once: true, margin: "-40px" })
  const timeInView   = useInView(timelineRef,  { once: true, margin: "-40px" })

  if (!project) {
    return (
      <PageLayout backLabel="All Projects" backTo="/projetos">
        <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
          <div>
            <p
              className="text-6xl font-black text-slate-800 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >404</p>
            <p className="text-slate-500 mb-6">Project not found.</p>
            <button
              onClick={() => navigate("/projetos")}
              className="px-6 py-3 font-bold text-white rounded-xl text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
            >
              View all projects
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const sc = statusColors[project.statusColor]

  return (
    <PageLayout showBack={false}>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accentColor}12 0%, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: -3 }}
            onClick={() => navigate("/projetos")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-400 transition-colors text-sm mb-8 group focus-ring rounded"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            All Projects
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "#60a5fa",
                }}
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
            <p className="text-xl text-slate-400 mb-6 font-medium">{project.tagline}</p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-white rounded-xl text-sm focus-ring"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-colors focus-ring"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
              )}
              <button
                onClick={() => navigate("/contato")}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-colors focus-ring"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <MessageCircle size={14} aria-hidden="true" />
                Discuss this project
              </button>
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
                Key Features
              </motion.h2>
              <ul className="space-y-3">
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
                      style={{
                        background: `${project.accentColor}18`,
                        border: `1px solid ${project.accentColor}35`
                      }}
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
                className="mt-8"
              >
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
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
                Development Roadmap
              </motion.h2>
              <div>
                {project.timeline.map((step, i) => (
                  <TimelineStep
                    key={step.phase}
                    phase={step.phase}
                    status={step.status}
                    index={i}
                    isInView={timeInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      {/* ── CTA bottom ── */}
      <section className="relative py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Want to know more about{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              {project.name}?
            </span>
          </h2>
          <p className="text-slate-400 mb-8">
            Reach out to discuss partnerships, collaboration or just to follow the project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contato")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-white rounded-xl text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Contact Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/projetos")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              All Projects
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
