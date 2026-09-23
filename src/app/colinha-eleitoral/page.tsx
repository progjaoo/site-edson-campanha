import type { Metadata } from "next";
import { ColinhaBuilder } from "@/components/election/ColinhaBuilder";
import { TseSourceNotice } from "@/components/election/TseSourceNotice";
import snapshot from "@/data/election-2026.json";
import { colinhaNameFontClassName } from "@/lib/colinha-name-font";
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
      <ColinhaBuilder candidates={election.candidates} nameFontClassName={colinhaNameFontClassName} />
      <TseSourceNotice sourceUpdatedAt={election.sourceUpdatedAt} />
    </main>
  );
}
