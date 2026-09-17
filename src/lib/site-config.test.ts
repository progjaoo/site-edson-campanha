import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("configuração pública do site", () => {
  it("declara o domínio .com como origem canônica no exemplo de ambiente", () => {
    const envExample = fs.readFileSync(
      path.join(process.cwd(), ".env.example"),
      "utf8",
    );

    expect(envExample).toContain("NEXT_PUBLIC_SITE_URL=https://edsonalbertassi.com\n");
    expect(envExample).not.toContain("edsonalbertassi.com.br");
  });
});
