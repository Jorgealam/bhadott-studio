// ============================================================
// BHADOTT Studio — Sobre Page FASE 3
// src/pages/Sobre.jsx — Glassmorphism Premium
// ============================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Target, Eye, Heart, Code2,
  Gamepad2, Bot, Wrench, ArrowRight, CheckCircle2
} from "lucide-react"
import PageLayout, { PageHero, GlowDivider } from "../components/PageLayout"

// ── Dados ────────────────────────────────────────────────────
const mvv = [
  {
    icon: Target,
    label: "Missão",
    color: "blue",
    text: "Construir soluções digitais acessíveis, modernas e funcionais — transformando ideias em produtos reais que geram impacto.",
  },
  {
    icon: Eye,
    label: "Visão",
    color: "violet",
    text: "Ser um estúdio de referência no desenvolvimento de sistemas, jogos e soluções com IA, reconhecido pela qualidade e inovação.",
  },
  {
    icon: Heart,
    label: "Valores",
    color: "blue",
    list: ["Compromisso com a entrega", "Transparência total", "Evolução contínua", "Qualidade acima da quantidade"],
  },
]

const colorMap = {
  blue: {
    icon:     "text-blue-400",
    iconBg:   "bg-blue-500/10 border-blue-500/20",
    glow:     "rgba(59,130,246,0.09)",
    topLine:  "rgba(59,130,246,0.55)",
    border:   "rgba(59,130,246,0.18)",
  },
  violet: {
    icon:     "text-violet-400",
    iconBg:   "bg-violet-500/10 border-violet-500/20",
    glow:     "rgba(139,92,246,0.09)",
    topLine:  "rgba(139,92,246,0.55)",
    border:   "rgba(139,92,246,0.18)",
  },
}

const areas = [
  { icon: Code2,    label: "Sistemas & SaaS",        desc: "Plataformas web, apps desktop e sistemas de gestão para negócios reais.", color: "blue"   },
  { icon: Bot,      label: "Inteligência Artificial", desc: "Automações, modelos locais e integração de IA nos fluxos de desenvolvimento.", color: "violet" },
  { icon: Gamepad2, label: "Desenvolvimento de Jogos",desc: "Jogos originais em Godot e Unreal Engine com identidade visual única.", color: "blue"   },
  { icon: Wrench,   label: "Ferramentas & Automação", desc: "Utilitários internos, scripts e pipelines para produtividade máxima.", color: "violet" },
]

const team = [
  {
    initials: "JA",
    name: "Jorge Alam",
    role: "Fundador & Criador de Projetos",
    bio: "Responsável pela visão dos projetos, arquitetura dos sistemas e direção criativa do estúdio.",
    gradFrom: "#3b82f6",
    gradTo:   "#7c3aed",
    accent:   "rgba(59,130,246,0.3)",
  },
]

const differentials = [
  "Projetos com foco em uso real, não apenas portfólio",
  "Documentação pública do processo de desenvolvimento",
  "Stack moderna e escolhas técnicas justificadas",
  "Identidade visual coesa em todos os produtos",
  "Crescimento orgânico — sem inflacionar o escopo",
  "Feito no Brasil com padrão internacional",
]

// ── Componentes ───────────────────────────────────────────────
function SectionTitle({ badge, title, grad, subtitle, isInView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-12 sm:mb-14"
    >
      {badge && (
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-widest text-blue-400 mb-4"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)" }}
        >
          {badge}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}{" "}
        {grad && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
            {grad}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">{subtitle}</p>
      )}
    </motion.div>
  )
}

