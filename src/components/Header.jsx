import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home",     href: "#inicio" },
  { label: "Services", href: "#servicos" },
  { label: "Projects", href: "#projetos" },
  { label: "AI",       href: "#ia" },
  { label: "Systems",  href: "#sistemas" },
  { label: "Mobile",   href: "#mobile" },
  { label: "Contact",  href: "#contato" },
]

// Logo SVG component — diamond B mark
function BhadottLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hdr-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="#020617" />
      <polygon points="20,3 37,20 20,37 3,20" fill="none" stroke="url(#hdr-g)" strokeWidth="1.2" opacity="0.6" />
      <text x="20" y="27" fontFamily="'Space Grotesk', Arial Black, sans-serif"
        fontSize="18" fontWeight="900" fill="url(#hdr-g)" textAnchor="middle">B</text>
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false)
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [mobileOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: "smooth" })
    }, 60)
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
      {/* Top accent line */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" aria-hidden="true" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, "#inicio")}
            className="flex items-center gap-2.5 group flex-shrink-0 focus-ring rounded-lg"
            aria-label="BHADOTT Remote Studios — Home"
          >
            {/* Logo mark with glow */}
            <div className="relative">
              <BhadottLogo size={34} />
              <div className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <span
                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 tracking-[0.05em] text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                BHADOTT
              </span>
              <span className="text-[10px] text-slate-500 tracking-[0.15em] uppercase font-medium">
                Remote Studios
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-3 py-2 text-sm text-slate-400 hover:text-blue-400 rounded-lg transition-all duration-200 font-medium group focus-ring"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" aria-hidden="true" />
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, "#contato")}
              className="relative overflow-hidden px-5 py-2 text-sm font-bold text-white rounded-xl transition-all duration-200 focus-ring group"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            >
              {/* Hover shimmer */}
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              <span className="relative">Contact Us</span>
            </a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all focus-ring border border-transparent hover:border-blue-500/20 touch-target"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
            {/* Accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" aria-hidden="true" />

            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile menu">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="flex items-center justify-between px-4 py-3.5 text-slate-300 hover:text-blue-400 hover:bg-blue-500/8 active:bg-blue-500/15 rounded-xl transition-all font-medium text-base touch-target group focus-ring"
                >
                  <span>{link.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors" aria-hidden="true" />
                </motion.a>
              ))}

              <motion.a
                href="#contato"
                onClick={(e) => handleNavClick(e, "#contato")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
                className="mt-2 mb-1 px-4 py-3.5 text-center font-bold text-white rounded-xl touch-target focus-ring"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                }}
              >
                Contact Us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
