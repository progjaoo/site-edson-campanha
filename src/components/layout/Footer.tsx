import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, Shield, Heart } from "lucide-react";

// Ícone TikTok
function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
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

export function Footer() {
  return (
    <footer className="relative bg-[#003967] text-white overflow-hidden pt-16 pb-12 border-t-4 border-[#FBE502]">
      {/* Faixa decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="w-1/4 bg-[#93FD04]" />
        <div className="w-1/2 bg-[#FBE502]" />
        <div className="w-1/4 bg-[#1256CE]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          
          {/* Coluna 1: Logo e Identidade */}
          <div className="space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/images/logo-header.svg"
                alt="Edson Albertassi"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-archivo text-sm text-white/85 leading-relaxed font-normal">
              Com coragem, confiança e competência, trabalhando pelo desenvolvimento de Volta Redonda e de todo o Estado do Rio de Janeiro.
            </p>
            <div className="inline-block px-3 py-1 bg-[#FBE502]/20 rounded-full border border-[#FBE502]/40">
              <span className="font-archivo text-xs font-bold text-[#FBE502] tracking-wider uppercase">
                DEPUTADO ESTADUAL 15088
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h3 className="font-archivo text-sm font-bold uppercase tracking-wider text-[#FBE502]">
              Navegação
            </h3>
            <ul className="space-y-2 font-archivo text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-[#FBE502] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/historia" className="hover:text-[#FBE502] transition-colors">
                  Biografia & História
                </Link>
              </li>
              <li>
                <Link href="/faca-sua-foto" className="hover:text-[#FBE502] transition-colors font-semibold text-white">
                  Faça sua Foto de Apoio
                </Link>
              </li>
              <li>
                <Link href="/#noticias" className="hover:text-[#FBE502] transition-colors">
                  Notícias & Propostas
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes Oficiais */}
          <div className="space-y-3">
            <h3 className="font-archivo text-sm font-bold uppercase tracking-wider text-[#FBE502]">
              Redes Oficiais
            </h3>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://www.instagram.com/ealbertassi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-black" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/ealbertassi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 text-black" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@ealbertassi?_r=1&_t=ZS-97qA7WO77vY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-black" />
                <span>TikTok</span>
              </a>
              <a
                href="https://www.youtube.com/@ealbertassi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Youtube className="w-3.5 h-3.5 text-black" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Coluna 4: Transparência & Legal */}
          <div className="space-y-3">
            <h3 className="font-archivo text-sm font-bold uppercase tracking-wider text-[#FBE502]">
              Transparência & LGPD
            </h3>
            <p className="font-archivo text-xs text-white/70 leading-relaxed">
              Este site respeita a Lei Geral de Proteção de Dados (LGPD) e a legislação eleitoral vigente.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <Link
                href="/politica-de-privacidade"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#FBE502] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Política de Privacidade</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-archivo text-xs text-white/60">
          <p>© {new Date().getFullYear()} Edson Albertassi — Eleição 2026. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Feito com fé e coragem para o Rio</span>
            <Heart className="w-3.5 h-3.5 text-[#FBE502] inline fill-[#FBE502]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
