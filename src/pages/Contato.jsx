// ============================================================
// BHADOTT Studio — Contato Page
// src/pages/Contato.jsx
// Front-end only — formulário visual sem back-end
// ============================================================

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Send, MessageCircle, Mail, Instagram,
  Github, Youtube, CheckCircle2, MapPin, Clock
} from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"

const subjects = [
  "Parceria / Colaboração",
  "Discussão de Projeto",
  "Suporte",
  "Dúvida Geral",
  "Imprensa / Mídia",
  "Outro",
]

const socials = [
  { label: "WhatsApp",  icon: MessageCircle, href: "https://wa.me/5500000000000",          color: "#22c55e" },
  { label: "E-mail",    icon: Mail,          href: "mailto:contact@bhadott.studio",         color: "#60a5fa" },
  { label: "Instagram", icon: Instagram,     href: "https://instagram.com/bhadottstudio",   color: "#f472b6" },
  { label: "GitHub",    icon: Github,        href: "https://github.com/jorgealam",          color: "#a5b4fc" },
  { label: "YouTube",   icon: Youtube,       href: "https://youtube.com/@bhadottstudio",    color: "#f87171" },
]

const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e2e8f0",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s",
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default function Contato() {
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, margin: "-40px" })
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = "Nome é obrigatório."
    if (!form.email.trim())   e.email   = "E-mail é obrigatório."
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail inválido."
    if (!form.message.trim()) e.message = "Mensagem não pode estar vazia."
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    // Front-end only: simula envio
    // Fase back-end: substituir por fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    setTimeout(() => setSent(true), 400)
  }

  const onFocus = (e) => { e.target.style.borderColor = "rgba(59,130,246,0.4)" }
  const onBlur  = (e, err) => { e.target.style.borderColor = err ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)" }

  return (
    <PageLayout backLabel="Voltar para Home" backTo="/">
      <PageHero
        badge="Contato"
        title="Fale com o"
        titleGrad="BHADOTT Studio"
        subtitle="Tem um projeto, ideia ou oportunidade de parceria? Todas as mensagens são lidas pessoalmente."
      />

      <GlowDivider color="violet" />

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />

        <div ref={formRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="lg:col-span-2"
            >
              <h2
                className="text-xl font-black text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                BHADOTT Studio
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Estúdio independente de tecnologia criativa baseado no Brasil. Construímos games, sistemas de IA, plataformas SaaS e ferramentas digitais.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <MapPin size={14} className="text-blue-400" aria-hidden="true" />
                  </div>
                  Brasil — Estúdio Remoto
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Clock size={14} className="text-violet-400" aria-hidden="true" />
                  </div>
                  GMT-3 / Brasília · Seg–Sex 9h–18h
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Mail size={14} className="text-blue-400" aria-hidden="true" />
                  </div>
                  contact@bhadott.studio
                </div>
              </div>

              {/* WhatsApp destaque */}
              <motion.a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(34,197,94,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl font-semibold text-sm text-white mb-6 transition-all"
                style={{
                  background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#4ade80",
                  boxShadow: "0 0 12px rgba(34,197,94,0.1)",
                }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chamar no WhatsApp
                <span className="ml-auto text-xs opacity-60">Resposta rápida</span>
              </motion.a>

              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">Nossas redes</p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl border border-white/8 text-slate-500 hover:border-white/20 transition-all touch-target flex items-center justify-center focus-ring"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        aria-label={s.label}
                        title={s.label}
                      >
                        <Icon size={15} aria-hidden="true" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl border border-green-500/15"
                  style={{ background: "rgba(34,197,94,0.04)" }}
                >
                  <CheckCircle2 size={48} className="text-green-400 mb-4" aria-hidden="true" />
                  <h3
                    className="text-2xl font-black text-white mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Mensagem enviada!
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-xs">
                    Retornaremos em até 24 horas úteis. Obrigado por entrar em contato com o BHADOTT Studio.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: subjects[0], message: "" }) }}
                    className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-6 sm:p-8 rounded-2xl border border-white/6 space-y-5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Seu Nome" error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jorge Alam"
                        style={{ ...inputStyle, borderColor: errors.name ? "rgba(239,68,68,0.4)" : undefined }}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, errors.name)}
                      />
                    </FormField>

                    <FormField label="Endereço de E-mail" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="voce@email.com"
                        style={{ ...inputStyle, borderColor: errors.email ? "rgba(239,68,68,0.4)" : undefined }}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, errors.email)}
                      />
                    </FormField>
                  </div>

                  <FormField label="Assunto">
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={onFocus}
                      onBlur={(e) => onBlur(e, null)}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Mensagem" error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Conte sobre seu projeto, ideia ou dúvida..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        borderColor: errors.message ? "rgba(239,68,68,0.4)" : undefined,
                      }}
                      onFocus={onFocus}
                      onBlur={(e) => onBlur(e, errors.message)}
                    />
                  </FormField>

                  <p className="text-slate-700 text-xs">
                    Este formulário é apenas para contato. Nenhum dado é armazenado — as mensagens são enviadas diretamente para nossa caixa de entrada.
                  </p>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 font-bold text-white rounded-xl text-sm"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 18px rgba(59,130,246,0.3)" }}
                  >
                    <Send size={15} aria-hidden="true" />
                    Enviar Mensagem
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
