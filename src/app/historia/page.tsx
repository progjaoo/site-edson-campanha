import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Radio, Award, Compass, ArrowLeft, Camera, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Biografia & História | Edson Albertassi",
  description:
    "Conheça a história, trajetória de fé, família e trabalho de Edson Albertassi. Fundador da Rádio 88 FM, 6 mandatos na ALERJ e compromisso com o Rio de Janeiro.",
  openGraph: {
    title: "Biografia & História | Edson Albertassi",
    description:
      "A história ainda não está pronta. Tem que ter fé, tem que acreditar! Conheça a trajetória de Edson Albertassi.",
    images: ["/images/optimized/pagina-historia.png"],
  },
};

export default function HistoriaPage() {
  const milestones = [
    {
      year: "1994",
      icon: Radio,
      title: "Fundação da Rádio 88 FM",
      desc: "Com fé e pioneirismo, fundou uma emissora evangélica que hoje é líder absoluta de audiência no Sul Fluminense.",
    },
    {
      year: "1996",
      icon: Users,
      title: "Vereador Mais Votado",
      desc: "Eleito o vereador mais votado de Volta Redonda após percorrer cada rua e bairro dialogando com o povo.",
    },
    {
      year: "1998 - 2014",
      icon: Award,
      title: "6 Mandatos na ALERJ",
      desc: "Presidiu a Comissão de Orçamento e Finanças por 8 anos, foi vice-presidente da Casa e líder da bancada cristã.",
    },
    {
      year: "2026",
      icon: Compass,
      title: "O Retorno com Experiência e Fé",
      desc: "Retorna com a bagagem de quem conhece a gestão pública e a mesma fé inabalável para reconstruir o estado.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-brand-dark overflow-hidden">
      
      {/* Top Banner Hero — Cor sólida #003967 combinando perfeitamente com o Header */}
      <section className="relative bg-[#003967] text-white pt-28 pb-16 sm:py-24 overflow-hidden border-b-4 border-[#FBE502]">
        
        {/* Textura sutil */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none">
          <Image
            src="/images/fundo-hero-section.svg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#FBE502] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao início</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE502]/20 border border-[#FBE502]/40 text-[#FBE502] font-black text-xs uppercase tracking-widest">
                <span>Biografia Oficial</span>
              </div>
              <h1 className="font-condensed font-black italic text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-tight">
                Uma História Forjada Pela Fé e Pelo Trabalho
              </h1>
              <p className="font-archivo text-base sm:text-xl text-white/90 leading-relaxed font-medium">
                De mascate a líder parlamentar: conheça a trajetória que moldou os valores e o compromisso de Edson Albertassi com o povo fluminense.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-72 sm:w-80 md:w-96 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FBE502] bg-[#003967]">
                <Image
                  src="/images/optimized/pagina-historia.png"
                  alt="Edson Albertassi - Biografia"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Biográfico Principal */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Parágrafo 1: Família, Fé e Rádio 88 FM */}
        <div className="space-y-6 text-lg sm:text-xl text-gray-800 font-normal leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-black first-letter:text-[#1256CE] first-letter:font-condensed first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            Edson Albertassi é casado com Alice há 34 anos, pai de três filhos e avô de três netos. É membro da Assembleia de Deus Jardim das Américas, em Volta Redonda, e sua fé nunca ficou restrita ao ambiente da igreja. O Evangelho moldou sua forma de viver, de trabalhar, de decidir e de enxergar as pessoas.
          </p>

          <p>
            Foi com essa convicção que, em 1994, fundou a <strong className="text-[#003967] font-bold">Rádio 88 FM</strong>, no período em que poucos apostariam, e a transformou em uma emissora evangélica. Mais de trinta anos depois, a rádio, hoje administrada pela família, continua no ar, líder de audiência no Sul Fluminense, alcançando milhares de pessoas e mantendo viva uma história que nasceu pela fé. Antes dos microfones, Edson foi mascate e conheceu Volta Redonda de perto, bairro a bairro, rua a rua, porta a porta.
          </p>

          {/* Destaque / Citação */}
          <div className="my-10 p-8 rounded-3xl bg-gray-50 border-l-8 border-[#1256CE] shadow-sm">
            <p className="font-condensed font-bold text-2xl sm:text-3xl text-[#003967] uppercase italic">
              “Antes dos microfones e da tribuna, conheci cada canto da minha terra de perto, conversando com o povo e aprendendo suas reais necessidades.”
            </p>
          </div>

          {/* Parágrafo 2: Trajetória Parlamentar e Bancada Cristã */}
          <p>
            Na política, foi o vereador mais votado de Volta Redonda em 1996 e chegou à ALERJ em 1998, onde exerceu <strong className="text-[#003967] font-bold">seis mandatos</strong>, foi vice-presidente da Casa e presidiu por oito anos a Comissão de Orçamento e Finanças. Mas uma das marcas mais importantes dessa trajetória foi a atuação junto à bancada evangélica, da qual se tornou uma das principais referências no estado do Rio de Janeiro.
          </p>

          <p>
            Ao longo dos anos, sua voz passou a representar não apenas uma posição política, mas também valores e convicções: um reflexo daquilo que sempre fez parte da sua própria história. Após doze anos longe da vida parlamentar, Edson Albertassi deseja retornar com a experiência de quem conhece esse caminho e com a mesma fé que esteve presente desde o começo.
          </p>

          {/* Chamada Final de Impacto */}
          <div className="pt-8 text-center sm:text-left">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#003967] text-white shadow-xl space-y-4 border-2 border-[#FBE502]">
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-[#FBE502] uppercase">
                A história ainda não está pronta.
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-white">
                Tem que ter fé, tem que acreditar!
              </p>

              <div className="pt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
                <Link
                  href="/faca-sua-foto"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FBE502] text-black font-archivo font-black text-sm uppercase tracking-wider shadow-lg hover:bg-white hover:text-[#003967] transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Apoie com sua foto</span>
                </Link>
                <Link
                  href="/#noticias"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-archivo font-bold text-sm uppercase tracking-wider border border-white/20 transition-all"
                >
                  <span>Ver Propostas</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Linha do Tempo / Destaques */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-[#003967] uppercase">
              Marcos da Caminhada
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.year}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 bg-[#1256CE] text-white rounded-full">
                      {item.year}
                    </span>
                    <Icon className="w-5 h-5 text-[#1256CE]" />
                  </div>
                  <h3 className="font-archivo font-bold text-lg text-[#003967]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </main>
  );
}
