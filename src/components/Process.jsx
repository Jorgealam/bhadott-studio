import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Layers, Code2, TestTube2, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Concept",
    description: "We organize the initial project vision, map requirements and define scope and objectives.",
    color: "blue",
  },
  {
    number: "02",
    icon: Layers,
    title: "Prototype",
    description: "We create the first visual version to validate the concept and adjust before building.",
    color: "violet",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description: "We build the system, app or site with professional architecture and clean code practices.",
    color: "blue",
  },
  {
    number: "04",
    icon: TestTube2,
    title: "Testing",
    description: "We validate usability, responsiveness, performance and compatibility across all devices.",
    color: "violet",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description: "We prepare the project for deployment, configure infrastructure and initiate go-to-market.",
    color: "blue",
  },
]

const colorMap = {
  blue:   { num: "text-blue-400",   icon: "text-blue-400",   iconBg: "bg-blue-500/12 border-blue-500/25",   dot: "bg-blue-400",   line: "from-blue-500/25 to-violet-500/25",  hover: "hover:border-blue-500/30" },
  violet: { num: "text-violet-400", icon: "text-violet-400", iconBg: "bg-violet-500/12 border-violet-500/25", dot: "bg-violet-400", line: "from-violet-500/25 to-blue-500/25",  hover: "hover:border-violet-500/30" },
}

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="processo" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020617, #030c1e, #020617)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            Our Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            From Idea to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Live Product
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            A structured and transparent process to ensure quality and alignment at every stage.
          </p>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-start justify-between gap-3 relative">
          <div className="absolute top-[2.2rem] left-[5%] right-[5%] h-px"
            style={{ background: "linear-gradient(to right, rgba(59,130,246,0.15), rgba(139,92,246,0.15), rgba(59,130,246,0.15))" }} aria-hidden="true" />

          {steps.map((step, i) => {
            const c = colorMap[step.color]
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -5 }}
                className={`group flex-1 flex flex-col items-center text-center p-5 rounded-2xl border border-white/5 ${c.hover} transition-all duration-300 backdrop-blur-sm`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${c.dot} mb-4 relative z-10`} style={{ boxShadow: `0 0 8px currentColor` }} aria-hidden="true" />
                <div className={`p-3 rounded-xl border ${c.iconBg} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={c.icon} aria-hidden="true" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${c.num} mb-1`}>{step.number}</span>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, i) => {
            const c = colorMap[step.color]
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-white/5 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className={`p-2.5 rounded-xl border ${c.iconBg}`}>
                    <Icon size={20} className={c.icon} aria-hidden="true" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 w-px bg-gradient-to-b ${c.line} min-h-[20px]`} aria-hidden="true" />
                  )}
                </div>
                <div className="pb-1 min-w-0">
                  <span className={`text-xs font-black uppercase tracking-widest ${c.num}`}>Step {step.number}</span>
                  <h3 className="text-white font-bold text-base mt-0.5 mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
