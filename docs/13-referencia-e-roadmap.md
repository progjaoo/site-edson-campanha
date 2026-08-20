# Referência funcional e roadmap

## Referência analisada

O site [cirogomes.com.br](https://cirogomes.com.br/) foi usado como referência de estrutura e interação, não como material para cópia. Foram observados:

- Cabeçalho responsivo com navegação por seções.
- Hero de alto impacto com chamadas de mobilização.
- Seções institucionais organizadas em grandes blocos cromáticos.
- Destaque para redes sociais e WhatsApp.
- Listagem e página individual de notícias.
- Gerador de peças com upload, enquadramento, temas e download.
- Tratamentos próprios para desktop e mobile.

## Adaptação para Edson Albertassi

O projeto preserva os padrões funcionais úteis e reorganiza o conteúdo conforme o briefing:

| Necessidade | Solução proposta |
| --- | --- |
| Faça sua foto | Rota própria e chamada recorrente na landing page |
| Grupo de apoiadores | Composição com Edson e celular central |
| Redes sociais | Instagram em evidência e demais redes como apoio |
| Divulgação temporária | Banner administrável e programável |
| Duas matérias sobre Justiça | Cards externos fixos com veículo, data e link para a fonte |
| Atualização sem desenvolvedor | Painel para notícias, banners, mídia e molduras |

## Diferenças intencionais

- A identidade visual será própria da campanha de Edson.
- A selfie será processada localmente e não armazenada.
- O layout usa uma única estrutura semântica responsiva, evitando duplicação completa por dispositivo.
- O blog e o admin usam Prisma e PostgreSQL em vez de um CMS externo; a home mantém uma curadoria externa fixa para as duas matérias desta entrega.
- Acessibilidade, auditoria e privacidade são requisitos explícitos.

## Fases

### Fase 0: insumos

- Receber logotipo e manual de marca.
- Receber fotos oficiais recortadas e autorizações.
- Confirmar número, slogan, links sociais e contatos.
- Aprovar molduras dos três formatos.
- Definir domínio e responsáveis pelo conteúdo.

### Fase 1: fundação

- Inicializar Next.js, TypeScript, Tailwind e shadcn/ui.
- Configurar lint, formatação, testes e variáveis.
- Criar tokens e componentes-base.
- Configurar Prisma, PostgreSQL e seed seguro.

### Fase 2: conteúdo público

- Implementar landing page responsiva.
- Implementar os dois cards externos da home e manter notícias internas e seus metadados.
- Integrar banners, apoiadores e redes.
- Implementar sitemap, robots e página de privacidade.

### Fase 3: administração

- Implementar autenticação e funções.
- Criar CRUD editorial e prévia.
- Criar gerenciamento de banners e mídias.
- Adicionar auditoria.

### Fase 4: gerador

- Implementar upload e validação local.
- Implementar enquadramento por mouse, toque e teclado.
- Renderizar temas e três formatos.
- Adicionar download e compartilhamento com fallback.

### Fase 5: lançamento

- Executar testes de segurança, acessibilidade e compatibilidade.
- Revisar conteúdo e informações legais.
- Conferir fonte, data e destino dos dois links externos da seção de notícias.
- Configurar produção, backups e monitoramento.
- Fazer teste de carga leve e smoke test final.

## Decisões pendentes

- Identidade visual definitiva.
- Conteúdo e ordem exata das seções.
- Links oficiais de Instagram, Facebook, YouTube, TikTok e WhatsApp.
- Provedor definitivo de banco e storage.
- Método de autenticação e política de MFA.
- Editor de conteúdo rico a ser adotado.
- Necessidade de agendamento automatizado fora do acesso normal ao site.
- Política e ferramenta de analytics.

## Registro de decisões

Decisões estruturais futuras devem ser registradas em `docs/decisions/` no formato `NNNN-titulo.md`, contendo contexto, decisão, alternativas, consequências e data. Uma decisão substituída permanece no histórico com indicação clara de seu novo estado.
