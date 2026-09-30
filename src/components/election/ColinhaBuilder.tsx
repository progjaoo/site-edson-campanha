"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Download,
  RotateCcw,
  Search,
  Send,
  Trash2,
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
const FIXED_EDSON_SELECTION: BallotSelection = { kind: "candidate", candidateId: DEFAULT_EDSON_ID };
const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1920;
const POSTER_TEXTURE = "/images/colinha/textura-fundo-figma.svg";
const EDSON_POSTER_PHOTO = "/images/colinha/edson-recortado-figma.png";
const SHARE_URL = "https://edsonalbertassi.com/colinha-eleitoral?nova=1";
const SHARE_MESSAGE = "Faça a sua colinha também";
const POSTER_FILENAME = "colinha-eleitoral-2026.png";
const PHOTO_BOX = { x: 68, width: 160, height: 180 };
const PANEL_BOX = { x: 238, width: 748, height: 128 };
const TITLE_BOX = { x: 160, y: 212, width: 775, height: 105 };
const FOOTER_BOX = { x: 190, y: 1688, width: 700, height: 92 };
const FOOTER_LINES = [
  "CANDIDATOS ESCOLHIDOS E PERSONALIZADOS PELO ELEITOR. ACESSE",
  "EDSONALBERTASSI.COM PARA PERSONALIZAR A SUA, VOTANDO EM",
  "EDSON ALBERTASSI PARA DEPUTADO ESTADUAL.",
];
const CAMPAIGN_LEGAL_TEXT = "PROPAGANDA ELEITORAL 2026 - CNPJ (EDSON ALBERTASSI): 68.437.296/0001-46";

const ART_ROWS: Array<{
  slotId: BallotSlotId;
  digitCount: number;
  photoY: number;
  role: string;
}> = [
  { slotId: "deputadoFederal", digitCount: 4, photoY: 370, role: "DEPUTADO FEDERAL" },
  { slotId: "deputadoEstadual", digitCount: 5, photoY: 576, role: "DEPUTADO ESTADUAL" },
  { slotId: "senador1", digitCount: 3, photoY: 782, role: "1º SENADOR" },
  { slotId: "senador2", digitCount: 3, photoY: 988, role: "2º SENADOR" },
  { slotId: "governador", digitCount: 2, photoY: 1194, role: "GOVERNADOR" },
  { slotId: "presidente", digitCount: 2, photoY: 1400, role: "PRESIDENTE" },
];

const PANEL_TEXT = { x: PANEL_BOX.x + 26, width: 348 };
const NUMBER_BOX = { x: 624, width: 340 };
const DEFAULT_POSTER_TITLE = "MEUS CANDIDATOS";

function fitTextSize(text: string, width: number, max: number, min: number, averageCharacterWidth = 0.46) {
  return Math.max(min, Math.min(max, (width - 12) / (text.length * averageCharacterWidth)));
}

const CANDIDATE_NAME_BASE_SIZE = fitTextSize("DOUGLAS RUAS", PANEL_TEXT.width, 52, 24, 0.56);

