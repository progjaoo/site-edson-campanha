"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" });

export function TseSourceNotice({ sourceUpdatedAt }: { sourceUpdatedAt: string }) {
  const [viewedOn, setViewedOn] = useState<string | null>(null);
  const sourceDate = dateFormatter.format(new Date(sourceUpdatedAt));

  useEffect(() => {
    const refreshDate = () => setViewedOn(dateFormatter.format(new Date()));
    refreshDate();
    const interval = window.setInterval(refreshDate, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 px-4 text-xs leading-relaxed text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <p>
        Dados públicos do TSE atualizados em {sourceDate}.
        {viewedOn ? ` Consulta a esta página em ${viewedOn}.` : ""}
        {" "}Confira a situação dos candidatos no site oficial antes de votar.
      </p>
      <a
        href="https://divulgacandcontas.tse.jus.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 font-bold text-brand-blue hover:text-brand-navy"
      >
        Consultar base oficial do TSE <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
