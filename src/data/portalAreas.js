import {
  Bot,
  BookOpen,
  Gamepad2,
  GraduationCap,
  Hammer,
  Heart,
  Leaf,
  Music2,
  Newspaper,
  Wrench,
} from "lucide-react"

export const portalAreas = [
  {
    id: "games",
    label: "Jogos",
    description: "Promoções, jogos grátis, lançamentos, reviews e bastidores dos nossos projetos.",
    icon: Gamepad2,
    color: "amber",
    status: "Em preparação",
    highlights: ["Promoções", "Jogos grátis", "Reviews", "Game dev"],
  },
  {
    id: "ia",
    label: "Inteligência Artificial",
    shortLabel: "IA",
    description: "Ferramentas, prompts, automações e projetos práticos com inteligência artificial.",
    icon: Bot,
    color: "blue",
    status: "Em preparação",
    highlights: ["Ferramentas", "Prompts", "Tutoriais", "Automações"],
  },
  {
    id: "musica",
    label: "Música",
    description: "Trilhas, experiências com IA musical, projetos autorais e recursos para criadores.",
    icon: Music2,
    color: "violet",
    status: "Planejado",
    highlights: ["Trilhas", "IA musical", "Projetos", "Downloads"],
  },
  {
    id: "catolico",
    label: "Área Católica",
    description: "Um espaço respeitoso para liturgia, orações, estudos, santos e biblioteca.",
    icon: Heart,
    color: "rose",
    status: "Página disponível",
    route: "/catolico",
    highlights: ["Liturgia", "Orações", "Estudos", "Biblioteca"],
  },
  {
    id: "academy",
    label: "Academy",
    description: "Aprendizado aplicado em programação, Blender, games, IA, agro e criatividade.",
    icon: GraduationCap,
    color: "cyan",
    status: "Planejado",
    highlights: ["Programação", "Blender", "Games", "IA"],
  },
  {
    id: "blog",
    label: "Blog",
    description: "Artigos, diários de desenvolvimento, novidades do estúdio e conteúdo técnico.",
    icon: Newspaper,
    color: "indigo",
    status: "Página disponível",
    route: "/blog",
    highlights: ["Artigos", "Dev logs", "Tutoriais", "Novidades"],
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    description: "Calculadoras, conversores, utilitários, templates e pequenos recursos digitais.",
    icon: Wrench,
    color: "emerald",
    status: "Página disponível",
    route: "/ferramentas",
    highlights: ["Calculadoras", "Conversores", "Templates", "Scripts"],
  },
  {
    id: "agro",
    label: "Agro",
    description: "Soluções digitais, publicações e ferramentas criadas para o universo agro.",
    icon: Leaf,
    color: "green",
    status: "Página disponível",
    route: "/agro",
    highlights: ["Soluções", "Publicações", "Tecnologia", "Comunidade"],
  },
]

export const portalPillars = [
  { icon: BookOpen, label: "Conteúdo útil", description: "Informação organizada por área e fácil de encontrar." },
  { icon: Hammer, label: "Projetos reais", description: "Produtos, experiências e bastidores do que está sendo construído." },
  { icon: Wrench, label: "Ferramentas práticas", description: "Recursos que ajudam pessoas, criadores e pequenos negócios." },
]

export function getPortalArea(id) {
  return portalAreas.find((area) => area.id === id)
}
