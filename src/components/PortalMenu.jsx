import { motion } from "framer-motion"
import { ArrowRight, Compass } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { portalAreas } from "../data/portalAreas"

const accent = {
  amber: "text-amber-300 bg-amber-500/10 border-amber-400/15",
  blue: "text-blue-300 bg-blue-500/10 border-blue-400/15",
  violet: "text-violet-300 bg-violet-500/10 border-violet-400/15",
  rose: "text-rose-300 bg-rose-500/10 border-rose-400/15",
  cyan: "text-cyan-300 bg-cyan-500/10 border-cyan-400/15",
  indigo: "text-indigo-300 bg-indigo-500/10 border-indigo-400/15",
  emerald: "text-emerald-300 bg-emerald-500/10 border-emerald-400/15",
  green: "text-green-300 bg-green-500/10 border-green-400/15",
}

export default function PortalMenu({ onNavigate }) {
  const navigate = useNavigate()

  const go = (route) => {
    navigate(route)
    window.scrollTo(0, 0)
    onNavigate?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.99 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[min(920px,calc(100vw-32px))] pt-3"
    >
      <div className="rounded-3xl border border-blue-400/15 bg-[#030817]/98 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-sm">
              <Compass size={16} className="text-blue-400" aria-hidden="true" />
              Ecossistema BHADOTT
            </div>
            <p className="text-xs text-slate-500 mt-1">Explore conteúdo, projetos e ferramentas por área.</p>
          </div>
          <button onClick={() => go("/portal")} className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 focus-ring rounded">
            Ver portal completo <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 p-4">
          {portalAreas.map((area) => {
            const Icon = area.icon
            return (
              <button
                key={area.id}
                onClick={() => go(area.route || `/portal/${area.id}`)}
                className="group text-left p-3 rounded-2xl hover:bg-white/[0.045] border border-transparent hover:border-white/8 transition-all focus-ring"
              >
                <span className={`w-9 h-9 rounded-xl border inline-flex items-center justify-center mb-3 ${accent[area.color]}`}>
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="block text-sm font-bold text-slate-200 group-hover:text-white">{area.shortLabel || area.label}</span>
                <span className="block text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{area.status}</span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
