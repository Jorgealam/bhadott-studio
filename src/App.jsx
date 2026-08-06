// ============================================================
// BHADOTT Studio — App Root
// src/App.jsx — HashRouter para GitHub Pages
// ============================================================

import { lazy, Suspense } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import RouteLoading from "./components/RouteLoading"
import RouteMeta from "./components/RouteMeta"

const Home = lazy(() => import("./pages/Home"))
const Sobre = lazy(() => import("./pages/Sobre"))
const Projetos = lazy(() => import("./pages/Projetos"))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"))
const Suporte = lazy(() => import("./pages/Suporte"))
const Contato = lazy(() => import("./pages/Contato"))
const Blog = lazy(() => import("./pages/Blog"))
const AgroSolutions = lazy(() => import("./pages/AgroSolutions"))
const AgroStudio = lazy(() => import("./pages/AgroStudio"))
const Portal = lazy(() => import("./pages/Portal"))
const PortalArea = lazy(() => import("./pages/PortalArea"))
const Ferramentas = lazy(() => import("./pages/Ferramentas"))
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"))

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteMeta />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
        {/* ── Home ── */}
        <Route path="/" element={<Home />} />

        {/* Portal — catálogo central das áreas BHADOTT */}
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/:areaId" element={<PortalArea />} />
        <Route path="/ferramentas" element={<Ferramentas />} />

        {/* ── Sobre ── */}
        <Route path="/sobre" element={<Sobre />} />

        {/* ── Projetos ── */}
        <Route path="/projetos"       element={<Projetos />} />
        <Route path="/projetos/:slug" element={<ProjectDetail />} />

        {/* ── Agro Solutions (página pública + painel privado) ── */}
        <Route path="/agro"   element={<AgroSolutions />} />
        <Route path="/studio" element={<AgroStudio />} />

        {/* ── Suporte ── */}
        <Route path="/suporte" element={<Suporte />} />

        {/* ── Contato ── */}
        <Route path="/contato" element={<Contato />} />

        {/* ── Blog ── */}
        <Route path="/blog" element={<Blog />} />

        {/* ── Admin — placeholder até back-end ── */}
        <Route
          path="/admin"
          element={
            <PlaceholderPage
              title="Área Administrativa"
              description="Painel administrativo privado. Disponível após implementação do back-end e autenticação."
            />
          }
        />

        {/* ── 404 ── */}
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Página não encontrada"
              description="A rota que você tentou acessar não existe. Verifique o endereço e tente novamente."
            />
          }
        />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
