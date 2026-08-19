import { NextRequest, NextResponse } from "next/server";
import { getNoticias, saveNoticia, deleteNoticia } from "@/lib/news-storage";
import { isAdminAuthenticated } from "@/lib/auth";
import { slugify } from "@/lib/utils";

// GET /api/noticias - Lista todas as notícias
export async function GET() {
  try {
    const noticias = await getNoticias();
    return NextResponse.json(noticias);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar notícias" }, { status: 500 });
  }
}

// POST /api/noticias - Cria nova notícia (protegido)
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { titulo, resumo, conteudo, imagemUrl, autor, categoria } = body;

    if (!titulo || !conteudo) {
      return NextResponse.json(
        { error: "Título e Conteúdo são obrigatórios." },
        { status: 400 }
      );
    }

    const slug = slugify(titulo);

    const noticia = await saveNoticia({
      titulo,
      slug,
      resumo: resumo || titulo.slice(0, 120),
      conteudo,
      imagemUrl: imagemUrl || "/images/fotos-galeria/foto-galeria.svg",
      autor: autor || "Comunicação Oficial",
      categoria: categoria || "Notícias",
    });

    return NextResponse.json(noticia, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar notícia:", error);
    return NextResponse.json({ error: "Erro ao salvar notícia" }, { status: 500 });
  }
}

// DELETE /api/noticias?id=xxx - Exclui notícia (protegido)
export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório." }, { status: 400 });
  }

  await deleteNoticia(id);
  return NextResponse.json({ success: true });
}
