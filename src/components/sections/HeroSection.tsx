"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.316 0 .618.05.9.143V9.45a6.34 6.34 0 0 0-.9-.065A6.338 6.338 0 0 0 3 15.722a6.338 6.338 0 0 0 6.335 6.335 6.338 6.338 0 0 0 6.335-6.335V8.307a8.214 8.214 0 0 0 4.919 1.621v-3.242z" />
    </svg>
  );
}

const heroSocialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/ealbertassi/",
    icon: Instagram,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@ealbertassi?_r=1&_t=ZS-97qA7WO77vY",
    icon: TikTokIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/ealbertassi",
    icon: Facebook,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ealbertassi",
    icon: Youtube,
  },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#003967] pt-24 text-white sm:min-h-[780px] sm:pt-28 lg:min-h-[820px] lg:pt-32 xl:min-h-[720px]">
      
      {/* Imagem de Fundo Degradê Oficial do Designer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/optimized/fundodegrade.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover object-center"
        />
      </div>

      {/* Atalhos sociais abaixo do selo do Zap no header */}
      <div
        aria-label="Redes sociais oficiais de Edson Albertassi"
        className="absolute right-3 top-24 z-30 hidden flex-col gap-2.5 sm:right-5 sm:top-28 sm:flex lg:right-6 lg:top-32 xl:right-8"
      >
        {heroSocialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${item.name} de Edson Albertassi`}
              title={item.name}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-white bg-[#003967]/60 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-[#FBE502] hover:bg-[#FBE502] hover:text-[#003967] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE502] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003967]"
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-[#FBE502] px-2.5 py-1.5 font-archivo text-xs font-black uppercase tracking-wide text-[#003967] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          
          {/* Coluna de Texto (Esquerda) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="z-10 space-y-3 pb-4 text-center sm:space-y-7 sm:pb-12 lg:col-span-6 lg:pb-24 lg:text-left"
            >
            {/* Título oficial em SVG para preservar a qualidade em qualquer tela */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[250px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px]">
                <Image
                  src="/images/logoherosection.svg"
                  alt="Tem Que Ter Fé"
                  width={620}
                  height={307}
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Subtítulo: Archivo Bold */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-xl font-archivo text-sm font-bold leading-snug text-white sm:text-2xl lg:mx-0 lg:text-[22px] lg:leading-[36px] xl:text-[22px]"
            >
              Mais de 30 anos servindo ao povo do Rio de Janeiro, guiado pelos valores da fé e pelo compromisso com a família. A minha história não foi contada totalmente: ainda há muito mais por fazer. Tem que ter fé!
            </motion.p>

            {/* 2 Botões Amarelos em Destaque */}
            <motion.div
              variants={fadeInUp}
              className="-mb-2 flex flex-col items-center justify-center gap-2 pt-0 sm:mb-0 sm:flex-row lg:justify-start"
            >
              {/* Botão 1: Entre para o Grupo do WhatsApp */}
              <a
                href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full max-w-[280px] scale-[0.94] items-center justify-center bg-[#FBE502] px-3 py-2 font-archivo text-[14px] font-black uppercase tracking-wider text-black shadow-lg transition-all duration-200 hover:bg-white hover:text-[#003967] hover:scale-[0.98] active:scale-[0.92] sm:w-auto sm:max-w-none sm:scale-100 sm:px-8 sm:py-4 sm:text-base sm:hover:scale-105 sm:active:scale-95"
              >
                ENTRE PARA O GRUPO
              </a>

              {/* Botão 2: Faça sua Foto */}
              <Link
                href="/faca-sua-foto"
                className="inline-flex min-h-11 w-full max-w-[280px] scale-[0.94] items-center justify-center bg-[#FBE502] px-3 py-2 font-archivo text-[14px] font-black uppercase tracking-wider text-black shadow-lg transition-all duration-200 hover:bg-white hover:text-[#003967] hover:scale-[0.98] active:scale-[0.92] sm:w-auto sm:max-w-none sm:scale-100 sm:px-8 sm:py-4 sm:text-base sm:hover:scale-105 sm:active:scale-95"
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
            className="relative z-20 -mt-8 flex items-end justify-center overflow-visible lg:col-span-6 lg:mt-0 lg:justify-end"
          >
            <div className="relative h-[330px] w-full max-w-[460px] overflow-visible sm:h-[480px] sm:max-w-[640px] md:h-[560px] md:max-w-[720px] lg:h-[660px] lg:max-w-[760px] xl:h-[700px] xl:max-w-[860px]">
              <Image
                src="/images/optimized/fotoedsonsec.webp"
                alt="Edson Albertassi - Deputado Estadual 15088"
                fill
                className="origin-bottom scale-[1.12] transform object-contain object-bottom drop-shadow-2xl sm:scale-[1.15] md:scale-125 lg:scale-[1.3] xl:scale-[1.35]"
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
