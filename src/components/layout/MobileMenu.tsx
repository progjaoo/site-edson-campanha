"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Youtube, X, Camera, LucideIcon } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
  highlight?: boolean;
  icon?: LucideIcon;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
}

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.316 0 .618.05.9.143V9.45a6.34 6.34 0 0 0-.9-.065A6.338 6.338 0 0 0 3 15.722a6.338 6.338 0 0 0 6.335 6.335 6.338 6.338 0 0 0 6.335-6.335V8.307a8.214 8.214 0 0 0 4.919 1.621v-3.242z" />
    </svg>
  );
}

const mobileSocialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/ealbertassi/",
    icon: Instagram,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@ealbertassi?_r=1&_t=ZS-97qA7WO77vY",
    icon: TikTokIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/ealbertassi",
    icon: Facebook,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ealbertassi",
    icon: Youtube,
  },
];

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const orderedLinks = [
    ...links.filter((link) => link.highlight),
    ...links.filter((link) => !link.highlight),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-brand-navy to-brand-dark p-6 shadow-2xl flex flex-col justify-between border-l border-white/10"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <Link
                  href="/"
                  onClick={onClose}
                  aria-label="Voltar para a página inicial"
                  className="relative block h-9 w-32 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBE502]"
                >
                  <Image
                    src="/images/logos/logo-header.svg"
                    alt="Edson Albertassi"
                    fill
                    className="object-contain"
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="min-h-11 min-w-11 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-4">
                {orderedLinks.map((item) => {
                  if (item.highlight) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-xl bg-brand-yellow text-brand-dark font-extrabold text-sm uppercase tracking-wider shadow-lg hover:bg-white transition-all duration-200"
                      >
                        <Camera className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="rounded-lg px-4 py-3 text-lg font-bold uppercase tracking-wide text-white/90 transition-all duration-150 hover:bg-white/5 hover:text-brand-yellow"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <nav
                aria-label="Redes sociais oficiais de Edson Albertassi"
                className="flex items-center justify-center gap-3"
              >
                {mobileSocialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${item.name} de Edson Albertassi`}
                      title={item.name}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white/10 text-white transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </nav>
              <p className="text-center text-xs text-white/50">
                Edson Albertassi • Deputado Estadual 15088
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
