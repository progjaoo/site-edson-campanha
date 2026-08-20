# Stack tecnológica

## Base da aplicação

| Tecnologia | Uso | Regra |
| --- | --- | --- |
| Next.js | Framework React full-stack | Usar App Router |
| React | Interface e interatividade | Preferir Server Components |
| TypeScript | Tipagem estática | `strict` habilitado |
| Node.js | Runtime de servidor | Fixar versão LTS no projeto |
| PostgreSQL | Banco relacional | Banco oficial de produção |
| Prisma | Schema, migrations e acesso a dados | Um cliente reutilizado por processo |

## Interface

| Tecnologia | Uso | Regra |
| --- | --- | --- |
| Tailwind CSS | Tokens e composição visual | Evitar valores arbitrários repetidos |
| shadcn/ui | Componentes-base editáveis | Adaptar aos tokens da campanha |
| Radix UI | Primitivas acessíveis | Preservar semântica e foco |
| Lucide React | Ícones | Não substituir texto essencial por ícone |

## Bibliotecas recomendadas

- Zod para validação compartilhada.
- React Hook Form para formulários complexos do admin.
- Auth.js para sessão administrativa.
- `sharp` somente para mídias editoriais processadas no servidor.
- Canvas 2D no navegador para peças dos apoiadores.
- `sanitize-html` ou solução equivalente para conteúdo rico permitido.

## Qualidade

- ESLint para padrões estáticos.
- Prettier para formatação automática.
- Vitest para testes unitários.
- React Testing Library para componentes.
- Playwright para fluxos ponta a ponta.
- Lighthouse para auditorias periódicas de desempenho e acessibilidade.

## Gerenciamento de pacotes

O projeto deve escolher um único gerenciador e versioná-lo no campo `packageManager`. A recomendação é `pnpm` por eficiência de armazenamento. Não misturar arquivos de lock.

## Política de versões

- Usar versões estáveis e suportadas.
- Dependências críticas devem ter versão fixada pelo lockfile.
- Atualizações maiores exigem leitura do guia de migração e execução da suíte completa.
- Pacotes sem manutenção ou com vulnerabilidade conhecida não devem ser introduzidos.

## Variáveis de ambiente previstas

```dotenv
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
STORAGE_ENDPOINT=
STORAGE_REGION=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
NEXT_PUBLIC_SITE_URL=
```

Somente variáveis com prefixo `NEXT_PUBLIC_` podem chegar ao navegador. Credenciais devem existir no cofre da plataforma, nunca em exemplos preenchidos ou commits.

## Escolhas evitadas no MVP

- API separada em Express ou NestJS: adicionaria deploy e contratos sem necessidade atual.
- Redux global: estado da aplicação é majoritariamente de servidor ou local ao editor.
- CMS externo: Prisma e admin próprio já fazem parte do requisito.
- Processamento remoto da selfie: aumenta risco de privacidade sem benefício necessário.
