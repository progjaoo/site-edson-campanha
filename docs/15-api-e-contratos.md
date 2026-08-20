# APIs e contratos internos

Este documento define padrões para Server Actions, Route Handlers e serviços internos. O projeto não expõe uma API pública no MVP.

## Quando usar cada interface

| Interface | Uso |
| --- | --- |
| Server Component | Leitura de dados durante renderização |
| Server Action | Mutação iniciada por formulário da aplicação |
| Route Handler | Upload, webhook, download ou integração que exige HTTP explícito |
| Função de serviço | Regra de negócio reutilizada por mais de uma interface |

## Contrato de entrada

- Trate toda entrada como não confiável
- Valide no servidor com schema Zod
- Normalize espaços, e-mail, slug e datas antes de persistir
- Rejeite campos desconhecidos em ações sensíveis
- Não aceite `userId`, função ou estado de publicação como autoridade do cliente

## Resultado de ações

Server Actions devem retornar uma união discriminada. O cliente consegue tratar sucesso e erro sem depender de texto instável.

```typescript
type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      code: "VALIDATION" | "FORBIDDEN" | "CONFLICT" | "INTERNAL";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
```

Mensagens destinadas à interface ficam em português. Logs internos podem incluir contexto técnico e um identificador de correlação, sem segredo ou dado pessoal desnecessário.

## Status HTTP

Route Handlers devem usar códigos consistentes:

| Código | Uso |
| ---: | --- |
| 200 | Leitura ou atualização concluída |
| 201 | Recurso criado |
| 204 | Exclusão ou ação sem corpo |
| 400 | Entrada inválida |
| 401 | Sessão ausente ou inválida |
| 403 | Sessão sem permissão |
| 404 | Recurso inexistente |
| 409 | Conflito de estado ou unicidade |
| 413 | Arquivo acima do limite |
| 429 | Limite de requisições excedido |
| 500 | Falha interna inesperada |

## Autorização

Cada mutação executa estas etapas:

1. Obter e validar a sessão
2. Confirmar função e usuário ativo
3. Validar a entrada
4. Buscar o recurso e verificar seu estado
5. Executar a transação
6. Registrar auditoria
7. Invalidar o cache relacionado
8. Retornar resultado seguro

## Transações e idempotência

- Agrupe persistência e auditoria na mesma transação quando necessário
- Evite criar dois recursos por duplo envio
- Webhooks futuros devem validar assinatura e armazenar identificador do evento
- Publicação agendada precisa tolerar execução repetida
- Upload deve remover o objeto se a gravação dos metadados falhar

## Paginação e filtros

Listagens administrativas podem usar paginação por cursor ou página. A resposta deve incluir itens, posição atual e indicação de próxima página. Defina limites máximos para impedir consultas excessivas.

## Datas e fuso

Contratos transportam datas em ISO 8601 e UTC. A interface exibe datas no fuso `America/Sao_Paulo`, salvo decisão contrária registrada. O servidor não deve interpretar uma data sem fuso de forma implícita.

## Compatibilidade

Mudanças internas podem evoluir com o aplicativo, mas devem preservar formulários e rotas durante o mesmo deploy. Uma API pública futura exigirá versionamento, documentação própria e política de descontinuação.
