import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Wifi, Package, Cpu, TrendingUp } from "lucide-react"

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Creative solutions combining cutting-edge technology with real market needs and Brazilian ingenuity.",
    color: "blue",
  },
  {
    icon: Wifi,
    title: "Remote-First",
    description: "100% remote studio operating with collaborative tools and seamless digital delivery worldwide.",
    color: "violet",
  },
  {
    icon: Package,
    title: "Real Products",
    description: "Focus on building products that solve concrete problems, with a defined roadmap and execution plan.",
    color: "blue",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Integrating artificial intelligence into every layer — from automation to user experience.",
    color: "violet",
  },
  {
    icon: TrendingUp,
    title: "Scalable by Design",
    description: "Architecture built to grow alongside the business — without constant refactoring or tech debt.",
    color: "blue",
  },
]

const colorMap = {
  blue:   { bg: "bg-blue-500/8",   border: "border-blue-500/20",   icon: "text-blue-400",   iconBg: "bg-blue-500/12",   hover: "hover:border-blue-500/35" },
  violet: { bg: "bg-violet-500/8", border: "border-violet-500/20", icon: "text-violet-400", iconBg: "bg-violet-500/12", hover: "hover:border-violet-500/35" },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="sobre" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020617, #030d1a, #020617)" }} aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            About the Studio
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              BHADOTT
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed px-2">
            <span className="text-blue-400 font-semibold">BHADOTT Remote Studios</span> was born
            to organize, develop and launch digital projects professionally. The studio works with
            systems, applications, games, automations and AI solutions — uniting ideas into a
            strong, scalable brand prepared to grow globally from Brazil.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {pillars.map((pillar, i) => {
            const c = colorMap[pillar.color]
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`group relative p-5 rounded-2xl ${c.bg} border ${c.border} ${c.hover} transition-all duration-300 hover:shadow-lg`}
                style={{ "--tw-shadow": "0 0 20px rgba(59,130,246,0.08)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/3 to-transparent" aria-hidden="true" />
                <div className={`inline-flex p-2.5 rounded-xl ${c.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={c.icon} aria-hidden="true" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{pillar.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
