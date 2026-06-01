// ============================================================
// BHADOTT Studio — Projects Data
// src/data/projectsData.js
// ============================================================

// ── Projetos em destaque (featured) ──────────────────────────
export const featuredProjects = [
  {
    id: "f1",
    slug: "easyagro-solutions",
    name: "EasyAgro Solutions",
    tagline: "Agriculture management, simplified.",
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
      { phase: "Conceito & Planejamento", status: "done" },
      { phase: "Design UI/UX", status: "done" },
      { phase: "Desenvolvimento Core", status: "active" },
      { phase: "Testes Beta", status: "pending" },
      { phase: "Lançamento Público", status: "pending" },
    ],
    links: { demo: null, github: null },
  },
  {
    id: "f2",
    slug: "bhadott-control-center",
    name: "BHADOTT Control Center",
    tagline: "Your studio. Your command center.",
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
      { phase: "Arquitetura & Conceito", status: "done" },
      { phase: "Desenvolvimento Electron", status: "active" },
      { phase: "Integração IA Local", status: "pending" },
      { phase: "Painel QA & Métricas", status: "pending" },
      { phase: "Release Interno", status: "pending" },
    ],
    links: { demo: null, github: null },
  },
  {
    id: "f3",
    slug: "neon-survivor",
    name: "Neon Survivor",
    tagline: "Survive the neon. Outlast the night.",
    description:
      "Jogo de sobrevivência com estética neon desenvolvido em Godot. Mundo procedural, inimigos dinâmicos e progressão por habilidades em um ambiente dark e estilizado.",
    longDescription:
      "Neon Survivor é o primeiro título original da divisão de games do BHADOTT Studio. Combina mecânicas roguelite de sobrevivência com uma estética cyberpunk-neon única. Desenvolvido inteiramente em Godot Engine com shaders customizados e procedural generation.",
    status: "Em Desenvolvimento",
    statusColor: "yellow",
    category: "Games / Roguelite",
    accentColor: "#a855f7",
    gradient: "from-purple-500/10 to-pink-600/10",
    border: "border-purple-500/20",
    techStack: ["Godot Engine", "GDScript", "Blender", "Aseprite", "FMOD"],
    features: [
      "Mundo gerado proceduralmente",
      "Sistema de ondas de inimigos dinâmico",
      "Progressão por habilidades e upgrades",
      "Shaders neon customizados",
      "Trilha sonora synthwave original",
      "Controles gamepad e teclado",
      "Modo sobrevivência infinita",
    ],
    timeline: [
      { phase: "Conceito & Art Direction", status: "done" },
      { phase: "Protótipo Jogável", status: "active" },
      { phase: "Vertical Slice", status: "pending" },
      { phase: "Alpha Fechado", status: "pending" },
      { phase: "Steam Early Access", status: "pending" },
    ],
    links: { demo: null, github: null },
  },
]

// ── Todos os projetos (catálogo completo) ────────────────────
export const projectsData = [
  ...featuredProjects,
  {
    id: "p4",
    slug: "bhadott-agro",
    name: "BHADOTT Agro",
    tagline: "Rural management redefined.",
    description: "Sistema SaaS de gestão agropecuária com controle de propriedade, produção, estoque, finanças e acesso remoto para o produtor rural moderno.",
    longDescription: "BHADOTT Agro é a evolução do EasyAgro — uma plataforma enterprise para gestão rural com suporte a múltiplas propriedades, relatórios avançados e integração com APIs agro.",
    status: "Planejamento",
    statusColor: "blue",
    category: "SaaS / AgroTech",
    accentColor: "#3b82f6",
    gradient: "from-blue-500/10 to-cyan-600/10",
    border: "border-blue-500/20",
    techStack: ["React", "Node.js", "PostgreSQL", "React Native"],
    features: ["Multi-propriedade", "Relatórios avançados", "API agro integrada", "App mobile nativo"],
    timeline: [
      { phase: "EasyAgro v1", status: "active" },
      { phase: "Expansão Enterprise", status: "pending" },
      { phase: "Lançamento SaaS", status: "pending" },
    ],
    links: { demo: null, github: null },
  },
  {
    id: "p5",
    slug: "bhadott-video",
    name: "BHADOTT Video",
    tagline: "AI-powered video creation at scale.",
    description: "Plataforma de criação de vídeos com IA para geração de roteiro, narração, síntese de imagens e produção de conteúdo digital em escala.",
    longDescription: "BHADOTT Video automatiza o pipeline de produção de vídeo usando IA generativa — do brief ao vídeo final em minutos.",
    status: "Planejamento",
    statusColor: "violet",
    category: "AI / Content Creation",
    accentColor: "#8b5cf6",
    gradient: "from-violet-500/10 to-purple-600/10",
    border: "border-violet-500/20",
    techStack: ["Python", "React", "OpenAI API", "FFmpeg"],
    features: ["Geração de roteiro por IA", "Text-to-speech", "Síntese de imagens", "Montagem automática"],
    timeline: [
      { phase: "Pesquisa & Arquitetura", status: "active" },
      { phase: "Integração IA", status: "pending" },
      { phase: "Beta Público", status: "pending" },
    ],
    links: { demo: null, github: null },
  },
  {
    id: "p6",
    slug: "bhadott-academy",
    name: "BHADOTT Academy",
    tagline: "Learn what we build. Build what you learn.",
    description: "Hub de aprendizado com cursos, tutoriais e conteúdo educacional sobre tecnologia, desenvolvimento de jogos, IA e projetos digitais.",
    longDescription: "BHADOTT Academy documenta a jornada de construção de projetos reais — do conceito ao lançamento. Conteúdo em português e inglês.",
    status: "Em Breve",
    statusColor: "gray",
    category: "Educação Digital",
    accentColor: "#64748b",
    gradient: "from-slate-500/10 to-blue-600/10",
    border: "border-slate-500/20",
    techStack: ["React", "Next.js", "Supabase", "Video CDN"],
    features: ["Cursos de game dev", "Tutoriais de IA", "Trilhas de aprendizado", "Comunidade"],
    timeline: [
      { phase: "Planejamento de Conteúdo", status: "active" },
      { phase: "Desenvolvimento da Plataforma", status: "pending" },
      { phase: "Primeiro Curso", status: "pending" },
    ],
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
