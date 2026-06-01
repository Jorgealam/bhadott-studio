// ============================================================
// BHADOTT Studio — Projects Data FASE 4
// src/data/projectsData.js — Projetos reais com CTAs honestos
// ============================================================

const WHATSAPP = "https://wa.me/5500000000000?text=Olá!%20Vim%20pelo%20site%20da%20BHADOTT%20Studio."
const GITHUB   = "https://github.com/jorgealam"

// ── Projetos em destaque (featured) ──────────────────────────
export const featuredProjects = [
  {
    id: "f1",
    slug: "easyagro-solutions",
    name: "EasyAgro Solutions",
    tagline: "Gestão agrícola, simplificada.",
    description:
      "Sistema de gestão agrícola para pequenos e médios produtores. Controle de propriedade, produção, estoque, finanças e acesso remoto em uma plataforma acessível.",
    longDescription:
      "EasyAgro Solutions nasceu da necessidade real de digitalizar o campo brasileiro. O sistema oferece controle completo da propriedade rural — do rebanho ao financeiro — com interface intuitiva e funcionamento offline-first para áreas com conectividade limitada.",
    status: "Em Desenvolvimento",
    statusColor: "blue",
    category: "SaaS / AgroTech",
    accentColor: "#22c55e",
    gradient: "from-green-500/10 to-emerald-600/10",
    border: "border-green-500/20",
    techStack: ["React", "Node.js", "MySQL", "React Native", "PWA"],
    features: [
      "Mapeamento de propriedades e talhões",
      "Registro de rebanho e saúde animal",
      "Controle de produção e colheitas",
      "Gestão de estoque e insumos",
      "Dashboard financeiro com relatórios",
      "Acesso multiusuário com permissões",
      "App mobile com modo offline",
    ],
    timeline: [
      { phase: "Conceito & Planejamento", status: "done"   },
      { phase: "Design UI/UX",            status: "done"   },
      { phase: "Desenvolvimento Core",    status: "active" },
      { phase: "Testes Beta",             status: "pending" },
      { phase: "Lançamento Público",      status: "pending" },
    ],
    cta: {
      primary:   { label: "Falar sobre o projeto", href: WHATSAPP, external: true },
      secondary: { label: "Em Desenvolvimento",    href: null,     disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
  {
    id: "f2",
    slug: "bhadott-control-center",
    name: "BHADOTT Control Center",
    tagline: "Seu estúdio. Seu centro de controle.",
    description:
      "Plataforma de produtividade, controle de qualidade e IA local para equipes de desenvolvimento. Centraliza tarefas, builds, logs e automações em um único painel.",
    longDescription:
      "BHADOTT Control Center é a espinha dorsal operacional do estúdio. Integra gestão de projetos, pipelines de CI/CD, análise de qualidade de código, modelos de IA local e automações internas — tudo em um painel desktop construído com Electron.",
    status: "Em Desenvolvimento",
    statusColor: "violet",
    category: "Desktop / Produtividade",
    accentColor: "#8b5cf6",
    gradient: "from-violet-500/10 to-purple-600/10",
    border: "border-violet-500/20",
    techStack: ["Electron", "React", "Node.js", "SQLite", "GitHub API"],
    features: [
      "Painel centralizado de projetos",
      "Pipeline de build e deploy automatizado",
      "Análise de qualidade de código (QA)",
      "Integração com IA local (LLM)",
      "Log de atividades e métricas",
      "Notificações e alertas inteligentes",
      "Tema dark premium integrado",
    ],
    timeline: [
      { phase: "Arquitetura & Conceito",    status: "done"   },
      { phase: "Desenvolvimento Electron",  status: "active" },
      { phase: "Integração IA Local",       status: "pending" },
      { phase: "Painel QA & Métricas",      status: "pending" },
      { phase: "Release Interno",           status: "pending" },
    ],
    cta: {
      primary:   { label: "Falar sobre o projeto", href: WHATSAPP, external: true },
      secondary: { label: "Em Desenvolvimento",    href: null,     disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
  {
    id: "f3",
    slug: "neon-survivor",
    name: "Neon Survivor",
    tagline: "Survive the neon. Outlast the night.",
    description:
      "Jogo 2D de sobrevivência roguelite com estética neon desenvolvido em Godot. Mundo procedural, inimigos dinâmicos e progressão por habilidades.",
    longDescription:
      "Neon Survivor é o primeiro título original da divisão de games do BHADOTT Studio. Combina mecânicas roguelite com uma estética cyberpunk-neon única. Desenvolvido inteiramente em Godot Engine com shaders customizados e geração procedural.",
    status: "Em Desenvolvimento",
    statusColor: "yellow",
    category: "Games / Roguelite",
    accentColor: "#a855f7",
    gradient: "from-purple-500/10 to-pink-600/10",
    border: "border-purple-500/20",
    techStack: ["Godot Engine", "GDScript", "Blender", "Aseprite"],
    features: [
      "Mundo gerado proceduralmente",
      "Sistema de ondas de inimigos dinâmico",
      "Progressão por habilidades e upgrades",
      "Shaders neon customizados",
      "Controles gamepad e teclado",
      "Modo sobrevivência infinita",
    ],
    timeline: [
      { phase: "Conceito & Art Direction", status: "done"   },
      { phase: "Protótipo Jogável",        status: "active" },
      { phase: "Vertical Slice",           status: "pending" },
      { phase: "Alpha Fechado",            status: "pending" },
      { phase: "Steam Early Access",       status: "pending" },
    ],
    cta: {
      primary:   { label: "Acompanhar progresso", href: WHATSAPP, external: true },
      secondary: { label: "Em Desenvolvimento",   href: null,     disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
]

// ── Catálogo completo ────────────────────────────────────────
export const projectsData = [
  ...featuredProjects,
  {
    id: "p0",
    slug: "bhadott-studio-site",
    name: "BHADOTT Studio — Site",
    tagline: "Portfólio e identidade digital do estúdio.",
    description:
      "Site institucional e portfólio oficial da BHADOTT Studio. Desenvolvido com React + Vite, publicado no GitHub Pages com visual dark premium.",
    longDescription:
      "O próprio site da BHADOTT Studio é um projeto em si — construído com React, Vite e Tailwind CSS. Inclui portfólio de projetos, página sobre, contato, blog e suporte. Publicado e mantido ativamente no GitHub Pages.",
    status: "Publicado",
    statusColor: "green",
    category: "Web / Portfólio",
    accentColor: "#3b82f6",
    gradient: "from-blue-500/10 to-indigo-600/10",
    border: "border-blue-500/20",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GitHub Pages"],
    features: [
      "Portfólio de projetos em desenvolvimento",
      "Visual dark premium com glassmorphism",
      "Animações com Framer Motion",
      "Totalmente responsivo",
      "Deploy automático via GitHub Pages",
      "HashRouter compatível com GitHub Pages",
    ],
    timeline: [
      { phase: "Estrutura Base",    status: "done"   },
      { phase: "Visual Premium",    status: "done"   },
      { phase: "Conteúdo Real",     status: "active" },
      { phase: "Blog & Updates",    status: "pending" },
      { phase: "Backend + Auth",    status: "pending" },
    ],
    cta: {
      primary:   { label: "Ver no GitHub", href: GITHUB,   external: true  },
      secondary: { label: "Você está aqui", href: null,    disabled: true  },
      github:    GITHUB,
    },
    links: { demo: "https://bhadottstudios.github.io", github: GITHUB },
  },
  {
    id: "p4",
    slug: "bhadott-agro",
    name: "BHADOTT Agro",
    tagline: "Gestão rural redefinida.",
    description:
      "Plataforma SaaS de gestão agropecuária com controle de propriedade, produção, estoque, finanças e acesso remoto.",
    longDescription:
      "BHADOTT Agro é a evolução natural do EasyAgro — plataforma enterprise para gestão rural com suporte a múltiplas propriedades, relatórios avançados e integração com APIs do agronegócio.",
    status: "Planejamento",
    statusColor: "blue",
    category: "SaaS / AgroTech",
    accentColor: "#3b82f6",
    gradient: "from-blue-500/10 to-cyan-600/10",
    border: "border-blue-500/20",
    techStack: ["React", "Node.js", "PostgreSQL", "React Native"],
    features: ["Multi-propriedade", "Relatórios avançados", "API agro integrada", "App mobile nativo"],
    timeline: [
      { phase: "EasyAgro v1",        status: "active"  },
      { phase: "Expansão Enterprise", status: "pending" },
      { phase: "Lançamento SaaS",     status: "pending" },
    ],
    cta: {
      primary:   { label: "Saber mais", href: WHATSAPP, external: true },
      secondary: { label: "Planejamento", href: null,   disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
  {
    id: "p5",
    slug: "bhadott-video",
    name: "BHADOTT Video",
    tagline: "Criação de vídeo com IA.",
    description:
      "Plataforma de criação de vídeos com IA — geração de roteiro, narração, síntese de imagens e produção de conteúdo digital.",
    longDescription:
      "BHADOTT Video automatiza o pipeline de produção de vídeo usando IA generativa — do brief ao vídeo final em minutos.",
    status: "Planejamento",
    statusColor: "violet",
    category: "IA / Criação de Conteúdo",
    accentColor: "#8b5cf6",
    gradient: "from-violet-500/10 to-purple-600/10",
    border: "border-violet-500/20",
    techStack: ["Python", "React", "OpenAI API", "FFmpeg"],
    features: ["Geração de roteiro por IA", "Text-to-speech", "Síntese de imagens", "Montagem automática"],
    timeline: [
      { phase: "Pesquisa & Arquitetura", status: "active"  },
      { phase: "Integração IA",          status: "pending" },
      { phase: "Beta Público",           status: "pending" },
    ],
    cta: {
      primary:   { label: "Saber mais", href: WHATSAPP, external: true },
      secondary: { label: "Planejamento", href: null,   disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
  {
    id: "p6",
    slug: "bhadott-academy",
    name: "BHADOTT Academy",
    tagline: "Aprenda o que construímos.",
    description:
      "Hub de aprendizado com conteúdo sobre tecnologia, desenvolvimento de jogos, IA e projetos digitais.",
    longDescription:
      "BHADOTT Academy vai documentar a jornada de construção de projetos reais — do conceito ao lançamento. Conteúdo em português.",
    status: "Em Breve",
    statusColor: "gray",
    category: "Educação Digital",
    accentColor: "#64748b",
    gradient: "from-slate-500/10 to-blue-600/10",
    border: "border-slate-500/20",
    techStack: ["React", "Next.js", "Supabase"],
    features: ["Conteúdo de game dev", "Tutoriais de IA", "Trilhas de aprendizado"],
    timeline: [
      { phase: "Planejamento de Conteúdo",       status: "active"  },
      { phase: "Desenvolvimento da Plataforma",  status: "pending" },
      { phase: "Primeiro Conteúdo",              status: "pending" },
    ],
    cta: {
      primary:   { label: "Acompanhar lançamento", href: WHATSAPP, external: true },
      secondary: { label: "Em Breve",              href: null,     disabled: true  },
      github:    null,
    },
    links: { demo: null, github: null },
  },
]

export function getProjectBySlug(slug) {
  return projectsData.find((p) => p.slug === slug) || null
}

export const statusColors = {
  blue:   { bg: "bg-blue-500/12",   text: "text-blue-400",   border: "border-blue-500/25"   },
  violet: { bg: "bg-violet-500/12", text: "text-violet-400", border: "border-violet-500/25" },
  yellow: { bg: "bg-yellow-500/12", text: "text-yellow-400", border: "border-yellow-500/25" },
  green:  { bg: "bg-green-500/12",  text: "text-green-400",  border: "border-green-500/25"  },
  gray:   { bg: "bg-slate-500/12",  text: "text-slate-400",  border: "border-slate-500/25"  },
}
