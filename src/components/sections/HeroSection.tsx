"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[850px] xl:min-h-[900px] bg-[#003967] text-white overflow-hidden flex items-end pt-28 md:pt-32">
      
      {/* Textura de Fundo Vetorial */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-overlay pointer-events-none">
        <Image
          src="/images/fundo-hero-section.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          
          {/* Coluna de Texto (Esquerda) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 pb-12 sm:pb-16 lg:pb-24 space-y-6 md:space-y-8 text-center lg:text-left z-10"
          >
            {/* Título Principal com Preenchimento Máximo (Archivo SemiCondensed Black Italic) */}
            <motion.div variants={fadeInUp}>
              <h1
                className="font-condensed font-black italic text-6xl sm:text-7xl md:text-8xl lg:text-[98px] xl:text-[112px] tracking-tighter leading-[0.82] uppercase text-white drop-shadow-md select-none"
                style={{
                  WebkitTextStroke: "1px #FFFFFF",
                  letterSpacing: "-0.04em",
                }}
              >
                TEM QUE <br />
                TER FÉ
              </h1>
            </motion.div>

            {/* Subtítulo: Archivo Bold tamanho 30 */}
            <motion.p
              variants={fadeInUp}
              className="font-archivo font-bold text-lg sm:text-2xl lg:text-[28px] xl:text-[30px] lg:leading-[38px] text-white max-w-xl mx-auto lg:mx-0"
            >
              Com coragem, confiança e competência, vamos libertar o nosso estado da violência e colocá-lo no caminho do desenvolvimento outra vez.
            </motion.p>

            {/* 2 Botões Amarelos em Destaque */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Botão 1: Entre para o Grupo */}
              <a
                href="https://chat.whatsapp.com/invite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FBE502] text-black font-archivo font-black text-sm sm:text-base tracking-wider uppercase shadow-lg hover:bg-white hover:text-[#003967] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                ENTRE PARA O GRUPO
              </a>

              {/* Botão 2: Faça sua Foto */}
              <Link
                href="/faca-sua-foto"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FBE502] text-black font-archivo font-black text-sm sm:text-base tracking-wider uppercase shadow-lg hover:bg-white hover:text-[#003967] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                FAÇA SUA FOTO
              </Link>
            </motion.div>
          </motion.div>

          {/* Coluna da Imagem do Candidato (Direita) */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 relative flex justify-center lg:justify-end items-end z-20 overflow-visible"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px] h-[440px] sm:h-[580px] md:h-[680px] lg:h-[760px] xl:h-[820px] overflow-visible">
              <Image
                src="/images/optimized/foto-edson-herosec.png"
                alt="Edson Albertassi - Deputado Estadual 15088"
                fill
                priority
                className="object-contain object-bottom transform scale-110 sm:scale-120 lg:scale-125 xl:scale-130 origin-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Faixa Fina Multicolorida na Base (Verde, Amarela, Azul) */}
      <div className="absolute bottom-0 left-0 right-0 h-3 flex z-30 pointer-events-none">
        <div className="w-1/4 bg-[#93FD04]" />
        <div className="w-1/2 bg-[#FBE502]" />
        <div className="w-1/4 bg-[#1256CE]" />
      </div>
    </section>
  );
}
