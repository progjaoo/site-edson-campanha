import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JingleActions } from "@/components/sections/JingleActions";

const youtubeEmbedUrl = "https://www.youtube.com/embed/q2NE8C12oas?rel=0";

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
          <iframe
            src={youtubeEmbedUrl}
            title="Jingle oficial da campanha Edson Albertassi: Tem que ter fé!"
            loading="lazy"
            className="absolute inset-0 h-full min-h-[260px] w-full border-0 sm:min-h-[360px] lg:min-h-[410px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
