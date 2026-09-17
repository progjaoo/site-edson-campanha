import { Noticia } from "@/types";
import initialNoticias from "@/data/noticias.json";

const publicNoticias = initialNoticias as Noticia[];

export async function getNoticias(): Promise<Noticia[]> {
  return publicNoticias;
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const noticias = await getNoticias();
  return noticias.find((n) => n.slug === slug) || null;
}
