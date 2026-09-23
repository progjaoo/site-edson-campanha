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
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  BallotSelection,
  BallotSelections,
  BallotSlotId,
  ElectionCandidate,
} from "@/lib/election/types";
import { BALLOT_SLOTS } from "@/lib/election/types";

const STORAGE_KEY = "edson:colinha:2026:rj:v1";
const NAME_STORAGE_KEY = "edson:colinha:2026:rj:name:v1";
const DEFAULT_EDSON_ID = "190002538813";
const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1920;
const POSTER_IMAGE = "/images/colinha/colinha-pronta.png?v=94ba3622";
const SHARE_URL = "https://edsonalbertassi.com/colinha-eleitoral";
const SHARE_MESSAGE = "Faça a sua colinha também";
const POSTER_FILENAME = "colinha-eleitoral-2026.png";
const PHOTO_BOX = { x: 68, width: 160, height: 180 };
const TITLE_BOX = { x: 80, y: 258, width: 920, height: 104 };

const ART_ROWS: Array<{
  slotId: BallotSlotId;
  digitCount: number;
  photoY: number;
  numberY: number;
  nameX: number;
  nameWidth: number;
}> = [
  { slotId: "deputadoFederal", digitCount: 4, photoY: 420, numberY: 470, nameX: 460, nameWidth: 540 },
  { slotId: "deputadoEstadual", digitCount: 5, photoY: 626, numberY: 676, nameX: 473, nameWidth: 527 },
  { slotId: "senador1", digitCount: 3, photoY: 832, numberY: 882, nameX: 382, nameWidth: 618 },
  { slotId: "senador2", digitCount: 3, photoY: 1038, numberY: 1088, nameX: 382, nameWidth: 618 },
  { slotId: "governador", digitCount: 2, photoY: 1244, numberY: 1294, nameX: 402, nameWidth: 520 },
  { slotId: "presidente", digitCount: 2, photoY: 1450, numberY: 1500, nameX: 387, nameWidth: 365 },
];

const DIGIT_BOX = { x: 238, y: 0, width: 113, height: 130, gap: 10 };

function fitTextSize(text: string, width: number, max: number, min: number) {
  return Math.max(min, Math.min(max, (width - 12) / (text.length * 0.55)));
}

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

function selectionShortLabel(selection: BallotSelection) {
  if (selection.kind === "blank") return "BRANCO";
  if (selection.kind === "null") return "NULO";
  if (selection.kind === "legend") return "LEGENDA";
  return "";
}

function selectionName(
  selection: BallotSelection | undefined,
  candidate: ElectionCandidate | undefined,
) {
  if (selection?.kind === "candidate") return candidate?.ballotName ?? "";
  if (selection?.kind === "blank") return "VOTO EM BRANCO";
  if (selection?.kind === "null") return "VOTO NULO";
  if (selection?.kind === "legend") return "VOTO DE LEGENDA";
  return "";
}

function photoUrl(candidate: ElectionCandidate) {
  const base = process.env.NEXT_PUBLIC_ELECTION_ASSETS_BASE_URL?.replace(/\/$/, "");
  return base ? `${base}/${candidate.photoKey}` : candidate.photoPath;
}

