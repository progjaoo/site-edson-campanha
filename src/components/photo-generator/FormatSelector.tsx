"use client";

import { PhotoFormat } from "@/types";
import { User, Smartphone, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
  selectedFormat: PhotoFormat;
  onSelectFormat: (format: PhotoFormat) => void;
}

export function FormatSelector({ selectedFormat, onSelectFormat }: FormatSelectorProps) {
  const formats: { id: PhotoFormat; label: string; icon: React.ElementType; desc: string }[] = [
    {
      id: "avatar",
      label: "Avatar / Perfil",
      icon: User,
      desc: "1080 × 1080 px",
    },
    {
      id: "feed",
      label: "Postagem / Feed",
      icon: LayoutGrid,
      desc: "1080 × 1350 px",
    },
    {
      id: "story",
      label: "Stories / Status",
      icon: Smartphone,
      desc: "1080 × 1920 px",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {formats.map((fmt) => {
        const Icon = fmt.icon;
        const isSelected = selectedFormat === fmt.id;

        return (
          <button
            key={fmt.id}
            type="button"
            onClick={() => onSelectFormat(fmt.id)}
            className={cn(
              "flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-archivo font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md",
              isSelected
                ? "bg-[#FBE502] text-black shadow-xl scale-105 ring-2 ring-[#FBE502] ring-offset-2 ring-offset-[#003967]"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
            )}
          >
            <Icon className={cn("w-4 h-4", isSelected ? "text-black" : "text-[#FBE502]")} />
            <div className="text-left">
              <div>{fmt.label}</div>
              <div className={cn("text-[10px] font-normal", isSelected ? "text-black/70" : "text-white/60")}>
                {fmt.desc}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
