# BHADOTT Studio — Brand Guide v1.0

> Documento oficial de identidade visual e diretrizes da marca.
> Última atualização: 2026

---

## 1. Nome Oficial

| Campo | Valor |
|---|---|
| Nome completo | **BHADOTT Studio** |
| Nome curto | **BHADOTT** |
| Monograma | **BS** |
| Repositório | `bhadott-studio` |
| Domínio futuro | `bhadott.studio` |

### ❌ Formas incorretas — nunca usar
- ~~BHADOTT Remote Studios~~
- ~~BHADOTT Remote Studio~~
- ~~Bhadott Studio~~
- ~~bhadott~~
- ~~Badott~~

---

## 2. Tagline

**Primária:** Games · AI · Creative Technology

**Secundária:** Built in Brazil — reaching the world.

**Uso SEO:** BHADOTT Studio — Games, AI & Creative Technology

---

## 3. Paleta de Cores

### Cores primárias
| Nome | Hex | Uso |
|---|---|---|
| Background Dark | `#020617` | Fundo principal |
| Blue Neon | `#3b82f6` | Cor principal de destaque |
| Violet Tech | `#8b5cf6` | Cor secundária de destaque |
| Blue Light | `#60a5fa` | Texto, ícones |
| Violet Light | `#a78bfa` | Texto secundário, badges |

### Cores de texto
| Nome | Hex | Uso |
|---|---|---|
| White Primary | `#ffffff` | Headlines |
| Slate 300 | `#cbd5e1` | Texto principal |
| Slate 400 | `#94a3b8` | Texto secundário |
| Slate 500 | `#64748b` | Texto terciário |
| Slate 600 | `#475569` | Texto muito suave |

### Gradientes oficiais
```
Primário:    linear-gradient(135deg, #3b82f6, #7c3aed)
Título:      linear-gradient(135deg, #93c5fd 0%, #ffffff 40%, #c4b5fd 100%)
Texto brand: linear-gradient(135deg, #60a5fa, #a78bfa)
Glow blue:   radial-gradient(circle, rgba(59,130,246,0.X), transparent)
Glow violet: radial-gradient(circle, rgba(139,92,246,0.X), transparent)
```

---

## 4. Tipografia

### Fontes oficiais
| Fonte | Uso | Pesos |
|---|---|---|
| **Space Grotesk** | Headlines, títulos, marca | 500, 600, 700, 900 |
| **Inter** | Corpo de texto, UI | 400, 500, 600, 700, 800 |

### Hierarquia de texto
```
h1 (Hero):   6xl–7xl / Space Grotesk 900
h2 (Seção):  4xl–5xl / Space Grotesk 900
h3 (Card):   lg–xl   / Space Grotesk 700
Body:        base–lg / Inter 400–500
Small:       xs–sm   / Inter 400
Badge/Label: xs      / Inter 600 / tracking-widest uppercase
```

### Regras tipográficas
- Headlines sempre em **Space Grotesk**
- Nunca usar font-weight abaixo de 400
- Tracking widest (`letter-spacing: 0.1em+`) apenas em badges e labels uppercase
- Evitar textos longos em maiúsculas

---

## 5. Logo e Símbolo

### Símbolo principal
- Hexágono geométrico com letra **B** ou monograma **BS**
- Gradiente de `#60a5fa` para `#a78bfa`
- Fundo: `#020617`
- Bordas arredondadas: `rx=7` (para quadrado 32px)

### Variações de logo aprovadas
| Variação | Uso |
|---|---|
| Símbolo + "BHADOTT" + "Studio" | Header desktop |
| Símbolo + "BHADOTT" | Header mobile compacto |
| Apenas símbolo (BS) | Favicon, ícones pequenos |
| Texto "BHADOTT STUDIO" | Impressos, apresentações |

### Regras do logo
- Nunca distorcer proporções
- Nunca aplicar em fundos claros sem adaptação
- Manter espaço mínimo ao redor = altura do símbolo × 0.5
- Cores do logo nunca em cinza ou preto puro

---

## 6. Tom de Voz

### Personalidade da marca
- **Premium** — transmite qualidade e profissionalismo
- **Técnico** — demonstra competência e profundidade técnica
- **Criativo** — inspira e inova
- **Conciso** — direto ao ponto, sem excessos

### Exemplos de tom aprovado
✅ "Building Digital Experiences."
✅ "Games, AI & Creative Technology."
✅ "Built in Brazil — reaching the world."
✅ "Premium digital solutions for ambitious projects."

