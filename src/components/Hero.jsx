// ============================================================
// BHADOTT Studio — Hero Section FASE 3
// src/components/Hero.jsx — Cinematográfico Premium
// ============================================================

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, MessageCircle, Zap } from "lucide-react"

// ── Aurora background — orbs animados ──────────────────────
function AuroraBackground() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — azul principal */}
      <div
        className="animate-aurora absolute rounded-full"
        style={{
          width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900,
          top: "-20%", right: "-15%",
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Orb 2 — violeta */}
      <div
        className="animate-aurora2 absolute rounded-full"
        style={{
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          bottom: "-15%", left: "-10%",
          background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* Orb 3 — acento centro */}
      <div
        className="animate-aurora absolute rounded-full"
        style={{
          width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
          top: "30%", left: "30%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />
    </div>
  )
}

// ── Grid cyber sutil ──────────────────────────────────────
function CyberGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.022] hidden sm:block pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}
      aria-hidden="true"
    />
  )
}

// ── Partículas flutuantes ─────────────────────────────────
function Particles() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  const pts = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    dur: Math.random() * 10 + 7,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.06,
    color: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#a78bfa" : "#e2e8f0",
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -28, 0], opacity: [p.opacity, p.opacity * 2.8, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

// ── Visual geométrico direito ─────────────────────────────
function CinematicVisual() {
  const shouldReduce = useReducedMotion()
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">

      {/* Glow base */}
      <div className="absolute w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(139,92,246,0.07) 50%, transparent 70%)" }} />

      {/* Rings externos */}
      {[280, 220, 165, 115].map((size, i) => (
        <motion.div
          key={size}
          animate={shouldReduce ? {} : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full"
          style={{
            width: size, height: size,
            border: `1px ${i === 1 ? "dashed" : "solid"} ${
              i === 0 ? "rgba(59,130,246,0.07)"
            : i === 1 ? "rgba(139,92,246,0.10)"
            : i === 2 ? "rgba(59,130,246,0.13)"
            :           "rgba(139,92,246,0.16)"
            }`,
          }}
        />
      ))}

      {/* Núcleo hexagonal */}
      <motion.div
        animate={shouldReduce ? {} : { scale: [1, 1.07, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
        style={{ width: 110, height: 110 }}
      >
        <svg width="110" height="110" viewBox="0 0 110 110" className="absolute">
          <defs>
            <linearGradient id="hexG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25"/>
            </linearGradient>
            <filter id="hexGlow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <polygon points="55,6 100,30 100,80 55,104 10,80 10,30"
            fill="url(#hexG)" stroke="url(#hexG)" strokeWidth="1.5" strokeOpacity="0.9"
            filter="url(#hexGlow)" />
        </svg>
        {/* Inner ring dashed */}
        <motion.div
          animate={shouldReduce ? {} : { rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border border-dashed border-blue-400/25"
        />
        {/* Monogram */}
        <span
          className="relative z-10 text-3xl font-black text-transparent bg-clip-text select-none"
          style={{
            backgroundImage: "linear-gradient(135deg, #93c5fd, #c4b5fd)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          BS
        </span>
      </motion.div>

      {/* Satélites orbitais */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const r = 138
        const cx = Math.cos(rad) * r
        const cy = Math.sin(rad) * r
        const colors = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24"]
        const color = colors[i]
        return (
          <motion.div key={angle}
            animate={shouldReduce ? {} : {
              x: [cx, cx + (i % 2 === 0 ? 7 : -7), cx],
              y: [cy, cy - 10, cy],
            }}
            transition={{ duration: 4.5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="absolute"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div className="w-2.5 h-2.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}`, opacity: 0.75 }} />
            {/* Pulse ring */}
            <div className="absolute w-2.5 h-2.5 rounded-full animate-pulse-ring"
              style={{ border: `1px solid ${color}`, opacity: 0.5 }} />
          </motion.div>
        )
      })}

      {/* Linhas de conexão */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }} aria-hidden="true">
        <defs>
          <linearGradient id="lineG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.2)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const r = 138
          return (
            <line key={i} x1="50%" y1="50%"
              x2={`calc(50% + ${Math.cos(rad) * r}px)`}
              y2={`calc(50% + ${Math.sin(rad) * r}px)`}
              stroke={i % 2 === 0 ? "rgba(59,130,246,0.12)" : "rgba(139,92,246,0.12)"}
              strokeWidth="0.8" strokeDasharray="4 4"
            />
          )
        })}
      </svg>
    </div>
  )
}

// ── Linha scan diagonal ───────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      initial={{ x: "-130%", y: "-130%" }}
      animate={{ x: "230%", y: "230%" }}
      transition={{ duration: 11, repeat: Infinity, ease: "linear", repeatDelay: 7 }}
      className="absolute inset-0 w-full pointer-events-none"
      style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.15), rgba(139,92,246,0.12), transparent)", transform: "rotate(15deg)" }}
      aria-hidden="true"
    />
  )
}

