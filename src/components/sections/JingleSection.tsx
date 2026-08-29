import { Music2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JingleActions } from "@/components/sections/JingleActions";

export function JingleSection() {
  return (
    <AnimatedSection id="jingle" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="w-[17px] h-[84px] sm:h-[96px] bg-[#93FD04] rounded-sm block shrink-0 mt-1" />
            <h2 className="max-w-xs font-archivo text-5xl font-black italic leading-[0.9] tracking-tight text-[#1256CE] sm:text-6xl">
              Tem que
              <br />
              ter fé!
            </h2>
          </div>
          <p className="mt-5 max-w-xs font-archivo text-base font-bold leading-tight text-[#051A33] sm:text-lg">
            Esse é o som da nossa história e da nossa campanha!
          </p>

          <JingleActions />
        </div>

        <div
          id="jingle-player"
          className="relative min-h-[260px] overflow-hidden rounded-3xl bg-[#1256CE] shadow-xl sm:min-h-[360px] lg:col-span-8 lg:min-h-[410px]"
          aria-label="Área do player do jingle"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1256CE] via-[#1256CE] to-[#003967]/80" />
          <div className="relative flex h-full min-h-[260px] items-center justify-center sm:min-h-[360px] lg:min-h-[410px]">
            <div className="flex flex-col items-center gap-4 text-center text-white/90">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <Music2 className="h-8 w-8 text-[#FBE502]" aria-hidden="true" />
              </span>
              <p className="font-archivo text-sm font-bold uppercase tracking-widest text-white/80">
                Jingle oficial em breve
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
