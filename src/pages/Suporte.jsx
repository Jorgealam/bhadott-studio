// ============================================================
// BHADOTT Studio - Suporte Page
// src/pages/Suporte.jsx
// ============================================================

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  MessageCircle,
  Mail,
  Instagram,
  Youtube,
  Headphones,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"

const faqItems = [
  {
    id: 1,
    question: "A BHADOTT Studio está aceitando clientes ou parceiros?",
    answer:
      "Sim. A estrutura do estúdio segue em evolução, mas já analisamos parcerias, colaborações e projetos sob demanda. Você pode iniciar a conversa pela página de contato ou pelo WhatsApp.",
  },
  {
    id: 2,
    question: "Quais projetos estão ativos no momento?",
    answer:
      "BHADOTT Agro está em desenvolvimento principal. BHADOTT Games já possui protótipos ativos. BHADOTT Tools está em uso interno. BHADOTT Video e Academy seguem em planejamento e arquitetura.",
  },
  {
    id: 3,
    question: "Em que a BHADOTT Studio é especializada?",
    answer:
      "A BHADOTT Studio é um ecossistema de criação digital focado em sistemas, automações, IA local, jogos, conteúdo, design e ferramentas para desenvolvimento.",
  },
  {
    id: 4,
    question: "Posso acompanhar o desenvolvimento dos projetos?",
    answer:
      "Sim. GitHub, Instagram e YouTube concentram as atualizações públicas. A evolução dos projetos é compartilhada de forma progressiva, com transparência e documentação contínua.",
  },
  {
    id: 5,
    question: "Qual é o prazo médio de resposta?",
    answer:
      "As respostas por e-mail chegam em até 24 horas úteis. WhatsApp e Instagram costumam ter retorno no mesmo dia, durante o horário comercial de segunda a sexta, das 9h às 18h (GMT-3).",
  },
  {
    id: 6,
    question: "O site já tem login ou painel administrativo?",
    answer:
      "Ainda não. O front-end está publicado, enquanto autenticação, back-end e painel administrativo ficam para uma próxima fase de evolução.",
  },
  {
    id: 7,
    question: "O site pode ser usado como base para outro projeto?",
    answer:
      "O projeto está publicado no GitHub e pode servir como referência conforme os termos do repositório. Para adaptações maiores ou uso profissional, o ideal é alinhar o contexto primeiro.",
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/6 transition-colors hover:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="focus-ring touch-target flex w-full items-center justify-between gap-4 p-4 text-left transition-colors sm:p-5"
        style={{ background: open ? "rgba(59,130,246,0.05)" : "rgba(255,255,255,0.02)" }}
        aria-expanded={open}
        id={`faq-btn-${item.id}`}
      >
        <span className="text-sm font-semibold leading-snug text-white">{item.question}</span>
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
            <div className="border-t border-white/4 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-400 sm:px-5 sm:pb-5">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const channels = [
  { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/5500000000000", grad: "from-green-500 to-emerald-600", shadow: "rgba(34,197,94,0.25)" },
  { label: "E-mail", icon: Mail, href: "mailto:contact@bhadott.studio", grad: "from-blue-500 to-blue-600", shadow: "rgba(59,130,246,0.25)" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/bhadottstudio", grad: "from-pink-500 to-rose-600", shadow: "rgba(236,72,153,0.25)" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com/@bhadottstudio", grad: "from-red-500 to-red-600", shadow: "rgba(239,68,68,0.25)" },
]

export default function Suporte() {
  const faqRef = useRef(null)
  const isInView = useInView(faqRef, { once: true, margin: "-40px" })
  const navigate = useNavigate()

  return (
    <PageLayout backLabel="Voltar para a Home" backTo="/">
      <PageHero
        badge="Suporte"
        title="Suporte e"
        titleGrad="Contato"
        subtitle="Fale com a BHADOTT Studio para tirar dúvidas, discutir projetos e abrir conversas profissionais com clareza."
      />

      <GlowDivider color="blue" />

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        <div ref={faqRef} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
            >
              <h2
                className="mb-6 text-xl font-black text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Canais de contato
              </h2>

              <div className="mb-6 grid grid-cols-2 gap-3">
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
                      className={`focus-ring touch-target flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br ${ch.grad} p-4 text-center text-white transition-all sm:p-5`}
                      style={{ boxShadow: `0 4px 20px ${ch.shadow}` }}
                      aria-label={ch.label}
                    >
                      <Icon size={22} aria-hidden="true" />
                      <span className="text-xs font-semibold sm:text-sm">{ch.label}</span>
                    </motion.a>
                  )
                })}
              </div>

              <div
                className="rounded-2xl border border-blue-500/12 p-4"
                style={{ background: "rgba(59,130,246,0.04)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg border border-blue-500/20 bg-blue-500/12 p-2">
                    <Headphones size={14} className="text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-white">Horário de atendimento</h3>
                    <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                      Segunda a sexta, das 9h às 18h (GMT-3 / Brasília).
                      <br />
                      Respostas por e-mail em até 24 horas úteis.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contato")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
              >
                Enviar mensagem
                <ArrowRight size={15} aria-hidden="true" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              <h2
                className="mb-6 text-xl font-black text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Perguntas frequentes
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
