import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const navigationFiles = [
  "src/components/layout/Header.tsx",
  "src/components/layout/Footer.tsx",
  "src/components/layout/MobileMenu.tsx",
  "src/components/sections/PhotoCTAActions.tsx",
  "src/app/noticias/[slug]/page.tsx",
];

describe("navegação pública", () => {
  it("usa caminhos públicos sem fragmentos para cada item do menu", () => {
    const headerSource = fs.readFileSync(
      path.join(process.cwd(), "src/components/layout/Header.tsx"),
      "utf8",
    );

    expect(headerSource).toContain('label: "REDES", href: "/redes-sociais"');
    expect(headerSource).toContain('label: "JINGLE", href: "/jingle"');
    expect(headerSource).toContain('label: "FAÇA SUA FOTO", href: "/faca-sua-foto"');
    expect(headerSource).toContain('label: "HISTÓRIA", href: "/historia"');
    expect(headerSource).toContain('label: "NOTÍCIAS", href: "/noticias"');
  });

  it("mantém uma rota pública para cada destino do menu", () => {
    const pageRoutes = [
      ["src/app/faca-sua-foto/page.tsx", "PhotoStudio"],
      ["src/app/historia/page.tsx", "<h1"],
    ];

    for (const [relativePath, sectionMarker] of pageRoutes) {
      expect(fs.existsSync(path.join(process.cwd(), relativePath))).toBe(true);
      expect(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8")).toContain(
        sectionMarker,
      );
    }

    for (const relativePath of [
      "src/app/redes-sociais/page.tsx",
      "src/app/jingle/page.tsx",
      "src/app/noticias/page.tsx",
    ]) {
      expect(fs.existsSync(path.join(process.cwd(), relativePath))).toBe(false);
    }
  });

  it("mapeia os caminhos de seção de volta para a landing page", () => {
    const nextConfigSource = fs.readFileSync(
      path.join(process.cwd(), "next.config.mjs"),
      "utf8",
    );

    for (const pathname of ["/redes-sociais", "/jingle", "/noticias"]) {
      expect(nextConfigSource).toContain(`source: "${pathname}"`);
      expect(nextConfigSource).toContain('destination: "/"');
    }
  });

  it("não cria URLs de página com fragmentos", () => {
    for (const relativePath of navigationFiles) {
      const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

      expect(source).not.toMatch(/href=["']\/#/);
      expect(source).not.toMatch(/location\.assign\(["']\/#/);
    }
  });
});
