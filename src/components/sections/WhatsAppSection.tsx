"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function WhatsAppSection() {
  const whatsappGroupUrl =
    "https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1";

  return (
    <AnimatedSection id="zap" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bloco Azul Royal na mesma proporção e estilo da seção de Redes */}
        <div className="relative z-10 bg-[#1256CE] rounded-3xl sm:p-6 md:p-6 shadow-2xl overflow-visible min-h-[100px] lg:min-h-[290px] flex items-center mt-12 sm:mt-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full relative z-20">
            
            {/* Lado Esquerdo: Sticker "Entre para o Zap" + Texto + Botão Amarelo */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
              
              {/* 1. Imagem Sticker "Entre para o Zap" que sobrepõe o topo */}
              <div className="relative -mt-16 sm:-mt-24 lg:-mt-28 flex justify-center lg:justify-start">
                <div className="relative w-80 sm:w-100 md:w-[420px] lg:w-[600px] h-40 sm:h-50 md:h-48 lg:h-52 drop-shadow-2xl">
                  <Image
                    src="/images/zap/entrenozap.png"
                    alt="Entre para o Grupo no Zap"
                    fill
                    priority
                    className="object-contain object-left"
                    sizes="(max-width: 968px) 200vw, 600px"
                  />
                </div>
              </div>

              {/* 2. Texto Informativo */}
              <p className="font-archivo font-black italic text-lg sm:text-xl md:text-1xl lg:text-[24px] text-white leading-tight uppercase tracking-tight max-w-xl mx-auto lg:mx-12 drop-shadow-md">
                NOTÍCIAS, AGENDAS E CONTEÚDOS DO <br className="hidden sm:inline" />
                <span className="text-white">EDSON ALBERTASSI EM PRIMEIRA MÃO!</span>
              </p>

              {/* 3. Botão Amarelo: Entrar para o Grupo */}
              <div className="pt-2">
                <a
                  href={whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto ml-14 inline-flex items-center justify-center px-28 py-2 rounded-xl bg-[#FBE502] text-[#003967] font-archivo font-black italic text-base sm:text-lg tracking-wider uppercase shadow-2xl hover:bg-white hover:text-[#003967] hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  ENTRAR PARA O GRUPO
                </a>
              </div>
            </div>

            {/* Lado Direito: Foto do Edson no celular com stickers que sobrepõe o topo */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-end">
              <div className="relative w-80 sm:w-96 md:w-[420px] lg:w-[480px] xl:w-[520px] h-40 sm:h-96 md:h-[440px] lg:h-[500px] lg:-mt-[140px], lg:-mt-[180px] lg:-mb-10 drop-shadow-2xl">
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
