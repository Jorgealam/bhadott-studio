// ============================================================
// BHADOTT Agro API — Cloudflare Worker
// workers/agro-api/src/index.js
//
// API REST para o feed público e painel admin do BHADOTT Agro.
// Banco: Cloudflare D1 (bhadott-agro-db)
// Auth:  header X-Admin-Key validado contra env ADMIN_KEY
//
// Endpoints públicos (sem auth):
//   GET  /api/posts            → posts ordenados (fixados primeiro)
//   GET  /api/comments         → comentários aprovados
//   POST /api/comments         → enviar comentário (entra como pendente)
//
// Endpoints protegidos (X-Admin-Key obrigatório):
//   POST   /api/posts          → criar post
//   PUT    /api/posts/:id      → editar post
//   DELETE /api/posts/:id      → excluir post
//   GET    /api/comments/all   → todos os comentários (incl. pendentes)
//   PUT    /api/comments/:id   → aprovar/rejeitar
//   DELETE /api/comments/:id   → excluir
// ============================================================

const ALLOWED_ORIGINS = [
  "https://jorgealam.github.io",
  "https://bhadottstudios.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
]

// ── CORS ────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  })
}

function err(msg, status = 400, origin = "") {
  return json({ error: msg }, status, origin)
}

// ── Auth ────────────────────────────────────────────────────
function isAdmin(req, env) {
  const key = req.headers.get("X-Admin-Key") || ""
  return key.length > 0 && key === env.ADMIN_KEY
}

// ── Row mappers ─────────────────────────────────────────────
function rowToPost(r) {
  let tags = []
  try { tags = JSON.parse(r.tags) } catch { tags = [] }
  return {
    id: r.id,
    type: r.type,
    pinned: !!r.pinned,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    tags,
    media: { kind: r.media_kind, url: r.media_url, label: r.media_label },
    author: r.author,
    date: r.date,
  }
}

function rowToComment(r) {
  return {
    id: r.id,
    author: r.author,
    role: r.role,
    rating: r.rating,
    text: r.text,
    date: r.date,
    approved: !!r.approved,
  }
}

// ── Handlers ─────────────────────────────────────────────────

// GET /api/posts
async function listPosts(env, origin) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM posts ORDER BY pinned DESC, date DESC`
  ).all()
  return json(results.map(rowToPost), 200, origin)
}

// POST /api/posts
async function createPost(req, env, origin) {
  const body = await req.json()
  const { id, type = "publicacao", pinned = false, title, excerpt, body: postBody = "",
          tags = [], media = { kind: "none", url: "", label: "" }, author = "BHADOTT Studio", date } = body

  if (!id || !title || !excerpt) return err("id, title e excerpt são obrigatórios", 400, origin)

  await env.DB.prepare(
    `INSERT OR REPLACE INTO posts
     (id,type,pinned,title,excerpt,body,tags,media_kind,media_url,media_label,author,date)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id, type, pinned ? 1 : 0, title, excerpt, postBody,
    JSON.stringify(tags),
    media.kind || "none", media.url || "", media.label || "",
    author, date || new Date().toISOString()
  ).run()

  return json({ ok: true, id }, 201, origin)
}

// PUT /api/posts/:id
async function updatePost(id, req, env, origin) {
  const body = await req.json()
  const { type, pinned, title, excerpt, body: postBody, tags, media, author, date } = body

  const { results } = await env.DB.prepare(`SELECT * FROM posts WHERE id=?`).bind(id).all()
  if (!results.length) return err("Post não encontrado", 404, origin)
  const cur = results[0]

  await env.DB.prepare(
    `UPDATE posts SET type=?,pinned=?,title=?,excerpt=?,body=?,tags=?,
     media_kind=?,media_url=?,media_label=?,author=?,date=? WHERE id=?`
  ).bind(
    type ?? cur.type,
    pinned !== undefined ? (pinned ? 1 : 0) : cur.pinned,
    title ?? cur.title,
    excerpt ?? cur.excerpt,
    postBody ?? cur.body,
    JSON.stringify(tags ?? JSON.parse(cur.tags || "[]")),
    (media?.kind) ?? cur.media_kind,
    (media?.url) ?? cur.media_url,
    (media?.label) ?? cur.media_label,
    author ?? cur.author,
    date ?? cur.date,
    id
  ).run()

  return json({ ok: true }, 200, origin)
}

