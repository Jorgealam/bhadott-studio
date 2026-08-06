import { ArrowRight, Compass } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"
import { getPortalArea } from "../data/portalAreas"

export default function PortalArea() {
  const { areaId } = useParams()
  const navigate = useNavigate()
  const area = getPortalArea(areaId)

  if (!area) {
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
      <section className="py-16 sm:py-20 bg-[#020617]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-7 sm:p-10 text-center">
            <Compass size={24} className="text-violet-400 mx-auto mb-5" aria-hidden="true" />
            <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Esta área já tem lugar no portal
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              A estrutura está pronta para receber páginas, publicações e ferramentas sem interferir nas outras áreas do BHADOTT Studio.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-7">
              {area.highlights.map((item) => (
                <span key={item} className="px-3 py-1.5 text-xs text-blue-300 rounded-full bg-blue-500/8 border border-blue-400/15">{item}</span>
              ))}
            </div>
            <button onClick={() => navigate("/portal")} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 focus-ring rounded">
              Conhecer as outras áreas <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