function candidateNameScaleX(text: string, width: number) {
  return Math.min(1, (width - 12) / (text.length * CANDIDATE_NAME_BASE_SIZE * 0.56));
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

function selectionName(
  selection: BallotSelection | undefined,
  candidate: ElectionCandidate | undefined,
  row: (typeof ART_ROWS)[number],
) {
  if (selection?.kind === "candidate") return candidate?.ballotName ?? "";
  if (selection?.kind === "blank") return "VOTO EM BRANCO";
  if (selection?.kind === "null") return "VOTO NULO";
  if (selection?.kind === "legend") return "VOTO DE LEGENDA";
  switch (row.slotId) {
    case "deputadoFederal": return "ESCOLHA SEU FEDERAL";
    case "senador1": return "ESCOLHA SEU 1º SENADOR";
    case "senador2": return "ESCOLHA SEU 2º SENADOR";
    case "governador": return "ESCOLHA SEU GOVERNADOR";
    case "presidente": return "ESCOLHA SEU PRESIDENTE";
    case "deputadoEstadual": return "EDSON ALBERTASSI";
  }
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
  if (!value || typeof value !== "object") return { deputadoEstadual: FIXED_EDSON_SELECTION };
  const source = value as Record<string, unknown>;
  const result: BallotSelections = {};

  for (const slot of BALLOT_SLOTS) {
    if (slot.id === "deputadoEstadual") continue;
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
  return { ...result, deputadoEstadual: FIXED_EDSON_SELECTION };
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
  nameFontClassName,
}: {
  selections: BallotSelections;
  candidatesById: Map<string, ElectionCandidate>;
  displayName: string;
  nameFontClassName: string;
}) {
  const title = displayName ? displayName.toLocaleUpperCase("pt-BR") : DEFAULT_POSTER_TITLE;
  const titleFontSize = `${fitTextSize(title, TITLE_BOX.width, 122, 60, 0.45) / 10.8}cqw`;

  return (
    <div
      className="colinha-poster print-poster relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl shadow-lg"
      style={{ background: "linear-gradient(41.6335deg, #003967 15.255%, #1256ce 84.745%)" }}
    >
      {/* The new artwork uses the Figma texture over a CSS gradient. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_TEXTURE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[80%] z-0 h-[260%] w-[260%] rotate-[-110deg] select-none object-cover opacity-25 mix-blend-overlay"
        draggable={false}
      />

      <div
        aria-hidden="true"
        className={`absolute z-10 flex items-center justify-center overflow-hidden whitespace-nowrap font-black italic uppercase leading-none text-brand-blue ${nameFontClassName}`}
        style={{ ...percentRect({ ...TITLE_BOX, x: TITLE_BOX.x + 7, y: TITLE_BOX.y + 8 }), fontSize: titleFontSize, letterSpacing: "-0.44cqw", fontVariationSettings: '"wdth" 62' }}
      >
        {title}
      </div>
      <div
        aria-hidden="true"
        className={`colinha-title-overlay absolute z-10 flex items-center justify-center overflow-hidden whitespace-nowrap font-black italic uppercase leading-none text-white ${nameFontClassName}`}
        style={{ ...percentRect(TITLE_BOX), fontSize: titleFontSize, letterSpacing: "-0.44cqw", fontVariationSettings: '"wdth" 62' }}
      >
        {title}
      </div>

      <p
        aria-hidden="true"
        className="colinha-legal absolute z-10 m-0 whitespace-nowrap font-condensed text-white"
        style={{ right: "2.7%", top: "31%", fontSize: "1.75cqw", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {CAMPAIGN_LEGAL_TEXT}
      </p>

      <p
        aria-hidden="true"
        className="colinha-footer absolute z-10 m-0 flex items-center justify-center overflow-hidden text-center font-montserrat font-normal uppercase leading-[1.02] tracking-[-0.07em] text-white"
        style={{ ...percentRect(FOOTER_BOX), fontSize: "1.95cqw" }}
      >
        <span>{FOOTER_LINES.map((line) => <span key={line} className="block">{line}</span>)}</span>
      </p>

      {ART_ROWS.map((row) => {
        const selection = selections[row.slotId];
        const candidate =
          selection?.kind === "candidate" ? candidatesById.get(selection.candidateId) : undefined;
        const candidateName = selectionName(selection, candidate, row);
        const nameFontSize = `${CANDIDATE_NAME_BASE_SIZE / 10.8}cqw`;
        const nameScaleX = candidateNameScaleX(candidateName, PANEL_TEXT.width);
        const panelY = row.photoY + 24;
        const digits = candidate
          ? candidate.ballotNumber.replace(/\D/g, "").slice(-row.digitCount).padStart(row.digitCount, "0")
          : "0".repeat(row.digitCount);

        return (
          <div key={row.slotId} aria-hidden="true">
            <div
              className={`absolute z-[1] rounded-lg ${candidate ? "bg-white" : "bg-brand-navy"}`}
              style={{ ...percentRect({ x: PANEL_BOX.x, y: panelY, width: PANEL_BOX.width, height: PANEL_BOX.height }), borderRadius: "1.5cqw" }}
            >
            </div>
            <div
              className={`absolute z-[1] overflow-hidden rounded-lg ${candidate ? "bg-white" : "bg-brand-navy"}`}
              style={{ ...percentRect({ x: PHOTO_BOX.x, y: row.photoY, width: PHOTO_BOX.width, height: PHOTO_BOX.height }), borderRadius: "1.5cqw" }}
            >
              {candidate ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.slotId === "deputadoEstadual" ? EDSON_POSTER_PHOTO : photoUrl(candidate)}
                  alt=""
                  className={row.slotId === "deputadoEstadual" ? "absolute inset-0 h-full w-full scale-[1.45] object-contain object-bottom" : "absolute inset-0 h-full w-full object-cover object-top"}
                  draggable={false}
                />
              ) : null}
            </div>
            <div
              className={`absolute z-10 flex items-center overflow-hidden whitespace-nowrap font-black italic uppercase leading-none text-brand-blue ${nameFontClassName}`}
              style={{ ...percentRect({ x: PANEL_TEXT.x, y: panelY + 14, width: PANEL_TEXT.width, height: 30 }), fontSize: "2.6cqw", fontVariationSettings: '"wdth" 62' }}
            >
              {row.role}
            </div>
            <div
              className={`colinha-candidate-name absolute z-10 flex items-center overflow-hidden whitespace-nowrap font-black italic uppercase leading-none ${candidate ? "text-brand-dark" : "text-brand-blue"} ${nameFontClassName}`}
              style={{ ...percentRect({ x: PANEL_TEXT.x, y: panelY + 47, width: PANEL_TEXT.width, height: 62 }), fontSize: nameFontSize, fontVariationSettings: '"wdth" 62' }}
            >
              <span className="inline-block" style={{ transform: `scaleX(${nameScaleX})`, transformOrigin: "left center" }}>
                {candidateName}
              </span>
            </div>
            <div
              className={`absolute z-10 flex items-center justify-end overflow-hidden whitespace-nowrap font-black leading-none ${candidate ? "text-brand-dark" : "text-brand-blue"}`}
              style={{ ...percentRect({ x: NUMBER_BOX.x, y: panelY + 12, width: NUMBER_BOX.width, height: 104 }), fontFamily: '"Arial Black", Arial, sans-serif', fontSize: row.digitCount === 5 ? "9.2cqw" : "10.1cqw" }}
            >
              {digits}
            </div>
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

function isMobileDevice() {
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
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
  zoom = 1,
  verticalAlignment: "top" | "center" = "top",
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  // Candidate photos use `object-position: top`; the background texture uses the default center.
  const sourceY = verticalAlignment === "top" ? 0 : (image.naturalHeight - sourceHeight) / 2;
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawContainImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  zoom = 1,
) {
  const containScale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * containScale;
  const drawHeight = image.naturalHeight * containScale;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const scaledWidth = drawWidth * zoom;
  const scaledHeight = drawHeight * zoom;
  const scaledX = centerX + ((width - drawWidth) / 2 - width / 2) * zoom;
  const scaledY = centerY + (height - drawHeight - height / 2) * zoom;
  context.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawWrappedFooter(context: CanvasRenderingContext2D, fontFamily: string) {
  context.save();
  context.fillStyle = "#ffffff";
  context.font = `400 21px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = "-1.47px";
  const lineHeight = 22;
  const firstLineY = FOOTER_BOX.y + FOOTER_BOX.height / 2 - ((FOOTER_LINES.length - 1) * lineHeight) / 2;
  FOOTER_LINES.forEach((text, index) => context.fillText(text, FOOTER_BOX.x + FOOTER_BOX.width / 2, firstLineY + index * lineHeight, FOOTER_BOX.width));
  context.restore();
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

  const background = context.createLinearGradient(0, POSTER_HEIGHT, POSTER_WIDTH, 0);
  background.addColorStop(0, "#003967");
  background.addColorStop(0.15, "#003967");
  background.addColorStop(0.85, "#1256ce");
  background.addColorStop(1, "#1256ce");
  context.fillStyle = background;
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);

  const texture = await loadCanvasImage(POSTER_TEXTURE);
  context.save();
  context.globalCompositeOperation = "overlay";
  context.globalAlpha = 0.25;
  context.translate(POSTER_WIDTH / 2, POSTER_HEIGHT / 2);
  context.rotate((-110 * Math.PI) / 180);
  drawCoverImage(
    context,
    texture,
    -POSTER_WIDTH * 1.3,
    -POSTER_HEIGHT * 1.3,
    POSTER_WIDTH * 2.6,
    POSTER_HEIGHT * 2.6,
    1,
    "center",
  );
  context.restore();

  await document.fonts.ready;

  const title = (displayName.trim() || DEFAULT_POSTER_TITLE).toLocaleUpperCase("pt-BR");
  const condensedFont = getComputedStyle(document.querySelector(".colinha-title-overlay")!).fontFamily;
  const montserratFont = getComputedStyle(document.querySelector(".colinha-footer")!).fontFamily;
  const titleFontPx = fitTextSize(title, TITLE_BOX.width, 122, 60, 0.45);
  context.save();
  context.font = `900 italic ${titleFontPx}px ${condensedFont}`;
  context.fontStretch = "extra-condensed";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = "-4.76px";
  context.fillStyle = "#1256ce";
  context.fillText(title, TITLE_BOX.x + TITLE_BOX.width / 2 + 7, TITLE_BOX.y + TITLE_BOX.height / 2 + 8, TITLE_BOX.width);
  context.fillStyle = "#ffffff";
  context.fillText(title, TITLE_BOX.x + TITLE_BOX.width / 2, TITLE_BOX.y + TITLE_BOX.height / 2, TITLE_BOX.width);
  context.restore();

  context.save();
  context.fillStyle = "#ffffff";
  context.font = `italic 19px ${condensedFont}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.translate(1038, 954);
  context.rotate(-Math.PI / 2);
  context.fillText(CAMPAIGN_LEGAL_TEXT, 0, 0, 630);
  context.restore();

  drawWrappedFooter(context, montserratFont);

  const candidatesToDraw = ART_ROWS.flatMap((row) => {
    const selection = selections[row.slotId];
    if (selection?.kind !== "candidate") return [];
    const candidate = candidatesById.get(selection.candidateId);
    return candidate ? [{ row, candidate }] : [];
  });
  const photos = await Promise.all(candidatesToDraw.map(({ row, candidate }) => loadCanvasImage(row.slotId === "deputadoEstadual" ? EDSON_POSTER_PHOTO : photoUrl(candidate))));

  for (const row of ART_ROWS) {
    const selection = selections[row.slotId];
    const candidate = selection?.kind === "candidate" ? candidatesById.get(selection.candidateId) : undefined;
    const candidateName = selectionName(selection, candidate, row).toLocaleUpperCase("pt-BR");
    const digits = candidate
      ? candidate.ballotNumber.replace(/\D/g, "").slice(-row.digitCount).padStart(row.digitCount, "0")
      : "0".repeat(row.digitCount);
    const panelY = row.photoY + 24;

    context.fillStyle = candidate ? "#ffffff" : "#003967";
    roundedRect(context, PANEL_BOX.x, panelY, PANEL_BOX.width, PANEL_BOX.height, 16);
    context.fill();

    const { x, width, height } = PHOTO_BOX;
    context.fillStyle = candidate ? "#ffffff" : "#003967";
    roundedRect(context, x, row.photoY, width, height, 12);
    context.fill();

    if (candidate) {
      const imageIndex = candidatesToDraw.findIndex(({ candidate: item }) => item.candidateId === candidate.candidateId);
      context.save();
      roundedRect(context, x, row.photoY, width, height, 12);
      context.clip();
      if (row.slotId === "deputadoEstadual") {
        drawContainImage(context, photos[imageIndex], x, row.photoY, width, height, 1.45);
      } else {
        drawCoverImage(context, photos[imageIndex], x, row.photoY, width, height);
      }
      context.restore();
    }

    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#1256ce";
    context.font = `900 italic 28px ${condensedFont}`;
    context.fontStretch = "extra-condensed";
    context.fillText(row.role, PANEL_TEXT.x, panelY + 17, PANEL_TEXT.width);

    context.fillStyle = candidate ? "#003967" : "#1256ce";
    context.font = `900 italic ${CANDIDATE_NAME_BASE_SIZE}px ${condensedFont}`;
    context.fontStretch = "extra-condensed";
    context.save();
    context.translate(PANEL_TEXT.x, panelY + 49);
    context.scale(candidateNameScaleX(candidateName, PANEL_TEXT.width), 1);
    context.fillText(candidateName, 0, 0);
    context.restore();

    context.fillStyle = candidate ? "#003967" : "#1256ce";
    const numberFontSize = row.digitCount === 5 ? 99 : 109;
    context.font = `900 ${numberFontSize}px "Arial Black", Arial, sans-serif`;
    context.textAlign = "right";
    context.textBaseline = "middle";
    if (context.measureText(digits).width > NUMBER_BOX.width) {
      context.font = `900 ${Math.floor(numberFontSize * NUMBER_BOX.width / context.measureText(digits).width)}px "Arial Black", Arial, sans-serif`;
    }
    context.fillText(digits, NUMBER_BOX.x + NUMBER_BOX.width, panelY + PANEL_BOX.height / 2, NUMBER_BOX.width);
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("A imagem não foi gerada."))), "image/png");
  });
}

export function ColinhaBuilder({
  candidates,
  nameFontClassName = "font-condensed",
}: {
  candidates: ElectionCandidate[];
  nameFontClassName?: string;
}) {
  const [selections, setSelections] = useState<BallotSelections>({
    deputadoEstadual: { kind: "candidate", candidateId: DEFAULT_EDSON_ID },
  });
  const [activeSlot, setActiveSlot] = useState<BallotSlotId | null>(null);
  const [query, setQuery] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const pickerTitleRef = useRef<HTMLHeadingElement>(null);
  const candidatesById = useMemo(
    () => new Map(candidates.map((candidate) => [candidate.candidateId, candidate])),
    [candidates],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const startFresh = url.searchParams.get("nova") === "1";
    if (startFresh) {
      url.searchParams.delete("nova");
      window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    }

    try {
      if (startFresh) {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(NAME_STORAGE_KEY);
        setSelections({ deputadoEstadual: FIXED_EDSON_SELECTION });
        setDisplayName("");
      } else {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setSelections(sanitizeSelections(JSON.parse(saved), candidates));
        setDisplayName(window.localStorage.getItem(NAME_STORAGE_KEY)?.slice(0, 20) ?? "");
      }
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

  const openPicker = (slotId: BallotSlotId) => {
    if (slotId === "deputadoEstadual") return;
    setNotice(null);
    setQuery("");
    setActiveSlot(slotId);
  };

  const choose = (selection: BallotSelection) => {
    if (!activeSlot || activeSlot === "deputadoEstadual") return;
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

  const clearCandidate = (slotId: BallotSlotId) => {
    if (slotId === "deputadoEstadual" || selections[slotId]?.kind !== "candidate") return;

    setSelections((current) => {
      if (current[slotId]?.kind !== "candidate") return current;
      const next = { ...current };
      delete next[slotId];
      return next;
    });
    setNotice("Candidato apagado da colinha.");
  };

  const reset = () => {
    setSelections({ deputadoEstadual: FIXED_EDSON_SELECTION });
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
      const blob = await createPosterPng(selections, candidatesById, displayNameForPoster);

      if (isMobileDevice()) {
        const file = new File([blob], POSTER_FILENAME, { type: "image/png" });

        if (typeof navigator.share === "function" && canShareFile(file)) {
          try {
            await navigator.share({
              title: "Salvar minha colinha eleitoral",
              text: "Para guardar na galeria, escolha Salvar imagem ou Fotos no menu do aparelho.",
              files: [file],
            });
            setNotice("Colinha pronta. No menu do aparelho, escolha Salvar imagem ou Fotos para guardá-la na galeria.");
            return;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              setNotice("Salvamento cancelado. Nenhuma imagem foi salva.");
              return;
            }
            // If the native save/share sheet is unavailable, keep the browser download as fallback.
          }
        }

        downloadPosterBlob(blob);
        setNotice("Colinha baixada. Abra Downloads ou Arquivos e use a opção de salvar a imagem na galeria.");
        return;
      }

      downloadPosterBlob(blob);
      setNotice("Colinha baixada em PNG.");
    } catch (error) {
      setNotice(error instanceof Error ? `${error.message} Tente baixar novamente.` : "Falha ao gerar a imagem. Tente baixar novamente.");
    } finally {
      setGenerating(false);
    }
  };

  const shareColinha = async () => {
    setGenerating(true);
    setNotice(null);
    try {
      const blob = await createPosterPng(selections, candidatesById, displayNameForPoster);
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
      <div className="mb-5">
        <div>
          <h1 className="font-archivo text-3xl font-black uppercase leading-none text-brand-navy sm:text-4xl">
            Monte sua colinha
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Escolha seus candidatos e confira a arte pronta ao lado.
          </p>
        </div>
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
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle id="candidate-list-heading" className="font-archivo text-2xl uppercase">Escolha seus candidatos</CardTitle>
                  <CardDescription>Selecione um cargo para buscar ou trocar o candidato.</CardDescription>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={reset} className="shrink-0">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> Nova colinha
                </Button>
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
                    {slot.id !== "deputadoEstadual" ? (
                      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                        {selection?.kind === "candidate" ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => clearCandidate(slot.id)}
                            aria-label={`Apagar candidato de ${slot.label}`}
                            className="border-red-200 px-2 text-red-700 hover:bg-red-50 hover:text-red-800 sm:px-3"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                            Apagar
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          variant={candidate || selection ? "outline" : "default"}
                          size="sm"
                          onClick={() => openPicker(slot.id)}
                          className="shrink-0 px-2 sm:px-3"
                        >
                          {candidate || selection ? "Trocar" : "Escolher"}
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </CardContent>
            <div className="space-y-2 border-t border-slate-200 bg-brand-light/70 px-4 py-4 sm:px-5">
              <Label htmlFor="colinha-display-name">Personalize o título (opcional)</Label>
              <Input
                id="colinha-display-name"
                value={displayName}
                onChange={(event) => changeDisplayName(event.target.value)}
                placeholder={DEFAULT_POSTER_TITLE}
                maxLength={20}
                autoComplete="off"
                aria-describedby="colinha-name-help"
                className="text-base sm:text-sm"
              />
              <p id="colinha-name-help" className="text-xs text-slate-500">
                Deixe em branco para usar MEUS CANDIDATOS. Se personalizar, o texto fica salvo somente neste aparelho.
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
                </div>
                <div className="no-print flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button type="button" variant="outline" size="sm" onClick={download} disabled={generating} aria-label="Baixar colinha como imagem PNG">
                    <Download className="h-4 w-4" aria-hidden="true" /> {generating ? "Gerando" : "Baixar"}
                  </Button>
                  <Button type="button" variant="default" size="sm" onClick={shareColinha} disabled={generating} aria-label="Passar colinha">
                    <Send className="h-4 w-4" aria-hidden="true" /> {generating ? "Preparando" : "Passar Cola"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="print-sheet rounded-xl border border-brand-blue/15 bg-brand-light p-2 sm:p-3">
                <div className="colinha-print-root">
                  <PosterPreview
                    selections={selections}
                    candidatesById={candidatesById}
                    displayName={displayNameForPoster}
                    nameFontClassName={nameFontClassName}
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
          <DialogContent
            className="grid h-[min(90dvh,760px)] max-w-5xl grid-rows-[auto_minmax(0,1fr)] gap-0 p-0 lg:grid-rows-1 lg:grid-cols-[minmax(250px,0.8fr)_minmax(390px,1.2fr)]"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              pickerTitleRef.current?.focus({ preventScroll: true });
            }}
          >
            <section className="flex min-h-0 flex-col border-b border-slate-200 px-5 py-5 pr-14 sm:px-6 lg:border-b-0 lg:border-r">
              <DialogHeader>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-blue">
                  {activeDefinition.scope === "BR" ? "Candidatos à Presidência · Brasil" : "Candidatos do Rio de Janeiro"}
                </p>
                <DialogTitle ref={pickerTitleRef} tabIndex={-1} className="mt-1 font-archivo uppercase">{activeDefinition.label}</DialogTitle>
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
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Busque por nome, número ou partido"
                    className="pl-10 text-base sm:text-sm"
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
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
