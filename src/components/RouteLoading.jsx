import { motion } from "framer-motion"

export default function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]" role="status" aria-label="Carregando página">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 mx-auto rounded-xl border border-blue-400/20 border-t-blue-400 bg-blue-500/5"
        />
        <span className="block mt-4 text-[10px] uppercase tracking-[0.2em] text-slate-600">BHADOTT Studio</span>
      </div>
    </div>
  )
}
