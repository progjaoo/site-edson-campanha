import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, Shield, Heart, Users } from "lucide-react";

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

// Ícone WhatsApp
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#003967] text-white overflow-hidden pt-16 pb-12 border-t-4 border-[#FBE502]">
      {/* Imagem de Fundo Oficial do Designer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/fundodegrade.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* Faixa decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex z-10">
        <div className="w-1/4 bg-[#93FD04]" />
        <div className="w-1/2 bg-[#FBE502]" />
        <div className="w-1/4 bg-[#1256CE]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          
          {/* Coluna 1: Logo, Identidade & CNPJ */}
          <div className="space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/images/logos/logo-header.svg"
                alt="Edson Albertassi"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-archivo text-sm text-white/85 leading-relaxed font-normal">
              Com coragem, confiança e competência, trabalhando pelo desenvolvimento de Volta Redonda e de todo o Estado do Rio de Janeiro.
            </p>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-[#FBE502]/20 rounded-full border border-[#FBE502]/40">
                <span className="font-archivo text-xs font-bold text-[#FBE502] tracking-wider uppercase">
                  DEPUTADO ESTADUAL 15088
                </span>
              </div>
              <p className="font-archivo text-xs text-white/90 font-bold tracking-wide">
                CNPJ da Campanha: <span className="text-[#FBE502]">68.437.296/0001-46</span>
              </p>
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
                className="flex items-center gap-2 px-3 py-2  bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-black" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/ealbertassi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 text-black" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@ealbertassi?_r=1&_t=ZS-97qA7WO77vY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-black" />
                <span>TikTok</span>
              </a>
              <a
                href="https://www.youtube.com/@ealbertassi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#FBE502] text-black font-archivo font-bold text-xs uppercase tracking-wide hover:bg-white hover:text-[#003967] transition-all shadow-sm"
              >
                <Youtube className="w-3.5 h-3.5 text-black" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Coluna 4: WhatsApp & Transparência */}
          <div className="space-y-3">
            <h3 className="font-archivo text-sm font-bold uppercase tracking-wider text-[#FBE502]">
              Contato & WhatsApp
            </h3>
            <div className="space-y-2">
              <a
                href="https://wa.me/5524998917371"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#FBE502] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#93FD04]" />
                <span>+55 24 99891-7371</span>
              </a>
              <a
                href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#93FD04] text-black font-archivo font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-sm"
              >
                <Users className="w-3.5 h-3.5 text-black" />
                <span>Entrar no Grupo Oficial</span>
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/politica-de-privacidade"
                className="flex items-center gap-2 text-xs text-white/70 hover:text-[#FBE502] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Política de Privacidade & LGPD</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-archivo text-xs text-white/60">
          <p>© {new Date().getFullYear()} Edson Albertassi — Eleição 2026. CNPJ: 68.437.296/0001-46. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Feito com fé e coragem para o Rio</span>
            <Heart className="w-3.5 h-3.5 text-[#FBE502] inline fill-[#FBE502]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
