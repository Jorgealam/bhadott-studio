# Separação da Área Católica

Data: 18/10/2026. Branch: `feat/separar-portal-catolico` (a partir de `origin/main` em `95176a4`).

## Caminhos atuais

| Site | Pasta | Repositório | Endereço |
| --- | --- | --- | --- |
| Portal BHADOTT Studio | `D:\TRABALHO\PROJETOS\02_SITES_E_PORTAIS\BHADOTT Studio - Portal Institucional` | `Jorgealam/bhadott-studio` (existente) | https://jorgealam.github.io/bhadott-studio/ (inalterado) |
| Site católico | `D:\TRABALHO\PROJETOS\04_AREA_CATOLICA\Sites_e_Portais\Portal Catolico - React` | sugerido `Jorgealam/portal-catolico` (não criado) | a definir; se for Pages de projeto: `https://jorgealam.github.io/portal-catolico/` |

## Removido deste portal

- `src/pages/Catolico.jsx`, `src/data/catholicContent.js`, `src/data/catholicCuriosities.js`.
- Item `catolico` de `portalAreas.js` (some do menu, do catálogo do portal, da prévia e de `/portal/catolico`) e de `portalContent.js`.
- Link "Área Católica" do rodapé; metadados da rota católica.
- Tema `catholic` do `PageLayout`/`PageHero` e as regras `.catholic-*` do CSS (arquivos voltaram ao estado de `2b81d84`).
- PWA católico: registro do service worker e captura do prompt de instalação em `main.jsx`; manifest restaurado para o institucional.
- `public/sw.js` virou um worker de desativação: nos navegadores que instalaram o worker antigo, ele limpa os caches `bhadott-studio-*` e remove o próprio registro.

Backup dos arquivos afetados: `backups/separacao-catolica-2026-10-18/` (ignorado pelo Git).

## Ponte `#/catolico`

`src/pages/CatolicoMudou.jsx` atende a rota `/catolico`, sem conteúdo católico:

- `VITE_PORTAL_CATOLICO_URL` definida no build → `window.location.replace("<url>#/?secao=...")`, preservando `secao` e `data`;
- não definida → mostra só o aviso de mudança.

No GitHub Actions a variável vem de `vars.VITE_PORTAL_CATOLICO_URL` (variável do repositório, não secret).

## Ordem segura de publicação

1. Criar o repositório do site católico e publicá-lo; confirmar que o endereço abre.
2. Cadastrar `VITE_PORTAL_CATOLICO_URL` (com barra final) nas variáveis de Actions de `bhadott-studio`.
3. Só então integrar esta branch em `main` (o push em `main` publica o portal automaticamente).

Publicar o portal antes do passo 1 deixaria os favoritos antigos apenas com o aviso, sem destino.
