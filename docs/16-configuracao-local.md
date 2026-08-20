# Configuração local

Este guia descreve a configuração esperada para desenvolvimento. Execute os comandos depois que a estrutura inicial do projeto existir.

## Pré-requisitos

- Node.js na versão de longo suporte definida pelo projeto
- `pnpm` na versão declarada em `packageManager`
- PostgreSQL local ou uma instância de desenvolvimento isolada
- Credenciais de storage exclusivas para desenvolvimento, se o fluxo de upload for testado

## Primeira configuração

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Copie o modelo de variáveis sem sobrescrever um arquivo existente:

   ```bash
   cp .env.example .env.local
   ```

3. Preencha apenas credenciais de desenvolvimento em `.env.local`.

4. Gere o cliente Prisma:

   ```bash
   pnpm prisma generate
   ```

5. Aplique as migrations locais:

   ```bash
   pnpm prisma migrate dev
   ```

6. Crie os dados demonstrativos:

   ```bash
   pnpm prisma db seed
   ```

7. Inicie o servidor:

   ```bash
   pnpm dev
   ```

## Scripts esperados

| Script | Finalidade |
| --- | --- |
| `pnpm dev` | Iniciar desenvolvimento |
| `pnpm build` | Gerar build de produção |
| `pnpm start` | Executar build localmente |
| `pnpm lint` | Verificar regras estáticas |
| `pnpm typecheck` | Validar tipos |
| `pnpm test` | Executar testes unitários |
| `pnpm test:e2e` | Executar Playwright |
| `pnpm prisma:generate` | Gerar Prisma Client |
| `pnpm prisma:migrate` | Aplicar migration local |
| `pnpm seed` | Criar dados demonstrativos |

Os nomes finais devem existir em `package.json`. Atualize esta tabela quando um script mudar.

## Dados administrativos locais

O seed pode criar um administrador apenas em desenvolvimento. Informe e-mail e senha por variáveis locais e não use as mesmas credenciais em preview ou produção.

## Diagnóstico inicial

Se a aplicação não iniciar, verifique:

- Versões de Node.js e `pnpm`
- Conexão definida em `DATABASE_URL`
- Migrations aplicadas
- Geração do Prisma Client
- Variáveis obrigatórias ausentes
- Porta local ocupada

Não inclua o conteúdo de `.env.local` ao compartilhar logs.