// Card glassmorphism base
function GlassCard({ children, className = "", color = "blue", index = 0, isInView, style = {} }) {
  const c = colorMap[color]
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-350 ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${c.border}`,
        ...style,
      }}
    >
      {/* Glow hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 70%)` }}
        aria-hidden="true"
      />
      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${c.topLine}, transparent)` }}
        aria-hidden="true"
      />
      {/* Shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)" }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  )
}

export default function Sobre() {
  const mvvRef   = useRef(null)
  const areasRef = useRef(null)
  const whyRef   = useRef(null)
  const teamRef  = useRef(null)

  const mvvInView   = useInView(mvvRef,   { once: true, margin: "-50px" })
  const areasInView = useInView(areasRef, { once: true, margin: "-50px" })
  const whyInView   = useInView(whyRef,   { once: true, margin: "-50px" })
  const teamInView  = useInView(teamRef,  { once: true, margin: "-50px" })

  const navigate = useNavigate()

  return (
    <PageLayout backLabel="Voltar para Home" backTo="/">
      <PageHero
        badge="Sobre o Estúdio"
        title="Quem é o"
        titleGrad="BHADOTT Studio"
        subtitle="Um estúdio independente focado em sistemas, inteligência artificial, jogos e automações. Construído no Brasil com visão global."
      />

      <GlowDivider color="blue" />

      {/* ── Missão / Visão / Valores ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden" ref={mvvRef}>
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Identidade"
            title="Missão, Visão"
            grad="e Valores"
            subtitle="Os pilares que guiam cada decisão técnica e criativa do estúdio."
            isInView={mvvInView}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {mvv.map((item, i) => {
              const Icon = item.icon
              const c = colorMap[item.color]
              return (
                <GlassCard key={item.label} color={item.color} index={i} isInView={mvvInView} className="p-6 sm:p-7">
                  <div className={`relative inline-flex p-3 rounded-xl border ${c.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={c.icon} aria-hidden="true" />
                  </div>
                  <h3
                    className="relative text-white font-black text-lg mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.label}
                  </h3>
                  {item.text && (
                    <p className="relative text-slate-400 text-sm leading-relaxed">{item.text}</p>
                  )}
                  {item.list && (
                    <ul className="relative space-y-2.5">
                      {item.list.map((v) => (
                        <li key={v} className="flex items-center gap-2.5 text-slate-300 text-sm">
                          <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider color="mixed" />

      {/* ── Áreas de Atuação ── */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        ref={areasRef}
        style={{ background: "linear-gradient(to bottom, #020617, #030d1c, #020617)" }}
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="O que fazemos"
            title="Áreas de"
            grad="Atuação"
            subtitle="Quatro frentes de desenvolvimento — cada uma com foco, stack e objetivos claros."
            isInView={areasInView}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {areas.map((area, i) => {
              const Icon = area.icon
              const c = colorMap[area.color]
              return (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  animate={areasInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group flex gap-4 p-5 sm:p-6 rounded-2xl transition-all duration-350 overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1px solid ${c.border}`,
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 50%, ${c.glow}, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  <div className={`relative p-3 rounded-xl border ${c.iconBg} flex-shrink-0 self-start group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={c.icon} aria-hidden="true" />
                  </div>
                  <div className="relative">
                    <h3
                      className="text-white font-bold text-base mb-1.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {area.label}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{area.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      {/* ── Por que BHADOTT ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden" ref={whyRef}>
        <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06), rgba(139,92,246,0.04), transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge="Diferenciais" title="Por que" grad="BHADOTT Studio?" isInView={whyInView} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {differentials.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-3 p-4 sm:p-5 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(59,130,246,0.03)",
                  border: "1px solid rgba(59,130,246,0.10)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.07)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.22)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.03)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.10)" }}
              >
                <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="blue" />

      {/* ── Equipe ── */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        ref={teamRef}
        style={{ background: "linear-gradient(to bottom, #020617, #030c1e, #020617)" }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="A Equipe"
            title="Quem está"
            grad="construindo"
            subtitle="Equipe pequena, comprometida e em crescimento constante."
            isInView={teamInView}
          />

          <div className="flex justify-center">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 32 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 sm:p-10 rounded-3xl text-center overflow-hidden w-full max-w-xs transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${member.accent.replace("0.3", "0.2")}`,
                }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${member.accent.replace("0.3","0.1")}, transparent 65%)` }}
                  aria-hidden="true"
                />
                {/* Top line */}
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-px transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(to right, transparent, ${member.accent.replace("0.3","0.6")}, transparent)`,
                    opacity: 0.5,
                  }}
                  aria-hidden="true"
                />
                {/* Top line hover */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to right, transparent, ${member.accent.replace("0.3","0.8")}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Avatar */}
                <div className="relative mx-auto mb-6 w-24 h-24">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-3xl font-black text-white group-hover:scale-105 transition-transform duration-400"
                    style={{
                      background: `linear-gradient(135deg, ${member.gradFrom}, ${member.gradTo})`,
                      boxShadow: `0 0 28px ${member.accent.replace("0.3","0.4")}, 0 0 60px ${member.accent.replace("0.3","0.15")}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {member.initials}
                  </div>
                  {/* Online dot */}
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2"
                    style={{ borderColor: "#020617", boxShadow: "0 0 8px rgba(74,222,128,0.7)" }}
                  />
                  {/* Blur glow behind avatar */}
                  <div
                    className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-55 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${member.gradFrom}, ${member.gradTo})` }}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  className="relative text-white font-black text-xl mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {member.name}
                </h3>
                <p
                  className="relative text-sm font-semibold mb-4"
                  style={{ color: member.gradFrom }}
                >
                  {member.role}
                </p>
                <p className="relative text-slate-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          {/* Vagas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-slate-600 text-sm mb-3">
              A equipe está crescendo — vagas futuras abertas para colaboradores.
            </p>
            <button
              onClick={() => navigate("/contato")}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold group"
            >
              Fazer parte do estúdio
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section
        className="relative py-20 sm:py-24 text-center overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.07), rgba(139,92,246,0.05), transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-2xl mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Pronto para construir algo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              juntos?
            </span>
          </h2>
          <p className="text-slate-400 mb-10 text-base sm:text-lg leading-relaxed">
            Fale com o BHADOTT Studio para projetos, parcerias ou só para acompanhar o desenvolvimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contato")}
              className="relative overflow-hidden px-8 py-4 font-bold text-white rounded-xl text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)", boxShadow: "0 0 20px rgba(59,130,246,0.35)" }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <span className="relative">Entrar em Contato</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)", boxShadow: "0 0 16px rgba(59,130,246,0.1)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/projetos")}
              className="px-8 py-4 font-semibold text-slate-300 rounded-xl text-sm hover:text-white transition-all flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Ver Projetos
              <ArrowRight size={15} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
