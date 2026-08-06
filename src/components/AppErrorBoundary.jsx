import { Component } from "react"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default class AppErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("[BHADOTT] Falha inesperada na interface", error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="max-w-md w-full text-center rounded-3xl border border-amber-400/15 bg-amber-500/[0.035] p-8">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-amber-500/10 border border-amber-400/20 text-amber-300">
            <AlertTriangle size={24} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black text-white mt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Algo não carregou corretamente</h1>
          <p className="text-sm text-slate-400 leading-relaxed mt-3">Nenhum dado foi perdido. Você pode tentar recarregar a página ou retornar para o início do portal.</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-7">
            <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/8 text-sm font-bold text-slate-300 hover:text-white focus-ring">
              <RefreshCw size={15} aria-hidden="true" /> Recarregar
            </button>
            <a href="#/" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-sm font-bold text-white focus-ring">
              <Home size={15} aria-hidden="true" /> Ir para a Home
            </a>
          </div>
        </div>
      </main>
    )
  }
}
