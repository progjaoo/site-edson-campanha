import type { Metadata } from "next";
import Image from "next/image";
import { PhotoStudio } from "@/components/photo-generator/PhotoStudio";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Faça sua Foto de Perfil | Edson Albertassi 15088",
  description:
    "Crie e personalize sua foto de apoio com as molduras oficiais de Edson Albertassi (Deputado Estadual 15088). Formatos para Avatar, Feed e Stories.",
  openGraph: {
    title: "Faça sua Foto de Perfil | Edson Albertassi 15088",
    description:
      "Suba sua foto, posicione na moldura oficial e espalhe a mensagem de esperança e fé por todo o Rio de Janeiro.",
    images: ["/images/molduras/Avatar.png"],
  },
};

export default function FacaSuaFotoPage() {
  return (
    <main className="min-h-screen bg-[#003967] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Imagem de Fundo Oficial do Designer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/fundodegrade.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header da Página */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE502]/20 border border-[#FBE502]/40 text-[#FBE502] font-black text-xs uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Campanha 2026</span>
          </div>

          <h1 className="font-condensed font-black italic text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-none">
            Faça sua Foto de Apoio
          </h1>

          <p className="font-archivo text-base sm:text-lg text-white/90 font-medium leading-relaxed">
            Suba sua foto, ajuste o enquadramento, escolha sua moldura preferida e baixe para usar no WhatsApp, Instagram, Facebook e TikTok!
          </p>
        </div>

        {/* Photo Studio Generator */}
        <PhotoStudio />
      </div>
    </main>
  );
}
