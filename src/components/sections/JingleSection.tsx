"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, Music2, Download, Radio } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function JingleSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Fallback for autoplay restrictions or missing file
        setIsPlaying(!isPlaying);
      });
      setIsPlaying(true);
    }
  };

  return (
    <AnimatedSection id="jingle" className="py-20 bg-gradient-to-b from-brand-navy to-brand-dark text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/30 text-brand-yellow font-bold text-xs uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5" />
            <span>Música Oficial da Campanha</span>
          </div>
          <h2 className="font-condensed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            Ouça o Jingle Oficial
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-normal">
            Aumente o som, cante junto e espalhe a mensagem de esperança e fé por todo o Rio!
          </p>
        </div>

        {/* Player Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Lado Esquerdo: Info da Faixa */}
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-lime flex items-center justify-center text-brand-dark shadow-lg shrink-0">
                <Music2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-brand-yellow tracking-wider">Jingle 2026</span>
                <h3 className="text-xl sm:text-2xl font-bold font-archivo text-white">Tem Que Ter Fé</h3>
                <p className="text-xs sm:text-sm text-white/70">Edson Albertassi • 15088</p>
              </div>
            </div>

            {/* Soundwaves Animadas */}
            <div className="flex items-center gap-1.5 h-12">
              {[6, 14, 24, 18, 28, 12, 22, 16, 26, 10, 20, 15, 25, 8].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying ? "bg-brand-yellow wave-bar" : "bg-white/30 h-2"
                  }`}
                  style={{
                    animationDelay: `${(i % 5) * 0.15}s`,
                    height: isPlaying ? undefined : "6px",
                  }}
                />
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label={isPlaying ? "Pausar jingle" : "Tocar jingle"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-brand-dark" />
                ) : (
                  <Play className="w-7 h-7 fill-brand-dark ml-1" />
                )}
              </button>

              <a
                href="/audio/jingle-edson-albertassi.mp3"
                download
                className="p-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
                title="Baixar Jingle"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>

          </div>

          <audio
            ref={audioRef}
            src="/audio/jingle-edson-albertassi.mp3"
            onEnded={() => setIsPlaying(false)}
          />
        </div>

      </div>
    </AnimatedSection>
  );
}
