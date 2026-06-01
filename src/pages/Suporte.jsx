// ============================================================
// BHADOTT Studio — Suporte Page
// src/pages/Suporte.jsx
// ============================================================

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  MessageCircle, Mail, Instagram, Youtube,
  Headphones, ChevronDown, ArrowRight
} from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"

const faqItems = [
  {
    id: 1,
    question: "Is BHADOTT Studio currently accepting clients or partners?",
    answer:
      "Yes — we are in active structuring and already evaluate partnerships, collaborations and custom projects. Reach out via the contact page or WhatsApp to start a conversation.",
  },
  {
    id: 2,
    question: "Which projects are currently active?",
    answer:
      "BHADOTT Agro is in core development. BHADOTT Games has active prototypes running. BHADOTT Tools is live internally. BHADOTT Video and Academy are in planning and architecture phases.",
  },
  {
    id: 3,
    question: "What does BHADOTT Studio specialize in?",
    answer:
      "Games (Unreal Engine, Blender), AI systems, SaaS platforms, mobile apps, automation tools and creative digital experiences. We work across the full spectrum of digital product development.",
  },
  {
    id: 4,
    question: "Can I follow the development of the projects?",
    answer:
      "Yes. Follow our GitHub, Instagram and YouTube for updates. We document our process publicly and share progress on all active projects.",
  },
  {
    id: 5,
    question: "How long does it take to get a response?",
    answer:
      "We respond within 24 business hours via email. WhatsApp and Instagram messages are typically answered same-day during business hours (Mon–Fri, 9am–6pm GMT-3).",
  },
  {
    id: 6,
    question: "Does the site have a login or admin panel?",
    answer:
      "Not yet — the front-end is live but the back-end, authentication and admin systems are planned for a future phase. The studio is building these incrementally.",
  },
  {
    id: 7,
    question: "Can the site be self-hosted or white-labeled?",
    answer:
      "The current site is open-source on GitHub. You're welcome to fork and adapt it. Licensing details are in the repository.",
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden border border-white/6 transition-colors hover:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left transition-colors touch-target focus-ring"
        style={{ background: open ? "rgba(59,130,246,0.05)" : "rgba(255,255,255,0.02)" }}
        aria-expanded={open}
        id={`faq-btn-${item.id}`}
      >
        <span className="text-white font-semibold text-sm leading-snug">{item.question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 text-slate-600"
          aria-hidden="true"
        >
          <ChevronDown size={17} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
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

const channels = [
  { label: "WhatsApp",  icon: MessageCircle, href: "https://wa.me/5500000000000",            grad: "from-green-500 to-emerald-600", shadow: "rgba(34,197,94,0.25)"  },
  { label: "E-mail",    icon: Mail,          href: "mailto:contact@bhadott.studio",           grad: "from-blue-500 to-blue-600",    shadow: "rgba(59,130,246,0.25)" },
  { label: "Instagram", icon: Instagram,     href: "https://instagram.com/bhadottstudio",    grad: "from-pink-500 to-rose-600",    shadow: "rgba(236,72,153,0.25)" },
  { label: "YouTube",   icon: Youtube,       href: "https://youtube.com/@bhadottstudio",     grad: "from-red-500 to-red-600",      shadow: "rgba(239,68,68,0.25)"  },
]

export default function Suporte() {
  const faqRef  = useRef(null)
  const isInView = useInView(faqRef, { once: true, margin: "-40px" })
  const navigate = useNavigate()

  return (
    <PageLayout backLabel="Back to Home" backTo="/">
      <PageHero
        badge="Support"
        title="Support &"
        titleGrad="Contact"
        subtitle="Reach out to BHADOTT Studio — we're here for questions, project discussions and partnership opportunities."
      />

      <GlowDivider color="blue" />

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        <div ref={faqRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left: Contact channels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
            >
              <h2
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contact Channels
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {channels.map((ch) => {
                  const Icon = ch.icon
                  return (
                    <motion.a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${ch.grad} text-white text-center touch-target focus-ring transition-all`}
                      style={{ boxShadow: `0 4px 20px ${ch.shadow}` }}
                      aria-label={ch.label}
                    >
                      <Icon size={22} aria-hidden="true" />
                      <span className="text-xs sm:text-sm font-semibold">{ch.label}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* Hours */}
              <div
                className="p-4 rounded-2xl border border-blue-500/12"
                style={{ background: "rgba(59,130,246,0.04)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/12 border border-blue-500/20 flex-shrink-0">
                    <Headphones size={14} className="text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Support Hours</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      Monday to Friday, 9am–6pm (GMT-3 / Brasília).<br />
                      Email responses within 24 business hours.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contato")}
                className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 font-bold text-white rounded-xl text-sm"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
              >
                Send a Message
                <ArrowRight size={15} aria-hidden="true" />
              </motion.button>
            </motion.div>

            {/* Right: FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              <h2
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-2.5">
                {faqItems.map((item) => (
                  <FAQItem key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
