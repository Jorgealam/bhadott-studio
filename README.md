# BHADOTT Studio

Portal e estúdio remoto para projetos, sistemas, automações, games, inteligência artificial, música, educação, agro e ferramentas digitais.

## Desenvolvimento local

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

O projeto usa React, Vite, Tailwind CSS, React Router e Framer Motion.

## Build

```bash
npm run build
npm run preview
```

O resultado é gerado em `dist/`. As páginas são carregadas sob demanda para reduzir o JavaScript inicial.

## API do BHADOTT Agro

O front-end procura a variável:

```text
VITE_AGRO_API_URL=https://seu-worker.workers.dev
```

Em desenvolvimento, copie `.env.example` para `.env.local` e preencha a URL. O arquivo local é ignorado pelo Git.

No GitHub, cadastre `VITE_AGRO_API_URL` em **Settings → Secrets and variables → Actions**. O workflow de deploy injeta esse valor somente durante o build.

O Worker e sua configuração ficam em `workers/agro-api/`. A chave administrativa deve continuar armazenada como secret do Cloudflare Worker e nunca no front-end.

## Portal

A arquitetura, as áreas disponíveis e o processo para adicionar novos módulos estão documentados em [docs/PORTAL_ARCHITECTURE.md](docs/PORTAL_ARCHITECTURE.md).

## Publicação

Pushes para `main` acionam o workflow do GitHub Pages. Mudanças estruturais devem ser desenvolvidas e revisadas em branch separada antes da integração.
