import { motion } from "framer-motion"
import { Github, Instagram, Youtube, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { contactLinks } from "../data/team"

const footerLinks = {
  Portal: [
    { label: "Jogos", href: "/portal/games" },
    { label: "Inteligência Artificial", href: "/portal/ia" },
    { label: "Música", href: "/portal/musica" },
    { label: "Área Católica", href: "/catolico" },
    { label: "Academy", href: "/portal/academy" },
  ],
  Conteúdo: [
    { label: "Todos os projetos", href: "/projetos" },
    { label: "BHADOTT Agro", href: "/agro" },
    { label: "Blog", href: "/blog" },
    { label: "Ferramentas", href: "/ferramentas" },
    { label: "Explorar o portal", href: "/portal" },
  ],
  Suporte: [
    { label: "Central de suporte", href: "/suporte" },
    { label: "Perguntas frequentes", href: "/suporte" },
    { label: "Contato", href: "/contato" },
    { label: "Sobre o estúdio", href: "/sobre" },
    { label: "GitHub", href: "https://github.com/jorgealam" },
  ],
}

function BhadottMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="fg-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="#020617" />
      <polygon points="20,3 37,12 37,28 20,37 3,28 3,12" fill="url(#fg-mark)" opacity="0.18" />
      <polygon points="20,3 37,12 37,28 20,37 3,28 3,12" fill="none" stroke="url(#fg-mark)" strokeWidth="1.2" />
      <text
        x="50%"
        y="56%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="900"
        fontSize="16"
        fill="url(#fg-mark)"
      >
        B
      </text>
    </svg>
  )
}

export default function Footer() {
  const navigate = useNavigate()

  const handleScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else if (href.startsWith("/")) {
      e.preventDefault()
      navigate(href)
      window.scrollTo(0, 0)
    }
  }

  const socialLinks = [
    { icon: Github, href: contactLinks.github || "#", label: "GitHub", hover: "hover:text-slate-200 hover:border-white/25 hover:bg-white/8" },
    { icon: Youtube, href: contactLinks.youtube || "#", label: "YouTube", hover: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8" },
    { icon: Instagram, href: contactLinks.instagram || "#", label: "Instagram", hover: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/8" },
    { icon: Mail, href: contactLinks.email || "mailto:contact@bhadott.studio", label: "E-mail", hover: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/8" },
  ]

  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      <div className="relative h-px overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)" }}
        />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-0 w-1/3"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }}
        />
      </div>

      <div
        className="h-px opacity-30 blur-sm"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.8), rgba(139,92,246,0.8), transparent)" }}
        aria-hidden="true"
      />

      <div className="pb-8 pt-14 sm:pt-16" style={{ background: "#020617" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-8 sm:mb-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <BhadottMark />
                <div>
                  <div
                    className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-base font-black leading-tight text-transparent"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    BHADOTT
                  </div>
                  <div className="text-xs font-medium tracking-wide text-slate-500">Studio</div>
                </div>
              </div>

              <p className="mb-2 max-w-xs text-sm leading-relaxed text-slate-500">
                BHADOTT Studio é um ecossistema de criação digital focado em sistemas,
                automações, IA local, jogos, conteúdo, design e ferramentas para desenvolvimento.
              </p>
              <p className="mb-6 text-xs font-mono uppercase tracking-wider text-slate-700">
                Sistemas · IA local · Jogos · Design
              </p>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`focus-ring touch-target flex items-center justify-center rounded-xl border border-white/8 p-2.5 text-slate-500 transition-all ${social.hover}`}
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      aria-label={social.label}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4
                  className="mb-4 text-xs font-bold uppercase tracking-widest text-white sm:text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {title}
                </h4>
                <ul className="space-y-2.5" role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="focus-ring rounded text-sm text-slate-500 transition-colors hover:text-blue-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/6 p-4 sm:flex-row sm:p-5"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.03))" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                  border: "1px solid rgba(59,130,246,0.2)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#60a5fa",
                }}
              >
                B
              </div>
              <div>
                <p className="text-xs font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  BHADOTT Studio
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-600">Inovação digital brasileira</p>
              </div>
            </div>

            <div
              className="flex items-center gap-2 rounded-full border border-white/8 px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-lg leading-none" role="img" aria-label="Bandeira do Brasil">
                BR
              </span>
              <span className="text-xs font-medium tracking-wide text-slate-500">Criado no Brasil</span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-5 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-600 sm:text-sm">
              © 2026 BHADOTT Studio. Todos os direitos reservados.
            </p>
            <p className="text-xs text-slate-700">Criado por Jorge Alam</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
