import { motion } from "framer-motion"
import { ArrowRight, Compass } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { portalAreas } from "../data/portalAreas"

export default function PortalPreview() {
  const navigate = useNavigate()

  const go = (area) => {
    navigate(area.route || `/portal/${area.id}`)
    window.scrollTo(0, 0)
  }

  return (
    <section id="portal" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#03081a]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-500/[0.035] to-transparent" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs uppercase tracking-[0.18em] font-bold mb-4">
              <Compass size={15} aria-hidden="true" /> Ecossistema digital
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Um estúdio. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Muitas áreas.</span>
            </h2>
            <p className="text-slate-400 mt-5 leading-relaxed max-w-xl">
              O BHADOTT está crescendo como um portal de projetos, conhecimento, criatividade e ferramentas úteis.
            </p>
          </div>
          <button onClick={() => navigate("/portal")} className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 focus-ring rounded self-start lg:self-auto">
            Conhecer o portal <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {portalAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => go(area)}
                className="group p-4 sm:p-5 text-left rounded-2xl border border-white/7 bg-white/[0.025] hover:bg-white/[0.045] hover:border-blue-400/20 transition-all focus-ring"
              >
                <Icon size={20} className="text-blue-400 mb-4 group-hover:text-violet-300 transition-colors" aria-hidden="true" />
                <h3 className="text-sm sm:text-base font-bold text-white">{area.shortLabel || area.label}</h3>
                <span className="block text-[10px] uppercase tracking-wider text-slate-600 mt-2">{area.status}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
