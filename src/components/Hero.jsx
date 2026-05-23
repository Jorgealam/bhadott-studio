import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Cpu, Globe, Zap, Code2, Box, Wifi } from "lucide-react"

// Tech badges for mobile
const techBadges = [
  { label: "AI & Machine Learning", color: "blue" },
  { label: "SaaS Systems",          color: "violet" },
  { label: "Mobile Apps",           color: "blue" },
  { label: "Games 3D",              color: "yellow" },
  { label: "Cloud & DevOps",        color: "violet" },
  { label: "Automation",            color: "blue" },
]

// Floating cards for desktop orbital display
const orbitalCards = [
  { icon: Cpu,         label: "AI Solutions",   color: "blue",   angle: 0 },
  { icon: Globe,       label: "Web Systems",     color: "violet", angle: 72 },
  { icon: Code2,       label: "SaaS Platform",   color: "blue",   angle: 144 },
  { icon: Box,         label: "3D & Games",      color: "yellow", angle: 216 },
  { icon: Wifi,        label: "Mobile Apps",     color: "violet", angle: 288 },
]

const colorMap = {
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/25",   text: "text-blue-400",   dot: "bg-blue-400"   },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-400", dot: "bg-violet-400" },
  yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/25", text: "text-yellow-400", dot: "bg-yellow-400" },
}

// Holographic orb component
function HolographicOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">

      {/* Outer glow */}
      <div className="absolute w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      {/* Orbit rings */}
      {[120, 160, 200].map((size, i) => (
        <motion.div
          key={size}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 12 + i * 5, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border border-blue-500/10"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Dashed orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-52 h-52 rounded-full border border-dashed border-violet-500/15"
      />

      {/* Core sphere */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(96,165,250,0.25), rgba(139,92,246,0.15), transparent)",
          border: "1px solid rgba(59,130,246,0.3)",
          boxShadow: "0 0 40px rgba(59,130,246,0.2), inset 0 0 20px rgba(59,130,246,0.05)",
        }}
      >
        {/* Inner rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-dashed border-blue-400/25"
        />
        <Zap size={24} className="text-blue-400 relative z-10" />
      </motion.div>

      {/* Orbital cards */}
      {orbitalCards.map((card, i) => {
        const colors = colorMap[card.color]
        const Icon = card.icon
        const rad = (card.angle * Math.PI) / 180
        const r = 155
        const cx = Math.cos(rad) * r
        const cy = Math.sin(rad) * r

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1, scale: 1,
              x: [cx, cx + 5, cx],
              y: [cy, cy - 8, cy],
            }}
            transition={{
              opacity: { delay: i * 0.15, duration: 0.4 },
              scale:   { delay: i * 0.15, duration: 0.4, type: "spring" },
              x: { delay: i * 0.15 + 0.4, duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" },
              y: { delay: i * 0.15 + 0.4, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${colors.bg} border ${colors.border} backdrop-blur-sm`}
            style={{
              position: "absolute",
              boxShadow: card.color === "blue" ? "0 0 12px rgba(59,130,246,0.15)" : "0 0 12px rgba(139,92,246,0.12)",
            }}
          >
            <Icon size={13} className={colors.text} />
            <span className="text-xs text-white/80 font-medium whitespace-nowrap">{card.label}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">

      {/* ── Background ── */}
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      {/* Deep glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} aria-hidden="true" />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.025] hidden sm:block"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      {/* Diagonal scan line animation */}
      <motion.div
        initial={{ x: "-100%", y: "-100%" }}
        animate={{ x: "200%", y: "200%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              Brazilian Digital Innovation
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                Building
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400">
                Digital Innovation
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl text-slate-400 font-semibold mt-2">
                for the Future
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              We create systems, mobile applications, AI solutions and immersive digital experiences.
              <span className="block mt-1 text-sm text-slate-500">
                From Brazil — to the world.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.6 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#projetos")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-white rounded-xl text-sm sm:text-base touch-target focus-ring transition-all"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.35)",
                }}
              >
                Explore Projects
                <ArrowRight size={17} aria-hidden="true" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: "rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#contato")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-white rounded-xl text-sm sm:text-base touch-target focus-ring transition-all"
                style={{
                  background: "rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <MessageCircle size={17} aria-hidden="true" />
                Contact Us
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-6 border-t"
              style={{ borderColor: "rgba(59,130,246,0.1)" }}
            >
              {[
                { value: "5+",   label: "Active Projects" },
                { value: "12+",  label: "Services" },
                { value: "100%", label: "Remote Studio" },
                { value: "BR",   label: "Made in Brazil" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 font-medium uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Holographic visual (lg+) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hidden lg:block relative h-[420px]"
            aria-hidden="true"
          >
            <HolographicOrb />
          </motion.div>

          {/* ── Mobile/Tablet: tech badge pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
            className="lg:hidden flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            {techBadges.map((badge, i) => {
              const c = colorMap[badge.color]
              return (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.52 + i * 0.07 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${c.bg} border ${c.border} ${c.text}`}
                >
                  {badge.label}
                </motion.span>
              )
            })}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-slate-700 text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-blue-500/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
