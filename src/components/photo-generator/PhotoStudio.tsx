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

export const FORMAT_CONFIGS: Record<
  PhotoFormat,
  {
    name: string;
    width: number;
    height: number;
    aspect: string;
    frameSrc: string;
    description: string;
    fileNamePrefix: string;
  }
> = {
  avatar: {
    name: "Avatar / Perfil",
    width: 1080,
    height: 1080,
    aspect: "aspect-square",
    frameSrc: "/images/molduras/Avatar.png",
    description: "1080 × 1080 px (Quadrado para WhatsApp e Perfil)",
    fileNamePrefix: "avatar",
  },
  feed: {
    name: "Postagem / Feed",
    width: 1080,
    height: 1350,
    aspect: "aspect-[4/5]",
    frameSrc: "/images/molduras/Postagem.png",
    description: "1080 × 1350 px (Retrato 4:5 para Feed do Instagram)",
    fileNamePrefix: "postagem-feed",
  },
  story: {
    name: "Stories / Status",
    width: 1080,
    height: 1920,
    aspect: "aspect-[9/16]",
    frameSrc: "/images/molduras/Stories.png",
    description: "1080 × 1920 px (Vertical 9:16 para Stories e WhatsApp)",
    fileNamePrefix: "stories-status",
  },
  round: {
    name: "Moldura Redonda",
    width: 1080,
    height: 1080,
    aspect: "aspect-square",
    frameSrc: "/images/molduras/molduraredonda.png",
    description: "1080 × 1080 px (Moldura redonda para perfil e WhatsApp)",
    fileNamePrefix: "moldura-redonda",
  },
};

export function PhotoStudio() {
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<PhotoFormat>("avatar");
  const [frameVersion, setFrameVersion] = useState(0);

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
  const frameImgObjs = useRef<Record<PhotoFormat, HTMLImageElement | null>>({
    avatar: null,
    feed: null,
    story: null,
    round: null,
  });

  // Preload todas as molduras para trocar de formato sem atraso
  useEffect(() => {
    (Object.keys(FORMAT_CONFIGS) as PhotoFormat[]).forEach((fmt) => {
      const img = new Image();
      img.src = FORMAT_CONFIGS[fmt].frameSrc;
      img.onload = () => {
        frameImgObjs.current[fmt] = img;
        setFrameVersion((version) => version + 1);
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

    const config = FORMAT_CONFIGS[selectedFormat];
    canvas.width = config.width;
    canvas.height = config.height;

    // 1. Fundo Padrão Azul da Campanha (#003967) para fotos sem fundo / transparentes
    ctx.fillStyle = "#003967";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Desenhar a foto enviada pelo usuário
    if (userImgObj.current) {
      const img = userImgObj.current;
      ctx.save();

      // Translação central + pan do usuário
      ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Enquadramento estilo 'cover' preenchendo o canvas
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

    // 3. Desenhar a Moldura Oficial fixada na BASE inferior do Canvas
    const activeFrameImg = frameImgObjs.current[selectedFormat];
    if (activeFrameImg) {
      ctx.save();
      const frameAspect = activeFrameImg.width / activeFrameImg.height;
      const frameDrawWidth = canvas.width;
      const frameDrawHeight = canvas.width / frameAspect;
      const frameOffsetY = canvas.height - frameDrawHeight;

      ctx.drawImage(
        activeFrameImg,
        0,
        frameOffsetY,
        frameDrawWidth,
        frameDrawHeight
      );
      ctx.restore();
    }
  }, [selectedFormat, zoom, position, rotation]);

  useEffect(() => {
    drawCanvases();
  }, [drawCanvases, frameVersion, userImageSrc]);

  // Drag handlers (Mouse)
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

    // Confetes de comemoração!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FBE502", "#1256CE", "#93FD04", "#FFFFFF"],
    });

    const prefix = FORMAT_CONFIGS[selectedFormat].fileNamePrefix;
    const link = document.createElement("a");
    link.download = `edson-albertassi-15088-${prefix}.png`;
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
        const prefix = FORMAT_CONFIGS[selectedFormat].fileNamePrefix;
        const file = new File([blob], `edson-albertassi-${prefix}.png`, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Eu Apoio Edson Albertassi 15088",
            text: "Criei minha foto oficial de apoio ao Edson Albertassi! Faça a sua também!",
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
          className="border-3 border-dashed border-white/30 hover:border-[#FBE502] rounded-3xl p-12 sm:p-20 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer group max-w-2xl mx-auto shadow-2xl"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-20 h-20 rounded-full bg-[#FBE502] text-black flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
            Escolha sua Foto
          </h3>
          <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
            Arraste sua foto para cá ou clique para selecionar do celular ou computador.
          </p>
          <button
            type="button"
            className="px-8 py-3.5 rounded-full bg-[#FBE502] text-black font-archivo font-black text-sm uppercase tracking-wider shadow-lg hover:bg-white transition-colors"
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
              <span className="text-xs uppercase font-bold text-[#FBE502] tracking-wider flex items-center gap-1.5">
                <Move className="w-4 h-4" />
                Arraste e ajuste sua foto
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-white/80 hover:text-[#FBE502] flex items-center gap-1.5 transition-colors"
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

            {/* O Canvas Principal com a Moldura Oficial Fixada na Base */}
            <div className="relative flex justify-center items-center bg-[#003967] rounded-2xl overflow-hidden p-2 border border-white/10 shadow-inner">
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
                  "max-h-[480px] max-w-full touch-none rounded-xl object-contain cursor-grab shadow-2xl transition-all active:cursor-grabbing",
                  FORMAT_CONFIGS[selectedFormat].aspect
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
                  className="w-full accent-[#FBE502] h-2 bg-white/20 rounded-lg cursor-pointer"
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

          {/* Lado Direito: Escolha do Formato e Download */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Escolha do Formato com Moldura em tempo real */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-condensed font-black text-xl text-white uppercase tracking-tight">
                Formatos Disponíveis
              </h3>

              <div className="space-y-3">
                {(Object.keys(FORMAT_CONFIGS) as PhotoFormat[]).map((fmt) => {
                  const config = FORMAT_CONFIGS[fmt];
                  const isCurrent = selectedFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-2xl border-2 text-left transition-all duration-200",
                        isCurrent
                          ? "border-[#FBE502] bg-[#FBE502]/15 shadow-md scale-102"
                          : "border-white/15 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-[#003967] shrink-0 border border-white/20 flex items-end">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={config.frameSrc}
                          alt={config.name}
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">
                            {config.name}
                          </span>
                          {isCurrent && <Check className="w-4 h-4 text-[#FBE502]" />}
                        </div>
                        <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                          {config.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card de Download e Compartilhamento */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-condensed font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FBE502]" />
                Baixar sua Arte
              </h3>
              <p className="text-xs text-white/70">
                Formato selecionado: <strong className="text-[#FBE502]">{FORMAT_CONFIGS[selectedFormat].name} ({FORMAT_CONFIGS[selectedFormat].width}×{FORMAT_CONFIGS[selectedFormat].height}px)</strong>
              </p>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 rounded-2xl bg-[#FBE502] text-black font-archivo font-black text-sm uppercase tracking-wider shadow-xl hover:bg-white hover:text-[#003967] hover:scale-102 active:scale-98 flex items-center justify-center gap-3 transition-all"
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
