import { useMemo, useState } from "react"
import { Calculator, FileText, LockKeyhole, RotateCcw } from "lucide-react"
import PageLayout, { GlowDivider, PageHero } from "../components/PageLayout"

function TextAnalyzer() {
  const [text, setText] = useState("")
  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const sentences = trimmed ? (trimmed.match(/[.!?]+(?:\s|$)/g) || []).length : 0
    return {
      characters: text.length,
      charactersWithoutSpaces: text.replace(/\s/g, "").length,
      words,
      lines: text ? text.split(/\r?\n/).length : 0,
      sentences,
      reading: words ? Math.max(1, Math.ceil(words / 200)) : 0,
    }
  }, [text])

  const cards = [
    ["Caracteres", stats.characters],
    ["Sem espaços", stats.charactersWithoutSpaces],
    ["Palavras", stats.words],
    ["Linhas", stats.lines],
    ["Frases", stats.sentences],
    ["Leitura", `${stats.reading} min`],
  ]

  return (
    <div className="rounded-3xl border border-white/7 bg-white/[0.025] p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-white font-black"><FileText size={18} className="text-blue-400" aria-hidden="true" /> Analisador de texto</div>
          <p className="text-xs text-slate-500 mt-2">Conte palavras, caracteres, linhas e tempo aproximado de leitura.</p>
        </div>
        <button onClick={() => setText("")} disabled={!text} className="p-2 rounded-lg text-slate-500 hover:text-blue-300 disabled:opacity-30 focus-ring" aria-label="Limpar texto">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Digite ou cole seu texto aqui..."
        rows={8}
        className="w-full resize-y rounded-2xl border border-white/8 bg-[#020617] p-4 text-sm text-slate-200 placeholder:text-slate-700 outline-none focus:border-blue-400/30 focus:ring-2 focus:ring-blue-500/10"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {cards.map(([label, value]) => (
          <div key={label} className="p-3 rounded-xl bg-[#020617]/70 border border-white/6">
            <span className="block text-lg font-black text-white">{value}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PercentageCalculator() {
  const [value, setValue] = useState("")
  const [percentage, setPercentage] = useState("")
  const numericValue = Number(String(value).replace(",", "."))
  const numericPercentage = Number(String(percentage).replace(",", "."))
  const valid = value !== "" && percentage !== "" && Number.isFinite(numericValue) && Number.isFinite(numericPercentage)
  const result = valid ? numericValue * numericPercentage / 100 : 0

  return (
    <div className="rounded-3xl border border-white/7 bg-white/[0.025] p-5 sm:p-7">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-white font-black"><Calculator size={18} className="text-violet-400" aria-hidden="true" /> Calculadora de porcentagem</div>
        <p className="text-xs text-slate-500 mt-2">Descubra rapidamente quanto representa uma porcentagem de qualquer valor.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs text-slate-500">
          Valor
          <input value={value} onChange={(event) => setValue(event.target.value)} inputMode="decimal" placeholder="Ex.: 2500" className="mt-2 w-full rounded-xl border border-white/8 bg-[#020617] p-3.5 text-sm text-white outline-none focus:border-violet-400/30" />
        </label>
        <label className="text-xs text-slate-500">
          Porcentagem
          <div className="relative mt-2">
            <input value={percentage} onChange={(event) => setPercentage(event.target.value)} inputMode="decimal" placeholder="Ex.: 12" className="w-full rounded-xl border border-white/8 bg-[#020617] p-3.5 pr-10 text-sm text-white outline-none focus:border-violet-400/30" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">%</span>
          </div>
        </label>
      </div>
      <div className="mt-5 rounded-2xl border border-violet-400/12 bg-violet-500/[0.06] p-5">
        <span className="text-xs uppercase tracking-wider text-violet-400">Resultado</span>
        <strong className="block text-3xl font-black text-white mt-2">{valid ? result.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "—"}</strong>
        <span className="block text-xs text-slate-600 mt-2">{valid ? `${numericPercentage}% de ${numericValue.toLocaleString("pt-BR")}` : "Preencha os dois campos"}</span>
      </div>
    </div>
  )
}

export default function Ferramentas() {
  return (
    <PageLayout backLabel="Voltar para o Portal" backTo="/portal">
      <PageHero
        badge="Ferramentas"
        title="Utilidades"
        titleGrad="BHADOTT"
        subtitle="Recursos simples, rápidos e gratuitos para resolver pequenas tarefas do dia a dia."
      >
        <div className="mt-7 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] text-xs text-emerald-300">
          <LockKeyhole size={13} aria-hidden="true" /> Seus dados permanecem neste navegador
        </div>
      </PageHero>
      <GlowDivider color="mixed" />
      <section className="py-16 sm:py-24 bg-[#020617]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-5 items-start">
          <TextAnalyzer />
          <PercentageCalculator />
        </div>
      </section>
    </PageLayout>
  )
}
