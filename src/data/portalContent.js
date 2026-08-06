import {
  BookMarked,
  Bot,
  Boxes,
  Calculator,
  Code2,
  Download,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Library,
  MessageSquareText,
  Music,
  Newspaper,
  Palette,
  PlayCircle,
  ScrollText,
  Search,
  Sparkles,
  Tags,
  Trophy,
  WandSparkles,
  Wrench,
} from "lucide-react"

export const portalContent = {
  games: {
    eyebrow: "Universo gamer",
    intro: "Um ponto de encontro para descobrir oportunidades, acompanhar lançamentos e conhecer os jogos criados pelo estúdio.",
    sections: [
      { icon: Tags, title: "Promoções", description: "Ofertas selecionadas em lojas confiáveis, com preço e validade claros." },
      { icon: Trophy, title: "Jogos grátis", description: "Campanhas temporárias, free-to-play e jogos que valem conhecer." },
      { icon: Newspaper, title: "Lançamentos", description: "Calendário e destaques dos títulos mais interessantes para a comunidade." },
      { icon: Search, title: "Reviews", description: "Análises honestas, objetivas e organizadas por plataforma e gênero." },
      { icon: PlayCircle, title: "Trailers e vídeos", description: "Conteúdo em vídeo, gameplays e seleções do canal BHADOTT." },
      { icon: Gamepad2, title: "Game dev", description: "Bastidores, testes e progresso dos jogos desenvolvidos pelo estúdio." },
    ],
    next: ["Definir fontes confiáveis para promoções", "Criar modelo de página de jogo", "Publicar o primeiro dev log"],
  },
  ia: {
    eyebrow: "Inteligência aplicada",
    intro: "Conteúdo prático para usar inteligência artificial com propósito, segurança e resultados reais.",
    sections: [
      { icon: Bot, title: "Assistentes de IA", description: "ChatGPT, Claude, Gemini e outras ferramentas explicadas sem complicação." },
      { icon: WandSparkles, title: "Prompts", description: "Biblioteca organizada de instruções reutilizáveis para trabalho e criação." },
      { icon: Boxes, title: "Automações", description: "Fluxos que conectam ferramentas e reduzem tarefas repetitivas." },
      { icon: Palette, title: "Imagem e design", description: "Geração visual, edição, conceitos e uso responsável de referências." },
      { icon: Music, title: "Áudio e vídeo", description: "Ferramentas para música, voz, vídeo e produção multimídia." },
      { icon: Code2, title: "Projetos", description: "Experimentos, aplicações locais e soluções criadas pelo BHADOTT." },
    ],
    next: ["Organizar diretório de ferramentas", "Criar biblioteca inicial de prompts", "Documentar automações do estúdio"],
  },
  musica: {
    eyebrow: "Som e criação",
    intro: "Um espaço para trilhas, experiências autorais e novas formas de produzir música com tecnologia.",
    sections: [
      { icon: Music, title: "Trilhas", description: "Músicas para jogos, vídeos, projetos e experiências do ecossistema." },
      { icon: Sparkles, title: "IA musical", description: "Testes, processos e reflexões sobre ferramentas de composição assistida." },
      { icon: ScrollText, title: "Letras", description: "Composições, rascunhos e histórias por trás de cada criação." },
      { icon: PlayCircle, title: "YouTube", description: "Lançamentos, visualizers, bastidores e playlists do estúdio." },
      { icon: Boxes, title: "Projetos", description: "Álbuns, trilhas temáticas e colaborações em desenvolvimento." },
      { icon: Download, title: "Downloads", description: "Materiais disponibilizados com licença e condições de uso claras." },
    ],
    next: ["Organizar catálogo de trilhas", "Definir identidade da área musical", "Preparar primeiro lançamento"],
  },
  catolico: {
    eyebrow: "Fé e conhecimento",
    intro: "Uma área construída com respeito, clareza e fontes responsáveis para apoiar estudo, oração e vida cristã.",
    sections: [
      { icon: BookMarked, title: "Liturgia", description: "Leituras e referências organizadas para acompanhar o calendário litúrgico." },
      { icon: HeartHandshake, title: "Orações", description: "Coleção acessível por intenção, momento e tradição." },
      { icon: Sparkles, title: "Santo do dia", description: "Biografias curtas com contexto histórico e espiritual." },
      { icon: ScrollText, title: "Estudos", description: "Textos formativos com indicação clara de autoria e referências." },
      { icon: GraduationCap, title: "Catecismo", description: "Índice de estudo e apoio para localizar temas com facilidade." },
      { icon: Library, title: "Biblioteca", description: "Documentos, livros em domínio público e fontes oficiais selecionadas." },
    ],
    next: ["Definir política de fontes e revisão", "Criar calendário editorial", "Preparar estrutura da biblioteca"],
  },
  academy: {
    eyebrow: "Aprendizado aplicado",
    intro: "Trilhas de estudo construídas a partir de projetos reais, com progresso claro e materiais reutilizáveis.",
    sections: [
      { icon: Code2, title: "Programação", description: "Web, sistemas, fundamentos e desenvolvimento orientado a projetos." },
      { icon: Boxes, title: "Blender e 3D", description: "Modelagem, materiais, iluminação, render e integração com jogos." },
      { icon: Gamepad2, title: "Game development", description: "Godot, Unreal, design, prototipagem e publicação." },
      { icon: Bot, title: "Inteligência Artificial", description: "Uso prático de IA, automações e construção de ferramentas." },
      { icon: Wrench, title: "Tecnologia no Agro", description: "Soluções digitais, organização de dados e desafios do campo." },
      { icon: MessageSquareText, title: "Cursos e guias", description: "Conteúdo organizado por nível, objetivo e tempo disponível." },
    ],
    next: ["Definir primeira trilha gratuita", "Criar padrão para aulas e exercícios", "Organizar materiais já produzidos"],
  },
  ferramentas: {
    eyebrow: "Utilidade imediata",
    intro: "Pequenos recursos digitais para resolver tarefas comuns com rapidez, privacidade e uma interface simples.",
    sections: [
      { icon: Calculator, title: "Calculadoras", description: "Ferramentas para finanças, produção, medidas e planejamento." },
      { icon: Wrench, title: "Conversores", description: "Unidades, formatos, textos e dados em poucos passos." },
      { icon: Code2, title: "Scripts", description: "Automatizações pequenas com explicação e forma segura de uso." },
      { icon: Palette, title: "Recursos criativos", description: "Geradores, referências, paletas e apoio para produção visual." },
      { icon: Download, title: "Templates", description: "Modelos organizados para projetos, documentos e planejamento." },
      { icon: Boxes, title: "Utilitários", description: "Ferramentas independentes que funcionam direto pelo navegador." },
    ],
    next: ["Escolher as três primeiras ferramentas", "Criar padrão de privacidade", "Preparar catálogo pesquisável"],
  },
}

export function getPortalContent(areaId) {
  return portalContent[areaId]
}
