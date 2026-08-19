import fs from "fs";
import path from "path";
import { Noticia } from "@/types";
import initialNoticias from "@/data/noticias.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "noticias.json");

// In-memory cache for serverless environments where filesystem writes might be ephemeral
let memoryNoticias: Noticia[] = [...(initialNoticias as Noticia[])];

export async function getNoticias(): Promise<Noticia[]> {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf8");
      const parsed = JSON.parse(fileData) as Noticia[];
      memoryNoticias = parsed;
      return parsed;
    }
  } catch (error) {
    console.error("Erro ao ler arquivo de notícias:", error);
  }
  return memoryNoticias;
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const noticias = await getNoticias();
  return noticias.find((n) => n.slug === slug) || null;
}

export async function saveNoticia(novaNoticia: Omit<Noticia, "id" | "dataPublicacao">): Promise<Noticia> {
  const noticias = await getNoticias();
  const id = Date.now().toString();
  const dataPublicacao = new Date().toISOString();

  const noticiaCompleta: Noticia = {
    ...novaNoticia,
    id,
    dataPublicacao,
  };

  const listaAtualizada = [noticiaCompleta, ...noticias];
  memoryNoticias = listaAtualizada;

  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(listaAtualizada, null, 2), "utf8");
  } catch (error) {
    console.error("Erro ao salvar notícia no arquivo local:", error);
  }

  return noticiaCompleta;
}

export async function deleteNoticia(id: string): Promise<boolean> {
  const noticias = await getNoticias();
  const listaAtualizada = noticias.filter((n) => n.id !== id);
  memoryNoticias = listaAtualizada;

  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(listaAtualizada, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Erro ao excluir notícia do arquivo:", error);
    return true;
  }
}
