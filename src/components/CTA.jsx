// ============================================================
// BHADOTT Studio — CTA Section FASE 4
// src/components/CTA.jsx — PT-BR honesto
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, MessageCircle, Github, Zap } from "lucide-react"

const WHATSAPP = "https://wa.me/5500000000000?text=Olá!%20Vim%20pelo%20site%20da%20BHADOTT%20Studio."
const GITHUB   = "https://github.com/jorgealam"

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const navigate  = useNavigate()

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      {/* Gradiente animado */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] hidden sm:block pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
        aria-hidden="true"
      />

      {/* Linhas horizontais */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" aria-hidden="true" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7 uppercase tracking-widest"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
            border: "1px solid rgba(59,130,246,0.22)",
            color: "#60a5fa",
          }}
        >
          <Zap size={11} aria-hidden="true" />
          Em construção ativa
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.65 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Vamos construir o{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400">
            próximo projeto
          </span>{" "}
          juntos
        </motion.h2>

        {/* Texto honesto */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="text-slate-400 text-base sm:text-lg leading-relaxed mb-3 max-w-2xl mx-auto px-2"
        >
          A BHADOTT Studio é um estúdio independente em crescimento — games, IA, sistemas e
          tecnologia criativa, construídos no Brasil com visão global.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-slate-600 text-sm mb-10 max-w-xl mx-auto"
        >
          Portfólio em evolução contínua · Projetos ativos no GitHub · Sempre aberto a parcerias
        </motion.p>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
        >
          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-2xl text-sm sm:text-base touch-target focus-ring transition-all"
            style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}
          >
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <MessageCircle size={18} className="relative" aria-hidden="true" />
            <span className="relative">Falar no WhatsApp</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: "rgba(59,130,246,0.4)", boxShadow: "0 0 16px rgba(59,130,246,0.1)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/projetos")}
            className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-2xl text-sm sm:text-base touch-target focus-ring transition-all"
            style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            Ver os Projetos
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>

          <motion.a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.18)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-slate-400 hover:text-white rounded-2xl text-sm sm:text-base touch-target focus-ring transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Github size={18} aria-hidden="true" />
            GitHub
          </motion.a>
        </motion.div>

        {/* Dots animados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-2 mt-12"
          aria-hidden="true"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.6, 1], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i % 2 === 0 ? "#3b82f6" : "#8b5cf6" }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