// ── Hero Principal ────────────────────────────────────────
export default function Hero() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">

      {/* Backgrounds */}
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
      <AuroraBackground />
      <CyberGrid />
      <Particles />
      <ScanLine />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Conteúdo ── */}
          <div className="text-center lg:text-left">

            {/* Badge de status */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
              style={{
                background: "rgba(59,130,246,0.07)",
                border: "1px solid rgba(59,130,246,0.22)",
                color: "#60a5fa",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
              BHADOTT Studio — Est. 2025
              <Zap size={11} className="opacity-60" />
            </motion.div>

            {/* ── Headline Principal ── */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.75 }}
              className="font-black text-white leading-[1.03] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white">
                Building
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #93c5fd 0%, #ffffff 35%, #c4b5fd 70%, #93c5fd 100%)", backgroundSize: "200%", animation: "gradient-shift 6s ease infinite" }}
              >
                Digital
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 60%, #60a5fa 100%)", backgroundSize: "200%", animation: "gradient-shift 8s ease infinite reverse" }}
              >
                Experiences
              </span>
            </motion.h1>

            {/* Linha decorativa */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="hidden lg:block mb-6 h-px max-w-xs"
              style={{ background: "linear-gradient(to right, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent)", transformOrigin: "left" }}
            />

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.65 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
            >
              Games, IA, Design e Tecnologia Criativa.
              <span className="block mt-1.5 text-sm text-slate-500">
                Construído no Brasil — alcançando o mundo.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#projetos")}
                className="relative flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-xl text-sm sm:text-base touch-target focus-ring overflow-hidden"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 animate-shimmer" />
                <span className="relative">Explorar Projetos</span>
                <ArrowRight size={16} className="relative" aria-hidden="true" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.5)", boxShadow: "0 0 16px rgba(59,130,246,0.1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#contato")}
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-slate-300 hover:text-white rounded-xl text-sm sm:text-base touch-target focus-ring transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Fale Conosco
              </motion.button>
            </motion.div>

            {/* Stats rápidos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 pt-6 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "5+",  label: "Projetos"     },
                { value: "4",   label: "Áreas"        },
                { value: "BR",  label: "Feito no Brasil" },
                { value: "∞",   label: "Visão"        },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 1 }}
            className="hidden lg:block relative h-[480px]"
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
              { label: "Games & 3D",      color: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
              { label: "Sistemas IA",     color: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
              { label: "Apps Mobile",     color: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
              { label: "Design Criativo", color: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
              { label: "SaaS & Platforms",color: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
              { label: "Cloud & DevOps",  color: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)", text: "#a78bfa" },
            ].map((chip, i) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: chip.color, border: `1px solid ${chip.border}`, color: chip.text }}
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
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-slate-700 text-[10px] uppercase tracking-[0.22em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.7, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
