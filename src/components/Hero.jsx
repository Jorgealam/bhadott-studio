import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

// Partículas discretas — apenas desktop
function Particles() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null

  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.35 + 0.08,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#60a5fa" : p.id % 3 === 1 ? "#a78bfa" : "#e2e8f0",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Visual geométrico cinematográfico — desktop only
function CinematicVisual() {
  const shouldReduce = useReducedMotion()
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">

      {/* Glow base */}
      <div
        className="absolute w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)" }}
      />

      {/* Rings externos */}
      {[240, 190, 145].map((size, i) => (
        <motion.div
          key={size}
          animate={shouldReduce ? {} : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 7, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: i === 0
              ? "rgba(59,130,246,0.08)"
              : i === 1
              ? "rgba(139,92,246,0.1)"
              : "rgba(59,130,246,0.12)",
            borderStyle: i === 1 ? "dashed" : "solid",
          }}
        />
      ))}

      {/* Núcleo hexagonal — glow premium */}
      <motion.div
        animate={shouldReduce ? {} : { scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
        style={{ width: 100, height: 100 }}
      >
        {/* Hexágono SVG */}
        <svg width="100" height="100" viewBox="0 0 100 100" className="absolute">
          <defs>
            <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <polygon points="50,6 90,28 90,72 50,94 10,72 10,28"
            fill="url(#hexGrad)"
            stroke="url(#hexGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
        </svg>
        {/* Inner ring */}
        <motion.div
          animate={shouldReduce ? {} : { rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-dashed border-blue-400/20"
        />
        {/* BS monogram */}
        <span
          className="relative z-10 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-violet-400 select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          BS
        </span>
      </motion.div>

      {/* Satélites orbitais — 4 pontos */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const r = 120
        const cx = Math.cos(rad) * r
        const cy = Math.sin(rad) * r
        const color = i % 2 === 0 ? "#60a5fa" : "#a78bfa"
        return (
          <motion.div
            key={angle}
            animate={shouldReduce ? {} : {
              x: [cx, cx + (i % 2 === 0 ? 6 : -6), cx],
              y: [cy, cy - 8, cy],
            }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}`, opacity: 0.7 }}
          />
        )
      })}

      {/* Linhas de conexão */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }} aria-hidden="true">
        {[0, 90, 180, 270].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const r = 120
          const cx = 50 + Math.cos(rad) * r
          const cy = 50 + Math.sin(rad) * r
          return (
            <line
              key={i}
              x1="50%" y1="50%"
              x2={`calc(50% + ${Math.cos(rad) * r}px)`}
              y2={`calc(50% + ${Math.sin(rad) * r}px)`}
              stroke={i % 2 === 0 ? "rgba(59,130,246,0.12)" : "rgba(139,92,246,0.12)"}
              strokeWidth="0.8"
            />
          )
        })}
      </svg>
    </div>
  )
}

export default function Hero() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">

      {/* Background base */}
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      {/* Glow atmosphere */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Cyber grid — muito sutil */}
      <div
        className="absolute inset-0 opacity-[0.02] hidden sm:block"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Partículas (desktop) */}
      <Particles />

      {/* Linha scan diagonal — muito discreta */}
      <motion.div
        initial={{ x: "-120%", y: "-120%" }}
        animate={{ x: "220%", y: "220%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/12 to-transparent rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Left: Content ── */}
          <div className="text-center lg:text-left">

            {/* Badge top */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
              style={{
                background: "rgba(59,130,246,0.07)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#60a5fa",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              BHADOTT Studio
            </motion.div>

            {/* ── Headline principal ── */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-black text-white leading-[1.05] mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {/* Linha 1 */}
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                Building
              </span>
              {/* Linha 2 — gradiente premium */}
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #93c5fd 0%, #ffffff 40%, #c4b5fd 100%)" }}
              >
                Digital
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)" }}
              >
                Experiences
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
            >
              Games, AI, Design and Creative Technology.
              <span className="block mt-1.5 text-sm text-slate-500">
                Built in Brazil — reaching the world.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(59,130,246,0.45)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#projetos")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-white rounded-xl text-sm sm:text-base touch-target focus-ring"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 22px rgba(59,130,246,0.3)",
                }}
              >
                Explore Projects
                <ArrowRight size={16} aria-hidden="true" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.45)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#contato")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-slate-300 hover:text-white rounded-xl text-sm sm:text-base touch-target focus-ring transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Contact Us
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 pt-6 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "5+",   label: "Projects" },
                { value: "2",    label: "Founders" },
                { value: "BR",   label: "Made in Brazil" },
                { value: "∞",    label: "Ideas" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 font-medium uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual cinematográfico (lg+) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="hidden lg:block relative h-[440px]"
            aria-hidden="true"
          >
            <CinematicVisual />
          </motion.div>

          {/* ── Mobile: tech chips ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="lg:hidden flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            {[
              { label: "Games & 3D",        color: "rgba(59,130,246,0.12)",   border: "rgba(59,130,246,0.25)",  text: "#60a5fa" },
              { label: "AI Systems",        color: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
              { label: "Mobile Apps",       color: "rgba(59,130,246,0.12)",   border: "rgba(59,130,246,0.25)",  text: "#60a5fa" },
              { label: "Creative Design",   color: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
              { label: "SaaS Systems",      color: "rgba(59,130,246,0.12)",   border: "rgba(59,130,246,0.25)",  text: "#60a5fa" },
              { label: "Cloud & DevOps",    color: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
            ].map((chip, i) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: chip.color,
                  border: `1px solid ${chip.border}`,
                  color: chip.text,
                }}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-slate-700 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-7 bg-gradient-to-b from-blue-500/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
