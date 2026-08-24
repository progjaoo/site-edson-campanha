# Plano 002 — SEO completo, AEO e medição do site

**Status:** Planejamento — não implementado  
**Tipo:** Aplicação web pública / campanha institucional  
**Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest  
**Measurement ID informado:** `G-PV8CGX49ZK`  
**Domínios previstos:** `edsonalbertassi.com` e `edsonalbertassi.com.br`

## Objetivo

Preparar o site para ser rastreável, compreensível e mensurável nos mecanismos de busca, com foco em:

- marca e entidade: **Edson Albertassi**;
- número de campanha: **15088**;
- intenção local: **Rio de Janeiro, Volta Redonda e Sul Fluminense**;
- intenção informacional: história, trajetória, família, Rádio 88 FM e atuação pública;
- intenção de participação: grupo do WhatsApp, redes sociais, jingle e **Faça sua foto**;
- perguntas naturais que podem aparecer em buscas e respostas geradas por IA;
- indexação correta de páginas públicas, notícias e imagens;
- medição responsável com Google Analytics 4 e Google Search Console.

O plano não promete posicionamento, snippet, painel de conhecimento ou presença em respostas de IA. Ele cria sinais técnicos, editoriais e de autoridade que permitem ao Google rastrear, interpretar e avaliar o conteúdo. A própria documentação do Google afirma que dados estruturados, boas práticas e elegibilidade não garantem a exibição de um recurso nos resultados. [Diretrizes gerais de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## Agentes e documentação de referência

Esta é uma entrega transversal. O agente líder é o [orquestrador técnico](../agents/01-orquestrador-tecnico.md), com os seguintes handoffs:

1. [Produto e requisitos](../agents/02-produto-e-requisitos.md): aprovar domínio canonical, objetivos e critérios de sucesso.
2. [Conteúdo editorial e SEO](../agents/12-conteudo-editorial-seo.md): keyword map, perguntas, fontes, títulos, resumos e revisão jurídica.
3. [Frontend React e Next.js](../agents/05-frontend-react-nextjs.md): metadados, JSON-LD, semântica, links internos e Analytics no App Router.
4. [Segurança e LGPD](../agents/09-seguranca-lgpd.md): consentimento, cookies, analytics, minimização e política de privacidade.
5. [DevOps e observabilidade](../agents/11-devops-observabilidade.md): DNS, redirects, variáveis, Search Console, GA4 e monitoramento.
6. [QA, testes e acessibilidade](../agents/10-qa-testes-acessibilidade.md): validação de crawl, metadata, eventos, Lighthouse, mobile e regressão.

Documentos lidos e aplicáveis:

- `docs/01-visao-geral.md`
- `docs/02-arquitetura.md`
- `docs/05-frontend.md`
- `docs/09-seguranca-e-lgpd.md`
- `docs/10-testes-e-qualidade.md`
- `docs/12-deploy-e-operacao.md`
- `docs/14-conteudo-e-seo.md`
- `docs/README.md`
- `agents/README.md`

## Decisões e premissas

### Domínio canonical

Recomendação inicial: usar `https://edsonalbertassi.com.br/` como domínio canonical porque o código atual já usa esse endereço como fallback em `src/app/layout.tsx`, `src/app/robots.ts` e `src/app/sitemap.ts`.

- `https://edsonalbertassi.com` deve responder com redirect permanente `301` para `https://edsonalbertassi.com.br`.
- Versões `http://`, `www` e combinações de barra final devem convergir para a mesma origem canonical.
- Se a equipe decidir que o `.com` será o endereço principal, todas as etapas abaixo devem trocar a origem antes da implementação; não manter dois canonicals.
- A propriedade canonical deve ser configurada em `NEXT_PUBLIC_SITE_URL`, sem duplicar domínio em código, JSON-LD, sitemap ou imagens sociais.

### O que “palavras-chave” significa neste plano

As palavras-chave serão usadas para orientar títulos, headings, textos, links, páginas e pauta editorial. Não será criada uma lista artificial em `meta keywords`: o Google declara que essa meta tag não tem efeito em indexação ou ranking. [Meta tags suportadas](https://developers.google.com/search/docs/crawling-indexing/special-tags) e [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

### O que “AEO” significa neste plano

AEO será tratado como conteúdo claro para perguntas e respostas, não como uma técnica separada ou garantia de “entrar na IA”. O foco será:

- conteúdo público rastreável em HTML, não apenas em Canvas ou imagem;
- respostas diretas e verificáveis em headings e parágrafos;
- contexto, fonte, autoria e data de atualização;
- entidades conectadas por links internos e `sameAs`;
- dados estruturados válidos e visíveis para o usuário;
- conteúdo original, útil e não produzido em escala apenas para capturar consultas.

O guia atual do Google para recursos de IA recomenda conteúdo original, útil, organizado e rastreável, e alerta contra criar páginas para cada variação de consulta apenas para manipular resultados. [Guia do Google para recursos de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### Analytics e privacidade

O ID `G-PV8CGX49ZK` não é segredo, mas a instalação deverá respeitar o consentimento e a política de privacidade. O Google recomenda consent mode quando o site mantém sua própria solução de consentimento. [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent) e [Consent Mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode)

## Auditoria inicial do código

### Já existe

- `src/app/layout.tsx` possui `metadataBase`, title template, description, Open Graph, Twitter card, favicon e `Person` JSON-LD.
- `src/app/robots.ts` libera o site público e bloqueia `/admin`, `/admin/*` e `/api/*`.
- `src/app/sitemap.ts` gera home, história, gerador, política e slugs de notícias.
- A página de notícia já possui `NewsArticle` JSON-LD, `datePublished` e `dateModified`.
- As páginas de história e faça sua foto já possuem `title`, `description` e Open Graph próprios.
- Imagens públicas usam `next/image` em grande parte das seções e já têm vários textos alternativos.
- A home tem links HTML para as páginas principais e os cards externos usam `target="_blank"` e `rel="noopener noreferrer"`.

### Lacunas e riscos

- O `metadataBase` é correto por fallback, mas a origem canonical precisa ser validada em produção e por variável de ambiente.
- Não há canonical explícito por rota (`alternates.canonical`).
- Não há `WebSite` JSON-LD com nome oficial e `alternateName` na home.
- O `Person` global precisa de `@id`, `sameAs` completo, biografia revisada e conexão consistente com as páginas internas.
- A página de notícia não possui `BreadcrumbList`, `mainEntityOfPage`, URL de autor e canonical explícito.
- Não existe atualmente `src/app/noticias/page.tsx`, embora a documentação descreva uma listagem pública; isso limita descoberta e arquitetura de links.
- O sitemap usa `new Date()` para várias páginas estáticas, podendo sinalizar mudanças inexistentes a cada geração.
- O sitemap precisa excluir tudo que não é canonical público e usar `lastModified` real.
- O `keywords` atual do `Metadata` gera meta keywords, que não é um sinal útil para o Google; o mapa de keywords deverá viver na documentação editorial.
- O código carrega Analytics da Vercel, mas ainda não possui o GA4 informado, consentimento, taxonomia de eventos ou prevenção de pageviews duplicados.
- O `robots.txt` não substitui `noindex`; regras de indexação devem ser aplicadas por metadata/headers nas rotas apropriadas. [Robots meta tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- A página de história precisa ter um título textual consistente, mesmo usando imagens de campanha, para que a informação principal esteja no DOM.
- A página de notícias externas não deve receber `NewsArticle` como se o texto fosse hospedado pelo site; ela deve manter atribuição e link para a fonte original.

## Arquitetura de URLs e indexação

### URLs públicas indexáveis

| URL | Intenção principal | Indexação |
| --- | --- | --- |
| `/` | Edson Albertassi, 15088, deputado estadual, Rio de Janeiro | `index, follow` |
| `/historia` | biografia, trajetória, família e trabalho | `index, follow` |
| `/faca-sua-foto` | foto de apoio, avatar, feed, story e molduras | `index, follow` |
| `/noticias` | arquivo de notícias e matérias atribuídas | `index, follow` |
| `/noticias/[slug]` | notícia individual, quando publicada | `index, follow` |
| `/politica-de-privacidade` | transparência e LGPD | `index, follow` opcional, conforme jurídico |

### URLs não indexáveis

- `/admin`, `/admin/*`
- `/api/*`
- páginas de prévia, rascunho, autenticação e estados temporários
- qualquer rota que não tenha conteúdo público completo ou que exponha dados administrativos

Implementar `robots` metadata `noindex, nofollow` nas páginas privadas e manter autenticação no servidor. O `robots.txt` pode reduzir rastreamento, mas não deve ser tratado como controle de acesso.

### Canonical e redirects

- Gerar canonical absoluto para cada rota pública.
- Redirecionar `/index`, variações de host e domínio secundário para o canonical.
- Definir política única para trailing slash.
- Nunca canonicalizar notícia publicada para a home.
- Se um slug mudar, responder `301` do slug antigo para o novo e manter um registro de redirects.
- Não usar parâmetros de campanha como URLs canonical; UTM deve apontar para a URL limpa.

## Mapa de palavras-chave e intenção

O mapa abaixo é uma hipótese editorial inicial. Antes da publicação, validar volume, concorrência e linguagem real no Google Search Console, Keyword Planner ou ferramenta aprovada pela equipe. Não inserir todas as variações em uma mesma página.

### Cluster de marca e entidade — prioridade alta

| Palavra/consulta | Intenção | Página destino |
| --- | --- | --- |
| Edson Albertassi | navegacional | `/` |
| Edson Albertassi 15088 | navegacional/campanha | `/` |
| Albertassi 15088 | navegacional/campanha | `/` |
| deputado estadual Edson Albertassi | entidade/campanha | `/` |
| Edson Albertassi deputado estadual | entidade/campanha | `/` |
| Edson Albertassi Rio de Janeiro | local/campanha | `/` |
| campanha Edson Albertassi 2026 | campanha | `/` |
| Tem Que Ter Fé Edson Albertassi | slogan/jingle | `/` ou seção Jingle |

### Cluster local e trajetória — prioridade alta

| Palavra/consulta | Intenção | Página destino |
| --- | --- | --- |
| deputado estadual Volta Redonda | local | `/historia` e conteúdo aprovado |
| deputado estadual Sul Fluminense | local | `/historia` e conteúdo aprovado |
| candidato deputado estadual Rio de Janeiro 15088 | campanha/local | `/` |
| Edson Albertassi Volta Redonda | entidade/local | `/historia` |
| história de Edson Albertassi | biografia | `/historia` |
| Edson Albertassi família | biografia | `/historia` |
| Edson Albertassi Rádio 88 FM | trajetória | `/historia` |
| Edson Albertassi ALERJ | trajetória pública | `/historia` |

### Cluster de participação — prioridade alta

| Palavra/consulta | Intenção | Página destino |
| --- | --- | --- |
| faça sua foto Edson Albertassi | ação | `/faca-sua-foto` |
| foto de perfil Edson Albertassi 15088 | ação | `/faca-sua-foto` |
| moldura Edson Albertassi | ação | `/faca-sua-foto` |
| avatar Edson Albertassi | ação | `/faca-sua-foto` |
| grupo WhatsApp Edson Albertassi | participação | `/` e CTA WhatsApp |
| redes sociais Edson Albertassi | navegacional | `/` e seção Redes |
| jingle Edson Albertassi | mídia | seção Jingle e conteúdo aprovado |

### Cluster de perguntas — prioridade média/alta

As perguntas abaixo devem virar headings e respostas somente quando o conteúdo puder ser confirmado e revisado. A resposta deve começar com uma frase direta, seguida de contexto, fonte e data.

- Quem é Edson Albertassi?
- Qual é o número de Edson Albertassi para deputado estadual?
- Em qual estado Edson Albertassi é candidato?
- Qual é a história de Edson Albertassi?
- Onde Edson Albertassi nasceu ou atua? **Publicar apenas se confirmado.**
- O que Edson Albertassi fez antes da política?
- Qual é a relação de Edson Albertassi com a Rádio 88 FM?
- Como fazer a foto de apoio do Edson Albertassi?
- Como criar uma foto de perfil 15088?
- Como entrar no grupo do WhatsApp de Edson Albertassi?
- Onde acompanhar as redes sociais oficiais de Edson Albertassi?
- Onde ouvir o jingle “Tem Que Ter Fé”?
- Onde encontrar notícias sobre Edson Albertassi?
- O que aconteceu no caso judicial citado nas matérias? **Revisão jurídica obrigatória.**
- O que significa “em quem votar para deputado estadual”? **Responder com orientação geral e apresentar informações oficiais do candidato, sem inventar dados eleitorais.**
- Como escolher um candidato a deputado estadual no Rio de Janeiro? **Conteúdo educativo, fonte oficial e revisão eleitoral.**

Consultas como “em quem votar para deputado estadual” são genéricas e podem ter intenção diferente de uma busca pela campanha. A página não deve prometer que a pessoa deveria votar em alguém apenas para capturar a consulta; deve explicar o cargo, apresentar o candidato de forma identificada e levar o usuário a informações verificáveis.

### Cluster jurídico e notícias — prioridade alta, com revisão

- Edson Albertassi inocentado pela Justiça
- Edson Albertassi Operação Cadeia Velha
- decisão sobre Edson Albertassi
- quando prender sem prova vira abuso de poder
- notícias Edson Albertassi Justiça

Essas expressões devem aparecer somente em conteúdo atribuído à fonte, com data, contexto e estado atual do caso. Não usar “inocentado”, “culpado”, “absolvido” ou “provas inválidas” como voz institucional sem confirmação documental. Seguir as regras de `docs/14-conteudo-e-seo.md` e obter revisão jurídica humana.

## Metadados por página

### Home `/`

- `<title>`: `Edson Albertassi 15088 | Deputado Estadual pelo Rio de Janeiro`.
- Description: uma frase natural com nome, número, cargo, estado e proposta institucional; não repetir slogan várias vezes.
- H1 textual no HTML: `Edson Albertassi 15088 — Deputado Estadual pelo Rio de Janeiro`.
- Open Graph e Twitter card com imagem 1200×630, título e description consistentes.
- `WebSite` JSON-LD: `name`, `alternateName` aprovado e URL canonical.
- `Person` JSON-LD: `@id`, nome, `jobTitle`, imagem, biografia curta, `sameAs` das redes verificadas.
- Se houver campanha/organização formal com dados públicos, avaliar um segundo nó `Organization`; não inventar CNPJ, endereço ou telefone.

### `/historia`

- `<title>`: `História de Edson Albertassi | Fé, Família e Trabalho`.
- Description com biografia, Rádio 88 FM, Volta Redonda, ALERJ e Rio de Janeiro, somente com fatos aprovados.
- H1 único, parágrafos em HTML e alt text informativo para família e elementos visuais.
- `ProfilePage`/`Person` somente se a página realmente tiver foco principal no perfil de uma pessoa e os dados forem visíveis. [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- `BreadcrumbList` visível e em JSON-LD.

### `/faca-sua-foto`

- `<title>`: `Faça sua Foto de Apoio | Edson Albertassi 15088`.
- Description explica a ação e os formatos sem prometer armazenamento remoto.
- H1 textual e seção de instruções em HTML, antes ou junto do editor.
- Explicar que a foto é processada localmente no navegador, conforme LGPD/documentação.
- Não incluir a selfie no Analytics, logs, URLs, JSON-LD ou atributos públicos.
- `BreadcrumbList` e links internos para home, redes e grupo.

### `/noticias`

- Criar uma página de arquivo que liste notícias publicadas e as duas matérias externas apenas como curadoria atribuída.
- `<title>`: `Notícias de Edson Albertassi | Atualizações e Imprensa`.
- Description factual sobre notícias, agenda e matérias atribuídas.
- Cada item deve ter título, data, fonte, resumo, imagem com alt e link crawlable.
- Não copiar o texto integral de matérias externas; evitar conteúdo duplicado.
- Não marcar cards externos como se fossem `NewsArticle` hospedados no domínio.

### `/noticias/[slug]`

- Gerar metadata dinâmica a partir do conteúdo publicado.
- Canonical absoluto e estável.
- Open Graph/Twitter com imagem absoluta e fallback seguro.
- `NewsArticle` JSON-LD com `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`, `author.url`, `publisher`, `mainEntityOfPage`, `inLanguage` e `isAccessibleForFree` quando aplicável. [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- `BreadcrumbList` com `Início → Notícias → título curto`. [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- Exibir data de publicação e atualização no conteúdo, não apenas no JSON-LD.
- Rascunho/prévia: `noindex`; publicado: `index, follow`.

### `/politica-de-privacidade`

- Metadata própria e canonical.
- Explicar GA4, Vercel Analytics/Speed Insights se permanecerem ativos, cookies, consentimento, finalidade, retenção, direitos LGPD e canal do controlador.
- Não afirmar que a foto nunca é transmitida se o código ou infraestrutura contrariar essa afirmação.

## Dados estruturados e entidades

Implementar JSON-LD renderizado no servidor, preferencialmente em componentes reutilizáveis. O conteúdo marcado precisa estar visível e representar fielmente a página; o formato recomendado pelo Google é JSON-LD. [Introdução a dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### Grafo recomendado

1. Home: `WebSite` + `Person` + `ImageObject` apenas quando os campos forem reais.
2. História: `ProfilePage` com `mainEntity` `Person`, se a página continuar sendo um perfil biográfico.
3. Notícias: `NewsArticle` por página interna publicada.
4. Páginas internas: `BreadcrumbList`.
5. Eventos: `Event` somente com evento real, data, local, status e informações públicas completas.

Não implementar:

- `QAPage` para FAQ institucional, porque esse tipo exige que usuários possam enviar respostas alternativas; uma FAQ escrita apenas pelo site não atende a esse modelo. [QAPage](https://developers.google.com/search/docs/appearance/structured-data/qapage)
- avaliações, estrelas, endereço, telefone, partido, cargo ou filiação sem fonte e autorização;
- schema duplicado ou invisível para tentar obter rich results;
- marcação `NewsArticle` para conteúdo externo que não foi publicado no domínio.

## Conteúdo AEO e arquitetura editorial

### Páginas a criar ou melhorar

- `/historia`: perfil completo, cronologia factual, links para fontes e data de atualização.
- `/noticias`: arquivo indexável com filtros simples e links HTML.
- `/noticias/[slug]`: artigos individuais com autoria, fonte e breadcrumbs.
- seção ou página de perguntas frequentes: perguntas visíveis, respostas diretas e revisão editorial; sem `QAPage` automático.
- página de transparência/editorial: quem publica, como fontes são verificadas, como corrigir um conteúdo.

### Modelo de resposta para perguntas

```text
H2: Qual é o número de Edson Albertassi?
Resposta direta: O número informado para a campanha é 15088.
Contexto: explicar o cargo, o estado e onde o dado foi publicado.
Fonte/data: link para a fonte oficial e data da última conferência.
Próxima ação: conhecer a história, acompanhar as redes ou fazer a foto.
```

Esse modelo deve ser aplicado apenas quando a resposta estiver aprovada. Não criar dezenas de páginas quase idênticas para variações de uma mesma consulta.

### Calendário editorial inicial

- 1 página de história/biografia revisada e atualizada.
- 1 atualização semanal de agenda, quando houver informação pública confirmada.
- 1 notícia institucional por fato real, com fonte, data e imagem autorizada.
- 1 conteúdo mensal de serviço explicando o cargo de deputado estadual, processo eleitoral ou participação cívica, sempre com fontes oficiais.
- Atualização imediata de fatos judiciais somente após validação jurídica.

### Links internos

- Home aponta para História, Faça sua foto, Redes, WhatsApp e Notícias.
- História aponta para Faça sua foto, redes oficiais e notícias relacionadas.
- Cada notícia aponta para História, arquivo de notícias e um próximo conteúdo relevante.
- Anchors são descritivos: `Conheça a história de Edson Albertassi`, não apenas `clique aqui`.
- Não criar links para admin, APIs ou rotas temporárias.

## Google Analytics 4

### Instalação

1. Criar/confirmar a propriedade GA4 e o web data stream para o domínio canonical.
2. Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PV8CGX49ZK` no ambiente de produção e preview apropriado.
3. Criar um componente client isolado, por exemplo `src/components/analytics/GoogleAnalytics.tsx`.
4. Usar `next/script` para carregar `https://www.googletagmanager.com/gtag/js?id=G-PV8CGX49ZK` somente conforme a decisão de consentimento.
5. Inicializar `dataLayer`, `gtag('js', new Date())` e `gtag('config', 'G-PV8CGX49ZK')` uma única vez.
6. Garantir que o `page_view` não seja duplicado pelo layout, por mudanças de rota do App Router e por Enhanced Measurement.
7. Usar `gtag` ou uma camada de eventos tipada, nunca enviar dados pessoais.

O Google informa que o Measurement ID começa com `G-` e pode ser obtido nos detalhes do web data stream. [Encontrar o Google tag ID](https://support.google.com/analytics/answer/9539598) e [medir pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)

### Consentimento

- Estado padrão: `analytics_storage: denied`, `ad_storage: denied`, `ad_user_data: denied`, `ad_personalization: denied` até a escolha do visitante, conforme revisão jurídica.
- Banner com **Aceitar analytics**, **Recusar** e **Preferências**; não usar aceite presumido por continuar navegando.
- Persistir somente a preferência necessária e permitir revogação.
- Se a política adotar consentimento básico, não carregar o script antes da escolha.
- Atualizar o estado com `gtag('consent', 'update', ...)` na mesma página da interação.
- Testar que nenhuma requisição do GA4 ou cookie analítico ocorre ao recusar.
- Atualizar a política de privacidade antes de produção.

### Taxonomia de eventos

| Evento | Parâmetros permitidos | Marcar como key event? |
| --- | --- | --- |
| `photo_generator_start` | `format`, `placement` | Não |
| `photo_export` | `format`, `moldura_id` não pessoal | Sim, após aprovação |
| `whatsapp_click` | `placement` | Sim, após aprovação |
| `social_click` | `network`, `placement` | Não |
| `jingle_play` | `placement` | Não |
| `news_external_click` | `source`, `article_id` | Não |
| `cta_click` | `cta_name`, `destination` | Não |
| `menu_open` | `viewport` | Não |

Proibido enviar nome, telefone, e-mail, foto, conteúdo de formulário, token, cookie, IP manual, texto digitado, query string completa ou identificador de apoiador. Eventos devem ser enviados somente após consentimento compatível.

### UTMs

Padronizar links de divulgação:

```text
utm_source=instagram|whatsapp|facebook|tiktok|youtube|qr
utm_medium=social|messaging|video|print
utm_campaign=campanha-2026
utm_content=hero|jingle|cta-foto|evento-YYYY-MM
```

Não colocar UTM em canonical, sitemap, JSON-LD ou links internos permanentes.

## Search Console e indexação

### Propriedades

- Criar uma Domain property para `edsonalbertassi.com.br`.
- Criar/confirmar uma Domain property separada para `edsonalbertassi.com`.
- Verificar DNS pelo provedor de domínio; não versionar o token.
- Usar a propriedade canonical para inspeções e sitemap.

### Sitemap

Atualizar `src/app/sitemap.ts` para:

- incluir `/`, `/historia`, `/faca-sua-foto`, `/noticias` e política;
- incluir apenas notícias públicas publicadas;
- usar `lastModified` de conteúdo real;
- não incluir admin, API, preview, query strings ou domínio secundário;
- gerar URLs absolutas usando `NEXT_PUBLIC_SITE_URL`;
- responder `200`, XML válido e sem redirects.

Enviar `https://edsonalbertassi.com.br/sitemap.xml` no relatório Sitemaps. O Search Console permite verificar erros de leitura e a inspeção ao vivo confirma se o Googlebot consegue buscar o arquivo. [Relatório de Sitemaps](https://support.google.com/webmasters/answer/7451001)

### Inspeção inicial

Inspecionar individualmente:

- home;
- história;
- faça sua foto;
- arquivo de notícias;
- uma notícia interna publicada;
- política de privacidade.

Para cada URL, confirmar: rastreável, indexável, canonical escolhido, HTML renderizado, mobile-friendly, structured data detectado e ausência de bloqueio indevido. [URL Inspection](https://support.google.com/webmasters/answer/12482179)

### Monitoramento semanal

- Performance: impressões, cliques, CTR, posição e consultas por página.
- Page indexing: descobertas, indexadas, excluídas e motivo.
- Core Web Vitals e experiência em celular.
- Enhancements/structured data e ações manuais.
- Links externos e páginas que perderam cobertura.

Search Console e Analytics podem apresentar números diferentes; cada ferramenta mede uma parte distinta do caminho. [Dados do Search Console](https://support.google.com/webmasters/answer/96568)

## SEO técnico e performance

- Garantir uma resposta HTML útil sem depender de interação para revelar texto principal.
- Manter um único H1 e hierarquia H2/H3 coerente.
- Confirmar `lang="pt-BR"`, title e description únicos.
- Garantir links `<a href>` rastreáveis e foco de teclado.
- Revisar `alt`, `width`, `height`, `sizes`, proporções e nomes descritivos de imagens.
- Manter a imagem principal com prioridade e lazy-load abaixo da dobra.
- Avaliar AVIF/WebP e otimização do Next sem alterar o design; validar visualmente antes.
- Reduzir JS global: Analytics, editor de fotos e admin não devem bloquear a renderização da home.
- Evitar layout shift em hero, header, cards de notícia e faixas coloridas.
- Avaliar fonte, CSS, compressão, cache e CDN no ambiente final.
- Executar Lighthouse móvel em 320–390 px e desktop em 1440 px.

Metas herdadas de `docs/10-testes-e-qualidade.md`: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75 móvel.

## SEO de imagens e compartilhamento

- Criar/selecionar uma imagem OG padrão de 1200×630 com identificação legível de Edson Albertassi e 15088.
- Garantir que cada rota pública tenha `og:image`, `og:image:alt`, título e descrição.
- Garantir Twitter card equivalente, mesmo que o foco principal seja WhatsApp e redes sociais.
- Usar texto alternativo descritivo, não lista de keywords.
- Não expor dados pessoais em fotos de apoiadores nem publicar selfie gerada no sitemap.
- Para matérias externas, usar a imagem local autorizada apenas como card de referência, sem sugerir que o site é o veículo original.

## SEO local, autoridade e distribuição

- Manter nome, número, região e redes sociais consistentes entre site e perfis oficiais.
- Usar links `sameAs` somente para perfis confirmados pela equipe.
- Buscar citações editoriais legítimas em veículos locais, rádios, agendas e fontes públicas; não comprar links ou publicar redes artificiais.
- Criar uma página de imprensa/contato somente se houver e-mail, telefone e dados públicos aprovados.
- Não criar Google Business Profile ou schema de negócio para um endereço que não seja uma operação pública real.
- Compartilhar notícias e páginas com UTMs, mantendo a URL canonical sem parâmetros.
- Solicitar recrawl após mudanças relevantes de title, conteúdo, structured data ou canonical, lembrando que a recrawl pode levar dias ou semanas. [Title links](https://developers.google.com/search/docs/appearance/title-link)

## Segurança, LGPD e conteúdo político

- Analytics precisa estar descrito na política de privacidade e sujeito à decisão jurídica sobre consentimento/base legal.
- O Analytics não pode medir ou inferir atributos sensíveis a partir da foto do apoiador.
- Não enviar selfie, rosto, nome, telefone ou texto livre para o GA4.
- Notícias sobre Justiça exigem fonte primária quando disponível, data, estado do caso e revisão jurídica humana.
- Não publicar promessa, pesquisa, calendário eleitoral ou número de candidatura sem fonte oficial e validação responsável.
- Não usar markup para fazer afirmações que não aparecem visivelmente na página.
- Revisar a política de privacidade, cookies e contato do controlador antes de ativar o tag.

## Arquivos previstos para a implementação

### Criar

- `src/components/analytics/GoogleAnalytics.tsx`
- `src/components/analytics/ConsentBanner.tsx`
- `src/lib/analytics.ts`
- `src/lib/seo/structured-data.ts`
- `src/components/seo/JsonLd.tsx`
- `src/app/noticias/page.tsx`
- `src/app/manifest.ts` se a equipe aprovar manifest/PWA
- testes de metadata, JSON-LD, consentimento, eventos e sitemap

### Modificar

- `src/app/layout.tsx`: WebSite/Person, GA4, consentimento e metadata global.
- `src/app/page.tsx` e seções públicas: H1, links internos, anchors e conteúdo HTML.
- `src/app/historia/page.tsx`: metadata, canonical, breadcrumbs, perfil e conteúdo verificável.
- `src/app/faca-sua-foto/page.tsx`: metadata, instruções HTML, breadcrumbs e privacidade.
- `src/app/noticias/[slug]/page.tsx`: metadata dinâmica, canonical, Article e Breadcrumb JSON-LD.
- `src/app/robots.ts`: regras finais de rastreamento e sitemap canonical.
- `src/app/sitemap.ts`: URLs públicas, datas reais e exclusões.
- `next.config.mjs` ou configuração do host: redirect `.com` → `.com.br`, headers e cache quando aplicável.
- `.env.example`: `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_GA_MEASUREMENT_ID`, sem valores secretos.
- `docs/09-seguranca-e-lgpd.md`, `docs/12-deploy-e-operacao.md` e `docs/14-conteudo-e-seo.md`.

### Preservar

- identidade visual e responsividade já aprovadas;
- processamento local das fotos;
- links e imagens oficiais aprovados;
- admin e APIs fora das rotas públicas indexáveis;
- funcionamento das matérias externas fixas na última seção da home.

## Ordem de implementação e handoffs

### Fase 0 — Baseline e aprovações

**Responsáveis:** Orquestrador + Produto + Conteúdo + Segurança.

- [ ] Confirmar domínio canonical e política de redirect.
- [ ] Confirmar que `G-PV8CGX49ZK` pertence ao web stream correto.
- [ ] Aprovar nome oficial, biografia, redes sociais, número e fatos da trajetória.
- [ ] Aprovar política de consentimento e texto de privacidade.
- [ ] Registrar consultas proibidas/condicionais por risco jurídico.
- [ ] Capturar baseline: `curl`, Lighthouse, Search Console (se disponível), GA4/Vercel Analytics e screenshots mobile/desktop.

### Fase 1 — Domínio e descoberta

**Responsáveis:** DevOps + Frontend.

- [ ] Configurar DNS, HTTPS e redirect permanente do domínio secundário.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` por ambiente.
- [ ] Corrigir canonical, sitemap, robots, trailing slash e headers.
- [ ] Criar `/noticias` público sem alterar o feed estático da home.
- [ ] Testar 200/301/404, XML válido e ausência de URLs privadas.

### Fase 2 — Metadata e dados estruturados

**Responsáveis:** Conteúdo + Frontend.

- [ ] Criar helper tipado para JSON-LD sem serializar valores inseguros.
- [ ] Implementar WebSite/Person/ProfilePage, conforme elegibilidade.
- [ ] Implementar Article e BreadcrumbList nas notícias.
- [ ] Adicionar canonical, OG/Twitter e metadata por rota.
- [ ] Corrigir H1, heading hierarchy, alt text e texto principal no DOM.
- [ ] Validar no Rich Results Test, Schema Markup Validator e URL Inspection.

### Fase 3 — Conteúdo, keywords e AEO

**Responsáveis:** Conteúdo editorial + Produto + revisão jurídica.

- [ ] Transformar o mapa deste plano em pauta e briefing por página.
- [ ] Publicar respostas diretas para perguntas aprovadas.
- [ ] Criar links internos contextuais e página de transparência/editorial.
- [ ] Criar calendário de notícias e atualizações factuais.
- [ ] Revisar qualquer afirmação sobre Justiça, eleições, número, cargo, datas ou propostas.
- [ ] Registrar fonte, autor, data de publicação e data de atualização.

### Fase 4 — GA4, consentimento e eventos

**Responsáveis:** Frontend + Segurança/LGPD + DevOps.

- [ ] Implementar banner de consentimento e consent mode.
- [ ] Instalar o tag `G-PV8CGX49ZK` uma única vez.
- [ ] Implementar pageview SPA e eventos aprovados.
- [ ] Configurar conversões/key events somente depois de validar privacidade e nomenclatura.
- [ ] Testar Realtime/DebugView, Tag Assistant e ausência de PII.
- [ ] Documentar eventos e retenção no manual operacional.

### Fase 5 — Performance, acessibilidade e distribuição

**Responsáveis:** UX/UI + Frontend + QA.

- [ ] Auditar Core Web Vitals e imagens.
- [ ] Corrigir layout shift, foco, contraste, heading order e links.
- [ ] Validar mobile, Safari iOS, Chrome Android e desktop.
- [ ] Preparar OG cards e UTMs de divulgação.
- [ ] Solicitar recrawl das páginas modificadas.

### Fase 6 — Go-live e monitoramento

**Responsáveis:** DevOps + QA + Conteúdo.

- [ ] Executar build, lint, typecheck e testes.
- [ ] Publicar em preview e rodar smoke tests.
- [ ] Confirmar redirect de ambos os domínios e sitemap canonical.
- [ ] Enviar sitemap no Search Console.
- [ ] Inspecionar URLs principais.
- [ ] Acompanhar cobertura, Core Web Vitals, consultas, CTR e eventos semanalmente.
- [ ] Registrar incidentes, alterações de domínio, redirects e correções editoriais.

## Critérios de aceite

### Técnico

- [ ] `.com` e `www` redirecionam para o domínio canonical em HTTPS.
- [ ] Todas as rotas públicas importantes têm title, description, canonical, OG e Twitter card únicos.
- [ ] Admin e APIs não aparecem como páginas indexáveis.
- [ ] `robots.txt` e `sitemap.xml` retornam 200 e apontam apenas para URLs canonical.
- [ ] Todas as URLs do sitemap retornam status correto e não redirecionam em cadeia.
- [ ] JSON-LD é válido, representa conteúdo visível e não possui campos inventados.
- [ ] Home, História, Faça sua foto, Notícias e uma notícia respondem em HTML útil sem depender de clique.

### Analytics e privacidade

- [ ] O ID `G-PV8CGX49ZK` aparece uma única vez em produção.
- [ ] Pageviews não duplicam em navegação do App Router.
- [ ] Recusar consentimento impede cookies/requisições analíticas conforme política escolhida.
- [ ] Aceitar consentimento registra pageview e eventos no DebugView.
- [ ] Nenhum evento contém selfie, nome, telefone, e-mail, token ou texto livre.
- [ ] Política de privacidade descreve analytics, cookies e direitos do titular.

### Conteúdo e AEO

- [ ] Cada página tem uma intenção principal e não mistura clusters sem contexto.
- [ ] Perguntas possuem respostas diretas, fontes e datas quando necessário.
- [ ] Conteúdo jurídico recebeu revisão humana responsável.
- [ ] Não há keyword stuffing, páginas geradas em massa ou schema enganoso.
- [ ] Títulos, resumos, alt text e anchors são naturais e compreensíveis.

### Qualidade

- [ ] `npm run lint` sem erros.
- [ ] `npm test` sem regressões.
- [ ] `npm run build` concluído.
- [ ] Lighthouse móvel e desktop registrados.
- [ ] Core Web Vitals respeitam as metas do projeto no ambiente final.
- [ ] Navegação por teclado, leitores de tela e foco foram revisados nas rotas alteradas.

## KPIs e rotina pós-lançamento

### Primeiros 30 dias

- Cobertura: 100% das páginas públicas prioritárias descobertas; nenhuma página pública importante excluída sem motivo.
- Canonical: zero conflitos entre domínio, sitemap e metadata.
- Dados estruturados: zero erros críticos no Search Console/Rich Results Test.
- Analytics: pageviews e eventos de conversão aparecendo no Realtime/DebugView.
- Performance: baseline comparável de LCP, INP, CLS e tamanho do JavaScript.
- Conteúdo: impressões e consultas de marca, número, cidade e intenção de participação.

### Rotina semanal

- Revisar consultas novas no Search Console e incorporá-las apenas quando forem úteis e aprovadas.
- Identificar páginas com impressão alta e CTR baixa para testar title/description, sem alterar fatos.
- Verificar páginas excluídas, erros de sitemap, redirects e 404.
- Revisar eventos de CTA, WhatsApp, foto, jingle e notícias externas.
- Conferir comentários, correções jurídicas e datas de atualização.

### Rotina mensal

- Comparar tráfego orgânico, marca e não marca.
- Avaliar páginas que recebem links externos e oportunidades legítimas de imprensa.
- Reauditar Lighthouse, acessibilidade, consentimento e dependências.
- Atualizar o mapa de keywords com dados reais, mantendo a documentação como fonte de verdade.
- Fazer amostragem manual de perguntas em Google Search e recursos de IA; registrar URL, data e evidência sem prometer presença.

## Referências oficiais utilizadas

- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Guia para desenvolvedores](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Otimização para recursos de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Conteúdo útil e people-first](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Canonicalização](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Robots meta e X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Site names / WebSite](https://developers.google.com/search/docs/appearance/site-names)
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [GA4 Google tag ID](https://support.google.com/analytics/answer/9539598)
- [GA4 pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [GA4 events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [Search Console URL Inspection](https://support.google.com/webmasters/answer/12482179)
- [Search Console Sitemaps](https://support.google.com/webmasters/answer/7451001)

## Handoff final

**Próximo agente:** Produto e requisitos, para confirmar domínio canonical, consentimento, fatos biográficos e prioridades.  
**Depois:** Conteúdo editorial e SEO → Frontend → Segurança/LGPD → DevOps → QA.  
**Nenhuma implementação deve começar** antes de confirmar a origem canonical e o texto legal do consentimento.
