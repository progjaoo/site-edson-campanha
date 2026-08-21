import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const archivoCondensed = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-condensed",
  display: "swap",
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://edsonalbertassi.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Edson Albertassi | Deputado Estadual 15088 — Tem Que Ter Fé",
    template: "%s | Edson Albertassi",
  },
  description:
    "Site oficial de Edson Albertassi, candidato a Deputado Estadual pelo Rio de Janeiro. Com coragem, confiança e competência para o desenvolvimento do nosso estado. Tem que ter fé!",
  keywords: [
    "Edson Albertassi",
    "Albertassi",
    "Deputado Estadual",
    "15088",
    "Volta Redonda",
    "Sul Fluminense",
    "Rio de Janeiro",
    "Eleições 2026",
    "Tem Que Ter Fé",
    "Rádio 88 FM",
    "Bancada Evangélica",
  ],
  authors: [{ name: "Edson Albertassi" }],
  creator: "Edson Albertassi",
  publisher: "Campanha Oficial Edson Albertassi 15088",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "Edson Albertassi | Deputado Estadual 15088 — Tem Que Ter Fé",
    description:
      "Com coragem, confiança e competência, vamos colocar o Rio de Janeiro no caminho do desenvolvimento outra vez.",
    siteName: "Edson Albertassi Oficial",
    images: [
      {
        url: "/images/optimized/foto-edson-herosec.png",
        width: 1200,
        height: 630,
        alt: "Edson Albertassi - Deputado Estadual 15088",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edson Albertassi | Deputado Estadual 15088",
    description: "Com coragem, confiança e competência. Tem que ter fé!",
    images: ["/images/optimized/foto-edson-herosec.png"],
  },
  icons: {
    icon: "/images/logos/logo-header.svg",
    apple: "/images/logos/logo-header.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Edson Albertassi",
    jobTitle: "Candidato a Deputado Estadual",
    url: siteUrl,
    image: `${siteUrl}/images/optimized/foto-edson-herosec.png`,
    description:
      "Edson Albertassi é líder político fluminense, fundador da Rádio 88 FM, ex-vice-presidente da ALERJ e defensor dos valores da família.",
    sameAs: [
      "https://www.instagram.com/ealbertassi",
      "https://www.facebook.com/profile.php?id=61591919964295",
    ],
  };

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoCondensed.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="font-archivo min-h-screen flex flex-col antialiased selection:bg-brand-yellow selection:text-brand-dark">
        <ScrollProgress />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
