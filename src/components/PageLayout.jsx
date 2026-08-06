// ============================================================
// BHADOTT Studio — PageLayout
// src/components/PageLayout.jsx
// Wrapper compartilhado: Header + Footer + scroll-to-top
// ============================================================

import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"

// Divisor neon sutil entre seções
export function GlowDivider({ color = "blue" }) {
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

// Botão de voltar consistente
export function BackButton({ label = "Voltar", to = "/" }) {
  const navigate = useNavigate()
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ x: -3 }}
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm font-medium focus-ring rounded group"
    >
      <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
      {label}
    </motion.button>
  )
}

// Hero de página interna — padrão para todas as páginas
export function PageHero({ badge, title, titleGrad, subtitle, children, theme = "dark" }) {
  const isCatholic = theme === "catholic"
  return (
    <section className={`relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden ${isCatholic ? "catholic-hero" : ""}`}>
      <div className="absolute inset-0" style={{ background: isCatholic ? "linear-gradient(145deg, #fffdf8, #f5edf8 58%, #f8f1df)" : "#020617" }} aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: isCatholic ? "radial-gradient(ellipse, rgba(91,21,157,0.10) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.02] hidden sm:block"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6"
          >
            <span
              className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full uppercase tracking-widest text-blue-400"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.6 }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight ${isCatholic ? "text-[#2c2030]" : "text-white"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}{" "}
          {titleGrad && (
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isCatholic ? "from-[#8a6924] to-[#5b159d]" : "from-blue-400 to-violet-400"}`}>
              {titleGrad}
            </span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className={`${isCatholic ? "text-[#756b78]" : "text-slate-400"} text-base sm:text-lg max-w-2xl mx-auto leading-relaxed`}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}

// Layout principal
export default function PageLayout({ children, showBack = true, backLabel = "Voltar para Home", backTo = "/", theme = "dark" }) {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === "catholic" ? "catholic-layout" : ""}`} style={{ background: theme === "catholic" ? "#fbf8f2" : "#020617" }}>
      <Header />

      {showBack && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0">
          <BackButton label={backLabel} to={backTo} />
        </div>
      )}

      <main>{children}</main>

      <Footer />
    </div>
  )
}
