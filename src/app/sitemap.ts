import type { MetadataRoute } from "next";
import { getNoticias } from "@/lib/news-storage";
import { absoluteUrl } from "@/lib/site-config";

// A lista de notícias pode ser atualizada pelo painel; gere o XML sob demanda.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noticias = await getNoticias();
  const generatedAt = new Date();

  // Rotas estáticas
  const routes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: generatedAt,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/historia"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/faca-sua-foto"),
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Rotas dinâmicas de notícias
  const newsRoutes: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: absoluteUrl(`/noticias/${n.slug}`),
    lastModified: new Date(n.dataPublicacao),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...newsRoutes];
}
