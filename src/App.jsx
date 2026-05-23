// ============================================================
// BHADOTT Remote Studios — App Root
// ============================================================

import LoadingScreen from "./components/LoadingScreen"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Services from "./components/Services"
import Process from "./components/Process"
import Team from "./components/Team"
import FutureSections from "./components/FutureSections"
import Support from "./components/Support"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

// Subtle neon divider between sections for visual progression
function GlowDivider({ color = "blue" }) {
  const colors = {
    blue:   "rgba(59,130,246,0.18)",
    violet: "rgba(139,92,246,0.18)",
    mixed:  "rgba(99,102,241,0.15)",
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

export default function App() {
  return (
    <>
      {/* Cinematic loading screen */}
      <LoadingScreen />

      <div className="min-h-screen overflow-x-hidden" style={{ background: "#020617" }}>
        <Header />
        <Hero />
        <GlowDivider color="blue" />
        <About />
        <GlowDivider color="mixed" />
        <Projects />
        <GlowDivider color="violet" />
        <Services />
        <GlowDivider color="blue" />
        <Process />
        <GlowDivider color="mixed" />
        <Team />
        <GlowDivider color="violet" />
        <FutureSections />
        <GlowDivider color="blue" />
        <Support />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
