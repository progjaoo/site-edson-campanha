import { describe, expect, it, vi } from "vitest";
import worker, { type Env } from "./index";

const allowedOrigins = "https://edsonalbertassi.com,https://www.edsonalbertassi.com";

function createEnv() {
  const object = {
    body: new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2, 3]));
        controller.close();
      },
    }),
    httpEtag: '"candidate-photo"',
    httpMetadata: { contentType: "image/jpeg" },
  };

  return {
    DB: {} as Env["DB"],
    ASSETS: { get: vi.fn().mockResolvedValue(object) } as unknown as Env["ASSETS"],
    ALLOWED_ORIGIN: allowedOrigins,
  } satisfies Env;
}

describe("candidate asset CORS", () => {
  it.each(["https://edsonalbertassi.com", "https://www.edsonalbertassi.com"])(
    "allows the campaign origin %s to export the image canvas",
    async (origin) => {
      const response = await worker.fetch(
        new Request("https://worker.example/assets/candidates/2026/rj/candidate.jpg", {
          headers: { Origin: origin },
        }),
        createEnv(),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe(origin);
      expect(response.headers.get("vary")).toBe("Origin");
      expect(response.headers.get("content-type")).toBe("image/jpeg");
    },
  );

  it("does not grant asset CORS access to an unlisted origin", async () => {
    const response = await worker.fetch(
      new Request("https://worker.example/assets/candidates/2026/rj/candidate.jpg", {
        headers: { Origin: "https://unrelated.example" },
      }),
      createEnv(),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });
});
