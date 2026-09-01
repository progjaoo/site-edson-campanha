# Documentação do projeto

Este diretório é a fonte de verdade para a construção e manutenção do site institucional da campanha de Edson Albertassi. O produto é uma aplicação web responsiva, construída com Next.js e React, com curadoria editorial na home, banners de campanha e um gerador de imagens para apoiadores.

## Ordem recomendada de leitura

1. [Visão geral](./01-visao-geral.md)
2. [Arquitetura](./02-arquitetura.md)
3. [Stack tecnológica](./03-stack-tecnologica.md)
4. [Design system](./04-design-system.md)
5. [Padrões de frontend](./05-frontend.md)
6. [Banco de dados](./06-banco-de-dados.md)
7. [Conteúdo editorial e curadoria](./07-blog-e-admin.md)
8. [Gerador de imagens](./08-gerador-de-imagens.md)
9. [Segurança, privacidade e LGPD](./09-seguranca-e-lgpd.md)
10. [Testes e qualidade](./10-testes-e-qualidade.md)
11. [Git e contribuição](./11-git-e-contribuicao.md)
12. [Deploy e operação](./12-deploy-e-operacao.md)
13. [Referência funcional e roadmap](./13-referencia-e-roadmap.md)
14. [Conteúdo editorial e SEO](./14-conteudo-e-seo.md)
15. [APIs e contratos internos](./15-api-e-contratos.md)
16. [Configuração local](./16-configuracao-local.md)

## Documentos complementares

- [Manual operacional provisório](./MANUAL_DO_PROJETO.md): anotações anteriores que precisam ser verificadas contra o código
- [Registros de decisão](./decisions/README.md): padrão para documentar decisões arquiteturais futuras

## Resumo técnico

| Área | Decisão |
| --- | --- |
| Tipo | Aplicação web responsiva |
| Framework | Next.js com React e TypeScript |
| Banco e ORM | PostgreSQL e Prisma |
| Interface | Tailwind CSS, shadcn/ui e Radix UI |
| Ícones | Lucide React |
| Autenticação | Não há área administrativa no produto atual |
| Arquivos públicos | Storage compatível com S3 |
| Fotos de apoiadores | Processamento local no navegador com Canvas |
| Testes | Vitest, Testing Library e Playwright |

## Regras que prevalecem

- A privacidade do apoiador tem prioridade sobre conveniência operacional.
- Conteúdo público deve ser acessível, responsivo e indexável.
- Componentes de interface devem reutilizar tokens e primitivas do design system.
- Alterações de banco exigem migration Prisma versionada.
- Nenhum segredo deve ser salvo no repositório.
- Decisões ainda dependentes de material da campanha aparecem como **provisórias**.

## Escopo atual

O primeiro lançamento inclui landing page com curadoria de matérias externas, banners de divulgação, redes sociais, bloco de apoiadores e geração de avatar, post e story. O alias `/noticias` mantém a mesma landing page, sem painel administrativo ou notícias internas. Recursos fora desse escopo só entram após uma decisão registrada no roadmap.

## Como atualizar esta documentação

Uma mudança de arquitetura, modelo de dados, contrato de API, comportamento crítico ou padrão visual deve atualizar o documento correspondente na mesma entrega. Links relativos devem continuar válidos e exemplos nunca devem conter credenciais reais.
