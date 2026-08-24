"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "REDES", href: "/#zap" },
    { label: "JINGLE", href: "/#jingle" },
    { label: "FAÇA SUA FOTO", href: "/faca-sua-foto", highlight: true, icon: Camera },
    { label: "HISTÓRIA", href: "/historia" },
    { label: "NOTÍCIAS", href: "/#noticias" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#003967] bg-[url('/images/fundodegrade.png')] bg-cover bg-top py-8 shadow-md sm:py-4 lg:py-5">
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center px-2 sm:px-6 lg:px-8">

          {/* Logo oficial aparece somente no desktop após o início do scroll */}
          {isScrolled && (
            <Link
              href="/"
              aria-label="Voltar para a página inicial de Edson Albertassi"
              className="group absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex xl:left-8"
            >
              <span className="block w-[174px] transition-opacity duration-200 group-hover:opacity-90 xl:w-[208px]">
                <Image
                  src="/images/logos/logo-header.png"
                  alt="Edson Albertassi"
                  width={270}
                  height={62}
                  sizes="(min-width: 1280px) 208px, 174px"
                  className="block h-auto w-full"
                />
              </span>
            </Link>
          )}

          {/* Ação do grupo mantida no desktop e revelada no mobile após o início do scroll */}
          <a
            href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar para o grupo do WhatsApp de Edson Albertassi"
            className={cn(
              "group absolute right-[240px] top-1/2 z-10 -translate-y-1/2 items-center max-[320px]:right-[80px] sm:right-2 lg:right-8 xl:right-8",
              isScrolled ? "flex" : "hidden sm:flex"
            )}
          >
            <div className="relative h-11 w-[120px] transition-transform duration-200 group-hover:scale-105 max-[359px]:h-9 max-[359px]:w-24 sm:h-14 sm:w-36 lg:h-16 lg:w-40 xl:h-[68px] xl:w-44">
              <Image
                src="/images/logocantoheader.png"
                alt="Entre para o grupo no Zap"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
            {navLinks.map((item) => {
              const isFacaSuaFoto = item.highlight;
              const isActive = pathname === item.href;

              if (isFacaSuaFoto) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2  px-4 py-2.5 font-archivo text-xs font-black uppercase tracking-wider transition-all duration-200 xl:px-5 xl:text-sm",
                      "bg-[#FBE502] text-black hover:bg-white hover:text-[#003967] shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                    )}
                  >
                    <Camera className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative py-1 font-archivo text-xs font-bold uppercase tracking-wider transition-colors duration-200 pendulum-hover xl:text-sm",
                    isActive
                      ? "text-[#FBE502] font-black"
                      : "text-white hover:text-[#FBE502]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute right-2 min-h-[52px] min-w-[52px] rounded-lg p-3.5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FBE502] sm:right-6 lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8 text-[#FBE502]" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
