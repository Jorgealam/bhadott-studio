// ============================================================
// BHADOTT Studio — Agro Store (localStorage)
// src/lib/agroStore.js
//
// Camada de persistência do BHADOTT Agro Solutions.
// Tudo é salvo no navegador do usuário (localStorage) — não há
// back-end. Funciona como um "painel pessoal": o que você publica
// no painel aparece na página pública NESTE navegador.
//
// Limitações conhecidas (sem back-end):
//  • Não sincroniza entre dispositivos / não aparece para visitantes.
//  • Use Exportar/Importar JSON para backup ou migração.
//  • O PIN é apenas uma trava local (ofuscado em base64), não é
//    segurança de servidor.
// ============================================================

import { useSyncExternalStore } from "react"
import { seedPosts, seedComments } from "../data/agroFeed"

const POSTS_KEY    = "bhadott_agro_posts_v1"
const COMMENTS_KEY = "bhadott_agro_comments_v1"
const PIN_KEY      = "bhadott_agro_pin_v1"

const listeners = new Set()
let cache = null

// ── leitura/escrita seguras ──────────────────────────────────
function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    // Quota excedida (ex.: imagem base64 muito grande)
    console.error("[agroStore] Falha ao salvar — armazenamento cheio?", err)
    throw err
  }
  emit()
}

// ── snapshot cacheado (referência estável p/ useSyncExternalStore) ──
function recompute() {
  cache = {
    posts:    read(POSTS_KEY)    ?? seedPosts,
    comments: read(COMMENTS_KEY) ?? seedComments,
  }
}

function getSnapshot() {
  if (!cache) recompute()
  return cache
}

function emit() {
  recompute()
  listeners.forEach((l) => l())
}

// Sincroniza entre abas do mesmo navegador
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === POSTS_KEY || e.key === COMMENTS_KEY) emit()
  })
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// ── Hook React ───────────────────────────────────────────────
export function useAgroData() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

// ============================================================
// Publicações
// ============================================================
export function getPosts() {
  return getSnapshot().posts
}

export function savePosts(posts) {
  write(POSTS_KEY, posts)
}

// Cria (se id novo) ou atualiza (se id existente)
export function upsertPost(post) {
  const posts = getSnapshot().posts
  const exists = posts.some((p) => p.id === post.id)
  const next = exists
    ? posts.map((p) => (p.id === post.id ? post : p))
    : [post, ...posts]
  savePosts(next)
}

export function deletePost(id) {
  savePosts(getSnapshot().posts.filter((p) => p.id !== id))
}

export function togglePinned(id) {
  savePosts(getSnapshot().posts.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p)))
}

// ============================================================
// Comentários
// ============================================================
export function getComments() {
  return getSnapshot().comments
}

export function saveComments(comments) {
  write(COMMENTS_KEY, comments)
}

// Comentário de visitante entra como pendente (approved: false)
export function addComment(comment) {
  saveComments([{ ...comment, approved: false }, ...getSnapshot().comments])
}

export function setCommentApproved(id, approved) {
  saveComments(getSnapshot().comments.map((c) => (c.id === id ? { ...c, approved } : c)))
}

export function deleteComment(id) {
  saveComments(getSnapshot().comments.filter((c) => c.id !== id))
}

// ============================================================
// Reset / Export / Import
// ============================================================
export function resetToSeed() {
  try {
    localStorage.removeItem(POSTS_KEY)
    localStorage.removeItem(COMMENTS_KEY)
  } catch {
    /* ignore */
  }
  emit()
}

export function exportData() {
  const { posts, comments } = getSnapshot()
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), posts, comments }, null, 2)
}

// Importa de uma string JSON. Lança erro se inválido.
export function importData(json) {
  const data = JSON.parse(json)
  if (!data || (!Array.isArray(data.posts) && !Array.isArray(data.comments))) {
    throw new Error("Arquivo inválido: esperado { posts: [], comments: [] }.")
  }
  if (Array.isArray(data.posts))    write(POSTS_KEY, data.posts)
  if (Array.isArray(data.comments)) write(COMMENTS_KEY, data.comments)
}

// ============================================================
// PIN (trava local — NÃO é segurança de servidor)
// ============================================================
function encode(pin) {
  try {
    return btoa(unescape(encodeURIComponent(String(pin))))
  } catch {
    return String(pin)
  }
}

export function isPinSet() {
  try {
    return !!localStorage.getItem(PIN_KEY)
  } catch {
    return false
  }
}

export function setPin(pin) {
  try {
    localStorage.setItem(PIN_KEY, encode(pin))
  } catch {
    /* ignore */
  }
}

export function verifyPin(pin) {
  try {
    return localStorage.getItem(PIN_KEY) === encode(pin)
  } catch {
    return false
  }
}
