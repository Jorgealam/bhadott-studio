// ============================================================
// BHADOTT Studio — BHADOTT Agro Solutions
// src/data/agroFeed.js
// Conteúdo "pronto" (seed) + helpers do feed.
// O conteúdo editável fica no localStorage (ver src/lib/agroStore.js);
// estes dados são apenas o estado inicial / fallback.
// ============================================================

// ── Tipos de publicação ──────────────────────────────────────
// Cada publicação tem um "type" que define cor, rótulo e ícone.
export const postTypes = {
  anuncio: {
    label: "Anúncio",
    color: "blue",
    icon: "Megaphone",
  },
  atualizacao: {
    label: "Atualização",
    color: "violet",
    icon: "RefreshCw",
  },
  lancamento: {
    label: "Lançamento",
    color: "yellow",
    icon: "Rocket",
  },
  publicacao: {
    label: "Publicação",
    color: "green",
    icon: "Newspaper",
  },
}

// Mapa de cores (mesma convenção de statusColors do projeto)
export const feedColors = {
  blue:   { bg: "bg-blue-500/12",   text: "text-blue-400",   border: "border-blue-500/25",   hex: "#3b82f6" },
  violet: { bg: "bg-violet-500/12", text: "text-violet-400", border: "border-violet-500/25", hex: "#8b5cf6" },
  yellow: { bg: "bg-yellow-500/12", text: "text-yellow-400", border: "border-yellow-500/25", hex: "#eab308" },
  green:  { bg: "bg-green-500/12",  text: "text-green-400",  border: "border-green-500/25",  hex: "#22c55e" },
  gray:   { bg: "bg-slate-500/12",  text: "text-slate-400",  border: "border-slate-500/25",  hex: "#64748b" },
}

// Tipos de mídia suportados em uma publicação
// kind: "none" | "image" | "video" | "document"
//  - image:    url de imagem (http) OU data URL (upload local)
//  - video:    link do YouTube (watch/shorts/youtu.be) OU .mp4 direto
//  - document: link para PDF/arquivo externo (abre em nova aba)

