# Agentes de desenvolvimento

Esta pasta reúne os agentes de inteligência artificial especializados no desenvolvimento do site de campanha de Edson Albertassi. Cada arquivo funciona como uma instrução operacional: define contexto obrigatório, responsabilidades, limites, entregáveis e critérios de handoff.

## Como escolher um agente

Use o agente cuja responsabilidade principal corresponde ao resultado esperado. Uma tarefa que atravessa três ou mais áreas deve começar pelo [orquestrador técnico](./01-orquestrador-tecnico.md), que divide o trabalho e define a ordem dos handoffs.

| Agente | Use quando precisar |
| --- | --- |
| [Orquestrador técnico](./01-orquestrador-tecnico.md) | Decompor entregas amplas, coordenar especialistas ou resolver dependências entre áreas |
| [Produto e requisitos](./02-produto-e-requisitos.md) | Refinar escopo, critérios de aceite, prioridades e regras de negócio |
| [Arquitetura de software](./03-arquitetura-de-software.md) | Definir limites de módulos, fluxos, contratos e decisões estruturais |
| [UX/UI e design system](./04-ux-ui-design-system.md) | Projetar experiência, responsividade, componentes e identidade visual |
| [Frontend React e Next.js](./05-frontend-react-nextjs.md) | Implementar páginas, componentes, formulários, estados e SEO técnico |
| [Backend, APIs e autenticação](./06-backend-apis-autenticacao.md) | Implementar regras no servidor, sessões, autorização, uploads e contratos HTTP |
| [Banco de dados e Prisma](./07-banco-de-dados-prisma.md) | Modelar dados, criar migrations, índices, consultas e seeds |
| [Gerador de imagens](./08-gerador-de-imagens.md) | Implementar upload local, Canvas, gestos, molduras e exportações |
| [Segurança e LGPD](./09-seguranca-lgpd.md) | Avaliar autenticação, dados pessoais, uploads, segredos e riscos de segurança |
| [QA, testes e acessibilidade](./10-qa-testes-acessibilidade.md) | Criar estratégia de testes, validar fluxos e auditar acessibilidade |
| [DevOps e observabilidade](./11-devops-observabilidade.md) | Configurar ambientes, CI/CD, deploy, banco, storage, logs e rollback |
| [Conteúdo editorial e SEO](./12-conteudo-editorial-seo.md) | Preparar notícias, metadados, fontes, texto alternativo e conteúdo jurídico |

## Documentação obrigatória

Todos os agentes começam pelo [índice da documentação](../docs/README.md). Depois, leem apenas os documentos específicos indicados em seu arquivo. A documentação é a fonte de verdade; divergências entre código, tarefa e documentação devem ser registradas antes da implementação.

## Protocolo comum

Todo agente deve seguir esta sequência:

1. Ler o objetivo, os arquivos relacionados e a documentação obrigatória
2. Confirmar o resultado esperado e identificar restrições
3. Inspecionar o estado atual antes de propor alterações
4. Registrar premissas quando faltarem informações não bloqueantes
5. Implementar somente o escopo autorizado
6. Executar validações proporcionais ao risco
7. Entregar resumo, arquivos alterados, evidências e pendências
8. Fazer handoff explícito quando outra especialidade precisar continuar

## Formato de entrega

Cada agente encerra seu trabalho com:

```text
Resultado:
- O que foi concluído

Arquivos:
- Caminhos criados ou alterados

Validação:
- Comandos e resultados observados

Decisões:
- Premissas e trade-offs relevantes

Handoff:
- Próximo agente e ação necessária, ou “nenhum”
```

## Regras compartilhadas

- Não expor senhas, tokens, cookies, fotos pessoais ou dados de produção
- Não armazenar fotos de apoiadores no servidor
- Não alterar arquitetura ou schema sem atualizar a documentação relacionada
- Não afirmar que algo funciona sem executar uma verificação recente
- Não publicar conteúdo jurídico sem revisão responsável
- Não substituir validação de servidor por controle visual no cliente
- Não introduzir dependência sem justificar custo, licença e manutenção
- Preservar mudanças preexistentes que não façam parte da tarefa

## Sequências recomendadas

### Nova funcionalidade

`Produto → Arquitetura → UX/UI → Frontend/Backend/Dados → Segurança → QA → DevOps`

### Correção de defeito

`QA ou especialista da área → implementação responsável → QA`

### Alteração de banco

`Arquitetura → Banco de dados → Backend → Segurança → QA → DevOps`

### Nova seção pública

`Produto → Conteúdo → UX/UI → Frontend → QA`

### Mudança no gerador de imagens

`Produto → Gerador de imagens → UX/UI → Segurança → QA`

## Handoffs obrigatórios

- Alteração visual relevante: UX/UI revisa antes de QA
- Mudança de autenticação ou upload: Segurança revisa antes do deploy
- Migration de produção: Banco de dados e DevOps revisam o plano
- Conteúdo sobre Justiça: Conteúdo editorial exige validação jurídica humana
- Mudança em formato de imagem: Gerador e QA confirmam dimensões e navegadores
