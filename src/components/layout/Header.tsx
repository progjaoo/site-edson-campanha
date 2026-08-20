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
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#003967] bg-[url('/images/fundodegrade.png')] bg-cover bg-top py-3.5 sm:py-4 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
          
          {/* Logo */}
          <a
            href="https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar para o grupo do WhatsApp de Edson Albertassi"
            className="absolute right-[-120px] z-10 flex items-center group"
          >
            <div className="relative h-20 w-40 md:h-20 md:w-40 transition-transform duration-200 group-hover:scale-150">
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
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              const isFacaSuaFoto = item.highlight;
              const isActive = pathname === item.href;

              if (isFacaSuaFoto) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-xl font-archivo font-black text-xs xl:text-sm tracking-wider uppercase transition-all duration-200",
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
                    "font-archivo text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 pendulum-hover relative py-1",
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
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FBE502]"
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
