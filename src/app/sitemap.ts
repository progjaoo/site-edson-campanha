import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

// O sitemap não depende mais do painel administrativo. A lista de dados legados
// foi removida e a seção de notícias da home é composta por links externos.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rotas estáticas
  const routes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/historia"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/faca-sua-foto"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return routes;
}
