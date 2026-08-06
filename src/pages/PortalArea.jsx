import { ArrowRight, CheckCircle2, Compass } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"
import { getPortalArea } from "../data/portalAreas"
import { getPortalContent } from "../data/portalContent"

export default function PortalArea() {
  const { areaId } = useParams()
  const navigate = useNavigate()
  const area = getPortalArea(areaId)
  const content = getPortalContent(areaId)

  if (!area || !content) {
    navigate("/portal", { replace: true })
    return null
  }

  const Icon = area.icon

  return (
    <PageLayout backLabel="Voltar para o Portal" backTo="/portal">
      <PageHero badge={area.status} title="BHADOTT" titleGrad={area.label} subtitle={area.description}>
        <div className="mt-8 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border border-blue-400/20 bg-blue-500/10 text-blue-300">
          <Icon size={28} aria-hidden="true" />
        </div>
      </PageHero>
      <GlowDivider color="mixed" />
      <section className="py-16 sm:py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs uppercase tracking-[0.16em] font-bold mb-4">
              <Compass size={14} aria-hidden="true" /> {content.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que você encontrará aqui
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed">{content.intro}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.sections.map(({ icon: SectionIcon, title, description }) => (
              <article key={title} className="p-5 sm:p-6 rounded-2xl border border-white/7 bg-white/[0.025] hover:border-blue-400/15 hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-300 bg-blue-500/10 border border-blue-400/15 mb-5">
                  <SectionIcon size={18} aria-hidden="true" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      <section className="py-16 sm:py-20 bg-[#03081a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-center rounded-3xl border border-white/7 bg-white/[0.025] p-7 sm:p-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-violet-400">Próximos passos</span>
              <h2 className="text-2xl font-black text-white mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Construção transparente</h2>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">Esta área será desenvolvida em etapas. O planejamento aparece desde já para que o crescimento tenha direção.</p>
            </div>
            <div className="space-y-3">
              {content.next.map((item) => (
                <div key={item} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6 bg-[#020617]/60 text-sm text-slate-300">
                  <CheckCircle2 size={17} className="text-blue-400 flex-shrink-0" aria-hidden="true" /> {item}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigate("/portal")} className="mt-8 mx-auto flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 focus-ring rounded">
            Conhecer as outras áreas <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </section>
    </PageLayout>
  )
}
