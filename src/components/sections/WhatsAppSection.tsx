"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function WhatsAppSection() {
  const whatsappGroupUrl =
    "https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1";

  return (
    <AnimatedSection id="zap" className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Bloco Azul Royal na mesma proporção e estilo da seção de Redes */}
        <div className="relative z-10 mt-10 flex min-h-0 items-center overflow-visible rounded-3xl bg-[#1256CE] p-4 shadow-2xl sm:mt-14 sm:p-6 lg:min-h-[290px] lg:p-8">
          
          <div className="relative z-20 grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-4">
            
            {/* Lado Esquerdo: Sticker "Entre para o Zap" + Texto + Botão Amarelo */}
            <div className="space-y-5 text-center sm:space-y-6 lg:col-span-7 lg:text-left">
              
              {/* 1. Imagem Sticker "Entre para o Zap" que sobrepõe o topo */}
              <div className="relative -mt-14 flex justify-center sm:-mt-20 lg:-mt-24 lg:justify-start">
                <div className="relative h-32 w-full max-w-[320px] drop-shadow-2xl sm:h-40 sm:max-w-[420px] md:h-44 md:max-w-[500px] lg:h-48 lg:max-w-[560px]">
                  <Image
                    src="/images/zap/entrenozap.png"
                    alt="Entre para o Grupo no Zap"
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 1024px) 90vw, 560px"
                  />
                </div>
              </div>

              {/* 2. Texto Informativo */}
              <p className="mx-auto max-w-xl font-archivo text-lg font-black italic uppercase leading-tight tracking-tight text-white drop-shadow-md sm:text-xl lg:mx-8 lg:text-[24px]">
                NOTÍCIAS, AGENDAS E CONTEÚDOS DO <br className="hidden sm:inline" />
                <span className="text-white">EDSON ALBERTASSI EM PRIMEIRA MÃO!</span>
              </p>

              {/* 3. Botão Amarelo: Entrar para o Grupo */}
              <div className="pt-2">
                <a
                  href={whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center bg-[#FBE502] px-6 py-3 font-archivo text-base font-black italic uppercase tracking-wider text-[#003967] shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-white hover:text-[#003967] active:scale-95 sm:w-auto sm:px-10 sm:text-lg"
                >
                  ENTRAR PARA O GRUPO
                </a>
              </div>
            </div>

            {/* Lado Direito: Foto do Edson no celular com stickers que sobrepõe o topo */}
            <div className="relative flex items-end justify-center lg:col-span-5 lg:justify-end">
              <div className="relative h-64 w-full max-w-[300px] drop-shadow-2xl sm:h-80 sm:max-w-[380px] md:h-[400px] md:max-w-[440px] lg:-mb-12 lg:-mt-32 lg:h-[460px] lg:max-w-[500px] xl:h-[500px] xl:max-w-[520px]">
                <Image
                  src="/images/zap/zap1.png"
                  alt="Edson Albertassi no WhatsApp"
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </AnimatedSection>
  );
}