// ============================================================
// SEED — Anúncios prontos do BHADOTT Agro Solutions
// ============================================================
export const seedPosts = [
  {
    id: "agro-seed-1",
    type: "lancamento",
    pinned: true,
    title: "BHADOTT Agro Solutions chegou ao campo",
    excerpt:
      "Apresentamos oficialmente a plataforma de gestão agropecuária do BHADOTT Studio — feita para o produtor brasileiro.",
    body:
      "É com muito orgulho que anunciamos o lançamento do BHADOTT Agro Solutions: uma plataforma completa para gestão da sua propriedade rural — do rebanho ao financeiro, do talhão ao relatório.\n\nNosso objetivo é simples: digitalizar o campo com uma ferramenta acessível, que funciona até onde a internet não chega (modo offline-first) e que cabe no bolso do pequeno e médio produtor.\n\nNas próximas semanas vamos publicar aqui todas as novidades, atualizações e bastidores do desenvolvimento. Acompanhe.",
    media: { kind: "image", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=70", label: "" },
    tags: ["lançamento", "agro", "plataforma"],
    author: "BHADOTT Studio",
    date: "2026-06-15T09:00:00.000Z",
  },
  {
    id: "agro-seed-2",
    type: "anuncio",
    pinned: false,
    title: "Promoção de pré-venda: 3 meses grátis",
    excerpt:
      "Os primeiros 100 produtores cadastrados ganham 3 meses de acesso completo sem custo. Vagas limitadas.",
    body:
      "Para celebrar o lançamento, abrimos uma condição especial de pré-venda:\n\n• 3 meses de acesso completo, gratuito\n• Suporte prioritário via WhatsApp\n• Participação no grupo de testadores que ajuda a decidir os próximos recursos\n\nSão apenas 100 vagas. Fale com a gente para garantir a sua.",
    media: { kind: "none", url: "", label: "" },
    tags: ["promoção", "pré-venda"],
    author: "BHADOTT Studio",
    date: "2026-06-14T13:30:00.000Z",
  },
  {
    id: "agro-seed-3",
    type: "atualizacao",
    pinned: false,
    title: "Atualização 1.2 — Controle de rebanho e saúde animal",
    excerpt:
      "Novo módulo de rebanho: cadastro individual, histórico de vacinação, pesagem e alertas de manejo.",
    body:
      "A versão 1.2 traz o módulo de rebanho que vocês tanto pediram:\n\n• Cadastro individual de animais com brinco/identificação\n• Histórico de vacinas e medicamentos\n• Registro de pesagem com evolução em gráfico\n• Alertas automáticos de manejo (vacina, vermífugo, cobertura)\n\nTudo funciona offline e sincroniza quando você volta a ter sinal.",
    // Vídeo placeholder (royalty-free) — troque pelo seu vídeo no painel /studio
    media: { kind: "video", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", label: "Demonstração do módulo de rebanho" },
    tags: ["atualização", "rebanho", "v1.2"],
    author: "Equipe BHADOTT Agro",
    date: "2026-06-12T17:45:00.000Z",
  },
  {
    id: "agro-seed-4",
    type: "publicacao",
    pinned: false,
    title: "Guia rápido: organizando seus talhões no app",
    excerpt:
      "Um passo a passo simples para mapear sua propriedade e começar a registrar a produção por área.",
    body:
      "Mapear seus talhões é o primeiro passo para tirar relatórios precisos de produtividade. Preparamos um guia em PDF com o passo a passo completo, com imagens de cada etapa.\n\nBaixe, imprima e deixe no escritório da fazenda.",
    media: { kind: "document", url: "https://www.bhadott.studio/docs/guia-talhoes.pdf", label: "Guia de Talhões (PDF)" },
    tags: ["guia", "tutorial", "talhões"],
    author: "Equipe BHADOTT Agro",
    date: "2026-06-10T11:00:00.000Z",
  },
  {
    id: "agro-seed-5",
    type: "atualizacao",
    pinned: false,
    title: "Dashboard financeiro com relatórios em PDF",
    excerpt:
      "Acompanhe receitas, despesas e lucro por safra — e exporte tudo em um relatório pronto para o contador.",
    body:
      "O painel financeiro ganhou relatórios exportáveis:\n\n• Fluxo de caixa por período\n• Custo por talhão e por cultura\n• Margem por safra\n• Exportação em PDF e planilha\n\nIdeal para conversar com o banco, o contador ou os sócios.",
    media: { kind: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70", label: "" },
    tags: ["financeiro", "relatórios"],
    author: "BHADOTT Studio",
    date: "2026-06-06T15:20:00.000Z",
  },
]

// ============================================================
// SEED — Comentários de clientes (aprovados)
// ============================================================
export const seedComments = [
  {
    id: "agro-c-1",
    author: "João Pereira",
    role: "Produtor de leite — MG",
    rating: 5,
    text: "Finalmente um sistema que funciona no meio do mato, sem sinal. O controle de rebanho me economiza horas toda semana.",
    date: "2026-06-13T10:00:00.000Z",
    approved: true,
  },
  {
    id: "agro-c-2",
    author: "Maria Fernanda",
    role: "Agropecuária Vale Verde — GO",
    rating: 5,
    text: "Os relatórios financeiros são exatamente o que meu contador pedia. Recomendo demais para quem quer profissionalizar a fazenda.",
    date: "2026-06-11T14:30:00.000Z",
    approved: true,
  },
  {
    id: "agro-c-3",
    author: "Carlos Andrade",
    role: "Cafeicultor — MG",
    rating: 4,
    text: "Mapear os talhões mudou minha visão da lavoura. Estou ansioso pelas próximas atualizações de produtividade.",
    date: "2026-06-08T09:15:00.000Z",
    approved: true,
  },
]

// ============================================================
// Helpers puros (sem estado)
// ============================================================

// Extrai o ID de um vídeo do YouTube (watch, embed, shorts, youtu.be)
export function getYouTubeId(url) {
  if (!url) return null
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  )
  return m ? m[1] : null
}

// Decide como renderizar um vídeo: { provider: "youtube"|"file", id|src }
export function resolveVideo(url) {
  const yt = getYouTubeId(url)
  if (yt) return { provider: "youtube", embed: `https://www.youtube.com/embed/${yt}`, thumb: `https://img.youtube.com/vi/${yt}/hqdefault.jpg` }
  if (url) return { provider: "file", src: url }
  return null
}

// Data legível em pt-BR (ex.: "15 de jun de 2026")
export function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso))
  } catch {
    return iso
  }
}

// "há 3 dias", "há 2 h", "agora"
export function timeAgo(iso) {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const min = Math.round(diff / 60000)
    if (min < 1) return "agora"
    if (min < 60) return `há ${min} min`
    const h = Math.round(min / 60)
    if (h < 24) return `há ${h} h`
    const d = Math.round(h / 24)
    if (d < 30) return `há ${d} ${d === 1 ? "dia" : "dias"}`
    const mo = Math.round(d / 30)
    return `há ${mo} ${mo === 1 ? "mês" : "meses"}`
  } catch {
    return ""
  }
}

// Gera um id único simples para novas publicações/comentários
export function makeId(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
