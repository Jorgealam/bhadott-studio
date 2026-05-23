import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MessageCircle, Zap } from "lucide-react"

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

      {/* Animated gradient sweep */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        aria-hidden="true"
      />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.02] hidden sm:block"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      {/* Horizontal accent lines */}
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
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa",
          }}
        >
          <Zap size={11} aria-hidden="true" />
          Ready to build something great?
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Let's Build the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400">
            Next Project
          </span>
          <span className="text-white"> Together</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto px-2"
        >
          BHADOTT Remote Studios is built to transform ideas into real digital products. Systems,
          apps, games, AI and tools — all organized in a remote studio prepared to grow globally.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("#suporte")}
            className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-2xl text-sm sm:text-base touch-target focus-ring transition-all"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              boxShadow: "0 0 24px rgba(59,130,246,0.35)",
            }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Contact Us
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: "rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleScroll("#projetos")}
            className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-2xl text-sm sm:text-base touch-target focus-ring transition-all"
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            Explore Projects
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
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
