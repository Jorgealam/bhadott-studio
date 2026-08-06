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
  Share2,
  Copy,
  LoaderCircle,
  Bell,
  Download,
  X,
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
  { id: "evangelho", label: "Evangelho do Dia", icon: SunMedium },
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

function CatholicHeader() {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e3d9e8] bg-[#fffdf8]/95 backdrop-blur-xl"><div className="max-w-7xl mx-auto h-16 lg:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"><a href="#/catolico" className="flex items-center gap-3"><span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5b159d] to-[#8a6924] text-white grid place-items-center"><Cross size={19} /></span><span><strong className="block text-[#2c2030] leading-none">BHADOTT Católico</strong><small className="text-[10px] uppercase tracking-[0.18em] text-[#8a6924]">Fé · leitura · oração</small></span></a><nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-[#756b78]" aria-label="Canal Católico"><a href="#/catolico?secao=evangelho" className="hover:text-[#5b159d]">Evangelho</a><a href="#/catolico?secao=santos" className="hover:text-[#5b159d]">Santos</a><a href="#/catolico?secao=biblioteca" className="hover:text-[#5b159d]">Biblioteca</a></nav><a href="#/portal" className="rounded-xl border border-[#d9cce0] bg-white px-3 sm:px-4 py-2.5 text-xs font-bold text-[#5b159d]">Portal BHADOTT</a></div></header>
}

function CatholicFooter() {
  return <footer className="border-t border-[#ded3e4] bg-[#f3eaf8] text-[#433847]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9"><div><div className="flex items-center gap-3"><span className="w-10 h-10 rounded-xl bg-[#5b159d] text-white grid place-items-center"><Cross size={19} /></span><div><strong className="block">BHADOTT Católico</strong><small className="text-[#806d87]">Um canal do BHADOTT Studio</small></div></div><p className="text-sm text-[#756b78] leading-relaxed mt-5">Conteúdo gratuito para oração, leitura e formação, organizado com respeito às fontes e à tradição católica.</p></div><div><h3 className="text-xs uppercase tracking-wider font-bold text-[#8a6924]">Vida de fé</h3><div className="grid gap-3 mt-4 text-sm"><a href="#/catolico?secao=evangelho">Evangelho do Dia</a><a href="#/catolico?secao=oracoes">Orações</a><a href="#/catolico?secao=rosario">Rosário</a><a href="#/catolico?secao=santos">Santos</a></div></div><div><h3 className="text-xs uppercase tracking-wider font-bold text-[#8a6924]">Estudo</h3><div className="grid gap-3 mt-4 text-sm"><a href="#/catolico?secao=biblioteca">Biblioteca Católica</a><a href="#/catolico?secao=leitor">Livros no portal</a><a href="#/catolico?secao=formacao">Formação</a><a href="#/catolico?secao=catecismo">Catecismo</a></div></div><div><h3 className="text-xs uppercase tracking-wider font-bold text-[#8a6924]">Canal</h3><div className="grid gap-3 mt-4 text-sm"><a href="#/catolico?secao=curiosidades">Curiosidades Católicas</a><a href="#/catolico?secao=loja">Materiais gratuitos</a><a href="#/contato">Contato e sugestões</a><a href="#/portal">Voltar ao Portal BHADOTT</a></div></div></div><div className="mt-10 pt-6 border-t border-[#d9cce0] flex flex-col sm:flex-row gap-2 justify-between text-xs text-[#806f86]"><span>© 2026 BHADOTT Católico · Conteúdo gratuito</span><span>Parte do ecossistema BHADOTT Studio</span></div></div></footer>
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl mb-9">
      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-amber-300">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fffaf0] mt-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h2>
      {description && <p className="text-slate-400 mt-4 leading-relaxed">{description}</p>}
    </div>
  )
}

const readingLabels = { prima: "Primeira leitura", salmo: "Salmo responsorial", seconda: "Segunda leitura", vangelo: "Evangelho" }
const liturgicalColors = { bianco: "Branco", rosso: "Vermelho", verde: "Verde", viola: "Roxo", rosa: "Rosa" }
const knownCelebrations = { trasfigurazione: "Transfiguração do Senhor" }

