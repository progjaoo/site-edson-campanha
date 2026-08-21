import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Biografia & História | Edson Albertassi",
  description:
    "Conheça a história, trajetória de fé, família e trabalho de Edson Albertassi. Fundador da Rádio 88 FM, 6 mandatos na ALERJ e compromisso com o Rio de Janeiro.",
  openGraph: {
    title: "Biografia & História | Edson Albertassi",
    description:
      "Conheça a trajetória de fé, família e trabalho de Edson Albertassi.",
    images: ["/images/historia/familia.png"],
  },
};

export default function HistoriaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#051A33]">
      {/* Hero visual da história: família, degradê oficial e número da campanha */}
      <section className="relative overflow-visible bg-[#003967] pt-20 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/fundodegrade.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-30 mx-auto max-w-[1200px] px-0 sm:px-6 lg:px-8">
          <div className="relative flex h-[315px] items-end justify-center sm:h-[450px] lg:h-[570px]">
            <Image
              src="/images/historia/familia.png"
              alt="Edson Albertassi com sua família"
              width={1089}
              height={573}
              priority
              className="absolute bottom-0 left-1/2 h-auto w-[125%] max-w-none -translate-x-1/2 object-contain object-bottom sm:w-[125%] lg:w-full"
              sizes="(max-width: 640px) 125vw, (max-width: 1024px) 125vw, 1089px"
            />

            <Image
              src="/images/historia/numerocamp.png"
              alt="Edson Albertassi 15088"
              width={580}
              height={103}
              priority
              className="absolute bottom-[-34px] left-1/2 z-40 h-auto w-[78%] max-w-[580px] -translate-x-1/2 sm:bottom-[-42px] sm:w-[58%] lg:bottom-[-47px] lg:w-[48%]"
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, 580px"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex h-3 pointer-events-none">
          <div className="w-1/4 bg-[#93FD04]" />
          <div className="w-1/2 bg-[#FBE502]" />
          <div className="w-1/4 bg-[#1688F5]" />
        </div>
      </section>

      {/* Texto biográfico aprovado pelo projeto */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">
        <header className="text-center">
          <h1 className="font-archivo text-4xl font-black italic uppercase leading-[0.92] tracking-tight text-[#003967] sm:text-6xl lg:text-7xl">
            Uma história forjada
            <br />
            pela fé e pelo trabalho
          </h1>
          <p className="mx-auto mt-8 max-w-4xl font-archivo text-lg font-medium italic uppercase leading-tight text-[#1256CE] sm:text-2xl lg:text-3xl">
            De mascate a líder parlamentar: conheça a trajetória que moldou os valores e o compromisso de Edson Albertassi com o povo fluminense.
          </p>
        </header>

        <div className="mt-14 space-y-9 font-archivo text-lg leading-relaxed text-[#222] sm:mt-16 sm:text-xl lg:text-2xl">
          <p>
            Edson Albertassi é casado com Alice há 34 anos, pai de três filhos e avô de três netos. É membro da Assembleia de Deus Jardim das Américas, em Volta Redonda, e sua fé nunca ficou restrita ao ambiente da igreja. O Evangelho moldou sua forma de viver, de trabalhar, de decidir e de enxergar as pessoas.
          </p>

          <p>
            Foi com essa convicção que, em 1994, fundou a <strong className="font-bold text-[#003967]">Rádio 88 FM</strong>, no período em que poucos apostariam, e a transformou em uma emissora evangélica. Mais de trinta anos depois, a rádio, hoje administrada pela família, continua no ar, líder de audiência no Sul Fluminense, alcançando milhares de pessoas e mantendo viva uma história que nasceu pela fé. Antes dos microfones, Edson foi mascate e conheceu Volta Redonda de perto, bairro a bairro, rua a rua, porta a porta.
          </p>

          <Image
            src="/images/historia/textomeioazul.png"
            alt="Antes dos microfones e da tribuna, conheci cada canto da minha terra de perto, conversando com o povo e aprendendo suas reais necessidades."
            width={1083}
            height={335}
            className="my-14 h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 960px"
          />

          <p>
            Na política, foi o vereador mais votado de Volta Redonda em 1996 e chegou à ALERJ em 1998, onde exerceu <strong className="font-bold text-[#003967]">seis mandatos</strong>, foi vice-presidente da Casa e presidiu por oito anos a Comissão de Orçamento e Finanças. Mas uma das marcas mais importantes dessa trajetória foi a atuação junto à bancada evangélica, da qual se tornou uma das principais referências no estado do Rio de Janeiro.
          </p>

          <p>
            Ao longo dos anos, sua voz passou a representar não apenas uma posição política, mas também valores e convicções: um reflexo daquilo que sempre fez parte da sua própria história. Após doze anos longe da vida parlamentar, Edson Albertassi deseja retornar com a experiência de quem conhece esse caminho e com a mesma fé que esteve presente desde o começo.
          </p>
        </div>
      </section>
    </main>
  );
}
