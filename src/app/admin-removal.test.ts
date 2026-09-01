import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const removedPaths = [
  "src/app/admin/layout.tsx",
  "src/app/admin/page.tsx",
  "src/app/admin/noticias/page.tsx",
  "src/app/api/auth/route.ts",
  "src/app/api/noticias/route.ts",
  "src/app/api/upload/route.ts",
  "src/lib/auth.ts",
];

describe("superfície administrativa", () => {
  it("não mantém superfície administrativa", () => {
    for (const relativePath of removedPaths) {
      expect(fs.existsSync(path.join(process.cwd(), relativePath))).toBe(false);
    }
  });
});
