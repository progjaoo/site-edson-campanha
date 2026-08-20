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

  it("keeps editorial metadata complete and links safe", () => {
    for (const item of EXTERNAL_NEWS) {
      expect(item.id).toBeTruthy();
      expect(item.publishedAt).toMatch(/^2026-\d{2}-\d{2}T/);
      expect(item.title).toBeTruthy();
      expect(item.excerpt).toBeTruthy();
      expect(new URL(item.url).protocol).toBe("https:");
    }
  });
});
