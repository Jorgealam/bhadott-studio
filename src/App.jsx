// ============================================================
// BHADOTT Studio — App Root
// src/App.jsx — HashRouter para GitHub Pages
// ============================================================

import { HashRouter, Routes, Route } from "react-router-dom"

import Home          from "./pages/Home"
import Sobre         from "./pages/Sobre"
import Projetos      from "./pages/Projetos"
import ProjectDetail from "./pages/ProjectDetail"
import Suporte       from "./pages/Suporte"
import Contato       from "./pages/Contato"
import Blog          from "./pages/Blog"
import PlaceholderPage from "./pages/PlaceholderPage"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ── Home ── */}
        <Route path="/" element={<Home />} />

        {/* ── Sobre ── */}
        <Route path="/sobre" element={<Sobre />} />

        {/* ── Projetos ── */}
        <Route path="/projetos"       element={<Projetos />} />
        <Route path="/projetos/:slug" element={<ProjectDetail />} />

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
    </HashRouter>
  )
}
