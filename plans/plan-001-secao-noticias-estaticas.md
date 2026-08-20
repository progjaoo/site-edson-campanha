# Static External News Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o blog dinâmico da landing page por dois cards horizontais e estáticos que apresentam matérias externas verificadas, reorganizando a home para `Hero → WhatsApp → Redes Sociais → Galeria → Notícias`.

**Architecture:** A seção deixa de buscar conteúdo no servidor e passa a consumir uma constante TypeScript versionada. Cada card exibe veículo, data, título, resumo editorial curto e link externo seguro. O fluxo público da home deixa de consumir o conteúdo dinâmico, mas as rotas de admin, API, armazenamento em JSON, upload e páginas internas permanecem preservadas para não alterar funcionalidades existentes fora da home.

**Implementation override:** A instrução mais recente do solicitante exige que funcionalidades e páginas existentes não sejam alteradas. Por isso, a remoção do fluxo administrativo/dinâmico descrita originalmente na Task 4 fica adiada: nesta execução apenas a home passa a usar as duas matérias externas fixas. Os artefatos administrativos continuam disponíveis e documentados.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript 5, Tailwind CSS 3, Framer Motion, Lucide React, Vitest, React Testing Library e jsdom.

**Spec:** `docs/README.md`, `docs/01-visao-geral.md`, `docs/04-design-system.md`, `docs/05-frontend.md`, `docs/10-testes-e-qualidade.md`, `docs/14-conteudo-e-seo.md` e os requisitos desta tarefa.

**Lead agent:** `agents/01-orquestrador-tecnico.md`, porque a mudança coordena produto, conteúdo editorial, UX/UI, frontend e QA.

**Supporting agents:** `agents/02-produto-e-requisitos.md`, `agents/04-ux-ui-design-system.md`, `agents/05-frontend-react-nextjs.md`, `agents/10-qa-testes-acessibilidade.md` e `agents/12-conteudo-editorial-seo.md`.

## Global Constraints

- A home deve seguir exatamente esta ordem: Hero, WhatsApp, Redes Sociais, Galeria e Notícias.
- Notícias deve ser a última seção dentro do elemento `main`.
- A home deve renderizar exatamente duas matérias externas, sem consultar a API, banco, JSON mutável ou tela administrativa. O fluxo administrativo existente continua disponível para suas páginas e consumidores próprios.
- Cada card deve exibir veículo, data, título, resumo curto e botão **Ler matéria**.
- Os links devem abrir a matéria original em nova aba com `target="_blank"` e `rel="noopener noreferrer"`.
- O conteúdo jurídico deve reproduzir apenas título, veículo e data da fonte; o resumo será uma paráfrase curta, sem apresentar conclusão jurídica adicional.
- Os cards serão horizontais a partir de `md` e empilhados internamente em telas menores.
- Não serão usadas imagens editoriais de terceiros nesta entrega. Um bloco de fonte com ícone substitui a miniatura e evita hotlink ou uso sem autorização.
- A seção deve continuar acessível por `/#noticias` no cabeçalho e no rodapé.
- Nenhuma mudança será feita em `HeroSection.tsx` ou `SocialSection.tsx`, que já possuem alterações locais não relacionadas.
- O plano usa o gerenciador existente `npm` e mantém `package-lock.json` como único lockfile.
- Cada tarefa deve encerrar com teste próprio e commit coerente.

## Conteúdo editorial verificado

| Campo | Matéria 1 | Matéria 2 |
| --- | --- | --- |
| Veículo | Informa Cidade | Agenda do Poder |
| Data | 27 de março de 2026 | 7 de abril de 2026 |
| Título | Edson Albertassi é inocentado pela Justiça | Quando prender sem prova vira abuso de poder |
| Resumo local | O Órgão Especial do TJ-RJ arquivou por unanimidade a ação da Operação Cadeia Velha após reconhecer nulidade das provas e ausência de justa causa. | O artigo analisa o arquivamento da Operação Cadeia Velha e debate os limites do poder estatal diante de prisões sustentadas por provas consideradas inválidas. |
| URL | `https://www.informacidade.com.br/edson-albertassi-e-inocentado-pela-justica/` | `https://agendadopoder.com.br/quando-prender-sem-prova-vira-abuso-de-poder/` |

