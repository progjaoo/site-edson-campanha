"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  Info,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import type {
  BallotSelection,
  BallotSelections,
  BallotSlotId,
  ElectionCandidate,
} from "@/lib/election/types";
import { BALLOT_SLOTS } from "@/lib/election/types";

const STORAGE_KEY = "edson:colinha:2026:rj:v1";
const DEFAULT_EDSON_ID = "190002538813";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function selectionLabel(selection: BallotSelection | undefined) {
  if (!selection) return "Ainda não escolhido";
  if (selection.kind === "blank") return "Voto em branco";
  if (selection.kind === "null") return "Voto nulo";
  if (selection.kind === "legend") return "Voto de legenda";
  return "Candidato selecionado";
}

function photoUrl(candidate: ElectionCandidate) {
  const base = process.env.NEXT_PUBLIC_ELECTION_ASSETS_BASE_URL?.replace(/\/$/, "");
  return base ? `${base}/${candidate.photoKey}` : candidate.photoPath;
}

function CandidatePhoto({ candidate, large = false }: { candidate: ElectionCandidate; large?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(candidate)}
      alt={`Foto de ${candidate.ballotName}`}
      className={large ? "h-28 w-20 object-cover object-top" : "h-16 w-12 object-cover object-top"}
      loading="lazy"
    />
  );
}

function specialSelection(kind: "blank" | "null" | "legend"): BallotSelection {
  return { kind };
}

function isCandidateSelection(selection: BallotSelection | undefined, candidateId: string) {
  return selection?.kind === "candidate" && selection.candidateId === candidateId;
}

