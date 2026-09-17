import { describe, expect, it } from "vitest";
import { getNoticias } from "./news-storage";

describe("conteúdo interno de notícias", () => {
  it("não expõe os registros legados removidos", async () => {
    const noticias = await getNoticias();
    const removedIds = new Set(["2", "3", "4"]);

    expect(noticias.every((noticia) => !removedIds.has(noticia.id))).toBe(true);
  });
});
