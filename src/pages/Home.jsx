// ============================================================
// BHADOTT Studio — Home Page
// src/pages/Home.jsx
// ============================================================

import LoadingScreen    from "../components/LoadingScreen"
import Header           from "../components/Header"
import Hero             from "../components/Hero"
import Stats            from "../components/Stats"
import About            from "../components/About"
import Technologies     from "../components/Technologies"
import Projects         from "../components/Projects"
import Roadmap          from "../components/Roadmap"
import ProgressGallery  from "../components/ProgressGallery"
import Process          from "../components/Process"
import Team             from "../components/Team"
import Support          from "../components/Support"
import CTA              from "../components/CTA"
import Footer           from "../components/Footer"

function GlowDivider({ color = "blue" }) {
  const colors = {
    blue:   "rgba(59,130,246,0.15)",
    violet: "rgba(139,92,246,0.15)",
    mixed:  "rgba(99,102,241,0.12)",
  }
  return (
    <div className="relative h-px overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, transparent, ${colors[color]}, transparent)` }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen overflow-x-hidden" style={{ background: "#020617" }}>
        <Header />

        {/* ── Hero ── */}
        <Hero />
        <GlowDivider color="blue" />

        {/* ── Stats — métricas animadas ── */}
        <Stats />
        <GlowDivider color="mixed" />

        {/* ── Sobre o Estúdio ── */}
        <About />
        <GlowDivider color="violet" />

        {/* ── Tecnologias ── */}
        <Technologies />
        <GlowDivider color="blue" />

        {/* ── Projetos em Destaque ── */}
        <Projects />
        <GlowDivider color="mixed" />

        {/* ── Roadmap ── */}
        <Roadmap />
        <GlowDivider color="violet" />

        {/* ── Galeria de Progresso ── */}
        <ProgressGallery />
        <GlowDivider color="blue" />

        {/* ── Processo ── */}
        <Process />
        <GlowDivider color="mixed" />

        {/* ── Equipe ── */}
        <Team />
        <GlowDivider color="violet" />

        {/* ── Suporte / Contato ── */}
        <Support />

        {/* ── CTA Final ── */}
        <CTA />

        <Footer />
      </div>
    </>
  )
}
