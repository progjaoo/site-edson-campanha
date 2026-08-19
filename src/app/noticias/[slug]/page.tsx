import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Facebook, MessageCircle } from "lucide-react";
import { getNoticiaBySlug, getNoticias } from "@/lib/news-storage";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const noticias = await getNoticias();
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const noticia = await getNoticiaBySlug(params.slug);
  if (!noticia) {
    return {
      title: "Notícia não encontrada | Edson Albertassi",
    };
  }

  return {
    title: `${noticia.titulo} | Edson Albertassi`,
    description: noticia.resumo || noticia.titulo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo || noticia.titulo,
      images: [noticia.imagemUrl || "/images/fotos-galeria/foto-galeria.svg"],
      type: "article",
      publishedTime: noticia.dataPublicacao,
      authors: [noticia.autor || "Edson Albertassi"],
    },
  };
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const noticia = await getNoticiaBySlug(params.slug);

  if (!noticia) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    image: [noticia.imagemUrl || "/images/fotos-galeria/foto-galeria.svg"],
    datePublished: noticia.dataPublicacao,
    dateModified: noticia.dataPublicacao,
    author: [
      {
        "@type": "Person",
        name: noticia.autor || "Edson Albertassi",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Edson Albertassi - Campanha Oficial",
      logo: {
        "@type": "ImageObject",
        url: "https://edsonalbertassi.com.br/images/logo-header.svg",
      },
    },
    description: noticia.resumo || noticia.titulo,
  };

  return (
    <main className="min-h-screen bg-white text-brand-dark pt-28 pb-20">
      {/* Schema.org Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Voltar */}
        <div className="mb-8">
          <Link
            href="/#noticias"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todas as notícias</span>
          </Link>
        </div>

        {/* Categoria e Data */}
        <div className="space-y-4 mb-8">
          {noticia.categoria && (
            <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue font-bold text-xs uppercase tracking-wider rounded-full">
              {noticia.categoria}
            </span>
          )}

          <h1 className="font-archivo font-black text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-tight">
            {noticia.titulo}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 pt-2 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span>{formatDate(noticia.dataPublicacao)}</span>
            </div>
            {noticia.autor && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-blue" />
                <span>Por {noticia.autor}</span>
              </div>
            )}
          </div>
        </div>

        {/* Imagem de Destaque */}
        {noticia.imagemUrl && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl mb-10 bg-brand-navy">
            <Image
              src={noticia.imagemUrl}
              alt={noticia.titulo}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Conteúdo Formatado */}
        <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed space-y-6">
          {noticia.conteudo.split("\n\n").map((paragrafo, idx) => (
            <p key={idx} className="text-base sm:text-lg">
              {paragrafo}
            </p>
          ))}
        </div>

        {/* Compartilhamento Social */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-sm font-bold text-brand-navy flex items-center gap-2 uppercase tracking-wider">
              <Share2 className="w-4 h-4 text-brand-blue" />
              Compartilhar esta notícia:
            </span>

            <div className="flex items-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${noticia.titulo} - Leia mais em:`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-green-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://facebook.com/sharer/sharer.php"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
