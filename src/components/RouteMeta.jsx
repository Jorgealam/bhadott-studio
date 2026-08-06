import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getPortalArea } from "../data/portalAreas"

const defaults = {
  title: "BHADOTT Studio — Tecnologia, criatividade e inovação",
  description: "Ecossistema digital brasileiro para projetos, jogos, inteligência artificial, música, educação, agro e ferramentas.",
}

const routeMeta = {
  "/": defaults,
  "/portal": { title: "Explore o Portal — BHADOTT Studio", description: "Conheça todas as áreas do ecossistema BHADOTT Studio." },
  "/projetos": { title: "Projetos — BHADOTT Studio", description: "Sistemas, jogos e soluções digitais em desenvolvimento no BHADOTT Studio." },
  "/agro": { title: "BHADOTT Agro Solutions", description: "Tecnologia, conteúdo e soluções digitais voltadas ao universo agro." },
  "/blog": { title: "Blog — BHADOTT Studio", description: "Artigos, dev logs, tutoriais e novidades do BHADOTT Studio." },
  "/ferramentas": { title: "Ferramentas — BHADOTT Studio", description: "Utilidades gratuitas que funcionam diretamente no navegador." },
  "/sobre": { title: "Sobre — BHADOTT Studio", description: "Conheça a visão, os princípios e a trajetória do BHADOTT Studio." },
  "/suporte": { title: "Suporte — BHADOTT Studio", description: "Central de suporte e perguntas frequentes do BHADOTT Studio." },
  "/contato": { title: "Contato — BHADOTT Studio", description: "Entre em contato para projetos, parcerias e oportunidades." },
  "/studio": { title: "Agro Studio — Área privada", description: "Painel privado do BHADOTT Agro Solutions." },
}

function resolveMeta(pathname) {
  if (pathname.startsWith("/portal/")) {
    const area = getPortalArea(pathname.split("/")[2])
    if (area) return { title: `${area.label} — BHADOTT Studio`, description: area.description }
  }
  if (pathname.startsWith("/projetos/")) {
    return { title: "Projeto — BHADOTT Studio", description: "Conheça os detalhes deste projeto do BHADOTT Studio." }
  }
  return routeMeta[pathname] || { title: "Página não encontrada — BHADOTT Studio", description: defaults.description }
}

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = resolveMeta(pathname)
    document.title = meta.title

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement("meta")
      description.name = "description"
      document.head.appendChild(description)
    }
    description.content = meta.description
  }, [pathname])

  return null
}