// DELETE /api/posts/:id
async function deletePost(id, env, origin) {
  await env.DB.prepare(`DELETE FROM posts WHERE id=?`).bind(id).run()
  return json({ ok: true }, 200, origin)
}

// GET /api/comments
async function listComments(env, origin) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM comments WHERE approved=1 ORDER BY date DESC`
  ).all()
  return json(results.map(rowToComment), 200, origin)
}

// GET /api/comments/all  (admin)
async function listAllComments(env, origin) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM comments ORDER BY date DESC`
  ).all()
  return json(results.map(rowToComment), 200, origin)
}

// POST /api/comments
async function createComment(req, env, origin) {
  const { id, author, role = "", rating = 5, text, date } = await req.json()
  if (!id || !author || !text) return err("id, author e text são obrigatórios", 400, origin)

  await env.DB.prepare(
    `INSERT INTO comments (id,author,role,rating,text,date,approved) VALUES (?,?,?,?,?,?,0)`
  ).bind(id, author, role, rating, text, date || new Date().toISOString()).run()

  return json({ ok: true, id }, 201, origin)
}

// PUT /api/comments/:id  { approved: true|false }
async function updateComment(id, req, env, origin) {
  const body = await req.json()
  const { approved } = body

  if (approved !== undefined) {
    await env.DB.prepare(`UPDATE comments SET approved=? WHERE id=?`)
      .bind(approved ? 1 : 0, id).run()
  }

  return json({ ok: true }, 200, origin)
}

// DELETE /api/comments/:id
async function deleteComment(id, env, origin) {
  await env.DB.prepare(`DELETE FROM comments WHERE id=?`).bind(id).run()
  return json({ ok: true }, 200, origin)
}

// ── Router ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // Preflight
    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    // ── Posts ─────────────────────────────────────────────
    if (path === "/api/posts") {
      if (method === "GET")  return listPosts(env, origin)
      if (method === "POST") {
        if (!isAdmin(request, env)) return err("Não autorizado", 401, origin)
        return createPost(request, env, origin)
      }
    }

    const postMatch = path.match(/^\/api\/posts\/(.+)$/)
    if (postMatch) {
      const id = decodeURIComponent(postMatch[1])
      if (!isAdmin(request, env)) return err("Não autorizado", 401, origin)
      if (method === "PUT")    return updatePost(id, request, env, origin)
      if (method === "DELETE") return deletePost(id, env, origin)
    }

    // ── Comments ──────────────────────────────────────────
    if (path === "/api/comments") {
      if (method === "GET")  return listComments(env, origin)
      if (method === "POST") return createComment(request, env, origin)
    }

    if (path === "/api/comments/all") {
      if (!isAdmin(request, env)) return err("Não autorizado", 401, origin)
      if (method === "GET") return listAllComments(env, origin)
    }

    const commentMatch = path.match(/^\/api\/comments\/(.+)$/)
    if (commentMatch) {
      const id = decodeURIComponent(commentMatch[1])
      if (!isAdmin(request, env)) return err("Não autorizado", 401, origin)
      if (method === "PUT")    return updateComment(id, request, env, origin)
      if (method === "DELETE") return deleteComment(id, env, origin)
    }

    // ── Health ────────────────────────────────────────────
    if (path === "/api/health") {
      return json({ ok: true, service: "bhadott-agro-api", ts: new Date().toISOString() }, 200, origin)
    }

    return err("Rota não encontrada", 404, origin)
  },
}
