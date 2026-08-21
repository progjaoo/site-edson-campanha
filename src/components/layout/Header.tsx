"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "REDES", href: "/#zap" },
    { label: "JINGLE", href: "/#jingle" },
    { label: "FAÇA SUA FOTO", href: "/faca-sua-foto", highlight: true, icon: Camera },
    { label: "HISTÓRIA", href: "/historia" },
    { label: "NOTÍCIAS", href: "/#noticias" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#003967] bg-[url('/images/fundodegrade.png')] bg-cover bg-top py-2 shadow-md sm:py-3.5 lg:py-4">
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center px-2 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <a
            href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar para o grupo do WhatsApp de Edson Albertassi"
            className="group absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center sm:right-4 lg:right-6 xl:right-8"
          >
            <div className="relative h-10 w-[108px] transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-36 lg:h-16 lg:w-40 xl:h-[68px] xl:w-44">
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
                      "flex items-center gap-2 rounded-xl px-4 py-2.5 font-archivo text-xs font-black uppercase tracking-wider transition-all duration-200 xl:px-5 xl:text-sm",
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
            className="absolute left-2 min-h-11 min-w-11 rounded-lg p-2.5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FBE502] sm:left-6 lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#FBE502]" />
            ) : (
              <Menu className="w-6 h-6" />
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
