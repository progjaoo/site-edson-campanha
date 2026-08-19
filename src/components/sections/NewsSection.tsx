"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { Noticia } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

interface NewsSectionProps {
  initialNoticias?: Noticia[];
}

export function NewsSection({ initialNoticias }: NewsSectionProps) {
  const [noticias, setNoticias] = useState<Noticia[]>(initialNoticias || []);
  const [loading, setLoading] = useState(!initialNoticias || initialNoticias.length === 0);

  useEffect(() => {
    if (!initialNoticias || initialNoticias.length === 0) {
      fetch("/api/noticias")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setNoticias(data.slice(0, 4));
          }
        })
        .catch((err) => console.error("Erro ao carregar notícias:", err))
        .finally(() => setLoading(false));
    }
  }, [initialNoticias]);

  return (
    <AnimatedSection id="noticias" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Informativo</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-10 bg-brand-lime inline-block" />
              <h2 className="font-condensed font-black italic text-4xl sm:text-5xl text-brand-blue tracking-tight uppercase">
                Fique por dentro!
              </h2>
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 p-4 space-y-4">
                <Skeleton className="h-44 w-full rounded-xl" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        )}

        {/* Grid de Notícias */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {noticias.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col justify-between bg-brand-light rounded-2xl overflow-hidden border border-gray-200/70 hover:border-brand-blue/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Imagem de Capa */}
                <Link href={`/noticias/${item.slug}`} className="relative h-48 w-full block overflow-hidden bg-brand-navy">
                  <Image
                    src={item.imagemUrl || "/images/fotos-galeria/foto-galeria.svg"}
                    alt={item.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.categoria && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-navy/80 backdrop-blur-md text-brand-yellow font-bold text-xs uppercase tracking-wider">
                      {item.categoria}
                    </span>
                  )}
                </Link>

                {/* Conteúdo do Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.dataPublicacao)}</span>
                    </div>

                    <Link href={`/noticias/${item.slug}`}>
                      <h3 className="font-archivo font-bold text-base sm:text-lg text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                        {item.titulo}
                      </h3>
                    </Link>

                    {item.resumo && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {item.resumo}
                      </p>
                    )}
                  </div>

                  {/* Link Leia Mais */}
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-navy transition-colors uppercase tracking-wider pt-2 border-t border-gray-200"
                  >
                    <span>Ler matéria completa</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </AnimatedSection>
  );
}
