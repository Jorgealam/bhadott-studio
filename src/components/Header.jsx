// ============================================================
// BHADOTT Studio — Header
// src/components/Header.jsx
// Navegação com rotas reais + scroll anchors na home
// ============================================================

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Compass, Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import PortalMenu from "./PortalMenu"
import { portalAreas } from "../data/portalAreas"

// Mistura de rotas reais e âncoras da home
const navLinks = [
  { label: "Home",      href: "/",         type: "route"  },
  { label: "Projetos",  href: "/projetos", type: "route"  },
  { label: "Agro",      href: "/agro",     type: "route"  },
  { label: "Blog",      href: "/blog",     type: "route"  },
  { label: "Suporte",   href: "/suporte",  type: "route"  },
  { label: "Contato",   href: "/contato",  type: "route"  },
]

// Logo SVG — símbolo BS minimalista
function BhadottLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hdr-lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="#020617" />
      <polygon
        points="16,2.5 27.5,9 27.5,23 16,29.5 4.5,23 4.5,9"
        fill="none" stroke="url(#hdr-lg)" strokeWidth="1" strokeOpacity="0.4"
      />
      <text
        x="5" y="21.5"
        fontFamily="'Space Grotesk', 'Arial Black', Arial, sans-serif"
        fontWeight="900" fontSize="14"
        fill="url(#hdr-lg)"
      >
        BS
      </text>
      <circle cx="25" cy="8" r="1.5" fill="#60a5fa" opacity="0.5" />
    </svg>
  )
}

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const menuRef  = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Fechar ao clicar fora
  useEffect(() => {
    if (!mobileOpen && !portalOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false)
        setPortalOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [mobileOpen, portalOpen])

  // Travar scroll ao abrir menu mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMobileOpen(false)
    setPortalOpen(false)

    if (link.type === "route") {
      navigate(link.href)
      window.scrollTo(0, 0)
    } else {
      // Âncora: se não estiver na home, navegar para home primeiro
      if (location.hash !== "" || location.pathname !== "/") {
        navigate("/")
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
        }, 120)
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const isActive = (link) => {
    if (link.type !== "route") return false
    if (link.href === "/") return location.pathname === "/" || location.pathname === ""
    return location.pathname.startsWith(link.href)
  }

  return (
    <motion.header
      ref={menuRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#020617]/95 backdrop-blur-2xl border-b border-blue-500/10 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)" }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, { href: "/", type: "route" })}
            className="flex items-center gap-2.5 group flex-shrink-0 focus-ring rounded-lg"
            aria-label="BHADOTT Studio — Home"
          >
            <div className="relative">
              <BhadottLogo size={34} />
              <div
                className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 tracking-[0.05em] text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                BHADOTT
              </span>
              <span className="text-[10px] text-slate-500 tracking-[0.15em] uppercase font-medium">
                Studio
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            <div className="relative">
              <button
                onClick={() => setPortalOpen((open) => !open)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium focus-ring ${
                  location.pathname.startsWith("/portal") ? "text-blue-400" : "text-slate-400 hover:text-blue-400"
                }`}
                aria-expanded={portalOpen}
                aria-haspopup="true"
              >
                <Compass size={13} aria-hidden="true" />
                Explorar
                <ChevronDown size={13} className={`transition-transform ${portalOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <AnimatePresence>{portalOpen && <PortalMenu onNavigate={() => setPortalOpen(false)} />}</AnimatePresence>
            </div>
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium group focus-ring ${
                    active ? "text-blue-400" : "text-slate-400 hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-px bg-blue-500 rounded-full transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/contato"
              onClick={(e) => handleNavClick(e, { href: "/contato", type: "route" })}
              className="relative overflow-hidden px-5 py-2 text-sm font-bold text-white rounded-xl transition-all duration-200 focus-ring group"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            >
              <span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
              <span className="relative">Fale Conosco</span>
            </a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all focus-ring border border-transparent hover:border-blue-500/20 touch-target"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-b border-blue-500/10"
            style={{ background: "rgba(2,6,23,0.98)", backdropFilter: "blur(24px)" }}
          >
            <div
              className="h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)" }}
              aria-hidden="true"
            />

            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile menu">
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setPortalOpen((open) => !open)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-blue-300 bg-blue-500/8 font-semibold text-base touch-target focus-ring"
                aria-expanded={portalOpen}
              >
                <span className="inline-flex items-center gap-2"><Compass size={17} aria-hidden="true" /> Explorar o portal</span>
                <ChevronDown size={16} className={`transition-transform ${portalOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </motion.button>

              <AnimatePresence>
                {portalOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-1 overflow-hidden px-1 pb-2"
                  >
                    {portalAreas.map((area) => {
                      const Icon = area.icon
                      return (
                        <button
                          key={area.id}
                          onClick={() => {
                            navigate(area.route || `/portal/${area.id}`)
                            setMobileOpen(false)
                            setPortalOpen(false)
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-2 p-3 text-left text-xs text-slate-400 hover:text-white rounded-xl hover:bg-white/5 focus-ring"
                        >
                          <Icon size={14} className="text-blue-400" aria-hidden="true" />
                          {area.shortLabel || area.label}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((link, i) => {
                const active = isActive(link)
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-medium text-base touch-target group focus-ring ${
                      active
                        ? "text-blue-400 bg-blue-500/8"
                        : "text-slate-300 hover:text-blue-400 hover:bg-blue-500/8"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        active ? "bg-blue-500" : "bg-blue-500/30 group-hover:bg-blue-500"
                      }`}
                      aria-hidden="true"
                    />
                  </motion.a>
                )
              })}

              <motion.a
                href="/contato"
                onClick={(e) => handleNavClick(e, { href: "/contato", type: "route" })}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
                className="mt-2 mb-1 px-4 py-3.5 text-center font-bold text-white rounded-xl touch-target focus-ring"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                }}
              >
                Fale Conosco
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
