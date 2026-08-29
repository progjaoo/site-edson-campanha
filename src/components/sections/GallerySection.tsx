"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const galleryImages = [
  {
    src: "/images/fotos-galeria/foto-galeria.svg",
    alt: "Edson Albertassi em caminhada com o povo",
    caption: "Caminhada pelas cidades do Rio de Janeiro",
  },
  {
    src: "/images/fotos-galeria/foto-galeria2.svg",
    alt: "Edson Albertassi conversando com lideranças",
    caption: "Diálogo constante com a população e lideranças comunitárias",
  },
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Autoplay every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <AnimatedSection id="galeria" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Marcação Verde + Título 89px + Subtexto 30px */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Bloco do Título com Marcação Verde (17px width × 163px height) */}
            <div className="flex items-start gap-4 sm:gap-4">
              {/* Marcação Verde #93FD04: w-[17px] h-[163px] */}
              <span className="w-[17px] h-[90px] bg-[#93FD04] rounded-sm shrink-0 block mt-1" />

              <h2 className="font-archivo font-extrabold italic text-4xl sm:text-6xl md:text-7xl lg:text-[50px] leading-[0.92] text-[#1256CE] tracking-tight">
                Tem que <br />
                ter fé! <br />
              </h2>
            </div>

            {/* Texto menor: Archivo Bold tamanho 30 */}
            <p className="font-archivo font-bold ml-10 text-lg sm:text-2xl lg:text-[18px] lg:leading-[20px] text-gray-900">
              Esse é o som da nossa história <br />e da nossa campanha! 
            </p>

            {/* Controles de Navegação Desktop */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-[#003967]/20 flex items-center justify-center text-[#003967] hover:bg-[#003967] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-[#FBE502] text-black flex items-center justify-center font-bold hover:bg-[#003967] hover:text-white transition-all shadow-md hover:scale-105 active:scale-95"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <span className="text-sm font-bold text-gray-500 ml-2">
                {currentIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Lado Direito: Carrossel de Imagens */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#003967] border-4 border-[#003967]/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={galleryImages[currentIndex].src}
                    alt={galleryImages[currentIndex].alt}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay inferior para legenda */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#003967]/90 via-[#003967]/40 to-transparent p-6 flex items-end">
                    <p className="text-white font-semibold text-sm sm:text-base">
                      {galleryImages[currentIndex].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botões sobre a imagem no mobile */}
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none lg:hidden">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-sm"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-sm"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dots Indicadores */}
            <div className="flex justify-center gap-2.5 mt-4">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-[#1256CE]"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </AnimatedSection>
  );
}
