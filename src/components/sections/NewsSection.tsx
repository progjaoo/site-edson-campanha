"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { EXTERNAL_NEWS } from "@/data/external-news";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { formatDate } from "@/lib/utils";

export function NewsSection() {
  return (
    <AnimatedSection id="noticias" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="mt-1 block h-[40px] w-[17px] shrink-0 rounded-sm bg-[#93FD04]" />

            <div>
              <h2 className="font-archivo text-4xl font-extrabold italic leading-[0.92] tracking-tight text-[#1256CE] sm:text-6xl md:text-7xl lg:text-[50px]">
                Notícias!<br />
                
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {EXTERNAL_NEWS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group grid overflow-hidden rounded-3xl border border-[#1256CE]/15 bg-[#F5F8FF] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1256CE]/40 hover:shadow-xl md:grid-cols-[minmax(220px,0.34fr)_minmax(0,0.66fr)]"
            >
              <div className="relative min-h-[260px] overflow-hidden bg-[#003967] md:min-h-full">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 34vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#003967] via-[#003967]/45 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#003967]/85 shadow-lg backdrop-blur-sm">
                    <Newspaper className="h-5 w-5 text-[#FBE502]" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/85">
                    Matéria publicada no jornal
                    <strong className="mt-1 block font-archivo text-xl text-white">
                      {item.source}
                    </strong>
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                <div className="space-y-3">
                  <h3 className="font-archivo text-2xl font-extrabold leading-tight text-[#003967] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                    {item.excerpt}
                  </p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center gap-2 bg-[#FBE502] px-5 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1256CE] focus-visible:ring-offset-2"
                >
                  Ler matéria
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
