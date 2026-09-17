"use client";

import { ArrowUpRight } from "lucide-react";

export function PhotoCTAActions() {
  const handleCreatePhoto = () => {
    window.location.assign("/faca-sua-foto");
  };

  const handleFollow = () => {
    window.location.assign("/");
  };

  return (
    <div className="mt-5 flex w-full max-w-xs flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleCreatePhoto}
        aria-label="Abrir página Faça sua Foto"
        className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#FBE502] px-6 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1256CE]"
      >
        FAÇA SUA FOTO
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleFollow}
        className="inline-flex items-center gap-2 rounded-lg px-1 py-1 font-archivo text-sm font-black italic uppercase tracking-wide text-white/75 transition-colors hover:text-[#FBE502] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        SIGA EALBERTASSI
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
