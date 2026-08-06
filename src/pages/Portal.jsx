import { motion } from "framer-motion"
import { ArrowRight, Compass, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"
import { portalAreas, portalPillars } from "../data/portalAreas"

const colors = {
  amber: "from-amber-500/20 to-orange-500/5 border-amber-400/20 text-amber-300",
  blue: "from-blue-500/20 to-cyan-500/5 border-blue-400/20 text-blue-300",
  violet: "from-violet-500/20 to-fuchsia-500/5 border-violet-400/20 text-violet-300",
  rose: "from-rose-500/20 to-pink-500/5 border-rose-400/20 text-rose-300",
  cyan: "from-cyan-500/20 to-sky-500/5 border-cyan-400/20 text-cyan-300",
  indigo: "from-indigo-500/20 to-violet-500/5 border-indigo-400/20 text-indigo-300",
  emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-400/20 text-emerald-300",
  green: "from-green-500/20 to-emerald-500/5 border-green-400/20 text-green-300",
}

export default function Portal() {
  const navigate = useNavigate()

  const openArea = (area) => navigate(area.route || `/portal/${area.id}`)

  return (
    <PageLayout showBack={false}>
      <PageHero
        badge="Ecossistema BHADOTT"
        title="Explore o nosso"
        titleGrad="portal"
        subtitle="Tecnologia, criatividade, conhecimento e propósito reunidos em áreas que podem crescer de forma independente."
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500"
        >
          <Compass size={16} className="text-blue-400" aria-hidden="true" />
          Escolha uma área para começar
        </motion.div>
      </PageHero>

      <GlowDivider color="mixed" />

      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[#020617]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {portalAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.button
                  key={area.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  onClick={() => openArea(area)}
                  className="group relative text-left p-6 rounded-3xl border border-white/8 bg-white/[0.025] hover:border-white/15 transition-all overflow-hidden focus-ring"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[area.color]} opacity-0 group-hover:opacity-60 transition-opacity`} aria-hidden="true" />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br border mb-5 ${colors[area.color]}`}>
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500 font-bold">{area.status}</span>
                    </div>
                    <h2 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {area.label}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed min-h-[84px]">{area.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {area.highlights.map((item) => (
                        <span key={item} className="px-2 py-1 text-[10px] text-slate-500 rounded-md bg-white/[0.035] border border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-sm font-bold text-blue-400 group-hover:text-blue-300">
                      Explorar <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      <section className="relative py-16 sm:py-20 bg-[#03081a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest font-bold mb-4">
              <Sparkles size={14} aria-hidden="true" /> Uma base para crescer
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Um portal, muitas possibilidades
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {portalPillars.map(({ icon: Icon, label, description }) => (
              <div key={label} className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
                <Icon size={19} className="text-violet-400 mb-4" aria-hidden="true" />
                <h3 className="font-bold text-white mb-2">{label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