export function ColinhaBuilder({ candidates }: { candidates: ElectionCandidate[] }) {
  const [selections, setSelections] = useState<BallotSelections>({
    deputadoEstadual: { kind: "candidate", candidateId: DEFAULT_EDSON_ID },
  });
  const [activeSlot, setActiveSlot] = useState<BallotSlotId | null>(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setSelections(JSON.parse(saved) as BallotSelections);
    } catch {
      // A private browsing session can reject localStorage. The tool still works in memory.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  }, [hydrated, selections]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSlot(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeDefinition = BALLOT_SLOTS.find((slot) => slot.id === activeSlot);
  const activeCandidates = useMemo(() => {
    if (!activeDefinition) return [];
    const normalizedQuery = normalize(query);
    return candidates
      .filter(
        (candidate) =>
          candidate.scope === activeDefinition.scope &&
          candidate.officeCode === activeDefinition.officeCode,
      )
      .filter((candidate) => {
        if (!normalizedQuery) return true;
        return [candidate.ballotName, candidate.ballotNumber, candidate.partyAcronym ?? "", candidate.partyName ?? ""]
          .map(normalize)
          .some((value) => value.includes(normalizedQuery));
      })
      .slice(0, 80);
  }, [activeDefinition, candidates, query]);

  const selectedCandidate = (slotId: BallotSlotId) => {
    const selection = selections[slotId];
    if (!selection || selection.kind !== "candidate") return null;
    return candidates.find((candidate) => candidate.candidateId === selection.candidateId) ?? null;
  };

  const selectedCount = BALLOT_SLOTS.filter((slot) => selections[slot.id]).length;

  const openPicker = (slotId: BallotSlotId) => {
    setNotice(null);
    setQuery("");
    setActiveSlot(slotId);
  };

  const choose = (selection: BallotSelection) => {
    if (!activeSlot) return;
    if (selection.kind === "candidate") {
      const duplicateSlot = BALLOT_SLOTS.find((slot) => slot.id !== activeSlot && isCandidateSelection(selections[slot.id], selection.candidateId));
      if (duplicateSlot) {
        setNotice(`Esse candidato já está em “${duplicateSlot.label}”. Escolha outro para esta vaga.`);
        return;
      }
    }
    setSelections((current) => ({ ...current, [activeSlot]: selection }));
    setActiveSlot(null);
    setNotice(null);
  };

  const reset = () => {
    const initial: BallotSelections = {
      deputadoEstadual: { kind: "candidate", candidateId: DEFAULT_EDSON_ID },
    };
    setSelections(initial);
    window.localStorage.removeItem(STORAGE_KEY);
    setNotice("Seleções restauradas. A escolha de Edson Albertassi foi mantida como exemplo.");
  };

  const print = () => window.print();

  const downloadSvg = () => {
    const lines = BALLOT_SLOTS.map((slot, index) => {
      const candidate = selectedCandidate(slot.id);
      const selection = selections[slot.id];
      const label = candidate ? `${candidate.ballotNumber} · ${candidate.ballotName}` : selectionLabel(selection);
      const y = 220 + index * 92;
      return `<text x="100" y="${y}" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#051A33">${slot.label}: ${escapeXml(label)}</text>`;
    }).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="900" viewBox="0 0 1240 900"><rect width="1240" height="900" fill="#F4F7FC"/><rect x="42" y="42" width="1156" height="816" rx="28" fill="#fff" stroke="#1256CE" stroke-width="4"/><rect x="42" y="42" width="1156" height="18" rx="9" fill="#FBE502"/><text x="100" y="140" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#003967">MINHA COLINHA ELEITORAL</text><text x="100" y="180" font-family="Arial, sans-serif" font-size="20" fill="#526173">Eleições 2026 · Rio de Janeiro</text>${lines}<text x="100" y="820" font-family="Arial, sans-serif" font-size="18" fill="#526173">Material de consulta pessoal · confira as informações no TSE antes de votar.</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "minha-colinha-eleitoral-2026.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 rounded-[2rem] bg-brand-navy p-6 text-white shadow-xl sm:p-9 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-dark">
            <ShieldCheck className="h-4 w-4" /> Ferramenta local e gratuita
          </span>
          <h1 className="font-condensed text-4xl font-black uppercase leading-none sm:text-6xl">
            Sua colinha para votar
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Encontre os candidatos do Rio de Janeiro e monte uma lista simples para consultar no dia da eleição. A seleção fica somente neste aparelho e pode ser impressa.
          </p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm lg:min-w-52">
          <p className="text-white/60">Preenchimento</p>
          <p className="mt-1 text-3xl font-black text-brand-yellow">{selectedCount}/{BALLOT_SLOTS.length}</p>
          <p className="text-xs text-white/70">vagas selecionadas</p>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-brand-blue/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
          <p className="text-sm leading-relaxed text-slate-600">
            Os dados são uma fotografia da base pública do TSE atualizada em 22/09/2026. Situações eleitorais sem confirmação aparecem como “não informado”; confirme no site oficial antes de votar.
          </p>
        </div>
        <button type="button" onClick={reset} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-xs font-bold uppercase tracking-wide text-brand-navy transition hover:border-brand-blue hover:text-brand-blue">
          <RotateCcw className="h-4 w-4" /> Limpar escolhas
        </button>
      </div>

      {notice ? <p role="status" className="mb-5 rounded-xl border border-brand-yellow bg-brand-yellow/25 px-4 py-3 text-sm font-semibold text-brand-dark">{notice}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BALLOT_SLOTS.map((slot) => {
          const selection = selections[slot.id];
          const candidate = selectedCandidate(slot.id);
          return (
            <article key={slot.id} className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-blue">{slot.scope === "BR" ? "Brasil" : "Rio de Janeiro"}</p>
                  <h2 className="mt-1 font-condensed text-2xl font-black uppercase text-brand-navy">{slot.label}</h2>
                </div>
                <span className="rounded-full bg-brand-light px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{slot.required ? "obrigatório" : "opcional"}</span>
              </div>
              <div className="mt-5 flex flex-1 items-center gap-3">
                {candidate ? <CandidatePhoto candidate={candidate} /> : <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-brand-light text-brand-blue"><Search className="h-5 w-5" /></div>}
                <div className="min-w-0">
                  {candidate ? <><p className="truncate text-sm font-black text-brand-dark">{candidate.ballotName}</p><p className="mt-1 text-2xl font-black text-brand-blue">{candidate.ballotNumber}</p><p className="truncate text-xs text-slate-500">{candidate.partyAcronym || "Partido não informado"}</p></> : <p className="text-sm text-slate-500">{selectionLabel(selection)}</p>}
                </div>
              </div>
              <button type="button" onClick={() => openPicker(slot.id)} className="mt-5 flex min-h-11 w-full items-center justify-between rounded-lg bg-brand-blue px-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-brand-navy">
                <span>{candidate || selection ? "Trocar escolha" : "Escolher candidato"}</span><ChevronDown className="h-4 w-4" />
              </button>
            </article>
          );
        })}
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-blue">Prévia para levar</p><h2 className="mt-1 font-condensed text-3xl font-black uppercase text-brand-navy">Confira sua colinha</h2></div>
            <div className="no-print flex flex-wrap gap-2"><button type="button" onClick={downloadSvg} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-blue px-3 text-xs font-bold uppercase text-brand-blue transition hover:bg-brand-light"><Download className="h-4 w-4" /> Baixar SVG</button><button type="button" onClick={print} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-yellow px-3 text-xs font-black uppercase text-brand-dark transition hover:bg-brand-yellow/80"><Printer className="h-4 w-4" /> Imprimir</button></div>
          </div>
          <div className="print-sheet mt-6 overflow-hidden rounded-xl border border-brand-blue/20 bg-brand-light p-3 sm:p-5">
            <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/colinha/modelo-colinha.svg" alt="Modelo visual da colinha eleitoral" className="absolute inset-0 h-full w-full object-cover opacity-20" />
              <div className="relative z-10 p-5 sm:p-8">
                <div className="border-b-4 border-brand-yellow pb-4"><p className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue">Eleições 2026 · Rio de Janeiro</p><h3 className="mt-2 font-condensed text-4xl font-black uppercase leading-none text-brand-navy sm:text-5xl">Minha colinha</h3><p className="mt-2 text-xs text-slate-500">Consulte antes de votar. Leve apenas o necessário.</p></div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {BALLOT_SLOTS.map((slot) => { const candidate = selectedCandidate(slot.id); const selection = selections[slot.id]; return <div key={slot.id} className="rounded-lg border border-brand-blue/15 bg-white/90 px-3 py-3"><p className="text-[10px] font-black uppercase tracking-wide text-brand-blue">{slot.label}</p><p className="mt-1 text-sm font-black text-brand-dark">{candidate ? `${candidate.ballotNumber} · ${candidate.ballotName}` : selectionLabel(selection)}</p></div>; })}
                </div>
                <p className="mt-7 text-[10px] leading-relaxed text-slate-500">Material de consulta pessoal. A base é pública e pode ser atualizada pelo TSE. Esta ferramenta não registra sua escolha.</p>
              </div>
            </div>
          </div>
        </div>
        <aside className="no-print self-start rounded-2xl bg-brand-navy p-6 text-white shadow-lg">
          <ShieldCheck className="h-7 w-7 text-brand-yellow" />
          <h2 className="mt-4 font-condensed text-3xl font-black uppercase">Privacidade por padrão</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">Esta página não carrega Google Analytics, Meta Pixel ou anúncios. Os candidatos e suas escolhas são tratados no navegador; não há login, formulário ou envio automático para a campanha.</p>
          <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60">A foto e o nome dos candidatos vêm da base pública do TSE. Use a política de privacidade para entender o funcionamento completo do site.</p>
        </aside>
      </section>

      {activeDefinition && (
        <div className="no-print fixed inset-0 z-[120] flex items-end justify-center bg-brand-dark/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="candidate-picker-title">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6"><div><p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-blue">Escolha para</p><h2 id="candidate-picker-title" className="mt-1 font-condensed text-3xl font-black uppercase text-brand-navy">{activeDefinition.label}</h2><p className="mt-1 text-xs text-slate-500">{activeCandidates.length} resultados exibidos</p></div><button type="button" onClick={() => setActiveSlot(null)} className="rounded-full p-2 text-slate-500 transition hover:bg-brand-light hover:text-brand-navy" aria-label="Fechar escolha"><X className="h-6 w-6" /></button></div>
            <div className="border-b border-slate-200 p-5"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por nome, número ou partido" className="min-h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label></div>
            <div className="min-h-0 flex-1 overflow-y-auto p-5"><div className="grid gap-3 sm:grid-cols-2">{activeCandidates.map((candidate) => <button type="button" key={candidate.candidateId} onClick={() => choose({ kind: "candidate", candidateId: candidate.candidateId })} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-brand-blue hover:bg-brand-light"><CandidatePhoto candidate={candidate} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-black text-brand-dark">{candidate.ballotName}</span><span className="mt-1 block text-xl font-black text-brand-blue">{candidate.ballotNumber}</span><span className="block truncate text-xs text-slate-500">{candidate.partyAcronym || "Partido não informado"}</span></span>{isCandidateSelection(selections[activeDefinition.id], candidate.candidateId) ? <Check className="h-5 w-5 shrink-0 text-brand-blue" /> : null}</button>)}</div>{activeCandidates.length === 0 ? <p className="py-10 text-center text-sm text-slate-500">Nenhum candidato encontrado. Tente outro termo.</p> : null}</div>
            <div className="border-t border-slate-200 bg-brand-light p-5"><p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Outras opções</p><div className="flex flex-wrap gap-2"><button type="button" onClick={() => choose(specialSelection("blank"))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-blue">Voto em branco</button><button type="button" onClick={() => choose(specialSelection("null"))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-blue">Voto nulo</button>{(activeDefinition.officeCode === "6" || activeDefinition.officeCode === "7") ? <button type="button" onClick={() => choose(specialSelection("legend"))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-blue">Voto de legenda</button> : null}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] ?? character);
}
