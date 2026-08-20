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
    <section className="relative min-h-[90vh] lg:min-h-[820px] xl:min-h-[600px] bg-[#003967] text-white overflow-hidden flex items-end pt-28 md:pt-30">
      
      {/* Imagem de Fundo Degradê Oficial do Designer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/fundodegrade.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Atalhos sociais abaixo do selo do Zap no header */}
      <div
        aria-label="Redes sociais oficiais de Edson Albertassi"
        className="absolute right-4 top-24 z-30 mr-40 flex flex-col gap-2.5 sm:right-6 lg:right-8"
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
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white bg-[#003967]/60 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-[#FBE502] hover:bg-[#FBE502] hover:text-[#003967] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE502] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003967]"
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
            className="lg:col-span-6 pb-10 mb-4 mr-2 sm:pb-14 lg:pb-24 space-y-6 md:space-y-8 text-center lg:text-left z-1"
            >
            {/* Título com a Imagem PNG 'TEM QUE TER FÉ.png' */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px]">
                <Image
                  src="/images/logoherosection.png"
                  alt="Tem Que Ter Fé"
                  width={539}
                  height={221}
                  priority
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Subtítulo: Archivo Bold */}
            <motion.p
              variants={fadeInUp}
              className="font-archivo font-bold text-lg sm:text-2xl lg:text-[22px] xl:text-[22px] lg:leading-[36px] text-white max-w-xl mx-auto lg:mx-0"
            >
              Mais de 30 anos servindo ao povo do Rio de Janeiro, guiado pelos valores da fé e pelo compromisso com a família. A minha história não foi contada totalmente: ainda há muito mais por fazer. Tem que ter fé!
            </motion.p>

            {/* 2 Botões Amarelos em Destaque */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Botão 1: Entre para o Grupo do WhatsApp */}
              <a
                href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
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
            <div className="relative w-full max-w-[420px] sm:max-w-[1000px] md:max-w-[1000px] lg:max-w-[920px] xl:max-w-[980px] h-[440px] sm:h-[580px] md:h-[680px] lg:h-[660px] xl:h-[720px] overflow-visible">
              <Image
                src="/images/fotoedsonsec.png"
                alt="Edson Albertassi - Deputado Estadual 15088"
                fill
                priority
                className="object-contain object-bottom transform scale-125 sm:scale-135 lg:scale-145 xl:scale-150 origin-bottom drop-shadow-2xl"
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
