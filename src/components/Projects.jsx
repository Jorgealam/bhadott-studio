import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tractor, Video, Gamepad2, Wrench, GraduationCap, ArrowRight, ExternalLink } from "lucide-react"
import { projects } from "../data/projects"

const iconMap = { Tractor, Video, Gamepad2, Wrench, GraduationCap }

const statusStyle = {
  blue:   "bg-blue-500/12 text-blue-400 border-blue-500/25",
  violet: "bg-violet-500/12 text-violet-400 border-violet-500/25",
  yellow: "bg-yellow-500/12 text-yellow-400 border-yellow-500/25",
  green:  "bg-green-500/12 text-green-400 border-green-500/25",
  gray:   "bg-slate-500/12 text-slate-400 border-slate-500/25",
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="projetos" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020617, #040d21, #020617)" }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            Our Projects
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Projects in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Development
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Digital products built with focus on quality, scalability and innovation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon] || Wrench

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.55 }}
                whileHover={{ y: -6 }}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${project.gradient} border ${project.border} backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col`}
                style={{ "--hover-shadow": "0 0 30px rgba(59,130,246,0.15)" }}
              >
                {/* Shine on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/4 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.3)" }} aria-hidden="true" />

                {/* Icon + Status */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/8 border border-white/8" aria-hidden="true">
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusStyle[project.statusColor]}`}>
                    {project.status}
                  </span>
                </div>

                <p className="relative text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  {project.category}
                </p>
                <h3
                  className="relative text-white font-bold text-lg sm:text-xl mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.name}
                </h3>
                <p className="relative text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  className="relative flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-blue-400 transition-colors group/btn focus-ring rounded"
                  aria-label={`View details of ${project.name}`}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  View details
                  <ArrowRight size={13} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" aria-hidden="true" />
                </a>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
