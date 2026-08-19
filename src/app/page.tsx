import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SocialSection } from "@/components/sections/SocialSection";
import { NewsSection } from "@/components/sections/NewsSection";
// import { JingleSection } from "@/components/sections/JingleSection"; // Temporariamente comentado: será um player de vídeo posteriormente
import { getNoticias } from "@/lib/news-storage";

export default async function HomePage() {
  const initialNoticias = await getNoticias();

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section com Foto, Título, Subtexto e Botões */}
      <HeroSection />

      {/* 2. Galeria de Fotos / Nossa História em Carrossel */}
      <GallerySection />

      {/* 3. Seção Redes Sociais com as 3 Faixas Coloridas e Links Oficiais */}
      <SocialSection />

      {/* 4. Notícias / Blog Corporativo */}
      <NewsSection initialNoticias={initialNoticias.slice(0, 4)} />

      {/* 5. Seção Jingle / Vídeo da Campanha (Comentada temporariamente conforme solicitação) */}
      {/* <JingleSection /> */}
    </main>
  );
}
