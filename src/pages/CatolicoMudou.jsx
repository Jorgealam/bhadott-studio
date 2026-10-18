// ============================================================
// BHADOTT Studio — Ponte da antiga rota #/catolico
// A Área Católica virou um site independente. Esta página não contém
// conteúdo católico: apenas leva favoritos antigos ao novo endereço.
// ============================================================

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import PageLayout, { PageHero } from "../components/PageLayout"

// Definido no build (VITE_PORTAL_CATOLICO_URL). Sem valor, nenhum redirecionamento é feito.
const newSiteUrl = (import.meta.env.VITE_PORTAL_CATOLICO_URL || "").trim()

function buildTarget(search) {
  if (!newSiteUrl) return ""
  const base = newSiteUrl.split("#")[0]
  // O novo site também usa HashRouter: #/catolico?secao=x vira #/?secao=x
  return `${base}#/${search || ""}`
}

export default function CatolicoMudou() {
  const { search } = useLocation()
  const target = buildTarget(search)

  useEffect(() => {
    if (target) window.location.replace(target)
  }, [target])

  return (
    <PageLayout backLabel="Voltar para Home" backTo="/">
      <PageHero
        badge="Novo endereço"
        title="A Área Católica"
        titleGrad="agora é um site próprio"
        subtitle={target
          ? "Você está sendo levado ao novo endereço. Se nada acontecer, use o botão abaixo."
          : "O conteúdo católico foi separado do portal do BHADOTT Studio e ganhará um endereço próprio em breve."}
      >
        {target && (
          <a
            href={target}
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-sm font-bold text-white focus-ring"
          >
            Abrir o novo site <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </PageHero>
    </PageLayout>
  )
}
