# Conteúdo editorial e curadoria de notícias

## Notícias exibidas na landing page

A seção **Notícias** da home é uma curadoria fixa de duas matérias externas aprovadas pela equipe de comunicação. Ela é renderizada a partir de `src/data/external-news.ts`, não consulta uma API de notícias e não depende de painel administrativo. Cada card informa veículo, data, título, resumo e link seguro para a matéria original.

Não existe painel administrativo nem arquivo de notícias internas no produto atual. O caminho `/noticias` é um alias que mantém a landing page e rola até a mesma curadoria externa da home. Alterações na curadoria devem ser feitas por revisão de código e passar por validação editorial antes do deploy.

## Regras de publicação

- Somente as duas matérias externas aprovadas são exibidas na home.
- Notícias internas legadas removidas não devem ser reintroduzidas no sitemap ou em links internos.
- Conteúdo sobre Justiça exige fonte primária e revisão humana responsável antes de publicação.
- Resumos dos cards são paráfrases curtas e não podem alterar o sentido da fonte original.

## Banners

O banner divulga reunião, evento, adesivaço ou comunicado. Cada registro pode ter:

- Título e descrição curta.
- Imagem desktop e imagem mobile opcionais.
- Texto e destino do botão.
- Período de exibição.
- Prioridade.
- Status de ativação.

### Seleção pública

Um banner é elegível quando está ativo, já atingiu `startsAt` e ainda não ultrapassou `endsAt`. Entre banners elegíveis, vence a maior prioridade; em empate, o mais recentemente atualizado.

Links externos devem ser validados. O sistema não deve permitir esquemas como `javascript:`. Imagens precisam de texto alternativo ou devem ser marcadas como decorativas.

## Biblioteca de mídia

- Aceitar JPEG, PNG e WebP para imagens editoriais.
- SVG deve ser sanitizado antes de ser publicado.
- Validar MIME real, extensão, tamanho e dimensões quando novas mídias forem adicionadas ao repositório.
- Fotos dos apoiadores nunca são armazenadas pelo site.

## Conteúdo e revisão

Toda alteração editorial precisa conferir título, resumo, datas, nomes, fontes, autorização de imagem e texto alternativo. A equipe deve atualizar `docs/14-conteudo-e-seo.md` quando uma regra editorial mudar.
