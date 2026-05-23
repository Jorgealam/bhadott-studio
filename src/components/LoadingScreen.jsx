import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simula progresso de carregamento
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 18
      })
    }, 80)

    // Remove a loading screen após animação
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
          aria-label="Loading BHADOTT Remote Studios"
          role="status"
        >
          {/* ── Background grid ── */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          {/* ── Glow blobs ── */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-72 h-72 bg-violet-600/8 rounded-full blur-3xl" aria-hidden="true" />

          {/* ── Scan line ── */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "110vh" }}
            transition={{ duration: 2.2, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            aria-hidden="true"
          />

          {/* ── Logo mark ── */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="relative mb-8"
          >
            {/* Outer diamond orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto w-32 h-32 border border-blue-500/20"
              style={{ transform: "rotate(45deg)", borderRadius: "4px" }}
              aria-hidden="true"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto w-24 h-24 border border-violet-500/15"
              style={{ transform: "rotate(45deg)", borderRadius: "4px" }}
              aria-hidden="true"
            />

            {/* B lettermark */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Glow behind B */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl" aria-hidden="true" />
              <motion.span
                animate={{ textShadow: ["0 0 20px rgba(59,130,246,0.8)", "0 0 40px rgba(139,92,246,0.8)", "0 0 20px rgba(59,130,246,0.8)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-violet-500 select-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                B
              </motion.span>
            </div>
          </motion.div>

          {/* ── Brand name ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-10"
          >
            <div
              className="text-xl sm:text-2xl font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-violet-400 uppercase mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              BHADOTT
            </div>
            <div className="text-xs text-slate-500 tracking-[0.3em] uppercase font-medium">
              Remote Studios
            </div>
            <div className="text-[10px] text-blue-500/60 tracking-[0.2em] uppercase mt-1">
              Brazilian Digital Innovation
            </div>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative w-48 sm:w-64"
          >
            <div className="h-px bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                style={{ boxShadow: "0 0 8px rgba(59,130,246,0.8)" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-600 tracking-widest uppercase">Initializing</span>
              <span className="text-[10px] text-blue-500/70 font-mono">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </motion.div>

          {/* ── Corner decorations ── */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-6 h-6 border-blue-500/30`} aria-hidden="true" />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
