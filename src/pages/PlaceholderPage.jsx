// ============================================================
// BHADOTT Studio — Página Placeholder
// Usada para rotas futuras ainda não implementadas
// ============================================================

import { motion } from "framer-motion"
import { Construction, ArrowLeft, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function PlaceholderPage({ title = "Em Breve", description = "Esta página está sendo desenvolvida." }) {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: "#020617" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-md"
      >
        {/* Logo mark */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
            border: "1px solid rgba(59,130,246,0.25)",
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#60a5fa",
          }}
        >
          B
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa",
          }}
        >
          <Construction size={11} aria-hidden="true" />
          Em Desenvolvimento
        </div>

        <h1
          className="text-3xl sm:text-4xl font-black text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-8">
          {description}
          <span className="block mt-2 text-sm text-slate-500">
            Esta seção chegará em breve com conteúdo completo.
          </span>
        </p>

        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-xl text-sm"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-xl text-sm"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              boxShadow: "0 0 16px rgba(59,130,246,0.3)",
            }}
          >
            <Zap size={16} aria-hidden="true" />
            Ir para Home
          </motion.button>
        </div>
      </motion.div>

      {/* Footer mínimo */}
      <p className="absolute bottom-6 text-slate-700 text-xs">
        © 2026 BHADOTT Studio
      </p>
    </div>
  )
}
