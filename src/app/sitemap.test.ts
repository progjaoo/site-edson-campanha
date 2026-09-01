import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

const removedSlugs = [
  "radio-88-fm-completa-mais-de-tres-decadas-de-historia-e-lideranca",
  "propostas-para-o-fortalecimento-do-sul-fluminense-e-geracao-de-empregos",
  "compromisso-com-os-valores-da-familia-e-liberdade-religiosa",
];

describe("sitemap público", () => {
  it("inclui somente páginas públicas reais", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const pathname of ["/faca-sua-foto", "/historia", "/politica-de-privacidade"]) {
      expect(urls).toContain(`https://edsonalbertassi.com${pathname}`);
    }

    for (const pathname of ["/redes-sociais", "/jingle", "/noticias"]) {
      expect(urls).not.toContain(`https://edsonalbertassi.com${pathname}`);
    }
  });

  it("não publica URLs de notícias removidas", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const slug of removedSlugs) {
      expect(urls.some((url) => url.includes(slug))).toBe(false);
    }
  });

  it("usa somente a origem canônica e não fragmentos", async () => {
    const entries = await sitemap();

    for (const entry of entries) {
      expect(entry.url.startsWith("https://edsonalbertassi.com/")).toBe(true);
      expect(entry.url).not.toContain("#");
    }
  });
});
