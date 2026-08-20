"use client";

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
            <span className="mt-1 block h-[90px] w-[17px] shrink-0 rounded-sm bg-[#93FD04]" />

            <div>
              <h2 className="font-archivo text-4xl font-extrabold italic leading-[0.92] tracking-tight text-[#1256CE] sm:text-6xl md:text-7xl lg:text-[50px]">
                Fique por <br />
                dentro
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Leia as matérias publicadas sobre a decisão da Justiça e seus desdobramentos.
              </p>
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
              <div className="flex min-h-44 flex-col justify-between bg-[#003967] p-6 text-white sm:p-8">
                <Newspaper className="h-8 w-8 text-[#FBE502]" aria-hidden="true" />
                <p className="mt-8 text-sm leading-relaxed text-white/80">
                  Matéria publicada no jornal
                  <strong className="mt-1 block font-archivo text-xl text-white">
                    {item.source}
                  </strong>
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/75">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                </p>
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
                  className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-[#FBE502] px-5 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1256CE] focus-visible:ring-offset-2"
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
