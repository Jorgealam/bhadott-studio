// ============================================================
// BHADOTT Studio — Painel do BHADOTT Agro Solutions
// src/pages/AgroStudio.jsx  (rota /studio)
//
// Painel admin conectado ao Cloudflare Worker.
// Auth: chave admin enviada como X-Admin-Key e validada no Worker.
// Quando VITE_AGRO_API_URL não está configurado, mostra aviso.
// ============================================================

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  KeyRound, Plus, Pencil, Trash2, Pin, PinOff, Check, X,
  Upload, Image as ImageIcon, Video, FileText, Save,
  LogOut, RotateCcw, Star, MessageSquare, Settings,
  AlertTriangle, Newspaper, FileUp, ShieldCheck,
  Loader2, Wifi, WifiOff, RefreshCw,
} from "lucide-react"
import PageLayout, { GlowDivider } from "../components/PageLayout"
import { postTypes, feedColors, formatDate, makeId } from "../data/agroFeed"
import {
  fetchPosts, fetchComments, fetchAllComments,
  apiCreatePost, apiUpdatePost, apiDeletePost, apiTogglePinned,
  apiSetApproved, apiDeleteComment,
  verifyAdminKey, setAdminKey, getAdminKey, clearAdminKey,
  isApiConfigured,
} from "../lib/agroApi"

// ── Estilos compartilhados ───────────────────────────────────
const iStyle = {
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#e2e8f0", borderRadius: "12px", padding: "12px 16px",
  fontSize: "14px", width: "100%", outline: "none",
}
const lbl = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5"

// Lê imagem como data URL (máx 1,5 MB)
function fileToDataUrl(file, max = 1.5 * 1024 * 1024) {
  return new Promise((res, rej) => {
    if (file.size > max) { rej(new Error("Imagem muito grande (máx. 1,5 MB). Use um link.")); return }
    const r = new FileReader()
    r.onload  = () => res(r.result)
    r.onerror = () => rej(new Error("Falha ao ler arquivo."))
    r.readAsDataURL(file)
  })
}

const emptyPost = { id: null, type: "anuncio", title: "", excerpt: "", body: "", pinned: false,
  tags: "", media: { kind: "none", url: "", label: "" }, author: "BHADOTT Studio", date: null }

