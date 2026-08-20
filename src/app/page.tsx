import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SocialSection } from "@/components/sections/SocialSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { WhatsAppSection } from "@/components/sections/WhatsAppSection";
import { JingleSection } from "@/components/sections/JingleSection";
import { PhotoCTASection } from "@/components/sections/PhotoCTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section com Foto, Título, Subtexto e Botões */}
      <HeroSection />

      {/* 2. Seção WhatsApp / Entre para o Grupo no Zap */}
      <WhatsAppSection />

      {/* 3. Seção Redes Sociais com as 3 Faixas Coloridas e Links Oficiais */}
      <SocialSection />

      {/* 4. Seção Jingle / Música oficial da campanha */}
      <JingleSection />

      {/* 5. Convite para criar a foto de perfil da campanha */}
      <PhotoCTASection />

      {/* 7. Notícias externas / Matérias publicadas na imprensa */}
      <NewsSection />
    </main>
  );
}
