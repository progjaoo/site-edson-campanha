export interface ExternalNewsItem {
  id: string;
  source: "Informa Cidade" | "Agenda do Poder";
  publishedAt: string;
  title: string;
  excerpt: string;
  url: string;
  image: {
    src: string;
    alt: string;
  };
}

export const EXTERNAL_NEWS = [
  {
    id: "informa-cidade-inocentado",
    source: "Informa Cidade",
    publishedAt: "2026-03-27T11:56:00-03:00",
    title: "Edson Albertassi é inocentado pela Justiça",
    excerpt:
      "O Órgão Especial do TJ-RJ arquivou por unanimidade a ação da Operação Cadeia Velha após reconhecer nulidade das provas e ausência de justa causa.",
    url: "https://www.informacidade.com.br/edson-albertassi-e-inocentado-pela-justica/",
    image: {
      src: "/images/noticias/informa-cidade-edson-albertassi.png",
      alt: "Edson Albertassi discursando ao microfone",
    },
  },
  {
    id: "agenda-poder-abuso",
    source: "Agenda do Poder",
    publishedAt: "2026-04-07T18:29:41-03:00",
    title: "Quando prender sem prova vira abuso de poder",
    excerpt:
      "O artigo analisa o arquivamento da Operação Cadeia Velha e debate os limites do poder estatal diante de prisões sustentadas por provas consideradas inválidas.",
    url: "https://agendadopoder.com.br/quando-prender-sem-prova-vira-abuso-de-poder/",
    image: {
      src: "/images/noticias/agenda-do-poder-edson-albertassi.png",
      alt: "Retrato de Edson Albertassi em preto e branco",
    },
  },
] as const satisfies readonly ExternalNewsItem[];
