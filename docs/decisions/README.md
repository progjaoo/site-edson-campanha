# Registros de decisão arquitetural

Este diretório armazena decisões que afetam arquitetura, segurança, dados ou operação. Um registro explica por que a equipe escolheu uma alternativa e quais consequências aceitou.

## Nome do arquivo

Use número sequencial com quatro dígitos e título em kebab-case:

```text
0001-nextjs-full-stack.md
0002-local-photo-processing.md
```

## Estrutura

Copie [o modelo de decisão](./template.md), substitua os campos e inclua o arquivo no mesmo pull request da mudança. Registros aprovados não são apagados. Marque uma decisão substituída e aponte para o novo registro.

## Estados

- `proposed`: em discussão
- `accepted`: aprovada
- `deprecated`: mantida apenas por compatibilidade
- `superseded`: substituída por outra decisão
