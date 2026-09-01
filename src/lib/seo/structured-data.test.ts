import { describe, expect, it } from "vitest";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
} from "./structured-data";
import { createPageMetadata } from "./metadata";

describe("dados estruturados públicos", () => {
  it("cria metadata com canonical, Open Graph e Twitter", () => {
    const metadata = createPageMetadata({
      title: "História",
      description: "Trajetória pública de Edson Albertassi.",
      pathname: "/historia",
    });

    expect(metadata.alternates?.canonical).toBe("https://edsonalbertassi.com/historia");
    expect(metadata.openGraph?.url).toBe("https://edsonalbertassi.com/historia");
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("cria breadcrumb com URLs canônicas absolutas", () => {
    const data = createBreadcrumbJsonLd([
      { name: "Início", pathname: "/" },
      { name: "História", pathname: "/historia" },
    ]);

    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[1].item).toBe("https://edsonalbertassi.com/historia");
  });

  it("cria NewsArticle sem fragmentos e com autoria/publicador", () => {
    const data = createArticleJsonLd({
      headline: "Notícia oficial",
      description: "Resumo factual",
      pathname: "/noticias/noticia-oficial",
      imageUrl: "/images/noticia.webp",
      datePublished: "2026-08-01T12:00:00.000Z",
      authorName: "Assessoria de Imprensa",
    });

    expect(data.mainEntityOfPage).toBe("https://edsonalbertassi.com/noticias/noticia-oficial");
    expect(data.image).toEqual(["https://edsonalbertassi.com/images/noticia.webp"]);
    expect(data.author).toEqual({ "@type": "Person", name: "Assessoria de Imprensa" });
    expect(data.publisher).toBeDefined();
  });
});
