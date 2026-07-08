# nuclê

Site institucional da **nuclê** — ecossistema de marketing. Cinco frentes integradas sob um único núcleo: **criação, performance, estratégia, estúdio e comercial**.

Site estático, sem build — HTML, CSS e JavaScript puro.

## Estrutura

- `index.html` — home (núcleo orbital + menu + atalho de contato)
- `criacao.html` — branding, identidade, design, sites, landing pages, brand book
- `performance.html` — tráfego pago, SEO, inbound, CRO, métricas
- `estrategia.html` — pesquisa, posicionamento e rota estratégica
- `estudio.html` — audiovisual, filmmaker, captação, direção, pós + estúdio próprio
- `comercial.html` — prospecção, qualificação, proposta, negociação, fechamento
- `assets/` — CSS, JS e bibliotecas

## Rodar localmente

Sirva a pasta com qualquer servidor estático e abra `index.html`. Exemplos:

```bash
python -m http.server 8080
# ou a extensão "Live Server" do VS Code
```

## Publicar (GitHub Pages)

Em **Settings → Pages**, selecione a branch `main` e a raiz (`/`). O site fica em
`https://<usuario>.github.io/projeto-nucle/`.
