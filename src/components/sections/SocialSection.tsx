"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Video } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// Ícone personalizado para TikTok
function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.316 0 .618.05.9.143V9.45a6.34 6.34 0 0 0-.9-.065A6.338 6.338 0 0 0 3 15.722a6.338 6.338 0 0 0 6.335 6.335 6.338 6.338 0 0 0 6.335-6.335V8.307a8.214 8.214 0 0 0 4.919 1.621v-3.242z" />
    </svg>
  );
}

export function SocialSection() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/ealbertassi/",
      icon: Instagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/ealbertassi",
      icon: Facebook,
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@ealbertassi?_r=1&_t=ZS-97qA7WO77vY",
      icon: TikTokIcon,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@ealbertassi",
      icon: Youtube,
    },
  ];

  return (
    <AnimatedSection id="redes" className="pt-16 pb-0 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Superior com barra verde e texto em itálico azul */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3">
            <span className="w-2.5 sm:w-3 h-10 sm:h-12 bg-[#93FD04] rounded-sm block shrink-0" />
            <h2 className="font-condensed font-black italic text-4xl sm:text-5xl md:text-6xl text-[#1256CE] tracking-tight uppercase leading-none">
              Acompanhe <br className="sm:hidden" />
              minhas redes
            </h2>
          </div>
        </div>

        {/* Bloco de Redes Sociais com Faixas e Foto Sobreposta */}
        <div className="relative pt-6 sm:pt-10">
          
          {/* As 3 Faixas Coloridas (CSS Puro, Não é imagem) */}
          <div className="w-full space-y-2.5 sm:space-y-3.5 relative z-0">
            {/* 1 - Faixa Verde #93FD04 */}
            <div className="w-full h-7 sm:h-9 md:h-11 bg-[#93FD04] rounded-full shadow-sm" />
            {/* 2 - Faixa Amarela #FBE502 */}
            <div className="w-full h-7 sm:h-9 md:h-11 bg-[#FBE502] rounded-full shadow-sm" />
            {/* 3 - Faixa Azul Escuro #003967 */}
            <div className="w-full h-9 sm:h-11 md:h-14 bg-[#003967] rounded-full shadow-sm" />
          </div>

          {/* Bloco Azul Principal com os Botões das Redes */}
          <div className="mt-3 relative z-10 bg-[#1256CE] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Lado dos Botões e Texto Informativo */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Grid dos 4 Botões com Borda Amarela */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#1256CE] border-[3px] border-[#FBE502] text-white font-extrabold text-base uppercase tracking-wider hover:bg-[#FBE502] hover:text-[#003967] shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 group"
                      >
                        <Icon className="w-6 h-6 text-[#FBE502] group-hover:text-[#003967] shrink-0 transition-colors" />
                        <span className="font-archivo font-black">{item.name}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Caixa Amarela Sólida com Texto Explicativo */}
                <div className="p-4 sm:p-6 rounded-2xl bg-[#FBE502] text-black shadow-md">
                  <p className="font-archivo font-bold text-sm sm:text-base leading-relaxed text-black">
                    Siga os nossos canais oficiais para acompanhar agendas, notícias, propostas e tudo que a nossa caminhada tem feito pelos 4 cantos do estado.
                  </p>
                </div>

              </div>

              {/* Espaço vazio na grid desktop para acomodar a foto à direita */}
              <div className="hidden lg:block lg:col-span-4" />

            </div>
          </div>

          {/* Foto Sobreposta do Candidato (Alinhada ao centro-direita sobre as faixas e bloco azul) */}
          <div className="relative lg:absolute lg:right-6 lg:bottom-0 z-20 flex justify-center mt-6 lg:mt-0 pointer-events-none">
            <div className="relative w-72 sm:w-96 md:w-[420px] lg:w-[460px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px]">
              <Image
                src="/images/optimized/foto-edson-redessec.png"
                alt="Edson Albertassi - Redes Sociais"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Faixa Fina Multicolorida Inferior */}
      <div className="mt-12 w-full h-3 flex">
        <div className="w-1/4 bg-[#93FD04]" />
        <div className="w-1/2 bg-[#FBE502]" />
        <div className="w-1/4 bg-[#1256CE]" />
      </div>
    </AnimatedSection>
  );
}
