// ============================================================
// BHADOTT Agro — API client
// src/lib/agroApi.js
//
// Faz a ponte entre o frontend React e o Cloudflare Worker.
// Quando VITE_AGRO_API_URL não está definido (dev/build local),
// a página ainda carrega os dados de seed do agroFeed.js.
//
// Após deploy do Worker, adicione no GitHub Pages (Settings →
// Secrets → Actions) a variável VITE_AGRO_API_URL com a URL
// do worker (ex.: https://bhadott-agro-api.<sub>.workers.dev).
// ============================================================

export const API_BASE = (import.meta.env.VITE_AGRO_API_URL || "").replace(/\/$/, "")

let _adminKey = ""
try { _adminKey = sessionStorage.getItem("bhadott_agro_api_key") || "" } catch { /* ignore */ }

export function getAdminKey() { return _adminKey }

export function setAdminKey(key) {
  _adminKey = key
  try { sessionStorage.setItem("bhadott_agro_api_key", key) } catch { /* ignore */ }
}

export function clearAdminKey() {
  _adminKey = ""
  try { sessionStorage.removeItem("bhadott_agro_api_key") } catch { /* ignore */ }
}

export function isApiConfigured() { return !!API_BASE }

// ── Fetch helper ─────────────────────────────────────────────
async function apiFetch(path, options = {}, adminKey = false) {
  if (!API_BASE) throw new Error("API não configurada")
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) }
  if (adminKey) headers["X-Admin-Key"] = _adminKey
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

// ── Posts ─────────────────────────────────────────────────────
export async function fetchPosts()             { return apiFetch("/api/posts") }
export async function apiCreatePost(post)      { return apiFetch("/api/posts", { method: "POST", body: JSON.stringify(post) }, true) }
export async function apiUpdatePost(id, patch) { return apiFetch(`/api/posts/${encodeURIComponent(id)}`, { method: "PUT",  body: JSON.stringify(patch) }, true) }
export async function apiDeletePost(id)        { return apiFetch(`/api/posts/${encodeURIComponent(id)}`, { method: "DELETE" }, true) }
export async function apiTogglePinned(id, pinned) { return apiFetch(`/api/posts/${encodeURIComponent(id)}`, { method: "PUT",  body: JSON.stringify({ pinned }) }, true) }

// ── Comments ─────────────────────────────────────────────────
export async function fetchComments()          { return apiFetch("/api/comments") }
export async function fetchAllComments()       { return apiFetch("/api/comments/all", {}, true) }
export async function apiSubmitComment(c)      { return apiFetch("/api/comments", { method: "POST", body: JSON.stringify(c) }) }
export async function apiSetApproved(id, approved) { return apiFetch(`/api/comments/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify({ approved }) }, true) }
export async function apiDeleteComment(id)     { return apiFetch(`/api/comments/${encodeURIComponent(id)}`, { method: "DELETE" }, true) }

// ── Verify admin key against the real API ────────────────────
export async function verifyAdminKey(key) {
  if (!API_BASE) return false
  try {
    const saved = _adminKey
    _adminKey = key
    await apiFetch("/api/comments/all", {}, true)
    _adminKey = saved
    return true
  } catch {
    return false
  }
}
