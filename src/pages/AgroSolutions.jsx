// ============================================================
// BHADOTT Studio — BHADOTT Agro Solutions (página pública)
// src/pages/AgroSolutions.jsx
//
// Feed de anúncios, atualizações, lançamentos e publicações +
// comentários de clientes. Conteúdo vem do localStorage
// (ver src/lib/agroStore.js) com seed pronto em src/data/agroFeed.js.
// O painel de gestão fica em /studio.
// ============================================================

import { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Megaphone, RefreshCw, Rocket, Newspaper, Pin, Star, Play,
  FileText, Calendar, ArrowRight, X, Send, Lock, MessageSquare,
  Filter, ExternalLink, Quote, CheckCircle2, Sprout,
} from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"
import {
  postTypes, feedColors, resolveVideo, formatDate, timeAgo, makeId,
} from "../data/agroFeed"
import { useAgroData, addComment } from "../lib/agroStore"

const typeIcons = { Megaphone, RefreshCw, Rocket, Newspaper }

const filters = [
  { id: "all",         label: "Tudo"          },
  { id: "anuncio",     label: "Anúncios"      },
  { id: "atualizacao", label: "Atualizações"  },
  { id: "lancamento",  label: "Lançamentos"   },
  { id: "publicacao",  label: "Publicações"   },
]

// ── Mídia: miniatura no card ─────────────────────────────────
function MediaThumb({ media }) {
  if (!media || media.kind === "none") return null

  if (media.kind === "image") {
    return (
      <div className="relative h-44 -mx-px -mt-px overflow-hidden rounded-t-2xl">
        <img src={media.url} alt={media.label || ""} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" aria-hidden="true" />
      </div>
    )
  }

  if (media.kind === "video") {
    const v = resolveVideo(media.url)
    const thumb = v?.provider === "youtube" ? v.thumb : null
    return (
      <div className="relative h-44 -mx-px -mt-px overflow-hidden rounded-t-2xl bg-black/40">
        {thumb ? (
          <img src={thumb} alt={media.label || "Vídeo"} loading="lazy" className="h-full w-full object-cover opacity-80" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/15 to-violet-500/15" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
            <Play size={20} className="ml-0.5 text-white" fill="currentColor" aria-hidden="true" />
          </div>
        </div>
      </div>
    )
  }

  if (media.kind === "document") {
    return (
      <div className="flex h-44 -mx-px -mt-px items-center justify-center rounded-t-2xl bg-gradient-to-br from-slate-500/10 to-blue-500/10">
        <div className="text-center">
          <FileText size={36} className="mx-auto mb-2 text-blue-400" aria-hidden="true" />
          <p className="px-4 text-xs text-slate-400">{media.label || "Documento"}</p>
        </div>
      </div>
    )
  }

  return null
}

// ── Mídia: render completo no modal ──────────────────────────
function MediaFull({ media }) {
  if (!media || media.kind === "none") return null

  if (media.kind === "image") {
    return (
      <div className="mb-5 overflow-hidden rounded-xl border border-white/8">
        <img src={media.url} alt={media.label || ""} className="w-full" />
      </div>
    )
  }

  if (media.kind === "video") {
    const v = resolveVideo(media.url)
    if (v?.provider === "youtube") {
      return (
        <div className="mb-5 aspect-video overflow-hidden rounded-xl border border-white/8">
          <iframe
            src={v.embed}
            title={media.label || "Vídeo"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
    if (v?.provider === "file") {
      return (
        <div className="mb-5 overflow-hidden rounded-xl border border-white/8">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src={v.src} controls className="w-full" />
        </div>
      )
    }
    return null
  }

  if (media.kind === "document") {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 flex items-center gap-3 rounded-xl border border-white/8 p-4 transition-colors hover:border-blue-500/30"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
          <FileText size={20} className="text-blue-400" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{media.label || "Abrir documento"}</p>
          <p className="text-xs text-slate-500">Clique para abrir em nova aba</p>
        </div>
        <ExternalLink size={16} className="flex-shrink-0 text-slate-500" aria-hidden="true" />
      </a>
    )
  }

  return null
}

// ── Card de publicação ───────────────────────────────────────
function PostCard({ post, index, inView, onOpen }) {
  const meta = postTypes[post.type] || postTypes.publicacao
  const c = feedColors[meta.color] || feedColors.gray
  const Icon = typeIcons[meta.icon] || Newspaper

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(post)}
      aria-label={`Abrir: ${post.title}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/8 transition-colors hover:border-white/15"
      style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}
    >
      <MediaThumb media={post.media} />

      <div className="flex flex-1 flex-col p-5">
        {/* tipo + fixado */}
        <div className="mb-3 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${c.bg} ${c.text} ${c.border}`}>
            <Icon size={12} aria-hidden="true" />
            {meta.label}
          </span>
          {post.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-2 py-1 text-[11px] font-semibold text-yellow-400">
              <Pin size={11} aria-hidden="true" />
              Fixado
            </span>
          )}
          <span className="ml-auto text-[11px] text-slate-600">{timeAgo(post.date)}</span>
        </div>

        <h3 className="mb-2 text-base font-bold leading-snug text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {post.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>

        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: c.hex }}>
          Ler mais
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  )
}

