import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ColinhaBuilder } from "@/components/election/ColinhaBuilder";
import snapshot from "@/data/election-2026.json";
import type { ElectionSnapshot } from "@/lib/election/types";
import { createPageMetadata } from "@/lib/seo/metadata";

const election = snapshot as ElectionSnapshot;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Colinha eleitoral 2026 | Edson Albertassi",
    description:
      "Monte sua colinha eleitoral com candidatos à Presidência e aos cargos do Rio de Janeiro. Escolha, confira e imprima no seu dispositivo.",
    pathname: "/colinha-eleitoral",
  }),
  keywords: [
    "colinha eleitoral 2026",
    "candidatos Rio de Janeiro 2026",
    "em quem votar presidente 2026",
    "TSE candidatos 2026",
  ],
};

export default function ColinhaEleitoralPage() {
  return (
    <main className="min-h-screen bg-brand-light pb-20 pt-32 text-brand-dark sm:pt-36">
      <ColinhaBuilder candidates={election.candidates} />
      <div className="mx-auto mt-12 flex max-w-7xl justify-end px-4 text-xs leading-relaxed text-slate-500 sm:px-6 lg:px-8">
        <a href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-brand-blue hover:text-brand-navy">Consultar base oficial do TSE <ExternalLink className="h-3.5 w-3.5" /></a>
      </div>
    </main>
  );
}
