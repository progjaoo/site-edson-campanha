"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Move,
  Check,
} from "lucide-react";
import { PhotoFormat } from "@/types";
import { FormatSelector } from "./FormatSelector";
import { cn } from "@/lib/utils";

const FRAMES = [
  {
    id: "eu-apoio",
    name: "#EuApoio Albertassi",
    src: "/images/molduras/moldura-euapoio.png",
  },
  {
    id: "padrao",
    name: "Albertassi 15088",
    src: "/images/molduras/moldura-padrao.png",
  },
];

const FORMAT_SPECS: Record<
  PhotoFormat,
  { width: number; height: number; aspect: string }
> = {
  avatar: { width: 1080, height: 1080, aspect: "aspect-square" },
  feed: { width: 1080, height: 1440, aspect: "aspect-[3/4]" },
  story: { width: 1080, height: 1920, aspect: "aspect-[9/16]" },
};

export function PhotoStudio() {
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<PhotoFormat>("avatar");
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0].id);

  // Transform states (pan, zoom, rotation)
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Canvas refs
  const editCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Loaded image objects
  const userImgObj = useRef<HTMLImageElement | null>(null);
  const frameImgObjs = useRef<Record<string, HTMLImageElement>>({});

  // Preload frame images
  useEffect(() => {
    FRAMES.forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
      img.onload = () => {
        frameImgObjs.current[frame.id] = img;
        drawCanvases();
      };
    });
  }, []);

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        userImgObj.current = img;
        setUserImageSrc(src);
        // Reset transform
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setRotation(0);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Draw main editing canvas
  const drawCanvases = useCallback(() => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spec = FORMAT_SPECS[selectedFormat];
    canvas.width = spec.width;
    canvas.height = spec.height;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background fill (Navy Blue)
    ctx.fillStyle = "#003967";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw user photo
    if (userImgObj.current) {
      const img = userImgObj.current;
      ctx.save();

      // For avatar/circular layout, we draw the photo
      ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Fit image cover style
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH;

      if (imgRatio > canvasRatio) {
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
      } else {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    }

    // 2. Draw selected Frame Overlay
    const activeFrameImg = frameImgObjs.current[selectedFrame];
    if (activeFrameImg) {
      ctx.save();
      if (selectedFormat === "avatar") {
        ctx.drawImage(activeFrameImg, 0, 0, canvas.width, canvas.height);
      } else if (selectedFormat === "feed") {
        // Draw centered frame with badge at bottom
        const frameSize = canvas.width;
        const offsetY = (canvas.height - frameSize) / 2;
        ctx.drawImage(activeFrameImg, 0, offsetY, frameSize, frameSize);
      } else if (selectedFormat === "story") {
        // Story vertical layout: frame in upper/center area
        const frameSize = canvas.width * 1.05;
        const offsetX = (canvas.width - frameSize) / 2;
        const offsetY = canvas.height * 0.18;
        ctx.drawImage(activeFrameImg, offsetX, offsetY, frameSize, frameSize);
      }
      ctx.restore();
    }
  }, [selectedFormat, selectedFrame, zoom, position, rotation]);

  useEffect(() => {
    drawCanvases();
  }, [drawCanvases, userImageSrc]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile drag & pinch
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y,
    });
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Wheel to zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom((prev) => Math.min(3, Math.max(0.3, prev + delta)));
  };

  // Download High-Res PNG
  const handleDownload = () => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;

    // Trigger confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FBE502", "#1256CE", "#93FD04", "#FFFFFF"],
    });

    const link = document.createElement("a");
    link.download = `edson-albertassi-${selectedFormat}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Share via Web Share API
  const handleShare = async () => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "edson-albertassi-apoio.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Eu Apoio Edson Albertassi 15088",
            text: "Criei minha foto de apoio ao Edson Albertassi! Faça a sua também!",
            files: [file],
          });
        } else {
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="space-y-10">
      {/* Seletor de Formato */}
      <div className="text-center space-y-4">
        <FormatSelector
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
        />
      </div>

      {/* Caso nenhuma foto tenha sido escolhida ainda */}
      {!userImageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-3 border-dashed border-white/30 hover:border-brand-yellow rounded-3xl p-12 sm:p-20 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer group max-w-2xl mx-auto shadow-2xl"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-20 h-20 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
            Escolha sua Foto
          </h3>
          <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto mb-6">
            Arraste sua foto para cá ou clique para selecionar do celular ou computador.
          </p>
          <button
            type="button"
            className="px-8 py-3.5 rounded-full bg-brand-yellow text-brand-dark font-extrabold text-sm uppercase tracking-wider shadow-lg hover:bg-white transition-colors"
          >
            Selecionar Imagem
          </button>
        </div>
      ) : (
        /* Estúdio Interativo com Foto Carregada */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Lado Esquerdo: Canvas Interativo de Edição */}
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-brand-yellow tracking-wider flex items-center gap-1.5">
                <Move className="w-4 h-4" />
                Arraste e ajuste o enquadramento
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-white/80 hover:text-brand-yellow flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Trocar Foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* O Canvas Principal */}
            <div className="relative flex justify-center items-center bg-brand-dark/60 rounded-2xl overflow-hidden p-2 border border-white/10">
              <canvas
                ref={editCanvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                className={cn(
                  "max-w-full max-h-[460px] object-contain rounded-xl cursor-grab active:cursor-grabbing shadow-2xl transition-transform",
                  FORMAT_SPECS[selectedFormat].aspect
                )}
              />
            </div>

            {/* Controles de Zoom & Rotação */}
            <div className="space-y-4 pt-2">
              {/* Zoom Slider */}
              <div className="flex items-center gap-4 text-white text-xs font-semibold">
                <ZoomOut className="w-4 h-4 text-white/60" />
                <input
                  type="range"
                  min="0.3"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-brand-yellow h-2 bg-white/20 rounded-lg cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-white/60" />
                <span className="w-12 text-right">{Math.round(zoom * 100)}%</span>
              </div>

              {/* Botões de Ação do Canvas */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Girar 90°
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                    setRotation(0);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold transition-colors"
                >
                  Centralizar
                </button>
              </div>
            </div>
          </div>

          {/* Lado Direito: Escolha de Moldura e Download */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Escolha da Moldura */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-condensed font-black text-xl text-white uppercase tracking-tight">
                Escolha a Moldura
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {FRAMES.map((frame) => {
                  const isCurrent = selectedFrame === frame.id;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => setSelectedFrame(frame.id)}
                      className={cn(
                        "relative p-3 rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden",
                        isCurrent
                          ? "border-brand-yellow bg-brand-yellow/15 shadow-md scale-102"
                          : "border-white/15 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="aspect-square relative rounded-lg overflow-hidden mb-2 bg-brand-navy">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={frame.src}
                          alt={frame.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {frame.name}
                        </span>
                        {isCurrent && <Check className="w-4 h-4 text-brand-yellow" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card de Download e Compartilhamento */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-condensed font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-yellow" />
                Baixar sua Arte
              </h3>
              <p className="text-xs text-white/70">
                Sua arte será gerada em alta definição (1080px) pronta para compartilhar nas suas redes sociais.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-yellow text-brand-dark font-extrabold text-sm uppercase tracking-wider shadow-xl btn-yellow-glow hover:scale-102 active:scale-98 flex items-center justify-center gap-3 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar Foto (PNG HD)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar Direto</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