As fontes informam os horários de 11:56 e 18:29, respectivamente. A interface exibirá apenas a data porque esse foi o formato solicitado.

## File Structure

### Create

- `vitest.config.ts`: configuração de testes com jsdom e alias `@`
- `src/test/setup.ts`: extensão de assertions do Testing Library
- `src/data/external-news.ts`: contrato e conteúdo imutável das duas matérias
- `src/data/external-news.test.ts`: contrato editorial e segurança das URLs
- `src/components/sections/NewsSection.test.tsx`: comportamento e acessibilidade dos cards
- `src/app/page.test.tsx`: ordem das seções da landing page

### Modify

- `package.json`: scripts e dependências de teste
- `package-lock.json`: lockfile atualizado pelo npm
- `src/components/sections/NewsSection.tsx`: dois cards horizontais estáticos
- `src/app/page.tsx`: remoção da consulta dinâmica e nova ordem das seções
- `src/app/sitemap.ts`: manter as rotas internas existentes; a home não depende delas
- `src/types/index.ts`: remoção dos tipos `Noticia` e `AdminUser`
- `src/lib/utils.ts`: remoção de `slugify`, mantendo `cn` e `formatDate`
- `next.config.mjs`: remoção da configuração exclusiva do upload editorial
- `docs/01-visao-geral.md`: escopo público com duas matérias externas, preservando o admin existente
- `docs/02-arquitetura.md`: fluxo estático da home e preservação das rotas de notícia/admin
- `docs/04-design-system.md`: ordem real da landing e dois cards horizontais
- `docs/06-banco-de-dados.md`: retirada de `Post` do escopo atual
- `docs/07-blog-e-admin.md`: documentar a home fixa sem remover o fluxo editorial administrativo existente
- `docs/13-referencia-e-roadmap.md`: requisito de duas notícias fixas e remoção da fase de CRUD editorial
- `docs/14-conteudo-e-seo.md`: regra de atribuição para links externos
- `docs/MANUAL_DO_PROJETO.md`: remoção das instruções do gerenciador de notícias e Vercel Blob

### Preserve (explicit user constraint)

- `src/app/admin/page.tsx`
- `src/app/admin/noticias/page.tsx`
- `src/app/api/auth/route.ts`
- `src/app/api/noticias/route.ts`
- `src/app/api/upload/route.ts`
- `src/app/noticias/[slug]/page.tsx`
- `src/lib/auth.ts`
- `src/lib/news-storage.ts`
- `src/data/noticias.json`

## Handoff order

1. Produto e conteúdo confirmam os dois registros editoriais
2. Frontend cria o contrato estático e os testes
3. UX/UI e frontend implementam os cards horizontais
4. Frontend reorganiza a landing page
5. Arquitetura registra que a home não consome o fluxo dinâmico; os artefatos existentes são preservados
6. Documentação registra o novo escopo
7. QA executa testes automatizados, build e revisão responsiva

---

### Task 1: Add the test harness and fixed editorial contract

**Owner:** Frontend React e Next.js, com validação do agente de Conteúdo editorial e SEO.

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/data/external-news.test.ts`
- Create: `src/data/external-news.ts`

**Interfaces:**
- Consumes: `formatDate(dateString: string): string` de `src/lib/utils.ts`
- Produces: `ExternalNewsItem` e `EXTERNAL_NEWS: readonly ExternalNewsItem[]`

- [ ] **Step 1: Install the testing dependencies**

Run:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: `package.json` and `package-lock.json` include the four development dependencies.

- [ ] **Step 2: Add deterministic test scripts**

Add to `package.json` under `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Keep the existing `dev`, `build`, `start`, and `lint` scripts unchanged.

- [ ] **Step 3: Configure Vitest and the DOM assertions**

Create `vitest.config.ts`:

```typescript
const path = require("node:path");
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  oxc: { jsx: "react-jsx" },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Write the failing editorial contract test**

Create `src/data/external-news.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { EXTERNAL_NEWS } from "./external-news";