function CatholicAppInvite() {
  const [installPrompt, setInstallPrompt] = useState(() => window.__bhadottInstallPrompt || null)
  const [hidden, setHidden] = useState(() => window.localStorage.getItem("bhadott-pwa-invite-hidden") === "yes")
  const [notificationState, setNotificationState] = useState(() => typeof Notification === "undefined" ? "unsupported" : Notification.permission)
  useEffect(() => {
    const ready = () => setInstallPrompt(window.__bhadottInstallPrompt || null)
    window.addEventListener("bhadott-install-ready", ready)
    return () => window.removeEventListener("bhadott-install-ready", ready)
  }, [])
  useEffect(() => {
    if (notificationState !== "granted" || !("serviceWorker" in navigator)) return
    const today = new Date().toISOString().slice(0, 10)
    if (window.localStorage.getItem("bhadott-gospel-notified") === today) return
    navigator.serviceWorker.ready.then((registration) => registration.showNotification("Evangelho do Dia", { body: "A Palavra de hoje já está disponível. Toque para ler e meditar.", icon: `${import.meta.env.BASE_URL}favicon.svg`, badge: `${import.meta.env.BASE_URL}favicon.svg`, tag: `evangelho-${today}` }))
    window.localStorage.setItem("bhadott-gospel-notified", today)
  }, [notificationState])
  if (hidden || (window.matchMedia("(display-mode: standalone)").matches && notificationState === "granted")) return null
  const install = async () => { if (!installPrompt) return; await installPrompt.prompt(); await installPrompt.userChoice; window.__bhadottInstallPrompt = null; setInstallPrompt(null) }
  const enableNotifications = async () => { if (typeof Notification === "undefined") return; const permission = await Notification.requestPermission(); setNotificationState(permission) }
  const dismiss = () => { window.localStorage.setItem("bhadott-pwa-invite-hidden", "yes"); setHidden(true) }
  return <div className="border-b border-[#ded3e4] bg-[#f3eaf8]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center gap-4"><div className="flex-1"><span className="text-[10px] uppercase tracking-wider font-bold text-[#5b159d]">Aplicativo BHADOTT</span><h3 className="font-bold text-[#2c2030] mt-1">Leve a Área Católica com você</h3><p className="text-xs text-[#756b78] mt-1">Instale para acesso rápido e permita o lembrete quando abrir o aplicativo em um novo dia.</p></div><div className="flex flex-wrap gap-2">{installPrompt && <button onClick={install} className="inline-flex items-center gap-2 rounded-xl bg-[#5b159d] text-white px-4 py-3 text-xs font-bold"><Download size={14} /> Instalar aplicativo</button>}{notificationState !== "granted" && notificationState !== "unsupported" && <button onClick={enableNotifications} className="inline-flex items-center gap-2 rounded-xl bg-[#8a6924] text-white px-4 py-3 text-xs font-bold"><Bell size={14} /> Ativar lembrete</button>}<button onClick={dismiss} className="inline-flex items-center gap-2 rounded-xl border border-[#d8cae0] bg-white px-4 py-3 text-xs font-bold text-[#756b78]"><X size={14} /> Agora não</button></div></div></div>
}

