import { useEffect, useMemo, useState } from "react"
import {
  BookHeart,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Church,
  ExternalLink,
  Heart,
  Library,
  Search,
  Sparkles,
  SunMedium,
  Users,
  Cross,
  ScrollText,
  ShieldCheck,
  Newspaper,
  ShoppingBag,
  Tag,
  FileText,
  Upload,
  CheckCircle2,
} from "lucide-react"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"
import {
  liturgicalSeasons,
  publicDomainLibrary,
  readingPlans,
  rosaryMysteries,
  saints,
  traditionalPrayers,
  catechismTopics,
  examinationOfConscience,
  lectioDivinaSteps,
  novenas,
  stationsOfTheCross,
  portalBooks,
  prayerLanguages,
  catechismStudyModules,
} from "../data/catholicContent"
import { catholicCuriosities, curiosityThemes, futureStoreItems } from "../data/catholicCuriosities"

const tabs = [
  { id: "inicio", label: "Início", icon: Church },
  { id: "oracoes", label: "Orações", icon: Heart },
  { id: "rosario", label: "Rosário", icon: Sparkles },
  { id: "santos", label: "Santos", icon: Users },
  { id: "roteiros", label: "Roteiros", icon: BookOpen },
  { id: "biblioteca", label: "Biblioteca", icon: Library },
  { id: "formacao", label: "Formação", icon: ScrollText },
  { id: "leitor", label: "Leitor", icon: BookOpen },
  { id: "curiosidades", label: "Curiosidades", icon: Newspaper },
  { id: "loja", label: "Loja", icon: ShoppingBag },
  { id: "catecismo", label: "Catecismo", icon: FileText },
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
            <p className="text-sm text-slate-500 mt-2">{id === "oracoes" ? "Orações tradicionais para diferentes momentos." : id === "rosario" ? "Mistérios e um guia simples para começar." : id === "santos" ? "Vidas que testemunham diferentes caminhos de santidade." : id === "roteiros" ? "Planos de leitura bíblica e preparação dominical." : id === "formacao" ? "Lectio Divina, Via-Sacra, novenas, catequese e exame." : id === "leitor" ? "Livros completos para ler sem sair do portal." : id === "curiosidades" ? "Bíblia, história, símbolos e doutrina com referências." : id === "loja" ? "Catálogo gratuito preparado para futuros materiais." : id === "catecismo" ? "Leitor pessoal de PDF e trilha gratuita pelos quatro pilares." : "Clássicos espirituais e acervos de domínio público."}</p>
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
      <div className="mt-14">
        <SectionHeading eyebrow="Línguas da tradição" title="O Pai-Nosso em outras línguas" description="Estas versões ajudam no estudo e na oração. O grego preserva a língua do texto do Novo Testamento; o latim representa a tradição litúrgica ocidental. Versões hebraicas e aramaicas serão incluídas somente após validação de uma fonte eclesial confiável, pois não existe uma única reconstrução consensual para apresentá-las como ‘o original’." />
        <div className="grid md:grid-cols-2 gap-4">
          {prayerLanguages.map((version) => <article key={version.id} className="p-6 rounded-3xl border border-amber-200/10 bg-amber-100/[0.025]" dir={version.direction}><span className="text-[10px] uppercase tracking-widest text-amber-300">{version.language}</span><p className="text-xs text-slate-600 mt-1">{version.label}</p><p className="text-lg text-slate-200 leading-8 mt-5" style={{ fontFamily: "Georgia, serif" }}>{version.text}</p><a href={version.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] text-blue-300 mt-5 focus-ring rounded">{version.source} <ExternalLink size={11} /></a></article>)}
        </div>
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

function FormationView() {
  const [section, setSection] = useState("lectio")
  const sections = [
    ["lectio", "Lectio Divina"], ["via-sacra", "Via-Sacra"], ["novenas", "Novenas"],
    ["catecismo", "Catecismo"], ["exame", "Exame de consciência"],
  ]
  return (
    <>
      <SectionHeading eyebrow="Formação e prática" title="Guias para caminhar com profundidade" description="Roteiros completos para uso pessoal e em família. Os resumos catequéticos são autorais e indicam os parágrafos oficiais para aprofundamento." />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8" aria-label="Conteúdos de formação">
        {sections.map(([id, label]) => <button key={id} onClick={() => setSection(id)} className={`flex-shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold focus-ring ${section === id ? "border-amber-300/25 bg-amber-500/10 text-amber-200" : "border-white/7 text-slate-500"}`}>{label}</button>)}
      </div>

      {section === "lectio" && <div className="grid md:grid-cols-5 gap-3">{lectioDivinaSteps.map((step, index) => <article key={step.latin} className="p-5 rounded-2xl border border-blue-300/10 bg-blue-500/[0.03]"><span className="text-[10px] text-blue-300 uppercase tracking-widest">{index + 1} · {step.latin}</span><h3 className="text-lg text-white font-bold mt-3" style={{ fontFamily: "Georgia, serif" }}>{step.title}</h3><p className="text-sm text-slate-500 leading-relaxed mt-3">{step.prompt}</p></article>)}</div>}

      {section === "via-sacra" && <div><p className="text-sm text-slate-400 mb-6 max-w-3xl">Em cada estação: faça o Sinal da Cruz, anuncie a estação, leia a referência em sua Bíblia, medite a intenção e conclua com um Pai-Nosso, Ave-Maria ou oração espontânea.</p><div className="grid md:grid-cols-2 gap-3">{stationsOfTheCross.map((station) => <article key={station.number} className="p-5 rounded-2xl border border-red-300/10 bg-red-500/[0.025] flex gap-4"><span className="w-9 h-9 flex-shrink-0 rounded-full bg-red-500/10 text-red-200 grid place-items-center font-bold">{station.number}</span><div><h3 className="text-white font-bold" style={{ fontFamily: "Georgia, serif" }}>{station.title}</h3><span className="text-[10px] text-red-200/70">{station.reference}</span><p className="text-sm text-slate-500 mt-2 leading-relaxed">{station.reflection}</p></div></article>)}</div></div>}

      {section === "novenas" && <div><p className="text-sm text-slate-400 mb-6 max-w-3xl">Estrutura sugerida para cada dia: Sinal da Cruz, intenção, leitura bíblica relacionada ao tema, reflexão silenciosa, Pai-Nosso, Ave-Maria, Glória e compromisso concreto.</p><div className="grid md:grid-cols-2 gap-4">{novenas.map((novena) => <article key={novena.title} className="p-6 rounded-3xl border border-violet-300/10 bg-violet-500/[0.03]"><Cross size={19} className="text-violet-300" /><h3 className="text-xl text-white font-bold mt-4" style={{ fontFamily: "Georgia, serif" }}>{novena.title}</h3><p className="text-xs text-violet-200/60 mt-1">{novena.occasion}</p><p className="text-sm text-slate-500 mt-3">{novena.intention}</p><ol className="grid grid-cols-3 gap-2 mt-5">{novena.days.map((day, index) => <li key={day} className="text-[11px] text-slate-400 border border-white/6 rounded-lg p-2"><strong className="text-violet-300">Dia {index + 1}</strong><br />{day}</li>)}</ol></article>)}</div></div>}

      {section === "catecismo" && <div><div className="grid md:grid-cols-2 gap-4">{catechismTopics.map((topic) => <article key={topic.title} className="p-6 rounded-2xl border border-amber-200/10 bg-amber-100/[0.025]"><span className="text-[10px] text-amber-300 uppercase tracking-wider">{topic.refs}</span><h3 className="text-lg text-white font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>{topic.title}</h3><p className="text-sm text-slate-500 leading-relaxed mt-3">{topic.summary}</p></article>)}</div><a href="https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-4 py-3 rounded-xl border border-amber-300/15 text-sm text-amber-200 focus-ring">Consultar o Catecismo oficial <ExternalLink size={14} /></a></div>}

      {section === "exame" && <div className="max-w-4xl"><div className="p-6 rounded-3xl border border-emerald-300/10 bg-emerald-500/[0.025]"><ShieldCheck size={22} className="text-emerald-300" /><p className="text-sm text-slate-400 leading-relaxed mt-4">Comece pedindo luz e serenidade. Recorde também o bem recebido e realizado. Estas perguntas ajudam a preparar uma revisão pessoal; não substituem orientação pastoral nem o sacramento da Reconciliação.</p></div><ol className="space-y-3 mt-5">{examinationOfConscience.map((question, index) => <li key={question} className="p-4 rounded-xl border border-white/7 bg-white/[0.02] flex gap-3 text-sm text-slate-300"><span className="text-emerald-300 font-bold">{index + 1}</span>{question}</li>)}</ol><p className="text-sm text-slate-500 mt-6">Conclua agradecendo a misericórdia de Deus, faça um propósito concreto e reze um Ato de Contrição.</p></div>}
    </>
  )
}

function ReaderView() {
  const [bookId, setBookId] = useState(portalBooks[0].id)
  const book = portalBooks.find((item) => item.id === bookId) || portalBooks[0]
  const storageKey = `bhadott-reader-${book.id}`
  const [page, setPage] = useState(() => {
    const saved = Number(window.localStorage.getItem(storageKey))
    return Number.isInteger(saved) && saved >= 0 && saved < book.pages.length ? saved : 0
  })
  useEffect(() => window.localStorage.setItem(storageKey, String(page)), [page, storageKey])
  useEffect(() => {
    const saved = Number(window.localStorage.getItem(storageKey))
    setPage(Number.isInteger(saved) && saved >= 0 && saved < book.pages.length ? saved : 0)
  }, [book.id, book.pages.length, storageKey])
  const current = book.pages[page]
  const progress = ((page + 1) / book.pages.length) * 100
  return (
    <>
      <SectionHeading eyebrow="Livro no portal" title={book.title} description={`${book.description} Seu progresso fica salvo somente neste aparelho.`} />
      <div className="grid sm:grid-cols-2 gap-3 mb-6">{portalBooks.map((item) => <button key={item.id} onClick={() => setBookId(item.id)} className={`text-left rounded-2xl border p-4 focus-ring ${book.id === item.id ? "border-amber-300/25 bg-amber-500/10" : "border-white/7 bg-white/[0.02]"}`}><span className="text-[10px] uppercase tracking-wider text-amber-300">{item.pages.length} capítulos{item.readingTime ? ` · ${item.readingTime}` : ""}</span><h3 className="font-bold text-white mt-1">{item.title}</h3><p className="text-xs text-slate-500 mt-2">{item.description}</p></button>)}</div>
      {book.notice && <div className="mb-5 rounded-2xl border border-blue-300/10 bg-blue-500/[0.035] p-4 text-sm text-slate-400"><strong className="text-blue-200">Nota editorial:</strong> {book.notice}</div>}
      <div className="grid lg:grid-cols-[260px_1fr] gap-5 items-start">
        <aside className="rounded-3xl border border-white/7 bg-white/[0.02] p-4 lg:sticky lg:top-40">
          <p className="px-2 text-[10px] uppercase tracking-widest text-slate-600 mb-3">Sumário · {book.author}</p>
          <div className="space-y-1 max-h-72 lg:max-h-[480px] overflow-y-auto">{book.pages.map((item, index) => <button key={item.title} onClick={() => setPage(index)} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs focus-ring ${page === index ? "bg-amber-500/10 text-amber-200" : "text-slate-500 hover:text-slate-300"}`}><span className="mr-2 opacity-60">{index + 1}.</span>{item.title}</button>)}</div>
        </aside>
        <article className="rounded-[2rem] border border-amber-200/10 bg-gradient-to-br from-[#0d1424] to-[#060a14] overflow-hidden shadow-2xl shadow-black/20">
          <div className="h-1 bg-white/5"><div className="h-full bg-gradient-to-r from-amber-400 to-orange-300 transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="px-6 py-10 sm:px-12 sm:py-14 max-w-3xl mx-auto min-h-[520px] flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300">Página {page + 1} de {book.pages.length}</span>
            <h2 className="text-3xl sm:text-4xl text-[#fffaf0] font-bold mt-4" style={{ fontFamily: "Georgia, serif" }}>{current.title}</h2>
            <div className="mt-8 space-y-5">{current.paragraphs.map((paragraph) => <p key={paragraph} className="text-base sm:text-lg text-slate-300 leading-8" style={{ fontFamily: "Georgia, serif" }}>{paragraph}</p>)}</div>
            {current.references && <div className="mt-9 p-5 rounded-2xl border border-amber-300/10 bg-amber-500/[0.025]"><strong className="text-xs uppercase tracking-wider text-amber-300">Fontes para conferir</strong><p className="text-sm text-slate-400 mt-2 leading-relaxed">{current.references}</p></div>}
            <div className={`${current.references ? "mt-4" : "mt-9"} p-5 rounded-2xl border border-blue-300/10 bg-blue-500/[0.035]`}><strong className="text-xs uppercase tracking-wider text-blue-300">Para praticar</strong><p className="text-sm text-slate-400 mt-2 leading-relaxed">{current.practice}</p></div>
            <div className="flex items-center justify-between gap-3 mt-auto pt-10"><button disabled={page === 0} onClick={() => setPage((value) => value - 1)} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/8 text-sm text-slate-300 disabled:opacity-30 focus-ring"><ChevronLeft size={16} /> Anterior</button><button disabled={page === book.pages.length - 1} onClick={() => setPage((value) => value + 1)} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-300/20 text-sm text-amber-200 disabled:opacity-30 focus-ring">Próxima <ChevronRight size={16} /></button></div>
          </div>
        </article>
      </div>
    </>
  )
}

function CuriositiesView() {
  const [theme, setTheme] = useState("todos")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const selected = catholicCuriosities.find((item) => item.id === selectedId)
  const items = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR")
    return catholicCuriosities.filter((item) => (theme === "todos" || item.theme === theme) && (!term || [item.title, item.summary, item.references].join(" ").toLocaleLowerCase("pt-BR").includes(term)))
  }, [query, theme])

  if (selected) return (
    <article className="max-w-4xl mx-auto">
      <button onClick={() => setSelectedId(null)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white focus-ring rounded mb-8"><ChevronLeft size={16} /> Voltar às curiosidades</button>
      <div className="rounded-[2rem] border border-amber-200/10 bg-gradient-to-br from-amber-100/[0.04] to-transparent p-6 sm:p-10">
        <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300">{curiosityThemes.find((item) => item.id === selected.theme)?.label}</span>
        <h2 className="text-3xl sm:text-4xl text-[#fffaf0] font-bold mt-4" style={{ fontFamily: "Georgia, serif" }}>{selected.title}</h2>
        <p className="text-lg text-slate-400 leading-relaxed mt-5">{selected.summary}</p>
        <div className="mt-8 space-y-5">{selected.paragraphs.map((paragraph) => <p key={paragraph} className="text-base sm:text-lg text-slate-300 leading-8" style={{ fontFamily: "Georgia, serif" }}>{paragraph}</p>)}</div>
        <div className="mt-9 p-4 rounded-xl border border-blue-300/10 bg-blue-500/[0.035]"><strong className="text-[10px] uppercase tracking-wider text-blue-300">Referências para aprofundar</strong><p className="text-sm text-slate-400 mt-2">{selected.references}</p></div>
        <p className="text-xs text-slate-600 leading-relaxed mt-6">Texto introdutório autoral. Consulte as passagens e documentos indicados; o conteúdo não substitui formação pastoral ou estudo acadêmico.</p>
      </div>
    </article>
  )

  return (
    <>
      <SectionHeading eyebrow="Conhecer para aprofundar" title="Curiosidades Católicas" description="Conteúdo do antigo projeto adaptado e reescrito para o BHADOTT. Cada texto evita sensacionalismo e apresenta referências para que você continue estudando." />
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1">{curiosityThemes.map((item) => <button key={item.id} onClick={() => setTheme(item.id)} className={`flex-shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold focus-ring ${theme === item.id ? "border-amber-300/25 bg-amber-500/10 text-amber-200" : "border-white/7 text-slate-500"}`}>{item.label}</button>)}</div>
        <label className="relative block w-full lg:max-w-sm"><span className="sr-only">Buscar curiosidade</span><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar assunto..." className="w-full rounded-xl border border-white/8 bg-[#020617] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-amber-300/25" /></label>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map((item) => <article key={item.id} className="p-6 rounded-3xl border border-white/7 bg-white/[0.025] flex flex-col"><span className="text-[10px] uppercase tracking-wider text-amber-300">{curiosityThemes.find((entry) => entry.id === item.theme)?.label}</span><h3 className="text-xl text-white font-bold mt-3" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3><p className="text-sm text-slate-500 leading-relaxed mt-3 flex-1">{item.summary}</p><p className="text-[11px] text-blue-300/60 mt-5">{item.references}</p><button onClick={() => setSelectedId(item.id)} className="text-left text-xs font-bold text-amber-200 mt-4 focus-ring rounded">Ler explicação →</button></article>)}</div>
      {!items.length && <div className="p-10 text-center rounded-2xl border border-white/7 text-sm text-slate-500">Nenhum conteúdo encontrado para esta busca.</div>}
    </>
  )
}

function StoreView() {
  return (
    <>
      <SectionHeading eyebrow="Acervo gratuito em preparação" title="Livros e materiais católicos" description="Este espaço será uma loja gratuita: materiais próprios e obras que possam ser distribuídas legalmente, sempre sem cobrança." />
      <div className="p-5 sm:p-6 rounded-3xl border border-blue-300/10 bg-blue-500/[0.035] mb-8 flex gap-4"><ShieldCheck className="text-blue-300 flex-shrink-0" /><div><h3 className="font-bold text-white">Tudo gratuito</h3><p className="text-sm text-slate-400 leading-relaxed mt-2">Não haverá pagamento ou pedido comercial. Cada arquivo só será disponibilizado depois da conferência de autoria e permissão de distribuição, porque gratuidade e autorização são cuidados diferentes.</p></div></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{futureStoreItems.map((item) => <article key={item.id} className="p-6 rounded-3xl border border-amber-200/10 bg-gradient-to-br from-amber-100/[0.04] to-transparent flex flex-col"><div className="w-11 h-11 rounded-xl grid place-items-center bg-amber-500/10 text-amber-300"><BookOpen size={20} /></div><span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-600 mt-5"><Tag size={11} /> {item.type}</span><h3 className="text-lg text-[#fffaf0] font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3><p className="text-sm text-slate-500 leading-relaxed mt-3 flex-1">{item.description}</p><span className="mt-6 inline-flex justify-center rounded-xl border border-white/7 px-4 py-3 text-xs font-bold text-slate-600">Em preparação</span></article>)}</div>
      <div className="mt-8 rounded-2xl border border-emerald-300/10 bg-emerald-500/[0.03] p-5"><p className="text-sm text-slate-400"><strong className="text-emerald-200">Princípio do acervo:</strong> somente obras próprias, de domínio público em edição permitida ou materiais com autorização expressa serão distribuídos gratuitamente.</p></div>
    </>
  )
}

function CatechismView() {
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfName, setPdfName] = useState("")
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem("bhadott-catechism-progress") || "[]") } catch { return [] }
  })
  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl) }, [pdfUrl])
  useEffect(() => window.localStorage.setItem("bhadott-catechism-progress", JSON.stringify(completed)), [completed])
  const handlePdf = (event) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== "application/pdf") return
    if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    setPdfUrl(URL.createObjectURL(file))
    setPdfName(file.name)
  }
  const toggleModule = (id) => setCompleted((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const percent = Math.round((completed.length / catechismStudyModules.length) * 100)
  return (
    <>
      <SectionHeading eyebrow="Estudo gratuito" title="Catecismo da Igreja Católica" description="Abra no próprio portal um PDF que você já possui e acompanhe uma trilha autoral de dez módulos. O arquivo nunca é enviado: permanece somente no navegador deste aparelho." />
      <div className="grid xl:grid-cols-[1.25fr_0.75fr] gap-5 items-start">
        <div className="rounded-3xl border border-white/7 bg-white/[0.02] overflow-hidden">
          <div className="p-5 border-b border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 className="font-bold text-white">Leitor pessoal de PDF</h3><p className="text-xs text-slate-500 mt-1">{pdfName || "Nenhum arquivo selecionado"}</p></div><label className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-300/20 text-sm font-bold text-amber-200 cursor-pointer focus-within:ring-2 focus-within:ring-amber-300/30"><Upload size={15} /> Escolher meu PDF<input type="file" accept="application/pdf,.pdf" onChange={handlePdf} className="sr-only" /></label></div>
          {pdfUrl ? <iframe src={pdfUrl} title={`Leitor de ${pdfName}`} className="w-full h-[70vh] min-h-[560px] bg-white" /> : <div className="min-h-[480px] grid place-items-center p-8 text-center"><div><FileText size={45} className="text-slate-700 mx-auto" /><h3 className="text-lg text-slate-300 font-bold mt-5">Seu Catecismo abre aqui</h3><p className="text-sm text-slate-500 mt-2 max-w-md">Escolha o PDF no computador ou celular. Nada será copiado para o site, para o GitHub ou para um servidor.</p></div></div>}
        </div>
        <aside className="rounded-3xl border border-blue-300/10 bg-blue-500/[0.025] p-5 xl:sticky xl:top-40">
          <div className="flex items-center justify-between gap-3"><div><span className="text-[10px] uppercase tracking-wider text-blue-300">Trilha de estudo</span><h3 className="text-xl text-white font-bold mt-1" style={{ fontFamily: "Georgia, serif" }}>Quatro pilares em 10 módulos</h3></div><strong className="text-blue-200">{percent}%</strong></div>
          <div className="h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden"><div className="h-full bg-blue-400 transition-all" style={{ width: `${percent}%` }} /></div>
          <div className="space-y-2 mt-5 max-h-[620px] overflow-y-auto pr-1">{catechismStudyModules.map((module, index) => { const done = completed.includes(module.id); return <article key={module.id} className={`rounded-2xl border p-4 ${done ? "border-emerald-300/15 bg-emerald-500/[0.035]" : "border-white/7 bg-[#020617]/45"}`}><button onClick={() => toggleModule(module.id)} className="w-full text-left focus-ring rounded"><div className="flex gap-3"><CheckCircle2 size={18} className={done ? "text-emerald-300" : "text-slate-700"} /><div><span className="text-[9px] uppercase tracking-wider text-slate-600">{index + 1} · {module.part}</span><h4 className="text-sm font-bold text-slate-200 mt-1">{module.title}</h4><p className="text-[11px] text-blue-300 mt-1">{module.paragraphs}</p><p className="text-xs text-slate-500 leading-relaxed mt-2">{module.goal}</p></div></div></button></article> })}</div>
          <a href="https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs text-blue-300 focus-ring rounded">Consultar versão oficial online <ExternalLink size={12} /></a>
        </aside>
      </div>
      <div className="mt-6 p-5 rounded-2xl border border-amber-200/10 bg-amber-100/[0.025]"><p className="text-sm text-slate-400 leading-relaxed"><strong className="text-amber-200">Sugestão:</strong> leia de 5 a 10 parágrafos por dia, consulte as referências bíblicas, anote uma ideia central e termine perguntando como aquele ensinamento pode ser vivido.</p></div>
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
          {activeTab === "formacao" && <FormationView />}
          {activeTab === "leitor" && <ReaderView />}
          {activeTab === "curiosidades" && <CuriositiesView />}
          {activeTab === "loja" && <StoreView />}
          {activeTab === "catecismo" && <CatechismView />}
        </div>
      </section>
    </PageLayout>
  )
}
