import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SocialSection } from "@/components/sections/SocialSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { WhatsAppSection } from "@/components/sections/WhatsAppSection";
// import { JingleSection } from "@/components/sections/JingleSection"; // Temporariamente comentado: será um player de vídeo posteriormente

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section com Foto, Título, Subtexto e Botões */}
      <HeroSection />

      {/* 2. Seção WhatsApp / Entre para o Grupo no Zap */}
      <WhatsAppSection />

      {/* 3. Seção Redes Sociais com as 3 Faixas Coloridas e Links Oficiais */}
      <SocialSection />

      {/* 4. Galeria de Fotos / Nossa História em Carrossel */}
      <GallerySection />

      {/* 5. Notícias externas / Matérias publicadas na imprensa */}
      <NewsSection />

      {/* 6. Seção Jingle / Vídeo da Campanha (Comentada temporariamente conforme solicitação) */}
      {/* <JingleSection /> */}
    </main>
  );
}