describe("EXTERNAL_NEWS", () => {
  it("contains only the two approved external articles", () => {
    expect(EXTERNAL_NEWS).toHaveLength(2);
    expect(EXTERNAL_NEWS.map((item) => item.source)).toEqual([
      "Informa Cidade",
      "Agenda do Poder",
    ]);
    expect(EXTERNAL_NEWS.map((item) => item.url)).toEqual([
      "https://www.informacidade.com.br/edson-albertassi-e-inocentado-pela-justica/",
      "https://agendadopoder.com.br/quando-prender-sem-prova-vira-abuso-de-poder/",
    ]);
  });

  it("uses valid HTTPS URLs and ISO publication dates", () => {
    for (const item of EXTERNAL_NEWS) {
      expect(new URL(item.url).protocol).toBe("https:");
      expect(Number.isNaN(Date.parse(item.publishedAt))).toBe(false);
      expect(item.excerpt.length).toBeGreaterThan(80);
      expect(item.excerpt.length).toBeLessThanOrEqual(220);
    }
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run:

```bash
npm test -- src/data/external-news.test.ts
```

Expected: FAIL because `src/data/external-news.ts` does not exist.

- [ ] **Step 6: Implement the static data module**

Create `src/data/external-news.ts`:

```typescript
export interface ExternalNewsItem {
  id: string;
  source: "Informa Cidade" | "Agenda do Poder";
  publishedAt: string;
  title: string;
  excerpt: string;
  url: string;
}

export const EXTERNAL_NEWS = [
  {
    id: "informa-cidade-inocentado",
    source: "Informa Cidade",
    publishedAt: "2026-03-27T11:56:00-03:00",
    title: "Edson Albertassi é inocentado pela Justiça",
    excerpt:
      "O Órgão Especial do TJ-RJ arquivou por unanimidade a ação da Operação Cadeia Velha após reconhecer nulidade das provas e ausência de justa causa.",
    url: "https://www.informacidade.com.br/edson-albertassi-e-inocentado-pela-justica/",
  },
  {
    id: "agenda-poder-abuso",
    source: "Agenda do Poder",
    publishedAt: "2026-04-07T18:29:41-03:00",
    title: "Quando prender sem prova vira abuso de poder",
    excerpt:
      "O artigo analisa o arquivamento da Operação Cadeia Velha e debate os limites do poder estatal diante de prisões sustentadas por provas consideradas inválidas.",
    url: "https://agendadopoder.com.br/quando-prender-sem-prova-vira-abuso-de-poder/",
  },
] as const satisfies readonly ExternalNewsItem[];
```

- [ ] **Step 7: Run the focused test**

Run:

```bash
npm test -- src/data/external-news.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 8: Commit the contract and test foundation**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts src/data/external-news.ts src/data/external-news.test.ts
git commit -m "test(news): add static external news contract"
```

---

### Task 2: Replace the dynamic grid with two horizontal external cards

**Owner:** UX/UI e Frontend React e Next.js.

**Files:**
- Create: `src/components/sections/NewsSection.test.tsx`
- Modify: `src/components/sections/NewsSection.tsx`

**Interfaces:**
- Consumes: `EXTERNAL_NEWS` and `ExternalNewsItem` from `src/data/external-news.ts`
- Consumes: `formatDate(dateString: string): string` from `src/lib/utils.ts`
- Produces: `NewsSection(): JSX.Element` without props or network state

- [ ] **Step 1: Write the failing component test**

Create `src/components/sections/NewsSection.test.tsx`:

```tsx
import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsSection } from "./NewsSection";

vi.mock("framer-motion", () => ({
  motion: {
    article: ({ children }: { children: ReactNode }) => <article>{children}</article>,
  },
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: ReactNode }) => (
    <section>{children}</section>
  ),
}));

describe("NewsSection", () => {
  it("renders two attributed external articles", () => {
    render(<NewsSection />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(2);
    expect(within(cards[0]).getByText("Informa Cidade")).toBeVisible();
    expect(within(cards[1]).getByText("Agenda do Poder")).toBeVisible();

    for (const card of cards) {
      const link = within(card).getByRole("link", { name: /ler matéria/i });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("shows the verified dates and titles", () => {
    render(<NewsSection />);

    expect(screen.getByText("27 de março de 2026")).toBeVisible();
    expect(screen.getByText("7 de abril de 2026")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Edson Albertassi é inocentado pela Justiça",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Quando prender sem prova vira abuso de poder",
      }),
    ).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the component test to verify it fails**

Run:

```bash
npm test -- src/components/sections/NewsSection.test.tsx
```

Expected: FAIL because the current component requires dynamic props and renders the old four-column cards.

- [ ] **Step 3: Remove dynamic imports, props, state and loading UI**

In `src/components/sections/NewsSection.tsx`:

- Remove `useState`, `useEffect`, `next/link`, `next/image`, `Noticia`, `Skeleton`, and `NewsSectionProps`
- Import `EXTERNAL_NEWS`, `formatDate`, `Newspaper`, `CalendarDays`, and `ArrowUpRight`
- Keep `motion` and `AnimatedSection` for the existing reveal behavior
- Change the signature to `export function NewsSection()`

The component must not contain `fetch`, `initialNoticias`, `loading`, or `/noticias/`.

- [ ] **Step 4: Implement the horizontal card structure**

Use this structure inside the existing section container:

```tsx
<div className="grid gap-6">
  {EXTERNAL_NEWS.map((item, index) => (
    <motion.article
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group grid overflow-hidden rounded-3xl border border-[#1256CE]/15 bg-[#F5F8FF] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1256CE]/40 hover:shadow-xl md:grid-cols-[minmax(220px,0.34fr)_minmax(0,0.66fr)]"
    >
      <div className="flex min-h-44 flex-col justify-between bg-[#003967] p-6 text-white sm:p-8">
        <Newspaper className="h-8 w-8 text-[#FBE502]" aria-hidden="true" />
        <p className="mt-8 text-sm leading-relaxed text-white/80">
          Matéria publicada no jornal
          <strong className="mt-1 block font-archivo text-xl text-white">
            {item.source}
          </strong>
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-white/75">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div className="space-y-3">
          <h3 className="font-archivo text-2xl font-extrabold leading-tight text-[#003967] sm:text-3xl">
            {item.title}
          </h3>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {item.excerpt}
          </p>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-[#FBE502] px-5 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1256CE] focus-visible:ring-offset-2"
        >
          Ler matéria
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  ))}
</div>
```

- [ ] **Step 5: Keep and refine the section heading**

Retain `id="noticias"`, the green marker, and the campaign typography. Add the supporting sentence below the heading:

```tsx
<p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
  Leia as matérias publicadas sobre a decisão da Justiça e seus desdobramentos.
</p>
```

- [ ] **Step 6: Run the focused component tests**

Run:

```bash
npm test -- src/components/sections/NewsSection.test.tsx
```

Expected: PASS with 2 tests and no React warnings.

- [ ] **Step 7: Commit the section**

```bash
git add src/components/sections/NewsSection.tsx src/components/sections/NewsSection.test.tsx
git commit -m "feat(news): show two external horizontal cards"
```

---

### Task 3: Reorder the landing page and make News the final section

**Owner:** Frontend React e Next.js.

**Files:**
- Create: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `HeroSection`, `WhatsAppSection`, `SocialSection`, `GallerySection`, and `NewsSection`
- Produces: synchronous `HomePage(): JSX.Element` with the approved order

- [ ] **Step 1: Write the failing order test**

Create `src/app/page.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("@/components/sections/HeroSection", () => ({
  HeroSection: () => <section data-section="hero" />,
}));
vi.mock("@/components/sections/WhatsAppSection", () => ({
  WhatsAppSection: () => <section data-section="whatsapp" />,
}));
vi.mock("@/components/sections/SocialSection", () => ({
  SocialSection: () => <section data-section="social" />,
}));
vi.mock("@/components/sections/GallerySection", () => ({
  GallerySection: () => <section data-section="gallery" />,
}));
vi.mock("@/components/sections/NewsSection", () => ({
  NewsSection: () => <section data-section="news" />,
}));

describe("HomePage", () => {
  it("renders the approved section order with news last", () => {
    const { container } = render(<HomePage />);
    const order = [...container.querySelectorAll("main > [data-section]")].map(
      (section) => section.getAttribute("data-section"),
    );

    expect(order).toEqual([
      "hero",
      "whatsapp",
      "social",
      "gallery",
      "news",
    ]);
  });
});
```

- [ ] **Step 2: Run the order test to verify it fails**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: FAIL because the current order is Hero, Gallery, Social, News, WhatsApp and the page still awaits `getNoticias()`.

- [ ] **Step 3: Remove the dynamic dependency and reorder the components**

Replace `src/app/page.tsx` with:

```tsx
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { WhatsAppSection } from "@/components/sections/WhatsAppSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatsAppSection />
      <SocialSection />
      <GallerySection />
      <NewsSection />
    </main>
  );
}
```

Do not restore `JingleSection` as part of this task.

- [ ] **Step 4: Run the order test**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: PASS with 1 test.

- [ ] **Step 5: Run both feature test files**

Run:

```bash
npm test -- src/app/page.test.tsx src/components/sections/NewsSection.test.tsx
```

Expected: PASS with 3 tests.

- [ ] **Step 6: Commit the landing page order**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "refactor(home): place news after gallery"
```

---

### Task 4: Preserve the existing dynamic news and admin publishing flow

**Owner:** Arquitetura de software e Frontend React e Next.js.

**Files:**
- Preserve: `src/app/admin/page.tsx`
- Preserve: `src/app/admin/noticias/page.tsx`
- Preserve: `src/app/api/auth/route.ts`
- Preserve: `src/app/api/noticias/route.ts`
- Preserve: `src/app/api/upload/route.ts`
- Preserve: `src/app/noticias/[slug]/page.tsx`
- Preserve: `src/lib/auth.ts`
- Preserve: `src/lib/news-storage.ts`
- Preserve: `src/data/noticias.json`
- Preserve: `src/app/sitemap.ts`
- Preserve: `src/types/index.ts`
- Preserve: `src/lib/utils.ts`
- Preserve: `next.config.mjs`
- Preserve: existing Blob dependency and package scripts

**Interfaces:**
- Removes from the home consumption path: `getNoticias` import, dynamic fetch and internal news links in `NewsSection`
- Preserves: `Noticia`, `AdminUser`, `getNoticias`, `getNoticiaBySlug`, `saveNoticia`, `deleteNoticia`, `slugify`, admin authentication, news API/upload routes, sitemap routes, `cn`, `formatDate`, `PhotoFormat`, `FormatConfig`, `FrameTemplate`, `/#noticias`, `robots.ts`

- [ ] **Step 1: Record the legacy references before implementation**

Run:

```bash
rg -n "Noticia|getNoticias|news-storage|/api/noticias|/api/upload|/admin/noticias|slugify|@vercel/blob" src package.json next.config.mjs
```

Expected: references remain in the existing admin/API/storage/detail flow and must not be removed by this task.

- [ ] **Step 2: Do not delete existing admin, API, storage or detail files**

The latest user constraint explicitly preserves the nine existing files. Do not delete or rewrite them. Verify that the home does not import or call the dynamic news flow.

- [ ] **Step 3: Keep dynamic news routes in the sitemap**

Leave `src/app/sitemap.ts` unchanged so existing internal article routes remain discoverable. The home’s static cards do not require changes to the sitemap.

- [ ] **Step 4: Keep shared types and utilities used by existing pages**

In `src/types/index.ts`, preserve `Noticia`, `AdminUser`, and all photo generator types unchanged.

In `src/lib/utils.ts`, preserve `slugify`, `cn`, and `formatDate` because existing admin/detail pages still use them.

- [ ] **Step 5: Keep upload configuration and dependency**

Do not uninstall `@vercel/blob` or remove upload-related configuration. Existing admin/upload behavior is outside the home change and must remain functional.

- [ ] **Step 6: Prove that the home has no dynamic news dependency**

Run:

```bash
rg -n "Noticia|getNoticias|news-storage|/api/noticias|/api/upload|/admin/noticias|slugify|@vercel/blob|BLOB_READ_WRITE_TOKEN|ADMIN_PASSWORD" src package.json next.config.mjs
```

Expected: `NewsSection.tsx` has no `fetch`, `getNoticias`, `news-storage` or internal `/noticias/` link. References elsewhere are expected and preserved.

- [ ] **Step 7: Run the full automated test suite**

Run:

```bash
npm test
```

Expected: all data, component, and page-order tests pass.

- [ ] **Step 8: Run the production build**

Run:

```bash
npm run build
```

Expected: exit code 0. Existing admin/API/detail routes may remain in the route output; this task only changes the home’s news consumer.

- [ ] **Step 9: Record the preservation decision**

Record that Task 4 was intentionally limited by the latest user constraint and that the existing admin/API/storage/detail flow remains unchanged.

---

### Task 5: Align project documentation with the fixed external news scope

**Owner:** Produto e requisitos, Conteúdo editorial e SEO, e Arquitetura de software.

**Files:**
- Modify: `docs/01-visao-geral.md`
- Modify: `docs/02-arquitetura.md`
- Modify: `docs/04-design-system.md`
- Modify: `docs/06-banco-de-dados.md`
- Modify: `docs/07-blog-e-admin.md`
- Modify: `docs/13-referencia-e-roadmap.md`
- Modify: `docs/14-conteudo-e-seo.md`
- Modify: `docs/MANUAL_DO_PROJETO.md`

**Interfaces:**
- Consumes: approved section order and `EXTERNAL_NEWS` contract
- Produces: documentation that no longer directs contributors to an admin news workflow

- [ ] **Step 1: Update the public scope and success criteria**

In `docs/01-visao-geral.md`:

- Replace the three recent/dynamic news cards with two fixed external articles
- Keep the existing news listing, internal news detail, and admin news CRUD documented because the latest user constraint preserves them
- Add the exact landing order
- Add a success criterion that both external links show source and date and open the original publication

- [ ] **Step 2: Update architecture and data ownership**

In `docs/02-arquitetura.md`:

- Document `src/data/external-news.ts → NewsSection → external source` as the home flow while retaining the existing blog/API/Prisma flow for internal pages
- Keep `/noticias`, `/noticias/[slug]`, and news-specific admin routes in route tables
- State that the two home cards require a reviewed code change; internal news continues through the admin workflow

Keep `Post` and its indexes in `docs/06-banco-de-dados.md` because the existing admin and internal news pages still use them.

- [ ] **Step 3: Update visual and editorial guidance**

In `docs/04-design-system.md`:

- Change the wireframe order to Hero, WhatsApp, Social, Gallery, News
- Replace “três notícias” with two horizontal attributed cards
- Document the source/date panel and responsive stacking

In `docs/14-conteudo-e-seo.md`:

- Require vehicle, publication date, exact title, short local paraphrase, and original URL
- State that the site does not republish the full article
- Require legal review if the local summary changes the meaning of the source

- [ ] **Step 4: Replace the old blog/admin guidance**

In `docs/07-blog-e-admin.md`, add the fixed external card behavior for the home while preserving status workflows, scheduled posts, preview, and the dynamic internal news flow.

In `docs/MANUAL_DO_PROJETO.md`, update only the claim that admin-created news populates the home cards. Keep the admin instructions, upload workflow, Vercel Blob setup, internal news-page and dynamic sitemap claims.

- [ ] **Step 5: Update roadmap and reference mapping**

In `docs/13-referencia-e-roadmap.md`:

- Replace the row for three Justice news cards with two fixed external articles
- Keep news CRUD in Phase 3 for the existing internal editorial flow
- Add content-source verification and external-link QA to the launch phase

- [ ] **Step 6: Scan documentation for contradictions**

Run:

```bash
rg -n "três notícias|3 notícias|quatro notícias|4 notícias|admin/noticias|api/noticias|criar notícia|publicar notícia|Vercel Blob|noticias/\[slug\]" docs
```

Expected: the home is described as fixed external cards while existing admin/internal news instructions remain clearly scoped to their own pages.

- [ ] **Step 7: Commit the documentation update**

```bash
git add docs
git commit -m "docs: align news guidance with external cards"
```

---

### Task 6: Run final automated and responsive verification

**Owner:** QA, testes e acessibilidade.

**Files:**
- Verify only; modify implementation only if a failure is reproduced

**Interfaces:**
- Consumes: completed Tasks 1 through 5
- Produces: verification evidence for functional, visual and cleanup requirements

- [ ] **Step 1: Run all tests**

Run:

```bash
npm test
```

Expected: all tests pass with zero failures and no React warnings.

- [ ] **Step 2: Run lint and type validation**

Run:

```bash
npm run lint
npx tsc --noEmit
```

Expected: both commands exit 0.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected: exit code 0 and no dynamic news/admin routes in the route table.

- [ ] **Step 4: Start the app for smoke testing**

Run:

```bash
npm run dev
```

Expected: the application starts on the reported localhost port without compilation errors.

- [ ] **Step 5: Verify the landing order in the browser**

At 390 × 844 px and 1440 × 900 px, inspect `/` and confirm:

1. Hero is first
2. WhatsApp follows Hero
3. Redes Sociais follows WhatsApp
4. Galeria follows Redes Sociais
5. Notícias is the final section before the footer

- [ ] **Step 6: Verify the cards and external navigation**

Confirm for both cards:

- Source and date are visible
- Title and summary are not clipped at the tested widths
- The card stacks on mobile and uses a horizontal two-column layout from `md`
- **Ler matéria** has visible keyboard focus and a minimum height of 44 px
- The first button opens the Informa Cidade URL
- The second button opens the Agenda do Poder URL
- Both anchors use `_blank` and `noopener noreferrer`

- [ ] **Step 7: Verify preserved routes remain available**

Run against the active local server:

```bash
curl -I http://localhost:3000/admin
curl -I http://localhost:3000/admin/noticias
curl -I http://localhost:3000/api/noticias
curl -I http://localhost:3000/noticias/qualquer-slug
```

Expected: the existing admin/API/internal-news routes continue to resolve according to their current behavior. If the development server uses another port, substitute the reported port.

- [ ] **Step 8: Inspect the network panel**

Reload `/` with the network panel open. Expected:

- No request to `/api/noticias`
- No request to article domains before a visitor selects **Ler matéria**
- No failed image request from a third-party publication

- [ ] **Step 9: Run the final home-consumer scan**

Run:

```bash
rg -n "getNoticias|news-storage|/api/noticias|/admin/noticias|@vercel/blob|ADMIN_PASSWORD" src/components/sections/NewsSection.tsx src/app/page.tsx
```

Expected: exit code 1 and no output in the two home files; references in admin/API/storage files remain expected.

- [ ] **Step 10: Commit any verification-only fixes**

If verification required changes, commit only those fixes:

```bash
git add src docs package.json package-lock.json next.config.mjs
git commit -m "fix(news): address static section verification"
```

If no files changed, do not create an empty commit.

## Definition of Done

- The home contains exactly five sections in the approved order
- News is the final section inside `main`
- Exactly two fixed horizontal cards are rendered
- Source, verified date, title, local summary and external link appear on each card
- The home has no dynamic news fetch, while the existing admin editor, news API, upload route, internal article page and JSON storage remain available
- No third-party article image is copied or hotlinked
- Header and footer still navigate to `/#noticias`
- Tests, lint, TypeScript and production build pass
- Preserved admin/API/internal-news routes remain available
- Documentation reflects the new static external-news model

## Self-Review Record

- **Spec coverage:** section order, two articles, attribution, external links, static behavior, admin preservation, responsive layout and documentation each map to a task
- **Placeholder scan:** no unresolved placeholder, vague error-handling step or undefined interface remains
- **Type consistency:** `ExternalNewsItem`, `EXTERNAL_NEWS`, `publishedAt`, `source`, `title`, `excerpt`, and `url` use the same names in data, component and tests
- **Scope control:** jingle, hero content, social content, gallery behavior, WhatsApp content and unrelated local changes remain untouched

## Execution record (2026-08-19)

- Implemented the static external-news contract, component and home-order tests with Vitest and Testing Library.
- Replaced the home’s dynamic news consumer with two horizontal cards and reordered the landing page to Hero → WhatsApp → Redes sociais → Galeria → Notícias.
- Preserved all existing admin, API, upload, storage, internal article and sitemap behavior per the latest user constraint.
- Verified with `npm test`, `npm run lint`, `npx tsc --noEmit` and `npm run build`.
