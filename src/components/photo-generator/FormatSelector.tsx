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
      desc: "1080 × 1080 px (Quadrado)",
    },
    {
      id: "feed",
      label: "Feed Instagram",
      icon: LayoutGrid,
      desc: "1080 × 1440 px (Retrato)",
    },
    {
      id: "story",
      label: "Story / Status",
      icon: Smartphone,
      desc: "1080 × 1920 px (Vertical)",
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
              "flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm",
              isSelected
                ? "bg-brand-yellow text-brand-dark shadow-md scale-105 ring-2 ring-brand-yellow ring-offset-2"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
            )}
          >
            <Icon className="w-4 h-4" />
            <div className="text-left">
              <div>{fmt.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
