# Camada Cloudflare da colinha eleitoral

Esta pasta contém a camada opcional de dados para a funcionalidade de colinha:

- **D1** mantém apenas os campos públicos necessários para buscar candidatos.
- **R2** mantém as fotos em `candidates/2026/rj/{id}.jpg` e `candidates/2026/br/{id}.jpg`.
- **Workers** expõe somente leitura pública, com CORS limitado ao site e cache das fotos.

O site funciona no modo local com o snapshot versionado em `src/data/election-2026.json`. Quando `NEXT_PUBLIC_ELECTION_ASSETS_BASE_URL` apontar para a URL do Worker, as fotos passam a ser lidas do R2 sem mudar a interface.

Worker publicado nesta branch: `https://campanha-edson-eleicoes-api.campanha-edson-2026.workers.dev`.

Para o deploy da aplicação web, defina:

```bash
NEXT_PUBLIC_ELECTION_ASSETS_BASE_URL=https://campanha-edson-eleicoes-api.campanha-edson-2026.workers.dev/assets
```

O bucket continua privado; o Worker entrega apenas objetos em `/assets/` e não expõe a listagem do R2.

## Banco criado

O D1 usado nesta branch é `campanha-edson-eleicoes` (`64b141f1-78e2-4408-b051-c76fefe5618e`). O bucket R2 é `campanha-edson`. O arquivo `migrations/0001_initial.sql` cria as tabelas sem CPF, título de eleitor, e-mail ou qualquer outro campo pessoal presente nos CSVs originais.

## Publicação

Com Wrangler autenticado na conta correta:

```bash
npm exec --yes wrangler@latest -- d1 migrations apply campanha-edson-eleicoes --remote --config infra/cloudflare/wrangler.jsonc
npm exec --yes wrangler@latest -- d1 execute campanha-edson-eleicoes --remote --file infra/cloudflare/seed/2026-candidates.sql --config infra/cloudflare/wrangler.jsonc
npm exec --yes wrangler@latest -- deploy --config infra/cloudflare/wrangler.jsonc
```

O seed dos candidatos deve ser revisado e aplicado como uma migração versionada. Não use os CSVs completos em produção: eles contêm CPF e título de eleitor. As fotos podem ser sincronizadas para o R2 usando apenas os arquivos JPG e o caminho `photoKey` do snapshot.

O `scheduled` está configurado quatro vezes ao dia, mas é um gancho inerte até haver uma fonte TSE aprovada. Isso evita consumo e publicação automática durante a validação. Acompanhe uso no painel Cloudflare antes de aumentar frequência, tamanho do banco ou número de requisições.

## Limites e alternativa de crescimento

Esta implementação usa D1, R2 e Workers sem produto pago adicional. O tamanho atual do D1 é aproximadamente 0,51 MB e o conjunto de fotos tem aproximadamente 16 MB. Se o painel indicar que o uso se aproxima do limite gratuito, mantenha o snapshot estático no Hostinger e deixe o R2 apenas como cache de imagens; a interface continua funcionando pelo fallback local. Não habilite Analytics, Meta Pixel ou outro serviço de medição nesta rota.