// ============================================================
// Tela de login (API Key)
// ============================================================
function ApiKeyGate({ onUnlock }) {
  const [key,  setKey]  = useState("")
  const [busy, setBusy] = useState(false)
  const [err,  setErr]  = useState("")

  if (!isApiConfigured()) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-yellow-500/20 p-7 text-center"
          style={{ background: "rgba(234,179,8,0.04)" }}>
          <AlertTriangle size={32} className="mx-auto mb-4 text-yellow-400" aria-hidden="true" />
          <h2 className="mb-2 text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            API não configurada
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Para usar o painel com dados reais, faça o deploy do Worker e defina
            <code className="mx-1 rounded bg-white/5 px-1 py-0.5 text-yellow-300 text-xs">VITE_AGRO_API_URL</code>
            no seu ambiente de build.
          </p>
          <p className="mt-4 text-xs text-slate-600">
            Consulte <code className="text-slate-400">workers/agro-api/</code> para instruções de deploy.
          </p>
        </div>
      </div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!key.trim()) { setErr("Digite a chave admin."); return }
    setBusy(true); setErr("")
    try {
      const ok = await verifyAdminKey(key.trim())
      if (ok) { setAdminKey(key.trim()); onUnlock() }
      else setErr("Chave incorreta ou API indisponível.")
    } catch {
      setErr("Não foi possível conectar à API.")
    } finally { setBusy(false) }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/8 p-7"
        style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}>
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/25"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))" }}>
            <KeyRound size={24} className="text-blue-400" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Painel protegido
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Digite a chave admin do Cloudflare Worker.
          </p>
        </div>

        <input type="password" autoFocus value={key} onChange={(e) => setKey(e.target.value)}
          placeholder="Chave admin" style={iStyle} />

        {err && <p className="mt-3 text-xs text-red-400">{err}</p>}

        <button type="submit" disabled={busy}
          className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}>
          {busy
            ? <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            : <KeyRound size={15} aria-hidden="true" />}
          {busy ? "Verificando..." : "Entrar"}
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-700">
          A chave é validada pelo Cloudflare Worker — não fica salva no código.
          Defina-a com: <code className="text-slate-500">wrangler secret put ADMIN_KEY</code>
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
  const [err,      setErr]      = useState("")
  const [busy,     setBusy]     = useState(false)
  const [uploading,setUploading]= useState(false)
  const fileRef = useRef(null)

  const setMedia = (patch) => setForm(f => ({ ...f, media: { ...f.media, ...patch } }))

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return
    setErr(""); setUploading(true)
    try { const url = await fileToDataUrl(file); setMedia({ url }) }
    catch (e) { setErr(e.message) }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = "" }
  }

  const save = async (e) => {
    e.preventDefault()
    if (!form.title.trim())  { setErr("Título é obrigatório."); return }
    if (!form.excerpt.trim()){ setErr("Resumo é obrigatório."); return }
    if (form.media.kind !== "none" && !form.media.url.trim()) { setErr("Informe o link da mídia ou escolha 'Sem mídia'."); return }

    const post = {
      id: form.id || makeId("post"),
      type: form.type, title: form.title.trim(), excerpt: form.excerpt.trim(),
      body: form.body.trim() || form.excerpt.trim(), pinned: !!form.pinned,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      media: form.media.kind === "none"
        ? { kind: "none", url: "", label: "" }
        : { kind: form.media.kind, url: form.media.url.trim(), label: form.media.label.trim() },
      author: form.author.trim() || "BHADOTT Studio",
      date: form.date || new Date().toISOString(),
    }

    setBusy(true); setErr("")
    try {
      if (form.id) await apiUpdatePost(form.id, post)
      else         await apiCreatePost(post)
      onSaved()
    } catch (e) { setErr(e.message || "Falha ao salvar. Tente novamente.") }
    finally { setBusy(false) }
  }

  const mediaKinds = [
    { id: "none", label: "Sem mídia", icon: X },
    { id: "image", label: "Imagem", icon: ImageIcon },
    { id: "video", label: "Vídeo", icon: Video },
    { id: "document", label: "Documento", icon: FileText },
  ]

  return (
    <motion.form onSubmit={save} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-5 rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.025)" }}>
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
        <label className={lbl}>Tipo</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(postTypes).map(([key, meta]) => {
            const c = feedColors[meta.color]; const sel = form.type === key
            return (
              <button key={key} type="button" onClick={() => setForm({ ...form, type: key })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  sel ? `${c.bg} ${c.text} ${c.border}` : "border-white/8 text-slate-500 hover:text-slate-300"}`}>
                {meta.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={lbl}>Título</label>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex.: Promoção de pré-venda" style={iStyle} />
      </div>
      <div>
        <label className={lbl}>Resumo (aparece no card)</label>
        <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
          placeholder="Uma ou duas frases de chamada." style={{ ...iStyle, resize: "vertical" }} />
      </div>
      <div>
        <label className={lbl}>Texto completo (opcional)</label>
        <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={5}
          placeholder="Conteúdo completo. Use linhas em branco para parágrafos." style={{ ...iStyle, resize: "vertical" }} />
      </div>

      {/* mídia */}
      <div>
        <label className={lbl}>Mídia</label>
        <div className="mb-3 flex flex-wrap gap-2">
          {mediaKinds.map(m => {
            const Icon = m.icon; const sel = form.media.kind === m.id
            return (
              <button key={m.id} type="button" onClick={() => setMedia({ kind: m.id })}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                  sel ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : "border-white/8 text-slate-500 hover:text-slate-300"}`}>
                <Icon size={13} aria-hidden="true" />{m.label}
              </button>
            )
          })}
        </div>

        {form.media.kind === "image" && (
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input value={form.media.url.startsWith("data:") ? "" : form.media.url}
                onChange={e => setMedia({ url: e.target.value })}
                placeholder="Cole link da imagem (https://...)" style={iStyle} />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-white/8 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-blue-500/30"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <FileUp size={15} aria-hidden="true" />
                {uploading ? "Lendo..." : "Upload"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </div>
            {form.media.url && (
              <img src={form.media.url} alt="Pré-visualização" className="max-h-40 rounded-xl border border-white/8 object-cover" />
            )}
            <p className="text-[11px] text-slate-600">Upload: máx. 1,5 MB (salvo na API). Para imagens maiores, use um link.</p>
          </div>
        )}
        {form.media.kind === "video" && (
          <div className="space-y-3">
            <input value={form.media.url} onChange={e => setMedia({ url: e.target.value })} placeholder="Link do YouTube ou .mp4" style={iStyle} />
            <input value={form.media.label} onChange={e => setMedia({ label: e.target.value })} placeholder="Legenda do vídeo (opcional)" style={iStyle} />
          </div>
        )}
        {form.media.kind === "document" && (
          <div className="space-y-3">
            <input value={form.media.url} onChange={e => setMedia({ url: e.target.value })} placeholder="Link do documento (PDF, etc.)" style={iStyle} />
            <input value={form.media.label} onChange={e => setMedia({ label: e.target.value })} placeholder="Nome do documento" style={iStyle} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Tags (separadas por vírgula)</label>
          <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="promoção, agro" style={iStyle} />
        </div>
        <div>
          <label className={lbl}>Autor</label>
          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="BHADOTT Studio" style={iStyle} />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
        <input type="checkbox" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} className="h-4 w-4 accent-blue-500" />
        Fixar no topo do feed
      </label>

      {err && <p className="text-xs text-red-400">{err}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy}
          className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}>
          {busy ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Save size={15} aria-hidden="true" />}
          {busy ? "Salvando..." : form.id ? "Salvar alterações" : "Publicar"}
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
function PostsTab() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [err,     setErr]     = useState("")

  const load = useCallback(async () => {
    setLoading(true); setErr("")
    try { const p = await fetchPosts(); setPosts(p) }
    catch (e) { setErr(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (post) => {
    if (!window.confirm(`Excluir "${post.title}"?`)) return
    try { await apiDeletePost(post.id); load() } catch (e) { setErr(e.message) }
  }

  const handlePin = async (post) => {
    try { await apiTogglePinned(post.id, !post.pinned); load() } catch (e) { setErr(e.message) }
  }

  if (editing !== null) {
    return (
      <PostEditor editing={editing.id ? editing : null}
        onSaved={() => { setEditing(null); load() }}
        onCancel={() => setEditing(null)} />
    )
  }

  const ordered = [...posts].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button onClick={() => setEditing({})}
          className="focus-ring inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}>
          <Plus size={16} aria-hidden="true" /> Nova publicação
        </button>
        <button onClick={load} title="Atualizar" className="p-2.5 rounded-lg border border-white/8 text-slate-500 hover:text-white">
          <RefreshCw size={15} aria-hidden="true" />
        </button>
      </div>

      {err && <p className="mb-4 text-sm text-red-400">{err}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-blue-400" aria-hidden="true" />
        </div>
      ) : (
        <div className="space-y-3">
          {ordered.map(post => {
            const meta = postTypes[post.type] || postTypes.publicacao
            const c = feedColors[meta.color]
            return (
              <div key={post.id} className="flex items-center gap-4 rounded-xl border border-white/8 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${c.bg} ${c.text} ${c.border}`}>{meta.label}</span>
                    {post.pinned && <span className="text-[10px] font-semibold text-yellow-400 inline-flex items-center gap-1"><Pin size={10} aria-hidden="true" /> Fixado</span>}
                    {post.media?.kind !== "none" && <span className="text-[10px] uppercase text-slate-600">{post.media.kind}</span>}
                    <span className="text-[10px] text-slate-600">{formatDate(post.date)}</span>
                  </div>
                  <p className="truncate text-sm font-semibold text-white">{post.title}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button onClick={() => handlePin(post)} title={post.pinned ? "Desafixar" : "Fixar"}
                    className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-yellow-400">
                    {post.pinned ? <PinOff size={15} aria-hidden="true" /> : <Pin size={15} aria-hidden="true" />}
                  </button>
                  <button onClick={() => setEditing(post)} title="Editar"
                    className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-blue-400">
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button onClick={() => handleDelete(post)} title="Excluir"
                    className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-red-400">
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )
          })}
          {ordered.length === 0 && <p className="py-12 text-center text-sm text-slate-600">Nenhuma publicação. Crie a primeira!</p>}
        </div>
      )}
    </div>
  )
}

// ============================================================
// Aba: Comentários
// ============================================================
function CommentsTab() {
  const [comments, setComments] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [err,      setErr]      = useState("")

  const load = useCallback(async () => {
    setLoading(true); setErr("")
    try { setComments(await fetchAllComments()) }
    catch (e) { setErr(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const approve = async (id, approved) => {
    try { await apiSetApproved(id, approved); load() } catch (e) { setErr(e.message) }
  }

  const del = async (id) => {
    if (!window.confirm("Excluir este comentário?")) return
    try { await apiDeleteComment(id); load() } catch (e) { setErr(e.message) }
  }

  const pending  = comments.filter(c => !c.approved)
  const approved = comments.filter(c =>  c.approved)

  const Row = ({ c }) => (
    <div className="flex items-start gap-4 rounded-xl border border-white/8 p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">{c.author}</span>
          {c.role && <span className="text-xs text-slate-500">· {c.role}</span>}
          <span className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(n => <Star key={n} size={11} className={n <= c.rating ? "text-yellow-400" : "text-slate-700"} fill={n <= c.rating ? "currentColor" : "none"} aria-hidden="true" />)}
          </span>
          <span className="text-[10px] text-slate-600">{formatDate(c.date)}</span>
        </div>
        <p className="text-sm text-slate-400">{c.text}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-1">
        {c.approved
          ? <button onClick={() => approve(c.id, false)} title="Ocultar" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-yellow-400"><X size={15} aria-hidden="true" /></button>
          : <button onClick={() => approve(c.id, true)}  title="Aprovar" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-green-400"><Check size={15} aria-hidden="true" /></button>
        }
        <button onClick={() => del(c.id)} title="Excluir" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-red-400">
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Comentários {loading ? "" : `(${comments.length})`}
        </h3>
        <button onClick={load} title="Atualizar" className="p-2.5 rounded-lg border border-white/8 text-slate-500 hover:text-white">
          <RefreshCw size={15} aria-hidden="true" />
        </button>
      </div>
      {err && <p className="mb-4 text-sm text-red-400">{err}</p>}
      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-blue-400" aria-hidden="true" /></div>
      ) : (
        <div className="space-y-8">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
              Pendentes {pending.length > 0 && <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-[11px] text-yellow-400">{pending.length}</span>}
            </h4>
            <div className="space-y-3">
              {pending.length > 0 ? pending.map(c => <Row key={c.id} c={c} />) : <p className="text-sm text-slate-600">Nenhum comentário pendente.</p>}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Aprovados ({approved.length})</h4>
            <div className="space-y-3">
              {approved.length > 0 ? approved.map(c => <Row key={c.id} c={c} />) : <p className="text-sm text-slate-600">Nenhum ainda.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Aba: Ajustes
// ============================================================
function SettingsTab({ onLogout }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <h3 className="mb-2 text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Como alterar a chave admin
        </h3>
        <p className="mb-3 text-sm text-slate-400">
          A chave admin é um segredo do Cloudflare Worker — não pode ser alterada pelo browser.
          Para trocar, rode no terminal (dentro de <code className="rounded bg-white/5 px-1 text-xs text-slate-300">workers/agro-api/</code>):
        </p>
        <pre className="rounded-xl border border-white/8 bg-black/30 p-4 text-xs text-slate-300 overflow-x-auto">
{`cd workers/agro-api
npx wrangler secret put ADMIN_KEY`}
        </pre>
      </div>

      <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <h3 className="mb-2 text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Sessão
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          A chave fica na sessionStorage (apagada ao fechar a aba).
          Clique em "Bloquear" no topo para sair manualmente.
        </p>
        <button onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-red-500/30 hover:text-red-300">
          <LogOut size={15} aria-hidden="true" /> Sair do painel agora
        </button>
      </div>

      <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <h3 className="mb-2 text-base font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <AlertTriangle size={16} className="text-yellow-400" aria-hidden="true" /> Banco de dados
        </h3>
        <p className="text-sm text-slate-400">
          Dados armazenados no Cloudflare D1 (<code className="rounded bg-white/5 px-1 text-xs text-slate-300">bhadott-agro-db</code>).
          Para fazer backup, use o painel da Cloudflare → D1 → Export, ou a CLI:<br />
        </p>
        <pre className="mt-3 rounded-xl border border-white/8 bg-black/30 p-4 text-xs text-slate-300 overflow-x-auto">
{`cd workers/agro-api
npx wrangler d1 export bhadott-agro-db --output=backup.sql`}
        </pre>
      </div>
    </div>
  )
}

// ============================================================
// PAINEL
// ============================================================
export default function AgroStudio() {
  const [unlocked, setUnlocked] = useState(() => !!getAdminKey())
  const [tab, setTab] = useState("posts")

  const unlock  = () => setUnlocked(true)
  const logout  = () => { clearAdminKey(); setUnlocked(false) }

  const tabs = [
    { id: "posts",    label: "Publicações", icon: Newspaper     },
    { id: "comments", label: "Comentários", icon: MessageSquare },
    { id: "settings", label: "Ajustes",     icon: Settings      },
  ]

  return (
    <PageLayout backLabel="Voltar para Agro Solutions" backTo="/agro">
      <section className="relative pt-28 pb-8 sm:pt-32">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/25"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))" }}>
              <ShieldCheck size={20} className="text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Painel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Agro Solutions</span>
              </h1>
              <p className="text-xs text-slate-500">
                {isApiConfigured()
                  ? <span className="inline-flex items-center gap-1"><Wifi size={11} aria-hidden="true" className="text-green-400" /> Conectado ao Cloudflare D1</span>
                  : <span className="inline-flex items-center gap-1 text-yellow-500"><WifiOff size={11} aria-hidden="true" /> API não configurada</span>
                }
              </p>
            </div>
            {unlocked && (
              <button onClick={logout}
                className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white" title="Bloquear">
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
            <ApiKeyGate onUnlock={unlock} />
          ) : (
            <>
              <div className="mb-8 flex flex-wrap gap-2">
                {tabs.map(t => {
                  const Icon = t.icon; const sel = tab === t.id
                  return (
                    <button key={t.id} onClick={() => setTab(t.id)}
                      className="focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                      style={{
                        background: sel ? "linear-gradient(135deg, #3b82f6, #7c3aed)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${sel ? "transparent" : "rgba(255,255,255,0.08)"}`,
                        color: sel ? "#fff" : "#94a3b8",
                      }}>
                      <Icon size={15} aria-hidden="true" />{t.label}
                    </button>
                  )
                })}
              </div>

              {tab === "posts"    && <PostsTab />}
              {tab === "comments" && <CommentsTab />}
              {tab === "settings" && <SettingsTab onLogout={logout} />}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
