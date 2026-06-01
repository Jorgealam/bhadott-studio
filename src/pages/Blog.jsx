// ============================================================
// BHADOTT Studio — Blog Page
// src/pages/Blog.jsx
// Coming Soon — premium styled
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Rss, BookOpen, Gamepad2, Bot, Code2, Layers, ArrowRight } from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"

const plannedTopics = [
  {
    icon: Gamepad2,
    label: "Game Development",
    desc: "Unreal Engine 5, Blender, game design theory and dev logs from BHADOTT Games.",
    color: "yellow",
  },
  {
    icon: Bot,
    label: "AI & Automation",
    desc: "Practical AI integration, prompt engineering and automation workflows.",
    color: "blue",
  },
  {
    icon: Code2,
    label: "Full-Stack Dev",
    desc: "React, Node.js, SaaS architecture and real-world engineering challenges.",
    color: "violet",
  },
  {
    icon: Layers,
    label: "Creative Tech",
    desc: "The intersection of design, storytelling and technology in digital products.",
    color: "blue",
  },
  {
    icon: BookOpen,
    label: "Studio Updates",
    desc: "Behind the scenes — project progress, decisions and studio life.",
    color: "violet",
  },
]

const colorMap = {
  blue:   { icon: "text-blue-400",   iconBg: "bg-blue-500/10 border-blue-500/20"   },
  violet: { icon: "text-violet-400", iconBg: "bg-violet-500/10 border-violet-500/20" },
  yellow: { icon: "text-yellow-400", iconBg: "bg-yellow-500/10 border-yellow-500/20" },
}

export default function Blog() {
  const topicsRef = useRef(null)
  const isInView  = useInView(topicsRef, { once: true, margin: "-40px" })
  const navigate  = useNavigate()

  return (
    <PageLayout backLabel="Back to Home" backTo="/">
      <PageHero
        badge="Blog"
        title="BHADOTT"
        titleGrad="Blog"
        subtitle="Documentation of the studio's journey — game dev, AI, full-stack development and creative technology. Coming soon."
      />

      <GlowDivider color="mixed" />

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 px-8 rounded-3xl border border-white/6 mb-16 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.03))" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.1), transparent)" }}
              aria-hidden="true"
            />

            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              <Rss size={24} className="text-blue-400" aria-hidden="true" />
            </div>

            <h2
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Content is on its way.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto mb-8">
              The BHADOTT Blog will document everything we build — in-depth, honest and practical.
              Follow our socials to be notified at launch.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://instagram.com/bhadottstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-xl text-sm"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
              >
                Follow on Instagram
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@bhadottstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Subscribe on YouTube
              </a>
            </div>
          </motion.div>

          {/* Planned topics */}
          <div ref={topicsRef}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xl font-black text-white mb-8 text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Planned{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Topics
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plannedTopics.map((topic, i) => {
                const Icon = topic.icon
                const c = colorMap[topic.color]
                return (
                  <motion.div
                    key={topic.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-white/6 hover:border-white/10 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className={`p-2.5 rounded-xl border ${c.iconBg} flex-shrink-0 self-start`}>
                      <Icon size={18} className={c.icon} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{topic.label}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{topic.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
