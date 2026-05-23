import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bot, Server, Smartphone, Gamepad2, GraduationCap, Cloud, ArrowRight } from "lucide-react"

const futureDivisions = [
  {
    id: "ai",
    icon: Bot,
    name: "BHADOTT AI",
    tagline: "Artificial Intelligence Division",
    description: "Generative AI solutions, automation pipelines, intelligent chatbots and machine learning integrations.",
    color: "blue",
    status: "In Development",
  },
  {
    id: "systems",
    icon: Server,
    name: "BHADOTT Systems",
    tagline: "Enterprise SaaS Platform",
    description: "Complex SaaS platforms, ERPs, management dashboards and enterprise-grade digital systems.",
    color: "violet",
    status: "Active",
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "BHADOTT Mobile",
    tagline: "Mobile App Studio",
    description: "Native and cross-platform mobile apps for Android and iOS with premium user experiences.",
    color: "blue",
    status: "In Development",
  },
  {
    id: "games",
    icon: Gamepad2,
    name: "BHADOTT Games",
    tagline: "Game Development Studio",
    description: "Game prototypes, 3D experiences, Unreal Engine projects and immersive interactive worlds.",
    color: "violet",
    status: "Prototypes",
  },
  {
    id: "academy",
    icon: GraduationCap,
    name: "BHADOTT Academy",
    tagline: "Digital Learning Platform",
    description: "Courses, tutorials, e-books and educational content about technology and digital creation.",
    color: "blue",
    status: "Coming Soon",
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "BHADOTT Cloud",
    tagline: "Cloud & Infrastructure",
    description: "Cloud hosting, CI/CD pipelines, DevOps automation and scalable infrastructure solutions.",
    color: "violet",
    status: "Planning",
  },
]

const colorMap = {
  blue:   { border: "border-blue-500/18",   hover: "hover:border-blue-500/40",   icon: "text-blue-400",   iconBg: "bg-blue-500/10",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   glow: "rgba(59,130,246,0.1)" },
  violet: { border: "border-violet-500/18", hover: "hover:border-violet-500/40", icon: "text-violet-400", iconBg: "bg-violet-500/10", badge: "bg-violet-500/10 text-violet-400 border-violet-500/20", glow: "rgba(139,92,246,0.1)" },
}

export default function FutureSections() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="divisoes" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020617, #04091a, #020617)" }} aria-hidden="true" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            The Ecosystem
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            BHADOTT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Divisions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            A growing ecosystem of specialized digital divisions — each focused on a specific frontier of technology.
          </p>
        </motion.div>

        {/* Grid of division cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {futureDivisions.map((div, i) => {
            const c = colorMap[div.color]
            const Icon = div.icon

            return (
              <motion.div
                key={div.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                whileHover={{ y: -5 }}
                className={`group relative p-6 rounded-2xl border ${c.border} ${c.hover} transition-all duration-300 overflow-hidden`}
                style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 70%)` }}
                  aria-hidden="true"
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to right, transparent, ${div.color === "blue" ? "rgba(59,130,246,0.5)" : "rgba(139,92,246,0.5)"}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon + Status */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${c.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className={c.icon} aria-hidden="true" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${c.badge}`}>
                    {div.status}
                  </span>
                </div>

                {/* Content */}
                <p className="relative text-xs text-slate-600 font-medium uppercase tracking-wider mb-1">
                  {div.tagline}
                </p>
                <h3
                  className="relative text-white font-bold text-lg mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {div.name}
                </h3>
                <p className="relative text-slate-500 text-sm leading-relaxed mb-5">
                  {div.description}
                </p>

                {/* Arrow hint */}
                <div className={`relative flex items-center gap-1.5 text-xs font-semibold ${c.icon} opacity-40 group-hover:opacity-100 transition-opacity`}>
                  <span>Learn more</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
