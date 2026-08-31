"use client";

import { ArrowUpRight } from "lucide-react";

const whatsappShareUrl =
  "https://wa.me/?text=" +
  encodeURIComponent(
    "Ouça o jingle da campanha Edson Albertassi: Tem que ter fé!\nhttps://youtu.be/Y1ilDrqaCCM",
  );

const youtubeJingleUrl = "https://youtu.be/Y1ilDrqaCCM";

export function JingleActions() {
  const handleWatchJingle = () => {
    window.open(youtubeJingleUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareOnWhatsApp = () => {
    window.open(whatsappShareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-8 flex max-w-xs flex-col gap-3">
      <button
        type="button"
        onClick={handleWatchJingle}
        className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#FBE502] px-5 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1256CE] focus-visible:ring-offset-2"
      >
        ASSISTA AO JINGLE
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleShareOnWhatsApp}
        className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#93FD04] px-5 py-3 font-archivo text-sm font-black uppercase tracking-wide text-[#003967] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1256CE] focus-visible:ring-offset-2"
      >
        COMPARTILHAR NO ZAP
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