function CandidatePhoto({
  candidate,
  className,
}: {
  candidate: ElectionCandidate;
  className: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(candidate)}
      alt={`Foto de ${candidate.ballotName}`}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

function specialSelection(kind: "blank" | "null" | "legend"): BallotSelection {
  return { kind };
}

function isCandidateSelection(selection: BallotSelection | undefined, candidateId: string) {
  return selection?.kind === "candidate" && selection.candidateId === candidateId;
}

function isBallotSelection(value: unknown): value is BallotSelection {
  if (!value || typeof value !== "object" || !("kind" in value)) return false;
  const selection = value as { kind?: unknown; candidateId?: unknown };
  return (
    (selection.kind === "candidate" && typeof selection.candidateId === "string") ||
    selection.kind === "blank" ||
    selection.kind === "null" ||
    selection.kind === "legend"
  );
}

function sanitizeSelections(value: unknown, candidates: ElectionCandidate[]): BallotSelections {
  if (!value || typeof value !== "object") return {};
  const source = value as Record<string, unknown>;
  const result: BallotSelections = {};

  for (const slot of BALLOT_SLOTS) {
    const selection = source[slot.id];
    if (!isBallotSelection(selection)) continue;
    if (selection.kind === "candidate") {
      const candidate = candidates.find(
        (item) =>
          item.candidateId === selection.candidateId &&
          item.scope === slot.scope &&
          item.officeCode === slot.officeCode,
      );
      if (candidate) result[slot.id] = { kind: "candidate", candidateId: candidate.candidateId };
      continue;
    }
    if (selection.kind === "legend" && !["6", "7"].includes(slot.officeCode)) continue;
    result[slot.id] = selection;
  }
  return result;
}

function percentRect(rect: { x: number; y: number; width: number; height: number }) {
  return {
    left: `${(rect.x / POSTER_WIDTH) * 100}%`,
    top: `${(rect.y / POSTER_HEIGHT) * 100}%`,
    width: `${(rect.width / POSTER_WIDTH) * 100}%`,
    height: `${(rect.height / POSTER_HEIGHT) * 100}%`,
  };
}

function PosterPreview({
  selections,
  candidatesById,
  displayName,
}: {
  selections: BallotSelections;
  candidatesById: Map<string, ElectionCandidate>;
  displayName: string;
}) {
  const title = displayName ? `COLINHA DO ${displayName.toLocaleUpperCase("pt-BR")}` : "MINHA COLINHA";
  const titleFontSize = `${fitTextSize(title, TITLE_BOX.width, 78, 40) / 10.8}cqw`;

  return (
    <div className="colinha-poster print-poster relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl bg-brand-navy shadow-lg">
      {/* This local artwork is decorative; the accessible candidate list follows the image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      <div
        aria-hidden="true"
        className="absolute z-10 flex items-center justify-center overflow-hidden text-center font-condensed font-black italic leading-none text-white"
        style={{ ...percentRect(TITLE_BOX), fontSize: titleFontSize }}
      >
        <span className="colinha-title-overlay whitespace-nowrap">{title}</span>
      </div>

      {ART_ROWS.map((row) => {
        const selection = selections[row.slotId];
        const candidate =
          selection?.kind === "candidate" ? candidatesById.get(selection.candidateId) : undefined;
        const candidateName = selectionName(selection, candidate);
        const nameFontSize = candidateName
          ? `${fitTextSize(candidateName, row.nameWidth, 29, 16) / 10.8}cqw`
          : "2.4cqw";
        const numberCells = Array.from({ length: row.digitCount }, (_, index) => ({
          x: DIGIT_BOX.x + index * (DIGIT_BOX.width + DIGIT_BOX.gap),
          y: row.numberY,
          width: DIGIT_BOX.width,
          height: DIGIT_BOX.height,
        }));
        const digits = candidate
          ? candidate.ballotNumber.replace(/\D/g, "").slice(-row.digitCount).padStart(row.digitCount, "0")
          : "";

        return (
          <div key={row.slotId} aria-hidden="true">
            <div
              className="colinha-candidate-name absolute z-10 flex items-center overflow-hidden whitespace-nowrap font-condensed font-black italic uppercase leading-none text-white"
              style={{
                ...percentRect({
                  x: row.nameX,
                  y: row.photoY - 3,
                  width: row.nameWidth,
                  height: 38,
                }),
                fontSize: nameFontSize,
              }}
            >
              {candidateName}
            </div>
            <div
              className="absolute z-10 overflow-hidden rounded-lg bg-white"
              style={{ ...percentRect({ x: PHOTO_BOX.x, y: row.photoY, width: PHOTO_BOX.width, height: PHOTO_BOX.height }), borderRadius: "0.8cqw" }}
            >
              {candidate ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl(candidate)}
                  alt=""
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
              ) : null}
            </div>

            {numberCells.map((cell, index) => (
              <div
                key={`${row.slotId}-${index}`}
                className="absolute z-10 flex items-center justify-center rounded-lg bg-white font-black leading-none text-black"
                style={{
                  ...percentRect(cell),
                  borderRadius: "0.8cqw",
                  fontSize: "clamp(11px, 6.7cqw, 72px)",
                  fontFamily: '"Arial Black", Arial, sans-serif',
                }}
              >
                {digits[index] ?? ""}
              </div>
            ))}

            {selection && selection.kind !== "candidate" ? (
              <div
                className="absolute z-20 flex items-center justify-center rounded-lg bg-white px-1 font-archivo text-center text-[clamp(8px,2.2cqw,23px)] font-black uppercase leading-tight text-brand-dark"
                style={percentRect({
                  x: DIGIT_BOX.x,
                  y: row.numberY,
                  width: row.digitCount * DIGIT_BOX.width + (row.digitCount - 1) * DIGIT_BOX.gap,
                  height: DIGIT_BOX.height,
                })}
              >
                {selectionShortLabel(selection)}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

async function loadCanvasImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Não foi possível carregar uma das fotos da colinha."));
    image.src = src;
  });
}

function canShareFile(file: File) {
  try {
    return typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

function downloadPosterBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = POSTER_FILENAME;
  link.target = "_blank";
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function openWhatsAppShare() {
  const text = `${SHARE_MESSAGE}\n${SHARE_URL}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const whatsappWindow = window.open(whatsappUrl, "_blank");

  if (whatsappWindow) whatsappWindow.opener = null;
  else window.location.assign(whatsappUrl);
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = 0;
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

async function createPosterPng(
  selections: BallotSelections,
  candidatesById: Map<string, ElectionCandidate>,
  displayName: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = POSTER_WIDTH;
  canvas.height = POSTER_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Seu navegador não conseguiu preparar a imagem.");

  const baseImage = await loadCanvasImage(POSTER_IMAGE);
  context.drawImage(baseImage, 0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  await document.fonts.ready;

  const title = displayName ? `COLINHA DO ${displayName.toLocaleUpperCase("pt-BR")}` : "MINHA COLINHA";
  const condensedFont = getComputedStyle(document.querySelector(".colinha-title-overlay")!).fontFamily;
  const titleFontPx = fitTextSize(title, TITLE_BOX.width, 78, 40);
  context.font = `900 italic ${titleFontPx}px ${condensedFont}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";
  context.fillText(title, TITLE_BOX.x + TITLE_BOX.width / 2, TITLE_BOX.y + TITLE_BOX.height / 2, TITLE_BOX.width);

  const candidatesToDraw = ART_ROWS.flatMap((row) => {
    const selection = selections[row.slotId];
    if (selection?.kind !== "candidate") return [];
    const candidate = candidatesById.get(selection.candidateId);
    return candidate ? [{ row, candidate }] : [];
  });
  const photos = await Promise.all(candidatesToDraw.map(({ candidate }) => loadCanvasImage(photoUrl(candidate))));

  for (const row of ART_ROWS) {
    const selection = selections[row.slotId];
    const candidate = selection?.kind === "candidate" ? candidatesById.get(selection.candidateId) : undefined;
    const candidateName = selectionName(selection, candidate);
    const nameY = row.photoY - 3;
    if (candidateName) {
      const nameFontPx = fitTextSize(candidateName, row.nameWidth, 29, 16);
      context.font = `900 italic ${nameFontPx}px ${condensedFont}`;
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.fillStyle = "#ffffff";
      context.fillText(candidateName.toLocaleUpperCase("pt-BR"), row.nameX, nameY + 19, row.nameWidth);
    }
    const { x, width, height } = PHOTO_BOX;
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(x, row.photoY, width, height, 10);
    context.fill();

    if (candidate) {
      const imageIndex = candidatesToDraw.findIndex(({ candidate: item }) => item.candidateId === candidate.candidateId);
      context.save();
      context.beginPath();
      context.roundRect(x, row.photoY, width, height, 10);
      context.clip();
      drawCoverImage(context, photos[imageIndex], x, row.photoY, width, height);
      context.restore();
    }

    const cells = Array.from({ length: row.digitCount }, (_, index) => ({
      x: DIGIT_BOX.x + index * (DIGIT_BOX.width + DIGIT_BOX.gap),
      y: row.numberY,
    }));
    context.fillStyle = "#ffffff";
    for (const cell of cells) {
      context.beginPath();
      context.roundRect(cell.x, cell.y, DIGIT_BOX.width, DIGIT_BOX.height, 9);
      context.fill();
    }

    if (candidate) {
      const digits = candidate.ballotNumber.replace(/\D/g, "").slice(-row.digitCount).padStart(row.digitCount, "0");
      context.fillStyle = "#050505";
      context.font = '900 72px "Arial Black", Arial, sans-serif';
      context.textAlign = "center";
      context.textBaseline = "middle";
      digits.split("").forEach((digit, index) => {
        context.fillText(digit, cells[index].x + DIGIT_BOX.width / 2, row.numberY + DIGIT_BOX.height / 2, DIGIT_BOX.width - 6);
      });
    } else if (selection) {
      const spanWidth = row.digitCount * DIGIT_BOX.width + (row.digitCount - 1) * DIGIT_BOX.gap;
      context.fillStyle = "#051a33";
      context.font = "900 24px Archivo, sans-serif";
      context.fillText(selectionShortLabel(selection), DIGIT_BOX.x + spanWidth / 2, row.numberY + DIGIT_BOX.height / 2, spanWidth - 16);
    }
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("A imagem não foi gerada."))), "image/png");
  });
}

export function ColinhaBuilder({ candidates }: { candidates: ElectionCandidate[] }) {
  const [selections, setSelections] = useState<BallotSelections>({
    deputadoEstadual: { kind: "candidate", candidateId: DEFAULT_EDSON_ID },
  });
  const [activeSlot, setActiveSlot] = useState<BallotSlotId | null>(null);
  const [query, setQuery] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const candidatesById = useMemo(
    () => new Map(candidates.map((candidate) => [candidate.candidateId, candidate])),
    [candidates],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setSelections(sanitizeSelections(JSON.parse(saved), candidates));
      setDisplayName(window.localStorage.getItem(NAME_STORAGE_KEY)?.slice(0, 20) ?? "");
    } catch {
      // The colinha remains usable in memory when storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, [candidates]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
      if (displayName) window.localStorage.setItem(NAME_STORAGE_KEY, displayName);
      else window.localStorage.removeItem(NAME_STORAGE_KEY);
    } catch {
      // The user's choices are still available until they close this page.
    }
  }, [displayName, hydrated, selections]);

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
        return [
          candidate.ballotName,
          candidate.ballotNumber,
          candidate.partyAcronym ?? "",
          candidate.partyName ?? "",
        ]
          .map(normalize)
          .some((value) => value.includes(normalizedQuery));
      })
      .slice(0, 80);
  }, [activeDefinition, candidates, query]);

  const selectedCandidate = (slotId: BallotSlotId) => {
    const selection = selections[slotId];
    return selection?.kind === "candidate" ? candidatesById.get(selection.candidateId) ?? null : null;
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
      const duplicateSlot = BALLOT_SLOTS.find(
        (slot) => slot.id !== activeSlot && selections[slot.id]?.kind === "candidate" &&
          isCandidateSelection(selections[slot.id], selection.candidateId),
      );
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
    setSelections({ deputadoEstadual: { kind: "candidate", candidateId: DEFAULT_EDSON_ID } });
    setDisplayName("");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(NAME_STORAGE_KEY);
    } catch {
      // Reset still applies to the current page if storage is unavailable.
    }
    setNotice(null);
  };

  const changeDisplayName = (value: string) => {
    setDisplayName(value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 20));
  };

  const download = async () => {
    setGenerating(true);
    setNotice(null);
    try {
      const blob = await createPosterPng(selections, candidatesById, displayName.trim());
      downloadPosterBlob(blob);
      setNotice("Colinha baixada em PNG.");
    } catch (error) {
      setNotice(error instanceof Error ? `${error.message} Você ainda pode imprimir ou salvar como PDF.` : "Falha ao gerar a imagem. Você ainda pode imprimir ou salvar como PDF.");
    } finally {
      setGenerating(false);
    }
  };

  const shareColinha = async () => {
    setGenerating(true);
    setNotice(null);
    try {
      const blob = await createPosterPng(selections, candidatesById, displayName.trim());
      const file = new File([blob], POSTER_FILENAME, { type: "image/png" });

      if (typeof navigator.share === "function" && canShareFile(file)) {
        try {
          await navigator.share({
            title: "Minha colinha eleitoral",
            text: SHARE_MESSAGE,
            url: SHARE_URL,
            files: [file],
          });
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") return;
          // If native sharing fails, send the prepared image through the WhatsApp fallback.
        }
      }

      downloadPosterBlob(blob);
      setNotice("A imagem foi baixada. No WhatsApp, anexe colinha-eleitoral-2026.png; a mensagem e o link já estão prontos.");
      openWhatsAppShare();
    } catch (error) {
      setNotice(error instanceof Error ? `${error.message} Tente baixar a imagem e compartilhá-la pelo WhatsApp.` : "Não foi possível preparar o compartilhamento da colinha.");
    } finally {
      setGenerating(false);
    }
  };

  const activeSelection = activeDefinition ? selections[activeDefinition.id] : undefined;
  const displayNameForPoster = displayName.trim();

  return (
    <div className="mx-auto max-w-[1440px] px-4 font-archivo sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-archivo text-3xl font-black uppercase leading-none text-brand-navy sm:text-4xl">
            Monte sua colinha
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Escolha seus candidatos e confira a arte pronta ao lado.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-brand-blue/15 bg-white px-4 py-3 shadow-sm">
          <span className="text-xs text-slate-600">Suas escolhas ficam neste aparelho</span>
          <Badge variant="outline" className="shrink-0">{selectedCount}/{BALLOT_SLOTS.length}</Badge>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-brand-blue/15 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
          Dados públicos do TSE atualizados em 22/09/2026. Confira a situação dos candidatos no site oficial antes de votar.
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={reset} className="shrink-0">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Restaurar exemplo
        </Button>
      </div>

      {notice && !activeDefinition ? (
        <p role="status" className="mb-4 rounded-lg border border-brand-blue/20 bg-white px-4 py-3 text-sm font-semibold text-brand-navy">
          {notice}
        </p>
      ) : null}

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:gap-6">
        <section aria-labelledby="candidate-list-heading">
          <Card>
            <CardHeader className="border-b border-slate-200 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle id="candidate-list-heading" className="font-archivo text-2xl uppercase">Escolha seus candidatos</CardTitle>
                  <CardDescription>Selecione um cargo para buscar ou trocar o candidato.</CardDescription>
                </div>
                <Badge variant="muted">2026</Badge>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-slate-200 p-0">
              {BALLOT_SLOTS.map((slot) => {
                const selection = selections[slot.id];
                const candidate = selectedCandidate(slot.id);
                return (
                  <div key={slot.id} className="flex min-h-[88px] items-center gap-3 px-4 py-3 sm:px-5">
                    {candidate ? (
                      <CandidatePhoto candidate={candidate} className="h-14 w-12 shrink-0 rounded-lg bg-brand-light object-cover object-top" />
                    ) : (
                      <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand-blue" aria-hidden="true">
                        <Search className="h-5 w-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h2 className="font-archivo text-base font-black uppercase text-brand-navy sm:text-lg">{slot.label}</h2>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{slot.scope === "BR" ? "Brasil" : "Rio de Janeiro"}</span>
                      </div>
                      {candidate ? (
                        <>
                          <p className="truncate text-sm font-bold text-brand-dark">{candidate.ballotName}</p>
                          <p className="text-xs text-slate-500"><span className="font-black text-brand-blue">{candidate.ballotNumber}</span> · {candidate.partyAcronym || "Partido não informado"}</p>
                        </>
                      ) : selection ? (
                        <Badge variant="muted" className="mt-1">{selectionLabel(selection)}</Badge>
                      ) : (
                        <p className="text-xs text-slate-500">Ainda não escolhido</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant={candidate || selection ? "outline" : "default"}
                      size="sm"
                      onClick={() => openPicker(slot.id)}
                      className="shrink-0"
                    >
                      {candidate || selection ? "Trocar" : "Escolher"}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
            <div className="border-t border-slate-200 bg-brand-light/70 px-4 py-3 sm:px-5">
              <p className="text-xs leading-relaxed text-slate-600">
                Edson Albertassi aparece pré-selecionado apenas como exemplo. Você pode trocar essa escolha.
              </p>
            </div>
          </Card>
        </section>

        <section aria-labelledby="poster-heading" className="min-w-0">
          <Card className="lg:sticky lg:top-24">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline" className="uppercase tracking-wide">Prévia ao vivo</Badge>
                  <CardTitle id="poster-heading" className="mt-2 font-archivo text-2xl uppercase">Sua colinha pronta</CardTitle>
                  <CardDescription>Fotos, nomes e números mudam conforme suas escolhas. “Passar Cola” compartilha a imagem e o link com o aplicativo que você selecionar.</CardDescription>
                </div>
                <div className="no-print flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button type="button" variant="outline" size="sm" onClick={download} disabled={generating} aria-label="Baixar colinha como imagem PNG">
                    <Download className="h-4 w-4" aria-hidden="true" /> {generating ? "Gerando" : "Baixar"}
                  </Button>
                  <Button type="button" variant="secondary" size="sm" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" aria-hidden="true" /> Imprimir
                  </Button>
                  <Button type="button" variant="default" size="sm" onClick={shareColinha} disabled={generating} aria-label="Passar colinha">
                    <Send className="h-4 w-4" aria-hidden="true" /> {generating ? "Preparando" : "Passar Cola"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="no-print space-y-2">
                <Label htmlFor="colinha-display-name">Nome na colinha (opcional)</Label>
                <Input
                  id="colinha-display-name"
                  value={displayName}
                  onChange={(event) => changeDisplayName(event.target.value)}
                  placeholder="Ex.: João"
                  maxLength={20}
                  autoComplete="off"
                  aria-describedby="colinha-name-help"
                />
                <p id="colinha-name-help" className="text-xs text-slate-500">
                  Será salvo somente neste aparelho. Deixe vazio para usar “MINHA COLINHA”.
                </p>
              </div>

              <div className="print-sheet rounded-xl border border-brand-blue/15 bg-brand-light p-2 sm:p-3">
                <div className="colinha-print-root">
                  <PosterPreview
                    selections={selections}
                    candidatesById={candidatesById}
                    displayName={displayNameForPoster}
                  />
                </div>
              </div>

              <div className="no-print border-t border-slate-200 pt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-archivo text-lg font-black uppercase text-brand-navy">Selecionados</h3>
                  <span className="text-xs text-slate-500">Prévia da sua lista</span>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {BALLOT_SLOTS.map((slot) => {
                    const selection = selections[slot.id];
                    const candidate = selectedCandidate(slot.id);
                    return (
                      <li key={slot.id} className="min-w-0 rounded-lg bg-brand-light px-3 py-2">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{slot.label}</p>
                        <p className="truncate text-xs font-bold text-brand-dark">
                          {candidate ? candidate.ballotName : selection ? selectionLabel(selection) : "Não escolhido"}
                        </p>
                        {candidate ? <p className="text-xs font-black text-brand-blue">{candidate.ballotNumber}</p> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Dialog
        open={Boolean(activeDefinition)}
        onOpenChange={(open) => {
          if (!open) setActiveSlot(null);
        }}
      >
        {activeDefinition ? (
          <DialogContent className="grid h-[min(82dvh,760px)] max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 p-0 lg:grid-rows-1 lg:grid-cols-[minmax(250px,0.82fr)_minmax(390px,1.1fr)_minmax(220px,0.68fr)]">
            <section className="flex min-h-0 flex-col border-b border-slate-200 px-5 py-5 pr-14 sm:px-6 lg:border-b-0 lg:border-r">
              <DialogHeader>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-blue">
                  {activeDefinition.scope === "BR" ? "Candidatos à Presidência · Brasil" : "Candidatos do Rio de Janeiro"}
                </p>
                <DialogTitle className="mt-1 font-archivo uppercase">{activeDefinition.label}</DialogTitle>
                <DialogDescription>
                  {activeCandidates.length} candidatos exibidos. Busque por nome, número ou partido.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5">
                <Label htmlFor="candidate-search" className="sr-only">Buscar candidato por nome, número ou partido</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <Input
                    id="candidate-search"
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Busque por nome, número ou partido"
                    className="pl-10"
                  />
                </div>
              </div>
              {notice ? (
                <p role="status" className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950">
                  {notice}
                </p>
              ) : null}
              <p className="mt-auto hidden pt-5 text-xs leading-relaxed text-slate-500 lg:block">
                A lista vem dos dados públicos do TSE. Sua seleção é salva apenas neste aparelho.
              </p>
            </section>

            <section aria-label={`Lista de ${activeDefinition.label}`} className="min-h-0 lg:border-r lg:border-slate-200">
              <ScrollArea className="h-full px-4 py-4 sm:px-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {activeCandidates.map((candidate) => (
                  <button
                    type="button"
                    key={candidate.candidateId}
                    aria-pressed={isCandidateSelection(activeSelection, candidate.candidateId)}
                    onClick={() => choose({ kind: "candidate", candidateId: candidate.candidateId })}
                    className="flex min-h-[92px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-brand-blue/50 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue aria-pressed:border-brand-blue aria-pressed:bg-brand-light"
                  >
                    <CandidatePhoto candidate={candidate} className="h-16 w-12 shrink-0 rounded-lg bg-brand-light object-cover object-top" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-brand-dark">{candidate.ballotName}</span>
                      <span className="mt-1 block truncate text-[17.333px] leading-tight text-brand-blue" style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}>{candidate.ballotNumber}</span>
                      <span className="mt-0.5 block truncate text-[11px] text-slate-500">{candidate.partyAcronym || "Partido não informado"}</span>
                    </span>
                    {isCandidateSelection(activeSelection, candidate.candidateId) ? (
                      <Check className="h-5 w-5 shrink-0 text-brand-blue" aria-label="Candidato selecionado" />
                    ) : null}
                  </button>
                ))}
              </div>
              {activeCandidates.length === 0 ? (
                <p className="py-16 text-center text-sm text-slate-500">Nenhum candidato encontrado. Tente outro termo.</p>
              ) : null}
            </ScrollArea>
            </section>

            <section className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-5 lg:border-t-0 lg:px-5 lg:py-6">
              <p className="text-sm font-bold text-brand-navy">Outras opções</p>
              <p className="mb-4 mt-1 text-xs leading-relaxed text-slate-500">Escolha uma opção de voto para este cargo.</p>
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <Button type="button" variant="outline" className="w-full justify-center" onClick={() => choose(specialSelection("blank"))}>Voto em branco</Button>
                <Button type="button" variant="outline" className="w-full justify-center" onClick={() => choose(specialSelection("null"))}>Voto nulo</Button>
                {["6", "7"].includes(activeDefinition.officeCode) ? (
                  <Button type="button" variant="outline" className="w-full justify-center" onClick={() => choose(specialSelection("legend"))}>Voto de legenda</Button>
                ) : null}
              </div>
            </section>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
