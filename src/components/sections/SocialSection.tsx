"use client";

import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";
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
  const leftSocialLinks = [
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
  ];

  const rightSocialLinks = [
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

  return (
    <AnimatedSection id="redes" className="pt-16 pb-0 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Superior com Marcação Verde (17px width) e quebra de linha */}
        <div className="mb-6 mr-8 sm:mb-8">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="w-[17px] h-[84px] sm:h-[96px] bg-[#93FD04] rounded-sm block shrink-0 mt-1" />
            
            <h2 className="font-archivo font-extrabold mr-12 italic text-4xl sm:text-5xl md:text-6xl lg:text-[54px] leading-[0.90] text-[#1256CE] tracking-tight">
              Edson Albertassi<br />
              nas Redes Sociais
            </h2>
          </div>
        </div>

        {/* Bloco de Redes Sociais com Faixas de Fundo */}
        <div className="relative pt-6 sm:pt-10 pb-0">
          
          {/* 1. As 3 Faixas Coloridas de Fundo (z-0) */}
          <div className="w-full space-y-2.5 sm:space-y-3.5 relative z-0">
            {/* 1 - Faixa Verde #93FD04 */}
            <div className="w-full h-7 sm:h-9 md:h-11 bg-[#93FD04] rounded-full shadow-sm" />
            {/* 2 - Faixa Amarela #FBE502 */}
            <div className="w-full h-7 sm:h-9 md:h-11 bg-[#FBE502] rounded-full shadow-sm" />
            {/* 3 - Faixa Azul Escuro #003967 */}
            <div className="w-full h-9 sm:h-11 md:h-14 bg-[#003967] rounded-full shadow-sm" />
          </div>

          {/* 2. Bloco Azul Royal (z-10) que contém a foto em cima do fundo e os botões em cima da foto */}
          <div className="mt-3 relative z-10 bg-[#1256CE] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl min-h-[300px] flex flex-col justify-between overflow-visible">
            
            {/* Foto do Edson Albertassi: EM CIMA do fundo azul e das faixas, mas ATRÁS dos botões (z-10) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 flex justify-center pointer-events-none">
              <div className="relative w-[340px] sm:w-[480px] md:w-[560px] lg:w-[680px] xl:w-[740px] h-[400px] sm:h-[500px] md:h-[580px] lg:h-[660px] xl:h-[720px]">
                <Image
                  src="/images/edson-animation.png"
                  alt="Edson Albertassi - Redes Sociais"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 740px"
                />
              </div>
            </div>

            {/* Grid dos 4 Botões na altura do peito: EM CIMA DA FOTO (z-20) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-20">
              
              {/* Coluna Esquerda: Instagram e TikTok */}
              <div className="lg:col-span-4 space-y-4">
                {leftSocialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[transparent] border-[3px] border-[#FBE502] text-white font-extrabold text-base uppercase tracking-wider hover:bg-[#FBE502] hover:text-[#003967] shadow-2xl hover:scale-102 active:scale-98 transition-all duration-200 group"
                    >
                      <Icon className="w-6 h-6 text-[#FBE502] group-hover:text-[#003967] shrink-0 transition-colors" />
                      <span className="font-archivo font-black text-sm sm:text-base">{item.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Coluna Central Vazia no Desktop para o Espaço do Candidato */}
              <div className="hidden lg:block lg:col-span-4 min-h-[140px]" />

              {/* Coluna Direita: Facebook e YouTube */}
              <div className="lg:col-span-4 space-y-4">
                {rightSocialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[transparent] border-[3px] border-[#FBE502] text-white font-extrabold text-base uppercase tracking-wider hover:bg-[#FBE502] hover:text-[#003967] shadow-2xl hover:scale-102 active:scale-98 transition-all duration-200 group"
                    >
                      <Icon className="w-6 h-6 text-[#FBE502] group-hover:text-[#003967] shrink-0 transition-colors" />
                      <span className="font-archivo font-black text-sm sm:text-base">{item.name}</span>
                    </a>
                  );
                })}
              </div>

            </div>

            {/* Caixa Amarela Sólida com Texto Explicativo: EM CIMA DA FOTO (z-20) */}
            <div className="mt-8 relative ml-10 z-20 max-w-4xl mx-auto w-full p-4 sm:p-4 rounded-2xl bg-[#FBE502] text-black shadow-xl">
              <p className="font-archivo font-bold text-xs sm:text-sm md:text-base leading-relaxed text-black text-center sm:text-left">
                Siga os nossos canais oficiais para acompanhar agendas, notícias, propostas e tudo que a nossa caminhada tem feito pelos 4 cantos do estado.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Faixa Fina Multicolorida Inferior */}
      <div className="mt-4 w-full h-3 flex">
        <div className="w-1/4 bg-[#93FD04]" />
        <div className="w-1/2 bg-[#FBE502]" />
        <div className="w-1/4 bg-[#1256CE]" />
      </div>
    </AnimatedSection>
  );
}
