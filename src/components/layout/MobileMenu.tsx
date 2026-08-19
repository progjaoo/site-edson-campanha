"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Camera, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
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
                <div className="relative h-9 w-32">
                  <Image
                    src="/images/logo-header.svg"
                    alt="Edson Albertassi"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((item) => {
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
                      className={cn(
                        "text-lg font-bold tracking-wide uppercase py-3 px-4 rounded-lg text-white/90 hover:text-brand-yellow hover:bg-white/5 transition-all duration-150"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="https://www.instagram.com/ealbertassi?igsh=cDZobzhiNzFscno5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                <span>Instagram Oficial</span>
              </a>
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