### Tom a evitar
❌ Linguagem genérica ("somos os melhores")
❌ Exageros sem substância ("revolucionário", "disruptivo")
❌ Tom corporativo formal excessivo
❌ Gírias ou informalidade extrema

---

## 7. Estética Visual

### Estilo geral
- **Dark mode exclusivo** — fundo `#020617`
- **Glassmorphism suave** — `bg-white/5 backdrop-blur-xl`
- **Neon sutil** — glows discretos, nunca exagerados
- **Animações cinematográficas** — lentas, elegantes
- **Minimalismo premium** — espaço em branco generoso

### Elementos visuais aprovados
- Gradientes azul/violeta (nunca saturados demais)
- Grids cyber subtis (opacidade < 3%)
- Partículas flutuantes discretas (mobile: desativadas)
- Hexágonos e formas geométricas
- Linhas de scan diagonais (muito suaves)
- Bordas neon em hover
- Glow em elementos interativos

### Elementos visuais proibidos
- ❌ Fundos brancos ou muito claros
- ❌ Animações rápidas e "agitadas"
- ❌ Cores saturadas sem contexto (amarelo, vermelho brilhante)
- ❌ Gradientes muito coloridos (arco-íris)
- ❌ Sombras pesadas e realistas
- ❌ Bordas grossas sem propósito

---

## 8. Componentes UI

### Botões
```
Primário:   gradient(135deg, #3b82f6, #7c3aed) + glow azul
Secundário: background rgba(255,255,255,0.04) + border rgba(255,255,255,0.1)
Hover:      scale(1.03-1.05) + glow mais intenso
Active:     scale(0.97)
Border-radius: rounded-xl (12px)
```

### Cards
```
Background: rgba(255,255,255,0.02) - rgba(255,255,255,0.05)
Border:     1px rgba(59,130,246,0.12) - rgba(139,92,246,0.18)
Border-radius: rounded-2xl (16px) ou rounded-3xl (24px)
Hover: translateY(-4px a -6px) + glow sutil no topo
Backdrop-filter: blur(12px)
```

### Badges/Pills
```
Background: rgba(cor,0.08-0.12)
Border:     1px rgba(cor,0.2-0.25)
Text:       cor clara (blue-400, violet-400)
Padding:    px-3 py-1 a px-4 py-1.5
Border-radius: rounded-full
Tracking:   widest (0.1em+) + uppercase
```

---

## 9. Seções do Site

| Seção | ID | Cor tema |
|---|---|---|
| Hero | `#inicio` | Azul |
| Sobre | `#sobre` | Azul → Violeta |
| Projetos | `#projetos` | Violeta |
| Serviços | `#servicos` | Azul |
| Processo | `#processo` | Violeta |
| Equipe | `#equipe` | Azul |
| Divisões | `#divisoes` | Azul/Violeta |
| Suporte | `#suporte` | Azul |
| CTA | — | Azul → Violeta |

---

## 10. Projetos da Marca

| Projeto | Categoria | Cor |
|---|---|---|
| BHADOTT Agro | SaaS / AgroTech | Azul / Ciano |
| BHADOTT Video | AI / Conteúdo | Violeta |
| BHADOTT Games | Games / 3D | Amarelo / Laranja |
| BHADOTT Tools | Ferramentas | Verde / Teal |
| BHADOTT Academy | Educação Digital | Cinza / Azul |

---

## 11. Estrutura do Projeto

```
src/
  components/    — componentes reutilizáveis
  pages/         — páginas da aplicação
  data/          — dados editáveis (projetos, serviços, equipe)
  index.css      — estilos globais

public/
  favicon.svg    — símbolo BS
  og-image.svg   — imagem OG (SVG fonte)
  og-image.png   — imagem OG (PNG para redes sociais)
  site.webmanifest

branding/
  brand-guide.md — este arquivo

scripts/
  convert-og.mjs    — converte SVG → PNG
  converter-og.html — conversor via browser
```

---

## 12. Deploy e URLs

| Ambiente | URL |
|---|---|
| GitHub Pages | `https://jorgealam.github.io/bhadott-studio/` |
| Domínio futuro | `https://bhadott.studio/` |
| Repositório | `https://github.com/jorgealam/bhadott-studio` |

### Comandos de deploy
```bash
npm run build    # gera dist/
npm run deploy   # build + gh-pages publish
npm run og       # gera og-image.png
```

---

*© 2026 BHADOTT Studio — Todos os direitos reservados.*
