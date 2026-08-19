import { MetadataRoute } from "next";
import { getNoticias } from "@/lib/news-storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edsonalbertassi.com.br";
  const noticias = await getNoticias();

  // Rotas estáticas
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faca-sua-foto`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Rotas dinâmicas de notícias
  const newsRoutes: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${baseUrl}/noticias/${n.slug}`,
    lastModified: new Date(n.dataPublicacao),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...newsRoutes];
}
