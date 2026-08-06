# Arquitetura do Portal BHADOTT Studio

## Objetivo

Evoluir o site institucional existente para um portal modular sem descartar a identidade visual, as páginas de projetos ou o módulo BHADOTT Agro.

## Princípios

1. Cada área cresce de forma independente.
2. Conteúdo planejado nunca aparece como publicado.
3. Ferramentas informam claramente como tratam os dados.
4. Componentes visuais compartilhados permanecem reutilizáveis.
5. Novas páginas são carregadas sob demanda.
6. A versão publicada só muda após revisão da branch de desenvolvimento.

## Áreas atuais

| Área | Rota | Estado |
| --- | --- | --- |
| Portal | `/portal` | Disponível |
| Jogos | `/portal/games` | Fundação pronta |
| Inteligência Artificial | `/portal/ia` | Fundação pronta |
| Música | `/portal/musica` | Fundação pronta |
| Área Católica | `/portal/catolico` | Fundação pronta |
| Academy | `/portal/academy` | Fundação pronta |
| Blog | `/blog` | Fundação editorial pronta |
| Ferramentas | `/ferramentas` | Duas ferramentas disponíveis |
| Agro | `/agro` | Módulo existente preservado |

## Organização implementada

```text
src/
├── components/
│   ├── PortalMenu.jsx
│   ├── PortalPreview.jsx
│   ├── RouteLoading.jsx
│   ├── RouteMeta.jsx
│   └── AppErrorBoundary.jsx
├── data/
│   ├── portalAreas.js
│   ├── portalContent.js
│   └── blogPosts.js
└── pages/
    ├── Portal.jsx
    ├── PortalArea.jsx
    ├── Ferramentas.jsx
    └── Blog.jsx
```

## Como adicionar uma nova área

1. Cadastrar a área em `src/data/portalAreas.js`.
2. Adicionar sua estrutura editorial em `src/data/portalContent.js`.
3. Usar a rota genérica `/portal/:areaId` enquanto ela estiver em preparação.
4. Quando precisar de funções próprias, criar uma página dedicada e registrar a rota em `src/App.jsx`.
5. Incluir título e descrição em `src/components/RouteMeta.jsx`.
6. Validar navegação desktop, celular e build de produção.

## Próximas decisões

- Definir domínio definitivo e estratégia para URLs sem `#`.
- Definir fonte editorial ou CMS quando o volume de publicações justificar.
- Substituir a chave única do Agro por autenticação com usuários antes de ampliar o painel.
- Implementar um endpoint real de contato quando houver provedor de e-mail definido.
- Criar testes automatizados para rotas, filtros e ferramentas.
