import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Globe, Server, Smartphone, Bot, LayoutDashboard,
  Gamepad2, Box, Monitor, MessageCircle, Palette, Headphones, Cloud,
} from "lucide-react"
import { services } from "../data/services"

const iconMap = {
  Globe, Server, Smartphone, Bot, LayoutDashboard,
  Gamepad2, Box, Monitor, MessageCircle, Palette, Headphones, Cloud,
}

// Alternating neon colors for cards
const cardPalette = [
  { bg: "bg-blue-500/6",   border: "border-blue-500/15 hover:border-blue-500/35",   icon: "text-blue-400",   iconBg: "bg-blue-500/10"   },
  { bg: "bg-violet-500/6", border: "border-violet-500/15 hover:border-violet-500/35", icon: "text-violet-400", iconBg: "bg-violet-500/10" },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="servicos" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            What We Build
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Services
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            From concept to live product — full-stack digital solutions crafted to transform your idea into reality.
          </p>
        </motion.div>

        {/* Grid 1→2→3→4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            const style = cardPalette[i % 2]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`group p-4 sm:p-5 rounded-2xl ${style.bg} border ${style.border} transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${style.iconBg} flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
                    style={{ boxShadow: "0 0 0 0 transparent" }}
                  >
                    <Icon size={20} className={style.icon} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1 leading-snug">{service.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Anchor tags for nav links AI/Systems/Mobile */}
        <div id="ia" className="absolute" style={{ top: "-80px" }} aria-hidden="true" />
        <div id="sistemas" className="absolute" style={{ top: "-80px" }} aria-hidden="true" />
        <div id="mobile" className="absolute" style={{ top: "-80px" }} aria-hidden="true" />
      </div>
    </section>
  )
}
