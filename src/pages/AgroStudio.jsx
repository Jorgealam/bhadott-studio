// ============================================================
// BHADOTT Studio — Painel do BHADOTT Agro Solutions
// src/pages/AgroStudio.jsx  (rota /studio)
//
// Painel pessoal protegido por PIN local. Permite criar/editar/
// remover publicações (anúncio, atualização, lançamento, publicação)
// com mídia (imagem por upload ou link, vídeo do YouTube/MP4,
// documento), moderar comentários e fazer backup (export/import).
//
// Tudo é salvo no localStorage deste navegador (sem back-end).
// ============================================================

import { useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Lock, KeyRound, Plus, Pencil, Trash2, Pin, PinOff, Check, X,
  Upload, Download, Image as ImageIcon, Video, FileText, Save,
  LogOut, RotateCcw, Star, MessageSquare, Settings, AlertTriangle,
  Newspaper, FileUp, ShieldCheck,
} from "lucide-react"
import PageLayout, { GlowDivider } from "../components/PageLayout"
import { postTypes, feedColors, formatDate, makeId } from "../data/agroFeed"
import {
  useAgroData, upsertPost, deletePost, togglePinned,
  setCommentApproved, deleteComment,
  isPinSet, setPin, verifyPin,
  resetToSeed, exportData, importData,
} from "../lib/agroStore"

const UNLOCK_KEY = "bhadott_agro_unlocked"

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

const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

const emptyPost = {
  id: null,
  type: "anuncio",
  title: "",
  excerpt: "",
  body: "",
  pinned: false,
  tags: "",
  media: { kind: "none", url: "", label: "" },
  author: "BHADOTT Studio",
  date: null,
}

// Lê um arquivo de imagem como data URL (com limite de tamanho)
function fileToDataUrl(file, maxBytes = 1.5 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    if (file.size > maxBytes) {
      reject(new Error("Imagem muito grande (máx. 1,5 MB). Use um link de imagem para arquivos maiores."))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("Falha ao ler o arquivo."))
    reader.readAsDataURL(file)
  })
}

function download(filename, text) {
  const blob = new Blob([text], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// ============================================================
// Trava de PIN
// ============================================================
function PinGate({ onUnlock }) {
  const creating = !isPinSet()
  const [pin, setPinValue] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (creating) {
      if (pin.length < 4) return setError("Use um PIN de pelo menos 4 dígitos.")
      if (pin !== confirm) return setError("Os PINs não coincidem.")
      setPin(pin)
      onUnlock()
    } else {
      if (verifyPin(pin)) {
        onUnlock()
      } else {
        setError("PIN incorreto.")
        setPinValue("")
      }
    }
  }

  const forgot = () => {
    if (window.confirm("Isso vai apagar o PIN e TODAS as publicações/comentários locais, voltando ao conteúdo inicial. Continuar?")) {
      resetToSeed()
      try { localStorage.removeItem("bhadott_agro_pin_v1") } catch { /* ignore */ }
      window.location.reload()
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/8 p-7"
        style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}
      >
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/25" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))" }}>
            <Lock size={24} className="text-blue-400" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {creating ? "Criar PIN do painel" : "Painel protegido"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {creating
              ? "Defina um PIN para acessar o painel do Agro Solutions neste navegador."
              : "Digite seu PIN para entrar."}
          </p>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pin}
            onChange={(e) => setPinValue(e.target.value)}
            placeholder="PIN"
            style={inputStyle}
          />
          {creating && (
            <input
              type="password"
              inputMode="numeric"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirmar PIN"
              style={inputStyle}
            />
          )}
        </div>

        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
        >
          <KeyRound size={15} aria-hidden="true" />
          {creating ? "Criar e entrar" : "Entrar"}
        </button>

        {!creating && (
          <button type="button" onClick={forgot} className="mt-3 w-full text-center text-xs text-slate-600 hover:text-slate-400">
            Esqueci meu PIN
          </button>
        )}

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-700">
          Trava local apenas — não é segurança de servidor. Os dados ficam neste navegador.
        </p>
      </motion.form>
    </div>
  )
}

