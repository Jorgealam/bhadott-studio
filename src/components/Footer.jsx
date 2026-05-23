import { motion } from "framer-motion"
import { Github, Instagram, Youtube, Mail, Heart } from "lucide-react"
import { contactLinks } from "../data/team"

const footerLinks = {
  "Projects": [
    { label: "BHADOTT Agro",    href: "#projetos" },
    { label: "BHADOTT Video",   href: "#projetos" },
    { label: "BHADOTT Games",   href: "#projetos" },
    { label: "BHADOTT Tools",   href: "#projetos" },
    { label: "BHADOTT Academy", href: "#projetos" },
  ],
  "Services": [
    { label: "Websites & Landing Pages", href: "#servicos" },
    { label: "SaaS Systems",             href: "#servicos" },
    { label: "Mobile Apps",              href: "#servicos" },
    { label: "AI Automation",            href: "#servicos" },
    { label: "Games & 3D",               href: "#servicos" },
  ],
  "Support": [
    { label: "Support Center", href: "#suporte" },
    { label: "FAQ",            href: "#suporte" },
    { label: "WhatsApp",       href: "#suporte" },
    { label: "Send E-mail",    href: "#suporte" },
    { label: "Instagram",      href: "#suporte" },
  ],
}


// Inline BHADOTT diamond logo
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
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="16" fill="url(#fg-mark)">
        B
      </text>
    </svg>
  )
}

export default function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault()
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = [
    { icon: Github,    href: contactLinks.github    || "#", label: "GitHub",    hover: "hover:text-slate-200 hover:border-white/25 hover:bg-white/8" },
    { icon: Youtube,   href: contactLinks.youtube   || "#", label: "YouTube",   hover: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8" },
    { icon: Instagram, href: contactLinks.instagram || "#", label: "Instagram", hover: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/8" },
    { icon: Mail,      href: contactLinks.email || "mailto:contact@bhadott.studio", label: "E-mail", hover: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/8" },
  ]

  return (
    <footer className="relative overflow-hidden" role="contentinfo">
      {/* Top neon divider */}
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
      {/* Glow below divider */}
      <div
        className="h-px opacity-30 blur-sm"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.8), rgba(139,92,246,0.8), transparent)" }}
        aria-hidden="true"
      />

      <div className="pt-14 sm:pt-16 pb-8" style={{ background: "#020617" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main grid — 1 col mobile | 2 col sm | 4 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <BhadottMark />
                <div>
                  <div
                    className="font-black text-base leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    BHADOTT
                  </div>
                  <div className="text-slate-500 text-xs font-medium tracking-wide">Remote Studios</div>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-2 max-w-xs">
                Brazilian Digital Innovation — building systems, apps, games, AI and tools from Brazil to the world.
              </p>
              <p className="text-slate-700 text-xs mb-6 font-mono tracking-wider uppercase">
                Brazilian Digital Innovation
              </p>

              {/* Social links */}
              <div className="flex gap-2 flex-wrap">
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
                      className={`p-2.5 rounded-xl border border-white/8 text-slate-500 transition-all touch-target flex items-center justify-center focus-ring ${social.hover}`}
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      aria-label={social.label}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4
                  className="text-white font-bold text-xs sm:text-sm mb-4 uppercase tracking-widest"
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
                        className="text-slate-500 text-sm hover:text-blue-400 transition-colors focus-ring rounded"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Made in Brazil badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/6"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.03))" }}
          >
            {/* Left: studio tagline */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-black text-transparent bg-clip-text"
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
                <p className="text-white text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  BHADOTT Remote Studios
                </p>
                <p className="text-slate-600 text-[10px] tracking-widest uppercase">Brazilian Digital Innovation</p>
              </div>
            </div>

            {/* Right: Made in Brazil */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-lg leading-none" role="img" aria-label="Brazilian flag">🇧🇷</span>
              <span className="text-slate-500 text-xs font-medium tracking-wide">Made in Brazil</span>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-slate-600 text-xs sm:text-sm">
              © 2026 BHADOTT Remote Studios. All rights reserved.
            </p>
            <p className="text-slate-700 text-xs flex items-center gap-1.5">
              Made with <Heart size={11} className="text-red-500/60" aria-hidden="true" /> by Jorge Alam &amp; Matheus
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
