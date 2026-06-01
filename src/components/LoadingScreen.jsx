import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 18
      })
    }, 80)

    const timer = setTimeout(() => setVisible(false), 2200)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020617" }}
          aria-label="Carregando BHADOTT Studio"
          role="status"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-1/3 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/8 blur-3xl" aria-hidden="true" />

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "110vh" }}
            transition={{ duration: 2.2, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto h-32 w-32 border border-blue-500/20"
              style={{ transform: "rotate(45deg)", borderRadius: "4px" }}
              aria-hidden="true"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto h-24 w-24 border border-violet-500/15"
              style={{ transform: "rotate(45deg)", borderRadius: "4px" }}
              aria-hidden="true"
            />

            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl" aria-hidden="true" />
              <motion.span
                animate={{ textShadow: ["0 0 20px rgba(59,130,246,0.8)", "0 0 40px rgba(139,92,246,0.8)", "0 0 20px rgba(59,130,246,0.8)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative select-none bg-gradient-to-br from-blue-400 to-violet-500 bg-clip-text text-5xl font-black text-transparent"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                B
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div
              className="mb-1 bg-gradient-to-r from-blue-400 via-white to-violet-400 bg-clip-text text-xl font-black uppercase tracking-[0.15em] text-transparent sm:text-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              BHADOTT
            </div>
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Studio
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-blue-500/60">
              Sistemas · IA local · Criacao digital
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative w-48 sm:w-64"
          >
            <div className="h-px overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                style={{ boxShadow: "0 0 8px rgba(59,130,246,0.8)" }}
              />
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-[10px] uppercase tracking-widest text-slate-600">Inicializando</span>
              <span className="font-mono text-[10px] text-blue-500/70">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </motion.div>

          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <div key={i} className={`absolute ${cls} h-6 w-6 border-blue-500/30`} aria-hidden="true" />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
