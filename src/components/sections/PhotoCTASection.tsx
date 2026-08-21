"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function PhotoCTASection() {
  return (
    <AnimatedSection id="faca-sua-foto-cta" className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid min-h-[520px] grid-cols-1 overflow-visible rounded-3xl bg-[#1256CE] px-5 py-7 shadow-2xl sm:min-h-[560px] sm:px-8 sm:py-9 lg:h-[340px] lg:min-h-0 lg:grid-cols-12 lg:px-12 lg:py-8">
          <div className="relative z-20 flex flex-col justify-center lg:col-span-6">
            <h2 className="max-w-md font-archivo text-4xl font-black italic leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[48px]">
              Você é parte
              <br />
              dessa mudança!
            </h2>
            <p className="mt-3 max-w-xs font-archivo text-sm font-bold leading-tight text-white sm:text-base">
              Obrigado por participar desse momento histórico.
            </p>

            <div className="mt-5 flex w-full max-w-xs flex-col items-start gap-2">
              <button
                type="button"
                onClick={() => window.location.assign("/faca-sua-foto")}
                aria-label="Abrir página Faça sua Foto"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#FBE502] px-6 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1256CE]"
              >
                FAÇA SUA FOTO
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => window.location.assign("/#redes")}
                className="inline-flex items-center gap-2 rounded-lg px-1 py-1 font-archivo text-sm font-black italic uppercase tracking-wide text-white/75 transition-colors hover:text-[#FBE502] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                SIGA EALBERTASSI
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="pointer-events-none relative z-10 -mb-8 mt-4 flex min-h-[220px] items-end justify-center sm:min-h-[300px] lg:absolute lg:right-[4%] lg:bottom-[-10px] lg:mt-0 lg:flex lg:h-[400px] lg:w-[420px] lg:min-h-0">
            <div className="relative h-[300px] w-full max-w-[340px] sm:h-[380px] sm:max-w-[420px] lg:h-full lg:w-full lg:max-w-none">
              <Image
                src="/images/faca-foto/ealbertassi-facafoto.png"
                alt="Edson Albertassi fazendo um coração com as mãos"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
