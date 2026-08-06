import { useMemo, useState } from "react"
import {
  BookHeart,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Church,
  ExternalLink,
  Heart,
  Library,
  Search,
  Sparkles,
  SunMedium,
  Users,
} from "lucide-react"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"
import {
  liturgicalSeasons,
  publicDomainLibrary,
  readingPlans,
  rosaryMysteries,
  saints,
  traditionalPrayers,
} from "../data/catholicContent"

const tabs = [
  { id: "inicio", label: "Início", icon: Church },
  { id: "oracoes", label: "Orações", icon: Heart },
  { id: "rosario", label: "Rosário", icon: Sparkles },
  { id: "santos", label: "Santos", icon: Users },
  { id: "roteiros", label: "Roteiros", icon: BookOpen },
  { id: "biblioteca", label: "Biblioteca", icon: Library },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl mb-9">
      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-300">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fffaf0] mt-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h2>
      {description && <p className="text-slate-400 mt-4 leading-relaxed">{description}</p>}
    </div>
  )
}

function StartView({ setActiveTab }) {
  return (
    <>
      <SectionHeading eyebrow="Um lugar de recolhimento" title="Leia, reze e caminhe no seu ritmo" description="Esta área reúne conteúdo introdutório e referências para apoiar a vida de oração. Ela não substitui a comunidade, a orientação pastoral ou as fontes oficiais da Igreja." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.slice(1).map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)} className="group p-6 text-left rounded-3xl border border-amber-200/10 bg-gradient-to-br from-amber-100/[0.045] to-transparent hover:border-amber-200/20 transition-all focus-ring">
            <Icon size={22} className="text-amber-300 mb-5" aria-hidden="true" />
            <h3 className="text-lg font-bold text-[#fffaf0]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{label}</h3>
            <p className="text-sm text-slate-500 mt-2">{id === "oracoes" ? "Orações tradicionais para diferentes momentos." : id === "rosario" ? "Mistérios e um guia simples para começar." : id === "santos" ? "Vidas que testemunham diferentes caminhos de santidade." : id === "roteiros" ? "Planos de leitura bíblica e preparação dominical." : "Clássicos espirituais e acervos de domínio público."}</p>
          </button>
        ))}
      </div>

      <div className="mt-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-5">
        <div className="rounded-3xl border border-blue-300/10 bg-blue-500/[0.035] p-7">
          <SunMedium size={23} className="text-blue-300 mb-5" aria-hidden="true" />
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Pequena rotina diária</h3>
          <ol className="mt-5 space-y-3 text-sm text-slate-400">
            <li><strong className="text-blue-200">1.</strong> Faça silêncio por um minuto.</li>
            <li><strong className="text-blue-200">2.</strong> Reze uma oração conhecida.</li>
            <li><strong className="text-blue-200">3.</strong> Leia um trecho curto do Evangelho.</li>
            <li><strong className="text-blue-200">4.</strong> Escolha um gesto concreto de caridade.</li>
          </ol>
        </div>
        <div className="rounded-3xl border border-white/7 bg-white/[0.025] p-7">
          <div className="flex items-center gap-2 text-white font-bold"><CalendarDays size={19} className="text-violet-300" aria-hidden="true" /> Tempos litúrgicos</div>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            {liturgicalSeasons.map((season) => (
              <div key={season.name} className="p-3.5 rounded-xl border border-white/6 bg-[#020617]/60">
                <div className="flex items-center justify-between gap-2"><strong className="text-sm text-slate-200">{season.name}</strong><span className="text-[9px] uppercase tracking-wider text-slate-600">{season.color}</span></div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{season.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function PrayersView() {
  const [openPrayer, setOpenPrayer] = useState(0)
  return (
    <>
      <SectionHeading eyebrow="Orações tradicionais" title="Palavras para diferentes momentos" description="Textos tradicionais apresentados para oração pessoal. A linguagem pode variar legitimamente entre comunidades e edições." />
      <div className="space-y-3 max-w-4xl">
        {traditionalPrayers.map((prayer, index) => {
          const open = openPrayer === index
          return (
            <article key={prayer.title} className="rounded-2xl border border-white/7 bg-white/[0.02] overflow-hidden">
              <button onClick={() => setOpenPrayer(open ? -1 : index)} className="w-full flex items-center justify-between gap-4 p-5 text-left focus-ring">
                <span className="font-bold text-[#fffaf0]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{prayer.title}</span>
                <ChevronDown size={17} className={`text-amber-300 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {open && (
                <div className="px-5 pb-6 border-t border-white/5">
                  <p className="text-base sm:text-lg leading-8 text-slate-300 pt-5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{prayer.text}</p>
                  <p className="text-xs text-slate-600 mt-5">{prayer.note}</p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}

function RosaryView() {
  return (
    <>
      <SectionHeading eyebrow="Guia do Rosário" title="Contemplar a vida de Cristo com Maria" description="Comece com o Sinal da Cruz, ofereça sua intenção, reze o Credo, um Pai-Nosso, três Ave-Marias e o Glória. Em cada mistério, anuncie o episódio, faça uma breve pausa e reze uma dezena." />
      <div className="grid md:grid-cols-2 gap-4">
        {rosaryMysteries.map((mystery) => (
          <article key={mystery.title} className="rounded-3xl border border-violet-300/10 bg-violet-500/[0.035] p-6">
            <span className="text-[10px] uppercase tracking-[0.16em] text-violet-300">{mystery.day}</span>
            <h3 className="text-xl font-bold text-white mt-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{mystery.title}</h3>
            <ol className="space-y-3 mt-5">
              {mystery.items.map((item, index) => <li key={item} className="flex gap-3 text-sm text-slate-400"><span className="text-violet-300 font-bold">{index + 1}</span>{item}</li>)}
            </ol>
          </article>
        ))}
      </div>
      <div className="mt-6 p-5 rounded-2xl border border-amber-200/10 bg-amber-100/[0.035] text-sm text-slate-400 leading-relaxed">Ao terminar os cinco mistérios, reze a Salve-Rainha e apresente suas intenções. Não tenha pressa: o Rosário é uma oração contemplativa, não uma prova de velocidade.</div>
    </>
  )
}

function SaintsView() {
  return (
    <>
      <SectionHeading eyebrow="Testemunhos" title="Santos para conhecer" description="Biografias introdutórias escritas especialmente para o portal. Cada vida deve ser aprofundada posteriormente com fontes históricas e eclesiais confiáveis." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saints.map((saint) => (
          <article key={saint.name} className="p-6 rounded-3xl border border-white/7 bg-white/[0.025]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500/10 border border-amber-300/15 text-amber-300 mb-5"><Sparkles size={17} aria-hidden="true" /></div>
            <span className="text-[10px] text-slate-600 uppercase tracking-wider">{saint.dates}</span>
            <h3 className="text-xl font-bold text-[#fffaf0] mt-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{saint.name}</h3>
            <p className="text-xs text-amber-200/60 mt-2">{saint.patronage}</p>
            <p className="text-sm text-slate-500 leading-relaxed mt-4">{saint.summary}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function ReadingPlansView() {
  return (
    <>
      <SectionHeading eyebrow="Leitura acompanhada" title="Roteiros simples e possíveis" description="Os roteiros usam referências, não reproduzem traduções bíblicas protegidas. Você pode acompanhá-los com uma Bíblia autorizada que já possua ou por uma fonte oficial." />
      <div className="grid md:grid-cols-2 gap-4">
        {readingPlans.map((plan) => (
          <article key={plan.title} className="p-6 rounded-3xl border border-blue-300/10 bg-blue-500/[0.03]">
            <div className="flex items-center justify-between gap-3"><BookHeart size={19} className="text-blue-300" aria-hidden="true" /><span className="text-[10px] uppercase tracking-wider text-blue-300">{plan.duration}</span></div>
            <h3 className="text-xl font-bold text-white mt-5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{plan.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mt-3">{plan.description}</p>
            <ul className="mt-5 space-y-2">
              {(plan.steps || plan.references).map((item) => <li key={item} className="text-xs text-slate-400 pl-3 border-l border-blue-300/20">{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://www.vatican.va/content/vatican/pt.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/8 text-sm text-slate-300 hover:text-white focus-ring">Portal do Vaticano <ExternalLink size={14} aria-hidden="true" /></a>
        <a href="https://www.cnbb.org.br/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/8 text-sm text-slate-300 hover:text-white focus-ring">CNBB <ExternalLink size={14} aria-hidden="true" /></a>
      </div>
    </>
  )
}

function LibraryView() {
  const [query, setQuery] = useState("")
  const books = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR")
    return !term ? publicDomainLibrary : publicDomainLibrary.filter((book) => [book.title, book.author, book.theme].join(" ").toLocaleLowerCase("pt-BR").includes(term))
  }, [query])
  return (
    <>
      <SectionHeading eyebrow="Biblioteca clássica" title="Grandes obras para uma vida inteira" description="As obras originais abaixo são antigas e estão em domínio público. Traduções e edições modernas podem ter proteção própria; por isso indicamos buscas em acervos que informam suas condições de uso." />
      <label className="relative block max-w-xl mb-7">
        <span className="sr-only">Buscar livro, autor ou tema</span><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" aria-hidden="true" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar livro, autor ou tema..." className="w-full rounded-xl border border-white/8 bg-[#020617] py-3.5 pl-11 pr-4 text-sm text-white outline-none focus:border-amber-300/25" />
      </label>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <article key={book.title} className="p-5 rounded-2xl border border-white/7 bg-white/[0.025] flex flex-col">
            <BookOpen size={18} className="text-amber-300 mb-4" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-wider text-slate-600">{book.era}</span>
            <h3 className="font-bold text-[#fffaf0] mt-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{book.title}</h3>
            <p className="text-xs text-amber-200/60 mt-1">{book.author}</p>
            <p className="text-sm text-slate-500 mt-3 flex-1">{book.theme}</p>
            <a href={`https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(book.query)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-blue-300 hover:text-blue-200 mt-5 focus-ring rounded">Buscar edição no Gutenberg <ExternalLink size={12} aria-hidden="true" /></a>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-emerald-300/10 bg-emerald-500/[0.035] p-5">
        <p className="text-sm text-slate-400 leading-relaxed"><strong className="text-emerald-200">Acervo em português:</strong> consulte também o Portal Domínio Público do MEC. Antes de baixar ou reproduzir uma tradução, confira a indicação de licença e autoria da edição.</p>
        <a href="https://dominiopublico.mec.gov.br/pesquisa/PesquisaObraForm.jsp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mt-4 focus-ring rounded">Abrir Portal Domínio Público <ExternalLink size={12} aria-hidden="true" /></a>
      </div>
    </>
  )
}

export default function Catolico() {
  const [activeTab, setActiveTab] = useState("inicio")
  return (
    <PageLayout backLabel="Voltar para o Portal" backTo="/portal">
      <PageHero badge="Fé · Leitura · Oração" title="Área" titleGrad="Católica" subtitle="Um espaço sereno para rezar, estudar e descobrir a riqueza da tradição cristã.">
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-amber-200/70"><BookHeart size={14} aria-hidden="true" /> Conteúdo gratuito, introdutório e cuidadosamente organizado</div>
      </PageHero>
      <GlowDivider color="violet" />
      <div className="sticky top-16 lg:top-20 z-30 border-b border-white/6 bg-[#020617]/95 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto" aria-label="Seções da Área Católica">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-colors focus-ring ${activeTab === id ? "text-amber-200 bg-amber-500/10 border-amber-300/20" : "text-slate-500 border-white/6 hover:text-slate-300"}`}>
              <Icon size={14} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
      </div>
      <section className="py-14 sm:py-20 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "inicio" && <StartView setActiveTab={setActiveTab} />}
          {activeTab === "oracoes" && <PrayersView />}
          {activeTab === "rosario" && <RosaryView />}
          {activeTab === "santos" && <SaintsView />}
          {activeTab === "roteiros" && <ReadingPlansView />}
          {activeTab === "biblioteca" && <LibraryView />}
        </div>
      </section>
    </PageLayout>
  )
}
