# Testes e qualidade

## Estratégia

Os testes devem proteger regras de publicação, autorização, seleção de banners e composição das imagens. Detalhes internos e estilos frágeis não devem ser o foco.

## Pirâmide de testes

### Unitários

- Geração e validação de slug.
- Elegibilidade e prioridade de banners.
- Transições de status editorial.
- Validação Zod.
- Cálculo de `cover` e enquadramento no canvas.
- Nomes e dimensões de exportação.

### Componentes

- Formulários com erros acessíveis.
- Cards e estados vazios.
- Navegação por teclado em modais e menus.
- Controles do editor com mouse e teclado.
- Estados de upload e publicação.

### Integração

- Serviços Prisma contra banco de teste.
- Autorização de Server Actions e Route Handlers.
- Upload e exclusão de mídia.
- Publicação e invalidação de cache.

### Ponta a ponta

- Visitante navega da landing page até uma notícia.
- Admin entra, cria rascunho, publica e visualiza no site.
- Admin programa e desativa banner.
- Apoiador envia foto, ajusta e baixa os três formatos.
- Usuário não autenticado não acessa o admin.

## Critérios mínimos por entrega

- Typecheck sem erros.
- Lint sem erros.
- Testes relacionados à mudança passando.
- Build de produção concluído.
- Fluxo principal verificado em viewport mobile e desktop.
- Nenhum erro relevante no console.

## Acessibilidade

- Usar regras automatizadas com axe onde fizer sentido.
- Testar teclado manualmente nos fluxos críticos.
- Conferir contraste, foco, rótulos, títulos e mensagens de erro.
- Testar o editor com controles alternativos aos gestos.
- Automação não substitui revisão humana.

## Desempenho

Metas iniciais no percentil 75 de dispositivos móveis:

| Métrica | Meta |
| --- | ---: |
| LCP | até 2,5 s |
| INP | até 200 ms |
| CLS | até 0,1 |

A foto principal deve ter prioridade e dimensões explícitas. Scripts do admin e do editor não devem aumentar o bundle inicial da landing page.

## Navegadores suportados

- Duas versões estáveis mais recentes de Chrome, Edge, Firefox e Safari.
- Safari iOS e Chrome Android atuais.
- Melhorias avançadas, como compartilhamento nativo, usam detecção de recurso e fallback.

## Dados de teste

- Fixtures usam nomes e imagens fictícias ou autorizadas.
- Credenciais de teste são exclusivas do ambiente de teste.
- Testes não dependem de conteúdo de produção.
- Cada suíte limpa ou isola os dados que cria.

## Relato de defeitos

Um bug deve conter comportamento observado, comportamento esperado, ambiente, passos mínimos, evidências sem dados sensíveis e impacto. Falhas de segurança não devem ser abertas em canal público.

## Definição de pronto

Uma tarefa está pronta quando implementação, testes, acessibilidade, estados de erro, documentação afetada e revisão foram concluídos. “Funciona na máquina local” não é critério de conclusão.
