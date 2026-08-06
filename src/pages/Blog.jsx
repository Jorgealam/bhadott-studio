import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock3, Newspaper, PenLine } from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"
import { blogCategories, plannedPosts } from "../data/blogPosts"

export default function Blog() {
  const [category, setCategory] = useState("Todos")
  const posts = useMemo(
    () => category === "Todos" ? plannedPosts : plannedPosts.filter((post) => post.category === category),
    [category],
  )

  return (
    <PageLayout backLabel="Voltar para a Home" backTo="/">
      <PageHero
        badge="Blog"
        title="Caderno do"
        titleGrad="BHADOTT"
        subtitle="Projetos, aprendizados e bastidores documentados com clareza — do primeiro rascunho à publicação."
      />

      <GlowDivider color="mixed" />

      <section className="relative py-16 sm:py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 mb-14">
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.09] to-violet-500/[0.035] p-7 sm:p-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-blue-400 mb-5"><PenLine size={14} aria-hidden="true" /> Primeira publicação</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  De site para ecossistema: a evolução do BHADOTT Studio
                </h2>
                <p className="text-slate-400 mt-4 max-w-xl leading-relaxed">O artigo inaugural já está em produção e vai registrar as decisões que deram origem ao novo portal.</p>
                <div className="flex items-center gap-4 mt-7 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={13} aria-hidden="true" /> 6 min de leitura</span>
                  <span className="px-2.5 py-1 rounded-full border border-blue-400/15 bg-blue-500/8 text-blue-300">Em produção</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/7 bg-white/[0.025] p-7 flex flex-col justify-between">
              <div>
                <Newspaper size={24} className="text-violet-400 mb-5" aria-hidden="true" />
                <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Compromisso editorial</h2>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">O blog mostrará conteúdo real, autoria clara e referências quando necessárias. Pautas planejadas não serão apresentadas como artigos publicados.</p>
              </div>
              <div className="mt-7 pt-5 border-t border-white/6 text-xs text-slate-600">Publicação gradual · Sem conteúdo artificial em massa</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-violet-400">Planejamento editorial</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Próximas pautas</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar pautas por categoria">
              {blogCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors focus-ring ${category === item ? "text-blue-300 bg-blue-500/10 border-blue-400/20" : "text-slate-500 border-white/7 hover:text-slate-300 hover:border-white/15"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/7 bg-white/[0.025]"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">{post.category}</span>
                  <span className="text-[10px] text-slate-600">{post.status}</span>
                </div>
                <h3 className="font-bold text-white leading-snug min-h-[48px]">{post.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-3 min-h-[84px]">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/6 text-xs text-slate-600">
                  <BookOpen size={13} aria-hidden="true" /> {post.readingTime}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">Os artigos serão liberados individualmente quando estiverem revisados.</p>
            <a href="https://instagram.com/bhadottstudio" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 focus-ring rounded">
              Acompanhar novidades <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
