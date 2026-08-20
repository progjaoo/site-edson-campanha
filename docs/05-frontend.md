# Padrões de frontend

## Princípios

- Server Components são o padrão.
- Adicionar `use client` apenas no menor limite que exige interação.
- Componentes representam uma responsabilidade clara.
- Dados de servidor não devem ser copiados para estado local sem necessidade.
- A URL deve representar filtros, página e estado compartilhável quando apropriado.

## Convenções de nomes

| Elemento | Convenção | Exemplo |
| --- | --- | --- |
| Componentes | PascalCase | `NewsCard.tsx` |
| Hooks | `use` + camelCase | `usePhotoEditor.ts` |
| Funções | camelCase e verbo | `publishPost` |
| Constantes | UPPER_SNAKE_CASE | `MAX_UPLOAD_BYTES` |
| Tipos | PascalCase | `PublishedPost` |
| Rotas | kebab-case | `/faca-sua-foto` |

## Componentes

- Componentes de `components/ui` são primitivas visuais sem regra de negócio.
- Componentes de `components/site` compõem seções públicas.
- Componentes de `components/admin` atendem fluxos editoriais.
- Componentes de `components/photo-studio` lidam com o editor local.
- Regras do domínio ficam em `features`, não em arquivos de página.
- Props booleanas devem descrever estado, não combinações visuais arbitrárias.

## Dados e mutações

- Buscar conteúdo público diretamente em componentes de servidor ou serviços.
- Usar Server Actions para formulários administrativos quando simplificarem o fluxo.
- Usar Route Handlers para uploads, integrações e endpoints que precisem de HTTP explícito.
- Validar toda entrada com Zod no servidor.
- Revalidar cache somente após persistência bem-sucedida.

## Formulários

- Rótulos e mensagens devem explicar o que o usuário controla.
- Erros de campo aparecem junto ao campo.
- Erros gerais aparecem em um alerta no início do formulário.
- Botões mantêm o mesmo verbo durante todo o fluxo: **Publicar** gera **Notícia publicada**.
- Ações destrutivas exigem confirmação e informam consequência.
- Estados de envio impedem duplo clique sem retirar a informação do botão.

## Estados obrigatórios

Cada tela assíncrona deve considerar:

- Carregando.
- Vazio com próxima ação clara.
- Sucesso.
- Erro recuperável.
- Sem autorização.
- Conteúdo não encontrado.

## CSS e Tailwind

- Usar tokens semânticos: `bg-primary`, `text-muted-foreground`, `border-border`.
- Extrair componente quando uma combinação de classes representa uma unidade reutilizável.
- Não criar abstração apenas para encurtar uma classe usada uma vez.
- Evitar `!important`.
- Valores arbitrários precisam de justificativa visual específica.
- Não misturar estilos inline e Tailwind para o mesmo atributo.

## Ícones

- Importar ícones Lucide individualmente.
- Ícones decorativos usam `aria-hidden="true"`.
- Botões somente com ícone exigem `aria-label` e tooltip quando o significado não for evidente.
- Tamanho e espessura devem ser consistentes no mesmo contexto.

## Conteúdo rico

- O editor salva uma estrutura segura e limitada.
- HTML recebido deve ser sanitizado no servidor.
- O renderer oferece estilos para títulos, listas, citações, links e imagens.
- Scripts, iframes arbitrários e estilos inline não são permitidos.

## Desempenho

- Usar `next/image` para mídias públicas.
- Definir dimensões ou proporção para evitar deslocamento de layout.
- Carregar abaixo da dobra sob demanda.
- Não enviar bibliotecas do admin para a área pública.
- Carregar o editor de imagens dinamicamente quando necessário.
- Manter a landing page utilizável antes da hidratação dos recursos não essenciais.

## SEO e compartilhamento

- Cada rota pública define título e descrição próprios.
- Notícias geram canonical, Open Graph e Twitter Card.
- Conteúdo usa dados estruturados `NewsArticle` quando aplicável.
- Slugs são estáveis; mudanças devem criar redirecionamento.
- Admin, prévias e rascunhos usam `noindex`.