// ============================================================
// Editor de publicação
// ============================================================
function PostEditor({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState(() =>
    editing
      ? { ...editing, tags: (editing.tags || []).join(", "), media: { kind: "none", url: "", label: "", ...editing.media } }
      : { ...emptyPost }
  )
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const setMedia = (patch) => setForm((f) => ({ ...f, media: { ...f.media, ...patch } }))

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")
    setUploading(true)
    try {
      const dataUrl = await fileToDataUrl(file)
      setMedia({ url: dataUrl })
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const save = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return setError("O título é obrigatório.")
    if (!form.excerpt.trim()) return setError("O resumo é obrigatório.")
    if (form.media.kind !== "none" && !form.media.url.trim()) {
      return setError("Informe o link ou faça upload da mídia, ou escolha 'Sem mídia'.")
    }

    const post = {
      id: form.id || makeId("post"),
      type: form.type,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim() || form.excerpt.trim(),
      pinned: !!form.pinned,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      media:
        form.media.kind === "none"
          ? { kind: "none", url: "", label: "" }
          : { kind: form.media.kind, url: form.media.url.trim(), label: form.media.label.trim() },
      author: form.author.trim() || "BHADOTT Studio",
      date: form.date || new Date().toISOString(),
    }

    try {
      upsertPost(post)
      onSaved()
    } catch {
      setError("Não foi possível salvar — o armazenamento do navegador pode estar cheio (imagens grandes). Tente usar links de imagem.")
    }
  }

  const mediaKinds = [
    { id: "none", label: "Sem mídia", icon: X },
    { id: "image", label: "Imagem", icon: ImageIcon },
    { id: "video", label: "Vídeo", icon: Video },
    { id: "document", label: "Documento", icon: FileText },
  ]

  return (
    <motion.form
      onSubmit={save}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 rounded-2xl border border-white/8 p-6"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {form.id ? "Editar publicação" : "Nova publicação"}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-500 hover:text-white" aria-label="Cancelar">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {/* tipo */}
      <div>
        <label className={labelClass}>Tipo</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(postTypes).map(([key, meta]) => {
            const c = feedColors[meta.color]
            const sel = form.type === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setForm({ ...form, type: key })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${sel ? `${c.bg} ${c.text} ${c.border}` : "border-white/8 text-slate-500 hover:text-slate-300"}`}
              >
                {meta.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>Título</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex.: Promoção de pré-venda" style={inputStyle} />
      </div>

      <div>
        <label className={labelClass}>Resumo (aparece no card)</label>
        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Uma ou duas frases de chamada." style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label className={labelClass}>Texto completo (opcional)</label>
        <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} placeholder="Conteúdo completo. Use linhas em branco para separar parágrafos." style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {/* mídia */}
      <div>
        <label className={labelClass}>Mídia</label>
        <div className="mb-3 flex flex-wrap gap-2">
          {mediaKinds.map((m) => {
            const Icon = m.icon
            const sel = form.media.kind === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMedia({ kind: m.id })}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${sel ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : "border-white/8 text-slate-500 hover:text-slate-300"}`}
              >
                <Icon size={13} aria-hidden="true" />
                {m.label}
              </button>
            )
          })}
        </div>

        {form.media.kind === "image" && (
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input value={form.media.url.startsWith("data:") ? "" : form.media.url} onChange={(e) => setMedia({ url: e.target.value })} placeholder="Cole o link da imagem (https://...)" style={inputStyle} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-white/8 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-blue-500/30 hover:text-white"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <FileUp size={15} aria-hidden="true" />
                {uploading ? "Lendo..." : "Upload"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </div>
            {form.media.url && (
              <img src={form.media.url} alt="Pré-visualização" className="max-h-40 rounded-xl border border-white/8 object-cover" />
            )}
            <p className="text-[11px] text-slate-600">Upload local: máx. 1,5 MB (salvo no navegador). Para imagens maiores, use um link.</p>
          </div>
        )}

        {form.media.kind === "video" && (
          <div className="space-y-3">
            <input value={form.media.url} onChange={(e) => setMedia({ url: e.target.value })} placeholder="Link do YouTube ou arquivo .mp4" style={inputStyle} />
            <input value={form.media.label} onChange={(e) => setMedia({ label: e.target.value })} placeholder="Legenda do vídeo (opcional)" style={inputStyle} />
          </div>
        )}

        {form.media.kind === "document" && (
          <div className="space-y-3">
            <input value={form.media.url} onChange={(e) => setMedia({ url: e.target.value })} placeholder="Link do documento (PDF, etc.)" style={inputStyle} />
            <input value={form.media.label} onChange={(e) => setMedia({ label: e.target.value })} placeholder="Nome do documento (ex.: Guia de Talhões)" style={inputStyle} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tags (separadas por vírgula)</label>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="promoção, agro" style={inputStyle} />
        </div>
        <div>
          <label className={labelClass}>Autor</label>
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="BHADOTT Studio" style={inputStyle} />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
        <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="h-4 w-4 accent-blue-500" />
        Fixar no topo do feed
      </label>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}>
          <Save size={15} aria-hidden="true" />
          {form.id ? "Salvar alterações" : "Publicar"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/8 px-5 text-sm font-semibold text-slate-400 hover:text-white">
          Cancelar
        </button>
      </div>
    </motion.form>
  )
}

// ============================================================
// Aba: Publicações
// ============================================================
function PostsTab({ posts }) {
  const [editing, setEditing] = useState(null) // null = nenhum, {} = novo, post = editar
  const ordered = useMemo(
    () => [...posts].sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1
      return new Date(b.date) - new Date(a.date)
    }),
    [posts]
  )

  if (editing !== null) {
    return (
      <PostEditor
        editing={editing.id ? editing : null}
        onSaved={() => setEditing(null)}
        onCancel={() => setEditing(null)}
      />
    )
  }

  return (
    <div>
      <button
        onClick={() => setEditing({})}
        className="focus-ring mb-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
      >
        <Plus size={16} aria-hidden="true" />
        Nova publicação
      </button>

      <div className="space-y-3">
        {ordered.map((post) => {
          const meta = postTypes[post.type] || postTypes.publicacao
          const c = feedColors[meta.color]
          return (
            <div key={post.id} className="flex items-center gap-4 rounded-xl border border-white/8 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${c.bg} ${c.text} ${c.border}`}>{meta.label}</span>
                  {post.pinned && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-400"><Pin size={10} aria-hidden="true" /> Fixado</span>}
                  {post.media?.kind !== "none" && <span className="text-[10px] uppercase text-slate-600">{post.media.kind}</span>}
                  <span className="text-[10px] text-slate-600">{formatDate(post.date)}</span>
                </div>
                <p className="truncate text-sm font-semibold text-white">{post.title}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button onClick={() => togglePinned(post.id)} title={post.pinned ? "Desafixar" : "Fixar"} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-yellow-400">
                  {post.pinned ? <PinOff size={15} aria-hidden="true" /> : <Pin size={15} aria-hidden="true" />}
                </button>
                <button onClick={() => setEditing(post)} title="Editar" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-blue-400">
                  <Pencil size={15} aria-hidden="true" />
                </button>
                <button
                  onClick={() => window.confirm(`Excluir "${post.title}"?`) && deletePost(post.id)}
                  title="Excluir"
                  className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-red-400"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
        {ordered.length === 0 && <p className="py-12 text-center text-sm text-slate-600">Nenhuma publicação. Crie a primeira!</p>}
      </div>
    </div>
  )
}

// ============================================================
// Aba: Comentários
// ============================================================
function CommentsTab({ comments }) {
  const pending = comments.filter((c) => !c.approved)
  const approved = comments.filter((c) => c.approved)

  const Row = ({ c }) => (
    <div className="flex items-start gap-4 rounded-xl border border-white/8 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">{c.author}</span>
          {c.role && <span className="text-xs text-slate-500">· {c.role}</span>}
          <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={11} className={n <= c.rating ? "text-yellow-400" : "text-slate-700"} fill={n <= c.rating ? "currentColor" : "none"} aria-hidden="true" />
            ))}
          </span>
          <span className="text-[10px] text-slate-600">{formatDate(c.date)}</span>
        </div>
        <p className="text-sm text-slate-400">{c.text}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-1">
        {c.approved ? (
          <button onClick={() => setCommentApproved(c.id, false)} title="Ocultar" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-yellow-400">
            <X size={15} aria-hidden="true" />
          </button>
        ) : (
          <button onClick={() => setCommentApproved(c.id, true)} title="Aprovar" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-green-400">
            <Check size={15} aria-hidden="true" />
          </button>
        )}
        <button onClick={() => window.confirm("Excluir este comentário?") && deleteComment(c.id)} title="Excluir" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-red-400">
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
          Pendentes
          {pending.length > 0 && <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-[11px] text-yellow-400">{pending.length}</span>}
        </h3>
        <div className="space-y-3">
          {pending.length > 0 ? pending.map((c) => <Row key={c.id} c={c} />) : <p className="text-sm text-slate-600">Nenhum comentário pendente.</p>}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Aprovados ({approved.length})</h3>
        <div className="space-y-3">
          {approved.length > 0 ? approved.map((c) => <Row key={c.id} c={c} />) : <p className="text-sm text-slate-600">Nenhum comentário aprovado ainda.</p>}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Aba: Ajustes
// ============================================================
function SettingsTab() {
  const [np, setNp] = useState("")
  const [nc, setNc] = useState("")
  const [msg, setMsg] = useState("")
  const importRef = useRef(null)

  const changePin = (e) => {
    e.preventDefault()
    if (np.length < 4) return setMsg("Use um PIN de pelo menos 4 dígitos.")
    if (np !== nc) return setMsg("Os PINs não coincidem.")
    setPin(np)
    setNp(""); setNc("")
    setMsg("PIN atualizado com sucesso.")
  }

  const onExport = () => {
    download(`bhadott-agro-backup-${new Date().toISOString().slice(0, 10)}.json`, exportData())
  }

  const onImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      importData(text)
      setMsg("Backup importado com sucesso.")
    } catch (err) {
      setMsg("Falha ao importar: " + err.message)
    } finally {
      if (importRef.current) importRef.current.value = ""
    }
  }

  const onReset = () => {
    if (window.confirm("Restaurar o conteúdo inicial? Isso apaga todas as publicações e comentários locais.")) {
      resetToSeed()
      setMsg("Conteúdo restaurado ao padrão inicial.")
    }
  }

  const card = "rounded-2xl border border-white/8 p-6"
  const cardBg = { background: "rgba(255,255,255,0.02)" }

  return (
    <div className="space-y-6">
      {/* Alterar PIN */}
      <form onSubmit={changePin} className={card} style={cardBg}>
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <KeyRound size={16} className="text-blue-400" aria-hidden="true" /> Alterar PIN
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input type="password" inputMode="numeric" value={np} onChange={(e) => setNp(e.target.value)} placeholder="Novo PIN" style={inputStyle} />
          <input type="password" inputMode="numeric" value={nc} onChange={(e) => setNc(e.target.value)} placeholder="Confirmar novo PIN" style={inputStyle} />
        </div>
        <button type="submit" className="mt-4 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-blue-500/30" style={{ background: "rgba(255,255,255,0.03)" }}>
          Atualizar PIN
        </button>
      </form>

      {/* Backup */}
      <div className={card} style={cardBg}>
        <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Download size={16} className="text-blue-400" aria-hidden="true" /> Backup
        </h3>
        <p className="mb-4 text-xs text-slate-500">
          Como não há back-end, use o backup para salvar seu conteúdo, levar para outro dispositivo ou versionar no Git.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={onExport} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-blue-500/30" style={{ background: "rgba(255,255,255,0.03)" }}>
            <Download size={15} aria-hidden="true" /> Exportar JSON
          </button>
          <button onClick={() => importRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-blue-500/30" style={{ background: "rgba(255,255,255,0.03)" }}>
            <Upload size={15} aria-hidden="true" /> Importar JSON
          </button>
          <input ref={importRef} type="file" accept="application/json,.json" onChange={onImport} className="hidden" />
        </div>
      </div>

      {/* Zona de risco */}
      <div className="rounded-2xl border border-red-500/15 p-6" style={{ background: "rgba(239,68,68,0.03)" }}>
        <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-red-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <AlertTriangle size={16} aria-hidden="true" /> Restaurar padrão
        </h3>
        <p className="mb-4 text-xs text-slate-500">Apaga publicações e comentários locais e volta ao conteúdo inicial de demonstração.</p>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-red-500/25 px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10">
          <RotateCcw size={15} aria-hidden="true" /> Restaurar conteúdo inicial
        </button>
      </div>

      {msg && <p className="text-sm text-blue-300">{msg}</p>}
    </div>
  )
}

// ============================================================
// PAINEL
// ============================================================
export default function AgroStudio() {
  const { posts, comments } = useAgroData()
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(UNLOCK_KEY) === "1" } catch { return false }
  })
  const [tab, setTab] = useState("posts")

  const unlock = () => {
    try { sessionStorage.setItem(UNLOCK_KEY, "1") } catch { /* ignore */ }
    setUnlocked(true)
  }
  const lock = () => {
    try { sessionStorage.removeItem(UNLOCK_KEY) } catch { /* ignore */ }
    setUnlocked(false)
  }

  const pendingCount = comments.filter((c) => !c.approved).length

  const tabs = [
    { id: "posts",    label: "Publicações", icon: Newspaper,     badge: posts.length },
    { id: "comments", label: "Comentários", icon: MessageSquare, badge: pendingCount || null },
    { id: "settings", label: "Ajustes",     icon: Settings,      badge: null },
  ]

  return (
    <PageLayout backLabel="Voltar para Agro Solutions" backTo="/agro">
      <section className="relative pt-28 pb-8 sm:pt-32">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/25" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))" }}>
              <ShieldCheck size={20} className="text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Painel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Agro Solutions</span>
              </h1>
              <p className="text-xs text-slate-500">Gerencie publicações e comentários · salvo neste navegador</p>
            </div>
            {unlocked && (
              <button onClick={lock} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white" title="Bloquear painel">
                <LogOut size={14} aria-hidden="true" /> Bloquear
              </button>
            )}
          </div>
        </div>
      </section>

      <GlowDivider color="blue" />

      <section className="relative py-10 sm:py-12">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {!unlocked ? (
            <PinGate onUnlock={unlock} />
          ) : (
            <>
              {/* Tabs */}
              <div className="mb-8 flex flex-wrap gap-2">
                {tabs.map((t) => {
                  const Icon = t.icon
                  const sel = tab === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                      style={{
                        background: sel ? "linear-gradient(135deg, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${sel ? "transparent" : "rgba(255,255,255,0.08)"}`,
                        color: sel ? "#fff" : "#94a3b8",
                      }}
                    >
                      <Icon size={15} aria-hidden="true" />
                      {t.label}
                      {t.badge ? (
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${sel ? "bg-white/20" : "bg-white/10 text-slate-400"}`}>{t.badge}</span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              {tab === "posts" && <PostsTab posts={posts} />}
              {tab === "comments" && <CommentsTab comments={comments} />}
              {tab === "settings" && <SettingsTab />}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
