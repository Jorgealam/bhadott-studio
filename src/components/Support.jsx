import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { MessageCircle, Mail, Instagram, Headphones, Youtube, ChevronDown } from "lucide-react"
import { contactLinks, faq } from "../data/team"

const contactButtons = [
  { label: "WhatsApp",  icon: MessageCircle, grad: "from-green-500 to-emerald-600",  shadow: "rgba(34,197,94,0.25)",  href: "whatsapp" },
  { label: "E-mail",   icon: Mail,          grad: "from-blue-500 to-blue-600",       shadow: "rgba(59,130,246,0.25)", href: "email" },
  { label: "Instagram", icon: Instagram,    grad: "from-pink-500 to-rose-600",       shadow: "rgba(236,72,153,0.25)", href: "instagram" },
  { label: "YouTube",   icon: Youtube,      grad: "from-red-500 to-red-600",         shadow: "rgba(239,68,68,0.25)",  href: "youtube" },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden border border-white/6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors touch-target focus-ring"
        style={{ background: open ? "rgba(59,130,246,0.05)" : "rgba(255,255,255,0.02)" }}
        aria-expanded={open}
        aria-controls={`faq-${item.id}`}
        id={`faq-btn-${item.id}`}
      >
        <span className="text-white font-semibold text-sm leading-snug">{item.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-slate-500" aria-hidden="true">
          <ChevronDown size={17} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 text-slate-400 text-sm leading-relaxed border-t border-white/4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Support() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="suporte" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020617, #030e1c, #020617)" }} aria-hidden="true" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-blue-400 bg-blue-500/8 border border-blue-500/20">
            Support
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Support &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Contact
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Need to talk to BHADOTT? Reach out to ask questions, follow projects, request support or discuss new ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Contact channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <h3 className="text-white font-bold text-lg sm:text-xl mb-5">Contact Channels</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {contactButtons.map((btn) => {
                const Icon = btn.icon
                const href = contactLinks[btn.href] || "#"
                return (
                  <motion.a
                    key={btn.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${btn.grad} text-white text-center touch-target focus-ring transition-all`}
                    style={{ boxShadow: `0 4px 20px ${btn.shadow}` }}
                    aria-label={btn.label}
                  >
                    <Icon size={22} aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-semibold leading-tight">{btn.label}</span>
                  </motion.a>
                )
              })}
            </div>

            {/* Hours card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-2xl border border-blue-500/12"
              style={{ background: "rgba(59,130,246,0.04)" }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/12 border border-blue-500/20 flex-shrink-0 mt-0.5">
                  <Headphones size={14} className="text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Support Hours</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Monday to Friday, 9am–6pm (GMT-3 / Brasília). Email responses within 24 business hours.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55 }}
            id="contato"
          >
            <h3 className="text-white font-bold text-lg sm:text-xl mb-5">FAQ</h3>
            <div className="space-y-2.5">
              {faq.map((item) => (
                <FAQItem key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