// ── Modal de leitura ─────────────────────────────────────────
function PostModal({ post, onClose }) {
  const meta = postTypes[post.type] || postTypes.publicacao
  const c = feedColors[meta.color] || feedColors.gray
  const Icon = typeIcons[meta.icon] || Newspaper

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: "rgba(2,6,23,0.8)", backdropFilter: "blur(8px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-4 w-full max-w-2xl rounded-2xl border border-white/10 p-6 sm:p-8"
        style={{ background: "#0a0f1e", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
      >
        <button
          onClick={onClose}
          className="focus-ring absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Fechar"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-2 pr-10">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${c.bg} ${c.text} ${c.border}`}>
            <Icon size={12} aria-hidden="true" />
            {meta.label}
          </span>
          {post.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-2 py-1 text-[11px] font-semibold text-yellow-400">
              <Pin size={11} aria-hidden="true" /> Fixado
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar size={11} aria-hidden="true" /> {formatDate(post.date)}
          </span>
        </div>

        <h2 className="mb-4 text-2xl font-black leading-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {post.title}
        </h2>

        <MediaFull media={post.media} />

        <div className="space-y-3 text-sm leading-relaxed text-slate-300">
          {(post.body || post.excerpt).split("\n").map((line, i) =>
            line.trim() ? <p key={i}>{line}</p> : <div key={i} className="h-1" />
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/6 pt-5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-xs text-slate-500">
                #{t}
              </span>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs text-slate-600">Publicado por {post.author || "BHADOTT Studio"}</p>
      </motion.div>
    </motion.div>
  )
}

// ── Estrelas ─────────────────────────────────────────────────
function Stars({ value = 5, size = 14, onSet }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type={onSet ? "button" : undefined}
          onClick={onSet ? () => onSet(n) : undefined}
          className={onSet ? "focus-ring rounded" : "pointer-events-none"}
          aria-label={onSet ? `${n} estrela${n > 1 ? "s" : ""}` : undefined}
          tabIndex={onSet ? 0 : -1}
        >
          <Star
            size={size}
            className={n <= value ? "text-yellow-400" : "text-slate-700"}
            fill={n <= value ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}

// ── Card de comentário ───────────────────────────────────────
function CommentCard({ comment, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="relative rounded-2xl border border-white/6 p-5"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <Quote size={28} className="mb-3 text-blue-500/30" aria-hidden="true" />
      <p className="mb-4 text-sm leading-relaxed text-slate-300">“{comment.text}”</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{comment.author}</p>
          {comment.role && <p className="text-xs text-slate-500">{comment.role}</p>}
        </div>
        <Stars value={comment.rating} />
      </div>
    </motion.div>
  )
}

// ── Formulário de comentário ─────────────────────────────────
function CommentForm() {
  const [form, setForm] = useState({ author: "", role: "", rating: 5, text: "" })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.author.trim() || !form.text.trim()) {
      setError("Preencha seu nome e o comentário.")
      return
    }
    setError("")
    addComment({
      id: makeId("c"),
      author: form.author.trim(),
      role: form.role.trim(),
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toISOString(),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-500/15 px-6 py-12 text-center" style={{ background: "rgba(34,197,94,0.04)" }}>
        <CheckCircle2 size={40} className="mb-3 text-green-400" aria-hidden="true" />
        <h3 className="mb-1 text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Comentário enviado!
        </h3>
        <p className="max-w-xs text-sm text-slate-400">
          Obrigado! Seu comentário ficará visível assim que for aprovado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
      <h3 className="text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Deixe seu comentário
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Seu nome"
          style={inputStyle}
        />
        <input
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          placeholder="Cidade / atividade (opcional)"
          style={inputStyle}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Nota</span>
        <Stars value={form.rating} size={20} onSet={(n) => setForm({ ...form, rating: n })} />
      </div>
      <textarea
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
        placeholder="Conte sua experiência com o BHADOTT Agro Solutions..."
        rows={4}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
      >
        <Send size={15} aria-hidden="true" />
        Enviar comentário
      </motion.button>
      <p className="text-xs text-slate-600">
        Seu comentário fica salvo localmente e passa por aprovação antes de aparecer publicamente.
      </p>
    </form>
  )
}

// ============================================================
// PÁGINA
// ============================================================
export default function AgroSolutions() {
  const { posts, comments } = useAgroData()
  const [filter, setFilter] = useState("all")
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

  const feedRef = useRef(null)
  const feedInView = useInView(feedRef, { once: true, margin: "-40px" })
  const commentsRef = useRef(null)
  const commentsInView = useInView(commentsRef, { once: true, margin: "-40px" })

  // Ordena: fixados primeiro, depois mais recentes
  const ordered = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1
      return new Date(b.date) - new Date(a.date)
    })
  }, [posts])

  const filtered = useMemo(
    () => (filter === "all" ? ordered : ordered.filter((p) => p.type === filter)),
    [ordered, filter]
  )

  const approved = useMemo(() => comments.filter((c) => c.approved), [comments])

  const stats = [
    { label: "Publicações", value: posts.length },
    { label: "Anúncios", value: posts.filter((p) => p.type === "anuncio").length },
    { label: "Avaliações", value: approved.length },
  ]

  return (
    <PageLayout backLabel="Voltar para Home" backTo="/">
      <PageHero
        badge="BHADOTT Agro Solutions"
        title="Novidades do"
        titleGrad="Agro Solutions"
        subtitle="Acompanhe anúncios, atualizações, lançamentos e o que nossos clientes dizem sobre a plataforma que está digitalizando o campo brasileiro."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("comentarios")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <MessageSquare size={15} aria-hidden="true" />
            Ver comentários
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/studio")}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:text-blue-400"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            title="Painel de gestão (privado)"
          >
            <Lock size={14} aria-hidden="true" />
            Painel Studio
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <GlowDivider color="green" />

      {/* ── FEED ── */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div ref={feedRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* filtros */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtrar publicações">
            <Filter size={14} className="mr-1 hidden self-center text-slate-600 sm:block" aria-hidden="true" />
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className="focus-ring rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all"
                style={{
                  background: filter === f.id ? "linear-gradient(135deg, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${filter === f.id ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  color: filter === f.id ? "#fff" : "#64748b",
                  boxShadow: filter === f.id ? "0 0 16px rgba(59,130,246,0.3)" : "none",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} inView={feedInView} onOpen={setActive} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center text-slate-600">
              <Sprout size={40} className="mb-4 text-slate-700" aria-hidden="true" />
              Nenhuma publicação nesta categoria ainda.
            </div>
          )}
        </div>
      </section>

      <GlowDivider color="mixed" />

      {/* ── COMENTÁRIOS ── */}
      <section id="comentarios" ref={commentsRef} className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={commentsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-2xl font-black text-white sm:text-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que dizem nossos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">clientes</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-400">
              Produtores reais usando o BHADOTT Agro Solutions no dia a dia da fazenda.
            </p>
          </motion.div>

          {approved.length > 0 && (
            <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {approved.map((c, i) => (
                <CommentCard key={c.id} comment={c} index={i} inView={commentsInView} />
              ))}
            </div>
          )}

          <div className="mx-auto max-w-xl">
            <CommentForm />
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && <PostModal post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </PageLayout>
  )
}
