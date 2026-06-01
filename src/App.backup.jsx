// ============================================================
// BHADOTT Studio — App Root com React Router
// HashRouter garante compatibilidade com GitHub Pages
// Para servidor próprio, trocar por BrowserRouter
// ============================================================

import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PlaceholderPage from "./pages/PlaceholderPage"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ── Página principal ── */}
        <Route path="/" element={<Home />} />

        {/* ── Rotas futuras — estrutura pronta para implementação ── */}
        <Route
          path="/projetos"
          element={
            <PlaceholderPage
              title="Projetos BHADOTT"
              description="Catálogo completo de projetos em desenvolvimento: BHADOTT Agro, Video, Games, Tools e Academy."
            />
          }
        />
        <Route
          path="/projetos/:slug"
          element={
            <PlaceholderPage
              title="Detalhes do Projeto"
              description="Página individual do projeto com descrição completa, status e informações técnicas."
            />
          }
        />
        <Route
          path="/suporte"
          element={
            <PlaceholderPage
              title="Central de Suporte"
              description="Sistema de suporte com tickets, chat e acompanhamento de projetos. Disponível em breve."
            />
          }
        />
        <Route
          path="/contato"
          element={
            <PlaceholderPage
              title="Fale Conosco"
              description="Formulário de contato e informações para parcerias, projetos e oportunidades."
            />
          }
        />
        <Route
          path="/blog"
          element={
            <PlaceholderPage
              title="Blog BHADOTT"
              description="Artigos, tutoriais e novidades sobre tecnologia, desenvolvimento e inovação digital."
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PlaceholderPage
              title="Área Administrativa"
              description="Painel administrativo privado. Disponível após implementação do back-end."
            />
          }
        />

        {/* ── 404 — rota não encontrada ── */}
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
