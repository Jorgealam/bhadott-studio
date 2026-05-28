import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Paintbrush, Headphones, Box, Github, Instagram, Linkedin, Youtube, Plus } from "lucide-react"
import { teamMain, teamPlaceholders } from "../data/team"

const placeholderIconMap = { Code2, Paintbrush, Headphones, Box }

function MemberCard({ member, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.6 }}
      className="group relative w-full"
    >
      <div
        className="relative p-6 sm:p-8 rounded-3xl text-center overflow-hidden border transition-all duration-400 backdrop-blur-sm h-full"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.03))",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 0%, ${member.accentColor.replace("0.3", "0.07")}, transparent 65%)` }}
          aria-hidden="true"
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(to right, transparent, ${member.accentColor}, transparent)` }}
          aria-hidden="true"
        />

        {/* Avatar */}
        <div className="relative mx-auto mb-5 w-20 h-20 sm:w-24 sm:h-24">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 320 }}
            className="w-full h-full rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-white cursor-default"
            style={{
              background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
              boxShadow: `0 0 28px ${member.accentColor.replace("0.3", "0.35")}`,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {member.initials}
          </motion.div>
          {/* Online indicator */}
          <div
            className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2"
            style={{ borderColor: "#020617", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
          />
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-50 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})` }}
            aria-hidden="true"
          />
        </div>

        <h3
          className="text-white font-black text-lg sm:text-xl mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {member.name}
        </h3>
        <p className="text-sm font-semibold mb-3" style={{ color: member.gradientFrom }}>
          {member.role}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 px-1">{member.description}</p>

        {/* Social links */}
        <div className="flex justify-center gap-2.5">
          {[
            { key: "linkedin",  icon: Linkedin,  label: "LinkedIn",  hover: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/8" },
            { key: "github",    icon: Github,    label: "GitHub",    hover: "hover:text-slate-200 hover:border-white/25 hover:bg-white/8" },
            { key: "instagram", icon: Instagram, label: "Instagram", hover: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/8" },
            { key: "youtube",   icon: Youtube,   label: "YouTube",   hover: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8" },
          ].map(({ key, icon: Icon, label, hover }) =>
            member.social[key] ? (
              <motion.a
                key={key}
                href={member.social[key]}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl border border-white/8 text-slate-500 transition-all touch-target flex items-center justify-center focus-ring ${hover}`}
                style={{ background: "rgba(255,255,255,0.03)" }}
                aria-label={`${label} — ${member.name}`}
              >
                <Icon size={15} aria-hidden="true" />
              </motion.a>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="equipe" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} aria-hidden="true" />
      <div
        className="absolute top-0 right-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-badge text-violet-400 bg-violet-500/8 border border-violet-500/20">
            The Team
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            BHADOTT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Team
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg px-2">
            Talented people building the digital future of the studio.
          </p>
        </motion.div>

        {/* Main team cards — 1 col mobile, 2 cols sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10 max-w-2xl mx-auto">
          {teamMain.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Placeholder positions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {teamPlaceholders.map((p, i) => {
            const Icon = placeholderIconMap[p.icon] || Plus
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.09, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`group p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${p.gradient} border border-white/6 text-center transition-all duration-300 hover:border-white/12`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/4 border border-dashed border-white/15 flex items-center justify-center mx-auto mb-3 group-hover:border-white/25 transition-colors">
                  <Icon size={19} className="text-slate-500 group-hover:text-slate-400 transition-colors" aria-hidden="true" />
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm mb-1">{p.role}</div>
                <div className="text-slate-600 text-xs hidden sm:block">{p.description}</div>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-700 group-hover:text-slate-600 transition-colors">
                  <Plus size={9} aria-hidden="true" />
                  <span>Coming soon</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