function DailyLiturgyView() {
  const query = new URLSearchParams(window.location.hash.split("?")[1] || "")
  const requested = query.get("data")
  const [date, setDate] = useState(() => requested && /^\d{4}-\d{2}-\d{2}$/.test(requested) ? new Date(`${requested}T12:00:00`) : new Date())
  const [liturgy, setLiturgy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState("")
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const isoDate = `${year}-${month}-${day}`
  const formattedDate = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(date)

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotice("")
    fetch(`https://parolaviva.art/api/v1/letture/${year}/${month}-${day}.json`)
      .then((response) => { if (!response.ok) throw new Error(); return response.json() })
      .then((data) => { if (active) setLiturgy(data) })
      .catch(() => { if (active) setLiturgy(null) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [year, month, day])

  const moveDate = (amount) => setDate((current) => { const next = new Date(current); next.setDate(next.getDate() + amount); return next })
  const readings = Object.entries(liturgy?.letture || {})
  const celebration = knownCelebrations[liturgy?.id_celebrazione] || liturgy?.celebrazione || "Liturgia do dia"
  const gospel = liturgy?.letture?.vangelo?.riferimento || ""
  const shareUrl = `${window.location.origin}${window.location.pathname}#/catolico?secao=evangelho&data=${isoDate}`
  const shareText = `Evangelho do Dia · ${formattedDate}\n${celebration}${gospel ? `\nEvangelho: ${gospel}` : ""}\nLeia e medite gratuitamente no BHADOTT Studio:`
  const copyReading = async () => { await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`); setNotice("Conteúdo copiado!") }
  const shareReading = async () => {
    if (navigator.share) return navigator.share({ title: "Evangelho do Dia", text: shareText, url: shareUrl })
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, "_blank", "noopener,noreferrer")
  }

  return <div className="rounded-[2rem] bg-[#fbf8f2] text-[#271e2b] p-5 sm:p-9 lg:p-12">
    <div className="text-center"><span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8a6924]">Palavra para o caminho</span><h2 className="text-4xl sm:text-5xl font-bold mt-3" style={{ fontFamily: "Georgia, serif" }}>Evangelho do Dia</h2><p className="text-[#766b79] capitalize mt-3">{formattedDate}</p></div>
    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto mt-8"><button onClick={() => moveDate(-1)} className="rounded-2xl border border-[#e2d8e8] bg-white px-2 py-4 text-xs sm:text-sm font-bold"><ChevronLeft size={15} className="inline" /> Anterior</button><button onClick={() => setDate(new Date())} className="rounded-2xl bg-[#8a6924] text-white px-2 py-4 text-sm font-bold">Hoje</button><button onClick={() => moveDate(1)} className="rounded-2xl border border-[#e2d8e8] bg-white px-2 py-4 text-xs sm:text-sm font-bold">Próximo <ChevronRight size={15} className="inline" /></button></div>
    {loading && <div className="h-72 grid place-items-center"><LoaderCircle className="animate-spin text-[#8a6924]" size={36} /></div>}
    {!loading && !liturgy && <div className="max-w-xl mx-auto mt-10 rounded-3xl border border-[#e2d8e8] bg-white p-8 text-center"><h3 className="text-xl font-bold">Leitura ainda não disponível</h3><p className="text-sm text-[#766b79] mt-2">Escolha outro dia ou tente novamente mais tarde.</p></div>}
    {!loading && liturgy && <div className="grid lg:grid-cols-[290px_1fr] gap-5 mt-10 items-start"><aside className="rounded-3xl border border-[#e2d8e8] bg-white p-5 lg:sticky lg:top-40"><span className="text-[10px] uppercase tracking-wider text-[#8a6924]">Celebração</span><h3 className="text-2xl font-bold mt-2" style={{ fontFamily: "Georgia, serif" }}>{celebration}</h3><p className="text-sm text-[#766b79] mt-2">Cor litúrgica: <strong>{liturgicalColors[liturgy.colore] || liturgy.colore}</strong></p><div className="space-y-2 mt-6">{readings.map(([type, reading]) => <a key={type} href={`#reading-${type}`} className="block rounded-xl bg-[#f4edf8] p-3"><strong className="block text-xs text-[#795911]">{readingLabels[type] || type}</strong><span className="text-sm">{reading.riferimento}</span></a>)}</div></aside><main className="space-y-4">{readings.map(([type, reading]) => <article id={`reading-${type}`} key={type} className={`rounded-3xl border p-6 sm:p-8 ${type === "vangelo" ? "border-[#caa64e] bg-[#fffaf0]" : "border-[#e2d8e8] bg-white"}`}><span className="text-xs uppercase tracking-wider font-bold text-[#8a6924]">{readingLabels[type] || type}</span><h3 className="text-3xl sm:text-4xl font-bold mt-3" style={{ fontFamily: "Georgia, serif" }}>{reading.riferimento}</h3>{type === "vangelo" && <div className="mt-6 rounded-2xl bg-[#f1e8f7] p-5"><strong className="text-sm">Para meditar</strong><p className="text-sm text-[#5f5365] leading-relaxed mt-2">O que Jesus me convida a escutar, transformar ou praticar neste dia?</p></div>}</article>)}</main></div>}
    <div className="max-w-3xl mx-auto mt-8 rounded-3xl border border-[#e2d8e8] bg-white p-6"><h3 className="font-bold">Leia o texto completo em português</h3><p className="text-sm text-[#766b79] mt-2">As referências são atualizadas automaticamente. O texto bíblico integral é aberto na fonte oficial para respeitar os direitos da edição em português.</p><div className="flex flex-wrap gap-3 mt-5"><a href="https://liturgiadiaria.edicoescnbb.com.br/" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#8a6924] text-white px-4 py-3 text-sm font-bold">Abrir CNBB <ExternalLink size={14} className="inline ml-1" /></a><button onClick={copyReading} className="rounded-xl border border-[#d4c28f] px-4 py-3 text-sm font-bold"><Copy size={14} className="inline mr-1" /> Copiar</button><button onClick={shareReading} className="rounded-xl bg-[#5b159d] text-white px-4 py-3 text-sm font-bold"><Share2 size={14} className="inline mr-1" /> Compartilhar</button></div>{notice && <p className="text-sm text-emerald-700 mt-3">{notice}</p>}</div>
    <p className="text-center text-xs text-[#8a808c] mt-6">Calendário e referências: Parola Viva, CC BY 4.0 · Leitura integral em português: CNBB.</p>
  </div>
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
            <p className="text-sm text-slate-500 mt-2">{id === "evangelho" ? "Celebração, referências diárias, meditação e compartilhamento." : id === "oracoes" ? "Orações tradicionais para diferentes momentos." : id === "rosario" ? "Mistérios e um guia simples para começar." : id === "santos" ? "Vidas que testemunham diferentes caminhos de santidade." : id === "roteiros" ? "Planos de leitura bíblica e preparação dominical." : id === "formacao" ? "Lectio Divina, Via-Sacra, novenas, catequese e exame." : id === "leitor" ? "Livros completos para ler sem sair do portal." : id === "curiosidades" ? "Bíblia, história, símbolos e doutrina com referências." : id === "loja" ? "Catálogo gratuito preparado para futuros materiais." : id === "catecismo" ? "Leitor pessoal de PDF e trilha gratuita pelos quatro pilares." : "Clássicos espirituais e acervos de domínio público."}</p>
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

const rosaryScripture = {
  "Mistérios Gozosos": [
    ["A Anunciação do Anjo a Maria", "Lc 1,26-38", "Acolher com fé a vontade de Deus."],
    ["A Visitação de Maria a Isabel", "Lc 1,39-56", "Levar Cristo ao encontro do próximo."],
    ["O nascimento de Jesus em Belém", "Lc 2,1-20", "Contemplar a humildade do Salvador."],
    ["A apresentação de Jesus no Templo", "Lc 2,22-35", "Oferecer a vida e confiar nas promessas."],
    ["O encontro de Jesus no Templo", "Lc 2,41-52", "Procurar Jesus com perseverança."],
  ],
  "Mistérios Luminosos": [
    ["O Batismo de Jesus no Jordão", "Mt 3,13-17", "Recordar a graça e a missão do Batismo."],
    ["Jesus se revela nas bodas de Caná", "Jo 2,1-11", "Confiar em Cristo e fazer o que Ele disser."],
    ["O anúncio do Reino e o convite à conversão", "Mc 1,14-15", "Converter o coração e acolher o Evangelho."],
    ["A Transfiguração de Jesus", "Mt 17,1-9", "Escutar o Filho amado do Pai."],
    ["A instituição da Eucaristia", "Lc 22,14-20", "Agradecer a presença e a entrega de Cristo."],
  ],
  "Mistérios Dolorosos": [
    ["A agonia de Jesus no Horto", "Mt 26,36-46", "Permanecer com Jesus e confiar ao Pai a própria angústia."],
    ["A flagelação de Jesus", "Jo 19,1", "Pedir cura para as feridas do corpo e da alma."],
    ["A coroação de espinhos", "Mt 27,27-31", "Reconhecer a realeza humilde de Cristo."],
    ["Jesus carrega a cruz", "Lc 23,26-32", "Acompanhar os que sofrem e carregar a cruz com esperança."],
    ["A crucificação e morte de Jesus", "Jo 19,25-30", "Permanecer aos pés da cruz e receber o amor entregue."],
  ],
  "Mistérios Gloriosos": [
    ["A Ressurreição de Jesus", "Mt 28,1-10", "Renovar a esperança na vitória de Cristo."],
    ["A Ascensão de Jesus", "At 1,6-11", "Viver a missão enquanto esperamos o Senhor."],
    ["A vinda do Espírito Santo", "At 2,1-13", "Pedir os dons do Espírito para servir."],
    ["A Assunção de Maria", "Ap 12,1; cf. Lc 1,46-55", "Contemplar a esperança da vida plena em Deus."],
    ["A coroação de Maria", "Ap 12,1; cf. 2Tm 4,8", "Pedir perseverança e contemplar a vitória da graça."],
  ],
}

const angelicChoirs = [
  ["Serafins", "Que o amor de Deus inflame nosso coração."], ["Querubins", "Que cresçamos no conhecimento e na sabedoria da fé."], ["Tronos", "Que a humildade e a paz ordenem nossa vida."], ["Dominações", "Que aprendamos a servir sem dominar o próximo."], ["Potestades", "Que sejamos fortalecidos contra o mal e a tentação."], ["Virtudes", "Que perseveremos na prática do bem."], ["Principados", "Que famílias, comunidades e povos sejam guiados pela justiça."], ["Arcanjos", "Que acolhamos os anúncios e as missões confiadas por Deus."], ["Anjos", "Que caminhemos sob a proteção de Deus e cuidemos uns dos outros."],
]

const rosaryNarratives = {
  "A Anunciação do Anjo a Maria": "Deus envia o anjo Gabriel a Nazaré. Maria escuta que dará à luz Jesus, o Filho do Altíssimo. Diante do mistério e das próprias perguntas, ela confia: coloca sua liberdade a serviço da Palavra e acolhe a missão recebida.",
  "A Visitação de Maria a Isabel": "Maria parte apressadamente para a casa de Isabel. Ao ouvir sua saudação, Isabel fica cheia do Espírito Santo e reconhece a bênção trazida por aquela visita. Maria responde louvando a grandeza de Deus, que olha para os pequenos.",
  "O nascimento de Jesus em Belém": "José e Maria chegam a Belém, mas não encontram lugar. Jesus nasce na pobreza e é colocado numa manjedoura. Os anjos anunciam paz aos pastores, que vão ao encontro do Menino e depois comunicam aquilo que viram.",
  "A apresentação de Jesus no Templo": "Maria e José apresentam Jesus ao Senhor. Simeão recebe o Menino, louva a Deus e reconhece nele a luz destinada a todos os povos. Ana também dá graças e fala daquela criança aos que esperavam a redenção.",
  "O encontro de Jesus no Templo": "Depois de procurarem Jesus com aflição, Maria e José o encontram no Templo, ouvindo e interrogando os mestres. Jesus retorna com eles a Nazaré e cresce em sabedoria, idade e graça, enquanto Maria guarda os acontecimentos no coração.",
  "O Batismo de Jesus no Jordão": "Jesus aproxima-se de João e recebe o batismo no Jordão. Os céus se abrem, o Espírito desce sobre ele e a voz do Pai o apresenta como Filho amado. Começa publicamente sua missão de anunciar e realizar o Reino.",
  "Jesus se revela nas bodas de Caná": "Numa festa de casamento, Maria percebe que o vinho acabou e apresenta a necessidade a Jesus. Ela orienta os servidores a fazerem tudo o que ele disser. A água é transformada em vinho, e os discípulos fortalecem sua fé.",
  "O anúncio do Reino e o convite à conversão": "Jesus percorre cidades e povoados anunciando que o Reino de Deus está próximo. Ele chama à conversão, perdoa, cura, acolhe os excluídos e ensina que o amor a Deus se torna inseparável do amor ao próximo.",
  "A Transfiguração de Jesus": "Jesus leva Pedro, Tiago e João a um monte. Seu rosto resplandece e suas roupas tornam-se luminosas. Moisés e Elias aparecem, e a voz do Pai convida os discípulos a escutarem o Filho. Jesus os toca e pede que não tenham medo.",
  "A instituição da Eucaristia": "Na noite da última ceia, Jesus toma o pão, agradece, parte e o entrega aos discípulos como seu corpo. Depois oferece o cálice. Ele deixa à comunidade o memorial de sua entrega e o mandamento de amar como ele amou.",
  "A agonia de Jesus no Horto": "No Getsêmani, Jesus sente tristeza e angústia. Pede aos discípulos que vigiem com ele e dirige-se ao Pai com confiança, entregando sua vontade. Mesmo encontrando os amigos adormecidos, permanece fiel diante da hora que se aproxima.",
  "A flagelação de Jesus": "Jesus, inocente, é entregue à violência dos soldados. Contemplamos seu corpo ferido e recordamos todas as pessoas humilhadas, torturadas ou tratadas como objetos. Pedimos um coração incapaz de permanecer indiferente ao sofrimento.",
  "A coroação de espinhos": "Os soldados vestem Jesus para ridicularizá-lo, colocam espinhos sobre sua cabeça e zombam de sua realeza. Cristo não responde com ódio. Nele contemplamos um Rei cuja força se manifesta na fidelidade, na verdade e no amor.",
  "Jesus carrega a cruz": "Jesus segue para o Calvário carregando a cruz. Simão de Cirene é chamado a ajudá-lo, e mulheres choram no caminho. Contemplamos o Senhor que entra no sofrimento humano e aprendemos a carregar os fardos uns dos outros.",
  "A crucificação e morte de Jesus": "Junto à cruz permanecem Maria e o discípulo amado. Jesus entrega sua mãe ao discípulo, manifesta sua sede e leva até o fim sua missão. Ao entregar o espírito, revela um amor que não recua diante da dor e da morte.",
  "A Ressurreição de Jesus": "Ao amanhecer, as mulheres encontram o túmulo vazio e recebem o anúncio de que Jesus ressuscitou. O medo começa a dar lugar à alegria e à missão. A morte não possui a última palavra: Cristo vive e chama novamente seus discípulos.",
  "A Ascensão de Jesus": "Jesus abençoa os discípulos e é elevado diante deles. Os anjos os recordam de que não devem permanecer apenas olhando para o céu. Fortalecidos pela promessa do Espírito, eles voltam para assumir a missão recebida.",
  "A vinda do Espírito Santo": "Reunidos em oração com Maria, os discípulos recebem o Espírito Santo. Um vento forte enche a casa e línguas como de fogo repousam sobre eles. Pessoas de muitos povos escutam a Boa-Nova, sinal de uma Igreja enviada a todos.",
  "A Assunção de Maria": "A fé da Igreja contempla Maria plenamente acolhida por Deus. Aquela que recebeu a Palavra, acompanhou Jesus e permaneceu junto à cruz participa da vitória de seu Filho. Nela reconhecemos a esperança destinada a toda a humanidade redimida.",
  "A coroação de Maria": "Maria é contemplada na glória como serva fiel e mãe do Senhor. Sua grandeza não vem do poder terreno, mas da graça de Deus e de seu sim perseverante. Pedimos que ela nos ajude a permanecer com Cristo até o fim.",
}

function GuidedRosary({ title }) {
  const [position, setPosition] = useState(0)
  useEffect(() => setPosition(0), [title])
  const stagesPerMystery = 14
  const total = stagesPerMystery * 5
  const mysteryIndex = Math.min(Math.floor(position / stagesPerMystery), 4)
  const stage = position % stagesPerMystery
  const mystery = rosaryScripture[title][mysteryIndex]
  const prayer = stage === 1 ? traditionalPrayers.find((item) => item.title === "Pai-Nosso") : stage >= 2 && stage <= 11 ? traditionalPrayers.find((item) => item.title === "Ave-Maria") : stage === 12 ? traditionalPrayers.find((item) => item.title === "Glória ao Pai") : null
  const stageTitle = stage === 0 ? "Leitura para contemplar" : stage === 1 ? "Pai-Nosso" : stage >= 2 && stage <= 11 ? `${stage - 1}ª Ave-Maria` : stage === 12 ? "Glória ao Pai" : "Oração do mistério"
  return <section className="rounded-[2rem] border border-[#d8c9df] bg-gradient-to-br from-[#fffdf8] to-[#f4eaf8] p-5 sm:p-9 mb-7"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><span className="text-[10px] uppercase tracking-wider font-bold text-[#8a6924]">Modo guiado · {mysteryIndex + 1}º mistério</span><h3 className="text-xl sm:text-2xl font-bold text-[#2c2030] mt-1">{mystery[0]}</h3></div><strong className="text-sm text-[#5b159d]">{position + 1} de {total}</strong></div><div className="h-1.5 rounded-full bg-white mt-5 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#8a6924] to-[#5b159d] transition-all" style={{ width: `${((position + 1) / total) * 100}%` }} /></div><article className="min-h-[370px] rounded-3xl border border-[#e1d6e6] bg-white p-6 sm:p-10 mt-5 flex flex-col justify-center text-center"><span className="text-xs uppercase tracking-[0.18em] font-bold text-[#8a6924]">{stageTitle}</span>{stage === 0 ? <><h4 className="text-3xl font-bold text-[#2c2030] mt-4" style={{ fontFamily: "Georgia, serif" }}>{mystery[1]}</h4><p className="max-w-2xl mx-auto text-base sm:text-lg text-[#554a59] leading-8 mt-6" style={{ fontFamily: "Georgia, serif" }}>{rosaryNarratives[mystery[0]]}</p><p className="text-sm text-[#806f86] mt-6"><strong>Para guardar no coração:</strong> {mystery[2]}</p><p className="text-[11px] text-[#95889a] mt-4">Meditação narrativa autoral baseada na passagem indicada; não é uma tradução bíblica oficial.</p></> : prayer ? <><h4 className="text-3xl font-bold text-[#2c2030] mt-4" style={{ fontFamily: "Georgia, serif" }}>{stageTitle}</h4><p className="max-w-2xl mx-auto text-lg text-[#554a59] leading-8 mt-7" style={{ fontFamily: "Georgia, serif" }}>{prayer.text}</p></> : <><h4 className="text-3xl font-bold text-[#2c2030] mt-4">Entregue este mistério</h4><p className="max-w-2xl mx-auto text-lg text-[#554a59] leading-8 mt-7">Senhor Jesus, fazei frutificar em nossa vida aquilo que contemplamos. Conduzi-nos na fé, na esperança e na caridade. Amém.</p></>}</article><div className="flex items-center justify-between gap-3 mt-5"><button onClick={() => setPosition((value) => Math.max(0, value - 1))} disabled={position === 0} className="rounded-xl border border-[#d9cce0] bg-white px-4 py-3 text-sm font-bold disabled:opacity-30"><ChevronLeft size={15} className="inline" /> Voltar</button><button onClick={() => setPosition((value) => Math.min(total - 1, value + 1))} disabled={position === total - 1} className="rounded-xl bg-[#5b159d] text-white px-5 py-3 text-sm font-bold disabled:opacity-30">Continuar <ChevronRight size={15} className="inline" /></button></div></section>
}

function PrayerText({ title }) {
  const prayer = traditionalPrayers.find((item) => item.title === title)
  return prayer ? <div className="rounded-2xl border border-[#e1d6e6] bg-white p-4"><strong className="text-sm text-[#5b159d]">{title}</strong><p className="text-sm text-[#65596a] leading-relaxed mt-2">{prayer.text}</p></div> : null
}

function RosaryView() {
  const [devotion, setDevotion] = useState("rosario")
  const [setTitle, setSetTitle] = useState("Mistérios Gozosos")
  const [step, setStep] = useState(0)
  const [bead, setBead] = useState(0)
  const mystery = rosaryScripture[setTitle]?.[step]
  const choir = angelicChoirs[step]
  const maxBeads = devotion === "rosario" ? 10 : 3
  const nextStep = () => { setStep((value) => Math.min(value + 1, devotion === "rosario" ? 4 : 8)); setBead(0) }
  const reset = (nextDevotion) => { setDevotion(nextDevotion); setStep(0); setBead(0) }
  return <>
    <SectionHeading eyebrow="Oração acompanhada" title="Reze passo a passo" description="Escolha uma devoção, leia a passagem ou intenção, acompanhe cada conta e avance no seu ritmo. O progresso permanece nesta tela enquanto você reza." />
    <div className="flex flex-wrap gap-3 mb-6"><button onClick={() => reset("rosario")} className={`rounded-xl px-5 py-3 text-sm font-bold border ${devotion === "rosario" ? "bg-[#5b159d] text-white border-[#5b159d]" : "bg-white text-[#5b159d] border-[#d9cce0]"}`}>Santo Rosário</button><button onClick={() => reset("miguel")} className={`rounded-xl px-5 py-3 text-sm font-bold border ${devotion === "miguel" ? "bg-[#5b159d] text-white border-[#5b159d]" : "bg-white text-[#5b159d] border-[#d9cce0]"}`}>Terço de São Miguel</button></div>
    {devotion === "rosario" && <details className="rounded-3xl border border-[#e1d6e6] bg-[#f7f0fa] p-5 mb-6"><summary className="cursor-pointer font-bold text-[#5b159d]">Orações iniciais · abrir roteiro</summary><p className="text-sm text-[#65596a] mt-4 mb-4">Faça o Sinal da Cruz, apresente sua intenção, reze o Creio, um Pai-Nosso, três Ave-Marias pelas virtudes da fé, esperança e caridade, e o Glória.</p><div className="grid lg:grid-cols-3 gap-3"><PrayerText title="Creio" /><PrayerText title="Pai-Nosso" /><PrayerText title="Ave-Maria" /></div></details>}
    {devotion === "rosario" && <div className="flex gap-2 overflow-x-auto pb-2 mb-6">{Object.keys(rosaryScripture).map((title) => <button key={title} onClick={() => { setSetTitle(title); setStep(0); setBead(0) }} className={`flex-shrink-0 rounded-xl px-4 py-3 text-xs font-bold border ${setTitle === title ? "bg-[#f1e4f7] text-[#5b159d] border-[#b997c9]" : "bg-white text-[#756b78] border-[#e1d6e6]"}`}>{title}</button>)}</div>}
    {devotion === "rosario" && <GuidedRosary title={setTitle} />}
    <div className="grid lg:grid-cols-[280px_1fr] gap-5 items-start">
      <aside className="rounded-3xl border border-[#e1d6e6] bg-white p-5 lg:sticky lg:top-40"><span className="text-[10px] uppercase tracking-wider font-bold text-[#8a6924]">{devotion === "rosario" ? setTitle : "Nove saudações"}</span><div className="space-y-2 mt-4">{(devotion === "rosario" ? rosaryScripture[setTitle] : angelicChoirs).map((item, index) => <button key={item[0]} onClick={() => { setStep(index); setBead(0) }} className={`w-full text-left rounded-xl p-3 text-xs border ${step === index ? "bg-[#f1e8f7] text-[#5b159d] border-[#c6a9d4]" : "bg-[#fffdf8] text-[#756b78] border-[#eee7f0]"}`}><strong>{index + 1}. {item[0]}</strong>{devotion === "rosario" && <span className="block mt-1">{item[1]}</span>}</button>)}</div></aside>
      <main className="rounded-[2rem] border border-[#dfd3e5] bg-gradient-to-br from-white to-[#faf4fc] p-6 sm:p-10">
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8a6924]">{devotion === "rosario" ? `${step + 1}º mistério` : `${step + 1}ª saudação · ${choir[0]}`}</span><h3 className="text-3xl sm:text-4xl font-bold text-[#2c2030] mt-3" style={{ fontFamily: "Georgia, serif" }}>{devotion === "rosario" ? mystery[0] : `Em honra ao coro dos ${choir[0]}`}</h3>
        {devotion === "rosario" ? <><div className="rounded-2xl bg-[#f5ead0] p-5 mt-6"><strong className="text-sm text-[#795911]">Leitura bíblica · {mystery[1]}</strong><p className="text-sm text-[#65596a] mt-2">Abra a passagem em sua Bíblia, leia devagar e permaneça um instante em silêncio.</p></div><p className="text-base text-[#5e5263] leading-relaxed mt-5"><strong>Intenção:</strong> {mystery[2]}</p></> : <p className="text-base text-[#5e5263] leading-relaxed mt-6">{choir[1]} Reze um Pai-Nosso e três Ave-Marias.</p>}
        <div className="grid md:grid-cols-2 gap-3 mt-7"><PrayerText title="Pai-Nosso" /><PrayerText title="Ave-Maria" /></div>
        <div className="mt-7 rounded-3xl border border-[#d8c9df] bg-white p-5 text-center"><p className="text-xs uppercase tracking-wider font-bold text-[#5b159d]">{devotion === "rosario" ? "Dez Ave-Marias" : "Três Ave-Marias"}</p><div className="flex flex-wrap justify-center gap-2 mt-4">{Array.from({ length: maxBeads }, (_, index) => <button key={index} onClick={() => setBead(index + 1)} aria-label={`Ave-Maria ${index + 1}`} className={`w-10 h-10 rounded-full border font-bold text-xs transition ${index < bead ? "bg-[#5b159d] text-white border-[#5b159d]" : "bg-[#f8f2fa] text-[#806d87] border-[#d8c9df]"}`}>{index + 1}</button>)}</div><p className="text-sm text-[#756b78] mt-4">{bead} de {maxBeads} Ave-Marias</p></div>
        {devotion === "rosario" && <div className="mt-4"><PrayerText title="Glória ao Pai" /></div>}
        <div className="flex items-center justify-between gap-3 mt-7"><button onClick={() => { setStep((value) => Math.max(value - 1, 0)); setBead(0) }} disabled={step === 0} className="rounded-xl border border-[#d9cce0] bg-white px-4 py-3 text-sm font-bold disabled:opacity-30"><ChevronLeft size={15} className="inline" /> Anterior</button><button onClick={nextStep} disabled={step === (devotion === "rosario" ? 4 : 8)} className="rounded-xl bg-[#8a6924] text-white px-4 py-3 text-sm font-bold disabled:opacity-30">Próxima parte <ChevronRight size={15} className="inline" /></button></div>
      </main>
    </div>
    <div className="mt-6 rounded-2xl border border-[#e1d6e6] bg-white p-5 text-sm text-[#65596a] leading-relaxed">{devotion === "rosario" ? "Ao concluir os cinco mistérios, reze a Salve-Rainha e apresente suas intenções. Fonte para a estrutura e os mistérios: Rosarium Virginis Mariae e guia do Rosário da Santa Sé." : "Depois das nove saudações, a tradição conclui com quatro Pai-Nossos: em honra a São Miguel, São Gabriel, São Rafael e ao Anjo da Guarda. Fonte devocional consultada: Basílica de São Miguel Arcanjo."}</div>
  </>
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
  const [activeTab, setActiveTab] = useState(() => new URLSearchParams(window.location.hash.split("?")[1] || "").get("secao") || "inicio")
  useEffect(() => {
    const syncSection = () => setActiveTab(new URLSearchParams(window.location.hash.split("?")[1] || "").get("secao") || "inicio")
    window.addEventListener("hashchange", syncSection)
    return () => window.removeEventListener("hashchange", syncSection)
  }, [])
  return (
    <PageLayout backLabel="Voltar para o Portal" backTo="/portal" theme="catholic" customHeader={<CatholicHeader />} customFooter={<CatholicFooter />}>
      <div className="catholic-theme">
      <PageHero badge="Fé · Leitura · Oração" title="Área" titleGrad="Católica" subtitle="Um espaço sereno para rezar, estudar e descobrir a riqueza da tradição cristã." theme="catholic">
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-[#8a6924]"><BookHeart size={14} aria-hidden="true" /> Conteúdo gratuito, introdutório e cuidadosamente organizado</div>
      </PageHero>
      <GlowDivider color="violet" />
      <div className="sticky top-16 lg:top-20 z-30 border-b border-[#ded3e4] bg-[#fffdf8]/95 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto" aria-label="Seções da Área Católica">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-colors focus-ring ${activeTab === id ? "text-[#6f4e09] bg-[#f5ead0] border-[#caa64e]" : "text-[#756b78] bg-white border-[#ded3e4] hover:text-[#5b159d]"}`}>
              <Icon size={14} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
      </div>
      <CatholicAppInvite />
      <section className="py-14 sm:py-20 bg-[#fbf8f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "inicio" && <StartView setActiveTab={setActiveTab} />}
          {activeTab === "evangelho" && <DailyLiturgyView />}
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
      </div>
    </PageLayout>
  )
}
